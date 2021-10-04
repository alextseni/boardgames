import React from 'react';
import {Board} from '../../components/Board/Board';
import { Buttons } from '../../components/Buttons/Buttons';
import { GameInfo } from '../../components/GameInfo/GameInfo';
import {Layout} from '../../components/Layout/Layout';
import { Settings } from '../../components/Settings/Settings';
import './index.scss'

const Computer = () => (
  <Layout>
    <div className={'wrapper'}>
  <Settings  hasDifficultySetting hasSizeSetting />
  <Buttons />
  </div>
  <GameInfo vsComp/>
  <Board />
  </Layout>
);

export default Computer;
