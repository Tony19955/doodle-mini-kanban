import './Search.css';
import React, { FC } from 'react';
import SearchIcon from '../assets/SearchIcon';

const Search: FC<any> = ({ setSearchedText }) => {

  const handleSearchTextChange = (e: any) => {
    e.preventDefault();
    setSearchedText(e.target.value);
  }

  return (
    <div className='search-input-wrapper'>
      <input
        placeholder='Search for task...'
        className='search-input'
        onChange={handleSearchTextChange}
      />
      <button 
        title='Search'
        className='search-input-submit'
      >
        <SearchIcon />
      </button>
    </div>
  );
};

export default Search;