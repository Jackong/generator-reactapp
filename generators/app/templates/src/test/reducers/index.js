import { expect } from 'chai';

import { user } from '../../reducers';
import { USER } from '../../actions';

const { describe, it } = global;

describe('reducers', () => {
  describe('user', () => {
    it('should merge the user', () => {
      const expected = { token: 'abc' };
      expect(user({}, {
        type: USER.GET.SUCCESS,
        payload: expected,
      })).to.be.eql(expected);
    });
  });
});
