import React from 'react'
import classes from './GameInfo.scss'

export const GameInfo = ({props}) =>  (
  <div className= {classes.info}>
      <span className="label label-default" id={classes[props.game.text.substring(0,7)]}>  {props.game.text} </span>
      <div className={classes[props.game.phase]}>
          <div className="progress" id={classes.prog}>
               <div className="progress-bar" role="progressbar"
                 style={{width:Math.round((100-(((props.game.pieces.filter((p)=> p.type=='marble' || p.type=='selected').length-1))/(props.game.allMarbles-1))*100)) + '%'}}>
                       {Math.round((100-(((props.game.pieces.filter((p)=> p.type=='marble' || p.type=='selected').length-1))/(props.game.allMarbles-1))*100)) + '%'}
               </div>
          </div>
      </div>
  </div>
)

GameInfo.propTypes = {
 game: React.PropTypes.object,
}

export default GameInfo
