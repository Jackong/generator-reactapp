import { expect } from 'chai';

import { types, changeTitle } from '../../actions';

const { describe, it } = global;

describe('actions', () => {
  describe(types.CHANGE_TITLE, () => {
    it('should create an action to change title', () => {
      const expectedAction = {
        type: types.CHANGE_TITLE,
        payload: 'test',
      };
      expect(changeTitle('test')).to.be.eql(expectedAction);
      expect(document.title).to.be.eql('test');
    });
  });
});
