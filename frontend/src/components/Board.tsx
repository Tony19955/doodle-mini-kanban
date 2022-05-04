import './Board.css';
import React, { FC } from 'react';
import BoardHeader from './BoardHeader';
import Search from './Search';
import TasksContainer from './TasksContainer';

const Board: FC<any> = ({ children }) => {
  return (
    <div className='board-wrapper'>
      <Search />
      <BoardHeader />
      <TasksContainer />
    </div>
  );
};

export default Board;