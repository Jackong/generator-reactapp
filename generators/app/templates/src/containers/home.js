import React from 'react';
import { observer, PropTypes } from 'mobx-react';

import Hello from '../components/hello';
import Tasks from '../components/tasks';
import styles from './home.css';

@observer(['task'])
export class Home extends React.Component {
  static propTypes = {
    task: PropTypes.observableObject.isRequired,
  }
  componentWillMount() {
    this.props.task.gets();
  }
  onAdd() {
    this.props.task.add({ isDone: false, content: this.task.value });
    this.task.value = '';
  }
  onToggle(t) {
    this.props.task.toggle(t);
  }
  render() {
    return (
      <div>
        <Hello styles={styles}>
          reactapp
        </Hello>
        <input ref={(ref) => { this.task = ref; }} type="text" placeholder="Enter task" />
        <button onClick={this.onAdd.bind(this)}>Add</button>
        <Tasks tasks={this.props.task.tasks} onToggle={this.onToggle.bind(this)} />
      </div>
    );
  }
}

export default Home;
