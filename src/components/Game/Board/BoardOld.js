import React from 'react';
import classes from './Board.scss';
import GameVideo from '../assets/playthrough.gif';
import Click from '../assets/click.mp3';
import Victory from '../assets/win.mp3';

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

export const BoardOld = ({ game, removePieces, markPiece }) => {
  const play = (sound) => {
    sound.pause(); sound.currentTime = 0; sound.play();
  };

  const clearSelection = () => {
    isMouseDown = false;
    removePieces();
    if ((game.text).substring(8, 13) === 'wins!') {
      play(document.getElementById('winSound'));
    }
  };

  const onLeftClick = (ev, p, k, key) => {
    if (window.location.pathname === '/Randix-Game/TwoPlayer' || (game.text).substring(0, 7) === 'Player1') {
      if (p.type === 'marble') {
        isMouseDown = true;
        ev.preventDefault();
        play(document.getElementById('clickSound'));
        markPiece(k * game.options.size + key);
      }
    }
  };

  const onDrag = (p, k, key) => {
    if (window.location.pathname === '/Randix-Game/TwoPlayer' || (game.text).substring(0, 7) === 'Player1') {
      if (isMouseDown && p.type === 'marble') {
        play(document.getElementById('clickSound'));
        markPiece(k * game.options.size + key);
      }
    }
  };

  return (
    <div className={classes.stage}>
      <audio id="clickSound" src={Click} />
      <audio id="winSound" src={Victory} />
      <img className={classes[game.phase]} alt='Game Tutorial' src={GameVideo} />
      <table className={classes.board}
        onMouseUp={() => clearSelection()}
        onTouchEnd = {() => clearSelection()} >
        <tbody>
          {game.pieces.slice(0, game.options.size).map((p, row) => (
            <tr>
              {game.pieces.slice(row * game.options.size, row * game.options.size + game.options.size).map((piece, cell) => (
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

BoardOld.propTypes = {
  game: React.PropTypes.object.isRequired,
  markPiece: React.PropTypes.func.isRequired,
  removePieces: React.PropTypes.func.isRequired,
};

export default BoardOld;
