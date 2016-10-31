import { createRequestTypes } from './creator';

export default createRequestTypes('TASK', ['GET_LIST', 'UPDATE', 'ADD', 'REMOVE']);
