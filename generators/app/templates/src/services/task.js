import { tasks, task } from '../schemas/task';
import api, { modelize } from './api';

export const get = () => api
  .all('tasks')
  .getAll()
  .then(res => res.body())
  .then(entities => entities.map(entity => entity.data()))
  .then(entities => modelize({ tasks: entities }, { tasks }));

export const update = payload => api
  .one('tasks', payload.id)
  .put(payload)
  .then(res => res.body().data())
  .then(entity => modelize({ task: entity }, { task }));

export const add = payload => api
  .all('tasks')
  .post(payload)
  .then(res => res.body().data())
  .then(entity => modelize({ task: entity }, { task }));
