import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {hashHistory} from 'react-router'
import {routerMiddleware} from 'react-router-redux'

import reducers from '../reducers'

let tools = []
let middlewares = [thunk, routerMiddleware(hashHistory)]

if (DEBUG) {
  tools = require('./tools.dev').default
  middlewares = middlewares.concat(require('./middlewares.dev').default)
}

export default createStore(
  reducers,
  compose(
    applyMiddleware(...middlewares),
    ...tools
  )
)
