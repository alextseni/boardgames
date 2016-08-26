import React from 'react';
import { Board } from '../containers/boardContainer';
import { GameInfo } from '../containers/infoContainer';
import { Buttons } from '../containers/buttonsContainer';
import Soundtrack from 'components/Game/assets/Wallpaper.mp3';

export const Game = () => (
  <div>
    <audio id='ost' autoPlay loop src={Soundtrack} />
    <GameInfo />
    <Board />
    <Buttons />
  </div>
);

export default Game;
