import React from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss';
import Soundtrack from 'components/Game/assets/Wallpaper.mp3';

import VolumeOn from 'material-ui/svg-icons/AV/volume-up'
import VolumeOff from 'material-ui/svg-icons/AV/volume-off'
import TwoPlayer from 'material-ui/svg-icons/Social/people'
import Computer from 'material-ui/svg-icons/Hardware/computer'
import Online from 'material-ui/svg-icons/Social/public'
import Rules from 'material-ui/svg-icons/AV/library-books'
import About from 'material-ui/svg-icons/Editor/mode-edit'
import {AppBar, Tabs, Tab, FontIcon, MenuItem} from 'material-ui'

let isMuted = false;
let soundIcon = VolumeOn;

const ostPlayPause = (sound) => {
  if (isMuted) {
    sound.play();
    soundIcon = VolumeOn
  } else {
    sound.pause();
    soundIcon = VolumeOff
  }
  isMuted = !isMuted;
};
const tabsStyle = {
    backgroundColor: '#ECEFF1',
    border: "none",
};

const buttonStyle = {
    backgroundColor: 'transparent',
    border: "none",

};

export const Header = () => (
  <div>
    <h1 className={classes.title}>Randix!</h1>
    <audio id='ost' autoPlay loop src={Soundtrack} />
    <Tabs style={buttonStyle} value={window.location.pathname}>
      <Tab
      value='/Randix-Game/'

      icon={<Rules/>}
      label="Rules"
      containerElement={<IndexLink to="/Randix-Game/" />}
      />
      <Tab
      value='/Randix-Game/Online'
      style={buttonStyle}
      icon={<Online/>}
      label="Online Mode"
      containerElement={<Link to="/Randix-Game/Online" />}
      />
      <Tab
      value='/Randix-Game/TwoPlayer'
      style={buttonStyle}
      icon={<TwoPlayer/>}
      label="2-Player Mode"
      containerElement={<Link to="/Randix-Game/TwoPlayer" />}
      />
      <Tab
      value='/Randix-Game/vsComp'
      style={buttonStyle}
      icon={<Computer/>}
      label="Computer Mode"
      containerElement={<Link to="/Randix-Game/vsComp" />}
      />
      <Tab
      value='/Randix-Game/about'
      style={buttonStyle}
      icon={<About/>}
      label="About"
      containerElement={<Link to="/Randix-Game/about" />}
      />
      <MenuItem
      icon={<VolumeOn />}
      />
   </Tabs>
  </div>
);

export default Header;
