import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';

import { TASK } from '../../actions';
import { fetchTasks } from '../../sagas';
import { getTasks } from '../../services/task';

const { describe, it } = global;

describe('sagas', () => {
  describe('fetchTasks', () => {
    describe('with normal responsive', () => {
      it('should be success', () => {
        const payload = null;
        const gen = fetchTasks({ payload });
        const tasks = [
          {
            name: 'jackong',
          },
        ];
        expect(gen.next().value).to.be.eql(
          call(getTasks, payload)
        );

        expect(gen.next({ tasks }).value).to.be.eql(
          put({ type: TASK.GET_LIST.SUCCESS, payload: { tasks } })
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
        const gen = fetchTasks({ payload });
        const error = new Error('user not found');
        expect(gen.next().value).to.be.eql(
          call(getTasks, payload)
        );

        expect(gen.next({ error }).value).to.be.eql(
          put({ type: TASK.GET_LIST.FAILURE, payload: error })
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });
  });
});
