import React from 'react'
import { Rules, Rules_old } from 'components/Home';
import {Toggle} from 'material-ui'



export const HomeView = ({changeTheme,view}) => (
  <div>
  <Toggle
     label="Switch View"
     onToggle={changeTheme}
     toggled={view.toggled}
  />
   {view.theme =='material' ?
    <Rules/> :
    <Rules_old />
   }
  </div>
)

export default HomeView
