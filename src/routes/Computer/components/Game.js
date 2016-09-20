import React from 'react';
import { Board } from 'routes/Game/containers/boardContainer';
import { GameInfo } from 'routes/Game/containers/infoContainer';
import { Buttons } from 'routes/Game/containers/buttonsContainer';
import {Toggle} from 'material-ui';

export const Game = ({view,changeTheme}) => (
  <div>
  <Toggle
     label="Switch View"
     onToggle={changeTheme}
     toggled={view.toggled}
  />
    <p>Under development</p>
  </div>
);

export default Game;
