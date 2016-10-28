import { normalize } from 'normalizr';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, put } from 'redux-saga/effects';

import { action, ERROR } from '../actions';
import { SUCCESS } from '../constants/code';

export function* modelize(data, schemas, models) {
  const { result, entities } = normalize(data, schemas);
  const modelized = {};
  Object.keys(result).forEach((key) => {
    const ids = result[key];
    const modelizedByKey = {};
    if (ids instanceof Array) {
      const entitiesByKey = entities[key];
      const Model = models[key];
      ids.forEach((id) => {
        modelizedByKey[id] = new Model(entitiesByKey[id]);
      });
      modelized[key] = modelizedByKey;
    } else {
      const Model = models[key];
      const schemaKey = schemas[key].getKey();
      const entitiesByKey = entities[schemaKey];
      modelizedByKey[ids] = new Model(entitiesByKey[ids]);
      modelized[schemaKey] = modelizedByKey;
    }
  });
  yield;
  return { result, entities: modelized };
}

export function* callAPI(api, { payload, meta: { types, schemas, models } }) {
  try {
    const res = yield call(api, payload);
    if (res.code && res.code !== SUCCESS) {
      yield put(action(types.FAILURE, res, payload));
      return;
    }
    const keys = Object.keys(schemas);
    let data = res;
    if (keys.length === 1) {
      data = {
        [keys[0]]: res,
      };
    }
    const modelized = yield call(modelize, data, schemas, models);
    yield put(action(types.SUCCESS, modelized));
  } catch (error) {
    yield put(action(ERROR.CATCH, error));
  }
}

export function* callEvery(types, api, schemas, models) {
  yield takeEvery(types.REQUEST, function* ({ payload }) {
    yield callAPI(api, { payload, meta: { types, schemas, models } });
  });
}

export function* callLatest(types, api, schemas, models) {
  yield takeLatest(types.REQUEST, function* ({ payload }) {
    yield callAPI(api, { payload, meta: { types, schemas, models } });
  });
}


export default null;
