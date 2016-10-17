import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import Tasks from '../../components/tasks';

const { describe, it } = global;

describe('components', () => {
  describe('<Task />', () => {
    it('should render tasks', () => {
      const toggle = sinon.spy();
      const tasks = [{
        id: 123,
        content: 'test',
        isDone: false,
      }, {
        id: 321,
        content: 'test2',
        isDone: true,
      }];
      const wrapper = shallow(
        <Tasks tasks={tasks} onToggle={toggle} />
      );
      expect(wrapper.find('ul').children()).to.have.lengthOf(tasks.length);
    });

    it('should call toggle', () => {
      const toggle = sinon.spy();
      const tasks = [{
        id: 123,
        content: 'test',
        isDone: false,
      }];
      const wrapper = shallow(
        <Tasks tasks={tasks} onToggle={toggle} />
      );
      wrapper.find('input').simulate('change');
      expect(toggle.calledOnce).to.equal(true);
    });
  });
});
