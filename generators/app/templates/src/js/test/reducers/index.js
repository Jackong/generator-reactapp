import { expect } from 'chai';

import { state, title } from '../../reducers';
import types from '../../actions/types';

const { describe, it } = global;

describe('reducers', () => {
  describe('title', () => {
    it('should change the title', () => {
      const expected = 'Hello World';
      expect(title(state.get('title'), {
        type: types.CHANGE_TITLE,
        payload: expected,
      })).to.be.eql(expected);
    });
  });
});
