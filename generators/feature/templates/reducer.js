import { fromJS } from 'immutable';

import reducer from './reducer';
import <%= upper %> from '../actions/<%= name %>';

export const init = fromJS({
  entities: {},
  result: [],
});

export const entities = reducer({
  [<%= upper %>.GET_LIST.SUCCESS]: (state, { payload }) => state.merge(payload.entities.<%= plural %>),
  [<%= upper %>.ADD.SUCCESS]: (state, { payload }) => state.merge(payload.entities.<%= plural %>),
  [<%= upper %>.UPDATE.SUCCESS]: (state, { payload }) => state.merge(payload.entities.<%= plural %>),
}, init.get('entities'));

export const result = reducer({
  [<%= upper %>.GET_LIST.SUCCESS]: (state, { payload }) => state.merge(payload.result.<%= plural %>),
  [<%= upper %>.ADD.SUCCESS]: (state, { payload }) => state.push(payload.result.<%= name %>),
  [<%= upper %>.REMOVE.SUCCESS]: (state, { payload }) => state.remove(state.indexOf(payload)),
}, init.get('result'));
