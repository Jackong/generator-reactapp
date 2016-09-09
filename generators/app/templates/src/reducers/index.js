import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import entities from './entities';
import result from './result';

export default combineReducers({
  routing: routerReducer,
  entities,
  result,
});
