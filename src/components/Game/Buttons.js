import React from 'react';
import classes from './Buttons.scss';
import Button from './assets/button.mp3';

const play = (sound) => {
  sound.pause(); sound.currentTime = 0; sound.play();
};

export const Buttons = ({ game, initializeBoard, clearBoard }) => {
  const NewGame = () => {
    play(document.getElementById('buttonSound'));
    initializeBoard();
  };

  const Quit = () => {
    play(document.getElementById('buttonSound'));
    clearBoard();
  };

  return (
    <div>
      <audio id="buttonSound" src={Button} />
      <button onClick={NewGame}>
        New Game
      </button>
      <button className={classes[game.phase]} onClick={Quit}>
         Quit
      </button>
    </div>
);
};

Buttons.propTypes = {
  game: React.PropTypes.object.isRequired,
  initializeBoard: React.PropTypes.func.isRequired,
  clearBoard: React.PropTypes.func.isRequired,
};

export default Buttons;
