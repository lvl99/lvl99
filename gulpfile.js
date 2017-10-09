/**
 * Build the dist files
 */

const gulp = require('gulp')
const babel = require('gulp-babel')
const jest = require('gulp-jest').default
const extend = require('extend')
const objectPath = require('object-path')
require('./tasks/_gulpErrorHandling')

// Gulp config
let pkg = require('./package.json')
let _gulpConfig = objectPath.get(pkg, 'gulpConfig') || {}
let gulpConfig = extend({
  _root: __dirname
}, _gulpConfig)

// Define the bundles to generate
const taskBrowserify = require('./tasks/browserify')(gulpConfig)

// Build the dist and es5 versions
gulp.task('build', ['test', 'es6-to-es5', 'generate-bundles'])

// Test before building
gulp.task('test', () => {
  process.env.NODE_ENV = 'test'
  gulp.src('__tests__')
    .pipe(jest())
})

// Generate the Bundlers for
gulp.task('generate-bundles', taskBrowserify.tasks.generateBundlers)

// Convert from es6 to es5 js
gulp.task('es6-to-es5', () => {
  gulp.src(['es6/**/*.es6'])
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(gulp.dest('es5'))
})
