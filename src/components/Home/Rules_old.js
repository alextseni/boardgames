import React from 'react'
import MarbleImage from './assets/marble.png'
import StoneImage from './assets/stone.png'
import GameImage from './assets/game.jpg'
import classes from './Rules.scss'

export const HomeView = () => (
  <div>
    <h2>Rules of Randix.</h2>
    <img
      alt='Game Image'
      className={classes.image}
      src={GameImage} />
    <p className= {classes.rules}>Randix is a a two-player game, where players take turns removing pieces from the board.
    The goal is to force the other player to remove the last piece. On your turn you may remove
    as many sequentially <span><img alt='pieces' src={MarbleImage} /></span> as you like either horizontally or vertically.
    You must remove at least one piece on your turn and as many as you want from that row or column (but not both)
    unless you encounter a <span><img alt='stone' src={StoneImage} /></span> that blocks your path.</p>
    <p className= {classes.rules}>Click and drag your mouse to select the pieces you want to remove.</p>
    <p className= {classes.rules}>Randix is a variation of the popular computational game TacTix played in a NxN board. In this variation however,
    pieces are placed randomly on the board. There are also obstacles blocking the path preventing players from cutting a whole row or column.
    You can read more about the original game (now in the public domain) <a href='https://en.wikipedia.org/wiki/TacTix' target="_blank"><strong> here</strong></a>.</p>
  </div>
)

export default HomeView
