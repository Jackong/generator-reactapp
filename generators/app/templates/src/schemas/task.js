import { Schema, arrayOf } from 'normalizr';

export const task = new Schema('tasks');

export const tasks = arrayOf(task);
