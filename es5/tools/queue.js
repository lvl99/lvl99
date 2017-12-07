(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash.merge'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash.merge'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.lodash);
    global.queue = mod.exports;
  }
})(this, function (module, exports, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Queue;

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  /**
   * Queue class
   *
   * @returns {Object}
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
      timerDelay: 100
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
      var actionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'run';

      clearTimeout(_replayTimer);

      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      _replayTimer = setTimeout(function checkQueueIsFinishedThenPerformAction(q, aN, a) {
        if (q.checkStatus === 1 && q.getTasksLength() && q.hasOwnProperty(aN)) {
          // @debug
          // console.log('Replaying queue...', {
          //   Queue: q,
          //   actionName: aN,
          //   args: a
          // })

          // Each action will either perform the action or replay itself if necessary
          q[aN].apply(q, _toConsumableArray(a));
        }
      }(Q, actionName, args), _replayTimerDelay);
    }

    var Queue = {
      queue: function queue(actionLabel, action) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        // Default actionLabel is time value as string
        if (!actionLabel) {
          actionLabel = Date.now() + '';
        }

        // Assign the function to the queue
        if (actionLabel && action && typeof action === 'function') {
          _tasks[actionLabel] = {
            action: action,
            args: args
          };
        }

        // @chainable
        return this;
      },
      add: function add(actionLabel, action) {
        for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
          args[_key3 - 2] = arguments[_key3];
        }

        // @debug
        // console.log('Queue.add', {
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
        //   console.log('queue is currently paused')
        // }

        // @chainable
        return this;
      },
      delayAdd: function delayAdd(delay, actionLabel, action) {
        // @debug
        // console.log('Queue.delayAdd', {
        //   actionLabel,
        //   action
        // })

        var _delay = delay || _timerDelay;

        // Queue the action

        for (var _len4 = arguments.length, args = Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
          args[_key4 - 3] = arguments[_key4];
        }

        this.queue.apply(this, [actionLabel, action].concat(_toConsumableArray(args)));

        // Play the timer to get the queue to run after a delay (only when playing)
        if (_status) {
          this.play(_delay);
        }

        // @chainable
        return this;
      },
      sync: function sync(actionLabel, action) {
        // @debug
        // console.log('Queue.sync', {
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
      getActionByLabel: function getActionByLabel(actionLabel) {
        if (_tasks.hasOwnProperty(actionLabel)) {
          return _tasks[actionLabel];
        }

        return undefined;
      },
      remove: function remove(actionLabel) {
        if (_tasks.hasOwnProperty(actionLabel)) {
          _tasks[actionLabel] = undefined;
          delete _tasks[actionLabel];
        }

        // @chainable
        return this;
      },
      play: function play() {
        var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _timerDelay;

        // @debug
        // console.log('Queue.play', {
        //   _status
        // })

        // Ensure delay is really set property (if someone sets to null or undefined it should default back to regular delay time)
        var _delay = delay || _timerDelay;

        // Currently already running
        if (_status === 2) {
          for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
            args[_key6 - 1] = arguments[_key6];
          }

          _checkQueueFinished.apply(undefined, [this, 'play'].concat(_toConsumableArray(args)));
        }

        // Only play if already paused
        clearTimeout(_timer);

        // Set to playing
        _status = 1;

        // Reset timer to run the queue
        _timer = setTimeout(function runQueueProcessAfterDelay(q) {
          q.run();
        }(this), _delay);

        // @chainable
        return this;
      },
      pause: function pause() {
        // @debug
        // console.log('Queue.pause', {
        //   _status
        // })

        // Queue is already running
        if (_status === 2) {
          _checkQueueFinished(this, 'pause');
        }

        // Only pause if already playing
        clearTimeout(_timer);

        // Set to paused
        _status = 0;

        // @chainable
        return this;
      },
      run: function run() {
        // @debug
        // console.log('Queue.run...', {
        //   _status,
        //   _tasks
        // })

        // Currently already running, so run again later
        if (_status === 2) {
          _checkQueueFinished(this, 'run');
        }

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
        // console.log('Queue.running...', {
        //   _previousStatus,
        //   _status
        // })

        // Process the queue
        for (var actionLabel in _tasks) {
          if (_tasks.hasOwnProperty(actionLabel) && _tasks[actionLabel]) {
            var queuedItem = _tasks[actionLabel];

            // @debug
            // console.log(` --> ${actionLabel}`, queuedItem)

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
      checkStatus: function checkStatus() {
        return _status;
      },
      getTimerDelay: function getTimerDelay() {
        return _timerDelay;
      },
      setTimerDelay: function setTimerDelay(timerDelay) {
        // Only set if timerDelay is greater than 0
        if (timerDelay && timerDelay > 0) {
          _timerDelay = timerDelay;
          _replayTimerDelay = timerDelay;
        }

        // @chainable
        return this;
      },
      length: function length() {
        return Object.keys(_tasks).length;
      },
      getQueueLength: function getQueueLength() {
        return this.length;
      },
      getTasks: function getTasks() {
        return _tasks;
      }
    };

    return Queue;
  }
  module.exports = exports['default'];
});