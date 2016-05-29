import { expect } from 'chai';
import sinon from 'sinon';
import { Home } from '../../containers/home';

const { describe, it, mockRender } = global;

describe('containers', () => {
  describe('Home', () => {
    it('should render correctly', () => {
      const { props } = mockRender(Home, {
        changeTitle: sinon.spy(),
      });
      expect(props.changeTitle.calledOnce).to.be.eql(true);
    });
  });
});
