import React from 'react'
import classes from './Board.scss'
import GameVideo from './assets/playthrough.gif'
import Click from './assets/click.mp3'
import Victory from './assets/win.mp3'

let isMouseDown = false;

const play = (sound) => {
  sound.pause(); sound.currentTime = 0; sound.play();
 };

export const Board = ({props}) =>  (
  <div className={classes.stage}>
    <audio id="clickSound" src={Click}/>
    <audio id="winSound" src={Victory}/>
    <img className={classes[props.game.phase]} alt='Game Tutorial' src={GameVideo}/>
    <table className={classes.board} id={classes[props.game.phase]} onMouseUp =  {()=> {isMouseDown=false; props.removePieces(); props.removeMarks();
                                                                                        if (props.game.pieces.filter(p=>p.type=='marble').length==1)
                                                                                          play(document.getElementById('winSound'));}}>
     <tbody>
       {props.game.pieces.slice(0,6).map((p, k) => {
         return(
           <tr>
            {props.game.pieces.slice(k*6,k*6+6).map((piece, key) => {
                return(
                  <td className= {classes[piece.type]} id= {classes[props.game.text]}
                      onMouseDown={(ev)=> {if (piece.type=='marble') {
                                              isMouseDown = true; ev.preventDefault(); play(document.getElementById('clickSound'));
                                              props.markPiece(k*6+key);}}}
                      onMouseOver ={()=> { if (isMouseDown && piece.type=='marble') {
                                              play(document.getElementById('clickSound'));
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
