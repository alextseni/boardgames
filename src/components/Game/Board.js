import React from 'react';
import classes from './Board.scss';
import GameVideo from './assets/playthrough.gif';
import Click from './assets/click.mp3';
import Victory from './assets/win.mp3';


function disableScrolling() {
  var x = window.scrollX;
  var y = window.scrollY;
  window.onscroll = function () { window.scrollTo(x, y); };
  document.ontouchmove = function (e) {
    e.preventDefault();
  };
}

function enableScrolling() {
  window.onscroll = function () {};
  document.ontouchmove = function (e) {
    return true;
  };
};

let isMouseDown = false;

export const Board = ({ game, removeMarks, removePieces, markPiece }) => {
  const play = (sound) => {
    sound.pause(); sound.currentTime = 0; sound.play();
  };

  const clearSelection = () => {
    isMouseDown = false;
    removePieces();
    removeMarks();
    enableScrolling();
    if ((game.text).substring(8, 13) === 'wins!') {
      play(document.getElementById('winSound'));
    }
  };

  const onLeftClick = (ev, p, k, key) => {
    disableScrolling();
    if (p.type === 'marble') {
      isMouseDown = true;
      ev.preventDefault();
      play(document.getElementById('clickSound'));
      markPiece(k * 6 + key);
    }
  };

  const onDrag = (p, k, key) => {
    console.log(isMouseDown);
    console.log(p.type);
    console.log(k);
    console.log(key);
    if (isMouseDown && p.type === 'marble') {
      play(document.getElementById('clickSound'));
      markPiece(k * 6 + key);
    }
  };

  return (
    <div className={classes.stage}>
      <audio id="clickSound" src={Click} />
      <audio id="winSound" src={Victory} />
      <img className={classes[game.phase]} alt='Game Tutorial' src={GameVideo} />
      <table className={classes.board} id={classes[game.phase]} onMouseUp={() => clearSelection()} onTouchEnd = {() => clearSelection()} >
        <tbody>
          {game.pieces.slice(0, 6).map((p, row) => (
            <tr>
              {game.pieces.slice(row * 6, row * 6 + 6).map((piece, cell) => (
                <td className={classes[piece.type]} id={classes[game.text]}
                  onMouseDown={(ev) => onLeftClick(ev, piece, row, cell)}
                  onTouchStart={(ev) => onLeftClick(ev, piece, row, cell)}
                  onMouseOver={() =>onDrag(piece, row, cell)}
                  onTouchMove={() =>onDrag(piece, row, cell)}>
                </td>
          ))}
            </tr>
      ))}
        </tbody>
      </table>
    </div>
      );
};

Board.propTypes = {
  game: React.PropTypes.object.isRequired,
  markPiece: React.PropTypes.func.isRequired,
  removePieces: React.PropTypes.func.isRequired,
  removeMarks: React.PropTypes.func.isRequired,
};

export default Board;
