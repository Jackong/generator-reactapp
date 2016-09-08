import api from './api';

export const getTasks = () => api.custom('tasks').get();
export const toggleTask = task => api.custom('task').put(task);
