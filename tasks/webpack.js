/**
 * Bundling JS code with Webpack
 */

const fs = require('fs')
const gulp = require('gulp')
const gutil = require('gulp-util')
const gulpif = require('gulp-if')
const path = require('path')
const objectPath = require('object-path')
const extend = require('extend')
const chalk = require('chalk')
const lazypipe = require('lazypipe')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const escapeRegExp = require('lodash.escaperegexp')

module.exports = function (gulpConfig) {
  /**
   * Default bundles config
   */
  let webpackConfig = extend({
    watchSrc: [path.resolve(gulpConfig._root, 'js/**/*.{es6,js}')],
    compileBundles: {
      src: undefined,
      dest: undefined
    },
    pipeToWebpack: {
      config: {
        watch: objectPath.get(gulpConfig, 'isWatching') || false
      }
    }
  }, objectPath.get(gulpConfig, 'webpack'))

  /**
   * Pipe to webpack
   */
  const pipeToWebpack = lazypipe()
    .pipe(function () {
      return gulpif(true, webpackStream(objectPath.get(webpackConfig, 'pipeToWebpack.config'), webpack))
    })

  /**
   * Run webpack
   */
  function compileBundles () {
    // Get config object
    let compileConfig = require(`../webpack.config`)
    objectPath.set(webpackConfig, 'pipeToWebpack.config', compileConfig)

    // Remove the entry
    // if (objectPath.has(compileConfig, 'entry')) {
    //   delete compileConfig.entry
    // }

    // Remove the output path since it will be placed with webpackConfig.compileBundles.dest
    if (objectPath.has(compileConfig, 'output.path')) {
      delete compileConfig.output.path
    }

    // Watch
    if (gulpConfig.isWatching) {
      compileConfig.watch = true
    }

    return gulp.src(objectPath.get(webpackConfig, 'compileBundles.src'))
      .pipe(pipeToWebpack())
      // .pipe(gulpif(gulpConfig.env !== 'development', jsPipes.minifyJS()))
      // .pipe(gulpif(gulpConfig.env !== 'development', gulp.dest(webpackConfig.compileBundles.dest)))
      .pipe(gulp.dest(objectPath.get(webpackConfig, 'compileBundles.dest')))
  }

  // Public (will be turned into gulp tasks)
  return {
    config: webpackConfig,
    pipes: {
      pipeToWebpack
    },
    tasks: {
      compileBundles
    }
  }
}
