import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { USER } from '../actions';
import { getUser } from '../services/user';

export function* fetchUser({ payload }) {
  const { user, error } = yield call(getUser, payload);
  if (error) {
    yield put({ type: USER.GET_FAILURE, payload: error });
    return;
  }
  yield put({ type: USER.GET_SUCCESS, payload: user });
}

function* userFlow() {
  yield* takeEvery(USER.GET, fetchUser);
}

export default function* sagas() {
  yield [
    userFlow(),
  ];
}
