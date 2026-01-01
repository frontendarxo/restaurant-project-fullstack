import React from 'react';
import './style.css';

interface FieldProps {
  label?: string;
  type: string;
  id: string;
  className?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export const Field: React.FC<FieldProps> = ({ label, type, id, className, value, onChange, onFocus }) => {
  return (
    <label htmlFor={id}>
      {label && <span>{label}</span>}
      <input
        type={type}
        id={id}
        className={className}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        placeholder={label}
      />
    </label>
  );
};