import React from 'react'
import classes from './Game.scss'


let isMouseDown = false;

export const Game = (props) => (
  <div onMouseUp =  {()=> {isMouseDown=false; props.removePieces(); props.removeMarks();}}>
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
       {props.game.pieces.slice(0,6).map( (p, k) => {return <tr>
       {props.game.pieces.slice(k*6,k*6+6).map( (piece, key) => {return <td className= {classes[piece]}
           onMouseDown={()=> {isMouseDown = true; props.markPiece(k*6+key);}}
           onMouseOver ={()=> { if (isMouseDown) props.markPiece(k*6+key);}}

           ></td>})}</tr>})}
      </tbody>
    </table>
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
 removeMarks: React.PropTypes.func.isRequired,
}

export default Game
