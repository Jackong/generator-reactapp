import { takeEvery } from 'redux-saga';
import { put, fork } from 'redux-saga/effects';

import { TASK, action } from '../actions';
import { getTasks } from '../services/task';
import { tasks } from '../schemas/task';
import { callEvery } from './api';

export function* toggleTask({ payload }) {
  //  call api here...
  yield put(action(TASK.TOGGLE.SUCCESS, payload));
}

export default function* flow() {
  yield fork(takeEvery, TASK.TOGGLE.REQUEST, toggleTask);
  yield fork(callEvery, TASK.GET_LIST, getTasks, { tasks });
}
