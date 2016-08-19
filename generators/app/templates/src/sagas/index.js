import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { USER, action } from '../actions';
import { getUser } from '../services/user';

export function* fetchUser({ payload }) {
  const { user, error } = yield call(getUser, payload);
  if (error) {
    yield put(action(USER.GET.FAILURE, error));
    return;
  }
  yield put(action(USER.GET.SUCCESS, user));
}

function* userFlow() {
  yield* takeEvery(USER.GET.REQUEST, fetchUser);
}

export default function* sagas() {
  yield [
    userFlow(),
  ];
}
