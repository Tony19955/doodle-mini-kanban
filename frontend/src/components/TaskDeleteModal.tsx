import './TaskDeleteModal.css';
import React, { FC, SyntheticEvent } from 'react';
import Modal from './Modal';
import ButtonBack from './ButtonBack';
import ButtonSubmit from './ButtonSubmit';
import { deleteTask } from '../api/api';

const TaskDeleteModal: FC<any> = ({ isDeleteModalOpen, setDeleteModalOpen, refreshList, taskId }) => {

  const handleDeleteTask = (e: SyntheticEvent, id: number) => {
    e.stopPropagation();
    deleteTask(id)
    .then(response => {
      console.log(response.data);
      refreshList();
    })
    .catch(e => {
      console.log(e);
    });
  }

  return (
    <Modal isModalOpen={isDeleteModalOpen} setModalOpen={setDeleteModalOpen} overlay >
      <div className='task-delete-modal-wrapper'>
        <h2 className='task-delete-modal-text'>Are you sure you want to delete this task ?</h2>
        <div className='buttons-container'>
          <ButtonBack title={'Back'} onClick={() => setDeleteModalOpen(false)} />
          <ButtonSubmit title={'Delete task'} onSubmit={(e: SyntheticEvent) => handleDeleteTask(e, taskId)} />
        </div>
      </div>
    </Modal>
  );
};

export default TaskDeleteModal;