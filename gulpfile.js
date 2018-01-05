/**
 * Build the dist files
 */

const gulp = require('gulp')
const babel = require('gulp-babel')
const jest = require('gulp-jest').default
const extend = require('extend')
const objectPath = require('object-path')
const runSequence = require('run-sequence')
require('./tasks/_gulpErrorHandling')

// Gulp config
let pkg = require('./package.json')
let _gulpConfig = objectPath.get(pkg, 'gulpConfig') || {}
let gulpConfig = extend({
  _root: __dirname,
  env: process.argv.NODE_ENV || 'production'
}, _gulpConfig)

// Define the bundles to generate
const taskJS = require('./tasks/js')(gulpConfig)
const taskWebpack = require('./tasks/webpack')(gulpConfig)
// const taskBrowserify = require('./tasks/browserify')(gulpConfig)

// Build the dist and es5 versions
gulp.task('build', function () {
  return runSequence(['test'], ['es6-to-es5'], ['generate-bundles'], ['deploy-dist'])
})

// Test before building
gulp.task('test', () => {
  gulpConfig.env = process.env.NODE_ENV = 'test'
  gulp.src('./__tests__')
    .pipe(jest())
})

// Generate the Bundlers for
gulp.task('generate-bundles', taskWebpack.tasks.compileBundles)

// Deploy the dist versions
gulp.task('deploy-dist', function () {
  return gulp.src(['./dist/**/*.js', '!./dist/**/*.min.js'])
    .pipe(taskJS.pipes.minifyJS())
    .pipe(gulp.dest('./dist'))
})

// Convert from es6 to es5 js
gulp.task('es6-to-es5', () => {
  gulp.src(['./es6/**/*.es6'])
    .pipe(babel())
    .pipe(gulp.dest('./es5'))
})
