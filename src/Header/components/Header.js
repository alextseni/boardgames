import React from 'react';
import { Navigation } from 'components/Header';
import { View } from '../containers/viewContainer';

export const Header = () => {

  return (
    <div>
      <Navigation/>
      <View/>
    </div>
  );
}

export default Header;
