const webpack = require('webpack')
const DEBUG = (process.env.NODE_ENV !== 'production')

module.exports = {
  entry: {
    app: './index.jsx',
    vendor: [
      'react',
      'react-router',
      'redux',
      'restful.js',
      'debug',
      'bluebird',
      'underscore',
      'radium'
    ]
  },
  output: {
    path: __dirname + '/public/js/',
    publicPath: '/public/js/',
    filename: '[name]/index.js',
    chunkFilename: '[name]/index.js',
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'bluebird'
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor/app.js', ['app']),
  ],
  resolve: {
    extensions: ['', '.json', '.node', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: ['react-hot', 'babel?stage=0'],
      exclude: /(node_modules|bower_components)/,
    }]
  },
  devtool: DEBUG && '#source-map',
  debug: DEBUG
}
