import './TasksContainer.css';
import React, { FC, useEffect, useState } from 'react';
import Task from './Task';
import ButtonSubmit from './ButtonSubmit';
import TaskEditorModal from './TaskEditorModal';
import { findByCategory, getAllTasks, updateTask } from '../api/api';
import { AxiosResponse } from 'axios';
import { DONE, IN_PROGRESS, TODO } from '../constants';
import { ResponseTaskProps, TaskProps } from '../types/task';

const TasksContainer: FC<any> = ({ selectedSorting, searchedText }) => {
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [tasksList, setTasksList] = useState<AxiosResponse[] | any>([]);
  const [filteredTaskList, setFilteredTaskList] = useState<any>([]);
  const toDoList = (filteredTaskList.length ? filteredTaskList : tasksList)?.filter((item: any) => item.status === TODO);
  const inProgressList = (filteredTaskList.length ? filteredTaskList : tasksList)?.filter((item: any) => item.status === IN_PROGRESS);
  const doneList = (filteredTaskList.length ? filteredTaskList : tasksList)?.filter((item: any) => item.status === DONE);

  useEffect(() => {
    if (tasksList) {
      const filteredArray = tasksList.filter((item: TaskProps) => item.description.toLowerCase().includes(searchedText.toLowerCase()));
      setFilteredTaskList(filteredArray);
    }
  }, [tasksList, searchedText]);
  
  const [taskData, setTaskData] = useState({ 
    id: null,
    tag: '',
    description: '',
    category: '',
    assignee: '',
    points: 0,
    createdAt: null,
    updatedAt: null
  });

  const clearTaskData = () => {
    setTaskData({ 
      id: null,
      tag: '',
      description: '',
      category: '',
      assignee: '',
      points: 0,
      createdAt: null,
      updatedAt: null
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

  const loadTasksListByCategory = (selectedSorting: string) => {
    findByCategory(selectedSorting)
      .then(response => {
        setTasksList(response.data);
      })
      .catch(e => {
        console.log(e);
      })    
  }

  const onDragOver = (e: any) => {
    e.preventDefault();
  }

  const onDrop = async (e: any, categoryStatus: string) => {
    const id = e.dataTransfer.getData('id');
    const currentTask = tasksList?.find((item: ResponseTaskProps) => item.id === id);
    if (currentTask.status === categoryStatus) {
      return;
    } else {
      await updateTask(id, {
        id: id,
        tag: currentTask.tag,
        status: categoryStatus,
        description: currentTask.description,
        category: currentTask.category,
        assignee: currentTask.assignee,
        points: currentTask.points
      });
      loadTasksList();
    }
  }

  useEffect(() => {
    if (selectedSorting && selectedSorting !== 'Select category' ) {
      loadTasksListByCategory(selectedSorting);
    } else {
      loadTasksList();
    }
  }, [selectedSorting]);

  useEffect(() => {
    if (isModalOpen) return;
    clearTaskData();
  }, [isModalOpen]);

  return (
    <div className='tasks-container-wrapper'>
      <div 
        key={TODO} 
        className='tasks-container' 
        onDragOver={(e) => onDragOver(e)} 
        onDrop={(e) => onDrop(e, TODO)}
      >
        {toDoList?.length ? (
          toDoList.map((task: TaskProps, i: number) => (
            <Task 
              key={i} 
              task={task} 
              taskData={taskData} 
              setTaskData={setTaskData} 
              setModalOpen={setModalOpen} 
              refreshList={loadTasksList} 
            />
          ))
        ) : null}
        <ButtonSubmit onSubmit={() => setModalOpen(true)} title={'Create task'} />
      </div>
      <div 
        key={IN_PROGRESS} 
        className='tasks-container' 
        onDragOver={(e) => onDragOver(e)} 
        onDrop={(e) => onDrop(e, IN_PROGRESS)}
      >
        {inProgressList?.length ? (
          inProgressList.map((task: TaskProps, i: number) => (
            <Task 
              key={i} 
              task={task}
              taskData={taskData} 
              setTaskData={setTaskData} 
              setModalOpen={setModalOpen} 
              refreshList={loadTasksList} 
            />
          ))
        ) : null}
      </div>
      <div 
        key={DONE} 
        className='tasks-container' 
        onDragOver={(e) => onDragOver(e)} 
        onDrop={(e) => onDrop(e, DONE)}
      >
        {doneList?.length ? (
          doneList.map((task: TaskProps, i: number) => (
            <Task 
              key={i} 
              task={task}
              taskData={taskData} 
              setTaskData={setTaskData}
              setModalOpen={setModalOpen} 
              refreshList={loadTasksList} 
            />
          ))
        ) : null}
      </div>
      <TaskEditorModal 
        taskData={taskData} 
        isModalOpen={isModalOpen} 
        setModalOpen={setModalOpen} 
        refreshList={loadTasksList}
        clearTaskData={clearTaskData} 
      />
    </div>
  );
};

export default TasksContainer;