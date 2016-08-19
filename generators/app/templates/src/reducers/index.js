import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import { USER } from '../actions';

function reducer(handlers, initialState) {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
}

export const user = reducer({
  [USER.GET_SUCCESS]: (state, { payload }) => ({ ...state, ...payload }),
}, {});

export default combineReducers({
  routing: routerReducer,
  user,
});
