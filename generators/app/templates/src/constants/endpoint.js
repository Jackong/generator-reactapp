import env from './env';

export default {
  [env.DEV]: '/api',
  [env.TEST]: '/api',
  [env.PROD]: '/api',
};
