const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const drakov = require('drakov');
const watcher = require('drakov/lib/watcher');
const api = require('./api');

const config = require('./webpack.config');

const IP = '0.0.0.0';
const PORT = parseInt(process.env.PORT || 3000, 10);
const API_PORT = PORT + 1;

config.entry.app = config.entry.app.concat([
  `webpack-dev-server/client?http://${IP}:${PORT}`,
  'webpack/hot/only-dev-server',
]);

config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.module.loaders.unshift({
  test: /\.js?$/,
  loader: 'react-hot',
  exclude: /(node_modules|bower_components)/,
});

new WebpackDevServer(webpack(config), {
  contentBase: 'src',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  proxy: {
    '/*': {
      secure: false,
      target: `http://localhost:${API_PORT}/`,
    },
  },
}).listen(PORT, IP, (err) => {
  /*  eslint no-console: ["error", { allow: ["info", "error"] }] */
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.info(`Listening at ${IP}:${PORT}`);
  const argv = Object.assign({}, api, {
    serverPort: API_PORT,
  });
  drakov.run(argv, () => watcher(argv));
});
