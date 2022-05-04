import './Task.css';
import clsx from 'clsx';
import React, { FC } from 'react';
import AvatarIcon from '../assets/AvatarIcon';

const Task: FC<any> = () => {
  return (
    <div className={clsx('task-wrapper', 'green')}>
      <AvatarIcon />
    </div>
  );
};

export default Task;