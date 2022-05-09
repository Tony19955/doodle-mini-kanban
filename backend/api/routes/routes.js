import { create, deleteOne, findAll, update } from '../controllers/task.js';
import express from 'express';

const router = express.Router()

const Routes = app => {

  // Create a new task
  router.post("/", create);

  // Retrieve all tasks
  router.get("/", findAll);

  // Update a task with id
  router.put("/:id", update);

  // Delete a task with id
  router.delete("/:id", deleteOne);

  // host at '/api/tasks'
  app.use('/v1/api/tasks', router);
};

export default Routes;