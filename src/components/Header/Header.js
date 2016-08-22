import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1 className={classes.title}>Randix!</h1>
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
    <Link to='/Randix-Game/game' activeClassName={classes.activeRoute}>
      Play!
    </Link>
    </li>
    <li>
    <Link to='/Randix-Game/about' activeClassName={classes.activeRoute}>
      About
    </Link>
    </li>
    </ul>
    </div>
   </nav>
  </div>
  </div>
)

export default Header
