'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * LVL99 Queue
 *
 * Batch actions into a debounced queue
 * Useful to reduce amount of work computer/browser does
 *
 * @package lvl99
 */

var merge = require('lodash.merge');

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
  var _options = merge({
    queue: {},
    timer: 0,
    timerDelay: 100
  }, options);

  /**
   * The batched queue
   * Queue actions are batched in an {Object} with a specific label
   *
   * @type {Object}
   * @private
   */
  var _queue = _options.queue;

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

  return {
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
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      // Default actionLabel is time value as string
      if (!actionLabel) {
        actionLabel = Date.now() + '';
      }

      // Assign the function to the queue
      if (actionLabel && action && typeof action === 'function') {
        _queue[actionLabel] = {
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
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
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


    /**
     * Add action and then run the queue immediately
     *
     * @param {String} actionLabel
     * @param {Function} action
     * @param {Mixed} actionArgs
     * @return {Self}
     * @chainable
     */
    sync: function sync(actionLabel, action) {
      // @debug
      // console.log('Queue.sync', {
      //   actionLabel,
      //   action
      // })

      clearTimeout(_timer);

      // Queue action...

      for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
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
      if (_queue.hasOwnProperty(actionLabel)) {
        return _queue[actionLabel];
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
      if (_queue.hasOwnProperty(actionLabel)) {
        _queue[actionLabel] = undefined;
        delete _queue[actionLabel];
      }

      // @chainable
      return this;
    },


    /**
     * Play the queue timer (will run queue after timer delay)
     *
     * @return {Self}
     * @chainable
     */
    play: function play() {
      var _this = this;

      // @debug
      // console.log('Queue.play', {
      //   _status
      // })

      // Currently already running
      if (_status === 2) {
        // What if I control the queue via the queue?
        var playQueueAfterRunning = function playQueueAfterRunning() {
          // @debug
          // console.log('__Queue:playQueueAfterRunning')
          _this.play();
        };
        return this.queue('__Queue:playQueueAfterRunning', playQueueAfterRunning);
      }

      // Only play if already paused
      clearTimeout(_timer);

      // Set to playing
      _status = 1;

      // Reset timer to run the queue
      _timer = setTimeout(function runQueueProcessAfterDelay(queueInstance) {
        queueInstance.run();
      }(this), _timerDelay);

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
      var _this2 = this;

      // @debug
      // console.log('Queue.pause', {
      //   _status
      // })

      // Queue is already running
      if (_status === 2) {
        // What if I control the queue via the queue?
        var pauseQueueAfterRunning = function pauseQueueAfterRunning() {
          // @debug
          // console.log('__Queue:pauseQueueAfterRunning')
          _this2.pause();
        };
        return this.queue('__Queue:pauseQueueAfterRunning', pauseQueueAfterRunning);
      }

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
      var _this3 = this;

      // @debug
      // console.log('Queue.run...', {
      //   _status,
      //   _queue
      // })

      // Currently already running
      if (_status === 2) {
        // What if I control the queue via the queue?
        var runQueueAgainAfterRunning = function runQueueAgainAfterRunning() {
          // @debug
          // console.log('__Queue:runQueueAgainAfterRunning')
          _this3.run();
        };
        return this.queue('__Queue:runQueueAgainAfterRunning', runQueueAgainAfterRunning);
      }

      clearTimeout(_timer);

      // No items in the queue, so force queue to pause
      if (!Object.keys(_queue).length) {
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
      for (var actionLabel in _queue) {
        if (_queue.hasOwnProperty(actionLabel) && _queue[actionLabel]) {
          var queuedItem = _queue[actionLabel];

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
          _queue[actionLabel] = undefined;
          delete _queue[actionLabel];
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
     * @returns {Number}
     */
    checkStatus: function checkStatus() {
      return _status;
    },


    /**
     * Get the timer delay
     *
     * @returns {Number}
     */
    getTimerDelay: function getTimerDelay() {
      return _timerDelay;
    },


    /**
     * Set the timer delay
     *
     * @param timerDelay
     * @chainable
     * @returns {Self}
     */
    setTimerDelay: function setTimerDelay(timerDelay) {
      // Only set if timerDelay is greater than 0
      if (timerDelay && timerDelay > 0) {
        _timerDelay = timerDelay;
      }

      // @chainable
      return this;
    },


    /**
     * Get the length of the queue
     *
     * @return {Number}
     */
    getQueueLength: function getQueueLength() {
      return Object.keys(_queue).length;
    }
  };
}

module.exports = Queue;