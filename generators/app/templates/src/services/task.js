import { normalize, arrayOf } from 'normalizr';

import api from './api';
import task from '../schemas/task';

export const getTasks = () => api
  .custom('tasks')
  .get()
  .then(res => res.body().data())
  .then(data => normalize(data, {
    tasks: arrayOf(task),
  }))
  .catch(error => ({ error }));
