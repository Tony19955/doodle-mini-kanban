import './Input.css';

import React, { FC } from 'react';

const Input: FC<any> = ({ value, onChange, name, title }) => {
  return (
    <div className="input-wrapper">
      <input
        name={name}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='input'
      />
      <label className='label' htmlFor={name}>{title}</label>
    </div>
  );
};

export default Input;