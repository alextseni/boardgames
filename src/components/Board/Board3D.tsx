import { Canvas, useFrame } from '@react-three/fiber';
import classnames from 'classnames';
import React, { useRef, useState } from 'react';
import Click from '../../assets/click.mp3';
import GameVideo from '../../assets/playthrough.gif';
import Victory from '../../assets/win.mp3';
import { BoardSize, GamePhase, PieceType } from '../../model/enum';
import { Piece } from '../../model/types';
import { useGameState } from '../../state/hooks/useGameState';
import { useOptions } from '../../state/hooks/useOptions';
import { GameInfo } from '../GameInfo/GameInfo';
import styles from './Board.module.scss';

interface Board3DProps {
  handleBothPlayers?: boolean;
}

const tileSize = 1;

const play = (sound: any) => {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
};

const Sphere = props => {
  const ref = useRef();
  const [active, setActive] = useState(false);
  // useFrame(() => {
  //   ref.current.rotation.x = ref.current.rotation.y += 0.01;
  // });
  return (
    <mesh
      {...props}
      ref={ref}
      scale={props.color ? 1.1 : 1}
      onClick={e => setActive(!active)}>
      <sphereGeometry args={[tileSize / 2, 32, 32]} />
      <meshStandardMaterial color={props.color || 'lightgrey'} />
    </mesh>
  );
};

const Obstacle = props => {
  const ref = useRef();
  return (
    <mesh
      {...props}
      ref={ref}
      scale={1}>
      <torusKnotGeometry args={[tileSize / 4,tileSize / 9, 100, 16]} />
      <meshStandardMaterial color={'grey'} />
    </mesh>
  );
};

export const Board3D = ({ onPress, onMouseDrag, clearSelection }: Board3DProps) => {
  const { phase, pieces } = useGameState();
  const { size } = useOptions();
  
  return (
    <div className={styles.threeDArea}  onMouseUp={() => clearSelection()}>
        <Canvas onPointerUp={() => clearSelection()}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        {pieces.slice(0, size).map((_, row) =>
            pieces
              .slice(row * size, row * size + size)
              .map((piece, cell) => {
                const arrayY = [3, 2, 1, 0, -1, -2];
                const arrayX = [-3, -2, -1, 0, 1, 2];
                const y = arrayY[row];
                const x = arrayX[cell]; 
                if (piece.type === PieceType.obstacle) {
                  return <Obstacle position={[x, y, 0]} />;
                }
                if (piece.type === PieceType.empty) {
                  return;
                }
                if (piece.type === PieceType.selected) {
                  return <Sphere
                  position={[x, y, 0]}
                //  id={`${piece.type}-${row}-${cell}`}
                  key={`${row}-${cell}`}
                  color={phase === GamePhase.player1Turn ? 'red' : 'blue'} />;
                }
                return <Sphere
                position={[x, y, 0]}
              //  id={`${piece.type}-${row}-${cell}`}
                key={`${row}-${cell}`}
                onPointerDown={ev => onPress(ev, piece, row, cell)}
             //   onTouchStart={ev => onPress(ev, piece, row, cell)}
             //   onPointerMove={(ev: any) => onTouchDrag(ev)}
             onPointerMove={() => onMouseDrag(piece, row, cell)}  />;
        }))}
      </Canvas>
      </div>
  );
};
