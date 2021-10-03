import React from 'react'
import  './Button.scss';

interface ButtonProps {
    label: string;
    id?: string;
    onClick: () => void;
}

export const Button = ({label, id, onClick}: ButtonProps) => (
    <button className={'button'} onClick={onClick}>
    {label}
 </button>
)