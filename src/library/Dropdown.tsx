import React, {useState} from 'react'
import { useEffect } from 'react';
import './Dropdown.scss'

type Option = {
    value: string, label: string
}

interface DropdownProps {
    label: string;
    options: Option[];
    id: string;
    onChange: (value: Option['value']) => void
    selectedOption: Option;
}

export const Dropdown = ({label, id, options, onChange, selectedOption}: DropdownProps) => {
    const [isOpen, setOpen] = useState(false);

    const dropdownId = `dropdown-${id}`;
    useEffect(() => {
        const handlClickOutside = (ev: any) => {
            const ignoreClickOnMeElement = document.getElementById(dropdownId);
            const isClickInsideElement = ignoreClickOnMeElement?.contains(ev.target);
            if (!isClickInsideElement) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handlClickOutside);
        return () => document.removeEventListener('click', handlClickOutside);
    }, [setOpen])

    return (
    <>
          <div className={`dropdown-container ${isOpen ? 'dropdown-open' : ''}`} id={dropdownId}>
            <div className="dropdown-toggle" onClick={() => setOpen(!isOpen)}>
              <div>{label}</div><div>{selectedOption.label}</div>
            </div>
            <div className={`dropdown-menu`} onBlur={() => setOpen(false)}>
              <ul className={'dropdown-menu-content'}>
              {options.map((option: Option) => <li key={option.value} onClick={() => {
                  onChange(option.value)
                  setOpen(false);
                  }} className={'dropdown-menu-item'} value={option.value}>{option.label}</li>)}
              </ul>
            </div>
          </div>
    </>
)
    }