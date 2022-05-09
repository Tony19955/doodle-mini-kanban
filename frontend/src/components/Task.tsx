import './Task.css';
import clsx from 'clsx';
import React, { FC, SyntheticEvent, useState } from 'react';
import AvatarIcon from '../assets/AvatarIcon';
import DeleteIcon from '../assets/DeleteIcon';
import TaskDeleteModal from './TaskDeleteModal';
import { useFullNameIntials } from '../utils/useFullNameInitials';

const Task: FC<any> = ({ setModalOpen, refreshList, setTaskData, task, clearTaskData }) => {

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const { id, tag, status, description, category, assignee, points, createdAt, updatedAt } = task || {};

  const handleTaskEditorOpen = () => {
    setTaskData({ 
      id: id,
      tag: tag,
      status: status,
      description: description,
      category: category,
      assignee: assignee,
      points: points,
      createdAt: createdAt,
      updatedAt: updatedAt
    })
    setModalOpen(true);
  }

  const handleDeleteModalOpen = (e: SyntheticEvent) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  }

  const onDragStart = (e: any, id: string) => {
    e.dataTransfer.setData('id', id);
  }

  return (
    <>
      <div
        onDragStart={(e) => onDragStart(e, id)}
        draggable
        className={clsx('task-wrapper', 'green')}
        onClick={handleTaskEditorOpen}
      >
        <div className='task-avatar'>
          <AvatarIcon />
          <div className='task-assignee'>{useFullNameIntials(assignee)}</div>
        </div>
        <div className='task-content'>
          <div className='task-header'>
            <div className='task-tag'>{tag}</div>
            <button onClick={(e) => handleDeleteModalOpen(e)}>
              <DeleteIcon />
            </button>
          </div>
          <div className='task-description'>{description}</div>
          <div className='task-footer'>
            <div className='task-category'>{category}</div>
            <div className='task-story-points'>{points}</div>
          </div>
        </div>
      </div>
      <TaskDeleteModal taskId={id} refreshList={refreshList} isDeleteModalOpen={isDeleteModalOpen} setDeleteModalOpen={setDeleteModalOpen} clearData={clearTaskData} />
    </>
  );
};

export default Task;