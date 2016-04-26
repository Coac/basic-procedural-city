var config = require('./webpack.base.config');
var webpack = require('webpack');

config.devtool = 'inline-source-map';
config.plugins = config.plugins.concat([
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
]);

module.exports = config;
