import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import store from '../store';
import App from './app';
import Home from './home';
import About from './about';

const history = syncHistoryWithStore(hashHistory, store);

/*  global  DEBUG*/
const DevTools = DEBUG ? require('./tools.dev').default : require('./tools');

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div>
          <Router history={history}>
            <Route path="/" component={App}>
              <IndexRoute component={Home} />
              <Route path="about" component={About} />
            </Route>
          </Router>
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default Root;
