import { fork } from 'redux-saga/effects';

import TASK from '../actions/task';
import { add, getList, update } from '../apis/task';
import { Task, tasks, task } from '../schemas/task';
import { callEvery } from './api';

export default function* flow() {
  yield fork(callEvery, TASK.GET_LIST, getList, { tasks }, { tasks: Task });
  yield fork(callEvery, TASK.ADD, add, { task }, { task: Task });
  yield fork(callEvery, TASK.UPDATE, update, { task }, { task: Task });
}
