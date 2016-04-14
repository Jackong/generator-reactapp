import {createAction} from 'redux-actions'

import api from '../api'
import types from './types'

export const changeTitle = createAction(types.CHANGE_TITLE, payload => document.title = payload)
