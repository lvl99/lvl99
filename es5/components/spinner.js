(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../common', './toggleable'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../common'), require('./toggleable'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.common, global.toggleable);
    global.spinner = mod.exports;
  }
})(this, function (module, exports, _common, _toggleable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _toggleable2 = _interopRequireDefault(_toggleable);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  var _get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  /**
   * Spinner Properties
   *
   * @private
   * @type {Object}
   */
  var SpinnerProperties = {
    /**
     * NAMESPACE
     * This is used for custom events and error reporting
     *
     * @type {String}
     */
    _NS: 'LVL99:Spinner',

    /**
     * namespace
     * This is used for CSS classes
     *
     * @type {String}
     */
    _ns: 'lvl99-spinner',

    /**
     * The properties shared between all instances of this Toggleable
     *
     * @type {Object}
     */
    _properties: {
      // Public methods on Spinner
      publicMethods: [{
        target: 'self',
        do: 'startSpinning'
      }, {
        target: 'self',
        do: 'stopSpinning'
      }],

      // Set to false to target the component's $elem
      $classTarget: false
    },

    /**
     * The default attributes to load a created Toggleable instance with.
     *
     * @type {Object}
     */
    _attributes: {
      // Disable these toggleable attributes
      _toggleableCloseOnBlur: false,
      _toggleableCloseOnBlurTarget: undefined,

      // CSS classes for spinning
      _spinnerClassSpinning: undefined,

      // Watch this DOM element selector for the events
      _spinnerWatchTarget: undefined,

      // Events to hook into to start the spinner on
      _spinnerWatchEventsForStart: 'load submit start',

      // Events to hook into to stop the spinner on
      _spinnerWatchEventsForStop: 'error reset stop',

      $elem: undefined,
      isSpinning: false
    }

    /**
     * LVL99.Spinner
     *
     * Spinners show when stuff is loading, working, etc. Spinners can watch other DOM element targets for
     * events to start/stop spinning on.
     *
     * @constructor
     * @extends {Toggleable}
     */
  };
  var Spinner = function (_Toggleable) {
    _inherits(Spinner, _Toggleable);

    function Spinner(attributes) {
      _classCallCheck(this, Spinner);

      return _possibleConstructorReturn(this, (Spinner.__proto__ || Object.getPrototypeOf(Spinner)).call(this, attributes));
    }

    _createClass(Spinner, [{
      key: 'extend',
      value: function extend() {
        var _get2;

        // @debug
        // console.log('LVL99:Spinner:extend', {
        //   arguments
        // })

        // Merge the properties with the instantiated attributes
        (_get2 = _get(Spinner.prototype.__proto__ || Object.getPrototypeOf(Spinner.prototype), 'extend', this)).call.apply(_get2, [this, SpinnerProperties].concat(Array.prototype.slice.call(arguments)));
      }
    }, {
      key: 'buildCSSClasses',
      value: function buildCSSClasses() {
        _get(Spinner.prototype.__proto__ || Object.getPrototypeOf(Spinner.prototype), 'buildCSSClasses', this).apply(this, arguments);

        if (!this.getAttr('_spinnerClassSpinning')) {
          this.setAttr('_spinnerClassSpinning', 'ui-' + this.ns + '-spinning');
        }
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        // @debug
        // console.log('LVL99:Spinner:init', this.NS, this)

        // No element found? Error
        if (!this.getElem() || !this.getElem().length) {
          throw new Error(this.NS + ':init: elem is missing');
        }

        // Set up watching target events for start/stop
        if (this.getAttr('_spinnerWatchTarget')) {
          if (this.getAttr('_spinnerWatchEventsForStart')) {
            _common.$doc.on(this.getAttr('_spinnerWatchEventsForStart'), this.getAttr('_spinnerWatchTarget'), function (jQueryEvent) {
              _this2.startSpinning();
            });
          }

          if (this.getAttr('_spinnerWatchEventsForStop')) {
            _common.$doc.on(this.getAttr('_spinnerWatchEventsForStop'), this.getAttr('_spinnerWatchTarget'), function (jQueryEvent) {
              _this2.stopSpinning();
            });
          }
        }

        _get(Spinner.prototype.__proto__ || Object.getPrototypeOf(Spinner.prototype), 'init', this).apply(this, arguments);
      }
    }, {
      key: 'startSpinning',
      value: function startSpinning() {
        // @debug
        // console.log(`${this.NS}:startSpinning`)

        if (!this.getAttr('isSpinning')) {
          if (!this.getAttr('isOpen')) {
            this.open();
          }
          this.setAttr('isSpinning', true);
          this.getClassTarget().addClass(this.getAttr('_spinnerClassSpinning'));
          this.triggerEvent('startSpinning:end');
        }
      }
    }, {
      key: 'stopSpinning',
      value: function stopSpinning() {
        // @debug
        // console.log(`${this.NS}:stopSpinning`)

        if (this.getAttr('isSpinning')) {
          this.setAttr('isSpinning', false);
          this.getClassTarget().removeClass(this.getAttr('_spinnerClassSpinning'));
          if (this.getAttr('isOpen')) {
            this.close();
          }
          this.triggerEvent('stopSpinning:end');
        }
      }
    }]);

    return Spinner;
  }(_toggleable2.default);

  exports.default = Spinner;
  module.exports = exports['default'];
});