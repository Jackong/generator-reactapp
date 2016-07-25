import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { handleActions } from 'redux-actions';

import { types } from '../actions';

export const initState = {
  user: {},
};

export const user = handleActions({
  [types.SIGN_IN]: (state, { payload }) => ({ ...state, ...payload }),
}, initState.user);

export default combineReducers({
  routing: routerReducer,
  user,
});
