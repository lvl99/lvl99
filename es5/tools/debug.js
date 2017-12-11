(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["module", "exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.debug = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(["module", "exports"], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports);
      global.debug = mod.exports;
    }
  })(this, function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = Debug;
    /**
     * # Debug
     *
     * A console-like replacement which creates a noop console object if you don't want to output stuff via the console
     */

    function noop() {}

    /**
     * Debug class.
     *
     * @param {Boolean} silent Set to true to make the console behaviours silent
     * @constructor
     */
    function Debug() {
      var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

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
        };
      } else {
        return console || window.console;
      }
    }
    module.exports = exports["default"];
  });
});