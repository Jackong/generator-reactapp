import { combineReducers } from 'redux';
import { fromJS } from 'immutable';

import reducer from './reducer';
import { TASK } from '../actions';

export const init = fromJS({
  tasks: [],
});

export const tasks = reducer({
  [TASK.GET_LIST.SUCCESS]: (state, { payload }) => state.merge(payload.result.tasks),
  [TASK.ADD.SUCCESS]: (state, { payload }) => state.push(payload.result.task),
}, init.get('tasks'));

export default combineReducers({
  tasks,
});
