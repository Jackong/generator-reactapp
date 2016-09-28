import { fromJS } from 'immutable';
import { combineReducers } from 'redux';

import reducer from './reducer';
import { TASK } from '../actions';

export const init = fromJS({
  tasks: {},
});

export const tasks = reducer({
  [TASK.GET_LIST.SUCCESS]: (state, { payload }) => state.merge(payload.entities.tasks),
  [TASK.ADD.SUCCESS]: (state, { payload }) => state.merge(payload.entities.tasks),
  [TASK.UPDATE.SUCCESS]: (state, { payload }) => state.merge(payload.entities.tasks),
}, init.get('tasks'));

export default combineReducers({
  tasks,
});
