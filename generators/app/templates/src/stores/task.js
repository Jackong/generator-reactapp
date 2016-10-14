import { observable, action } from 'mobx';

import api from '../api';

export default class Task {
  @observable tasks = [];

  @action gets = () => {
    api
    .all('tasks')
    .getAll()
    .then((res) => {
      return res.body();
    })
    .then((entities) => {
      this.tasks = entities.map((entity) => {
        return entity.data();
      });
    });
  }

  @action add = (task) => {
    api
    .all('tasks')
    .post(task)
    .then((res) => {
      return res.body().data();
    })
    .then((entity) => {
      this.tasks.push(entity);
    });
  }

  @action toggle = (task) => {
    api
    .one('tasks', task.id)
    .put({ ...task, isDone: !task.isDone })
    .then((res) => {
      return res.body().data();
    })
    .then(() => {
      for (let i = 0, l = this.tasks.length; i < l; i += 1) {
        if (this.tasks[i].id === task.id) {
          this.tasks[i].isDone = !task.isDone;
          break;
        }
      }
    });
  }
}
