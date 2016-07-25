import { createAction } from 'redux-actions';

export const types = {};

const type = tp => {
  types[tp] = tp;
};

type('CHANGE_TITLE');
type('SIGN_IN_REQUEST');
type('SIGN_IN');

export const changeTitle = createAction(types.CHANGE_TITLE, payload => {
  document.title = payload;
  return payload;
});

export const signIn = createAction(types.SIGN_IN_REQUEST);
