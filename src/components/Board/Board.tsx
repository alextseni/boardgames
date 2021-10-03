import React from 'react';
import './Board.scss';
import GameVideo from '../../assets/playthrough.gif';
import Click from '../../assets/click.mp3';
import Victory from '../../assets/win.mp3';
import { useDispatch, useSelector } from 'react-redux';
import { GamePhase, PieceType } from '../../model/enum';
import { markPiece, removePieces } from '../../state/actions/game';

interface BoardProps {
  handleBothPlayers?: boolean
}

const play = (sound: any) => {
  sound.pause(); sound.currentTime = 0; sound.play();
};

let isMouseDown = false;

export const Board = ({ handleBothPlayers }: BoardProps) => {
  const gamePhase = useSelector((state) => state.game.phase)
  const boardSize = parseInt(useSelector((state) => state.game.options.size))
  const boardPieces = useSelector((state) => state.game.pieces)
  const dispatch = useDispatch();


  const clearSelection = () => {
    isMouseDown = false;
    dispatch(removePieces());
    // if ((game.text).substring(8, 13) === 'wins!') {
    //   play(document.getElementById('winSound'));
    // }
  };

  const onLeftClick = (ev, p, k, key) => {
    if (handleBothPlayers || gamePhase === GamePhase.player1Turn) {
      if (p.type === PieceType.piece) {
        isMouseDown = true;
        ev.preventDefault();
        play(document.getElementById('clickSound'));
        dispatch(markPiece(k * boardSize + key));
      }
    }
  };

  const onDrag = (p, k, key) => {
    if (handleBothPlayers || gamePhase === GamePhase.player1Turn) {
      if (isMouseDown && p.type === PieceType.piece) {
        play(document.getElementById('clickSound'));
        dispatch(markPiece(k * boardSize + key));
      }
    }
  };

  const css = (type: PieceType): string => ({
    [PieceType.obstacle]: 'obstacle',
    [PieceType.empty]: 'empty',
    [PieceType.piece]: 'piece',
    [PieceType.selected]: gamePhase === GamePhase.player1Turn ? 'selectedPlayer1' : 'selectedPlayer2',
  })[type]

  return (
    <div className={'stage'}>
      <audio id="clickSound" src={Click} />
      <audio id="winSound" src={Victory} />
      {gamePhase === GamePhase.gameEnd ? 
      <img className={'tutorial'} alt='Game Tutorial' src={GameVideo} /> 
      : <table className={'board'}
        onMouseUp={() => clearSelection()}
        onTouchEnd = {() => clearSelection()} >
        <tbody>
          {boardPieces.slice(0, boardSize).map((p, row) => (
            <tr>
              {boardPieces.slice(row * boardSize, row * boardSize + boardSize).map((piece, cell) => (
                <td className={`block ${css(piece.type)}`} key={cell} id={piece.type + cell}
                  onMouseDown={(ev) => onLeftClick(ev, piece, row, cell)}
                  onTouchStart={(ev) => onLeftClick(ev, piece, row, cell)}
                  onMouseOver={() =>onDrag(piece, row, cell)}
                  onTouchMove={() =>onDrag(piece, row, cell)}>
                </td>
          ))}
            </tr>
      ))}
        </tbody>
      </table>}
    </div>
      );
};
