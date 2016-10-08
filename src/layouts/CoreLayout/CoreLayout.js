import React from 'react'
import Header from 'Header'
import classes from './CoreLayout.scss'
import '../../styles/core.scss'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export const CoreLayout = ({ store, children }) => (
  <div className='container text-center'>
    <Header />
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)

CoreLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default CoreLayout
