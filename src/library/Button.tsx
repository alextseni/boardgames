import React from 'react'
import  './Button.scss';

interface ButtonProps {
    label: string;
    id?: string;
    onClick: () => void;
    className?: string;
}

export const Button = ({label, id, onClick, className}: ButtonProps) => (
    <div className={`button ${className}`} onClick={onClick}>
          <span />
          <span />
          <span />
          <span />
          <span />
    {label}
 </div>
)
