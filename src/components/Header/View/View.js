import React from 'react';
import classes from './View.scss';
import {Toggle} from 'material-ui'


export const View = ({view, changeTheme}) => (
  <div>
    <Toggle
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
