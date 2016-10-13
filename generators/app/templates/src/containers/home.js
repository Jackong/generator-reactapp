import React from 'react';
import { observer } from 'mobx-react';

import Hello from '../components/hello';
import Tasks from '../components/tasks';
import styles from './home.css';

import stores from '../stores';

@observer
export class Home extends React.Component {
  componentWillMount() {
    stores.task.gets();
  }
  onAdd() {
    stores.task.add({ isDone: false, content: this.task.value });
    this.task.value = '';
  }
  render() {
    return (
      <div>
        <Hello styles={styles}>
          reactapp
        </Hello>
        <input ref={(ref) => { this.task = ref; }} type="text" placeholder="Enter task" />
        <button onClick={this.onAdd.bind(this)}>Add</button>
        <Tasks tasks={stores.task.tasks} />
      </div>
    );
  }
}

export default Home;
