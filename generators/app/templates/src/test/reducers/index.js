import { expect } from 'chai';

import { init, users } from '../../reducers';
import { USER } from '../../actions';

const { describe, it } = global;

describe('reducers', () => {
  describe('users', () => {
    it('should merge the users', () => {
      const expected = [
        {
          name: 'jackong',
        },
      ];
      expect(users(init.get('users'), {
        type: USER.GET_LIST.SUCCESS,
        payload: expected,
      })).to.be.eql(init.get('users').merge(expected));
    });
  });
});
