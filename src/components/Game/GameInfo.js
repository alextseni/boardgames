import React from 'react';
import classes from './GameInfo.scss';

export const GameInfo = ({ game }) => {
  const bar = Math.round((100 - (((game.pieces.filter((p) => p.type === 'marble' ||
              p.type === 'selected').length - 1)) / (game.allMarbles - 1)) * 100));
  return (
    <div className={classes.info}>
      <span className={'label label-default'} id={classes[game.text.substring(0, 7)]}>
        {game.text}
      </span>
      <div className={classes[game.phase]}>
        <div className={'progress'} id={classes.prog}>
          <div className={'progress-bar'} role={'progressbar'} style={{ width: `${bar}%` }}>
            {`${bar} %`}
          </div>
        </div>
      </div>
    </div>
 );
};

GameInfo.propTypes = {
  game: React.PropTypes.object.isRequired,
};

export default GameInfo;
