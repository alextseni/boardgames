import React, {useState} from 'react';
import { Link } from 'gatsby';
// import Soundtrack from '../../assets/Wallpaper.mp3';
import  './Header.scss';
import { useEffect } from 'react';

export const Header = () => {
  const [isMuted, mute] = useState(false);

  useEffect(() => {
    const sound: any = document.getElementById('ost')
    if (!sound) {
      return;
    }
    if (isMuted) {
      sound.pause();
    } else {
      sound.play();
    }
  }, [isMuted])

  return (
    <div className={'top'}>
      <div className={'header'}>
      <h1 className={'title'}>Randix!</h1>
      <span onClick = {() => mute(!isMuted)}>Sound</span>
      </div>
      <audio id='ost' loop src={'Soundtrack'} />
      <div className={'nav'}>
      <Link className={'tab'} to='/randix/'>Rules</Link>
      <Link className={'tab'} to='/randix/vs-player'>vs Player</Link>
      <Link className={'tab'} to='/randix/vs-computer'>vs Cp</Link>
      </div>
   </div>
);
};
