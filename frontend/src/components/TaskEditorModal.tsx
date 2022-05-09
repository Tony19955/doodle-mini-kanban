import './TaskEditorModal.css';

import React, { FC, useEffect, useState } from 'react';
import Modal from './Modal';
import Input from './Input';
import ButtonBack from './ButtonBack';
import ButtonSubmit from './ButtonSubmit';
import { createTask, updateTask } from '../api/api';
import { NOT_ASSIGNED } from '../constants';

const TaskEditorModal: FC<any> = ({ isModalOpen, setModalOpen, taskData, clearTaskData, refreshList }) => {
  const [id, setId] = useState('');
  const [status, setStatus] = useState('');
  const [tag, setTag] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [assignee, setAssignee] = useState('');
  const [points, setPoints] = useState(0);
  const [createdAt, setCreatedAt] = useState('');
  const [updatedAt, setUpdatedAt] = useState('');
  const editPost = taskData?.description.length;

  useEffect(() => {
    if (taskData) {
      setId(taskData.id);
      setTag(taskData.tag);
      setStatus(taskData.status);
      setDescription(taskData.description);
      setCategory(taskData.category);
      setAssignee(taskData.assignee);
      setPoints(taskData.points);
      setCreatedAt(taskData.createdAt);
      setUpdatedAt(taskData.updatedAt);
    }
  }, [taskData]);

  const submit = async () => {
    const data = {
      tag: tag,
      status: status,
      description: description,
      category: category,
      assignee: assignee || NOT_ASSIGNED,
      points: points || 0
    }
    editPost ? await updateTask(id, data) : await createTask(data);
    await refreshList();
    clearTaskData();
    setModalOpen(false);
  }

  return (
    <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} clickOutsideClose overlay>
      <div className='task-editor-content'>

        <h1 className='task-editor-title'>{taskData.description.length > 0 ? 'Edit task' : 'Create new task'}</h1>

        <Input name={'tag'} title={'Tag'} value={tag || ''} onChange={setTag} />
        {editPost ? <Input name={'status'} title={'Status'} value={status || ''} onChange={setStatus} /> : null}
        <Input name={'description'} title={'Description'} value={description || ''} onChange={setDescription} />
        <Input name={'category'} title={'Category'} value={category || ''} onChange={setCategory} />
        <Input name={'assignee'} title={'Assignee'} value={assignee || ''} onChange={setAssignee} />
        <Input name={'storypoints'} title={'Story points'} value={points === 0 && !editPost ? '' : points || ''} onChange={setPoints} />

        <div className='task-editor-history'>
        {createdAt ? (
          <>
            <div className='editor-history-title'>Created at</div>
            <div className='editor-history-value'>{createdAt}</div>
          </>
        ) : null}
        {updatedAt ? (
          <>
            <div className='editor-history-title'>Updated at</div>
            <div className='editor-history-value'>{updatedAt}</div> 
          </>
        ) : null}
        </div>

        <div className='buttons-container'>
          <ButtonBack title={'Back'} onClick={() => setModalOpen(false)} />
          <ButtonSubmit title={taskData.description.length > 0 ? 'Edit' : 'Create'} onSubmit={submit} />
        </div>
      </div>
    </Modal>
  );
};

export default TaskEditorModal;