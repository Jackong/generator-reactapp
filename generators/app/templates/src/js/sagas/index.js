import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { GET_TITLE, CHANGE_TITLE } from '../actions';
import api from '../api';


function *fetchTitle() {
  const res = yield call(api.custom('title').get);
  const body = res.body().data();
  document.title = body.title;
  yield put({ type: CHANGE_TITLE, payload: body.title });
}

function *watchTitle() {
  yield* takeEvery(GET_TITLE, fetchTitle);
}

export default function* sagas() {
  yield [
    watchTitle(),
  ];
}
