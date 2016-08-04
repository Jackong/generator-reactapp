import api from './api';

export const signIn = ({ phone, password }) => api
  .custom('user/sign-in')
  .post({ phone, password })
  .then(res => res.body().data())
  .then(data => ({
    ...data.user,
    phone,
  }));
