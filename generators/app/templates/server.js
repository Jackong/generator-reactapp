const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const config = require('./webpack.config')

const PORT = process.env.PORT

config.entry.vendor = config.entry.vendor.concat([
  'webpack-dev-server/client?http://127.0.0.1:' + PORT,
  'webpack/hot/only-dev-server'
])

config.plugins.push(new webpack.HotModuleReplacementPlugin())

config.module.loaders.unshift({
  test: /\.jsx?$/,
  loader: 'react-hot',
  exclude: /(node_modules|bower_components)/,
})

new WebpackDevServer(webpack(config), {
  contentBase: 'public',
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(PORT, '0.0.0.0', (err, result) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Listening at 0.0.0.0:' + PORT)
})
