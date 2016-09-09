import restful, { fetchBackend } from 'restful.js';
import fetch from 'isomorphic-fetch';

import config from '../config';

const url = config.API;

const api = restful(url, fetchBackend(fetch));

export default api;
