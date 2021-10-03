import React from 'react';
import {Board} from '../../components/Board/Board';
import { Buttons } from '../../components/Buttons/Buttons';
import { GameInfo } from '../../components/GameInfo/GameInfo';
import {Layout} from '../../components/Layout/Layout';
import { Settings } from '../../components/Settings/Settings';

const TwoPlayer = () => (
  <Layout>
  <Settings hasSizeSetting />
  <GameInfo />
  <Board handleBothPlayers />
  <Buttons />
  </Layout>
);

export default TwoPlayer;
