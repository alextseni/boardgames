import React, {useState} from 'react';
import { Link } from 'gatsby';
import styles from './Header.module.scss';
import { TiVolumeMute, TiVolumeUp } from 'react-icons/ti'
import Soundtrack from '../../assets/Wallpaper.mp3'
import { Games } from '../../model/enum';
import { config } from '../../model/configs';

interface HeaderProps {
  game: Games;
}
export const Header = ({game}: HeaderProps) => {
  const [isMuted, mute] = useState(true);

  const gameConfig = config[game]

  return (
    <div className={styles.top}>
      <div className={styles.header}>
      <h1 className={styles.title}>{gameConfig.title}</h1>
      <span className={styles.sound} onClick = {() => {
        mute(!isMuted);
        const sound: any = document.getElementById('ost');
        isMuted ? sound.play() : sound.pause()
        }}>
          {isMuted ?  <TiVolumeMute size={32} /> : <TiVolumeUp size={32} />}</span>
      </div>
      <audio id='ost' loop src={Soundtrack} />
      <div className={styles.nav}>
        {gameConfig.routes.map(route =>
        <Link
        key={route.route}
          className={styles.tab}
          activeClassName={styles.active}
          to={route.route}>{route.label}
        </Link>,
        )}
      </div>
   </div>
);
};
