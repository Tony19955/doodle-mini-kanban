import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = Schema({
  category: String, 
  status: String,
  description: String,
  tag: String,
  assignee: String,
  points: Number
}, { timestamps: true });

taskSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Task = mongoose.model('Task', taskSchema);


export default Task;