import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {useRouterHistory} from 'react-router'
import {createHashHistory} from 'history'
import {routerMiddleware} from 'react-router-redux'

import reducers from '../reducers'

export const hashHistory = useRouterHistory(createHashHistory)({queryKey: false})

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
