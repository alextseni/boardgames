import React from 'react'
import classes from './Buttons.scss'
import Button from './assets/button.mp3'

const play = (sound) => {
  sound.pause(); sound.currentTime = 0; sound.play();
 };

export const Buttons = ({props}) =>  (
  <div>
    <audio id="buttonSound" src={Button} />
    <button onClick={()=> {play(document.getElementById('buttonSound'));
                           props.initializeBoard();}}>
      New Game
    </button>
    <button className={classes[props.game.phase]} onClick= {()=> {play(document.getElementById('buttonSound'));
                                                                  props.clearBoard();}}>
       Quit
    </button>
  </div>
)

export default Buttons
