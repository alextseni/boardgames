import classnames from 'classnames';
import React from 'react';
import * as styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  id?: string;
  onClick: () => void;
  className?: string;
}
export const Button = ({ label, id, onClick, className = '' }: ButtonProps) => (
  <div className={classnames(styles.button, className)} onClick={onClick}>
    <span />
    <span />
    <span />
    <span />
    <span />
    {label}
  </div>
);
