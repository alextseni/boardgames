import React from 'react'
import classes from './Game.scss'


let isMouseDown = false;

export const Game = (props) => (
  <div onMouseUp =  {()=> {isMouseDown=false; props.removePieces(); props.removeMarks();}}>

  <div className= {classes.info}>

      <span className="label label-default" id={classes[props.game.text.substring(0,7)]}>  {props.game.text} </span>
  <div className={classes[props.game.phase]}>

    <div className="progress" id={classes.prog}>
      <div className="progress-bar" role="progressbar"
      style={{width:Math.round((100-(((props.game.pieces.filter((p)=> p=='marble' || p=='selected').length-1))/(props.game.allMarbles-1))*100)) + '%'}}>
           {Math.round((100-(((props.game.pieces.filter((p)=> p=='marble' || p=='selected').length-1))/(props.game.allMarbles-1))*100)) + '%'}
      </div>
    </div>
  </div>
  </div>

  <div className={classes.stage}>
    <table className={classes.board}>
     <tbody>
       {props.game.pieces.slice(0,6).map( (p, k) => {return <tr>
       {props.game.pieces.slice(k*6,k*6+6).map( (piece, key) => {return <td className= {classes[piece]} id= {classes[props.game.text]}
           onMouseDown={(ev)=> {isMouseDown = true; ev.preventDefault(); props.markPiece(k*6+key);}}
           onMouseOver ={()=> { if (isMouseDown) props.markPiece(k*6+key);}}

           ></td>})}</tr>})}
      </tbody>
    </table>
  </div>
  <div>
   <button  onClick={props.initializeBoard}>
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
