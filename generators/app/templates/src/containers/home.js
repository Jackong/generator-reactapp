import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { changeTitle, action, USER } from '../actions';
import Hello from '../components/hello';
import styles from './home.css';

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
    dispatch(action(USER.GET.REQUEST, { id: 123 }));
  }
  render() {
    return (
      <div>
        <Hello styles={styles}>
          {this.props.user.account}
        </Hello>
      </div>
    );
  }
}

export default Home;
