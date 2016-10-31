import { createTypes } from './creator';

export const action = (type, payload, meta) => ({
  type,
  payload,
  meta,
  error: payload instanceof Error,
});

export const ERROR = createTypes('ERROR', ['CATCH']);
