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
  <p>Online mode is under development. Material theme is in progress. No database exists and there is no way to play with others yet. You can sign up temporarily until you refresh the page.</p>
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
