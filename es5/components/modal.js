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
    global.modal = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', '../common', './toggleable'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.common, global.toggleable);
      global.modal = mod.exports;
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

    var ModalProperties = {
      // Namespaces
      _NS: 'LVL99:Modal',
      _ns: 'lvl99-modal',

      // Modal properties
      _properties: {
        // Public methods (others should be inherited from the ToggleableComponent
        publicMethods: [{
          target: 'self',
          do: 'confirm'
        }, {
          target: 'self',
          do: 'cancel'
        }],

        // The target DOM element which will hold the open/transition classes. If undefined it will revert to the `$elem` attribute value
        $classTarget: _common.$body
      },

      // Default Toggleable attributes
      _attributes: {
        _a11y: true,
        _toggleableClassOpen: 'ui-modal-open',
        _toggleableClassTransitioning: 'ui-modal-transitioning ui-modal-opening ui-modal-closing',
        _toggleableClassTransitioningOpen: 'ui-modal-opening ui-modal-open',
        _toggleableClassTransitioningClose: 'ui-modal-closing',
        _toggleableCloseOnBlur: false,
        _modalCloseOnKeyPress: [27],
        _modalResetOnClose: true,
        _modalCloseOnTarget: undefined,
        _modalCloseOnTargetEvent: 'click touchend',
        _modalCloseOnTargetStrict: true,
        $elem: undefined
      }

      /**
       * LVL99.Modal
       *
       * Modal inherit {Toggleable} public behaviours.
       *
       * To incorporate this behaviour with your component, simply import and extend the {Modal} class.
       *
       * @constructor
       * @extends {Toggleable}
       */
    };
    var Modal = function (_Toggleable) {
      _inherits(Modal, _Toggleable);

      function Modal(attributes) {
        _classCallCheck(this, Modal);

        return _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, attributes));
      }

      _createClass(Modal, [{
        key: 'extend',
        value: function extend() {
          var _get2;

          // @debug
          // console.log('LVL99:Modal:extend')

          // Merge the properties with the instantiated attributes
          (_get2 = _get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'extend', this)).call.apply(_get2, [this, ModalProperties].concat(Array.prototype.slice.call(arguments)));
        }
      }, {
        key: 'init',
        value: function init() {
          var _this2 = this;

          // @debug
          // console.log('LVL99:Modal:init', this.NS, this)

          // Close on target event
          if (this.getAttr('_modalCloseOnTarget') && this.getAttr('_modalCloseOnTargetEvent')) {
            this.getElem().find(this.getAttr('_modalCloseOnTarget')).on(this.getAttr('_modalCloseOnTargetEvent'), function (jQueryEvent) {
              // @debug
              // console.log('modalCloseOnTarget', jQueryEvent.target, jQueryEvent.type)
              if (_this2.getAttr('_modalCloseOnTargetStrict') && (0, _common.$)(jQueryEvent.target).is(_this2.getAttr('_modalCloseOnTarget'))) {
                _this2.close();
              } else if (!_this2.getAttr('_modalCloseOnTargetStrict')) {
                _this2.close();
              }
            });
          }

          // Close on blur
          if (this.getAttr('_modalCloseOnBlur')) {
            this.getElem().on('blur', function () {
              _this2.close();
            });
          }

          // Close on keypress
          if (typeof this.getAttr('_modalCloseOnKeyPress') !== 'undefined' && this.getAttr('_modalCloseOnKeyPress').length) {
            this.getElem().on('keyup', function (event) {
              if (_this2.getAttr('_modalCloseOnKeyPress').includes(event.which)) {
                _this2.close();
                return false;
              }
            });
          }

          _get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'init', this).apply(this, arguments);
        }
      }, {
        key: 'confirm',
        value: function confirm() {
          this.triggerEvent('confirm:end');
          this.close();
        }
      }, {
        key: 'cancel',
        value: function cancel() {
          this.triggerEvent('cancel:end');
          this.close();
        }
      }, {
        key: 'close',
        value: function close() {
          if (this.getAttr('_modalResetOnClose')) {
            this.getElem().find('form').each(function (i, form) {
              form.reset();
            });
            this.triggerEvent('reset:end');
          }

          _get(Modal.prototype.__proto__ || Object.getPrototypeOf(Modal.prototype), 'close', this).apply(this, arguments);
        }
      }]);

      return Modal;
    }(_toggleable2.default);

    exports.default = Modal;
    module.exports = exports['default'];
  });
});