import React from 'react';
import { Board } from '../../components/Board/Board';
import { Buttons } from '../../components/Buttons/Buttons';
import { Layout } from '../../components/Layout/Layout';
import { Settings } from '../../components/Settings/Settings';
import { Games } from '../../model/enum';
import styles from '../Page.module.scss';

const Computer = () => (
  <Layout game={Games.randix}>
    <div className={styles.wrapper}>
      <Settings hasDifficultySetting hasSizeSetting />
      <Buttons />
    </div>
    <Board />
  </Layout>
);

export default Computer;
