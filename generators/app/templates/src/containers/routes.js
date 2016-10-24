import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';

export default (
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
);
