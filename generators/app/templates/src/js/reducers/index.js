import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { routerReducer } from 'react-router-redux';
import { fromJS } from 'immutable';

import types from '../actions/types';

export const initState = fromJS({
  title: null,
});

export const title = handleActions({
  [types.CHANGE_TITLE]: (state, action) => action.payload,
}, initState.get('title'));

export default combineReducers({
  routing: routerReducer,
  title,
});
