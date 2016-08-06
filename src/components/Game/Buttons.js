import React from 'react'
import classes from './Buttons.scss'
import Button from './assets/button.mp3'

const sound = document.getElementById('buttonSound');

export const Buttons = ({props}) =>  (
  <div>
    <audio id="buttonSound">
      <source src={Button}/>
    </audio>
    <button onClick={()=> {sound.pause(); sound.currentTime = 0; sound.play();
                           props.initializeBoard();}}>
      New Game
    </button>
    <button className={classes[props.game.phase]} onClick= {()=> {sound.pause(); sound.currentTime = 0; sound.play();
                                                                  props.clearBoard();}}>
       Quit
    </button>
  </div>
)

export default Buttons
