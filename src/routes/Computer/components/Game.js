import React from 'react';
import { Board, BoardOld } from 'routes/Game/containers/boardContainer';
import { GameInfo, GameInfoOld } from 'routes/Game/containers/infoContainer';
import { Buttons, ButtonsOld } from 'routes/Game/containers/buttonsContainer';
import { Settings } from 'routes/Game/containers/settingsContainer';
//import { Toggle } from 'material-ui';
import { View } from 'routes/Game/containers/viewContainer';

const layout = {
  material: () => ([
    <Settings />,
    <GameInfo />,
  //  <Board3D />,
    <Board/>,
    <Buttons />,
  ]),
  bootstrap:  () => ([
    <Settings />,
    <GameInfoOld />,
    <BoardOld />,
    <ButtonsOld />,
  ]),
};

export const Game = ({view}) => {

  return (
    <div>
      <View />
      {layout[view.theme]()}
    </div>
  );
}

export default Game;
