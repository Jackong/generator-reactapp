import { fork } from 'redux-saga/effects';

import <%= upper %> from '../actions/<%= name %>';
import { add, getList, update, remove } from '../apis/<%= name %>';
import { <%= className %>, <%= plural %>, <%= name %> } from '../schemas/<%= name %>';
import { callEvery } from './api';

export default function* flow() {
  yield fork(callEvery, <%= upper %>.GET_LIST, getList, { <%= plural %> }, { <%= plural %>: <%= className %> });
  yield fork(callEvery, <%= upper %>.ADD, add, { <%= name %> }, { <%= name %>: <%= className %> });
  yield fork(callEvery, <%= upper %>.UPDATE, update, { <%= name %> }, { <%= name %>: <%= className %> });
  yield fork(callEvery, <%= upper %>.REMOVE, remove, { <%= name %> }, { <%= name %>: <%= className %> });
}
