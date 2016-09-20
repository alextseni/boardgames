import React from 'react';
import classes from './GameInfo.scss';
import {Chip,Avatar,LinearProgress} from 'material-ui';
import {blue300, indigo900} from 'material-ui/styles/colors';

export const GameInfo = ({ game }) => {
  const bar = Math.round((100 - (((game.pieces.filter((p) => p.type === 'marble' ||
              p.type === 'selected').length - 1)) / (game.allMarbles - 1)) * 100));

  const styles = {
    prog: {
      height: 60,
      border: 5,
      borderColor: 'black',
      backgroundColor: '#E5E4E2',
      margin: 70,
      lineHeight: 60,
    },
    chip: {
      margin: 4,
      fontFamily: 'cursive',
      margin: 0,
      verticalAlign: 'middle',
      textAlign: 'center',
      border: 'no'
    },
    wrapper: {
      display: 'flex',
      flexWrap: 'wrap',
},
  }

  return (
    <div>
    <div style={styles.wrapper}>
      <Chip/>
      </div>
      <div className={classes[game.phase]}>
      <LinearProgress style={styles.prog} mode="determinate" value={bar}>
        {`${bar} %`}
      </LinearProgress>
      </div>
    </div>
 );
};

GameInfo.propTypes = {
  game: React.PropTypes.object.isRequired,
};

export default GameInfo;
