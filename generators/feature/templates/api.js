import api from '../api';

export const get = (id) => {
  return api
  .one('<%= plural %>', id)
  .get()
  .then((res) => {
    return res.body().data();
  });
};

export const getList = (query = {}) => {
  return api
  .all('<%= plural %>')
  .getAll(query)
  .then((res) => {
    return res.body();
  })
  .then((entities) => {
    return entities.map((entity) => {
      return entity.data();
    });
  });
};

export const update = (<%= name %>) => {
  return api
  .one('<%= plural %>', <%= name %>.id)
  .put(<%= name %>)
  .then((res) => {
    return res.body().data();
  });
};

export const add = (<%= name %>) => {
  return api
  .all('<%= plural %>')
  .post(<%= name %>)
  .then((res) => {
    return res.body().data();
  });
};

export const remove = (<%= name %>) => {
  return api
  .one('<%= plural %>', <%= name %>.id)
  .delete()
  .then((res) => {
    return res.body().data();
  });
};
