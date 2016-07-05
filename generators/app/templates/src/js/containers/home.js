import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { getTitle } from '../actions';

@connect(state => ({
  title: state.title,
}), {
  getTitle,
})
export class Home extends React.Component {
  static propTypes = {
    getTitle: PropTypes.func.isRequired,
    title: PropTypes.string,
  }
  componentWillMount() {
    this.props.getTitle();
  }
  render() {
    return (
      <div className={cx('home')}>
        Hello {this.props.title}
      </div>
    );
  }
}

export default Home;
