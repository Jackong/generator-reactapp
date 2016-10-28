const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const mqpacker = require('css-mqpacker');
const cssnano = require('cssnano');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const DEBUG = (process.env.NODE_ENV !== 'production');

const plugins = [
  new HtmlWebpackPlugin({
    template: 'src/templates/index.html',
    title: '<%= appname %>',
    inject: 'body',
    chunks: ['common', 'vendor', 'app'],
    filename: './index.html',
    cdns: DEBUG ? [] : [
      '//cdn.bootcss.com/react/15.3.1/react.min.js',
      '//cdn.bootcss.com/react/15.3.1/react-dom.min.js',
      '//cdn.bootcss.com/react-router/2.7.0/ReactRouter.min.js',
      '//cdn.bootcss.com/history/3.0.0/History.min.js',<% if (sm === 'mobx') { %>
      '//cdn.bootcss.com/mobx/2.6.0/mobx.umd.min.js',
      '//cdn.bootcss.com/es6-promise/4.0.5/es6-promise.auto.min.js',<% } else { %>
      '//cdn.bootcss.com/babel-polyfill/6.16.0/polyfill.min.js',
      '//cdn.bootcss.com/redux/3.6.0/redux.min.js',
      '//cdn.bootcss.com/react-redux/4.4.5/react-redux.min.js',
      '//cdn.bootcss.com/react-router-redux/4.0.6/ReactRouterRedux.min.js',
      '//cdn.bootcss.com/immutable/3.8.1/immutable.min.js',<% } %>
      '//cdn.bootcss.com/fetch/1.0.0/fetch.min.js',
      '//cdn.bootcss.com/qs/6.2.1/qs.min.js',
      '//cdn.bootcss.com/store.js/1.3.20/store.min.js',
    ],
  }),
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', chunks: ['libs', 'app'] }),
  new webpack.optimize.CommonsChunkPlugin({ name: 'common', chunks: ['libs', 'vendor'] }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`,
    'global.DEBUG': DEBUG,
  }),
];

const loaders = [
  {
    test: /\.js?$/,
    loader: 'babel',
    exclude: /(node_modules|bower_components)/,
  },
  {
    test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: `file?name=[path][name]${DEBUG ? '' : '.[hash]'}.[ext]&context=src`,
  },
];

if (DEBUG) {
  loaders.push({
    test: /\.css?$/,
    loaders: [
      'style?sourceMap',
      'css?modules&importLoaders=1&localIdentName=[path][name]-[local]-[hash:base64:5]',
      'postcss?sourceMap',
    ],
  });
} else {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    })
  );

  plugins.push(new ExtractTextPlugin('css/app.[contenthash].css', {
    allChunks: true,
  }));

  loaders.push({
    test: /\.css?$/,
    loader: ExtractTextPlugin.extract('style', [
      'css?modules&importLoaders=1&localIdentName=[path][name]-[local]-[hash:base64:5]',
      'postcss',
    ], {
      publicPath: '../',
    }),
  });
}

module.exports = {
  entry: {
    app: [
      './src/index.js',
    ],
    libs: [
      './src/libs.js',
    ],
  },
  output: {
    path: path.join(__dirname, 'src/'),
    publicPath: '',
    filename: `js/[name]${DEBUG ? '' : '.[chunkhash]'}.js`,
    chunkFilename: `js/bundle-[name]${DEBUG ? '' : '.[chunkhash]'}.js`,
  },
  plugins,
  module: {
    loaders,
  },
  postcss(wp) {
    return [
      precss({
        import: {
          addDependencyTo: wp,
        },
      }),
      autoprefixer,
      mqpacker,
      cssnano,
    ];
  },
  externals: DEBUG ? {} : {
    react: 'React',
    'react-dom': 'ReactDOM',
    'react-router': 'ReactRouter',
    history: 'History',
    qs: 'Qs',
    'whatwg-fetch': 'fetch',
    store: 'store',<% if (sm === 'mobx') { %>
    mobx: 'mobx',
    'es6-promise/auto': 'ES6Promise',<% } else { %>
    'babel-polyfill': '_babelPolyfill',
    redux: 'Redux',
    'react-redux': 'ReactRedux',
    'react-router-redux': 'ReactRouterRedux',
    immutable: 'Immutable',<% } %>
  },
  devtool: DEBUG && '#source-map',
  debug: DEBUG,
};
