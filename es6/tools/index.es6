/**
 * LVL99 Tools
 *
 * Standalone tools that don't require any dependencies within the framework, but work alongside
 */

const Breakpoints = require('./breakpoints')
const Debug = require('./debug')
const Queue = require('./queue')
const TrackEvent = require('./trackEvent')

const utils = {
  Breakpoints,
  Debug,
  Queue,
  TrackEvent
}

module.exports = tools
