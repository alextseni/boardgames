import React from 'react';
import { Games } from '../../model/enum';
import { Header } from '../Header/Header';
import styles from './Layout.module.scss';

interface LayoutProps {
  children: React.ReactNode;
  game: Games;
}
export const Layout = ({ children, game }: LayoutProps) => (
  <div className={styles.container}>
    <Header game={game} />
    <div className={styles.content}>{children}</div>
  </div>
);
