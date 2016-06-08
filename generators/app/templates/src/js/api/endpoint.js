import env from '../constants/env';

export default {
  [env.DEV]: '/api',
  [env.TEST]: '/api',
  [env.PROD]: '/api',
};
