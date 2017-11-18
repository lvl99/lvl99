(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', '../common', 'uuid', './entity', '../utils/parse'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('../common'), require('uuid'), require('./entity'), require('../utils/parse'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.common, global.uuid, global.entity, global.parse);
    global.app = mod.exports;
  }
})(this, function (module, exports, _common, _uuid, _entity, _parse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _uuid2 = _interopRequireDefault(_uuid);

  var _entity2 = _interopRequireDefault(_entity);

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
   * Get a component's namespace
   *
   * @private
   * @param {Component} component
   * @returns {undefined|String|Component}
   */
  function getComponentNamespace(component) {
    var componentNS = component;

    // Function/class given
    if (typeof component === 'function') {
      if (component.NS) {
        componentNS = component.NS;
      } else {
        componentNS = component.prototype.constructor.name;
      }
    }

    return componentNS;
  }

  /**
   * The App's base properties
   *
   * @private
   * @type {Object}
   */
  var AppProperties = {
    /**
     * NAMESPACE
     * This is used for custom events and error reporting
     *
     * @type {String}
     */
    _NS: 'LVL99:App',

    /**
     * namespace
     * This is used for CSS classes
     *
     * @type {String}
     */
    _ns: 'lvl99-app',

    /**
     * The properties shared between all instances of this App
     *
     * @type {Object}
     */
    _properties: {},

    /**
     * The default attributes to load a created App instance with.
     *
     * @type {Object}
     */
    _attributes: {},

    /**
     * The library of components that the app has access to
     *
     * @type {Object}
     */
    _components: {},

    /**
     * The collection of components which have been instantiated within the app
     *
     * @type {Object}
     */
    _componentInstances: {}

    /**
     * App
     *
     * @class
     * @extends Entity
     */
  };
  var App = function (_Entity) {
    _inherits(App, _Entity);

    /**
     * App constructor
     *
     * @constructor
     * @param {Object} attributes
     */
    function App(attributes) {
      _classCallCheck(this, App);

      return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, attributes));
    }

    /**
     * Extend the App with any given {Object} arguments
     *
     * @param {Object} ...arguments
     */


    _createClass(App, [{
      key: 'extend',
      value: function extend() {
        var _get2;

        // @debug
        // console.log(`LVL99:App:extend`, {
        //   arguments
        // })

        // Merge the properties with the instantiated attributes
        (_get2 = _get(App.prototype.__proto__ || Object.getPrototypeOf(App.prototype), 'extend', this)).call.apply(_get2, [this, AppProperties].concat(Array.prototype.slice.call(arguments)));
      }
    }, {
      key: 'registerComponentClass',
      value: function registerComponentClass(componentClass, componentClassNamespace) {
        var componentClassNS = void 0;

        // No valid componentClass given
        if (!componentClass) {
          throw new Error('No component class was given');
        }

        // Get the namespace from the component class (or otherwise specified)
        componentClassNS = getComponentNamespace(componentClassNamespace || componentClass);

        // Register the component class
        if (componentClassNS) {
          this._components[componentClassNS] = componentClass;
        }
      }
    }, {
      key: 'deregisterComponentClass',
      value: function deregisterComponentClass(componentClassNamespace) {
        var componentClassNS = void 0;

        // No valid componentClass given
        if (!componentClassNamespace) {
          throw new Error('No component class namespace was given');
        }

        // Get the namespace
        componentClassNS = getComponentNamespace(componentClassNamespace);

        // Remove the component class
        if (componentClassNS && this._components.hasOwnProperty(componentClassNS)) {
          this._components[componentClassNS] = undefined;
          delete this._components[componentClassNS];
        }
      }
    }, {
      key: 'getComponentClass',
      value: function getComponentClass(componentClassNamespace) {
        var componentClassNS = componentClassNamespace;

        if (!componentClassNamespace) {
          throw new Error('No component class namespace was given');
        }

        // Get the component class
        if (componentClassNS && this._components.hasOwnProperty(componentClassNS)) {
          return this._components[componentClassNS];
        }

        return undefined;
      }
    }, {
      key: 'addComponentInstance',
      value: function addComponentInstance(componentInstance) {
        componentInstance._app = this;

        // Add component instance to collection
        this._componentInstances[componentInstance.uuid] = componentInstance;

        // Initialise the component
        componentInstance.init();
      }
    }, {
      key: 'createComponentInstance',
      value: function createComponentInstance(componentClassNamespace, attributes) {
        // @debug
        // console.log(`${this.NS}.createComponentInstance: ${componentClassNamespace}`)

        // Create and initialise the component
        if (this._components.hasOwnProperty(componentClassNamespace)) {
          var newComponent = new this._components[componentClassNamespace](attributes);

          // @debug
          // console.log(`${this.NS}.createComponentInstance`, {
          //   componentClassNamespace,
          //   newComponent,
          //   attributes
          // })

          // Add instance to app
          this.addComponentInstance(newComponent);

          return newComponent;
        }
      }
    }, {
      key: 'getComponentInstance',
      value: function getComponentInstance(componentUUID) {
        // @debug
        // console.log(`${this.NS}.getComponentInstance: ${componentUUID}`)

        if (this._componentInstances.hasOwnProperty(componentUUID)) {
          return this._componentInstances[componentUUID];
        }

        return undefined;
      }
    }, {
      key: 'removeComponentInstance',
      value: function removeComponentInstance(componentUUID) {
        // @debug
        // console.log(`${this.NS}.removeComponentInstance: ${componentUUID}`)

        var removeComponentInstance = this.getComponentInstance(componentUUID);
        if (typeof removeComponentInstance !== 'undefined') {
          // @debug
          // console.log(`${this.NS}.removeComponentInstance: found component instance to remove`, removeComponentInstance)

          removeComponentInstance.destroy();

          // @TODO the following should probably only happen after a Promise is resolved
          // Remove entry in the componentInstances object
          this._componentInstances[componentUUID] = undefined;
          delete this._componentInstances[componentUUID];
        }
      }
    }, {
      key: 'initialiseComponents',
      value: function initialiseComponents() {
        var _this2 = this;

        // Find any element marked with the `[data-component]` attribute
        (0, _common.$)('[data-component]')
        // Ignore components which already have an ID assigned
        .not('[data-component-id]')
        // Initialise each component
        .each(function (index, elem) {
          var $elem = (0, _common.$)(elem);
          var elemComponentClass = $elem.attr('data-component');
          var elemComponentOptions = $elem.attr('data-component-options') || {};

          // @debug
          // console.log(`${this._NS}.initialiseComponents: found element to initialise with component`, {
          //   index,
          //   elem,
          //   elemComponentClass,
          //   elemComponentOptions
          // })

          // Ensure component class is registered
          if (!_this2.getComponentClass(elemComponentClass)) {
            // @debug
            // console.error(`${this._NS}.initialiseComponents: element's component class not registered`, {
            //   app: this,
            //   index,
            //   elem,
            //   elemComponentClass,
            //   elemComponentOptions
            // })
            return;
          }

          // Extract/convert the options
          if (typeof elemComponentOptions === 'string') {
            // Set as JSON, e.g. '{"name":"value"}`
            if (/^\{/.test(elemComponentOptions)) {
              elemComponentOptions = (0, _parse.convertStringToJson)(elemComponentOptions);

              // Set as style-like attributes, e.g. `name: value; name: value`
            } else {
              elemComponentOptions = (0, _parse.extractClassDetails)(elemComponentOptions);
            }
          }

          // Add the $elem if it is not already set
          if (!elemComponentOptions.hasOwnProperty('$elem')) {
            elemComponentOptions.$elem = $elem;
          }

          // Create the component
          var elemComponentInstance = _this2.createComponentInstance(elemComponentClass, elemComponentOptions);

          // @debug
          // console.log('Initialised component instance', {
          //   index,
          //   elem,
          //   elemComponentOptions,
          //   elemComponentInstance
          // })
        });
      }
    }]);

    return App;
  }(_entity2.default);

  exports.default = App;
  module.exports = exports['default'];
});