import './SelectBox.css';
import React, { FC, useRef, useState } from 'react';
import ArrowDownIcon from '../assets/ArrowDownIcon';

const SelectBox: FC<any> = ({ options, selectedSorting, setSelectedSorting }) => {

  const ref = useRef<HTMLDivElement>(null);
  const [selectBoxOpen, setSelectBoxOpen] = useState(false);

  options = ['', 'Swiss Re', 'iptiQ', 'Corporate'];

  const handleSelectBoxOpen = (e: any) => {
    e.preventDefault();
    setSelectBoxOpen(!selectBoxOpen)
  }

  const handleOptionSelection = (option: string) => {
    if (!option) {
      setSelectedSorting('Select category');
    } else {
      setSelectedSorting(option);
    }
    setSelectBoxOpen(false);
  }

  return (
    <div 
      ref={ref}
      className='dropdown-container' 
    >
      <button
        onClick={handleSelectBoxOpen}
        className='dropdown-button'
      >
        {selectedSorting}
        <ArrowDownIcon />
      </button>
      {selectBoxOpen ? (
        <div className='dropdown-options'>
          {options?.map((option: string, i: number) => (
            <button 
              key={i}
              className='dropdown-option'
              onClick={() => handleOptionSelection(option)}
            >
              {option}
            </button>
          ))}
        </div>
      ): null}
    </div>
  );
};

export default SelectBox;