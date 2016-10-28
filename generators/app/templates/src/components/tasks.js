import React from 'react';
<% if (sm === 'mobx') { %>
import { observer, PropTypes } from 'mobx-react';

@observer<% } else { %>
import { List } from 'immutable';
<% } %>
export default class Tasks extends React.PureComponent {
  static propTypes = {<% if (sm === 'redux') { %>
    tasks: React.PropTypes.instanceOf(List).isRequired,<% } else { %>
    tasks: PropTypes.observableArrayOf(React.PropTypes.shape({
      id: React.PropTypes.number,
      content: React.PropTypes.string,
      isDone: React.PropTypes.bool,
    })).isRequired,<% } %>
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
