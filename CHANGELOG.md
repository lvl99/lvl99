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
