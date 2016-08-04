import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { changeTitle, signIn } from '../actions';

@connect(state => ({
  user: state.user,
}))
export class Home extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(changeTitle('test'));
    dispatch(signIn({ phone: '123', password: 'abc' }));
  }
  render() {
    return (
      <div className={cx('home')}>
        Hello {this.props.user.phone}
      </div>
    );
  }
}

export default Home;
