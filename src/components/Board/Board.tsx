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
import * as styles from './Board.module.scss';

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
  const { phase, pieces, removePieces, markPiece } = useGameState();
  const { size } = useOptions();

  const clearSelection = () => {
    setMouseDown(false);
    removePieces();
  };

  const onPress = (ev: any, piece: Piece, row: number, cell: number) => {
    if (handleBothPlayers || phase === GamePhase.player1Turn) {
      if (piece.type === PieceType.piece) {
        setMouseDown(true);
        ev.preventDefault();
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

  const cssForTileType = (type: PieceType): string =>
    ({
      [PieceType.obstacle]: styles.obstacle,
      [PieceType.empty]: styles.empty,
      [PieceType.piece]: styles.piece,
      [PieceType.selected]:
        phase === GamePhase.player1Turn
          ? styles.selectedPlayer1
          : styles.selectedPlayer2,
    }[type]);

  const cssForSize = (): string =>
    ({
      [BoardSize.small]: styles.blockSmall,
      [BoardSize.medium]: styles.blockNormal,
      [BoardSize.big]: styles.blockBig,
    }[size]);

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
          <table
            className={classnames(styles.board, styles.p1, {
              [styles.p1]:
                GamePhase.player1Turn === phase ||
                GamePhase.player1Wins === phase,
              [styles.p2]:
                GamePhase.player1Turn !== phase &&
                GamePhase.player1Wins !== phase,
            })}
            onMouseUp={() => clearSelection()}
            onTouchEnd={() => clearSelection()}>
            <tbody>
              {pieces.slice(0, size).map((_, row) => (
                <tr key={row}>
                  {pieces
                    .slice(row * size, row * size + size)
                    .map((piece, cell) => (
                      <td
                        className={classnames(
                          styles.block,
                          cssForTileType(piece.type),
                          cssForSize()
                        )}
                        id={`${piece.type}-${row}-${cell}`}
                        key={`${row}-${cell}`}
                        onMouseDown={ev => onPress(ev, piece, row, cell)}
                        onTouchStart={ev => onPress(ev, piece, row, cell)}
                        onMouseOver={() => onMouseDrag(piece, row, cell)}
                        onTouchMove={(ev: any) => onTouchDrag(ev)}></td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
