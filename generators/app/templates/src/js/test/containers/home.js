import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Home } from '../../containers/home';
import { mount } from 'enzyme';

const { describe, it } = global;

describe('containers', () => {
  describe('Home', () => {
    it('should render correctly', () => {
      const dispatch = sinon.spy();
      mount(<Home.WrappedComponent dispatch={dispatch} />);
      expect(dispatch.calledOnce).to.be.eql(true);
    });
  });
});
