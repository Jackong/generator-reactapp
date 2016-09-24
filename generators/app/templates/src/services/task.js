import api from './api';

export const getTasks = () => api.custom('tasks').get();
export const toggleTask = payload => api.custom(`tasks/${payload.id}`).put();
export const addTask = payload => api.custom('tasks').post(payload);
