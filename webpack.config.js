/**
 * Build the dist version
 */
const path = require('path')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    lvl99: './es6/index.es6'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'lvl99',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.es6', '.js', '.json'],
    alias: {
      '@lvl99': path.resolve(__dirname, 'es6')
    },
    modules: [
      path.resolve(__dirname, 'es6'),
      'node_modules'
    ]
  },
  module: {
    rules: [
      {
        test: /\.es6$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new CleanPlugin(['dist/*'])
  ],
  stats: {
    errorDetails: true,
    optimizationBailout: true
  }
}
