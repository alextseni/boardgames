import React from 'react';
import { Board } from '../containers/boardContainer';
import { GameInfo } from '../containers/infoContainer';
import { Buttons } from '../containers/buttonsContainer';

export const Game = () => (
  <div>
    <GameInfo />
    <Board />
    <Buttons />
  </div>
);

export default Game;
