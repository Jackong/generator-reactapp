<% if (useReact) { %>
import React from 'react';
import { render } from 'react-dom';<% } %>
import debug from 'debug';
<% if (useReact) { %>
import Root from './containers/root';
<% } %>
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

try {<% if (useReact) { %>
  render(<Root />, document.getElementById('root'));<% } else { %>
  document.getElementById('root').innerHTML = 'web app';<% } %>
} catch (e) {
  window.handleError(e);
}
