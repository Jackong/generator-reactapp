import { expect } from 'chai';
import { Map } from 'immutable';

import { initState, user } from '../../reducers';
import { types } from '../../actions';

const { describe, it } = global;

describe('reducers', () => {
  describe('user', () => {
    it('should merge the user', () => {
      const expected = { token: 'abc' };
      expect(user(initState.get('user'), {
        type: types.SIGN_IN,
        payload: expected,
      })).to.be.eql(new Map(expected));
    });
  });
});
