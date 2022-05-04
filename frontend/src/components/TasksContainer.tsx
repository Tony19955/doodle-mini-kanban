import './TasksContainer.css';
import React, { FC } from 'react';
import Task from './Task';

const TasksContainer: FC<any> = () => {
  return (
    <div className='tasks-container-wrapper'>
      <div className='tasks-container'>
        <Task />
      </div>
      <div className='tasks-container'>
        <Task />
      </div>
      <div className='tasks-container'>
        <Task />
      </div>
    </div>
  );
};

export default TasksContainer;