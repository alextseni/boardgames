import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  label: string;
  id?: string;
  onClick: () => void;
  className?: string;
}
export const Button = ({ label, id, onClick, className = '' }: ButtonProps) => (
  <div className={`${styles.button} ${className}`} onClick={onClick}>
    <span />
    <span />
    <span />
    <span />
    <span />
    {label}
  </div>
);
