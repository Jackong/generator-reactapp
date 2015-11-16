const webpack = require('webpack')
const path = require('path')
const DEBUG = (process.env.NODE_ENV !== 'production')

module.exports = {
  entry: {
    app: './public/js/index.jsx',
    vendor: [
      'react',
      'react-router',
      'redux',
      'restful.js',
      'debug',
      'bluebird',
      'underscore',
      'radium',
      'immutable'
    ]
  },
  output: {
    path: path.join(__dirname, 'public/js/'),
    publicPath: '/js/',
    filename: '[name]/index.js',
    chunkFilename: '[name]/index.js',
  },
  plugins: [
      new webpack.ProvidePlugin({
          Promise: 'bluebird',
          fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      }),
      new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor/app.js', ['app']),
  ],
  resolve: {
    extensions: ['', '.json', '.node', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /(node_modules|bower_components)/,
    }]
  },
  externals: {
     'react': 'React',
     'react-dom': 'ReactDOM',
     'react-router': 'ReactRouter',
     'redux': 'Redux',
     'history': 'History',
     'react-redux': 'ReactRedux',
     'bluebird': 'Promise',
     'underscore': '_',
     'immutable': 'Immutable'
  },
  devtool: DEBUG && '#source-map',
  debug: DEBUG
}
