import React, { PropTypes } from 'react';
import css from 'react-css-modules';

import styles from './hello.css';

@css(styles)
class Hello extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    const { children } = this.props;
    return (
      <div styleName="hello">
        <div styleName="icon" />
        Hello, {children}
      </div>
    );
  }
}

export default Hello;
