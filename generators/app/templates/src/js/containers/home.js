import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import { getTitle } from '../actions';

const styles = {
  base: {
    color: 'red',
  },
  larger: {
    fontSize: 20,
  },
};

@connect(state => ({
  title: state.title,
}), {
  getTitle,
})
@Radium
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
      <div style={[styles.base, styles.larger]}>
        Hello {this.props.title}
      </div>
    );
  }
}

export default Home;
