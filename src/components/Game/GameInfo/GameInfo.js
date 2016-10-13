import React from 'react';
import classes from './GameInfo.scss';
import { Chip, LinearProgress } from 'material-ui';
import { styles } from './Styles.js';

export const GameInfo = ({ game }) => {
  const bar = Math.round((100 - (((game.pieces.filter((p) => p.type === 'marble' ||
              p.type === 'selected').length - 1)) / (game.allMarbles - 1)) * 100));

  return (
    <div className={classes[game.phase]}>
      <Chip style={styles[game.text.substring(0, 7)]}>
        {game.text}
      </Chip>
      <LinearProgress
        style={styles.prog}
        mode="determinate"
        value={bar}
        color='#8BC34A'>
          {`${bar} %`}
      </LinearProgress>
    </div>
 );
};

GameInfo.propTypes = {
  game: React.PropTypes.object.isRequired,
};

export default GameInfo;
