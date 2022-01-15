import React from 'react';
import { Board } from '../../components/Board/Board';
import { Buttons } from '../../components/Buttons/Buttons';
import { Layout } from '../../components/Layout/Layout';
import { Settings } from '../../components/Settings/Settings';
import { Games } from '../../model/enum';
import * as styles from '../Page.module.scss';

const TwoPlayer = () => (
  <Layout game={Games.randix}>
    <div className={styles.wrapper}>
      <Settings hasSizeSetting />
      <Buttons />
    </div>
    <Board handleBothPlayers />
  </Layout>
);

export default TwoPlayer;
