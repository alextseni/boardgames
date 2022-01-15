import classnames from 'classnames';
import React from 'react';
import { BoardSize, GamePhase, PieceType } from '../../model/enum';
import { useGameState } from '../../state/hooks/useGameState';
import { useOptions } from '../../state/hooks/useOptions';
import styles from './Board.module.scss';

interface Board2DProps {
}

export const Board2D = ({onPress, onMouseDrag, onTouchDrag, clearSelection}: Board2DProps) => {
  const { phase, pieces } = useGameState();
  const { size } = useOptions();

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
  );
};
