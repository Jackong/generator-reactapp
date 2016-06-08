import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { Home } from '../../containers/home';
import { mount } from 'enzyme';

const { describe, it } = global;

describe('containers', () => {
  describe('Home', () => {
    it('should render correctly', () => {
      const changeTitle = sinon.spy();
      const getUsers = sinon.spy();
      mount(<Home.WrappedComponent changeTitle={changeTitle} getUsers={getUsers} />);
      expect(changeTitle.calledOnce).to.be.eql(true);
    });
  });
});
