/**
 * LVL99 Queue
 *
 * Batch actions into a debounced queue
 * Useful to reduce amount of work computer/browser does
 *
 * @package lvl99
 */

const merge = require('lodash.merge')

/**
 * Queue class
 *
 * @returns {Object}
 * @constructor
 */
function Queue (options) {
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
   * The batched queue
   * Queue actions are batched in an {Object} with a specific label
   *
   * @type {Object}
   * @private
   */
  let _queue = _options.queue

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
   * The play status
   *
   * @type {Number}
   * @default 1
   * @private
   */
  let _status = 1

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
    queue (actionLabel, action, ...args) {
      // Default actionLabel is time value as string
      if (!actionLabel) {
        actionLabel = Date.now() + ''
      }

      // Assign the function to the queue
      if (actionLabel && action && typeof action === 'function') {
        _queue[actionLabel] = {
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
      // Queue the action
      this.queue(actionLabel, action, ...args)

      // Play the timer to get the queue to run after a delay (only when playing)
      if (_status) {
        this.play()
      }
      // } else {
      //   // @debug
      //   console.log('queue is currently paused')
      // }

      // @chainable
      return this
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
    sync (actionLabel, action, ...args) {
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
      if (_queue.hasOwnProperty(actionLabel)) {
        return _queue[actionLabel]
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
      if (_queue.hasOwnProperty(actionLabel)) {
        _queue[actionLabel] = undefined
        delete _queue[actionLabel]
      }

      // @chainable
      return this
    },

    /**
     * Play the queue timer (will run queue after timer delay)
     *
     * @return {Self}
     * @chainable
     */
    play () {
      // Only play if already paused
      clearTimeout(_timer)

      // Set to playing
      _status = 1

      // Reset timer to run the queue
      _timer = setTimeout(function runQueueProcessAfterDelay(queueInstance) {
        queueInstance.run()
      }(this), _timerDelay)

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
      clearTimeout(_timer)

      // No items in the queue, so set to pause
      if (!Object.keys(_queue).length) {
        this.pause()

        return this
      }

      // Process the queue
      for (let actionLabel in _queue) {
        if (_queue.hasOwnProperty(actionLabel) && _queue[actionLabel]) {
          let queuedItem = _queue[actionLabel]

          // @debug
          // console.log('running queued item', queuedItem)

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
          _queue[actionLabel] = undefined
          delete _queue[actionLabel]
        }
      }

      // Continue playing if in play mode
      // if (_status) {
      //   this.play()
      // }

      // @chainable
      return this
    },

    /**
     * Get the status of the queue:
     *   0 = Paused
     *   1 = Playing
     * @returns {Number}
     */
    checkStatus () {
      return _status
    },

    /**
     * Get the timer delay
     *
     * @returns {Number}
     */
    getTimerDelay () {
      return _timerDelay
    },

    /**
     * Set the timer delay
     *
     * @param timerDelay
     * @chainable
     * @returns {Self}
     */
    setTimerDelay (timerDelay) {
      // Only set if timerDelay is greater than 0
      if (timerDelay && timerDelay > 0) {
        _timerDelay = timerDelay
      }

      // @chainable
      return this
    },

    /**
     * Get the length of the queue
     *
     * @return {Number}
     */
    getQueueLength () {
      return Object.keys(_queue).length
    }
  }
}

module.exports = Queue
