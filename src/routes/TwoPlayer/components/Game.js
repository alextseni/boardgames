import React from 'react';
import { Board, BoardOld } from 'routes/Game/containers/boardContainer';
import { GameInfo, GameInfoOld } from 'routes/Game/containers/infoContainer';
import { Buttons, ButtonsOld } from 'routes/Game/containers/buttonsContainer';
import { Settings } from 'routes/Game/containers/settingsContainer';
import { View } from 'routes/Game/containers/viewContainer';
//import {Toggle} from 'material-ui';

const layout = {
  material: () => ([
    <Settings/>,
    <GameInfo />,
    <Board />,
    <Buttons />,
  ]),
  bootstrap:  () => ([
    <Settings/>,
    <GameInfoOld />,
    <BoardOld />,
    <ButtonsOld />,
  ]),
};
export const Game = ({view}) => (
  <div>
    <View />
    {layout[view.theme]()}
  </div>
);

export default Game;
