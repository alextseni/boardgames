import React from 'react';
import Github from '../../assets/github.png';
import MarbleImage from '../../assets/marble_trans.png';
import StoneImage from '../../assets/stone_trans.png';
import { Layout } from '../../components/Layout/Layout';
import { Games } from '../../model/enum';
import styles from '../Page.module.scss';

const HomePage = () => (
  <Layout game={Games.randix}>
    <div className={styles.content}>
      <h2>Rules of Randix.</h2>
      <p>
        Randix is a two-player game, where players take turns removing pieces
        from the board. The goal is to force the other player to remove the last
        piece. On your turn you may remove one or more{' '}
        <span>
          <img alt='pieces' src={MarbleImage} />
        </span>{' '}
        either horizontally or vertically.
      </p>
      <p>
        Click and drag your mouse to select the pieces you want to remove but be
        aware of{' '}
        <span>
          <img alt='stone' src={StoneImage} />
        </span>{' '}
        that block your selection.
      </p>
      <div className={styles.divider} />
      <h2>History</h2>
      <p>
        Randix is a variation of the popular computational game TacTix played in
        a NxN board. In this variation however, pieces are placed randomly on
        the board. There are also obstacles blocking the path preventing players
        from cutting a whole row or column. You can read more about the original
        game{' '}
        <a href='https://en.wikipedia.org/wiki/TacTix' target='_blank'>
          <strong> here</strong>
        </a>
        .
      </p>
      <h2>About</h2>
      <p>Created by Alexandra Tseniklidou | 2016, rewritten in 2021</p>
      <p>
        Source code on
        <a
          className={styles.gitLink}
          href='https://github.com/aTseniklidou/boardgames'
          target='_blank'>
          <img alt='Github' src={Github} />
        </a>
      </p>
      <p>Sountrack: "Wallpaper" by Kevin MacLeod</p>
    </div>
  </Layout>
);

export default HomePage;
