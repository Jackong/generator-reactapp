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
    filename: './index.html',
    cdns: DEBUG ? [] : [
      '//cdn.bootcss.com/react/0.14.7/react.min.js',
      '//cdn.bootcss.com/react/0.14.7/react-dom.min.js',
      '//cdn.bootcss.com/react-router/2.0.9-rc4/ReactRouter.min.js',
      '//cdn.bootcss.com/history/2.0.1/History.min.js',
      '//cdn.bootcss.com/redux/3.3.1/redux.min.js',
      '//cdn.bootcss.com/react-redux/4.4.0/react-redux.min.js',
      '//cdn.bootcss.com/bluebird/3.3.3/bluebird.min.js',
      '//cdn.bootcss.com/immutable/3.7.6/immutable.min.js',
      '//cdn.bootcss.com/moment.js/2.11.2/moment.min.js',
      '//cdn.bootcss.com/moment.js/2.11.2/locale/zh-cn.js',
      '//cdn.bootcss.com/fetch/0.11.0/fetch.min.js',
    ],
  }),
  new webpack.ProvidePlugin({
      Promise: 'bluebird'
  }),
  new webpack.optimize.CommonsChunkPlugin({name: 'vendor', chunks: ['app']}),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': `<%= "'${process.env.NODE_ENV}'" %>`,
    DEBUG: DEBUG,
  }),
]

!DEBUG && plugins.push(
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
    },
  })
)

module.exports = {
  entry: {
    app: './public/js/index.jsx',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'redux',
      'redux-thunk',
      'redux-actions',
      'react-router-redux',
      'history',
      'moment',
      'restful.js',
      'isomorphic-fetch',
      'whatwg-fetch',
      'bluebird',
      'radium',
      'immutable',
    ]
  },
  output: {
    path: path.join(__dirname, 'public/'),
    publicPath: '',
    filename: DEBUG ? 'js/[name].js' : 'js/[name].[chunkhash].js',
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
     'immutable': 'Immutable',
     'moment': 'moment',
     'whatwg-fetch': 'fetch',
  },
  devtool: DEBUG && '#source-map',
  debug: DEBUG
}
