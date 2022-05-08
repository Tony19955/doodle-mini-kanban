import Task from '../models/task.js';

// Create and Save a new Task
export const create = (req, res) => {
  // Validate request
  if (!req.body.category) {
    res.status(400).send({ message: "Body can't be empty" });
    return;
  }

  // Create a Task
  const task = new Task({
    category: req.body.category,
    status: req.body.status ? req.body.status : "to do",
    description: req.body.description,
    tag: req.body.tag,
    assignee: req.body.assignee ? req.body.assignee : "Not assigneed",
    points: req.body.points ? req.body.points : 0,
  });

  // Save Task in the database
  task
    .save(task)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR creating Task"
      });
    });
};

// find one with id
export const findOne = (req, res) => {
  const id = req.params.id;

  Task.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "No Task with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "ERROR creating Task with id=" + id });
    });
};

// Retrieve all Tasks from the database.
export const findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Task.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR finding all Tasks"
      });
    });
};

// Update a task by id
export const update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Body can't be empty"
    });
  }
  
  const id = req.params.id;
  
  Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Couldn't update Task with id=${id}.`
        });
      } else res.send({ message: "Task was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "ERROR updating Task with id=" + id
      });
    });
};

// Delete task by id
export const deleteOne = (req, res) => {
const id = req.params.id;

Task.findByIdAndRemove(id)
  .then(data => {
  if (!data) {
    res.status(404).send({
    message: `Couldn't delete Task with id=${id}.`
    });
  } else {
    res.send({
    message: "Task was deleted successfully!"
    });
  }
  })
  .catch(err => {
  res.status(500).send({
    message: "ERROR updating Task with id=" + id
  });
  });
};

// Delete all tasks
export const deleteAll = (req, res) => {
  Task.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tasks were removed successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR deleting all Tasks"
      });
    });
};

// Find all to do
export const findAllToDo = (req, res) => {
  Task.find({ status: 'to do' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving tasks."
      });
    });
};

// Find all in progress
export const findAllInProgress = (req, res) => {
  Task.find({ status: 'in progress' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving tasks."
      });
    });
};

// Find all done
export const findAllDone = (req, res) => {
  Task.find({ status: 'done' })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "ERROR retrieving tasks."
      });
    });
};
// add methods to get priorities for each as well