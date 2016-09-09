import { fork } from 'redux-saga/effects';

import { TASK } from '../actions';
import { getTasks, toggleTask, addTask } from '../services/task';
import { tasks, task } from '../schemas/task';
import { callEvery } from './api';

export default function* flow() {
  yield fork(callEvery, TASK.TOGGLE, toggleTask);
  yield fork(callEvery, TASK.ADD, addTask, { task });
  yield fork(callEvery, TASK.GET_LIST, getTasks, { tasks });
}
