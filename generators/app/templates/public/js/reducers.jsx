import {combineReducers} from 'redux'
import {handleActions, handleAction} from 'redux-actions'
import {routerStateReducer} from 'redux-router'

const title = handleActions({
    CHANGE_TITLE: (state, action) => action.payload
}, '')

export default combineReducers({
    router: routerStateReducer,
    title
})
