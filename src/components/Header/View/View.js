import React from 'react';
import classes from './View.scss';
import { Toggle } from 'material-ui';
import styles from './Styles';

export const View = ({ view, changeTheme }) => (
  <div>
    <Toggle
      style={styles.toggleB}
      label="Switch View"
      onToggle={changeTheme}
      toggled={view.toggled}
    />
  </div>
);

View.propTypes = {
  view: React.PropTypes.object.isRequired,
  changeTheme: React.PropTypes.func.isRequired,
};

export default View;
