import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { normalize, Schema } from 'normalizr';

import { action, ERROR } from '../actions';
import { SUCCESS } from '../constants/code';

export function* callAPI({ payload, meta: { api, types, schemas } }) {
  try {
    const res = yield call(api, payload);
    const data = res.body().data();
    if (data.code !== SUCCESS) {
      yield put(action(types.FAILURE, { request: payload, response: data }));
      return;
    }
    if (!schemas || Object.keys(schemas).length <= 0) {
      yield put({ type: types.SUCCESS, payload });
      return;
    }
    const { result, entities } = normalize(data, schemas);
    Object.keys(schemas).forEach(key => {
      let ids = result[key];
      const schema = schemas[key];
      let schemaKey = key;
      let Model = null;
      if (schema instanceof Schema) {
        schemaKey = schema.getKey();
        ids = [ids];
        Model = schema.getMeta('model');
      } else {
        Model = schema.getItemSchema().getMeta('model');
      }
      const schemaEntities = entities[schemaKey];
      ids.forEach(id => {
        schemaEntities[id] = new Model(schemaEntities[id]);
      });
      entities[schemaKey] = schemaEntities;
    });
    yield put(action(types.SUCCESS, { result, entities }));
  } catch (error) {
    yield put(action(ERROR.CATCH, error));
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
