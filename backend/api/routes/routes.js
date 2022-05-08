import { create, deleteAll, deleteOne, findAll, findAllDone, findAllInProgress, findAllToDo, findOne, update } from '../controllers/task.js';
import express from 'express';

const router = express.Router()

const Routes = app => {

  // Create a new task
  router.post("/", create);

  // Retrieve all tasks
  router.get("/", findAll);

  // Retrieve all tasks to do
  router.get("/todo", findAllToDo);

  // Retrieve all tasks in progress
  router.get("/inprogress", findAllInProgress);

  // Retrieve all tasks done
  router.get("/done", findAllDone);

  // Retrieve a single task with id
  router.get("/:id", findOne);

  // Update a task with id
  router.put("/:id", update);

  // Delete a task with id
  router.delete("/:id", deleteOne);

  // delete all tasks
  router.delete("/", deleteAll); 

  // host at '/api/tasks'
  app.use('/v1/api/tasks', router);
};

export default Routes;