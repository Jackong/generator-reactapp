import { takeEvery } from 'redux-saga';
import { call, put, fork } from 'redux-saga/effects';

import { USER, action } from '../actions';
import { getUsers } from '../services/user';

export function* fetchUsers({ payload }) {
  const { users, error } = yield call(getUsers, payload);
  if (error) {
    yield put(action(USER.GET_LIST.FAILURE, error));
    return;
  }
  yield put(action(USER.GET_LIST.SUCCESS, users));
}


function* userFlow() {
  yield fork(takeEvery, USER.GET_LIST.REQUEST, fetchUsers);
}

export default function* sagas() {
  yield [
    userFlow(),
  ];
}
