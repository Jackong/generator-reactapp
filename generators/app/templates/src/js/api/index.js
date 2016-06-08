import restful, { fetchBackend } from 'restful.js';
import fetch from 'isomorphic-fetch';
import qs from 'query-string';

import code from './code';
import endpoint from './endpoint';
import env from '../constants/env';

const query = qs.parse(window.location.search);

const url = endpoint[query.env || env.PROD];

const api = restful(url, fetchBackend(fetch));

api.addErrorInterceptor((error) => {
  return Promise.reject(error);
});

api.addResponseInterceptor((response, config) => {
  const { data, statusCode } = response;
  if (data.code === code.SUCCESS) {
    return response;
  }
  return Promise.reject(
    new Error(`${config.method} ${config.url} => ${statusCode} ${JSON.stringify(data)}`)
  );
});

export default api;
