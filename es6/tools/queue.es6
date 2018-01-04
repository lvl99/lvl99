/**
 * # Queue
 *
 * Batch actions into a debounced queue. Useful to reduce amount of work computer/browser does.
 */

import merge from 'lodash.merge'

const __loggerPath = 'Queue'

/**
 * Queue class
 *
 * @return {Object}
 * @constructor
 */
export default function Queue (options) {
  /**
   * Queue options
   *
   * @type {Object}
   * @private
   */
  let _options = merge({
    queue: {},
    timer: 0,
    timerDelay: 100
  }, options)

  /**
   * The batched queue tasks
   * Queue actions are batched in an {Object} with a specific label
   *
   * @type {Object}
   * @private
   */
  let _tasks = _options.queue

  /**
   * The queue timer
   * When the queue is added to, the timer is updated with a `setTimeout` call to the `run` function
   *
   * @type {Number}
   * @private
   */
  let _timer = _options.timer

  /**
   * The queue timer delay
   * The delay between queue timer updates (in milliseconds)
   *
   * @type {Number}
   * @default 100
   * @private
   */
  let _timerDelay = _options.timerDelay

  /**
   * The queue's replay timer which tracks if/when to fire queued actions while the queue is already running
   */
  let _replayTimer = _options.replayTimer || _options.timer

  /**
   * The queue replay timer delay
   * The delay between queue replay timer updates (in milliseconds)
   *
   * @type {number}
   * @default 100
   * @private
   */
  let _replayTimerDelay = _options.replayTimerDelay || _options.timerDelay

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
  let _status = 1

  /**
   * Check when queue has finished running to then replay the action
   *
   * @param {Queue} Q The queue to replay
   * @param {String} actionName The action to replay
   * @param {Mixed} ...args Any additional arguments to pass to the action
   * @private
   */
  function _checkQueueFinished (Q, actionName = 'run', ...args) {
    // @debug
    console.log(`${__loggerPath} _checkQueueFinished`, {
      actionName,
      queue: Q
    })

    clearTimeout(_replayTimer)
    _replayTimer = setTimeout(function checkQueueIsFinishedThenPerformAction(q, aN, a) {
      if (q.checkStatus === 1 && q.getTasksLength() && q.hasOwnProperty(aN)) {
        // @debug
        // console.log(`[${__loggerPath}] Replaying queue...`, {
        //   Queue: q,
        //   actionName: aN,
        //   args: a
        // })

        // Each action will either perform the action or replay itself if necessary
        q[aN](...a)
      }
    }(Q, actionName, args), _replayTimerDelay)
  }

  const Queue = {
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
    queue (actionLabel, action, ...args) {
      // Default actionLabel is time value as string
      if (!actionLabel) {
        actionLabel = Date.now() + ''
      }

      // Assign the function to the queue
      if (actionLabel && action && typeof action === 'function') {
        _tasks[actionLabel] = {
          action,
          args: args
        }
      }

      // @chainable
      return this
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
    add (actionLabel, action, ...args) {
      // @debug
      console.log(`[${__loggerPath}] add`, {
        actionLabel,
        action
      })

      // Queue the action
      this.queue(actionLabel, action, ...args)

      // Play the timer to get the queue to run after a delay (only when playing)
      if (_status) {
        this.play()
      }
      // } else {
      //   // @debug
      //   console.log(`[${__loggerPath}] add: queue is currently paused`)
      // }

      // @chainable
      return this
    },

    /**
     * Same as `add` except you can affect the delay time that the queue will play after adding the task.
     *
     * @param {Number} delay The milliseconds to delay before running
     * @param {String} actionLabel A unique label for the action in the queue.
     *                             Can be set to {undefined} (which means the action can't be removed)
     * @param {Function} action The function to handle the action
     * @param {Mixed} ...args The arguments to pass to the action handler
     * @return {Self}
     * @chainable
     */
    delayAdd (delay, actionLabel, action, ...args) {
      // @debug
      console.log(`[${__loggerPath}] delayAdd`, {
        delay,
        actionLabel,
        action
      })

      let _delay = delay || _timerDelay

      // Queue the action
      this.queue(actionLabel, action, ...args)

      // Play the timer to get the queue to run after a delay (only when playing)
      if (_status) {
        this.play(_delay)
      }

      // @chainable
      return this
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
    sync (actionLabel, action, ...args) {
      // @debug
      // console.log(`[${__loggerPath}] sync`, {
      //   actionLabel,
      //   action
      // })

      // Ensure to clear the queue
      clearTimeout(_timer)

      // Queue action...
      this.queue(actionLabel, action, ...args)

      // ... Then run the queue immediately
      this.run()

      // @chainable
      return this
    },

    /**
     * Get the action by its label
     *
     * @param {String} actionLabel
     * @return {undefined|Object}
     */
    getActionByLabel (actionLabel) {
      if (_tasks.hasOwnProperty(actionLabel)) {
        return _tasks[actionLabel]
      }

      return undefined
    },

    /**
     * Remove action from queue. Can only remove actions if you know their label
     *
     * @param {String} actionLabel
     * @return {Self}
     * @chainable
     */
    remove (actionLabel) {
      if (_tasks.hasOwnProperty(actionLabel)) {
        // @debug
        console.log(`${__loggerPath} remove`, {
          actionLabel
        })

        _tasks[actionLabel] = undefined
        delete _tasks[actionLabel]
      }

      // @chainable
      return this
    },

    /**
     * Play the queue timer (will run queue after timer delay)
     *
     * @param {Number} delay The time in milliseconds before playing
     * @return {Self}
     * @chainable
     */
    play (delay, ...args) {
      // Ensure delay is set property (if someone sets to null or undefined it should default back to regular delay time)
      let _delay = delay || _timerDelay

      // Currently already running
      if (_status === 2) {
        _checkQueueFinished(this, 'play', ...args)
        return
      }

      // @debug
      console.log(`[${__loggerPath}] play`, {
        _status,
        delay,
        _delay
      })

      // Only play if already paused
      clearTimeout(_timer)

      // Set to playing
      _status = 1

      // Reset timer to run the queue
      _timer = setTimeout(function runQueueProcessAfterDelay (q) {
        q.run()
      }(this), _delay)

      // @chainable
      return this
    },

    /**
     * Pause the queue timer
     *
     * @return {Self}
     * @chainable
     */
    pause () {
      // Queue is already running
      if (_status === 2) {
        _checkQueueFinished(this, 'pause')
        return
      }

      // @debug
      // console.log(`[${__loggerPath}] pause`, {
      //   _status
      // })

      // Only pause if already playing
      clearTimeout(_timer)

      // Set to paused
      _status = 0

      // @chainable
      return this
    },

    /**
     * Process/run all the actions in the queue
     *
     * @return {Self}
     * @chainable
     */
    run () {
      // Currently already running, so run again later
      if (_status === 2) {
        _checkQueueFinished(this, 'run')
        return
      }

      // @debug
      // console.log(`[${__loggerPath}] run`, {
      //   _status,
      //   _tasks
      // })

      clearTimeout(_timer)
      clearTimeout(_replayTimer)

      // No items in the queue, so force queue to pause
      if (!Object.keys(_tasks).length) {
        _status = 0
        return this
      }

      // Save the queue's current status
      let _previousStatus = _status

      // Set the status to running
      _status = 2

      // @debug
      // console.log(`[${__loggerPath}] run: processing...`, {
      //   _previousStatus,
      //   _status
      // })

      // Process the queue
      for (let actionLabel in _tasks) {
        if (_tasks.hasOwnProperty(actionLabel) && _tasks[actionLabel]) {
          let queuedItem = _tasks[actionLabel]

          // @debug
          // console.log(`[${__loggerPath}] run --> ${actionLabel}`, queuedItem)

          // Function
          if (queuedItem && typeof queuedItem === 'function') {
            queuedItem()

            // Object
          } else if (queuedItem.hasOwnProperty('action') && typeof queuedItem.action === 'function') {
            // Apply arguments to the action
            if (queuedItem.hasOwnProperty('args') && queuedItem.args instanceof Array) {
              queuedItem.action(...queuedItem.args)

              // Run the action like normal
            } else {
              queuedItem.action()
            }
          }

          // Delete the queued item
          _tasks[actionLabel] = undefined
          delete _tasks[actionLabel]
        }
      }

      // Revert to status before run
      _status = _previousStatus

      // @chainable
      return this
    },

    /**
     * Get the status of the queue:
     *   0 = Paused
     *   1 = Playing
     *   2 = Running
     * @return {Number}
     */
    checkStatus () {
      return _status
    },

    /**
     * Get the timer delay
     *
     * @return {Number}
     */
    getTimerDelay () {
      return _timerDelay
    },

    /**
     * Set the timer delay
     *
     * @param timerDelay
     * @chainable
     * @return {Self}
     */
    setTimerDelay (timerDelay) {
      // Only set if timerDelay is greater than 0
      if (timerDelay && timerDelay > 0) {
        _timerDelay = timerDelay
        _replayTimerDelay = timerDelay
      }

      // @chainable
      return this
    },

    /**
     * Get the length of the queue
     *
     * @return {Number}
     */
    length () {
      return Object.keys(_tasks).length
    },

    /**
     * Backward compatible alias
     *
     * @return {Queue.length}
     */
    getQueueLength() {
      return this.length
    },

    /**
     * Get the queue tasks
     *
     * @return {Object}
     */
    getTasks () {
      return _tasks
    }
  }

  return Queue
}
