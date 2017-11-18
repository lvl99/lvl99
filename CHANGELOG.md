### 1.4.0

* Added webpack for building `dist` version
* Jest tests now point to ES5 versions
* Refactored to have `import`/`export` interface for webpack and tree shaking


### 1.3.16

* Refactored the [Queue](es6/tools/queue.es6) a little bit to make more sense.


### 1.3.15

* Prevented public methods with no target from being assigned more than once during [Component](es6/core/component.es6)
  init phase.


### 1.3.14

* Fixed the [Queue](es6/tools/queue.es6) to not run while already running


### 1.3.13

* Fixed [`parse.extractClassDetails`](es6/utils/parse.es6) to strip start/end single/double quotation marks from strings


### 1.3.12

* Refactored the custom input LESS mixins to enable separating the different states for styling other elements with the
  same styles. 


### 1.3.11

* Cleaned up some unnecessary debug logging.


### 1.3.10

* Missed *another* minor issue which could have been spotted with a good test or two.


### 1.3.9

* Fixed a minor issue and updated tests accordingly to avoid such minor issues...


### 1.3.8

* Fixed issue with assigning component's public methods and using multiple event names. It will now extract the event
  names (see [`parse.extractTargetEventNames`](es6/utils/parse.es6)) to assign the public method properly. Before all
  public methods were namespaced with the component's namespace, so now you can also choose to use the built-in DOM
  event (using `dom:eventName`) otherwise it defaults to the component's namespace.


### 1.3.7

* Added support for "dot.notation" (see [`parse.extractClassDetails`](es6/utils/parse.es6))when setting nested
  properties in a DOM element's component options, e.g.
```html
<div data-component="Component" data-component-options="example.nested.prop: value"></div>
```
  The element will then initialise with an extracted options object like so:
```js
{
  example: {
    nested: {
      prop: "value"
    }
  }
}
```


### 1.3.6

* Added [`initialiseComponents`](es6/core/app.es6) method to initialise DOM elements marked with `data-component`
  attributes with any component class behaviours that have been registered in the app.


### 1.3.5

* Added [SmoothScroll](es6/tools/smooth-scroll.es6) tool to enable smooth scrolling when clicking anchor links
* Some version numbering got munched with all my silly little updates


### 1.3.3

* Renamed [es6](es6) files to have extension `.es6`
* Added [es5](es5) and [dist](dist) versions of the framework


### 1.3.2

* Added [Debug](es6/tools/debug.es6) tool
* Refactored tools references to be uppercase
* Fixed issue with package's main [index.js](es6/index.es6) file require path


### 1.3.1

* Defined `@display-types` list for [`responsive`](less/mixins/responsive.less) `.devices-display-types` mixin to work 
* Fixed incorrect require reference to [`common`](es6/common.es6) in named [components](es6/components)


### 1.3.0

* Experimented with creating some [inheritance](es6/utils/inheritance.es6) util methods to automatically process class
  instances and expose private `_underscored` properties with a public getter interfaces (see `exposePrivateProperties`).
  I really hate class inheritance in JavaScript though and I think I will try to go back to functional/prototype with
  [super](es6/utils/super.es6) inheritance à la Ember JS.


### 1.2.1

* Refactored the [`Queue`](es6/tools/queue.es6) tool (changed behaviour of `add` and `sync`) and added some extra
  functionality (`queue`, `play`, `pause`, `getActionByLabel`, `getTimerDelay`, `setTimerDelay`, `getQueueLength` and
  `checkStatus`)
* Fixed imports/exports on [`super`](es6/utils/super.es6)


### 1.1.0

* Added the core [`Entity`](es6/core/entity.es6) class
* Added the core [`App`](es6/core/app.es6) class
* Refactored [`Component`](es6/core/component.es6) class to extend [`Entity`](es6/core/entity.es6) and be categorised as
  core


### 1.0.1

* npm publish error (whoops)


### 1.0.0

* First release!
