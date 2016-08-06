import React from 'react'
import classes from './Buttons.scss'


export const Buttons = ({props}) =>  (
  <div>
    <button onClick={props.initializeBoard}>
      New Game
    </button>
    <button className={classes[props.game.phase]} onClick={props.clearBoard}>
       Quit
    </button>
  </div>
)

export default Buttons
