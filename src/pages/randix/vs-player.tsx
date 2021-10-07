import React from 'react';
import { Board } from '../../components/Board/Board';
import { Buttons } from '../../components/Buttons/Buttons';
import { GameInfo } from '../../components/GameInfo/GameInfo';
import { Layout } from '../../components/Layout/Layout';
import { Settings } from '../../components/Settings/Settings';
import { Games } from '../../model/enum';
import styles from '../Page.module.scss';

const TwoPlayer = () => (
  <Layout game={Games.randix}>
    <div className={styles.optionsWrapper}>
      <Settings hasSizeSetting />
      <Buttons />
    </div>
    <div className={styles.boardWrapper}>
    <GameInfo />
    <Board handleBothPlayers />
    </div>
  </Layout>
);

export default TwoPlayer;
