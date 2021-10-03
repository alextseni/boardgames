import React from 'react';
import {Layout} from '../../components/Layout/Layout';
import './index.scss'
import MarbleImage from '../../assets/marble_trans.png';
import StoneImage from '../../assets/stone_trans.png';

const HomePage = () => (
    <Layout>
    <div>
    <h2>Rules of Randix.</h2>
    <p>Randix is a a two-player game, where players take turns removing pieces from the board.
    The goal is to force the other player to remove the last piece. On your turn you may remove
    as many sequentially <span><img alt='pieces' src={MarbleImage} /></span> as you like either horizontally or vertically.
    You must remove at least one piece on your turn and as many as you want from that row or column (but not both)
    unless you encounter a <span><img alt='stone' src={StoneImage} /></span> that blocks your path.</p>
    <p>Click and drag your mouse to select the pieces you want to remove.</p>
    <p>Randix is a variation of the popular computational game TacTix played in a NxN board. In this variation however,
    pieces are placed randomly on the board. There are also obstacles blocking the path preventing players from cutting a whole row or column.
    You can read more about the original game (now in the public domain) <a href='https://en.wikipedia.org/wiki/TacTix' target="_blank"><strong> here</strong></a>.</p>
  </div>
    <div className={'author'}>
    <p>Created by Alexandra Tseniklidou</p>
    <p>2016</p>
    <p>Built using the Redux-React Starter Kit by David Zukowski</p>
    <p>Sountrack: "Wallpaper" by Kevin MacLeod</p>
  </div>
  </Layout>
);

export default HomePage