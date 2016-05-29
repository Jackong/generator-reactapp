import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { changeTitle } from '../actions';

const styles = {
  base: {
    color: 'red',
  },
  larger: {
    fontSize: 20,
  },
};

@connect(null, {
  changeTitle,
})
@Radium
export class Home extends React.Component {
  static propTypes = {
    changeTitle: PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.changeTitle('ReactApp');
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
