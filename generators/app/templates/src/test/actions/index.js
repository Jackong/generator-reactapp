import { expect } from 'chai';

import { TITLE, changeTitle } from '../../actions';

const { describe, it } = global;

describe('actions', () => {
  describe(TITLE.CHANGE, () => {
    it('should create an action to change title', () => {
      const expectedAction = {
        type: TITLE.CHANGE,
        payload: 'test',
      };
      expect(changeTitle('test')).to.be.eql(expectedAction);
      expect(document.title).to.be.eql('test');
    });
  });
});
