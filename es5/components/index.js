(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './accordion', './modal', './spinner', './toggleable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./accordion'), require('./modal'), require('./spinner'), require('./toggleable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.accordion, global.modal, global.spinner, global.toggleable);
    global.index = mod.exports;
  }
})(this, function (module, exports, _accordion, _modal, _spinner, _toggleable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _accordion2 = _interopRequireDefault(_accordion);

  var _modal2 = _interopRequireDefault(_modal);

  var _spinner2 = _interopRequireDefault(_spinner);

  var _toggleable2 = _interopRequireDefault(_toggleable);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * LVL99 Components
   *
   * @package lvl99
   */

  var components = {
    Accordion: _accordion2.default,
    Modal: _modal2.default,
    Spinner: _spinner2.default,
    Toggleable: _toggleable2.default
  };

  exports.default = components;
  module.exports = exports['default'];
});