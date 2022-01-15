import React, { useEffect, useRef } from 'react';
import Confetti from 'react-dom-confetti';
import ConfettiSound from '../../assets/confetti.mp3';
import { Board } from '../../components/Board/Board';
import { Buttons } from '../../components/Buttons/Buttons';
import { Layout } from '../../components/Layout/Layout';
import { Settings } from '../../components/Settings/Settings';
import { GamePhase, Games } from '../../model/enum';
import { useGameState } from '../../state/hooks/useGameState';
import * as styles from '../Page.module.scss';

const confettiConfig = {
  angle: 90,
  spread: 100,
  startVelocity: 65,
  elementCount: 90,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: '10px',
  height: '10px',
  perspective: '700px',
  colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
};

const Computer = () => {
  const { phase } = useGameState();
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    if (phase === GamePhase.player1Wins) {
      (document.getElementById('confettiSound') as HTMLAudioElement)?.play();
    }
  }, [phase]);
  return (
    <div className={styles.vscomp}>
      <Layout game={Games.randix}>
        <div className={styles.wrapper}>
          <Settings hasDifficultySetting hasSizeSetting />
          <Buttons />
        </div>
        <Board />
      </Layout>
      <audio id='confettiSound' src={ConfettiSound} />
      <Confetti
        active={phase === GamePhase.player1Wins}
        config={confettiConfig}
      />
    </div>
  );
};

export default Computer;
