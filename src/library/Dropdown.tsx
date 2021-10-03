import React from 'react'
type Option = {
    value: number | string, label: string
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
    <select name={key} id={key}>
        {options.map((option: Option) => <option onClick={() => onChange(option.value)} value={option.value}>{option.label}</option>)}
    </select>
    </>
)