import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { normalize } from 'normalizr';

import { action } from '../actions';

export function* callAPI({ payload, meta: { api, types, schemas } }) {
  try {
    const res = yield call(api, payload);
    let data = res;
    if (res.body && typeof res.body === 'function') {
      data = res.body().data();
    }
    yield put(action(types.SUCCESS, normalize(data, schemas)));
  } catch (error) {
    yield put(action(types.FAILURE, error));
  }
}

export function* callEvery(types, api, schemas) {
  yield takeEvery(types.REQUEST, function* ({ payload }) {
    yield callAPI({ payload, meta: { types, api, schemas } });
  });
}

export function* callLatest(types, api, schemas) {
  yield takeLatest(types.REQUEST, function* ({ payload }) {
    yield callAPI({ payload, meta: { types, api, schemas } });
  });
}
