import { Link } from 'gatsby';
import React from 'react';
import { config } from '../model/configs';
import { Games } from '../model/enum';
import * as styles from './Page.module.scss';

const NotFoundPage = () => (
  <div className={styles.container}>
    <h1>404 - NOT FOUND</h1>
    <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    <h2>Pick one of these</h2>
    <Link className={styles.card} to={config[Games.randix].routes[0].route}>
      {`Play ${config[Games.randix].title}`}
    </Link>
  </div>
);

export default NotFoundPage;
