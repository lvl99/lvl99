/**
 * Build the dist version
 */
const path = require('path')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
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
    jquery: {
      commonjs: 'jquery',
      commonjs2: 'jquery',
      amd: 'jquery',
      root: 'window.jQuery'
    }
  },
  plugins: [
    new CleanPlugin(['dist/*']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
      '$': 'jquery'
    })//,
    // new UglifyJSPlugin({}, {
    //   comments: false
    // })
  ],
  stats: {
    errorDetails: true,
    optimizationBailout: true
  }
}
