import { createAction } from 'redux-actions';

import types from './types';
import api from '../api';

export const changeTitle = createAction(types.CHANGE_TITLE, payload => {
  document.title = payload;
  return payload;
});

export const getTitle = () => {
  return dispatch => api
  .custom('title')
  .get()
  .then(res => res.body().data())
  .then(body => dispatch(changeTitle(body.title)));
};
