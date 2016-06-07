const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DEBUG = (process.env.NODE_ENV !== 'production');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/templates/index.html',
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
    Promise: 'bluebird',
  }),
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', chunks: ['libs', 'app'] }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    DEBUG,
  }),
];

if (!DEBUG) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  );
}

module.exports = {
  entry: {
    app: [
      './src/js/index.js',
    ],
    libs: [
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
      'debug',
    ],
  },
  output: {
    path: path.join(__dirname, 'src/'),
    publicPath: '',
    filename: 'js/[name].js',
  },
  plugins,
  resolve: {
    extensions: ['', '.json', '.node', '.js'],
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel',
      exclude: /(node_modules|bower_components)/,
    }],
  },
  externals: DEBUG ? {} : {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    redux: 'Redux',
    history: 'History',
    'react-redux': 'ReactRedux',
    bluebird: 'Promise',
    immutable: 'Immutable',
    moment: 'moment',
    'whatwg-fetch': 'fetch',
  },
  devtool: DEBUG && '#source-map',
  debug: DEBUG,
};
