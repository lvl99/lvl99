(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'lodash.merge', '../utils/parse'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('lodash.merge'), require('../utils/parse'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.lodash, global.parse);
    global.storage = mod.exports;
  }
})(this, function (exports) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['exports', 'lodash.merge', '../utils/parse'], factory);
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.lodash, global.parse);
      global.storage = mod.exports;
    }
  })(this, function (exports, _lodash, _parse) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.STORAGE_TYPES = exports.LOCAL_STORAGE = exports.SESSION_STORAGE = undefined;
    exports.testStorageType = testStorageType;
    exports.getSupportedStorageTypes = getSupportedStorageTypes;
    exports.eachStorageType = eachStorageType;

    var _lodash2 = _interopRequireDefault(_lodash);

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

    // Types of storage
    var SESSION_STORAGE = exports.SESSION_STORAGE = 'sessionStorage';
    var LOCAL_STORAGE = exports.LOCAL_STORAGE = 'localStorage';
    var STORAGE_TYPES = exports.STORAGE_TYPES = [SESSION_STORAGE, LOCAL_STORAGE];

    /**
     * Test to see if a storage type works within the environment
     *
     * @param {String} storageType
     * @return {Boolean}
     */
    function testStorageType(storageType) {
      try {
        var envStorage = window[storageType];
        var x = '__test__storage__';
        envStorage.setItem(x, storageType);
        envStorage.removeItem(x);
        return true;
      } catch (e) {
        return false;
      }
    }

    /**
     * Get the supported types of storage
     *
     * @returns {Object} with name of storage type as keys with {Boolean} value
     */
    function getSupportedStorageTypes() {
      var supports = {};

      // Build the object from the constant's values
      STORAGE_TYPES.forEach(function (storageType, index) {
        supports[storageType] = testStorageType(storageType);
      });

      return supports;
    }

    /**
     * Perform a callback on each supported (or not) storage type
     *
     * @param {Function} cb
     */
    function eachStorageType(cb) {
      var supported = getSupportedStorageTypes();

      for (var storageType in supported) {
        if (supported.hasOwnProperty(storageType)) {
          cb.apply(this, [storageType, supported[storageType], supported]);
        }
      }
    }

    /**
     * Storage class
     */

    var Storage = function () {
      /**
       * Create the storage class
       *
       * @param options
       */
      function Storage(options) {
        _classCallCheck(this, Storage);

        this.settings = (0, _lodash2.default)({
          // default to localStorage
          storageType: LOCAL_STORAGE
        }, options);

        return this;
      }

      /**
       * Reset a single storage type
       *
       * @param storageType
       */


      _createClass(Storage, [{
        key: 'clear',
        value: function clear(storageType) {
          // Use default storage type
          if (!storageType) {
            storageType = this.settings.storageType;
          }

          if (!testStorageType(storageType)) {
            throw new Error('Storage type ' + storageType + ' not supported');
          }

          window[storageType].clear();
        }
      }, {
        key: 'clearAll',
        value: function clearAll() {
          eachStorageType(function (storageType, isSupported) {
            if (isSupported) {
              window[storageType].clear();
            }
          });
        }
      }, {
        key: 'clearLocal',
        value: function clearLocal() {
          this.clear(LOCAL_STORAGE);
        }
      }, {
        key: 'clearSession',
        value: function clearSession() {
          this.clear(SESSION_STORAGE);
        }
      }, {
        key: 'getItem',
        value: function getItem(name, storageType) {
          // Use default storage type
          if (!storageType) {
            storageType = this.settings.storageType;
          }

          // Check if storage type is available
          if (!testStorageType(storageType)) {
            throw new Error('Storage type ' + storageType + ' not supported');
          }

          // Ensure value is coerced since storage stores as JSON/string
          return (0, _parse.coerceToPrimitiveType)(window[storageType].getItem(name));
        }
      }, {
        key: 'getItemLocal',
        value: function getItemLocal(name) {
          return this.getItem(name, LOCAL_STORAGE);
        }
      }, {
        key: 'getItemSession',
        value: function getItemSession(name) {
          return this.getItem(name, SESSION_STORAGE);
        }
      }, {
        key: 'setItem',
        value: function setItem(name, value, storageType) {
          // Use default storage type
          if (!storageType) {
            storageType = this.settings.storageType;
          }

          // Check if storage type is available
          if (!testStorageType(storageType)) {
            throw new Error('Storage type ' + storageType + ' not supported');
          }

          window[storageType].setItem(name, JSON.stringify(value));
        }
      }, {
        key: 'setItemLocal',
        value: function setItemLocal(name, value) {
          this.setItem(name, value, LOCAL_STORAGE);
        }
      }, {
        key: 'setItemSession',
        value: function setItemSession(name, value) {
          this.setItem(name, value, SESSION_STORAGE);
        }
      }, {
        key: 'removeItem',
        value: function removeItem(name, storageType) {
          // Use default storage type
          if (!storageType) {
            storageType = this.settings.storageType;
          }

          // Check if storage type is available
          if (!testStorageType(storageType)) {
            throw new Error('Storage type ' + storageType + ' not supported');
          }

          window[storageType].removeItem(name);
        }
      }, {
        key: 'removeItemLocal',
        value: function removeItemLocal(name) {
          this.removeItem(name, LOCAL_STORAGE);
        }
      }, {
        key: 'removeItemSession',
        value: function removeItemSession(name) {
          this.removeItem(name, SESSION_STORAGE);
        }
      }]);

      return Storage;
    }();

    exports.default = Storage;
  });
});