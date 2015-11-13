const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config')

const PORT = process.env.PORT

new WebpackDevServer(webpack(config), {
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
