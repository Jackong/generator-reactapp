import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { action, ERROR } from '../actions';
import { SUCCESS } from '../constants/code';

export function* callAPI({ payload, meta: { api, types } }) {
  try {
    const { ...data, code, result, entities } = yield call(api, payload);
    if (code && code !== SUCCESS) {
      yield put(action(types.FAILURE, { code, ...data }, payload));
      return;
    }
    yield put(action(types.SUCCESS, { result, entities, ...data }, payload));
  } catch (error) {
    yield put(action(ERROR.CATCH, error, payload));
  }
}

export function* callEvery(types, api) {
  yield takeEvery(types.REQUEST, function* ({ payload }) {
    yield callAPI({ payload, meta: { types, api } });
  });
}

export function* callLatest(types, api) {
  yield takeLatest(types.REQUEST, function* ({ payload }) {
    yield callAPI({ payload, meta: { types, api } });
  });
}
