import React from 'react';
import { Board, Board_old } from 'routes/Game/containers/boardContainer';
import { GameInfo, GameInfo_old } from 'routes/Game/containers/infoContainer';
import { Buttons, Buttons_old } from 'routes/Game/containers/buttonsContainer';
import Toggle from 'material-ui/Toggle'

export const Game = ({view, changeTheme}) => (
  <div>
  <Toggle
     label="Switch View"
     onToggle={changeTheme}
     toggled={view.toggled}
  />
   {view.theme =='material' ?
    [
    <GameInfo />,
    <Board />,
    <Buttons />
    ] :
    [
    <GameInfo_old />,
    <Board_old />,
    <Buttons_old />
  ]}
  </div>
);

export default Game;
