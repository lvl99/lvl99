(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './breakpoints', './debug', './queue', './trackevent', './smooth-scroll'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./breakpoints'), require('./debug'), require('./queue'), require('./trackevent'), require('./smooth-scroll'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.breakpoints, global.debug, global.queue, global.trackevent, global.smoothScroll);
    global.index = mod.exports;
  }
})(this, function (module, exports, _breakpoints, _debug, _queue, _trackevent, _smoothScroll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _breakpoints2 = _interopRequireDefault(_breakpoints);

  var _debug2 = _interopRequireDefault(_debug);

  var _queue2 = _interopRequireDefault(_queue);

  var _trackevent2 = _interopRequireDefault(_trackevent);

  var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var utils = {
    Breakpoints: _breakpoints2.default,
    Debug: _debug2.default,
    Queue: _queue2.default,
    TrackEvent: _trackevent2.default,
    SmoothScroll: _smoothScroll2.default
  }; /**
      * LVL99 Tools
      *
      * Standalone tools that don't require any dependencies within the framework, but work alongside
      */

  exports.default = tools;
  module.exports = exports['default'];
});