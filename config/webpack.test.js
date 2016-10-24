var helpers = require('./helpers');
var path = require('path');
var atl = require('awesome-typescript-loader');
var webpack = require('webpack');

module.exports = {
  devtool: 'inline-source-map',
  context: path.resolve(__dirname, './'),
  resolve: {
    extensions: ['.ts', '.js'],
    plugins: [
      new atl.TsConfigPathsPlugin({
        tsconfig: helpers.root('tsconfig.json')
      })
    ]
  },
  entry: {
    test: helpers.root('config/karma-test-shim')
  },
  output: {
    path: './dist.test',
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        exclude: [
          helpers.root('node_modules')
        ]
      },
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'source-map-loader',
        exclude: [
          helpers.root('node_modules/rxjs'),
          helpers.root('node_modules/@angular')
        ]
      },
      {
        test: /\.ts$/,
        loaders: [
          {
            loader: 'awesome-typescript-loader',
            query: {
              tsconfig: helpers.root('tsconfig.json'),
              module: 'commonjs',
              target: 'es5',
              useForkChecker: true
            }
          },
          {
            loader: 'angular2-template-loader'
          }
        ],
        exclude: [/\.e2e\.ts$/]
      },
      {
        test: /\.html$/,
        loader: 'html'

      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'null'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: 'null'
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      },
      {
        test: /\.(js|ts)$/, loader: 'sourcemap-istanbul-instrumenter-loader',
        enforce: 'post',
        exclude: [
          /\.(e2e|spec)\.ts$/,
          /node_modules/
        ],
        query: { 'force-sourcemap': true }
      },
    ]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)($|\?)/i // process .js and .ts files only
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        tslint: {
          emitErrors: false,
          failOnHint: false,
          resourcePath: `./src`
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
    process: false,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
}
