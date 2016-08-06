import React from 'react'
import classes from './Board.scss'
import GameVideo from './assets/playthrough.gif'

let isMouseDown = false;

export const Board = ({props}) =>  (
  <div className={classes.stage}>
    <img className={classes[props.game.phase]} alt='Game Tutorial' src={GameVideo}/>
    <table className={classes.board} id={classes[props.game.phase]} onMouseUp =  {()=> {isMouseDown=false; props.removePieces(); props.removeMarks();}}>
     <tbody>
       {props.game.pieces.slice(0,6).map((p, k) => {
         return(
           <tr>
            {props.game.pieces.slice(k*6,k*6+6).map((piece, key) => {
                return(
                  <td className= {classes[piece.type]} id= {classes[props.game.text]}
                      onMouseDown={(ev)=> {isMouseDown = true; ev.preventDefault(); props.markPiece(k*6+key);}}
                      onMouseOver ={()=> { if (isMouseDown) props.markPiece(k*6+key);}}>
                  </td>
                )})
            }
            </tr>
          )})
       }
      </tbody>
    </table>
  </div>
)

Board.propTypes = {
 game: React.PropTypes.object,
 markPiece: React.PropTypes.func,
}

export default Board
