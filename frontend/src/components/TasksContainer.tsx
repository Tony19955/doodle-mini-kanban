import './TasksContainer.css';
import React, { FC, useEffect, useState } from 'react';
import Task from './Task';
import ButtonSubmit from './ButtonSubmit';
import TaskEditorModal from './TaskEditorModal';
import { getAllTasks } from '../api/api';
import { AxiosResponse } from 'axios';

const TasksContainer: FC<any> = () => {
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasksList, setTasksList] = useState<AxiosResponse[] | any>([]);
  const toDoList = tasksList?.filter((item: any) => item.status === 'to do');
  const inProgressList = tasksList?.filter((item: any) => item.status === 'in progress');
  const doneList = tasksList?.filter((item: any) => item.status === 'done');
  
  const [taskData, setTaskData] = useState({ 
    id: null,
    tag: '',
    description: '',
    category: '',
    assignee: '',
    points: 0
  });

  const clearTaskData = () => {
    setTaskData({ 
      id: null,
      tag: '',
      description: '',
      category: '',
      assignee: '',
      points: 0
    });  
  }

  const loadTasksList = () => {
    getAllTasks()
    .then(response => {
      setTasksList(response.data);
    })
    .catch(e => {
      console.log(e);
    })    
  }

  useEffect(() => {       
    loadTasksList();
  }, []);

  useEffect(() => {
    if (isModalOpen) return;
    clearTaskData();
  }, [isModalOpen]);

  return (
    <div className='tasks-container-wrapper'>
      <div key={'todo'} className='tasks-container'>
        {toDoList?.length ? (
          toDoList.map((task: any, { id }: any) => (
            <Task key={id} setModalOpen={setModalOpen} task={task} taskData={taskData} setTaskData={setTaskData} refreshList={loadTasksList} />
          ))
        ) : null}
        <ButtonSubmit onSubmit={() => setModalOpen(true)} title={'Create task'} />
      </div>
      <div key={'inprogress'} className='tasks-container'>
        {inProgressList?.length ? (
          inProgressList.map((task: any, { id }: any) => (
            <Task key={id} setModalOpen={setModalOpen} task={task} taskData={taskData} setTaskData={setTaskData} refreshList={loadTasksList} />
          ))
        ) : null}
      </div>
      <div key={'done'} className='tasks-container'>
        {doneList?.length ? (
          doneList.map((task: any, { id }: any) => (
            <Task key={id} setModalOpen={setModalOpen} task={task} taskData={taskData} setTaskData={setTaskData} refreshList={loadTasksList} />
          ))
        ) : null}
      </div>
      <TaskEditorModal isModalOpen={isModalOpen} setModalOpen={setModalOpen} taskData={taskData} clearTaskData={clearTaskData} refreshList={loadTasksList} />
    </div>
  );
};

export default TasksContainer;