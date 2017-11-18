(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../common', '../core/component'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../common'), require('../core/component'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.common, global.component);
    global.toggleable = mod.exports;
  }
})(this, function (module, exports, _common, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _component2 = _interopRequireDefault(_component);

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
   * Toggleable Properties
   *
   * @private
   * @type {Object}
   */
  var ToggleableProperties = {
    /**
     * NAMESPACE
     * This is used for custom events and error reporting
     *
     * @type {String}
     */
    _NS: 'LVL99:Toggleable',

    /**
     * namespace
     * This is used for CSS classes
     *
     * @type {String}
     */
    _ns: 'lvl99-toggleable',

    /**
     * The properties shared between all instances of this Toggleable
     *
     * @type {Object}
     */
    _properties: {
      // Public methods on Toggleables
      publicMethods: [{
        target: 'self',
        do: 'open'
      }, {
        target: 'self',
        do: 'close'
      }, {
        target: 'self',
        do: 'toggle'
      }],

      // The target DOM element which will hold the open/transition classes. If undefined it will revert to the `$elem` attribute value
      $classTarget: _common.$body
    },

    /**
     * The default attributes to load a created Toggleable instance with.
     *
     * @type {Object}
     */
    _attributes: {
      _a11y: true,
      _toggleableUseTransitioning: true, // Whether to detect transitions or not
      _toggleableClassOpen: undefined,
      _toggleableClassTransitioning: undefined,
      _toggleableClassTransitioningOpen: undefined,
      _toggleableClassTransitioningClose: undefined,
      _toggleableCloseOnBlur: false, // Close the toggleable if user interacts away from it
      _toggleableCloseOnBlurTarget: undefined, // A selector identifying which element triggers CloseOnBlur
      $elem: undefined,
      isOpen: false
    }

    /**
     * LVL99.Toggleable
     *
     * Toggleable components can be opened using the {Toggleable} method `open`, or closed using the
     * {Toggleable} method `close`. You can toggle between the open/closed states using the method `toggle`.
     *
     * To get the current state of the component, simply use `toggleableInstance.getAttr('isOpen')` which will
     * return a {Boolean} value.
     *
     * To incorporate this behaviour with your component, simply import and extend the {Toggleable} class.
     *
     * @constructor
     * @extends {Component}
     */
  };
  var Toggleable = function (_Component) {
    _inherits(Toggleable, _Component);

    function Toggleable(attributes) {
      _classCallCheck(this, Toggleable);

      return _possibleConstructorReturn(this, (Toggleable.__proto__ || Object.getPrototypeOf(Toggleable)).call(this, attributes));
    }

    _createClass(Toggleable, [{
      key: 'extend',
      value: function extend() {
        var _get2;

        // @debug
        // console.log('LVL99:Toggleable:extend', {
        //   arguments
        // })

        // Merge the properties with the instantiated attributes
        (_get2 = _get(Toggleable.prototype.__proto__ || Object.getPrototypeOf(Toggleable.prototype), 'extend', this)).call.apply(_get2, [this, ToggleableProperties].concat(Array.prototype.slice.call(arguments)));
      }
    }, {
      key: 'init',
      value: function init() {
        var _this2 = this;

        // @debug
        // console.log('LVL99:Toggleable:init', this.NS, this)

        // No element found? Error
        if (!this.getElem() || !this.getElem().length) {
          throw new Error(this.NS + ':init: elem is missing');
        }

        // Add tabindex to elem for blur stuff
        if (this.getAttr('_toggleableCloseOnBlur')) {
          this.getElem().attr('tabindex', this.getElem().attr('tabindex') || 1);

          // Default blur target is elem
          var blurTarget = this.getElem();

          if (this.getAttr('_toggleableCloseOnBlurTarget')) {
            blurTarget = (0, _common.$)(this.getAttr('_toggleableCloseOnBlurTarget'));
          }

          if (blurTarget.length) {
            blurTarget.on('blur', function () {
              _this2.close();
            });
          }
        }

        // Only if using transitioning
        if (this.getAttr('_toggleableUseTransitioning')) {
          // Remove transition classes after transitionend
          this.getElem().on(_common.events.transitionend, /* `[data-component-id="${this.uuid}"]`, */function (jQueryEvent) {
            // @debug
            // console.log(`[${this.NS}] transitionend`, {
            //   jQueryEvent,
            //   target: jQueryEvent.target
            // })
            _this2.getClassTarget().removeClass(_this2.getAttr('_toggleableClassTransitioning'));
          });
        }

        // Set up classes
        this.buildCSSClasses();

        _get(Toggleable.prototype.__proto__ || Object.getPrototypeOf(Toggleable.prototype), 'init', this).apply(this, arguments);
      }
    }, {
      key: 'buildCSSClasses',
      value: function buildCSSClasses() {
        if (_get(Toggleable.prototype.__proto__ || Object.getPrototypeOf(Toggleable.prototype), 'buildCSSClasses', this)) {
          _get(Toggleable.prototype.__proto__ || Object.getPrototypeOf(Toggleable.prototype), 'buildCSSClasses', this).apply(this, arguments);
        }

        if (!this.getAttr('_toggleableClassOpen')) {
          this.setAttr('_toggleableClassOpen', 'ui-' + this.ns + '-open');
        }

        // Only if using transitioning
        if (this.getAttr('_toggleableUseTransitioning')) {
          if (!this.getAttr('_toggleableClassTransitioning')) {
            this.setAttr('_toggleableClassTransitioning', 'ui-' + this.ns + '-transitioning ui-' + this.ns + '-opening ui-' + this.ns + '-closing');
          }

          if (!this.getAttr('_toggleableClassTransitioningOpen')) {
            this.setAttr('_toggleableClassTransitioningOpen', 'ui-' + this.ns + '-transitioning ui-' + this.ns + '-opening ' + this.getAttr('_toggleableClassOpen'));
          }

          if (!this.getAttr('_toggleableClassTransitioningClose')) {
            this.setAttr('_toggleableClassTransitioningClose', 'ui-' + this.ns + '-transitioning ui-' + this.ns + '-closing');
          }

          // If not, unset these values
        } else {
          this.setAttr('_toggleableClassTransitioning', '');
          this.setAttr('_toggleableClassTransitioningOpen', '');
          this.setAttr('_toggleableClassTransitioningClose', '');
        }
      }
    }, {
      key: 'open',
      value: function open() {
        // @debug
        // console.log(`${this.NS}:open`)

        if (!this.getAttr('isOpen')) {
          this.setAttr('isOpen', true);
          this.getClassTarget().addClass(this.getAttr('_toggleableClassTransitioningOpen'));

          // @a11y
          if (this.getAttr('a11y')) {
            this.getElem().attr('aria-hidden', false);
          }

          if (this.getAttr('_toggleableCloseOnBlur')) {
            this.getElem().focus();
          }

          /**
           * @trigger LVL99:Toggleable:open:end
           */
          this.triggerEvent('open:end');
        }
      }
    }, {
      key: 'close',
      value: function close() {
        // @debug
        // console.log(`${this.NS}:close`)

        if (this.getAttr('isOpen')) {
          this.setAttr('isOpen', false);
          this.getClassTarget().addClass(this.getAttr('_toggleableClassTransitioningClose')).removeClass(this.getAttr('_toggleableClassOpen'));

          // @a11y
          if (this.getAttr('a11y')) {
            this.getElem().attr('aria-hidden', true);
          }

          /**
           * @trigger LVL99:Toggleable:close:end
           */
          this.triggerEvent('close:end');
        }
      }
    }, {
      key: 'toggle',
      value: function toggle(jQueryEvent) {
        // @debug
        // console.log(`${this.NS}:toggle`)

        // If the event was keyup/keydown
        var acceptedKeys = [13, 32]; // enter and space
        if (jQueryEvent && jQueryEvent.type === 'keypress' && !acceptedKeys.includes(jQueryEvent.which)) {
          // Nothing...
        } else {

          if (this.getAttr('isOpen')) {
            this.close();
          } else {
            this.open();
          }

          /**
           * @trigger LVL99:Toggleable:toggle:end
           */
          this.triggerEvent('toggle:end');
        }
      }
    }]);

    return Toggleable;
  }(_component2.default);

  exports.default = Toggleable;
  module.exports = exports['default'];
});