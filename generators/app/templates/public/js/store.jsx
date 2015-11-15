import {createStore, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise'
import thunk from 'redux-thunk'
import reducers from './reducers'

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
    thunk,
    promiseMiddleware,
    loggerMiddleware
)(createStore)

const store = createStoreWithMiddleware(reducers)

export default store
