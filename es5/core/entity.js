(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports', 'lodash.merge', 'uuid', 'object-path', '../utils/inheritance'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash.merge'), require('uuid'), require('object-path'), require('../utils/inheritance'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.lodash, global.uuid, global.objectPath, global.inheritance);
    global.entity = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports', 'lodash.merge', 'uuid', 'object-path', '../utils/inheritance'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.lodash, global.uuid, global.objectPath, global.inheritance);
      global.entity = mod.exports;
    }
  })(this, function (module, exports, _lodash, _uuid, _objectPath, _inheritance) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _lodash2 = _interopRequireDefault(_lodash);

    var _uuid2 = _interopRequireDefault(_uuid);

    var _objectPath2 = _interopRequireDefault(_objectPath);

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

    /**
     * The Entity's base properties
     *
     * @type {Object}
     */
    var EntityProperties = {
      /**
       * NAMESPACE
       * This is used for custom events and error reporting
       *
       * @type {String}
       */
      _NS: 'LVL99:Entity',

      /**
       * namespace
       * This is used for CSS classes (only if the entity has an HTMLElement)
       *
       * @type {String}
       */
      _ns: 'lvl99-entity',

      /**
       * The properties shared between all instances of this Entity
       *
       * @type {Object}
       */
      _properties: {},

      /**
       * The default attributes to load a created Entity instance with.
       *
       * @type {Object}
       */
      _attributes: {}
    };

    var Entity = function () {
      /**
       * Entity constructor
       *
       * @constructor
       * @param {Object} attributes
       */
      function Entity(attributes) {
        _classCallCheck(this, Entity);

        // @debug
        // console.log('LVL99:Entity:constructor', {
        //   attributes
        // })

        this.extend({
          _attributes: attributes
        });

        // Expose private values
        (0, _inheritance.exposePrivateProperties)(this);

        // Create a unique ID for this Entity
        Object.defineProperty(this, 'uuid', {
          value: this.NS + ':' + _uuid2.default.v4(),
          writable: false,
          enumerable: true,
          configurable: false
        });
      }

      /**
       * Extend the Entity with any given {Object} arguments
       *
       * @returns {Self}
       */


      _createClass(Entity, [{
        key: 'extend',
        value: function extend() {
          // @debug
          // console.log('LVL99:Entity:extend', {
          //   args
          // })

          // Merge the properties with the instantiated attributes and concatenated public methods
          _lodash2.default.apply(undefined, [this, EntityProperties].concat(Array.prototype.slice.call(arguments)));

          return this;
        }
      }, {
        key: 'getProp',
        value: function getProp(propName) {
          if (!propName || typeof propName !== 'string') {
            throw new Error('[' + this.NS + '] get: \'propName\' value is invalid');
          }

          return _objectPath2.default.get(this.properties, propName);
        }
      }, {
        key: 'setProp',
        value: function setProp(propName, propValue) {
          if (!propName || typeof propName !== 'string') {
            throw new Error('[' + this.NS + '] set: \'propName\' value is invalid');
          }

          return _objectPath2.default.set(this.properties, propName, propValue);
        }
      }, {
        key: 'getAttr',
        value: function getAttr(attrName) {
          if (!attrName || typeof attrName !== 'string') {
            throw new Error('[' + this.NS + '] getAttr: \'attrName\' value is invalid');
          }

          return _objectPath2.default.get(this.attributes, attrName);
        }
      }, {
        key: 'setAttr',
        value: function setAttr(attrName, attrValue) {
          if (!attrName || typeof attrName !== 'string') {
            throw new Error('[' + this.NS + '] setAttr: \'attrName\' value is invalid');
          }

          return _objectPath2.default.set(this.attributes, attrName, attrValue);
        }
      }, {
        key: 'init',
        value: function init() {}
      }, {
        key: 'destroy',
        value: function destroy() {}
      }]);

      return Entity;
    }();

    exports.default = Entity;
    module.exports = exports['default'];
  });
});