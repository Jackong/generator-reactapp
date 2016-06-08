import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Home } from '../../containers/home';
import { mount } from 'enzyme';

const { describe, it } = global;

describe('containers', () => {
  describe('Home', () => {
    it('should render correctly', () => {
      const getTitle = sinon.spy();
      mount(<Home.WrappedComponent getTitle={getTitle} />);
      expect(getTitle.calledOnce).to.be.eql(true);
    });
  });
});
