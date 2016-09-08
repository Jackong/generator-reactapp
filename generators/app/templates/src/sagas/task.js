import { fork } from 'redux-saga/effects';

import { TASK } from '../actions';
import { getTasks, toggleTask } from '../services/task';
import { tasks } from '../schemas/task';
import { callEvery } from './api';

export default function* flow() {
  yield fork(callEvery, TASK.TOGGLE, toggleTask);
  yield fork(callEvery, TASK.GET_LIST, getTasks, { tasks });
}
