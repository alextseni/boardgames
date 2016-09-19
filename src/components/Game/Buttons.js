import React from 'react';
import classes from './Buttons.scss';
import Button from './assets/button.mp3';
import RaisedButton from 'material-ui/RaisedButton'

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

  const style = {
    start: {
      margin: 20,
      width: '30%',
      height:50,
     verticalAlign: 'middle',
    },
    end: {
      display:'none',
    }
  };

  return (
    <div className={style.gameButtons}>
      <audio id="buttonSound" src={Button} />
      <RaisedButton
      label="New Game"
      style={style.start}
      onClick={NewGame}
      />
      <RaisedButton
      label="Quit"
      style={style[game.phase]}
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
