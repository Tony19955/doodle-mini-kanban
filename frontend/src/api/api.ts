import http from "../http-common";
import { TaskProps } from "../types/task";

export const getAllTasks = () => {
  return http.get("/tasks");
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

export const findByCategory = (category: string) => {
  return http.get(`/tasks?category=${category}`);
}
