import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';

import { types } from '../actions';

export const initState = fromJS({
  user: {},
});

export const user = handleActions({
  [types.SIGN_IN]: (state, action) => state.merge(action.payload),
}, initState.get('user'));

export default combineReducers({
  routing: routerReducer,
  user,
});
