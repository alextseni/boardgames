import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Click from '../../assets/click.mp3';
import GameVideo from '../../assets/playthrough.gif';
import Victory from '../../assets/win.mp3';
import { BoardSize, GamePhase, PieceType } from '../../model/enum';
import { Piece } from '../../model/types';
import { markPiece, removePieces } from '../../state/actions/game';
import { State } from '../../state/createStore';
import styles from './Board.module.scss';

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
  const gamePhase = useSelector((state: State) => state.game.phase);
  const boardSize = parseInt(
    useSelector((state: State) => state.game.options.size),
    10
  );
  const boardPieces = useSelector((state: State) => state.game.pieces);
  const dispatch = useDispatch();

  const clearSelection = () => {
    setMouseDown(false);
    dispatch(removePieces());
  };

  const onLeftClick = (ev: any, p: Piece, k: number, key: number) => {
    if (handleBothPlayers || gamePhase === GamePhase.player1Turn) {
      if (p.type === PieceType.piece) {
        setMouseDown(true);
        ev.preventDefault();
        play(document.getElementById('clickSound'));
        dispatch(markPiece(k * boardSize + key));
      }
    }
  };

  const onDrag = (p: Piece, k: number, key: number) => {
    if (handleBothPlayers || gamePhase === GamePhase.player1Turn) {
      if (isMouseDown && p.type === PieceType.piece) {
        play(document.getElementById('clickSound'));
        dispatch(markPiece(k * boardSize + key));
      }
    }
  };

  const css = (type: PieceType): string =>
    ({
      [PieceType.obstacle]: styles.obstacle,
      [PieceType.empty]: styles.empty,
      [PieceType.piece]: styles.piece,
      [PieceType.selected]:
        gamePhase === GamePhase.player1Turn
          ? styles.selectedPlayer1
          : styles.selectedPlayer2,
    }[type]);

  const cssSize = (size: number): string =>
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
      {gamePhase === GamePhase.gameEnd ? (
        <img className={styles.tutorial} alt='Game Tutorial' src={GameVideo} />
      ) : (
        <table
          className={styles.board}
          onMouseUp={() => clearSelection()}
          onTouchEnd={() => clearSelection()}>
          <tbody>
            {boardPieces.slice(0, boardSize).map((p, row) => (
              <tr>
                {boardPieces
                  .slice(row * boardSize, row * boardSize + boardSize)
                  .map((piece, cell) => (
                    <td
                      className={`${styles.block} ${css(piece.type)} ${cssSize(
                        boardSize
                      )}`}
                      key={cell}
                      id={piece.type + cell}
                      onMouseDown={ev => onLeftClick(ev, piece, row, cell)}
                      onTouchStart={ev => onLeftClick(ev, piece, row, cell)}
                      onMouseOver={() => onDrag(piece, row, cell)}
                      onTouchMove={() => onDrag(piece, row, cell)}></td>
                  ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
