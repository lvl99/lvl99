/**
 * LVL99 Debug
 * A console-like replacement which creates a noop console object if you don't want to output stuff via the console
 */

function noop () {}

/**
 * Debug
 *
 * @param {Boolean} silent Set to true to make the console behaviours silent
 * @constructor
 */
function Debug (silent = false) {
  if (silent) {
    return {
      clear: noop,
      count: noop,
      debug: noop,
      error: noop,
      group: noop,
      info: noop,
      log: noop,
      table: noop,
      time: noop,
      timeEnd: noop,
      trace: noop,
      warn: noop
    }
  } else {
    return console || window.console
  }
}

module.exports = Debug
