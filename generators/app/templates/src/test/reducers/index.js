import { expect } from 'chai';

import { init, user } from '../../reducers';
import { USER } from '../../actions';

const { describe, it } = global;

describe('reducers', () => {
  describe('user', () => {
    it('should merge the user', () => {
      const expected = { token: 'abc' };
      expect(user(init.get('user'), {
        type: USER.GET.SUCCESS,
        payload: expected,
      })).to.be.eql(init.get('user').merge(expected));
    });
  });
});
