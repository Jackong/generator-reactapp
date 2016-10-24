import React from 'react';
import { Provider } from 'mobx-react';
import { Router, hashHistory } from 'react-router';

import routes from './routes';
import * as stores from '../stores';

const DevTools = global.DEBUG ? require('mobx-react-devtools').default : () => null;

class Root extends React.Component {
  render() {
    return (
      <Provider {...stores}>
        <div>
          <Router history={hashHistory} routes={routes} />
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default Root;
