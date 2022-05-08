import './ButtonBack.css';
import React, { FC } from 'react';

const ButtonBack: FC<any> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='button-back'
    >
      {title}
    </button>
  );
};

export default ButtonBack;