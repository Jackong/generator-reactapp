import { persistState } from 'redux-devtools';

import DevTools from '../containers/tools.dev';

export default [
  DevTools.instrument(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
];
