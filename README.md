# LVL99

v1.0.0

My own personal frontend framework. Primarily uses jQuery, mildly inspired by Bootstrap and Ember.js and also has
nothing to do with React. I also use it as a self-learning and development exercise experiment.

* JavaScript is written in Node.js compatible ES6 (no features requiring `--harmony` switch)
* I use StandardJS for coding style
* I like how simple LESS is; I dislike how bloated SCSS is


## Install

Include the `lvl99` npm package in your `npm` project: 

```bash
  npm i --save-dev lvl99
```


### Use within JavaScript

Require/import the `lvl99` module in your JavaScript:

```javascript
  const lvl99 = require('lvl99')
```

You can also require/import single files if you don't want the whole JS framework:

```javascript
  const breakpoints = require('lvl99/src/es6/breakpoints')
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

```javascript
  # Javascript (ES6 flavoured)
  es6/
    components/
      accordion.js
      component.js            # The base component class that all other components inherit
      modal.js
      spinner.js 
      toggleable.js 
    utils/
      index.js                # All utils modules in one
      parse.js                # Some parsing functions like type coercion, etc.
      super.js                # Ember implementation of super behaviour
    breakpoints.js            # Test for breakpoints in JS 
    common.js                 # Basic common used dependencies and variables
    index.js                  # All modules in one
    queue.js                  # Basic debounce queue for actions
    trackevent.js             # Cache GA event tracking until GA object loaded
    
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

* **jQuery**: browser events, cross-browser implementations, etc.
* **object-path**: good for testing on deep-nested objects
* **lodash.merge**: deep extend


## Dev Dependencies

* **Jest**: unit testing


## TODO

* Complete the README
* Write more unit tests


## Licence

MIT
