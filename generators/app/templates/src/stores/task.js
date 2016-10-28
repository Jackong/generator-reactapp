import { observable, action } from 'mobx';

import { getAll, add, update } from '../api/task';

export default class Task {
  @observable tasks = [];

  @action getAll = () => {
    getAll()
    .then((entities) => {
      this.tasks = entities;
    });
  }

  @action add = (task) => {
    add(task)
    .then((entity) => {
      this.tasks.push(entity);
    });
  }

  @action update = (task) => {
    update(task)
    .then(() => {
      for (let i = 0, l = this.tasks.length; i < l; i += 1) {
        if (this.tasks[i].id === task.id) {
          this.tasks[i].isDone = task.isDone;
          break;
        }
      }
    });
  }
}
