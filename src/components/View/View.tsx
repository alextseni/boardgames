import React from 'react';
interface ViewProps {
view: string;
changeThemre: any;
}
export const View = ({ view, changeTheme }: ViewProps) => (

<label className="switch">
  <input type="checkbox" />
  <span className="slider round" />
</label>

);