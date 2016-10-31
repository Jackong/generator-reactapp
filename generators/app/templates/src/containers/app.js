import React, { PropTypes } from 'react';
import { Link } from 'react-router';

class App extends React.PureComponent {
  static propTypes = {
    children: PropTypes.node,
  }
  render() {
    return (
      <div>
        <h1>App</h1>
        <hr />
        <p>
          <Link to="/">home</Link>
        </p>
        <p>
          <Link to="/about">about</Link>
        </p>
        <hr />
        {this.props.children}
      </div>
    );
  }
}

export default App;
