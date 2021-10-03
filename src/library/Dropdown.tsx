import React from 'react'
type Option = {
    value: string, label: string
}

interface DropdownProps {
    label: string;
    options: Option[];
    key: string;
    onChange: (value: Option['value']) => void
}

export const Dropdown = ({label, key, options, onChange}: DropdownProps) => (
    <>
    <label htmlFor={key}>{label}</label>
    <select name={key} id={key} onChange={(e) => onChange(e.target.value)}>
        {options.map((option: Option) => <option  value={option.value}>{option.label}</option>)}
    </select>
    </>
)