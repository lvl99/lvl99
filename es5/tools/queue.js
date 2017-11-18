function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * LVL99 Queue
 *
 * Batch actions into a debounced queue
 * Useful to reduce amount of work computer/browser does
 *
 * @package lvl99
 */

import merge from 'lodash.merge';

/**
 * Queue class
 *
 * @returns {Object}
 * @constructor
 */
export default function Queue(options) {
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
      if (actionLabel && action && typeof action === 'function') {
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

      // Queue the action
      this.queue.apply(this, [actionLabel, action].concat(args));

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
      clearTimeout(_timer);

      // Queue action...

      for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      this.queue.apply(this, [actionLabel, action].concat(args));

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
        _tasks[actionLabel] = undefined;
        delete _tasks[actionLabel];
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
<<<<<<< Updated upstream
=======
      // @debug
      // console.log('Queue.play', {
      //   _status
      // })

      // Currently already running
      if (_status === 2) {
        _checkQueueFinished(this, 'play');
      }

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
      // @debug
      // console.log('Queue.pause', {
      //   _status
      // })

      // Queue is already running
      if (_status === 2) {
        _checkQueueFinished(this, 'pause');
      }

>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
=======
      // @debug
      // console.log('Queue.run...', {
      //   _status,
      //   _tasks
      // })

      // Currently already running, so run again later
      if (_status === 2) {
        _checkQueueFinished(this, 'run');
      }

>>>>>>> Stashed changes
      clearTimeout(_timer);
      clearTimeout(_replayTimer);

<<<<<<< Updated upstream
      // No items in the queue, so set to pause
      if (!Object.keys(_queue).length) {
        this.pause();

=======
      // No items in the queue, so force queue to pause
      if (!Object.keys(_tasks).length) {
        _status = 0;
>>>>>>> Stashed changes
        return this;
      }

      // Process the queue
      for (var actionLabel in _tasks) {
        if (_tasks.hasOwnProperty(actionLabel) && _tasks[actionLabel]) {
          var queuedItem = _tasks[actionLabel];

          // @debug
          // console.log('running queued item', queuedItem)

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

      // Continue playing if in play mode
      // if (_status) {
      //   this.play()
      // }

      // @chainable
      return this;
    },


    /**
     * Get the status of the queue:
     *   0 = Paused
     *   1 = Playing
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
    getQueueLength: function getQueueLength() {
      return Object.keys(_tasks).length;
    },


    /**
     * Get the queue tasks
     *
     * @returns {Object}
     */
    getTasks: function getTasks() {
      return _tasks;
    }
  };

  return Queue;
}