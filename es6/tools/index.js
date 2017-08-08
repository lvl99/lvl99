/**
 * LVL99 Tools
 *
 * Standalone tools that don't require any dependencies within the framework, but work alongside
 */

const breakpoints = require('./breakpoints')
const queue = require('./queue')
const trackEvent = require('./trackEvent')

const utils = {
  breakpoints,
  queue,
  trackEvent
}

module.exports = tools
