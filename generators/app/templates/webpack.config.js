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
      'radium'
    ]
  },
  output: {
    path: path.join(__dirname, 'public/js/'),
    publicPath: '/js/',
    filename: '[name]/index.js',
    chunkFilename: '[name]/index.js',
  },
  plugins: [
    new webpack.ProvidePlugin({Promise: 'bluebird'}),
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
     'underscore': '_'
  },
  devtool: DEBUG && '#source-map',
  debug: DEBUG
}
