import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import { routerReducer } from 'react-router-redux';
import { fromJS } from 'immutable';

import { CHANGE_TITLE } from '../actions';

export const initState = fromJS({
  title: null,
});

export const title = handleActions({
  [CHANGE_TITLE]: (state, action) => action.payload,
}, initState.get('title'));

export default combineReducers({
  routing: routerReducer,
  title,
});
