import { createSelector } from 'reselect';

export default createSelector(
  state => state.entities.<%= plural %>,
  state => state.result.<%= plural %>,
  (<%= plural %>, ids) => ids
    .map(id => <%= plural %>.get(`${id}`)),
);
