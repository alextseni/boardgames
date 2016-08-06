import React from 'react'

import Buttons from  './Buttons'
import GameInfo from './GameInfo'
import Board from './Board'

import Soundtrack from './assets/Wallpaper.mp3'

export const Game = (props) => (
  <div>
  <audio id='ost' autoplay controls loop>
     <source src={Soundtrack}/>
  </audio>
    <GameInfo props={props}/>
    <Board props={props}/>
    <Buttons props={props}/>
  </div>
)

Game.propTypes = {
 game: React.PropTypes.object.isRequired,
 initializeBoard: React.PropTypes.func.isRequired,
 clearBoard: React.PropTypes.func.isRequired,
 markPiece: React.PropTypes.func.isRequired,
 removePieces: React.PropTypes.func.isRequired,
 removeMarks: React.PropTypes.func.isRequired,
}

export default Game
