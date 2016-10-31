import { compose, createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import reducers from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const crashReporter = () => (next) => {
  return (action) => {
    try {
      return next(action);
    } catch (err) {
      window.handleError(err);
    }
    return null;
  };
};

let middlewares = [crashReporter, sagaMiddleware, routerMiddleware(hashHistory)];

const tools = global.DEBUG ? require('./devtools').default : [];
middlewares = middlewares.concat(global.DEBUG ? require('redux-logger')() : []);

export default createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
    ...tools
  ),
);

sagaMiddleware.run(sagas);
