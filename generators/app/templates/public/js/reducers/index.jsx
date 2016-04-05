import {combineReducers} from 'redux'
import {handleActions, handleAction} from 'redux-actions'
import {routerReducer} from 'react-router-redux'

const title = handleActions({
    CHANGE_TITLE: (state, action) => action.payload
}, '')

export default combineReducers({
    routing: routerReducer,
    title
})
