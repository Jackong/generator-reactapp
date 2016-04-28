const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const path = require('path')
const config = require('./webpack.config')
const os = require('os');

function getMyIP(version,internal){
  version = version || 'IPv4'
  internal = internal || false
  var interfaces = os.networkInterfaces()
  for(var key in interfaces) {
    var addresses = interfaces[key]
    for(var i = 0; i < addresses.length; i++){
      var address = addresses[i]
      if(address.internal !== internal || address.family !== version){
        continue
      }
      return address.address
    }
  }
  return 'localhost'
}

const IP = getMyIP()
const PORT = process.env.PORT

config.entry.vendor = config.entry.vendor.concat([
  `webpack-dev-server/client?http://${IP}:${PORT}`,
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
  historyApiFallback: true,
  proxy: {
    [process.env.MOCK_API]: {
      secure: false,
      bypass: (req, res) => {
        req.method = 'GET'
        return `${req.path}.json`
      }
    },
  },
}).listen(PORT, '0.0.0.0', (err, result) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log('Listening at 0.0.0.0:' + PORT)
})
