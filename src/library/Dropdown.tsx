import React, { useEffect, useState } from 'react';
import styles from './Dropdown.module.scss';

type Option = {
  value: string;
  label: string;
};

interface DropdownProps {
  label: string;
  options: Option[];
  id: string;
  onChange: (value: Option['value']) => void;
  selectedOption: Option;
  className?: string;
}

export const Dropdown = ({
  label,
  id,
  options,
  onChange,
  selectedOption,
  className = '',
}: DropdownProps) => {
  const [isOpen, setOpen] = useState(false);

  const dropdownId = `dropdown-${id}`;
  useEffect(() => {
    const handlClickOutside = (ev: any) => {
      const ignoreClickOnMeElement = document.getElementById(dropdownId);
      const isClickInsideElement = ignoreClickOnMeElement?.contains(ev.target);
      if (!isClickInsideElement) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handlClickOutside);
    return () => document.removeEventListener('click', handlClickOutside);
  }, [setOpen]);

  return (
    <>
      <div
        className={`${styles.dropdownContainer} ${
          isOpen ? styles.dropdownOpen : ''
        } ${className}`}
        id={dropdownId}>
        <div className={styles.dropdownToggle} onClick={() => setOpen(!isOpen)}>
          <div className={styles.dropdownMenuLabel}>{label}</div>
          <div>{selectedOption.label}</div>
        </div>
        <div className={styles.dropdownMenu} onBlur={() => setOpen(false)}>
          <ul className={styles.dropdownMenuContent}>
            {options.map((option: Option) => (
              <li
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={styles.dropdownMenuItem}
                value={option.value}>
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
