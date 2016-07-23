import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>Randix!</h1>
    <IndexLink to='/' activeClassName={classes.activeRoute}>
      Rules
    </IndexLink>

    {' · '}
    <Link to='/game' activeClassName={classes.activeRoute}>
      Play!
    </Link>

    {' · '}
    <Link to='/about' activeClassName={classes.activeRoute}>
      About
    </Link>
  </div>
)

export default Header
