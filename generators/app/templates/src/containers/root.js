import React from 'react';
import { Provider } from 'mobx-react';
import { Router, hashHistory } from 'react-router';

import routes from './routes';

/* global DEBUG */
const DevTools = DEBUG ? require('./tools.dev').default : require('./tools').default;

class Root extends React.Component {
  render() {
    return (
      <Provider>
        <div>
          <Router history={hashHistory} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default Root;
