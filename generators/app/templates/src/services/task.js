import api from './api';

export const getTasks = () => api.custom('tasks').get();
