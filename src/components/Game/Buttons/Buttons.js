import React from 'react';
import Button from '../assets/button.mp3';
import RaisedButton from 'material-ui/RaisedButton'
import {styles} from './Styles.js'

const play = (sound) => {
  sound.pause(); sound.currentTime = 0; sound.play();
};

export const Buttons = ({ game, initializeBoard, clearBoard }) => {
  const NewGame = () => {
    play(document.getElementById('buttonSound'));
    initializeBoard(game.options.size);
  };

  const Quit = () => {
    play(document.getElementById('buttonSound'));
    clearBoard();
  };

  return (
    <div >
      <audio id="buttonSound" src={Button} />
      <RaisedButton
      label="New Game"
      style={styles.start}
      onClick={NewGame}
      />
      <RaisedButton
      label="Quit"
      style={styles[game.phase]}
      onClick={Quit}
      />
    </div>
);
};

Buttons.propTypes = {
  game: React.PropTypes.object.isRequired,
  initializeBoard: React.PropTypes.func.isRequired,
  clearBoard: React.PropTypes.func.isRequired,
};

export default Buttons;
