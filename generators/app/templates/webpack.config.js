const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const lost = require('lost');
const asImport = require('postcss-import');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEBUG = (process.env.NODE_ENV !== 'production');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/templates/index.html',
    title: '<%= appname %>',
    inject: 'body',
    chunks: ['vendor', 'app'],
    filename: './index.html',
    cdns: DEBUG ? [] : [
      '//cdn.bootcss.com/react/15.2.0/react.min.js',
      '//cdn.bootcss.com/react/15.2.0/react-dom.min.js',
      '//cdn.bootcss.com/react-router/2.5.2/ReactRouter.min.js',
      '//cdn.bootcss.com/history/3.0.0/History.min.js',
      '//cdn.bootcss.com/redux/3.5.2/redux.min.js',
      '//cdn.bootcss.com/react-redux/4.4.5/react-redux.min.js',
      '//cdn.bootcss.com/react-router-redux/4.0.5/ReactRouterRedux.min.js',
      '//cdn.bootcss.com/redux-thunk/2.1.0/redux-thunk.min.js',
      '//cdn.bootcss.com/immutable/3.8.1/immutable.min.js',
      '//cdn.bootcss.com/bluebird/3.4.1/bluebird.min.js',
      '//cdn.bootcss.com/fetch/1.0.0/fetch.min.js',
      '//cdn.bootcss.com/classnames/2.2.5/index.min.js',
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
  new ExtractTextPlugin('./css/app.css'),
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
      'immutable',
      'restful.js',
      'isomorphic-fetch',
      'whatwg-fetch',
      'bluebird',
      'debug',
      'classnames',
    ],
  },
  output: {
    path: path.join(__dirname, 'src/'),
    publicPath: '',
    filename: 'js/[name].js',
  },
  plugins,
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /\.css?$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css',
          'postcss'
        ),
      },
    ],
  },
  postcss(wp) {
    return [
      asImport({
        addDependencyTo: wp,
      }),
      autoprefixer,
      precss,
      lost,
    ];
  },
  externals: DEBUG ? {} : {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    redux: 'Redux',
    'react-redux': 'ReactRedux',
    'react-router-redux': 'ReactRouterRedux',
    'redux-thunk': 'ReduxThunk',
    history: 'History',
    immutable: 'Immutable',
    bluebird: 'Promise',
    'whatwg-fetch': 'fetch',
    classnames: 'classNames',
  },
  devtool: DEBUG && '#source-map',
  debug: DEBUG,
};
