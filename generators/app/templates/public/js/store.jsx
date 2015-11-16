import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'
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
    ...dev
)(createStore)

const store = createStoreWithMiddleware(reducers)

export default store
