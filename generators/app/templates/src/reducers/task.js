import { fromJS } from 'immutable';

import reducer from './reducer';
import TASK from '../actions/task';

export const init = fromJS({
  entities: {},
  result: [],
});

export const entities = reducer({
  [TASK.GET_LIST.SUCCESS]: (state, { payload }) => state.merge(payload.entities.tasks),
  [TASK.ADD.SUCCESS]: (state, { payload }) => state.merge(payload.entities.tasks),
  [TASK.UPDATE.SUCCESS]: (state, { payload }) => state.merge(payload.entities.tasks),
}, init.get('entities'));

export const result = reducer({
  [TASK.GET_LIST.SUCCESS]: (state, { payload }) => state.merge(payload.result.tasks),
  [TASK.ADD.SUCCESS]: (state, { payload }) => state.push(payload.result.task),
}, init.get('result'));
