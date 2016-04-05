import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import reducers from '../reducers'

let tools = []
let middlewares = [thunk]

if (DEBUG) {
  tools = require('./tools.dev').default
  middlewares = middlewares.concat(require('./middlewares.dev').default)
}

const createStoreWithMiddleware = compose(
    applyMiddleware(...middlewares),
    ...tools
)(createStore)

export default createStoreWithMiddleware(reducers)
