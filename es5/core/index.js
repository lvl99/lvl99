(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './entity', './app', './component'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./entity'), require('./app'), require('./component'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.entity, global.app, global.component);
    global.index = mod.exports;
  }
})(this, function (module, exports, _entity, _app, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _entity2 = _interopRequireDefault(_entity);

  var _app2 = _interopRequireDefault(_app);

  var _component2 = _interopRequireDefault(_component);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var core = {
    Entity: _entity2.default,
    App: _app2.default,
    Component: _component2.default
  }; /**
      * LVL99 Core
      *
      * Core classes used throughout the framework
      *
      * @package lvl99
      */

  exports.default = core;
  module.exports = exports['default'];
});