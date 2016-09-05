import api, { flat } from './api';
import { tasks } from '../schemas/task';

export const getTasks = () => api
  .custom('tasks')
  .get()
  .then(flat({ tasks }));
