module.exports = {
  sourceFiles: 'api/mock/**.md',
  staticPaths: [
    'api/static/',
  ],
  watch: true,
  method: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};
