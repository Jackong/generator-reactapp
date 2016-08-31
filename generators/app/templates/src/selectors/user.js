import { createSelector } from 'reselect';

export default createSelector(
  state => state.user,
  user => user
);
