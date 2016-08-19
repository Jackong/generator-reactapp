import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import { changeTitle, signIn } from '../actions';
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
    dispatch(signIn({ phone: '123', password: 'abc' }));
  }
  render() {
    return (
      <div>
        <Hello styles={styles}>
          {this.props.user.phone}
        </Hello>
      </div>
    );
  }
}

export default Home;
