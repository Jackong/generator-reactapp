import { createSelector } from 'reselect';

export default createSelector(
  state => state.users,
  users => users.sort((u1, u2) => (u1.get('age') > u2.get('age') ? 1 : -1)),
);
