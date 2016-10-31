<% if (sm === 'redux') { %>
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { List } from 'immutable';

import { action } from '../actions';
import TASK from '../actions/task';
import selector from '../selectors/task';<% } else { %>
import React from 'react';
import { observer, PropTypes } from 'mobx-react';<% } %>

import Hello from '../components/hello';
import Tasks from '../components/tasks';
import styles from './home.css';
<% if (sm === 'redux') { %>
@connect((state, props) => ({
  tasks: selector(state, props),
}))
export default class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    tasks: PropTypes.instanceOf(List).isRequired,
  }
  componentWillMount() {
    this.props.dispatch(action(TASK.GET_LIST.REQUEST));
  }
  onToggle = (task) => {
    this.props.dispatch(action(TASK.UPDATE.REQUEST, task.set('isDone', !task.isDone)));
  }
  onAdd = () => {
    this.props.dispatch(action(TASK.ADD.REQUEST, { content: this.task.value }));
  }
  render() {
    return (
      <div>
        <Hello styles={styles}>
          reactapp
        </Hello>
        <input ref={(ref) => { this.task = ref; }} type="text" placeholder="Enter task" />
        <button onClick={this.onAdd}>Add</button>
        <Tasks tasks={this.props.tasks} onToggle={this.onToggle} />
      </div>
    );
  }
}
<% } else { %>
@observer(['task'])
export default class Home extends React.PureComponent {
  static propTypes = {
    task: PropTypes.observableObject.isRequired,
  }
  componentWillMount() {
    this.props.task.getList();
  }
  onAdd = () => {
    this.props.task.add({ isDone: false, content: this.task.value });
    this.task.value = '';
  }
  onToggle = (task) => {
    this.props.task.update({ ...task, isDone: !task.isDone });
  }
  render() {
    return (
      <div>
        <Hello styles={styles}>
          reactapp
        </Hello>
        <input ref={(ref) => { this.task = ref; }} type="text" placeholder="Enter task" />
        <button onClick={this.onAdd}>Add</button>
        <Tasks tasks={this.props.task.tasks} onToggle={this.onToggle} />
      </div>
    );
  }
}
<% } %>
