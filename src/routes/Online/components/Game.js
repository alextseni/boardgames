import React from 'react';
import { Board } from 'routes/Game/containers/boardContainer';
import { GameInfo } from 'routes/Game/containers/infoContainer';
import { Buttons } from 'routes/Game/containers/buttonsContainer';
import { Members } from '../containers/membersContainer';
import { LogIn } from '../containers/authContainer';
//import Toggle from 'material-ui/Toggle'

export const Game = () => (
  <div>
  <p>Online mode is under development. There is no way to play with others yet. You can sign up temporarily until you refresh the page.</p>
  <LogIn />
  <Members />
  </div>
);

export default Game;
