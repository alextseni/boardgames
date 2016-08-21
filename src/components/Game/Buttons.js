import React from 'react';
import classes from './Buttons.scss';
import Button from './assets/button.mp3';

const play = (sound) => {
  sound.pause(); sound.currentTime = 0; sound.play();
};

export const Buttons = ({ props }) => {
  const NewGame = () => {
    play(document.getElementById('buttonSound'));
    props.initializeBoard();
  };

  const Quit = () => {
    play(document.getElementById('buttonSound'));
    props.clearBoard();
  };

  return (
    <div>
      <audio id="buttonSound" src={Button} />
      <button onClick={NewGame}>
        New Game
      </button>
      <button className={classes[props.game.phase]} onClick={Quit}>
         Quit
      </button>
    </div>
);
};

export default Buttons;
