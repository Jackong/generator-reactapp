import { Schema, arrayOf } from 'normalizr';
import { Record } from 'immutable';

export const Task = new Record({
  id: undefined,
  content: '',
  isDone: false,
});

export const task = new Schema('tasks', { meta: { model: Task } });

export const tasks = arrayOf(task);
