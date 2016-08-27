'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let config = Object.assign({}, baseConfig, {
  entry: [
    // 'webpack-dev-server/client?uconnsmash.com:' + defaultSettings.port,
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'react-hot!babel-loader',
  exclude: /node_modules/,
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
  // test: /.jsx?$/,
  // loader: 'babel-loader',
  // exclude: /node_modules/,
  // query: {
  //   presets: ['es2015', 'react']
  // }
});

module.exports = config;
