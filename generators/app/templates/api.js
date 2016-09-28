const js = require('json-server');

const server = js.create();
const router = js.router('db.json');
const middlewares = js.defaults();

module.exports = (endpoint, port) => {
  server.use(middlewares);
  server.use(endpoint, router);
  server.listen(port);
};
