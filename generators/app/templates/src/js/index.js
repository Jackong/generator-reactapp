import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import debug from 'debug';

import '../css/index.css';
import Root from './containers/root';

const error = debug('app:error');

window.handleError = e => {
  error(e, e.stack);
};

window.onunhandledrejection = ({ reason }) => {
  window.handleError(reason instanceof Error ? reason : new Error(reason));
};

window.onerror = (msg, url, line, column, e) => {
  window.handleError(e || new Error(msg, url, line));
};

if (module.hot) {
  module.hot.accept();
}

try {
  render(<Root />, document.getElementById('root'));
} catch (e) {
  window.handleError(e);
}
