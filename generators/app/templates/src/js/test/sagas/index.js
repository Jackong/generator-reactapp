import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';

import { types } from '../../actions';
import { autheticate } from '../../sagas';
import { signIn } from '../../api';

const { describe, it } = global;

describe('sagas', () => {
  describe('autheticate', () => {
    it('should be ok', () => {
      const payload = { phone: '123', password: 'abc' };
      const gen = autheticate({ payload });
      const user = { token: 'xxx' };
      expect(gen.next().value).to.be.eql(
        call(signIn, payload)
      );

      expect(gen.next(user).value).to.be.eql(
        put({ type: types.SIGN_IN, payload: user })
      );

      expect(gen.next()).to.be.eql({
        done: true,
        value: undefined,
      });
    });
  });
});
