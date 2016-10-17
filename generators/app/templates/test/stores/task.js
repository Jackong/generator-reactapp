import { expect } from 'chai';
import nock from 'nock';
import { observe } from 'mobx';

import Task from '../../src/stores/task';

const { beforeEach, describe, it } = global;

describe('stores', () => {
  describe('task', () => {
    describe('add new task', () => {
      beforeEach(() => {
        nock(/.*/)
        .post('/api/tasks')
        .reply(200, {
          id: 123,
          content: 'test',
          isDone: false,
        });
      });

      it('should update tasks', () => {
        const store = new Task();
        observe(store.tasks, () => {
          expect(store.tasks).to.have.lengthOf(0);
        });
        store.add({ content: 'test' });
      });
    });
  });
});
