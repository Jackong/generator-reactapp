import { compose, createStore, applyMiddleware } from 'redux'

import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'

import { reduxReactRouter } from 'redux-router'
import createHistory from 'history/lib/createHashHistory'

import reducers from './reducers'

const loggerMiddleware = createLogger()

let dev = []
if (DEBUG) {
    const { devTools, persistState } = require('redux-devtools')
    dev = [
        devTools(),
        persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
    ]
}

const createStoreWithMiddleware = compose(
    applyMiddleware(
        thunk,
        promiseMiddleware,
        loggerMiddleware
    ),
    reduxReactRouter({
        createHistory
    }),
    ...dev
)(createStore)

export default createStoreWithMiddleware(reducers)
