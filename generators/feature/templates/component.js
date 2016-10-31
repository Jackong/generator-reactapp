import React from 'react';
import css from 'react-css-modules';

import styles from '../styles/<%= name %>.css';

@css(styles)
export default class <%= className %> extends React.PureComponent {
  render() {
    return (
      <div styleName="<%= name %>" />
    );
  }
}
