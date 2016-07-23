import React from 'react'
import classes from './Game.scss'

export const Game = (props) => (
  <div>
  <div>
    <h2 className={classes[props.game[64]]}>
      Turns:
      {' '}
      <span>
        {props.game[66]}
      </span>
    </h2>
    <h2 className={classes[props.game[64]]}>
        {props.game[67]}{props.game[68]}
    </h2>
  </div>
  <div className={classes.stage}>
    <table className={classes.board}>
     <tbody>
      <tr>
        <td className= {classes[props.game[0]]} onClick={()=> props.markPiece(0)} ></td>
        <td className= {classes[props.game[1]]} onClick={()=> props.markPiece(1)}></td>
        <td className= {classes[props.game[2]]} onClick={()=> props.markPiece(2)}></td>
        <td className= {classes[props.game[3]]} onClick={()=> props.markPiece(3)}></td>
        <td className= {classes[props.game[4]]} onClick={()=> props.markPiece(4)}></td>
        <td className= {classes[props.game[5]]} onClick={()=> props.markPiece(5)}></td>
        <td className= {classes[props.game[6]]} onClick={()=> props.markPiece(6)}></td>
        <td className= {classes[props.game[7]]} onClick={()=> props.markPiece(7)}></td>
      </tr>
      <tr>
        <td className= {classes[props.game[8]]} onClick={()=> props.markPiece(8)}></td>
        <td className= {classes[props.game[9]]} onClick={()=> props.markPiece(9)}></td>
        <td className= {classes[props.game[10]]} onClick={()=> props.markPiece(10)}></td>
        <td className= {classes[props.game[11]]} onClick={()=> props.markPiece(11)}></td>
        <td className= {classes[props.game[12]]} onClick={()=> props.markPiece(12)}></td>
        <td className= {classes[props.game[13]]} onClick={()=> props.markPiece(13)}></td>
        <td className= {classes[props.game[14]]} onClick={()=> props.markPiece(14)}></td>
        <td className= {classes[props.game[15]]} onClick={()=> props.markPiece(15)}></td>
      </tr>
      <tr>
      <td className= {classes[props.game[16]]} onClick={()=> props.markPiece(16)}></td>
      <td className= {classes[props.game[17]]} onClick={()=> props.markPiece(17)}></td>
      <td className= {classes[props.game[18]]} onClick={()=> props.markPiece(18)}></td>
      <td className= {classes[props.game[19]]} onClick={()=> props.markPiece(19)}></td>
      <td className= {classes[props.game[20]]} onClick={()=> props.markPiece(20)}></td>
      <td className= {classes[props.game[21]]} onClick={()=> props.markPiece(21)}></td>
      <td className= {classes[props.game[22]]} onClick={()=> props.markPiece(22)}></td>
      <td className= {classes[props.game[23]]} onClick={()=> props.markPiece(23)}></td>
      </tr>
      <tr>
      <td className= {classes[props.game[24]]} onClick={()=> props.markPiece(24)}></td>
      <td className= {classes[props.game[25]]} onClick={()=> props.markPiece(25)}></td>
      <td className= {classes[props.game[26]]} onClick={()=> props.markPiece(26)}></td>
      <td className= {classes[props.game[27]]} onClick={()=> props.markPiece(27)}></td>
      <td className= {classes[props.game[28]]} onClick={()=> props.markPiece(28)}></td>
      <td className= {classes[props.game[29]]} onClick={()=> props.markPiece(29)}></td>
      <td className= {classes[props.game[30]]} onClick={()=> props.markPiece(30)}></td>
      <td className= {classes[props.game[31]]} onClick={()=> props.markPiece(31)}></td>
      </tr>
      <tr>
      <td className= {classes[props.game[32]]} onClick={()=> props.markPiece(32)}></td>
      <td className= {classes[props.game[33]]} onClick={()=> props.markPiece(33)}></td>
      <td className= {classes[props.game[34]]} onClick={()=> props.markPiece(34)}></td>
      <td className= {classes[props.game[35]]} onClick={()=> props.markPiece(35)}></td>
      <td className= {classes[props.game[36]]} onClick={()=> props.markPiece(36)}></td>
      <td className= {classes[props.game[37]]} onClick={()=> props.markPiece(37)}></td>
      <td className= {classes[props.game[38]]} onClick={()=> props.markPiece(38)}></td>
      <td className= {classes[props.game[39]]} onClick={()=> props.markPiece(39)}></td>
      </tr>
      <tr>
      <td className= {classes[props.game[40]]} onClick={()=> props.markPiece(40)}></td>
      <td className= {classes[props.game[41]]} onClick={()=> props.markPiece(41)}></td>
      <td className= {classes[props.game[42]]} onClick={()=> props.markPiece(42)}></td>
      <td className= {classes[props.game[43]]} onClick={()=> props.markPiece(43)}></td>
      <td className= {classes[props.game[44]]} onClick={()=> props.markPiece(44)}></td>
      <td className= {classes[props.game[45]]} onClick={()=> props.markPiece(45)}></td>
      <td className= {classes[props.game[46]]} onClick={()=> props.markPiece(46)}></td>
      <td className= {classes[props.game[47]]} onClick={()=> props.markPiece(47)}></td>
      </tr>
      <tr>
      <td className= {classes[props.game[48]]} onClick={()=> props.markPiece(48)}></td>
      <td className= {classes[props.game[49]]} onClick={()=> props.markPiece(49)}></td>
      <td className= {classes[props.game[50]]} onClick={()=> props.markPiece(50)}></td>
      <td className= {classes[props.game[51]]} onClick={()=> props.markPiece(51)}></td>
      <td className= {classes[props.game[52]]} onClick={()=> props.markPiece(52)}></td>
      <td className= {classes[props.game[53]]} onClick={()=> props.markPiece(53)}></td>
      <td className= {classes[props.game[54]]} onClick={()=> props.markPiece(54)}></td>
      <td className= {classes[props.game[55]]} onClick={()=> props.markPiece(55)}></td>
      </tr>
      <tr>
      <td className= {classes[props.game[56]]} onClick={()=> props.markPiece(56)}></td>
      <td className= {classes[props.game[57]]} onClick={()=> props.markPiece(57)}></td>
      <td className= {classes[props.game[58]]} onClick={()=> props.markPiece(58)}></td>
      <td className= {classes[props.game[59]]} onClick={()=> props.markPiece(59)}></td>
      <td className= {classes[props.game[60]]} onClick={()=> props.markPiece(60)}></td>
      <td className= {classes[props.game[61]]} onClick={()=> props.markPiece(61)}></td>
      <td className= {classes[props.game[62]]} onClick={()=> props.markPiece(62)}></td>
      <td className= {classes[props.game[63]]} onClick={()=> props.markPiece(63)}></td>
      </tr>
      </tbody>
    </table>
    </div>

 <div>
 <button className={classes[props.game[65]]} onClick={props.removePieces}>
    Remove!
 </button>
 </div>
  <div>
   <button className='start' onClick={props.initializeBoard}>
     New Game
   </button>
      {' '}
   <button className={classes[props.game[65]]} onClick={props.clearBoard}>
      Quit
   </button>
  </div>
  </div>
)


Game.propTypes = {
  game: React.PropTypes.array.isRequired,
  initializeBoard: React.PropTypes.func.isRequired,
  clearBoard: React.PropTypes.func.isRequired,
  markPiece: React.PropTypes.func.isRequired,
 removePieces: React.PropTypes.func.isRequired,
}

export default Game
