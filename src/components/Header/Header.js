import React from 'react';
import { IndexLink, Link } from 'react-router';
import classes from './Header.scss';
import Soundtrack from 'components/Game/assets/Wallpaper.mp3';

let isMuted = false;

const ostPlayPause = (sound) => {
  if (isMuted) {
    sound.play();
    document.getElementById('soundButton').className = 'glyphicon glyphicon-volume-up';
  } else {
    sound.pause();
    document.getElementById('soundButton').className = 'glyphicon glyphicon-volume-off';
  }

  isMuted = !isMuted;
};

export const Header = () => (
  <div>
    <h1 className={classes.title}>Randix!</h1>
    <audio id='ost' autoPlay loop src={Soundtrack} />
    <div className={classes.navigation}>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav">
            <li>
              <IndexLink to='/Randix-Game/' activeClassName={classes.activeRoute}>
              Rules
              </IndexLink>
            </li>
            <li>
              <Link to='/Randix-Game/Online' activeClassName={classes.activeRoute}>
              Online Mode
              </Link>
            </li>
            <li>
              <Link to='/Randix-Game/TwoPlayer' activeClassName={classes.activeRoute}>
              2-Player Mode
              </Link>
            </li>
            <li>
              <Link to='/Randix-Game/vsComp' activeClassName={classes.activeRoute}>
              Computer Mode
              </Link>
            </li>
            <li>
              <Link to='/Randix-Game/about' activeClassName={classes.activeRoute}>
              About
              </Link>
            </li>
            <li
              className ={classes.soundIcon}
              onClick={() => ostPlayPause(document.getElementById('ost'))}>
              <span id='soundButton' className='glyphicon glyphicon-volume-up' />
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
);

export default Header;
