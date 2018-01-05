'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Queue;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * # Queue
 *
 * Batch actions into a debounced queue. Useful to reduce amount of work computer/browser does.
 */

var __loggerPath = 'Queue';


/**
 * Queue class
 *
 * @return {Object}
 * @constructor
 */
function Queue(options) {
  /**
   * Queue options
   *
   * @type {Object}
   * @private
   */
  var _options = (0, _lodash2.default)({
    queue: {},
    timer: 0,
    timerDelay: 100,
    replayTimer: 0,
    replayTimerDelay: 100
  }, options);

  /**
   * The batched queue tasks
   * Queue actions are batched in an {Object} with a specific label
   *
   * @type {Object}
   * @private
   */
  var _tasks = _options.queue;

  /**
   * The queue timer
   * When the queue is added to, the timer is updated with a `setTimeout` call to the `run` function
   *
   * @type {Number}
   * @private
   */
  var _timer = _options.timer;

  /**
   * The queue timer delay
   * The delay between queue timer updates (in milliseconds)
   *
   * @type {Number}
   * @default 100
   * @private
   */
  var _timerDelay = _options.timerDelay;

  /**
   * The queue's replay timer which tracks if/when to fire queued actions while the queue is already running
   */
  var _replayTimer = _options.replayTimer || _options.timer;

  /**
   * The queue replay timer delay
   * The delay between queue replay timer updates (in milliseconds)
   *
   * @type {number}
   * @default 100
   * @private
   */
  var _replayTimerDelay = _options.replayTimerDelay || _options.timerDelay;

  /**
   * The play status
   * 0: paused
   * 1: play
   * 2: running
   *
   * @type {Number}
   * @default 1
   * @private
   */
  var _status = 1;

  /**
   * Check when queue has finished running to then replay the action
   *
   * @param {Queue} Q The queue to replay
   * @param {String} actionName The action to replay
   * @param {Mixed} ...args Any additional arguments to pass to the action
   * @private
   */
  function _checkQueueFinished(Q) {
    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    var actionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'run';

    // @debug
    // console.log(`${__loggerPath} _checkQueueFinished`, {
    //   actionName,
    //   queue: Q
    // })

    clearTimeout(_replayTimer);

    var checkQueueIsFinishedThenPerformAction = function checkQueueIsFinishedThenPerformAction() {
      if (Q.checkStatus === 1 && Q.length() && Q.hasOwnProperty(actionName)) {
        // @debug
        // console.log(`[${__loggerPath}] Replaying queue...`, {
        //   Queue: Q,
        //   actionName,
        //   args
        // })

        // Each action will either perform the action or replay itself if necessary
        Q[actionName].apply(Q, args);
      }
    };

    _replayTimer = setTimeout(checkQueueIsFinishedThenPerformAction, _replayTimerDelay);
  }

  /**
   * @typedef {Object} Queue
   */
  var Queue = {
    /**
     * Queue an action
     *
     * @param {String} actionLabel A unique label for the action in the queue.
     *                             Can be set to {undefined} (which means the action can't be removed)
     * @param {Function} action The function to handle the action
     * @param {Mixed} ...args The arguments to pass to the action handler
     * @return {Self}
     * @chainable
     */
    queue: function queue(actionLabel, action) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      // Default actionLabel is time value as string
      if (!actionLabel) {
        actionLabel = Date.now() + '';
      }

      // Assign the function to the queue
      if (actionLabel && typeof action === 'function') {
        _tasks[actionLabel] = {
          action: action,
          args: args
        };
      }

      // @chainable
      return this;
    },


    /**
     * Add action to the queue. After adding this will start the queue timer to then run the queue after the delay
     *
     * @param {String} actionLabel A unique label for the action in the queue.
     *                             Can be set to {undefined} (which means the action can't be removed)
     * @param {Function} action The function to handle the action
     * @param {Mixed} ...args The arguments to pass to the action handler
     * @return {Self}
     * @chainable
     */
    add: function add(actionLabel, action) {
      for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      // @debug
      // console.log(`[${__loggerPath}] add`, {
      //   actionLabel,
      //   action
      // })

      // Queue the action
      this.queue.apply(this, [actionLabel, action].concat(_toConsumableArray(args)));

      // Play the timer to get the queue to run after a delay (only when playing)
      if (_status) {
        this.play();
      }
      // } else {
      //   // @debug
      //   console.log(`[${__loggerPath}] add: queue is currently paused`)
      // }

      // @chainable
      return this;
    },


    /**
     * Same as `add` except you can affect the delay time that the queue will play after adding the task.
     *
     * @param {Number} delay The milliseconds to delay before running the queue
     * @param {String} actionLabel A unique label for the action in the queue.
     *                             Can be set to {undefined} (which means the action can't be removed)
     * @param {Function} action The function to handle the action
     * @param {Mixed} [...args] The arguments to pass to the action handler
     * @return {Self}
     * @chainable
     */
    delayAdd: function delayAdd(delay, actionLabel, action) {
      var _delay = delay || _timerDelay;

      // @debug
      // console.log(`[${__loggerPath}] delayAdd`, {
      //   delay,
      //   actionLabel,
      //   action,
      //   _delay,
      //   _status
      // })

      // Queue the action

      for (var _len4 = arguments.length, args = Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
        args[_key4 - 3] = arguments[_key4];
      }

      this.queue.apply(this, [actionLabel, action].concat(_toConsumableArray(args)));

      // Play the timer to get the queue to run after a delay (only if already playing/running)
      if (_status) {
        this.play(_delay);
      }

      // @chainable
      return this;
    },


    /**
     * Add action and then run the queue immediately.
     *
     * @param {String} actionLabel
     * @param {Function} action
     * @param {Mixed} actionArgs
     * @return {Self}
     * @chainable
     */
    sync: function sync(actionLabel, action) {
      // @debug
      // console.log(`[${__loggerPath}] sync`, {
      //   actionLabel,
      //   action
      // })

      // Ensure to clear the queue
      clearTimeout(_timer);

      // Queue action...

      for (var _len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
        args[_key5 - 2] = arguments[_key5];
      }

      this.queue.apply(this, [actionLabel, action].concat(_toConsumableArray(args)));

      // ... Then run the queue immediately
      this.run();

      // @chainable
      return this;
    },


    /**
     * Get the action by its label
     *
     * @param {String} actionLabel
     * @return {undefined|Object}
     */
    getActionByLabel: function getActionByLabel(actionLabel) {
      if (_tasks.hasOwnProperty(actionLabel)) {
        return _tasks[actionLabel];
      }

      return undefined;
    },


    /**
     * Remove action from queue. Can only remove actions if you know their label
     *
     * @param {String} actionLabel
     * @return {Self}
     * @chainable
     */
    remove: function remove(actionLabel) {
      if (_tasks.hasOwnProperty(actionLabel)) {
        // // @debug
        // console.log(`[${__loggerPath}] task removed`, {
        //   actionLabel
        // })

        _tasks[actionLabel] = undefined;
        delete _tasks[actionLabel];
      }

      // @chainable
      return this;
    },


    /**
     * Play the queue timer (will run queue after timer delay)
     *
     * @param {Number} [delay] The time in milliseconds before playing
     * @return {Self}
     * @chainable
     */
    play: function play(delay) {
      var _this = this;

      // Ensure delay is set properly (if someone sets to null or undefined it should default back to regular delay time)
      var _delay = delay || _timerDelay;

      // @debug
      // if (delay) {
      //   console.log(`[${__loggerPath}] play (with specified delay)`, {
      //     delay,
      //     _delay,
      //     _status,
      //     time
      //   })
      // }

      // Currently already running
      if (_status === 2) {
        // @debug
        // console.log(`[${__loggerPath}] queue is currently running, will perform 'play' next cycle`)

        _checkQueueFinished.apply(undefined, [this, 'play'].concat(Array.prototype.slice.call(arguments)));
        return;
      }

      // @debug
      // console.log(`[${__loggerPath}] play`, {
      //   delay,
      //   _delay,
      //   _status,
      //   time
      // })

      clearTimeout(_timer);

      // Set to playing
      _status = 1;

      // Reset timer to run the queue
      var runQueueProcessAfterDelay = function runQueueProcessAfterDelay() {
        // @debug
        // console.log(`[${__loggerPath}] running queue after delay of ${_delay} (${delay}) ${time}`)

        _this.run();
      };
      _timer = setTimeout(runQueueProcessAfterDelay, _delay);

      // @chainable
      return this;
    },


    /**
     * Pause the queue timer
     *
     * @return {Self}
     * @chainable
     */
    pause: function pause() {
      // Queue is already running
      if (_status === 2) {
        _checkQueueFinished(this, 'pause');
        return;
      }

      // @debug
      // console.log(`[${__loggerPath}] pause`, {
      //   _status
      // })

      // Only pause if already playing
      clearTimeout(_timer);

      // Set to paused
      _status = 0;

      // @chainable
      return this;
    },


    /**
     * Process/run all the actions in the queue
     *
     * @return {Self}
     * @chainable
     */
    run: function run() {
      // Currently already running, so run again later
      if (_status === 2) {
        _checkQueueFinished(this, 'run');
        return;
      }

      // @debug
      // console.log(`[${__loggerPath}] run`, {
      //   _status,
      //   _tasks
      // })

      clearTimeout(_timer);
      clearTimeout(_replayTimer);

      // No items in the queue, so force queue to pause
      if (!Object.keys(_tasks).length) {
        _status = 0;
        return this;
      }

      // Save the queue's current status
      var _previousStatus = _status;

      // Set the status to running
      _status = 2;

      // @debug
      // console.log(`[${__loggerPath}] run: processing...`, {
      //   _previousStatus,
      //   _status
      // })

      // Process the queue
      for (var actionLabel in _tasks) {
        if (_tasks.hasOwnProperty(actionLabel) && _tasks[actionLabel]) {
          var queuedItem = _tasks[actionLabel];

          // @debug
          // console.log(`[${__loggerPath}] run --> ${actionLabel}`, queuedItem)

          // Function
          if (queuedItem && typeof queuedItem === 'function') {
            queuedItem();

            // Object
          } else if (queuedItem.hasOwnProperty('action') && typeof queuedItem.action === 'function') {
            // Apply arguments to the action
            if (queuedItem.hasOwnProperty('args') && queuedItem.args instanceof Array) {
              queuedItem.action.apply(queuedItem, _toConsumableArray(queuedItem.args));

              // Run the action like normal
            } else {
              queuedItem.action();
            }
          }

          // Delete the queued item
          _tasks[actionLabel] = undefined;
          delete _tasks[actionLabel];
        }
      }

      // Revert to status before run
      _status = _previousStatus;

      // @chainable
      return this;
    },


    /**
     * Get the status of the queue:
     *   0 = Paused
     *   1 = Playing
     *   2 = Running
     * @return {Number}
     */
    checkStatus: function checkStatus() {
      return _status;
    },


    /**
     * Get the timer delay
     *
     * @return {Number}
     */
    getTimerDelay: function getTimerDelay() {
      return _timerDelay;
    },


    /**
     * Set the timer delay
     *
     * @param timerDelay
     * @chainable
     * @return {Self}
     */
    setTimerDelay: function setTimerDelay(timerDelay) {
      // Only set if timerDelay is greater than 0
      if (timerDelay && timerDelay > 0) {
        _timerDelay = timerDelay;
        _replayTimerDelay = timerDelay;
      }

      // @chainable
      return this;
    },


    /**
     * Get the length of the queue
     *
     * @return {Number}
     */
    length: function length() {
      return Object.keys(_tasks).length;
    },


    /**
     * Backward compatible alias
     *
     * @return {Queue.length}
     */
    getQueueLength: function getQueueLength() {
      return this.length;
    },


    /**
     * Get the queue tasks
     *
     * @return {Object}
     */
    getTasks: function getTasks() {
      return _tasks;
    },


    /**
     * Debug queue settings to the console
     */
    debug: function debug() {
      console.log({
        _options: _options,
        _tasks: _tasks,
        _timer: _timer,
        _timerDelay: _timerDelay,
        _replayTimer: _replayTimer,
        _replayTimerDelay: _replayTimerDelay,
        _status: _status,
        Queue: this
      });
    }
  };

  return Queue;
}