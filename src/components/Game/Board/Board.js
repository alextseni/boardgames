import React from 'react';
import classes from './Board.scss';
import GameVideo from '../assets/mat_playthrough.gif';
import Click from '../assets/click.mp3';
import Victory from '../assets/win.mp3';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Paper from 'material-ui/Paper'
import {styles} from './Styles';

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
      <Paper zDepth={5}>
        <Table>
          <TableBody displayRowCheckbox={false} >
            {game.pieces.slice(0, 6).map((p, row) => (
              <TableRow
              selectable={false}
              style={styles.board}
              onMouseUp={() => clearSelection()}>
                  {game.pieces.slice(row * 6, row * 6 + 6).map((piece, cell) => (
                    <TableRowColumn style={styles.tile} id={classes[game.text]}
                    onMouseDown={(ev) => onLeftClick(ev, piece, row, cell)}
                    onMouseOver={() =>onDrag(piece, row, cell)}>
                      <Paper
                      zDepth={5} circle={piece.type=='obstacle'? false: true}
                      style={piece.type=='selected' ? styles[piece.type][game.text.substring(0, 7)] : styles[piece.type]}
                      />
                    </TableRowColumn>
                  ))}
              </TableRow>
                ))}
          </TableBody>
        </Table>
      </Paper>
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
