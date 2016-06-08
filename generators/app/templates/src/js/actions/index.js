import { createAction } from 'redux-actions';

import types from './types';
import api from '../api';

export const changeTitle = createAction(types.CHANGE_TITLE, payload => {
  document.title = payload;
  return payload;
});

export const getUsers = () => {
  return dispatch => api
  .custom('users')
  .get()
  .then(res => res.body().data())
  .then(body => dispatch({ type: types.GET_USERS, payload: body.users }));
};
