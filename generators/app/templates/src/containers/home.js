import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { changeTitle, action, USER } from '../actions';
import selector from '../selectors/user';
import Hello from '../components/hello';
import styles from './home.css';

@connect((state, props) => ({
  users: selector(state, props),
}))
export class Home extends React.PureComponent {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(changeTitle('test'));
    dispatch(action(USER.GET_LIST.REQUEST));
  }
  render() {
    return (
      <Hello styles={styles} users={this.props.users} />
    );
  }
}

export default Home;
