var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'source-map',

  output: {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },

  plugins: [
    new WebpackMd5Hash(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        mangle: { screw_ie8: true },
        compress: { screw_ie8: true }
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV)
      }
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: true,
          failOnHint: true,
          resourcePath: helpers.root('src')
        },
        htmlLoader: {
          minimize: true,
          removeAttributeQuotes: false,
          caseSensitive: true,
          customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
          ],
          customAttrAssign: [/\)?\]?=/]
        }
      }
    }),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      helpers.root('src')
    )
  ],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
