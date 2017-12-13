'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _breakpoints = require('./breakpoints');

var _breakpoints2 = _interopRequireDefault(_breakpoints);

var _debug = require('./debug');

var _debug2 = _interopRequireDefault(_debug);

var _queue = require('./queue');

var _queue2 = _interopRequireDefault(_queue);

var _trackevent = require('./trackevent');

var _trackevent2 = _interopRequireDefault(_trackevent);

var _smoothScroll = require('./smooth-scroll');

var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * LVL99 Tools
 *
 * Standalone tools that don't require any dependencies within the framework, but work alongside
 */

var utils = {
  Breakpoints: _breakpoints2.default,
  Debug: _debug2.default,
  Queue: _queue2.default,
  TrackEvent: _trackevent2.default,
  SmoothScroll: _smoothScroll2.default,
  Storage: _storage2.default
};

exports.default = tools;