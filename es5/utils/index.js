(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './parse', './inheritance'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./parse'), require('./inheritance'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.parse, global.inheritance);
    global.index = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './parse', './inheritance'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.parse, global.inheritance);
      global.index = mod.exports;
    }
  })(this, function (module, exports, _parse, _inheritance) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _parse2 = _interopRequireDefault(_parse);

    var _inheritance2 = _interopRequireDefault(_inheritance);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    // import super from './super'

    /**
     * LVL99 Utils
     *
     * Utilities used throughout the framework
     *
     * @package lvl99
     */

    var utils = {
      parse: _parse2.default,
      inheritance: _inheritance2.default
    };

    exports.default = utils;
    module.exports = exports['default'];
  });
});