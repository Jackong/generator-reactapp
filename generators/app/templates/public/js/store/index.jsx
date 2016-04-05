import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'

let tools = []
let middlewares = [thunk]

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
