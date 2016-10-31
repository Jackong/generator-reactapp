import { Schema, arrayOf } from 'normalizr';
import { Record } from 'immutable';

export const Task = new Record({
  id: undefined,
  content: '',
  isDone: false,
});

export const task = new Schema('tasks');

export const tasks = arrayOf(task);
