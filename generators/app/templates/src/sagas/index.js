import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { types } from '../actions';
import { signIn } from '../services/user';

export function* autheticate({ payload }) {
  const user = yield call(signIn, payload);
  yield put({ type: types.SIGN_IN, payload: user });
}

function* signInFlow() {
  yield* takeEvery(types.SIGN_IN_REQUEST, autheticate);
}

export default function* sagas() {
  yield [
    signInFlow(),
  ];
}
