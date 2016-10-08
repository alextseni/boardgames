import React from 'react'
import { Rules, RulesOld } from 'components/Home';
import {Toggle} from 'material-ui'

const layout = {
  material: () => ([
    <Rules />,
  ]),
  bootstrap:  () => ([
    <RulesOld />,
  ]),
};

export const HomeView = ({view}) => (
  <div>
    {layout[view.theme]()}
  </div>
)

export default HomeView
