import restful, { fetchBackend } from 'restful.js';
import fetch from 'isomorphic-fetch';
import qs from 'qs';

import code from '../constants/code';
import env from '../constants/env';
import endpoint from '../constants/endpoint';

const hash = qs.parse(window.location.hash.substr(window.location.hash.indexOf('?') + 1));

const url = endpoint[hash.env || env.PROD];

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
