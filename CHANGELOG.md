### 1.3.3

* Renamed [es6](es6) files to have extension `.es6`
* Added [es5](es5) and [dist](dist) versions of the framework


### 1.3.2

* Added [Debug](es6/tools/debug.js) tool
* Refactored tools references to be uppercase
* Fixed issue with package's main [index.js](es6/index.js) file require path


### 1.3.1

* Defined `@display-types` list for [`responsive`](less/mixins/responsive.less) `.devices-display-types` mixin to work 
* Fixed incorrect require reference to [`common`](es6/common.js) in named [components](es6/components)


### 1.3.0

* Experimented with creating some [inheritance](es6/utils/inheritance.js) util methods to automatically process class
  instances and expose private `_underscored` properties with a public getter interfaces (see `exposePrivateProperties`).
  I really hate class inheritance in JavaScript though and I think I will try to go back to functional/prototype with
  [super](es6/utils/super.js) inheritance à la Ember JS.

### 1.2.1

* Refactored the [`Queue`](es6/tools/queue.js) tool (changed behaviour of `add` and `sync`) and added some extra
  functionality (`queue`, `play`, `pause`, `getActionByLabel`, `getTimerDelay`, `setTimerDelay`, `getQueueLength` and
  `checkStatus`)
* Fixed imports/exports on [`super`](es6/utils/super.js)

### 1.1.0

* Added the core [`Entity`](es6/core/entity.js) class
* Added the core [`App`](es6/core/app.js) class
* Refactored [`Component`](es6/core/component.js) class to extend [`Entity`](es6/core/entity.js) and be categorised as
  core

### 1.0.1

* npm publish error (whoops)

### 1.0.0

* First release!
