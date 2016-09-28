import { fork } from 'redux-saga/effects';

import { TASK } from '../actions';
import { get, update, add } from '../services/task';
import { callEvery } from './api';

export default function* flow() {
  yield fork(callEvery, TASK.UPDATE, update);
  yield fork(callEvery, TASK.ADD, add);
  yield fork(callEvery, TASK.GET_LIST, get);
}
