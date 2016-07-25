import restful, { fetchBackend } from 'restful.js';
import fetch from 'isomorphic-fetch';
import qs from 'query-string';

import code from '../constants/code';
import env from '../constants/env';
import endpoint from '../constants/endpoint';

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

export const signIn = ({ phone, password }) => api
  .custom('user/sign-in')
  .post({ phone, password })
  .then(res => res.body().data())
  .then(data => ({
    ...data.user,
    phone,
  }));
