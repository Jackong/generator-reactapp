import { observable, action } from 'mobx';

import { get, getList, add, update, remove } from '../apis/<%= name %>';

export default class <%= className %> {
  @observable <%= plural %> = [];

  @action get = (id) => {
    get(id)
    .then((entity) => {
      this.<%= plural %> = entity;
    });
  }

  @action getList = (payload) => {
    getList(payload)
    .then((entities) => {
      this.<%= plural %> = entities;
    });
  }

  @action add = (<%= name %>) => {
    add(<%= name %>)
    .then((entity) => {
      this.<%= plural %>.push(entity);
    });
  }

  @action update = (origin, changed) => {
    const index = this.<%= plural %>.indexOf(origin);
    if (index < 0) {
      return;
    }
    update(changed)
    .then(() => {
      this.<%= plural %>[index] = { ...origin, ...changed };
    });
  }

  @action remove = (<%= name %>) => {
    const index = this.<%= plural %>.indexOf(<%= name %>);
    if (index < 0) {
      return;
    }
    remove(<%= name %>)
    .then(() => {
      this.<%= plural %>.splice(index, 1);
    });
  }
}
