import React from 'react';
import {Board} from '../../components/Board/Board';
import { Buttons } from '../../components/Buttons/Buttons';
import { GameInfo } from '../../components/GameInfo/GameInfo';
import {Layout} from '../../components/Layout/Layout';
import { Settings } from '../../components/Settings/Settings';

const Computer = () => (
  <Layout>
  <Settings hasSizeSetting />
  <GameInfo />
  <Board />
  <Buttons />
  </Layout>
);

export default Computer;
