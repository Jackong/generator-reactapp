import api from './api';

export const getTasks = () => api.custom('tasks').get();
export const toggleTask = payload => api.custom('tasks').put(payload);
export const addTask = payload => api.custom('tasks').post(payload);
