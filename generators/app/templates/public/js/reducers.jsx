import {combineReducers} from 'redux'
import {handleActions, handleAction} from 'redux-actions'

const title = handleActions({
    CHANGE_TITLE: (state, action) => action.payload
}, '')

export default combineReducers({
    title
})
