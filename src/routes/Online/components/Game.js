import React from 'react';
import { Board } from 'routes/Game/containers/boardContainer';
import { GameInfo } from 'routes/Game/containers/infoContainer';
import { Buttons } from 'routes/Game/containers/buttonsContainer';
import { Members, Members_old }  from '../containers/membersContainer';
import { LogIn,LogIn_old } from '../containers/authContainer';
import Toggle from 'material-ui/Toggle'

export const Game = ({view,changeTheme}) => (
  <div>
  <Toggle
     label="Switch View"
     onToggle={changeTheme}
     toggled={view.toggled}
  />
   {view.theme =='material' ?
    [
      <LogIn/>,
      <Members/>
    ] :
    [
      <LogIn_old/>,
      <Members_old/>
  ]}

  </div>
);

export default Game;
