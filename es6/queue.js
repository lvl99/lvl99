/**
 * Batch actions into a debounced queue
 * Useful to reduce amount of work computer/browser does
 */

import merge from 'lodash.merge'

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
   */
  let _options = merge({
    queue: {},
    timer: 0,
    timerDelay: 100
  }, options)

  /**
   * The batched queue
   * Queue actions are batched in an {Object} with a specific keyword
   *
   * @type {Object}
   */
  let _queue = _options.queue

  /**
   * The queue timer
   * When the queue is added to, the timer is updated with a `setTimeout` call to the `run` function
   *
   * @type {Number}
   */
  let _timer = _options.timer

  /**
   * The queue timer delay
   * The delay between queue timer updates (in milliseconds)
   *
   * @type {Number}
   */
  let _timerDelay = _options.timerDelay

  return {
    /**
     * Add action to the queue
     *
     * @param {String} queueKey
     * @param {Function} queueAction
     * @param {Mixed} queueActionArgs
     * @return {Self}
     * @chainable
     */
    add (queueKey, queueAction, ...queueActionArgs) {
      // Default queueKey is time value as string
      if (!queueKey) {
        queueKey = new Date().getTime() + ''
      }

      // Assign the function to the queue
      if (queueKey && queueAction && typeof queueAction === 'function') {
        _queue[queueKey] = {
          action: queueAction,
          args: queueActionArgs
        }
      }

      // @chainable
      return this
    },

    /**
     * Remove action from queue
     *
     * @param {String} queueKey
     * @return {Self}
     * @chainable
     */
    remove (queueKey) {
      if (_queue.hasOwnProperty(queueKey)) {
        _queue[queueKey] = undefined
        delete _queue[queueKey]
      }

      // @chainable
      return this
    },

    /**
     * Add action and run the queue
     *
     * @param {String} queueKey
     * @param {Function} queueAction
     * @param {Mixed} queueActionArgs
     * @return {Self}
     * @chainable
     */
    sync (queueKey, queueAction, ...queueActionArgs) {
      clearTimeout(_timerDelay)

      this.add(...arguments)

      // Reset timer to run the queue
      _timer = setTimeout(this.run, _timerDelay)

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
      clearTimeout(_timerDelay)

      // @chainable
      return this
    },

    /**
     * Process/run the actions in the queue
     *
     * @return {Self}
     * @chainable
     */
    run () {
      clearTimeout(_timer)

      for (let i in _queue) {
        if (_queue.hasOwnProperty(i) && _queue[i]) {
          // Function
          if (_queue[i] && typeof _queue[i] === 'function') {
            _queue[i]()

          // Object
          } else if (_queue[i].hasOwnProperty('action') && typeof _queue[i].action === 'function') {
            // Apply arguments to the action
            if (_queue[i].hasOwnProperty('args') && _queue[i].args instanceof Array) {
              _queue[i].action(..._queue[i].args)

            // Run the action like normal
            } else {
              _queue[i].action()
            }
          }

          _queue[i] = undefined
          delete _queue[i]
        }
      }

      // @chainable
      return this
    }
  }
}

module.exports = Queue
