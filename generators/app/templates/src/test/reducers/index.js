import { expect } from 'chai';

import { init, tasks } from '../../reducers/entities';
import { TASK } from '../../actions';
import { Task } from '../../schemas/task';

const { describe, it } = global;

describe('reducers', () => {
  describe('tasks', () => {
    describe('when the task not found', () => {
      it('should not be done', () => {
        const payload = new Task({
          id: '123',
          isDone: true,
        });
        expect(tasks(init.get('tasks'), {
          type: TASK.TOGGLE.SUCCESS,
          payload,
        })).to.be.eql(init.get('tasks'));
      });
    });

    describe('when the task found', () => {
      it('should be done', () => {
        const payload = new Task({
          id: '123',
          isDone: true,
        });
        expect(tasks(init.get('tasks').set(payload.get('id'), payload), {
          type: TASK.TOGGLE.SUCCESS,
          payload,
        })).to.be.eql(
          init
          .get('tasks')
          .set(payload.get('id'), payload.set('isDone', !payload.isDone)
        ));
      });
    });
  });
});
