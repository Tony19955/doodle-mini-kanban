import './ButtonSubmit.css';
import React, { FC } from 'react';

const ButtonSubmit: FC<any> = ({ title, disabled, onSubmit }) => {
  return (
    <button
      onClick={onSubmit}
      disabled={disabled}
      className='button-submit'
    >
      {title}
    </button>
  );
};

export default ButtonSubmit;