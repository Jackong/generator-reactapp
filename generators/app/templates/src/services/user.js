import api from './api';

export const getUsers = () => api
  .custom('users')
  .get()
  .then(res => res.body().data())
  .catch(error => ({ error }));
