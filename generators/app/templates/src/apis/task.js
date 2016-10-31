import api from '../apis';

export const getList = () => {
  return api
  .all('tasks')
  .getAll()
  .then((res) => {
    return res.body();
  })
  .then((entities) => {
    return entities.map((entity) => {
      return entity.data();
    });
  });
};

export const update = (task) => {
  return api
  .one('tasks', task.id)
  .put(task)
  .then(res => res.body().data());
};

export const add = (task) => {
  return api
  .all('tasks')
  .post(task)
  .then((res) => {
    return res.body().data();
  });
};
