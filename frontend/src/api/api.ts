import http from "../http-common";
import { TaskProps } from "../types/task";

export const getAllTasks = () => {
  return http.get("/tasks");
}
  
export const getToDo = () => {
  return http.get("/tasks/todo");
}
  
export const getInProgress = () => {
  return http.get("/tasks/inprogress");
}
  
export const getDone = () => {
  return http.get("/tasks/done");
}

export const get = (id: number) => {
  return http.get(`/tasks/${id}`);
}

export const createTask = (data: TaskProps) => {
  return http.post("/tasks", data);
}

export const updateTask = (id: string, data: any) => {
  return http.put(`/tasks/${id}`, data);
}

export const deleteTask = (id: number) => {
  return http.delete(`/tasks/${id}`);
}

export const deleteAll = () => {
  return http.delete(`/tasks`);
}

export const findByTitle = (title: string) => {
  return http.get(`/tasks?title=${title}`);
}
