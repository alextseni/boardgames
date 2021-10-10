import React from 'react';
import ButtonSound from '../../assets/button.mp3';
import { Button } from '../../library/Button';
import { GamePhase } from '../../model/enum';
import { useGameState } from '../../state/hooks/useGameState';
import { useOptions } from '../../state/hooks/useOptions';
import styles from './Buttons.module.scss';

const play = (sound: any) => {
  sound.pause();
  sound.currentTime = 0;
  sound.play();
};

export const Buttons = () => {
  const { size } = useOptions();
  const { phase, initializeBoard, clearBoard } = useGameState();

  const newGame = () => {
    play(document.getElementById('buttonSound'));
    initializeBoard(size);
  };

  const guitGame = () => {
    play(document.getElementById('buttonSound'));
    clearBoard();
  };

  return (
    <div>
      <audio id='buttonSound' src={ButtonSound} />
      {phase !== GamePhase.gameEnd && (
        <Button label={'Quit'} onClick={guitGame} />
      )}
      <Button
        label={'New game'}
        className={styles.buttonNew}
        onClick={newGame}
      />
    </div>
  );
};
