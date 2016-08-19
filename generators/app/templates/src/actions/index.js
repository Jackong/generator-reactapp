export const types = {
  CHANGE_TITLE: 'CHANGE_TITLE',
  SIGN_IN_REQUEST: 'SIGN_IN_REQUEST',
  SIGN_IN: 'SIGN_IN',
};

export const changeTitle = payload => {
  document.title = payload;
  return {
    type: types.CHANGE_TITLE,
    payload,
  };
};

export const signIn = payload => ({
  type: types.SIGN_IN_REQUEST,
  payload,
});
