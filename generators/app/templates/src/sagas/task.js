import { fork } from 'redux-saga/effects';

import { TASK } from '../actions';
import { add, getAll, update } from '../api/task';
import { Task, tasks, task } from '../schemas/task';
import { callEvery } from './api';

export default function* flow() {
  yield fork(callEvery, TASK.GET_LIST, getAll, { tasks }, { tasks: Task });
  yield fork(callEvery, TASK.ADD, add, { task }, { task: Task });
  yield fork(callEvery, TASK.UPDATE, update, { task }, { task: Task });
}
