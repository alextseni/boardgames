import React from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Navigation.scss';
import Soundtrack from 'components/Game/assets/Wallpaper.mp3';
import { styles } from './Styles';
import VolumeOn from 'material-ui/svg-icons/AV/volume-up';
import VolumeOff from 'material-ui/svg-icons/AV/volume-off';
import TwoPlayer from 'material-ui/svg-icons/Social/people';
import Computer from 'material-ui/svg-icons/Hardware/computer';
import Online from 'material-ui/svg-icons/Social/public';
import Rules from 'material-ui/svg-icons/AV/library-books';
import About from 'material-ui/svg-icons/Editor/mode-edit';
import { Tabs, Tab } from 'material-ui';

let isMuted = false;

const ostPlayPause = (sound) => {
  if (isMuted) {
    sound.play();
  } else {
    sound.pause();
  }

  isMuted = !isMuted;
};

export const Navigation = () => {

  return (
    <div>
      <h1 className={classes.title}>Randix!</h1>
      <audio id='ost' loop src={Soundtrack} />
      <Tabs tabItemContainerStyle={styles.tab} value={window.location.pathname}>
        <Tab
          value='/Randix-Game/'
          style={styles.tab}
          icon={<Rules />}
          label="Rules"
          containerElement={<IndexLink style={styles.tab} to="/Randix-Game/" />}
        />
        <Tab
          value='/Randix-Game/Online'
          style={styles.tab}
          icon={<Online />}
          label="Online Mode"
          containerElement={<Link style={styles.tab} to="/Randix-Game/Online" />}
        />
        <Tab
          value='/Randix-Game/TwoPlayer'
          style={styles.tab}
          icon={<TwoPlayer />}
          label="VS Player"
          containerElement={<Link style={styles.tab} to="/Randix-Game/TwoPlayer" />}
        />
        <Tab
          value='/Randix-Game/vsComp'
          style={styles.tab}
          icon={<Computer />}
          label="VS Computer"
          containerElement={<Link style={styles.tab} to="/Randix-Game/vsComp" />}
        />
        <Tab
          value='/Randix-Game/about'
          style={styles.tab}
          icon={<About />}
          label="About"
          containerElement={<Link style={styles.tab} to="/Randix-Game/about" />}
        />
        <Tab
          style={styles.tab}
          value='sound'
          icon={<VolumeOn />}
          label="Sound On/Off"
          onClick = {() => ostPlayPause(document.getElementById('ost'))}
        />
      </Tabs>
    </div>
);
};

export default Navigation;
