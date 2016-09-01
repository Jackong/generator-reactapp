import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';

import { USER } from '../../actions';
import { fetchUsers } from '../../sagas';
import { getUsers } from '../../services/user';

const { describe, it } = global;

describe('sagas', () => {
  describe('fetchUsers', () => {
    describe('with normal responsive', () => {
      it('should be success', () => {
        const payload = null;
        const gen = fetchUsers({ payload });
        const users = [
          {
            name: 'jackong',
          },
        ];
        expect(gen.next().value).to.be.eql(
          call(getUsers, payload)
        );

        expect(gen.next({ users }).value).to.be.eql(
          put({ type: USER.GET_LIST.SUCCESS, payload: users })
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });

    describe('with error responsive', () => {
      it('should be failure', () => {
        const payload = null;
        const gen = fetchUsers({ payload });
        const error = new Error('user not found');
        expect(gen.next().value).to.be.eql(
          call(getUsers, payload)
        );

        expect(gen.next({ error }).value).to.be.eql(
          put({ type: USER.GET_LIST.FAILURE, payload: error })
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });
  });
});
