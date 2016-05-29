import restful, { fetchBackend } from 'restful.js';
import fetch from 'isomorphic-fetch';

import code from './code';

export const API = '/api';

export default url => {
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

  return api;
};
