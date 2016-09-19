import React from 'react';
import { Board } from '../containers/boardContainer';
import { GameInfo } from '../containers/infoContainer';
import { Buttons } from '../containers/buttonsContainer';
import { Members }  from '../containers/membersContainer.js';
import { LogIn } from '../containers/authContainer';

export const Game = () => (
  <div>
    <LogIn/>
    <Members/>
  </div>
);

export default Game;
