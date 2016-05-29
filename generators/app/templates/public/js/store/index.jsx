import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';

import reducers from '../reducers';

let middlewares = [thunk, routerMiddleware(hashHistory)];

/*  global  DEBUG*/
const tools = DEBUG ? require('./tools.dev').default : [];
middlewares = middlewares.concat(DEBUG ? require('./middlewares.dev').default : []);

export default createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
    ...tools
  ),
);
