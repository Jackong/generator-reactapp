import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

import { TASK, action } from '../actions';
import { getTasks } from '../services/task';

export function* fetchTasks({ payload }) {
  const { ...normalized, error } = yield call(getTasks, payload);
  if (error) {
    yield put(action(TASK.GET_LIST.FAILURE, error));
    return;
  }
  yield put(action(TASK.GET_LIST.SUCCESS, normalized));
}

export function* toggleTask({ payload }) {
  //  call api here...
  yield put(action(TASK.TOGGLE.SUCCESS, payload));
}

function* taskFlow() {
  yield fork(takeEvery, TASK.GET_LIST.REQUEST, fetchTasks);
  yield fork(takeEvery, TASK.TOGGLE.REQUEST, toggleTask);
}

export default function* sagas() {
  yield [
    taskFlow(),
  ];
}
