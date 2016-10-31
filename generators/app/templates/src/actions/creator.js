export const createRequestTypes = (resource, operations) => {
  const types = {};
  for (let i = 0; i < operations.length; i += 1) {
    const operation = operations[i];
    types[operation] = {
      REQUEST: `${resource}_${operation}_REQUEST`,
      SUCCESS: `${resource}_${operation}_SUCCESS`,
      FAILURE: `${resource}_${operation}_FAILURE`,
    };
  }
  return types;
};

export const createTypes = (resource, operations) => {
  const types = {};
  for (let i = 0; i < operations.length; i += 1) {
    const operation = operations[i];
    types[operation] = `${resource}_${operation}`;
  }
  return types;
};

export default null;
