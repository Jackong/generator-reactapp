import { expect } from 'chai';
import { fromJS } from 'immutable';

import { init, tasks } from '../../reducers';
import { TASK } from '../../actions';

const { describe, it } = global;

describe('reducers', () => {
  const entities = init.get('entities');
  describe('tasks', () => {
    describe('when the task not found', () => {
      it('should not be done', () => {
        const payload = fromJS({
          id: '123',
          isDone: true,
        });
        expect(tasks(entities.get('tasks'), {
          type: TASK.TOGGLE.SUCCESS,
          payload,
        })).to.be.eql(entities.get('tasks'));
      });
    });

    describe('when the task found', () => {
      it('should be done', () => {
        const payload = fromJS({
          id: '123',
          isDone: true,
        });
        expect(tasks(entities.get('tasks').set(payload.get('id'), payload), {
          type: TASK.TOGGLE.SUCCESS,
          payload,
        })).to.be.eql(
          entities
          .get('tasks')
          .set(payload.get('id'), payload.set('isDone', !payload.get('isDone'))
        ));
      });
    });
  });
});
