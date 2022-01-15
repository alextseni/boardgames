import classnames from 'classnames';
import React, { useState } from 'react';
import Click from '../../assets/click.mp3';
import GameVideo from '../../assets/playthrough.gif';
import Victory from '../../assets/win.mp3';
import { BoardSize, GamePhase, PieceType } from '../../model/enum';
import { Piece } from '../../model/types';
import { useGameState } from '../../state/hooks/useGameState';
import { useOptions } from '../../state/hooks/useOptions';
import { GameInfo } from '../GameInfo/GameInfo';
import styles from './Board.module.scss';
import { Board2D } from './Board2D';
import { Board3D } from './Board3D';

interface BoardProps {
  handleBothPlayers?: boolean;
}

const play = (sound: any) => {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
};

export const Board = ({ handleBothPlayers }: BoardProps) => {
  const [isMouseDown, setMouseDown] = useState(false);
  const { phase, removePieces, markPiece } = useGameState();
  const { size } = useOptions();

  const clearSelection = () => {
    setMouseDown(false);
    removePieces();
  };

  const onPress = (ev: any, piece: Piece, row: number, cell: number) => {
    if (handleBothPlayers || phase === GamePhase.player1Turn) {
      if (piece.type === PieceType.piece) {
        setMouseDown(true);
        play(document.getElementById('clickSound'));
        markPiece(row * size + cell);
      }
    }
  };

  const onMouseDrag = (piece: Piece, row: number, cell: number) => {
    if (handleBothPlayers || phase === GamePhase.player1Turn) {
      if (isMouseDown && piece.type === PieceType.piece) {
        play(document.getElementById('clickSound'));
        markPiece(row * size + cell);
      }
    }
  };

  const onTouchDrag = (ev: TouchEvent) => {
    const touch = ev.touches[0];
    const targetId = document.elementFromPoint(
      touch.clientX,
      touch.clientY
    )?.id;
    const [type, row, cell] = targetId?.split('-') || [];
    if (handleBothPlayers || phase === GamePhase.player1Turn) {
      if (isMouseDown && type === PieceType.piece) {
        play(document.getElementById('clickSound'));
        markPiece(parseInt(row, 10) * size + parseInt(cell, 10));
      }
    }
  };

  return (
    <div className={styles.stage}>
      <div className={styles.preloadImage1} />
      <div className={styles.preloadImage2} />
      <audio id='clickSound' src={Click} />
      <audio id='winSound' src={Victory} />
      {phase === GamePhase.gameEnd ? (
        <img className={styles.tutorial} alt='Game Tutorial' src={GameVideo} />
      ) : (
        <div
          className={classnames(styles.gameArea, {
            [styles.gameAreaSmall]: size === BoardSize.small,
            [styles.gameAreaRest]: size !== BoardSize.small,
          })}>
          <GameInfo vsComp={!handleBothPlayers} />
          <Board2D onPress={onPress} onMouseDrag={onMouseDrag} 
          onTouchDrag={onTouchDrag} clearSelection={clearSelection} />
          <Board3D onPress={onPress} onMouseDrag={onMouseDrag} 
          onTouchDrag={onTouchDrag} clearSelection={clearSelection} />
        </div>
      )}
    </div>
  );
};
