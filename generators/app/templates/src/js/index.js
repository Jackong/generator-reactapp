import React from 'react';
import { render } from 'react-dom';
import debug from 'debug';
import Bluebird from 'bluebird';

window.Promise = Bluebird;

import '../css/index.css';
import Root from './containers/root';

const error = debug('app:error');

window.handleError = e => {
  error(e, e.stack);
};

Promise.onPossiblyUnhandledRejection(window.handleError);

window.onerror = (msg, url, line, column, e) => {
  window.handleError(e || new Error(`${msg}(${url}):${line}-${column}`));
};

if (module.hot) {
  module.hot.accept();
}

window.onload = () => {
  try {
    render(<Root />, document.getElementById('root'));
  } catch (e) {
    window.handleError(e);
  }
};
