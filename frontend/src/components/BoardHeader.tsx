import './BoardHeader.css';
import React, { FC } from 'react';

const BoardHeader: FC<any> = () => {
  return (
    <header className='board-header'>
      <div className='board-header-item'>
        <div className='board-header-item-title'>To do</div>
      </div>
      <div className='board-header-item'>
        <div className='board-header-item-title'>In progress</div>
      </div>
      <div className='board-header-item'>
        <div className='board-header-item-title'>Done</div>
      </div>
    </header>
  );
};

export default BoardHeader;