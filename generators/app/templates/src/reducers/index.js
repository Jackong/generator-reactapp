import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { fromJS } from 'immutable';

import { TASK } from '../actions';
import Task from '../models/task';

export const init = fromJS({
  result: {
    tasks: [],
  },
  entities: {
    tasks: {},
  },
});

export const reducer = (handlers, initialState) => {
  return (state = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    }
    return state;
  };
};

export const combineImmutableReducers = reducers => (state, action) => {
  let newState = state;
  Object.keys(reducers).forEach(key => {
    newState = newState.set(key, reducers[key](newState.get(key), action));
  });
  return newState;
};

export const tasks = reducer({
  [TASK.TOGGLE.SUCCESS]: (state, { payload }) => {
    if (!state.has(payload.get('id'))) {
      return state;
    }
    return state.update(payload.get('id'), value => value.set('isDone', !value.get('isDone')));
  },
  [TASK.GET_LIST.SUCCESS]: (state) => {
    return state.map(t => new Task(t));
  },
}, init.get('entities').get('tasks'));

export const entities = (state = init.get('entities'), action) => {
  let newState = state;
  if (action.payload && action.payload.entities) {
    newState = state.merge(action.payload.entities);
  }
  return combineImmutableReducers({
    tasks,
  })(newState, action);
};

export const result = (state = init.get('result'), { payload }) => {
  if (payload && payload.result) {
    return state.merge(payload.result);
  }
  return state;
};

export default combineReducers({
  routing: routerReducer,
  entities,
  result,
});
