import React from 'react';
import classes from './About.scss';
import {Toggle} from 'material-ui';

export const About = ({view,changeTheme}) => (
  <div className={classes.author}>
    <Toggle
       label="Switch View"
       onToggle={changeTheme}
       toggled={view.toggled}
    />
    <p>Created by Alexandra Tseniklidou</p>
    <p>2016</p>
    <p>Built using the Redux-React Starter Kit by David Zukowski</p>
    <p>Sountrack: "Wallpaper" by Kevin MacLeod</p>
  </div>
);

export default About;
