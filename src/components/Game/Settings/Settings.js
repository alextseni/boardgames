import React from 'react';
import classes from './Settings.scss';
import {MenuItem, DropDownMenu} from 'material-ui';
import {styles} from './Styles.js'

export const Settings = ({ game, changeDifficulty, changeBoard, initializeBoard }) => {

  return (
    <div className={`${classes[game.phase]} ${classes.settings}`}>
      <p className={classes.label}>Board:</p>
      <DropDownMenu listStyle={styles.menu}
        labelStyle={styles.menuLabel}
        value={game.options.size}
      >
        <MenuItem
          style={styles.menuItem}
          onClick={() => {changeBoard(4); initializeBoard(game.options.size);}}
          value={4} primaryText="4x4"
        />
        <MenuItem
        style={styles.menuItem}
        onClick={() => {changeBoard(5); initializeBoard(game.options.size);}}
        value={5} primaryText="5x5"
        />
        <MenuItem
        style={styles.menuItem}
        onClick={()=> {changeBoard(6); initializeBoard(game.options.size);}}
        value={6} primaryText="6x6"
        />
      </DropDownMenu>
      {window.location.pathname === '/Randix-Game/vsComp' ? [
        <p className={classes.label}>Difficulty:</p>,
        <DropDownMenu
          listStyle={styles.menu}
          labelStyle={styles.menuLabel}
          value={game.options.difficulty}
        >
          <MenuItem
            style={styles.menuItem}
            onClick={()=> {changeDifficulty('easy'); initializeBoard(game.options.size);}}
            value={'easy'} primaryText="Easy"
          />
          <MenuItem
            style={styles.menuItem}
            onClick={()=> {changeDifficulty('normal'); initializeBoard(game.options.size);}}
            value={'normal'} primaryText="Normal"
          />
          <MenuItem
            style={styles.menuItem}
            onClick={()=> {changeDifficulty('hard'); initializeBoard(game.options.size);}}
            value={'hard'} primaryText="Hard"
          />
        </DropDownMenu>,
      ] : <span />}
    </div>
 );
};

Settings.propTypes = {
  game: React.PropTypes.object.isRequired,
  changeDifficulty: React.PropTypes.func.isRequired,
  changeBoard: React.PropTypes.func.isRequired,
  initializeBoard: React.PropTypes.func.isRequired,
};

export default Settings;
