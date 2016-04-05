const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackMd5Hash = require('webpack-md5-hash')
const DEBUG = (process.env.NODE_ENV !== 'production')

const plugins = [
  new WebpackMd5Hash(),
  new HtmlWebpackPlugin({
    template: 'public/templates/index.html',
    title: '<%= appname %>',
    inject: 'body',
    chunks: ['vendor', 'app'],
    filename: '../index.html',
    cdns: DEBUG ? [] : [
      '//cdn.bootcss.com/react/0.14.2/react.min.js',
      '//cdn.bootcss.com/react/0.14.2/react-dom.min.js',
      '//cdn.bootcss.com/react-router/1.0.0-rc3/ReactRouter.min.js',
      '//cdn.bootcss.com/history/1.12.6/History.min.js',
      '//cdn.bootcss.com/redux/3.0.4/redux.min.js',
      '//cdn.bootcss.com/react-redux/4.0.0/react-redux.min.js',
      '//cdn.bootcss.com/bluebird/3.0.5/bluebird.min.js',
      '//cdn.bootcss.com/underscore.js/1.8.3/underscore-min.js',
      '//cdn.bootcss.com/immutable/3.7.5/immutable.min.js',
      '//cdn.bootcss.com/moment.js/2.10.5/moment.min.js',
      '//cdn.bootcss.com/moment.js/2.10.5/locale/zh-cn.js',
    ],
  }),
  new webpack.ProvidePlugin({
      Promise: 'bluebird'
  }),
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', chunks: ['app']}),
]

!DEBUG && plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      global_defs: {
          DEBUG: false
      },
    },
  })
)

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
    filename: DEBUG ? 'build/[name].js' : 'build/[name].[chunkhash].js',
  },
  plugins: plugins,
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
  externals: DEBUG ? {} : {
     'react': 'React',
     'react-dom': 'ReactDOM',
     'react-router': 'ReactRouter',
     'redux': 'Redux',
     'history': 'History',
     'react-redux': 'ReactRedux',
     'bluebird': 'Promise',
     'underscore': '_',
     'immutable': 'Immutable',
     'moment': 'moment',
  },
  devtool: DEBUG && '#source-map',
  debug: DEBUG
}
