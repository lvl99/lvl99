'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjectStorage = exports.STORAGE_TYPES = exports.LOCAL_STORAGE = exports.SESSION_STORAGE = exports.OBJECT_STORAGE = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LVL99 Storage
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Utilise modern browser features like localStorage and sessionStorage (if available within the environment)
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @package lvl99
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.testStorageType = testStorageType;
exports.getSupportedStorageTypes = getSupportedStorageTypes;
exports.eachStorageType = eachStorageType;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _parse = require('../utils/parse');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Types of storage
var OBJECT_STORAGE = exports.OBJECT_STORAGE = 'objectStorage';
var SESSION_STORAGE = exports.SESSION_STORAGE = 'sessionStorage';
var LOCAL_STORAGE = exports.LOCAL_STORAGE = 'localStorage';
var STORAGE_TYPES = exports.STORAGE_TYPES = [OBJECT_STORAGE, SESSION_STORAGE, LOCAL_STORAGE];

/**
 * Object Storage handler.
 *
 * This is a basic object-based fallback version of storage if local/session storage is not supported.
 *
 * It should work exactly the same as sessionStorage, however it is related only to the current window session --
 * data here is not persistent.
 *
 * @class
 */

var ObjectStorage = exports.ObjectStorage = function () {
  /**
   * Create the object storage instance.
   *
   * @constructor
   * @param {Object} data
   */
  function ObjectStorage() {
    var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ObjectStorage);

    this.data = data || {};
  }

  /**
   * Clear all items in object storage.
   *
   * @returns {Object}
   */


  _createClass(ObjectStorage, [{
    key: 'clear',
    value: function clear() {
      this.data = {};
    }

    /**
     * Get item in object storage.
     *
     * @param {String} name
     * @returns {*|null}
     */

  }, {
    key: 'getItem',
    value: function getItem(name) {
      if (this.data.hasOwnProperty(name)) {
        return this.data[name];
      }
      return null;
    }

    /**
     * Set item in object storage.
     *
     * @param {String} name
     * @param {*} value
     */

  }, {
    key: 'setItem',
    value: function setItem(name, value) {
      this.data[name] = value;
    }

    /**
     * Remove item in object storage.
     *
     * @param {String} name
     */

  }, {
    key: 'removeItem',
    value: function removeItem(name) {
      if (this.data.hasOwnProperty(name)) {
        this.data[name] = null;
        delete this.data[name];
      }
    }
  }]);

  return ObjectStorage;
}();

// Create the objectStorage instance in the window


window[OBJECT_STORAGE] = new ObjectStorage();

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

    // Test storageType to ensure it is supported. If not, default back to object storage
    if (this.settings.storageType !== OBJECT_STORAGE && !testStorageType(this.settings.storageType)) {
      this.settings.storageType = OBJECT_STORAGE;
    }

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

      // Throw error
      if (!testStorageType(storageType)) {
        throw new Error('Storage type ' + storageType + ' not supported');
      }

      window[storageType].clear();
    }

    /**
     * Reset all the data within all supported storage types
     */

  }, {
    key: 'clearAll',
    value: function clearAll() {
      eachStorageType(function (storageType, isSupported) {
        if (isSupported) {
          window[storageType].clear();
        }
      });
    }

    /**
     * Clear local storage
     */

  }, {
    key: 'clearLocal',
    value: function clearLocal() {
      this.clear(LOCAL_STORAGE);
    }

    /**
     * Clear session storage
     */

  }, {
    key: 'clearSession',
    value: function clearSession() {
      this.clear(SESSION_STORAGE);
    }

    /**
     * Get stored item's value by key from a specified storage type
     *
     * @param {String} name The name of the data to retrieve from storage
     * @param {String} storageType The name of the storage type to retrieve from
     * @returns {Mixed}
     * @throws {Error}
     */

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

    /**
     * Get stored item's value by key from local storage
     *
     * @param {String} name The name of the data to retrieve from storage
     * @returns {Mixed}
     */

  }, {
    key: 'getItemLocal',
    value: function getItemLocal(name) {
      return this.getItem(name, LOCAL_STORAGE);
    }

    /**
     * Get stored item's value by key from session storage
     *
     * @param {String} name The name of the item to retrieve from storage
     * @returns {Mixed}
     */

  }, {
    key: 'getItemSession',
    value: function getItemSession(name) {
      return this.getItem(name, SESSION_STORAGE);
    }

    /**
     * Set an item's value in a specified storage type
     *
     * @param {String} name The name of the item to set in storage
     * @param {Mixed} value
     * @param {String} storageType
     * @throws {Error}
     */

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

    /**
     * Set an item's value in the local storage
     *
     * @param {String} name The name of the item to set in local storage
     * @param {Mixed} value
     */

  }, {
    key: 'setItemLocal',
    value: function setItemLocal(name, value) {
      this.setItem(name, value, LOCAL_STORAGE);
    }

    /**
     * Set an item's value in the session storage
     *
     * @param {String} name The name of the item to set in session storage
     * @param {Mixed} value
     */

  }, {
    key: 'setItemSession',
    value: function setItemSession(name, value) {
      this.setItem(name, value, SESSION_STORAGE);
    }

    /**
     * Remove an item from the default storage type
     *
     * @param {String} name The name of the item to remove from the storage type
     * @param {String} storageType
     * @throws {Error}
     */

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

    /**
     * Remove an item from local storage type
     *
     * @param {String} name The name of the item to remove from local storage
     * @throws {Error}
     */

  }, {
    key: 'removeItemLocal',
    value: function removeItemLocal(name) {
      this.removeItem(name, LOCAL_STORAGE);
    }

    /**
     * Remove an item from session storage
     *
     * @param {String} name The name of the item to remove from session storage
     * @throws {Error}
     */

  }, {
    key: 'removeItemSession',
    value: function removeItemSession(name) {
      this.removeItem(name, SESSION_STORAGE);
    }
  }]);

  return Storage;
}();

exports.default = Storage;