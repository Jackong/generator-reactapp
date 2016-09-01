const createRequestTypes = (resource, operations) => {
  const types = {};
  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    types[operation] = {
      REQUEST: `${resource}_${operation}_REQUEST`,
      SUCCESS: `${resource}_${operation}_SUCCESS`,
      FAILURE: `${resource}_${operation}_FAILURE`,
    };
  }
  return types;
};

const createTypes = (resource, operations) => {
  const types = {};
  for (let i = 0; i < operations.length; i++) {
    const operation = operations[i];
    types[operation] = `${resource}_${operation}`;
  }
  return types;
};

export const action = (type, payload = null) => ({
  type,
  payload,
});

export const TITLE = createTypes('TITLE', ['CHANGE']);
export const USER = createRequestTypes('USER', ['GET_LIST']);

export const changeTitle = payload => {
  document.title = payload;
  return {
    type: TITLE.CHANGE,
    payload,
  };
};
