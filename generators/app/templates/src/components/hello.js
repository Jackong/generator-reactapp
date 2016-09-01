import React, { PropTypes } from 'react';
import css from 'react-css-modules';

import styles from './hello.css';

@css(styles)
class Hello extends React.PureComponent {
  static propTypes = {
    users: PropTypes.object,
  }
  render() {
    const { users } = this.props;
    return (
      <div styleName="hello">
        <div styleName="icon" />
        <ul>
          {users.map((user, idx) => (
            <li key={idx}>{user.get('name')}:{user.get('age')}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Hello;
