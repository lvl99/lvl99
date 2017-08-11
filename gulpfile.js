/**
 * Build the dist files
 */

const gulp = require('gulp')
const babel = require('gulp-babel')
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
gulp.task('build', ['es6-to-es5', 'generate-bundles'])

// Generate the Bundlers for
gulp.task('generate-bundles', taskBrowserify.tasks.generateBundlers)

// Convert from es6 to es5 js
gulp.task('es6-to-es5', () => {
  gulp.src(['es6/**/*.es6'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('es5'))
})
