import restful, { fetchBackend } from 'restful.js';
import fetch from 'isomorphic-fetch';
import { normalize, Schema } from 'normalizr';

import config from '../config';

const url = config.API;

const api = restful(url, fetchBackend(fetch));

export default api;

export const modelize = (data, schemas) => {
  const { result, entities } = normalize(data, schemas);
  Object.keys(schemas).forEach(key => {
    let ids = result[key];
    const schema = schemas[key];
    let schemaKey = key;
    let Model = null;
    if (schema instanceof Schema) {
      schemaKey = schema.getKey();
      ids = [ids];
      Model = schema.getMeta('model');
    } else {
      Model = schema.getItemSchema().getMeta('model');
    }
    const schemaEntities = entities[schemaKey];
    ids.forEach(id => {
      schemaEntities[id] = new Model(schemaEntities[id]);
    });
    entities[schemaKey] = schemaEntities;
  });
  return { result, entities };
};
