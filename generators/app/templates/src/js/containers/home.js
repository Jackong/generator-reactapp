import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { changeTitle, getUsers } from '../actions';

const styles = {
  base: {
    color: 'red',
  },
  larger: {
    fontSize: 20,
  },
};

@connect(state => ({
  users: state.users,
}), {
  changeTitle,
  getUsers,
})
@Radium
export class Home extends React.Component {
  static propTypes = {
    changeTitle: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.changeTitle('ReactApp');
  }
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    return (
      <div style={[styles.base, styles.larger]}>
        Hello ReactApp
      </div>
    );
  }
}

export default Home;
