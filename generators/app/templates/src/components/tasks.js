import React from 'react';
import { observer, PropTypes } from 'mobx-react';

@observer
class Tasks extends React.Component {
  static propTypes = {
    tasks: PropTypes.observableArrayOf(React.PropTypes.shape({
      id: React.PropTypes.number,
      content: React.PropTypes.string,
      isDone: React.PropTypes.bool,
    })).isRequired,
    onToggle: React.PropTypes.func,
  }
  render() {
    const { tasks, onToggle } = this.props;
    return (
      <ul>
        {tasks.map(task => (
          <li key={task.id} >
            <input
              onChange={() => onToggle(task)}
              type="checkbox" checked={task.isDone}
            />
            <span>{task.content}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default Tasks;
