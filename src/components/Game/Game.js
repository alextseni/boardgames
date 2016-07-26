import React from 'react'
import classes from './Game.scss'

export const Game = (props) => (
  <div>
  <div>
    <h2 className={classes[props.game.phase]}>
      Turns:
      {' '}
      <span>
        {props.game.turns}
      </span>
    </h2>
    <h2>
        {props.game.text}
    </h2>
  </div>
  <div className={classes.stage}>
    <table className={classes.board}>
     <tbody>
       {props.game.pieces.slice(0,8).map( (p, k) => {return <tr>
       {props.game.pieces.slice(k*8,k*8+8).map( (piece, key) => {return <td className= {classes[piece]} onClick={()=> props.markPiece(k*8+key)}></td>})}</tr>})}
      </tbody>
    </table>
    </div>

 <div>
 <button className={classes[props.game.phase]} onClick={props.removePieces}>
    Remove!
 </button>
 </div>
  <div>
   <button className='start' onClick={props.initializeBoard}>
     New Game
   </button>
      {' '}
   <button className={classes[props.game.phase]} onClick={props.clearBoard}>
      Quit
   </button>
  </div>
  </div>
)


Game.propTypes = {
  game: React.PropTypes.object.isRequired,
  initializeBoard: React.PropTypes.func.isRequired,
  clearBoard: React.PropTypes.func.isRequired,
  markPiece: React.PropTypes.func.isRequired,
 removePieces: React.PropTypes.func.isRequired,
}

export default Game
