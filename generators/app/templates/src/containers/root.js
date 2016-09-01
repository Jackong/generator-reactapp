import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from '../store';
import App from './app';

const history = syncHistoryWithStore(hashHistory, store);

/*  global  DEBUG*/
const DevTools = DEBUG ? require('./tools.dev').default : require('./tools').default;

class Root extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Route path="/" component={App}>
              <IndexRoute
                getComponent={(nextState, cb) => {
                  require.ensure([], function (require) {
                    cb(null, require('./home').default);
                  });
                }}
              />
              <Route
                path="about"
                getComponent={(nextState, cb) => {
                  require.ensure([], function (require) {
                    cb(null, require('./about').default);
                  });
                }}
              />
            </Route>
          </Router>
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default Root;
