import React from 'react';
import { Board } from 'routes/Game/containers/boardContainer';
import { GameInfo } from 'routes/Game/containers/infoContainer';
import { Buttons } from 'routes/Game/containers/buttonsContainer';
import { Members, MembersOld }  from '../containers/membersContainer';
import { LogIn,LogInOld } from '../containers/authContainer';
import Toggle from 'material-ui/Toggle'


const layout = {
  material: () => ([
    <LogIn />,
    <Members />,

  ]),
  bootstrap:  () => ([
    <LogInOld />,
    <MembersOld />,
  ]),
};

export const Game = ({view}) => (
  <div>
  <p>Online mode is under development. Material theme is in progress. No database exists and there is no way to play with others yet. You can sign up temporarily until you refresh the page.</p>
    {layout[view.theme]()}
  </div>
);

export default Game;
