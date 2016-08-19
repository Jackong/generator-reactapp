export const TITLE = {
  CHANGE: 'CHANGE_TITLE',
};

export const USER = {
  GET: 'GET_USER',
  GET_SUCCESS: 'GET_USER_SUCCESS',
  GET_FAILURE: 'GET_USER_FAILURE',
};

export const changeTitle = payload => {
  document.title = payload;
  return {
    type: TITLE.CHANGE,
    payload,
  };
};

export const getUser = payload => ({
  type: USER.GET,
  payload,
});
