import React, { PropTypes } from 'react';

class Tasks extends React.PureComponent {
  static propTypes = {
    tasks: PropTypes.object.isRequired,
    onToggle: PropTypes.func.isRequired,
  }
  render() {
    const { tasks, onToggle } = this.props;
    return (
      <ul>
        {tasks.map(task => (
          <li key={task.id} >
            <input onChange={() => onToggle(task)} type="checkbox" checked={task.isDone} />
            <span>{task.content}</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default Tasks;
