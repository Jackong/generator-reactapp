import { Schema, arrayOf } from 'normalizr';
import { Record } from 'immutable';

export const <%= className %> = new Record({
  id: undefined,
  createdAt: null,
  updatedAt: null,
  creator: null,
});

export const <%= name %> = new Schema('<%= plural %>');

export const <%= plural %> = arrayOf(<%= name %>);
