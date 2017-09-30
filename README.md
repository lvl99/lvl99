# LVL99

v1.3.7

My own personal frontend framework. Primarily uses jQuery, mildly inspired by Bootstrap and Ember.js and also has
nothing to do with React. I also use it as a self-learning and development exercise experiment.

* JavaScript is written in Node.js compatible ES6 (no features requiring `--harmony` switch)
* I use StandardJS for coding style
* I like how simple LESS is; I dislike how bloated SCSS is


## Install

Include the `lvl99` npm package in your `npm` project: 

```bash
  npm install --save-dev lvl99
```


### Use within JavaScript

#### ES6

Require/import the `lvl99` module in your JavaScript:

```javascript
  const lvl99 = require('lvl99')
```

You can also require/import single files if you don't want the whole JS framework:

```javascript
  // Require whatever part of the framework you desire
  // Breakpoints needs to be initialised with defined sizes
  const breakpoints = require('lvl99/es6/tools/breakpoints')({
    'desktop': [1024, 99999],
    'tablet':  [600, 1024],
    'mobile':  [0, 600]
  })
```

> ***Note:*** ES6 files have the `.es6` extension to enable you to target these files using a transpiler like Babel


#### ES5

If you are using ES5 JavaScript (aka, you're not transpiling, or you don't want to transpile) you can reference the same
files within the [`es5`](es5) folder:

```javascript
  // Require the whole LVL99 library
  var lvl99 = require('lvl99/es5')
  
  // Require a single file
  var Breakpoints = require('lvl99/es5/tools/breakpoints')({
    'desktop': [1024, 99999],
    'tablet':  [600, 1024],
    'mobile':  [0, 600]
  })
```

> ***Note:*** These files are pre-transpiled from the ES6 ones for your convenience. ES5 files will have the `.js`
> extension


#### HTML

If you want to include the whole framework outside of your build/bundle, then you can use the prebuilt
[`dist/lvl99.js`](dist/lvl99.js) version (you'll need to copy it somewhere on your server to reference it). It should
then be available as the global variable `lvl99`. 

> ***Note:*** The `dist/lvl99.js` version does not come with jQuery bundled, so please ensure it is included in your
> app somewhere before you load the `lvl99.js` file.

```html
  <script type="text/javascript" src="jquery.min.js"></script>
  <script type="text/javascript" src="/js/lvl99.js"></script>
  <script type="text/javascript">
    console.log(lvl99)
  </script>
```


### Use within LESS

Import the `lvl99.less` file in your LESS:

```less
  @import 'path/to/node_modules/lvl99/less/lvl99.less';
```

You can also require/import single files if you don't want the whole LESS framework:

```less
  @import 'path/to/node_modules/lvl99/less/mixins.less';
```


## Architecture

@TODO!


## Folder structure

```bash
  # Javascript (ES6 flavoured)
  es6/
    core/
      app.js                  # The app class 
      component.js            # The component class that all other components inherit
      entity.js               # The base entity class that all other classes inherit from
      index.js                # All core modules in one
    components/
      accordion.js
      index.js                # All component modules in one
      modal.js
      spinner.js 
      toggleable.js 
    tools/
      breakpoints.js          # Test for breakpoints in JS
      index.js                # All tools modules in one
      queue.js                # Basic debounce queue for actions
      trackevent.js           # Cache GA event tracking until GA object loaded
      smooth-scroll.js        # Enable smooth scrolling when clicking anchor links
    utils/
      index.js                # All utils modules in one
      parse.js                # Some parsing functions like type coercion, etc.
      super.js                # Ember implementation of super behaviour
    common.js                 # Basic common used dependencies and variables
    index.js                  # All modules in one
    
  # LESS
  less/
    components/               # Component mixins
      accordion.less 
      modal.less
      spinner.less
      toggleable.less
    mixins/                   # Generic mixins
      align.less              # Margin, text, float alignment
      clearfix.less
      flex.less               # Some flex bits like columns, grid, alignment, etc.
      gradients.less
      grid.less               # Scaffolding
      inline-svg-code.less    # Quick way to embed SVG code directly in CSS
      inputs.less             # Form inputs like custom checkbox, radio, switch
      lists.less
      overflow.less
      position.less         
      responsive.less         # Size images to max width/height, plus show/hide elements based on breakpoints
      screen-reader.less
      spacing.less            # Remove top/bottom spacing within elements
    components.less           # All components in one
    lvl99.less                # All modules in one
    mixins.less               # All mixins in one
```


## Dependencies

* **jQuery**: Browser events, cross-browser implementations, etc.
* **object-path**: Good for working with deep-nested objects
* **lodash.merge**: Deep object extend
* **uuid**: Unique ID generation


## Dev Dependencies

* **Jest**: Unit testing
* **Babel**: Transpile ES6 to ES5
* **Browserify**: Create lvl99.js distribution bundle
* **Gulp**: Task runner


## TODO

* Complete the README
* Write more unit tests
* Write more documentation throughout source
* Create minified version of [`dist/lvl99.js`](dist/lvl99.js)


## Contribute

What? Really? Are you sure? Aren't there other frameworks more worth your time?


## [Changelog](CHANGELOG.md)

## [License](LICENSE.md)

MIT
