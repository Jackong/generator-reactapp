import { compose, createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

let middlewares = [sagaMiddleware, routerMiddleware(hashHistory)];

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

sagaMiddleware.run(sagas);
