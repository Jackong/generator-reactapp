import { expect } from 'chai';

import { initState, title } from '../../reducers';
import { CHANGE_TITLE } from '../../actions';

const { describe, it } = global;

describe('reducers', () => {
  describe('title', () => {
    it('should change the title', () => {
      const expected = 'Hello World';
      expect(title(initState.get('title'), {
        type: CHANGE_TITLE,
        payload: expected,
      })).to.be.eql(expected);
    });
  });
});
