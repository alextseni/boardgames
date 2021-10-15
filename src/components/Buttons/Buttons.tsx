import React from 'react';
import { Button } from '../../library/Button';
import { GamePhase } from '../../model/enum';
import { useGameState } from '../../state/hooks/useGameState';
import { useOptions } from '../../state/hooks/useOptions';
import styles from './Buttons.module.scss';

export const Buttons = () => {
  const { size } = useOptions();
  const { phase, initializeBoard, clearBoard } = useGameState();

  const newGame = () => {
    initializeBoard(size);
  };

  const guitGame = () => {
    clearBoard();
  };

  return (
    <div>
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
