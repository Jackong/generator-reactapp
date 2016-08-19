import api from './api';

export const getUser = ({ id }) => api
  .custom('user')
  .get({ id })
  .then(res => res.body().data());
