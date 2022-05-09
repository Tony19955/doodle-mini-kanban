import './Board.css';
import React, { useState } from 'react';
import BoardHeader from './BoardHeader';
import Search from './Search';
import TasksContainer from './TasksContainer';
import SelectBox from './SelectBox';

const Board = () => {

  const [searchedText, setSearchedText] = useState('');
  const [selectedSorting, setSelectedSorting] = useState('Select category');

  return (
    <div className='board-wrapper'>
      <div className='filters-container'>
        <Search searchedText={searchedText} setSearchedText={setSearchedText} />
        <SelectBox selectedSorting={selectedSorting} setSelectedSorting={setSelectedSorting} />
      </div>
      <BoardHeader />
      <TasksContainer
        searchedText={searchedText}
        selectedSorting={selectedSorting}
        />
    </div>
  );
};

export default Board;