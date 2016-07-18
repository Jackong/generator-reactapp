import { createAction } from 'redux-actions';

export const GET_TITLE = 'GET_TITLE';
export const CHANGE_TITLE = 'CHANGE_TITLE';

export const getTitle = createAction(GET_TITLE);
