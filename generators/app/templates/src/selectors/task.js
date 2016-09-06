import { createSelector } from 'reselect';

export default createSelector(
  state => state.entities.get('tasks'),
  state => state.result.get('tasks'),
  (tasks, ids) => ids
    .map(id => tasks.get(id))
    .sortBy(task => task.get('isDone')),
);
