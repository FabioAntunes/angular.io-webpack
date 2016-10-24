var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  output: {
    path: helpers.root('dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    sourceMapFilename: '[name].map',
    library: 'ac_[name]',
    libraryTarget: 'var'
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: 'src'
        },
      }
    }),
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    outputPath: helpers.root('dist')
  },
  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
