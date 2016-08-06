import React from 'react'
import classes from './Board.scss'
import GameVideo from './assets/playthrough.gif'
import Click from './assets/click.mp3'
import Victory from './assets/win.mp3'

let isMouseDown = false;
const sound =  document.getElementById('clickSound');
const sound2 =  document.getElementById('winSound');

export const Board = ({props}) =>  (
  <div className={classes.stage}>
    <audio id="clickSound">
      <source src={Click}/>
    </audio>
    <audio id="winSound">
      <source src={Victory}/>
    </audio>
    <img className={classes[props.game.phase]} alt='Game Tutorial' src={GameVideo}/>
    <table className={classes.board} id={classes[props.game.phase]} onMouseUp =  {()=> {isMouseDown=false; props.removePieces(); props.removeMarks();
                                                                                        if (props.game.pieces.filter(p=>p.type=='marble').length==1)
                                                                                          {sound2.pause(); sound2.currentTime = 0; sound2.play();}}}>
     <tbody>
       {props.game.pieces.slice(0,6).map((p, k) => {
         return(
           <tr>
            {props.game.pieces.slice(k*6,k*6+6).map((piece, key) => {
                return(
                  <td className= {classes[piece.type]} id= {classes[props.game.text]}
                      onMouseDown={(ev)=> {if (piece.type=='marble') {
                                              isMouseDown = true; ev.preventDefault();
                                              sound.pause(); sound.currentTime = 0; sound.play();
                                              props.markPiece(k*6+key);}}}
                      onMouseOver ={()=> { if (isMouseDown && piece.type=='marble') {
                                              sound.pause(); sound.currentTime = 0; sound.play();
                                              props.markPiece(k*6+key);}}}>
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

export default Board
