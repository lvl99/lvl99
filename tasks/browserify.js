/**
 * Bundling JS code with Browserify and Babel
 */

const gulp = require('gulp')
const gutil = require('gulp-util')
const path = require('path')
const objectPath = require('object-path')
const extend = require('extend')
const browserify = require('browserify')
// const babelify = require('babelify')
const source = require('vinyl-source-stream')
const chalk = require('chalk')
const escapeRegExp = require('lodash.escaperegexp')

/**
 * The generated bundlers
 */
let bundlers = {}

module.exports = function (gulpConfig) {
  /**
   * Default bundles config
   */
  let bundlesConfig = extend({
    bundles: {}
  }, objectPath.get(gulpConfig, 'browserify'))

  /**
   * Nicer browserify errors
   * Adapted from https://gist.github.com/Fishrock123/8ea81dad3197c2f84366
   */
  let reRoot = new RegExp(escapeRegExp(gulpConfig._root), 'g')
  function cleanRootFromString (str) {
    return str.replace(reRoot, '')
  }
  function outputError(err) {
    if (err.fileName) {
      // Regular error
      gutil.log(`${chalk.red(err.name)}: ${chalk.yellow(cleanRootFromString(err.fileName))}: Line ${chalk.magenta(err.lineNumber)} & Column ${chalk.magenta(err.columnNumber || err.column)}: ${chalk.blue(cleanRootFromString(err.description))}`)
    } else {
      // Browserify error
      gutil.log(`${chalk.red(err.name)}: ${chalk.yellow(cleanRootFromString(err.message))}`)
    }
    // this.emit('end')
  }

  /**
   * Create a browserify-managed bundle
   * @param {Object} options
   * @return {Bundler}
   */
  function Bundler (options) {
    // Default settings
    this.settings = extend(true, {
      name: undefined,
      src: undefined,
      dest: undefined,
      browserify: {
        entries: undefined,
        cache: {},
        packageCache: {},
        extensions: ['.js', '.es6'],
        debug: true
      },
    }, options)

    // Get path and file names
    this.src = path.dirname(this.settings.src)
    // this.srcFile = path.basename(this.settings.src)
    this.dest = path.dirname(this.settings.dest)
    this.destFile = path.basename(this.settings.dest)

    // Set the default bundle name to the name of the dest file
    if (!this.settings.name) {
      this.settings.name = this.destFile
    }

    // Set the default browserify.entries value
    if (!this.settings.browserify.entries) {
      this.settings.browserify.entries = [this.settings.src]
    }

    // Create the browserify bundler
    this.bundler = browserify(this.settings.browserify)//.transform(babelify)

    /**
     * Package the browserify bundle
     */
    this.bundle = () => {
      gutil.log(`Bundling ${this.settings.name}...`)
      return this.bundler.bundle()
        .on('error', outputError)
        .pipe(source(this.destFile))
        .pipe(gulp.dest(this.dest))
    }

    // Use the gulp-util log function for any Browserify status logs
    this.bundler.on('log', gutil.log)

    // Bundle on first run
    this.bundle()
  }

  /**
   * Generate the custom bundlers for each bundle
   */
  function generateBundlers () {
    let bundleConfigs = bundlesConfig.bundles

    for (let bundleName in bundleConfigs) {
      try {
        let newBundler = new Bundler(bundleConfigs[bundleName])
        bundlers[bundleName] = newBundler
        gutil.log(`Generated bundler ${newBundler.settings.name}`)
      } catch (e) {}
    }

    if (bundlers.length) {
      gutil.log(`Generated ${bundlers.length} bundlers`)
    }
  }

  // Public (will be turned into gulp tasks)
  return {
    config: bundlesConfig,
    tasks: {
      generateBundlers
    }
  }
}
