(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash.merge', '../common', '../core/component'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash.merge'), require('../common'), require('../core/component'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.lodash, global.common, global.component);
    global.accordion = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', 'lodash.merge', '../common', '../core/component'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.lodash, global.common, global.component);
      global.accordion = mod.exports;
    }
  })(this, function (module, exports, _lodash, _common, _component) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

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

    var AccordionProperties = {
      // Namespaces
      _NS: 'LVL99:Accordion',
      _ns: 'lvl99-accordion',

      // Modal properties
      _properties: {
        // Public methods
        publicMethods: [],

        // The target DOM element which will hold the open/transition classes. If undefined it will revert to the `$elem` attribute value
        $classTarget: undefined
      },

      // Default Accordion attributes
      _attributes: {
        _a11y: true,
        _accordionClassItemActive: 'active',
        _accordionItemSelector: '.accordion-item',
        _accordionItemToggleSelector: '.accordion-item-toggle',
        _accordionItemContentSelector: '.accordion-item-content',
        _accordionCloseOthersOnOpen: true,
        _accordionItemToggleableAttributes: {
          _a11y: false,
          _toggleableUseTransitioning: false,
          _toggleableClassOpen: 'ui-accordion-item-open',
          _toggleableClassTransitioning: 'ui-accordion-item-transitioning ui-accordion-item-opening ui-accordion-item-closing',
          _toggleableClassTransitioningOpen: 'ui-accordion-item-opening ui-accordion-item-open',
          _toggleableClassTransitioningClose: 'ui-accordion-item-closing',
          _toggleableCloseOnBlur: false
        },
        $elem: undefined,
        $items: undefined,
        $activeItem: undefined
      }

      /**
       * LVL99.Accordion
       *
       * An {Accordion} manages the toggleable states of its children. Each child can be opened/closed, which may or may not
       * close the other children.
       *
       * @constructor
       * @extends {Component}
       */
    };
    var Accordion = function (_Component) {
      _inherits(Accordion, _Component);

      function Accordion(attributes) {
        _classCallCheck(this, Accordion);

        return _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, attributes));
      }

      _createClass(Accordion, [{
        key: 'extend',
        value: function extend() {
          var _get2;

          // @debug
          // console.log('LVL99:Accordion:extend')

          // Merge the properties with the instantiated attributes
          (_get2 = _get(Accordion.prototype.__proto__ || Object.getPrototypeOf(Accordion.prototype), 'extend', this)).call.apply(_get2, [this, AccordionProperties].concat(Array.prototype.slice.call(arguments)));
        }
      }, {
        key: 'init',
        value: function init() {
          var _this2 = this;

          // @debug
          // console.log('LVL99:Accordion:init', this.NS, this)

          // No element found? Error
          if (!this.getElem() || !this.getElem().length) {
            throw new Error(this.NS + ':init: elem is missing');
          }

          // Turn children into {ToggleableComponent}s (if not already {ToggleableComponent}s)
          if (!this.getAttr('$items') || !this.getAttr('$items').length) {
            var $items = this.getElem().find(this.getAttr('_accordionItemSelector'));
            this.setAttr('$items', $items);

            // @debug
            // console.log(`${this.NS}:init`, {
            //   component: this,
            //   $items: this.getAttr('$items')
            // })

            // No items!
            if (!this.getAttr('$items').length) {
              console.warn('[' + this.NS + ':init] Warning: no $items were found to assign to this Accordion');
            } else {
              // Turn child into {ToggleableComponent} using the app's `createComponentInstance` method
              $items.each(function (i, item) {
                var $item = (0, _common.$)(item);

                // If already set as active item, ensure it is set correctly
                if ($item.is('.' + _this2.getAttr('_accordionClassItemActive'))) {
                  _this2.setActiveItem($item);
                }

                // Setup for a11y
                if (_this2.getAttr('_a11y')) {
                  var $itemToggle = $item.find(_this2.getAttr('_accordionItemToggleSelector'));
                  var $itemContent = $item.find(_this2.getAttr('_accordionItemContentSelector'));

                  // Ensure the toggle is tabbable and is a button
                  $itemToggle.attr('tabindex', $itemToggle.attr('tabindex') || 1);
                  $itemToggle.attr('role', 'button');
                }

                // Create the component instance, or reference the component instance
                var accordionToggleableItem = void 0;
                if (!$item.attr('data-component-id')) {
                  accordionToggleableItem = _this2._app.createComponentInstance('LVL99:ToggleableComponent', (0, _lodash2.default)({
                    // Regular {ToggleableComponent} attributes
                    $classTarget: $item,
                    $elem: $item
                  }, _this2.getAttr('_accordionItemToggleableAttributes')));
                } else {
                  accordionToggleableItem = _this2._app.getComponentInstance($item.attr('data-component-id'));
                }

                // Set special _controllers reference since this item was dynamically instantiated within another component
                accordionToggleableItem.extend({
                  _controllers: {
                    accordion: {
                      $elem: _this2.getElem(),
                      controller: _this2
                    }
                  }
                });
              });
            }
          }

          // Special a11y enhancements
          if (this.getAttr('a11y')) {
            this.getElem().on('focus', this.getAttr('_accordionItemSelector') + ' ' + this.getAttr('_accordionItemToggleSelector'), function (jQueryEvent) {
              var $item = (0, _common.$)(jQueryEvent.target).closest(_this2.getAttr('_accordionItemSelector'));
              $item.trigger('LVL99:ToggleableComponent:open');
            });
          }

          // Attach eventListener to elem to hide other children when {ToggleableComponent} child is opened
          if (this.getAttr('_accordionCloseOthersOnOpen')) {
            this.getElem().on('LVL99:ToggleableComponent:open', this.getAttr('_accordionItemSelector'), function (jQueryEvent) {
              var $item = (0, _common.$)(jQueryEvent.target).closest(_this2.getAttr('_accordionItemSelector'));
              if (!$item.is('.' + _this2.getAttr('_accordionClassItemActive'))) {
                var $otherItems = _this2.getAttr('$items').not($item);
                jQueryEvent.preventDefault();
                jQueryEvent.stopPropagation();
                $otherItems.trigger('LVL99:ToggleableComponent:close');
                _this2.unsetActiveItem($otherItems);
              }
            });
          }

          // Trigger ToggleableComponent:open when the item's toggle is interacted with
          this.getElem().on(_common.events.inputstart, this.getAttr('_accordionItemSelector') + ' ' + this.getAttr('_accordionItemToggleSelector'), function (jQueryEvent) {
            var $item = (0, _common.$)(jQueryEvent.target).closest(_this2.getAttr('_accordionItemSelector'));
            jQueryEvent.preventDefault();
            $item.trigger('LVL99:ToggleableComponent:open');
            _this2.setActiveItem($item);
          });

          _get(Accordion.prototype.__proto__ || Object.getPrototypeOf(Accordion.prototype), 'init', this).apply(this, arguments);
        }
      }, {
        key: 'setActiveItem',
        value: function setActiveItem(item) {
          var $item = (0, _common.$)(item);

          // Add to $activeItem
          if ($item.is('.' + this.getAttr('_accordionClassItemActive')) || this.getAttr('$activeItem') && this.getAttr('$activeItem').find($item).length) {
            // Empty or unset
            if (!this.getAttr('$activeItem')) {
              this.setAttr('$activeItem', $item);
            } else {
              this.setAttr('$activeItem', this.getAttr('$activeItem').add($item));
            }
          }

          // Add the active class
          $item.addClass(this.getAttr('_accordionClassItemActive'));
        }
      }, {
        key: 'unsetActiveItem',
        value: function unsetActiveItem(item) {
          var $item = (0, _common.$)(item);

          // Currently active
          if ($item.is('.' + this.getAttr('_accordionClassItemActive')) || this.getAttr('$activeItem') && this.getAttr('$activeItem').find($item).length) {
            // Empty or unset
            if (this.getAttr('$activeItem') && this.getAttr('$activeItem').length && this.getAttr('$activeItem').find($item).length) {
              this.setAttr('$activeItem', this.getAttr('$activeItem').not($item));
            }
          }

          // Remove the active class
          $item.removeClass(this.getAttr('_accordionClassItemActive'));
        }
      }]);

      return Accordion;
    }(_component2.default);

    exports.default = Accordion;
    module.exports = exports['default'];
  });
});