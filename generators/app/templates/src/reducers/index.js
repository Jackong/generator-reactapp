import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fromJS } from 'immutable';

import { USER } from '../actions';

export const init = fromJS({
  users: [],
});

export const reducer = (handlers, initialState) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};

export const users = reducer({
  [USER.GET_LIST.SUCCESS]: (state, { payload }) => state.merge(payload),
}, init.get('users'));

export default combineReducers({
  routing: routerReducer,
  users,
});
