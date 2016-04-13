import {combineReducers} from 'redux'
import {handleActions, handleAction} from 'redux-actions'
import {routerReducer} from 'react-router-redux'
import {fromJS} from 'immutable'


const state = fromJS({
   title: null,
})

const title = handleActions({
    CHANGE_TITLE: (state, action) => action.payload
}, state.get('title'))

export default combineReducers({
    routing: routerReducer,
    title
})
