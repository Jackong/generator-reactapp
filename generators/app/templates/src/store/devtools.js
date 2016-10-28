import { persistState } from 'redux-devtools';

import DevTools from '../containers/devtools';

export default [
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
];
