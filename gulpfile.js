/**
 * Build the dist files
 */

const path = require('path')
const gulp = require('gulp')
const babel = require('gulp-babel')
const jest = require('gulp-jest').default
const extend = require('extend')
const objectPath = require('object-path')
const Docma = require('docma')
require('./tasks/_gulpErrorHandling')

// Gulp config
let pkg = require('./package.json')
let _gulpConfig = objectPath.get(pkg, 'gulpConfig') || {}
let gulpConfig = extend({
  _root: __dirname
}, _gulpConfig)

// Define the bundles to generate
// const taskBrowserify = require('./tasks/browserify')(gulpConfig)
const taskWebpack = require('./tasks/webpack')(gulpConfig)

// Build the dist and es5 versions
gulp.task('build', ['es6-to-es5', 'generate-bundles'])

// Test before building
gulp.task('test', () => {
  process.env.NODE_ENV = 'test'
  gulp.src('__tests__')
    .pipe(jest())
})

// Test before building
gulp.task('docs', () => {
  Docma.create()
    .build({
      // debug: 31,
      src: [
        {
          readme: path.resolve(__dirname, 'README.md'),
          changelog: path.resolve(__dirname, 'CHANGELOG.md'),
          licence: path.resolve(__dirname, 'LICENSE.md'),
        },
        './es6/**/*.es6'
      ],
      dest: path.resolve(__dirname, 'docs'),
      jsdoc: {
        recurse: true,
        relativePath: path.resolve(__dirname, 'es6'),
        includePattern: ".+\\.es6$",
        hierarchy: true,
        sort: "grouped"
      },
      markdown: {
        gfm: true,
        breaks: true,
        tasks: true,
        emoji: true
      },
      app: {
        title: 'LVL99 Frontend Framework',
        routing: 'query',
        entrance: 'content:readme',
        meta: null,
        base: '/docs',
        server: 'github'
      },
      template: {
        path: 'default',
        options: {
          title: 'LVL99',
          sidebar: true,
          collapsed: true,
          badges: true,
          search: true,
          navbar: true,
          navItems: [
            {
              iconClass: 'ico-book',
              label: 'Docs',
              items: [
                { "label": "Guide", "href": "./" },
                { "separator": true },
                { "label": "API", "href": "?api=lvl99" },
                // { "label": "API", "href": "?api=lvl99" },
              ]
            },
            {
              iconClass: "ico-md ico-download",
              label: "Download",
              href: "index.html",
              items: [
                { "label": "<code>npm i lvl99 --save-dev</code>" },
                {
                  "label": "LVL99 Releases",
                  "href": "https://github.com/lvl99/lvl99/releases",
                  "target": "_blank"
                },
                { "separator": true },
                { "label": "Changelog", "href": "?content=changelog" }
              ]
            },
            {
              iconClass: "ico-md ico-github",
              label: "GitHub",
              href: "https://github.com/lvl99/lvl99",
              target: "_blank"
            }
          ]
        }
      },
    })
    .then(function (success) {
      console.log('Documentation built successfully.')
    })
    .catch(function (error) {
      console.log(error)
    })
})

// Generate the Bundlers for
gulp.task('generate-bundles', taskWebpack.tasks.compileBundles)

// Convert from es6 to es5 js
gulp.task('es6-to-es5', () => {
  gulp.src(['es6/**/*.es6'])
    .pipe(babel())
    .pipe(gulp.dest('es5'))
})
