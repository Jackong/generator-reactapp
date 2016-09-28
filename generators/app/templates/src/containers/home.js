import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { action, TASK } from '../actions';
import selector from '../selectors/task';
import Hello from '../components/hello';
import Tasks from '../components/tasks';
import styles from './home.css';

@connect((state, props) => ({
  tasks: selector(state, props),
}))
export class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    tasks: PropTypes.object.isRequired,
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(action(TASK.GET_LIST.REQUEST));
  }
  onToggle(task) {
    this.props.dispatch(action(TASK.UPDATE.REQUEST, task.set('isDone', !task.isDone)));
  }
  onAdd() {
    const { task } = this.refs;
    this.props.dispatch(action(TASK.ADD.REQUEST, { isDone: false, content: task.value }));
    task.value = '';
  }
  render() {
    return (
      <div>
        <Hello styles={styles}>
          reactapp
        </Hello>
        <input ref="task" type="text" placeholder="Enter task" />
        <button onClick={this.onAdd.bind(this)}>Add</button>
        <Tasks tasks={this.props.tasks} onToggle={this.onToggle.bind(this)} />
      </div>
    );
  }
}

export default Home;
