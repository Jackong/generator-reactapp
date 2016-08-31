import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fromJS } from 'immutable';

import { USER } from '../actions';

export const init = fromJS({
  user: {},
});

export const reducer = (handlers, initialState) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};

export const user = reducer({
  [USER.GET.SUCCESS]: (state, { payload }) => state.merge(payload),
}, init.get('user'));

export default combineReducers({
  routing: routerReducer,
  user,
});
