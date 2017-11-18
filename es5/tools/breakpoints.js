(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash.merge'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash.merge'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.lodash);
    global.breakpoints = mod.exports;
  }
})(this, function (module, exports, _lodash) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Breakpoints;

  var _lodash2 = _interopRequireDefault(_lodash);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function Breakpoints(sizes) {
    return {
      /**
       * The defined breakpoint names with min/max widths (in 72dpi pixels)
       * Should coincide with CSS for optimum expected behaviour
       *
       * @property sizes
       * @type {Object} => {Array} [0 = {Number} minWidth, 1 = {Number} maxWidth]
       */
      sizes: sizes || {
        'xs': [0, 399],
        'mobile': [0, 799],
        'ms': [400, 599],
        's': [600, 799],
        'm': [800, 999],
        'tablet': [800, 1199],
        'l': [1000, 1199],
        'laptop': [1000, 1399],
        'computer': [1000, 99999],
        'xl': [1200, 1399],
        'desktop': [1200, 99999],
        'xxl': [1400, 99999]
      },

      getActive: function getActive() {
        var width = window.innerWidth;
        var bp = [];

        for (var x in this.sizes) {
          if (this.sizes.hasOwnProperty(x) && width >= this.sizes[x][0] && width <= this.sizes[x][1]) {
            bp.push(x);
          }
        }

        return bp;
      },
      isActive: function isActive(input) {
        if (input instanceof Array) {
          input = input.join('|');
        }

        if (typeof input === 'string') {
          input = new RegExp('\\b(?:' + input.replace(/[\s,]+/g, '|') + ')\\b', 'i');
        }

        return input.test(this.getActive() + '');
      }
    };
  } /**
     * LVL99 Breakpoints
     * Detect via JS what the breakpoint is by keyword
     *
     * @package lvl99
     */

  module.exports = exports['default'];
});