import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';

import { USER } from '../../actions';
import { fetchUser } from '../../sagas';
import { getUser } from '../../services/user';

const { describe, it } = global;

describe('sagas', () => {
  describe('fetchUser', () => {
    describe('with normal responsive', () => {
      it('should be success', () => {
        const payload = { id: '123' };
        const gen = fetchUser({ payload });
        const user = { account: 'xxx' };
        expect(gen.next().value).to.be.eql(
          call(getUser, payload)
        );

        expect(gen.next({ user }).value).to.be.eql(
          put({ type: USER.GET.SUCCESS, payload: user })
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });

    describe('with error responsive', () => {
      it('should be failure', () => {
        const payload = { id: '123' };
        const gen = fetchUser({ payload });
        const error = new Error('user not found');
        expect(gen.next().value).to.be.eql(
          call(getUser, payload)
        );

        expect(gen.next({ error }).value).to.be.eql(
          put({ type: USER.GET.FAILURE, payload: error })
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });
  });
});
