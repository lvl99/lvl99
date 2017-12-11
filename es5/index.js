(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', './common', './utils', './core', './tools'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./common'), require('./utils'), require('./core'), require('./tools'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.common, global.utils, global.core, global.tools);
    global.index = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', './common', './utils', './core', './tools'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.common, global.utils, global.core, global.tools);
      global.index = mod.exports;
    }
  })(this, function (module, exports, _common, _utils, _core, _tools) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _common2 = _interopRequireDefault(_common);

    var _utils2 = _interopRequireDefault(_utils);

    var _core2 = _interopRequireDefault(_core);

    var _tools2 = _interopRequireDefault(_tools);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    /**
     * LVL99
     *
     * The whole framework in one discrete package.
     */

    var lvl99 = {
      common: _common2.default,
      core: _core2.default,
      utils: _utils2.default,
      tools: _tools2.default
    };

    exports.default = lvl99;
    module.exports = exports['default'];
  });
});