import { createSelector } from 'reselect';

export default createSelector(
  state => state.entities.tasks,
  state => state.result.tasks,
  (tasks, ids) => ids
    .map(id => tasks.get(`${id}`))
    .sortBy(task => task.isDone),
);
