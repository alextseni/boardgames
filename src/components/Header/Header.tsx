import React, {useState} from 'react';
import { Link } from 'gatsby';
import  './Header.scss';
import { TiVolumeMute, TiVolumeUp } from 'react-icons/ti'
import Soundtrack from '../../assets/Wallpaper.mp3'

export const Header = () => {
  const [isMuted, mute] = useState(true);

  const path = document.location.pathname;
  return (
    <div className={'top'}>
      <div className={'header'}>
      <h1 className={'title'}>Randix!</h1>
      <span className={'sound'} onClick = {() => {
        mute(!isMuted);
        const sound: any = document.getElementById('ost');
        isMuted ? sound.play() : sound.pause()
        }}>
          {isMuted ?  <TiVolumeMute size={32} /> : <TiVolumeUp size={32} />}</span>
      </div>
      <audio id='ost' loop src={Soundtrack} />
      <div className={'nav'}>
        {[{link: '/randix', label: 'Home'},
        {link: '/randix/vs-player', label: 'vs Player'},
        {link: '/randix/vs-computer', label: 'vs Cp'} ].map(route => 
        <Link
        key={route.link}
          className={`tab ${path === route.link || path === route.link + '/' ? 'active' : 'disabled'}`}
          to={route.link}>{route.label}
        </Link>
        )}
      </div>
   </div>
);
};
