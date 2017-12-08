/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 21);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (typeof key == 'number' && value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  if (!(isArray(source) || isTypedArray(source))) {
    var props = baseKeysIn(source);
  }
  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  });
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    newValue = srcValue;
    if (isArray(srcValue) || isTypedArray(srcValue)) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
      else {
        newValue = objValue;
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = merge;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11), __webpack_require__(22)(module)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('object-path'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.objectPath);
    global.parse = mod.exports;
  }
})(this, function (exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(2)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.objectPath);
      global.parse = mod.exports;
    }
  })(this, function (exports, _objectPath) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.coerceToPrimitiveType = coerceToPrimitiveType;
    exports.convertToBoolean = convertToBoolean;
    exports.convertStringToJson = convertStringToJson;
    exports.convertStringToFloat = convertStringToFloat;
    exports.extractClassDetails = extractClassDetails;
    exports.extractTriggerDetails = extractTriggerDetails;
    exports.fixedEncodeURIComponent = fixedEncodeURIComponent;
    exports.getTargetBySelector = getTargetBySelector;
    exports.getTargetSelector = getTargetSelector;
    exports.extractTargetEventNames = extractTargetEventNames;

    var _objectPath2 = _interopRequireDefault(_objectPath);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    var __loggerPath = 'lvl99/utils/parse';

    /**
     * Coerce a value to its primitive type
     *
     * @param {Mixed} input
     * @returns {Mixed}
     */
    function coerceToPrimitiveType(input) {
      // Non-string? Just return it straight away
      if (typeof input !== 'string') return input;

      // Trim any whitespace
      input = (input + '').trim();

      // Number
      if (/^\-?(?:\d*[\.\,])*\d*(?:[eE](?:\-?\d+)?)?$/.test(input)) {
        return parseFloat(input);

        // Boolean: true
      } else if (/^(true|1)$/.test(input)) {
        return true;

        // NaN
      } else if (/^NaN$/.test(input)) {
        return NaN;

        // undefined
      } else if (/^undefined$/.test(input)) {
        return undefined;

        // null
      } else if (/^null$/.test(input)) {
        return null;

        // Boolean: false
      } else if (/^(false|0)$/.test(input) || input === '') {
        return false;

        // JSON: starts with [ or { and ends with ] or }
      } else if (/^[\[\{]/.test(input) && /[\]\}]$/.test(input)) {
        return convertStringToJson(input);

        // String marked with single/double quotation marks
      } else if (/^['"]|["']$/) {
        return input.replace(/^['"]|['"]$/g, '');
      }

      // Default to string
      return input;
    }

    /**
     * Convert value to an explicit boolean. Namely for processing string values.
     *
     * @param {Mixed} input
     * @returns {Boolean}
     */
    function convertToBoolean(input) {
      // Already boolean
      if (input === true || input === false) {
        return input;
      }

      // Cases of truthy/falsey values
      switch (input) {
        case 1:
        case '1':
        case 'true':
          return true;

        case 0:
        case '0':
        case 'false':
        case undefined:
        case 'undefined':
        case null:
        case 'null':
        case NaN:
        case 'NaN':
        case '':
          return false;
      }

      // Otherwise...
      return !!input;
    }

    /**
     * Convert a string to JSON or just return the string if can't
     *
     * @param {String} input
     * @returns {Object}
     */
    function convertStringToJson(input) {
      var output = input;

      // Convert string data to JSON
      if (typeof input === 'string') {
        try {
          output = JSON.parse(input);
        } catch (e) {
          console.error(_loggerPath + '.convertStringToJson: Error parsing string JSON data', input);
        }
      }

      return output;
    }

    /**
     * Convert a string to a float.
     * This also converts number constants like Infinity and NaN to zero.
     *
     * @param input
     * @returns {*}
     */
    function convertStringToFloat(input) {
      if (typeof input === 'number') {
        return input;
      }

      var output = parseFloat((input + '').replace(/[^\d\-\.]+/g, ''));

      // Infinity / NaN
      if (!isFinite(input) || isNaN(input) || isNaN(output)) {
        output = 0;
      }

      return output;
    }

    /**
     * Extract key-values from a string which is like a CSS class declaration, e.g. `key: value; key: value`
     *
     * This is slightly more interesting as it can take a name with dots
     *
     * @param {String} input
     * @return {Object}
     */
    function extractClassDetails(input) {
      var output = {};
      var inputParts = [input];

      // Check if it has semi-colons
      if (/;/.test(input)) {
        inputParts = input.split(';');
      }

      // Process each input part
      inputParts.forEach(function (part) {
        part = part.trim();
        if (part) {
          var partParts = part.match(/([a-z0-9_.-]+):([^;]+);?/i);
          var partName = partParts[1].trim();
          var partValue = coerceToPrimitiveType(partParts[2].trim());

          // @debug
          // console.log('parsed part', {
          //   part,
          //   partName,
          //   partValue,
          // })

          // Ensure output object exists if using dot notation
          if (/\./.test(partName)) {
            var objParts = partName.split('.');
            var objPartPath = '';

            // @debug
            // console.log('part has dot notation', {
            //   output,
            //   partName,
            //   partValue,
            //   objParts,
            //   objPartPath
            // })

            for (var objPartIndex = 0; objPartIndex < objParts.length - 1; objPartIndex++) {
              objPartPath += (objPartIndex > 0 ? '.' : '') + objParts[objPartIndex];

              // @debug
              // console.log(objPartPath)

              if (!_objectPath2.default.has(output, objPartPath)) {
                // @debug
                // console.log('setting object part path', {
                //   output,
                //   partName,
                //   partValue,
                //   objPartIndex,
                //   objPartPath
                // })

                _objectPath2.default.set(output, objPartPath, {});
              }
            }
          }

          // Set via objectPath
          _objectPath2.default.set(output, partName, partValue);
        }
      });

      return output;
    }

    /**
     * Extract the trigger's target details
     *
     * This allows you to extract the necessary data from the string and the global window/document available, to create
     * dynamic event bindings.
     *
     * @param {String|Object} input
     * @param {Object|Function} context Defaults to `window`. Where to find the `do` action
     * @returns {Object} => { eventName: {String}, method: {Function}, selector: {String}, target: {Object} }
     */
    function extractTriggerDetails(input, context) {
      var trigger = input;

      if (!context) {
        context = window;
      }

      // String input given
      if (typeof input === 'string') {
        // Try JSON first
        if (/^{/.test(input)) {
          trigger = convertStringToJson(input);

          // Try class details
        } else if (/^[a-z0-9_-]+:/.test(input)) {
          trigger = extractClassDetails(input);

          // String with no spaces
        } else if (!/ /.test(input)) {
          trigger = {
            do: input
          };
        }
      }

      // No object found!
      if ((typeof trigger === 'undefined' ? 'undefined' : _typeof(trigger)) !== 'object') {
        throw new Error(_loggerPath + '.extractTriggerDetails: input was not valid JSON or CSS-style definition');
      }

      // Ensure it has `on` and `do` properties
      // if (!objectPath.has(trigger, 'on')) {
      //   throw new Error(`${_loggerPath}.extractTriggerDetails: trigger is missing required 'on' property`)
      // }
      if (!_objectPath2.default.has(trigger, 'do')) {
        throw new Error(_loggerPath + '.extractTriggerDetails: trigger is missing required \'do\' property');
      }

      // If target is set, use real values for window and document
      if (_objectPath2.default.has(trigger, 'target')) {
        switch (trigger.target) {
          case 'self':
            // console.log('Targeting self', context)
            trigger.target = context;
            break;

          case 'document':
            trigger.target = document;
            break;

          case 'window':
            trigger.target = window;
            break;
        }
      }

      // Do same as above if a context was set!
      if (_objectPath2.default.has(trigger, 'context')) {
        switch (trigger.context) {
          case 'document':
            trigger.context = document;
            break;

          case 'window':
            trigger.context = window;
            break;
        }
      } else {
        trigger.context = context;
      }

      return trigger;
    }

    /**
     * Encode string to URL, with spaces that are represented as `+`
     * See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
     *
     * @param {String} input
     * @returns {String}
     */
    function fixedEncodeURIComponent(input) {
      return encodeURIComponent(input).replace(/[!'()*]/g, function (c) {
        return '%' + c.charCodeAt(0).toString(16);
      });
    }

    /**
     * Get the target object by a string selector
     *
     * @param {String} target
     * @param {Object} context
     * @return {Object}
     */
    function getTargetBySelector(target, context) {
      // Default to document
      if (!target) {
        target = document;
      }

      if (typeof target === 'string') {
        // Special string values to get the actual object
        switch (target) {
          case 'document':
            target = document;
            break;

          case 'window':
            target = window;
            break;

          case 'self':
            target = context;
            break;
        }
      }

      return target;
    }

    /**
     * Get the target object's string selector
     *
     * @param {Object} target
     * @param {Object} context
     * @return {undefined|String}
     */
    function getTargetSelector(target, context) {
      if (typeof target === 'string') {
        return target;
      }

      // Window
      if (jquery.isWindow(target)) {
        return 'window';

        // Document
      } else if (target === document) {
        return 'document';

        // Self
      } else if (target.hasOwnProperty('uuid')) {
        return '[data-component-id="' + target.uuid + '"]';

        // HTML Elem
      } else if (jquery(target).length) {
        if (jquery(target).attr('data-component-id')) {
          return '[data-component-id="' + jquery(target).attr('data-component-id') + '"]';
        } else if (jquery(target).attr('id')) {
          return '#' + jquery(target).attr('id');
        } else {
          return '' + target.tagName.toLowerCase();
        }
      }

      return target;
    }

    /**
     * Parse the target event names
     *
     * @param {Array|String} eventNames e.g. `Component:customEvent dom:mouseover`
     * @param {String} namespace Optional namespace to assign each extracted custom (non-DOM) event name
     * @returns {Array}
     */
    function extractTargetEventNames(inputEventNames, namespace) {
      var targetEventNames = [];
      var eventNames = inputEventNames;

      if (typeof inputEventNames === 'string') {
        // Split eventNames by spaces
        if (/\s/.test(inputEventNames)) {
          eventNames = inputEventNames.split(/\s+/);
        } else {
          eventNames = [inputEventNames];
        }
      }

      if (eventNames instanceof Array) {
        // Process each event name
        eventNames.forEach(function (eventName) {
          // Default to namespaced event name
          var targetEventName = typeof namespace === 'string' && namespace !== '' ? namespace + ':' + eventName : eventName;

          // Remove any reference to the native DOM event namespace
          if (/^dom:/i.test(eventName)) {
            targetEventName = eventName.replace(/^dom\:/gi, '', eventName);
          }

          // Add to the list
          targetEventNames.push(targetEventName);
        });

        return targetEventNames;
      }

      return false;
    }

    var parse = {
      coerceToPrimitiveType: coerceToPrimitiveType,
      convertToBoolean: convertToBoolean,
      convertStringToJson: convertStringToJson,
      convertStringToFloat: convertStringToFloat,
      extractClassDetails: extractClassDetails,
      extractTriggerDetails: extractTriggerDetails,
      fixedEncodeURIComponent: fixedEncodeURIComponent,
      getTargetBySelector: getTargetBySelector,
      getTargetSelector: getTargetSelector,
      extractTargetEventNames: extractTargetEventNames
    };

    exports.default = parse;
  });
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (true) {
    // AMD. Register as an anonymous module.
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var toStr = Object.prototype.toString;
  function hasOwnProperty(obj, prop) {
    if(obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    } else if (typeof value !== 'string') {
        for (var i in value) {
            if (hasOwnProperty(value, i)) {
                return false;
            }
        }
        return true;
    }
    return false;
  }

  function toString(type){
    return toStr.call(type);
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  var isArray = Array.isArray || function(obj){
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function factory(options) {
    options = options || {}

    var objectPath = function(obj) {
      return Object.keys(objectPath).reduce(function(proxy, prop) {
        if(prop === 'create') {
          return proxy;
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj);
        }

        return proxy;
      }, {});
    };

    function hasShallowProperty(obj, prop) {
      return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
    }

    function getShallowProperty(obj, prop) {
      if (hasShallowProperty(obj, prop)) {
        return obj[prop];
      }
    }

    function set(obj, path, value, doNotReplace){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }
      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path];
      } else if (typeof path === 'string') {
        path = path.split('.');
      }

      if (!path || path.length === 0) {
        return !!obj;
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i]);

        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j];
        } else {
          return false;
        }
      }

      return true;
    };

    objectPath.ensureExists = function (obj, path, value){
      return set(obj, path, value, true);
    };

    objectPath.set = function (obj, path, value, doNotReplace){
      return set(obj, path, value, doNotReplace);
    };

    objectPath.insert = function (obj, path, value, at){
      var arr = objectPath.get(obj, path);
      at = ~~at;
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }
      arr.splice(at, 0, value);
    };

    objectPath.empty = function(obj, path) {
      if (isEmpty(path)) {
        return void 0;
      }
      if (obj == null) {
        return void 0;
      }

      var value, i;
      if (!(value = objectPath.get(obj, path))) {
        return void 0;
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '');
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false);
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0);
      } else if (isArray(value)) {
        value.length = 0;
      } else if (isObject(value)) {
        for (i in value) {
          if (hasShallowProperty(value, i)) {
            delete value[i];
          }
        }
      } else {
        return objectPath.set(obj, path, null);
      }
    };

    objectPath.push = function (obj, path /*, values */){
      var arr = objectPath.get(obj, path);
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    };

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value;

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value;
        }
      }

      return defaultValue;
    };

    objectPath.get = function (obj, path, defaultValue){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (obj == null) {
        return defaultValue;
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue);
      }

      var currentPath = getKey(path[0]);
      var nextObj = getShallowProperty(obj, currentPath)
      if (nextObj === void 0) {
        return defaultValue;
      }

      if (path.length === 1) {
        return nextObj;
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
    };

    objectPath.del = function del(obj, path) {
      if (typeof path === 'number') {
        path = [path];
      }

      if (obj == null) {
        return obj;
      }

      if (isEmpty(path)) {
        return obj;
      }
      if(typeof path === 'string') {
        return objectPath.del(obj, path.split('.'));
      }

      var currentPath = getKey(path[0]);
      if (!hasShallowProperty(obj, currentPath)) {
        return obj;
      }

      if(path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      } else {
        return objectPath.del(obj[currentPath], path.slice(1));
      }

      return obj;
    }

    return objectPath;
  }

  var mod = factory();
  mod.create = factory;
  mod.withInheritedProps = factory({includeInheritedProps: true})
  return mod;
});


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(16)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jquery);
    global.common = mod.exports;
  }
})(this, function (exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(16)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.jquery);
      global.common = mod.exports;
    }
  })(this, function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.events = exports.$body = exports.$html = exports.$win = exports.$doc = exports.$ = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var $ = exports.$ = _jquery2.default;

    /**
     * Basic shorthand props to cache/reference common jQuery objects
     */
    /**
     * LVL99 Common
     *
     * Common dependencies and other useful things
     *
     * @package lvl99
     */

    var $doc = exports.$doc = $(document);
    var $win = exports.$win = $(window);
    var $html = exports.$html = $('html');
    var $body = exports.$body = $('body');

    /**
     * Event name shorthands
     */
    var events = exports.events = {
      click: 'click touchend',
      inputstart: 'mousedown touchstart keydown',
      inputend: 'mouseup touchend keyup',
      animationrun: 'animationrun webkitAnimationRun webkitanimationrun mozAnimationRun MSAnimationRun oAnimationRun oanimationrun',
      animationstart: 'animationstart webkitAnimationStart webkitanimationstart mozAnimationStart MSAnimationStart oAnimationStart oanimationstart',
      animationend: 'animationend webkitAnimationEnd webkitanimationend mozAnimationEnd MSAnimationEnd oAnimationEnd oanimationend',
      transitionrun: 'transitionrun webkitTransitionRun webkittransitionrun mozTransitionRun MSTransitionRun oTransitionRun otransitionrun',
      transitionstart: 'transitionstart webkitTransitionStart webkittransitionstart mozTransitionStart MSTransitionStart oTransitionStart otransitionstart',
      transitionend: 'transitionend webkitTransitionEnd webkittransitionend mozTransitionEnd MSTransitionEnd oTransitionEnd otransitionend'
    };

    var utils = {
      $: $,
      $doc: $doc,
      $win: $win,
      $html: $html,
      $body: $body,
      events: events
    };

    exports.default = utils;
  });
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(6), __webpack_require__(2), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0), __webpack_require__(6), __webpack_require__(2), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.inheritance = mod.exports;
  }
})(this, function (exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.inheritance = mod.exports;
    }
  })(this, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.exposeAllProperties = exposeAllProperties;
    exports.exposePrivateProperties = exposePrivateProperties;
    exports.createPublicGetProperty = createPublicGetProperty;
    exports.createPublicGetSetProperty = createPublicGetSetProperty;
    /**
     * LVL99 Inheritance utilities
     */

    var RE_PRIVATE = /^_/;

    /**
     * Assign public getter/setter properties to the target. This will reference the target property (if it is set)
     * otherwise use the default property value. You can also whitelist the properties you want to selectively
     * expose by name.
     *
     * @param {Object|Function} target
     * @param {Object} defaultPropValues
     * @param {Array} whitelist
     */
    function exposeAllProperties(target, defaultPropValues, whitelist) {
      var properties = void 0;

      if (!target) {
        throw new Error('No target was given');
      }

      // Filter non-whitelisted properties
      properties = Object.keys(target).filter(function (item) {
        return whitelist && whitelist.includes(item) || !whitelist;
      });

      // @debug
      // console.log('filtered properties', properties)

      if (!properties || !properties.length) {
        throw new Error('No properties were given');
      }

      // Default prop values to target
      if (typeof defaultPropValues === 'undefined') {
        defaultPropValues = target;
      }

      // Process and expose the properties on the target
      properties.forEach(function (propName) {
        var usePropName = propName;

        // Private values can only have a public getter
        if (RE_PRIVATE.test(propName)) {
          usePropName = propName.replace(RE_PRIVATE, '');

          // @debug
          // console.log('Found private property', {
          //   propName,
          //   usePropName,
          //   propValue: defaultPropValues[propName],
          //   target
          // })

          // Hide original private value
          // Object.defineProperty(target, propName, {
          //   enumerable: false
          // })

          // Create public interface
          createPublicGetProperty(target, propName, usePropName, defaultPropValues[propName]);
        } else {
          // @debug
          // console.log('Found public property', {
          //   propName,
          //   usePropName,
          //   propValue: properties[propName],
          //   target
          // })

          // Create public interface
          createPublicGetSetProperty(target, propName, usePropName, defaultPropValues[propName]);
        }
      });
    }

    /**
     * Expose only the private properties listed on the target with public getter property. Whitelist only those you want
     * by adding the property's name to the whitelist {Array}
     *
     * @param {Object|Function} target
     * @param {Boolean|Object|Function} defaultPropValues
     * @param {Array} whitelist
     */
    function exposePrivateProperties(target) {
      var defaultPropValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var whitelist = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

      var properties = void 0;

      // Target is always required
      if (!target) {
        throw new Error('No target was given');
      }

      // Filter non-private or non-whitelisted properties
      properties = Object.keys(target).filter(function (item) {
        if (whitelist && whitelist.includes(item) || !whitelist || !whitelist.length) {
          return RE_PRIVATE.test(item);
        }
        return false;
      });

      // @debug
      // console.log('filtered properties', properties)

      // Silent death
      if (!properties.length) {
        return;
      }

      // If default prop values not set, just use target properties
      if (!defaultPropValues || defaultPropValues === undefined) {
        defaultPropValues = target;
      }

      // Process and expose the properties on the target
      properties.forEach(function (propName) {
        var usePropName = propName;

        // Create a public handle for the private property (removes the "_" at the start)
        usePropName = propName.replace(RE_PRIVATE, '');

        // Create public interface
        createPublicGetProperty(target, propName, usePropName, defaultPropValues[propName]);
      });
    }

    /**
     * Create a public getter interface for a property on a target
     *
     * @param {Object|Function} target
     * @param {String} targetPropName
     * @param {String} newPropName
     * @param {Mixed} defaultPropValue Used if the target's targetPropName is undefined
     */
    function createPublicGetProperty(target, targetPropName, newPropName, defaultPropValue) {
      if (!target.hasOwnProperty(newPropName)) {
        Object.defineProperty(target, newPropName, {
          get: function get() {
            return typeof target[targetPropName] !== 'undefined' ? target[targetPropName] : defaultPropValue;
          },

          set: undefined,
          enumerable: true
        });
      }
    }

    /**
     * Create a public getter/setter interface for a property on a target
     *
     * @param {Object|Function} target
     * @param {String} targetPropName
     * @param {String} newPropName
     * @param {Mixed} defaultPropValue Used if the target's targetPropName is undefined
     */
    function createPublicGetSetProperty(target, targetPropName, newPropName, defaultPropValue) {
      if (!target.hasOwnProperty(newPropName)) {
        Object.defineProperty(target, newPropName, {
          get: function get() {
            return typeof target[targetPropName] !== 'undefined' ? target[targetPropName] : defaultPropValue;
          },
          set: function set(newValue) {
            target[targetPropName] = newValue;
          },

          enumerable: true
        });
      }
    }

    var inheritance = {
      exposeAllProperties: exposeAllProperties,
      exposePrivateProperties: exposePrivateProperties,
      createPublicGetProperty: createPublicGetProperty,
      createPublicGetSetProperty: createPublicGetSetProperty
    };

    exports.default = inheritance;
  });
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(23);
var v4 = __webpack_require__(24);

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(13), __webpack_require__(12), __webpack_require__(10), __webpack_require__(9), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./breakpoints'), require('./debug'), require('./queue'), require('./trackevent'), require('./smooth-scroll'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.breakpoints, global.debug, global.queue, global.trackevent, global.smoothScroll);
    global.index = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(13), __webpack_require__(12), __webpack_require__(10), __webpack_require__(9), __webpack_require__(8)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.breakpoints, global.debug, global.queue, global.trackevent, global.smoothScroll);
      global.index = mod.exports;
    }
  })(this, function (module, exports, _breakpoints, _debug, _queue, _trackevent, _smoothScroll) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _breakpoints2 = _interopRequireDefault(_breakpoints);

    var _debug2 = _interopRequireDefault(_debug);

    var _queue2 = _interopRequireDefault(_queue);

    var _trackevent2 = _interopRequireDefault(_trackevent);

    var _smoothScroll2 = _interopRequireDefault(_smoothScroll);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var utils = {
      Breakpoints: _breakpoints2.default,
      Debug: _debug2.default,
      Queue: _queue2.default,
      TrackEvent: _trackevent2.default,
      SmoothScroll: _smoothScroll2.default
    }; /**
        * LVL99 Tools
        *
        * Standalone tools that don't require any dependencies within the framework, but work alongside
        */

    exports.default = tools;
    module.exports = exports['default'];
  });
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.smoothScroll = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports);
      global.smoothScroll = mod.exports;
    }
  })(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = SmoothScroll;
    /**
     * LVL99 Smooth Scroll
     *
     * Smoothly scroll to internal anchor links on a page.
     *
     * ## Usage
     *
     * Smooth Scroll needs to be instantiated with jQuery and any configured options before using.
     *
     * ```
     *   let SmoothScroll = require('lvl99/es6/tools/smooth-scroll')(jQuery, { bufferTop: 0 })
     * ```
     *
     * You can also initialise the SmoothScroll behaviours by calling `SmoothScroll.init()`. This will attach the necessary
     * events on to anchor links.
     *
     * You can trigger the scrollTo event by using the custom event `SmoothScroll.scrollTo`, e.g.:
     *
     * ```
     *   $(document).trigger('SmoothScroll.scrollTo', [ scrollToOptions ])
     * ```
     *
     * The `scrollTo` function emits a custom event `SmoothScroll.scrollTo:start` when the action is invoked and
     * `SmoothScroll.scrollTo:end` when it finishes.
     *
     * @package lvl99
     */

    function SmoothScroll($, options) {
      /**
       * Load in the settings
       */
      var settings = $.extend({
        // The parent selector which will be scrolled. By default this is `html, body`
        parent: 'html, body',

        // The space between the top of the window and the top of the target
        bufferTop: 0,

        // The speed to scroll the window
        scrollSpeed: 1000,

        // The distance from top of window to top of target element to trigger scrolling
        triggerDistance: 200
      }, options);

      /**
       * Get any scrollable parents and ensure they scroll too
       *
       * @TODO needs testing!
       */
      function getScrollableParents(target) {
        var $target = $(target);
        var scrollable = [];

        console.log('[SmoothScroll] getScrollableParents', target);

        $target.parents().each(function getEachScrollableParent(elem) {
          var $elem = $(elem);
          var isVisibleAreaScrolled = elem.scrollHeight !== elem.scrollTop;
          var isOverflowScrollable = $elem.css('overflow') === 'auto' || $elem.css('overflow') === 'scroll' || $elem.css('overflow-y') === 'auto' || $elem.css('overflow-y') === 'scroll';

          // @debug
          console.log('[SmoothScroll] getScrollableParents', {
            elem: elem,
            scrollHeight: elem.scrollHeight,
            scrollTop: elem.scrollTop,
            isVisibleAreaScrolled: isVisibleAreaScrolled,
            isOverflowScrollable: isOverflowScrollable
          });

          if (isVisibleAreaScrolled && isOverflowScrollable) {
            scrollable.push(elem);
          }
        });

        return scrollable;
      }

      /**
       * Smoothly scroll to a target
       *
       * @param {String|HTMLElement|jQueryObject} target
       */
      function scrollTo(target, scrollToOptions) {
        // Figure out element to scroll to
        var $target = $(target).not('[data-disable-smooth-scroll]');

        // More than one target, default to first
        $target = $target.length > 1 ? $target.eq(0) : $target;

        // @debug
        var scrollableParents = getScrollableParents($target);

        // Does a scroll target exist?
        if ($target.length === 1) {
          // Load in per-use settings
          var scrollToSettings = $.extend({}, settings, scrollToOptions);

          // The parent is the element(s) which will be scrolled to show the target in place
          var $parent = $(scrollToSettings.parent);

          // Get the target's top offset
          var targetOffsetTop = $target.offset().top;

          // Get parent scrollTop (default to window)
          var parentScrollTop = $(window).scrollTop();
          if (!$parent.is('html') && !$parent.is('body')) {
            parentScrollTop = $parent.first().scrollTop();
          }

          // Support dynamic bufferTop if it is a function
          var scrollTop = targetOffsetTop - (typeof scrollToSettings.bufferTop === 'function' ? scrollToSettings.bufferTop() : scrollToSettings.bufferTop);

          // Don't trigger the scroll if the distance is within
          var checkTriggerDistance = Math.abs(parentScrollTop - scrollTop);
          if (checkTriggerDistance < scrollToSettings.triggerDistance) {
            return;
          }

          /**
           * Emit start event
           *
           * @event SmoothScroll.scrollTo:start
           * @param {jQueryObject} $target
           * @param {Object}
           */
          $target.trigger('SmoothScroll.scrollTo:start', [scrollToSettings]);

          // Do the scroll thing
          $parent.animate({
            scrollTop: scrollTop
          }, scrollToSettings.scrollSpeed, function () {
            // Callback after animation
            // Must change focus!
            $target.focus();

            /**
             * Emit end event
             *
             * @event SmoothScroll.scrollTo:end
             * @param {jQueryObject} $target
             * @param {Object}
             */
            $target.trigger('SmoothScroll.scrollTo:end', [scrollToSettings]);

            // Checking if the target was focused
            if ($target.is(':focus')) {
              return false;
            }
          });
        }
      }

      /**
       * Initialise all links on the page with the smoothScroll functionality
       */
      function init() {
        // Attach link behaviours
        $('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]').not('[href="#0"]').click(function (event) {
          var $a = $(event.target).closest('a');
          var hash = $a.attr('href').replace(/.*#([^?]+).*/, '#$1');
          if ($(hash).length > 0) {
            event.preventDefault();
            scrollTo(hash);
          }
        });

        // Attach custom event to trigger behaviour through DOM
        $(document).on('SmoothScroll.scrollTo', function (event) {
          if (event.target) {
            scrollTo(event.target, arguments.length <= 1 ? undefined : arguments[1]);
          }
        });

        // Check to see if a hash is located in the window.location and scroll to the element
        if (window.location.hash) {
          setTimeout(function () {
            scrollTo(window.location.hash);
          }, 1000);
        }
      }

      return {
        init: init,
        scrollTo: scrollTo
      };
    }
    module.exports = exports['default'];
  });
});

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.trackevent = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports);
      global.trackevent = mod.exports;
    }
  })(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = TrackEvent;
    /**
     * LVL99 Track Event
     * Caches tracked events until Google Analytics is loaded, then uploads to GA
     *
     * @package lvl99
     */

    function TrackEvent(debug) {
      /**
       * Collect tracked events before GA is loaded
       * @type {Array}
       */
      var saved = [];

      /**
       * Start checking to see if the GA object is loaded
       */
      /**
       * Detect if GA is loaded and then send any stored GA events
       */
      this.gaLoadedTimer = setInterval(function (lvl99TrackEvent) {
        var i = void 0;

        // Wait until GA object is available
        if (typeof window.ga !== 'undefined') {
          clearInterval(lvl99TrackEvent.gaLoadedTimer);

          // Send saved events
          if (lvl99TrackEvent.saved.length > 0) {
            if (debug && window.console && window.console.log) {
              console.log('Sending ' + lvl99TrackEvent.saved.length + ' tracked events to ga');
            }

            for (i in lvl99TrackEvent.saved) {
              if (lvl99TrackEvent.saved.hasOwnProperty(i)) {
                window.ga('send', lvl99TrackEvent.saved[i]);
              }
            }
            lvl99TrackEvent.saved = [];
          }
        }
      }(this), 5000);

      /**
       * Track event magic
       * @param eventCategory
       * @param eventAction
       * @param eventLabel
       * @param eventValue
       */
      return function track(eventCategory, eventAction, eventLabel, eventValue) {
        var trackedEvent = {
          hitType: 'event',
          eventCategory: eventCategory,
          eventAction: eventAction,
          eventLabel: eventLabel,
          eventValue: eventValue
        };

        if (!eventCategory || !eventAction) return;
        if (typeof eventValue === 'string') return;

        // GA is loaded
        if (typeof window.ga !== 'undefined') {
          if (debug && window.console && window.console.log) {
            console.log('Send trackedEvent to GA', trackedEvent);
          }
          window.ga('send', trackedEvent);

          // waiting for GA to load, use internal var to collect
        } else {
          if (debug && window.console && window.console.log) {
            console.log('GA not loaded yet, store trackedEvent', trackedEvent);
          }
          this.saved.push(trackedEvent);
        }
      };
    }
    module.exports = exports['default'];
  });
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('lodash.merge'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.lodash);
    global.queue = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.lodash);
      global.queue = mod.exports;
    }
  })(this, function (module, exports, _lodash) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = Queue;

    var _lodash2 = _interopRequireDefault(_lodash);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      } else {
        return Array.from(arr);
      }
    }

    /**
     * Queue class
     *
     * @returns {Object}
     * @constructor
     */
    function Queue(options) {
      /**
       * Queue options
       *
       * @type {Object}
       * @private
       */
      var _options = (0, _lodash2.default)({
        queue: {},
        timer: 0,
        timerDelay: 100
      }, options);

      /**
       * The batched queue tasks
       * Queue actions are batched in an {Object} with a specific label
       *
       * @type {Object}
       * @private
       */
      var _tasks = _options.queue;

      /**
       * The queue timer
       * When the queue is added to, the timer is updated with a `setTimeout` call to the `run` function
       *
       * @type {Number}
       * @private
       */
      var _timer = _options.timer;

      /**
       * The queue timer delay
       * The delay between queue timer updates (in milliseconds)
       *
       * @type {Number}
       * @default 100
       * @private
       */
      var _timerDelay = _options.timerDelay;

      /**
       * The queue's replay timer which tracks if/when to fire queued actions while the queue is already running
       */
      var _replayTimer = _options.replayTimer || _options.timer;

      /**
       * The queue replay timer delay
       * The delay between queue replay timer updates (in milliseconds)
       *
       * @type {number}
       * @default 100
       * @private
       */
      var _replayTimerDelay = _options.replayTimerDelay || _options.timerDelay;

      /**
       * The play status
       * 0: paused
       * 1: play
       * 2: running
       *
       * @type {Number}
       * @default 1
       * @private
       */
      var _status = 1;

      /**
       * Check when queue has finished running to then replay the action
       *
       * @param {Queue} Q The queue to replay
       * @param {String} actionName The action to replay
       * @param {Mixed} ...args Any additional arguments to pass to the action
       * @private
       */
      function _checkQueueFinished(Q) {
        var actionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'run';

        clearTimeout(_replayTimer);

        for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        _replayTimer = setTimeout(function checkQueueIsFinishedThenPerformAction(q, aN, a) {
          if (q.checkStatus === 1 && q.getTasksLength() && q.hasOwnProperty(aN)) {
            // @debug
            // console.log('Replaying queue...', {
            //   Queue: q,
            //   actionName: aN,
            //   args: a
            // })

            // Each action will either perform the action or replay itself if necessary
            q[aN].apply(q, _toConsumableArray(a));
          }
        }(Q, actionName, args), _replayTimerDelay);
      }

      var Queue = {
        queue: function queue(actionLabel, action) {
          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          // Default actionLabel is time value as string
          if (!actionLabel) {
            actionLabel = Date.now() + '';
          }

          // Assign the function to the queue
          if (actionLabel && action && typeof action === 'function') {
            _tasks[actionLabel] = {
              action: action,
              args: args
            };
          }

          // @chainable
          return this;
        },
        add: function add(actionLabel, action) {
          for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            args[_key3 - 2] = arguments[_key3];
          }

          // @debug
          // console.log('Queue.add', {
          //   actionLabel,
          //   action
          // })

          // Queue the action
          this.queue.apply(this, [actionLabel, action].concat(_toConsumableArray(args)));

          // Play the timer to get the queue to run after a delay (only when playing)
          if (_status) {
            this.play();
          }
          // } else {
          //   // @debug
          //   console.log('queue is currently paused')
          // }

          // @chainable
          return this;
        },
        delayAdd: function delayAdd(delay, actionLabel, action) {
          // @debug
          // console.log('Queue.delayAdd', {
          //   actionLabel,
          //   action
          // })

          var _delay = delay || _timerDelay;

          // Queue the action

          for (var _len4 = arguments.length, args = Array(_len4 > 3 ? _len4 - 3 : 0), _key4 = 3; _key4 < _len4; _key4++) {
            args[_key4 - 3] = arguments[_key4];
          }

          this.queue.apply(this, [actionLabel, action].concat(_toConsumableArray(args)));

          // Play the timer to get the queue to run after a delay (only when playing)
          if (_status) {
            this.play(_delay);
          }

          // @chainable
          return this;
        },
        sync: function sync(actionLabel, action) {
          // @debug
          // console.log('Queue.sync', {
          //   actionLabel,
          //   action
          // })

          // Ensure to clear the queue
          clearTimeout(_timer);

          // Queue action...

          for (var _len5 = arguments.length, args = Array(_len5 > 2 ? _len5 - 2 : 0), _key5 = 2; _key5 < _len5; _key5++) {
            args[_key5 - 2] = arguments[_key5];
          }

          this.queue.apply(this, [actionLabel, action].concat(_toConsumableArray(args)));

          // ... Then run the queue immediately
          this.run();

          // @chainable
          return this;
        },
        getActionByLabel: function getActionByLabel(actionLabel) {
          if (_tasks.hasOwnProperty(actionLabel)) {
            return _tasks[actionLabel];
          }

          return undefined;
        },
        remove: function remove(actionLabel) {
          if (_tasks.hasOwnProperty(actionLabel)) {
            _tasks[actionLabel] = undefined;
            delete _tasks[actionLabel];
          }

          // @chainable
          return this;
        },
        play: function play() {
          var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _timerDelay;

          // @debug
          // console.log('Queue.play', {
          //   _status
          // })

          // Ensure delay is really set property (if someone sets to null or undefined it should default back to regular delay time)
          var _delay = delay || _timerDelay;

          // Currently already running
          if (_status === 2) {
            for (var _len6 = arguments.length, args = Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
              args[_key6 - 1] = arguments[_key6];
            }

            _checkQueueFinished.apply(undefined, [this, 'play'].concat(_toConsumableArray(args)));
          }

          // Only play if already paused
          clearTimeout(_timer);

          // Set to playing
          _status = 1;

          // Reset timer to run the queue
          _timer = setTimeout(function runQueueProcessAfterDelay(q) {
            q.run();
          }(this), _delay);

          // @chainable
          return this;
        },
        pause: function pause() {
          // @debug
          // console.log('Queue.pause', {
          //   _status
          // })

          // Queue is already running
          if (_status === 2) {
            _checkQueueFinished(this, 'pause');
          }

          // Only pause if already playing
          clearTimeout(_timer);

          // Set to paused
          _status = 0;

          // @chainable
          return this;
        },
        run: function run() {
          // @debug
          // console.log('Queue.run...', {
          //   _status,
          //   _tasks
          // })

          // Currently already running, so run again later
          if (_status === 2) {
            _checkQueueFinished(this, 'run');
          }

          clearTimeout(_timer);
          clearTimeout(_replayTimer);

          // No items in the queue, so force queue to pause
          if (!Object.keys(_tasks).length) {
            _status = 0;
            return this;
          }

          // Save the queue's current status
          var _previousStatus = _status;

          // Set the status to running
          _status = 2;

          // @debug
          // console.log('Queue.running...', {
          //   _previousStatus,
          //   _status
          // })

          // Process the queue
          for (var actionLabel in _tasks) {
            if (_tasks.hasOwnProperty(actionLabel) && _tasks[actionLabel]) {
              var queuedItem = _tasks[actionLabel];

              // @debug
              // console.log(` --> ${actionLabel}`, queuedItem)

              // Function
              if (queuedItem && typeof queuedItem === 'function') {
                queuedItem();

                // Object
              } else if (queuedItem.hasOwnProperty('action') && typeof queuedItem.action === 'function') {
                // Apply arguments to the action
                if (queuedItem.hasOwnProperty('args') && queuedItem.args instanceof Array) {
                  queuedItem.action.apply(queuedItem, _toConsumableArray(queuedItem.args));

                  // Run the action like normal
                } else {
                  queuedItem.action();
                }
              }

              // Delete the queued item
              _tasks[actionLabel] = undefined;
              delete _tasks[actionLabel];
            }
          }

          // Revert to status before run
          _status = _previousStatus;

          // @chainable
          return this;
        },
        checkStatus: function checkStatus() {
          return _status;
        },
        getTimerDelay: function getTimerDelay() {
          return _timerDelay;
        },
        setTimerDelay: function setTimerDelay(timerDelay) {
          // Only set if timerDelay is greater than 0
          if (timerDelay && timerDelay > 0) {
            _timerDelay = timerDelay;
            _replayTimerDelay = timerDelay;
          }

          // @chainable
          return this;
        },
        length: function length() {
          return Object.keys(_tasks).length;
        },
        getQueueLength: function getQueueLength() {
          return this.length;
        },
        getTasks: function getTasks() {
          return _tasks;
        }
      };

      return Queue;
    }
    module.exports = exports['default'];
  });
});

/***/ }),
/* 11 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
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
     * LVL99 Debug
     * A console-like replacement which creates a noop console object if you don't want to output stuff via the console
     */

    function noop() {}

    /**
     * Debug
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

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.breakpoints = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports);
      global.breakpoints = mod.exports;
    }
  })(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = Breakpoints;
    /**
     * LVL99 Breakpoints
     * Detect via JS what the breakpoint is by keyword
     *
     * @package lvl99
     */

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
    }
    module.exports = exports['default'];
  });
});

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4), __webpack_require__(19), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./entity'), require('./app'), require('./component'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.entity, global.app, global.component);
    global.index = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(4), __webpack_require__(19), __webpack_require__(15)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.entity, global.app, global.component);
      global.index = mod.exports;
    }
  })(this, function (module, exports, _entity, _app, _component) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _entity2 = _interopRequireDefault(_entity);

    var _app2 = _interopRequireDefault(_app);

    var _component2 = _interopRequireDefault(_component);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var core = {
      Entity: _entity2.default,
      App: _app2.default,
      Component: _component2.default
    }; /**
        * LVL99 Core
        *
        * Core classes used throughout the framework
        *
        * @package lvl99
        */

    exports.default = core;
    module.exports = exports['default'];
  });
});

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(2), __webpack_require__(0), __webpack_require__(4), __webpack_require__(3), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('object-path'), require('lodash.merge'), require('./entity'), require('../common'), require('../utils/parse'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.objectPath, global.lodash, global.entity, global.common, global.parse);
    global.component = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(2), __webpack_require__(0), __webpack_require__(4), __webpack_require__(3), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.objectPath, global.lodash, global.entity, global.common, global.parse);
      global.component = mod.exports;
    }
  })(this, function (module, exports, _objectPath, _lodash, _entity, _common, _parse) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _objectPath2 = _interopRequireDefault(_objectPath);

    var _lodash2 = _interopRequireDefault(_lodash);

    var _entity2 = _interopRequireDefault(_entity);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };

    function _defineProperty(obj, key, value) {
      if (key in obj) {
        Object.defineProperty(obj, key, {
          value: value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      } else {
        obj[key] = value;
      }

      return obj;
    }

    function _toConsumableArray(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      } else {
        return Array.from(arr);
      }
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

    // Track components and whether they have been initialised and public methods added, etc.
    var trackComponents = {};

    /**
     * The Component's base properties
     *
     * @type {Object}
     */
    var ComponentProperties = {
      /**
       * NAMESPACE
       * This is used for custom events and error reporting
       *
       * @type {String}
       * @default LVL99
       */
      _NS: 'LVL99:Component',

      /**
       * namespace
       * This is used for CSS classes
       *
       * @type {String}
       * @default lvl99
       */
      _ns: 'lvl99-component',

      /**
       * The properties shared between all instances of this Component
       *
       * @type {Object}
       */
      _properties: {
        /**
         * The names of Component methods to publicly expose in the DOM via custom events (attached during `init`).
         *
         * Each entry can be a string (which will then be a global event; be careful with global events being attached twice),
         * or can be an object where you specify the target (often 'self') and set what method to do on whatever event, e.g.:
         *
         * ```
         *   // This will trigger the Component's `exampleMethod` when the Component's $elem is targeted/triggered
         *   // using the automatically generated custom event name:
         *   // `$elem.trigger('Component:exampleMethod')`
         *   {
         *     target: 'self',
         *     do: 'exampleMethod'
         *   }
         *
         *   // This will trigger the Component's `exampleMethod` when the document is targeted/triggered using a custom
         *   // event name:
         *   // `$(document).trigger('customEventName')`
         *   {
         *     target: 'document',
         *     do: 'exampleMethod',
         *     on: 'customEventName'
         *   }
         *
         *   // This will trigger the Component's `exampleMethod` when the window is scrolled:
         *   // `$(window).scroll()`
         *   {
         *     target: 'window',
         *     do: 'exampleMethod',
         *     on: 'scroll'
         *   }
         * ```
         *
         * @type {Array}
         */
        publicMethods: [],

        /**
         * The target to apply any CSS classes to
         *
         * @type {jQueryObject}
         */
        $classTarget: undefined
      },

      /**
       * The default attributes to load a created Component instance with.
       *
       * @type {Object}
       */
      _attributes: {
        /**
         * The main element that represents the Component in the DOM. Component events will be managed through this element.
         */
        $elem: undefined
      }

      /**
       * Component
       *
       * @class
       * @extends Entity
       */
    };
    var Component = function (_Entity) {
      _inherits(Component, _Entity);

      /**
       * Component constructor
       *
       * @constructor
       * @param {Object} attributes
       */
      function Component(attributes) {
        _classCallCheck(this, Component);

        return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, attributes));
      }

      /**
       * Extend the Component's properties with any {Object} arguments
       */


      _createClass(Component, [{
        key: 'extend',
        value: function extend() {
          var _get2;

          // @debug
          // console.log('LVL99:Component:extend', {
          //   arguments
          // })

          // Concat all the publicMethods into one array (since merge doesn't do that with plain arrays)
          var args = [].concat(Array.prototype.slice.call(arguments));
          var allPublicMethods = ComponentProperties._properties.publicMethods.slice(0);
          args.forEach(function (arg) {
            var hasPublicMethods = _objectPath2.default.get(arg, '_properties.publicMethods');
            if (hasPublicMethods && hasPublicMethods instanceof Array) {
              allPublicMethods = allPublicMethods.concat(hasPublicMethods);
            }
          });
          allPublicMethods = Array.from(new Set(allPublicMethods));

          // Extend the component's properties with the instantiated attributes and concatenated public methods
          (_get2 = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'extend', this)).call.apply(_get2, [this, ComponentProperties].concat(_toConsumableArray(args), [{
            _properties: {
              publicMethods: allPublicMethods
            }
          }]));
        }
      }, {
        key: 'getElem',
        value: function getElem() {
          // Soft return
          if (!this.getAttr('elem') && (!this.getAttr('$elem') || !this.getAttr('$elem').length)) {
            console.warn(this.NS + '.getElem: no elem was found for this component. This may cause problems with components which rely on the elem attribute.');
            return undefined;
          }

          // Elem (or $elem) is set to string
          if (typeof this.getAttr('elem') === 'string' || typeof this.getAttr('$elem') === 'string') {
            var $elem = (0, _common.$)(this.getAttr('elem'));
            if ($elem.length) {
              this.setAttr('elem', $elem[0]);
              this.setAttr('$elem', $elem);
            }
          }

          // Get & set the element
          if (this.getAttr('elem') && !this.getAttr('$elem')) {
            this.setAttr((0, _common.$)(this.getAttr('elem')));
          }

          return this.getAttr('$elem');
        }
      }, {
        key: 'markElem',
        value: function markElem() {
          // Mark the element
          if (this.getElem() && this.getElem().length) {
            if (!this.getElem().attr('data-component')) {
              this.getElem().attr('data-component', this.NS);
            }

            if (!this.getElem().attr('data-component-id')) {
              this.getElem().attr('data-component-id', this.uuid);
            }

            this.triggerEvent('markElem:end');
          }
        }
      }, {
        key: 'getClassTarget',
        value: function getClassTarget() {
          // Prioritise attr
          var $classTarget = this.getAttr('$classTarget');

          // Not found in attr? Use prop
          if (!$classTarget || !$classTarget.length) {
            $classTarget = this.getProp('$classTarget');
          }

          // Not found in prop? Use elem
          if (!$classTarget || !$classTarget.length) {
            $classTarget = this.getElem();

            // Ensure set as attr
            this.setAttr('$classTarget', $classTarget);
          }

          return $classTarget;
        }
      }, {
        key: 'loadAttrs',
        value: function loadAttrs() {
          if (this.getElem() && this.getElem().is('[data-component-attributes]')) {
            var attrs = {};

            // Attempt to get the attributes from the DOM element
            try {
              attrs = JSON.parse(this.getElem().attr('data-component-attributes'));
            } catch (e) {
              console.error('[' + this.NS + '] loadAttrs: Error loading attributes from DOM element');
            }

            this._attributes = (0, _lodash2.default)(this._attributes, attrs);

            // Once loaded, remove the component attributes from the DOM
            this.getElem().removeAttr('data-component-attributes');

            return this._attributes;
          }
        }
      }, {
        key: 'init',
        value: function init() {
          var _this2 = this;

          _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'init', this).apply(this, arguments);

          // @debug
          // console.log(`[${this.NS:init}]`)

          // Track that the component has been initialised
          if (!trackComponents.hasOwnProperty(this.NS)) {
            trackComponents[this.NS] = {
              instances: _defineProperty({}, '' + this.uuid, this)
            };
          } else {
            trackComponents[this.NS].instances['' + this.uuid] = this;
          }

          // @debug
          // console.log(trackComponents)

          // Mark the element
          this.markElem();

          /**
           * Attach Component's public methods to targets
           * Public methods can be triggered on the targets via `$(target).trigger('NAMESPACE:publicMethodName')`
           */
          var publicMethods = this.getProp('publicMethods');
          if (publicMethods && publicMethods.length) {
            publicMethods.forEach(function (trigger) {
              var triggerDetails = {};

              // Already object
              if ((typeof trigger === 'undefined' ? 'undefined' : _typeof(trigger)) === 'object') {
                triggerDetails = trigger;
              } else if (typeof trigger === 'string') {
                if (/^{/.test(trigger) || /[:;]/.test(trigger)) {
                  triggerDetails = (0, _parse.extractTriggerDetails)(trigger);
                } else {
                  triggerDetails.do = trigger;
                }
              }

              // If empty, set `on` to `do` value (consider it a custom event to invoke, e.g. 'init' would invoke 'init' on this Component)
              if (!_objectPath2.default.has(triggerDetails, 'on')) {
                triggerDetails.on = triggerDetails.do;
              }

              // Context should always be this Component
              triggerDetails.context = _this2;

              // Get the Component's method
              var method = undefined;
              try {
                method = triggerDetails.context[triggerDetails.do];
              } catch (e) {
                throw new Error('[' + _this2.NS + '] init: public method \'' + triggerDetails.do + '\' was not found on this component');
              }

              // @debug
              // console.log(`[${this.NS}] init: public method "${triggerDetails.do}"`, {
              //   triggerDetails,
              //   method
              // })

              // Only attach public method if it hasn't been attached already or has a target
              if (!triggerDetails.hasOwnProperty('target') && Object.keys(trackComponents[_this2.NS].instances).length > 1) {
                // @debug
                // console.warn(`[${this.NS}] init: public method ${this.NS}:${triggerDetails.do} already assigned. Skipping...`)
                return;
              }

              // Attach the method as a custom event to the target
              if (typeof method === 'function') {
                // Wrap the method into a closure
                var doComponentMethod = function doComponentMethod(jQueryEvent) {
                  // @debug
                  // console.log(`Triggered ${this.NS}:${triggerDetails.do}`, {
                  //   _class: this,
                  //   _method: method,
                  //   jQueryEvent,
                  //   args: arguments
                  // })

                  method.call(_this2, jQueryEvent);
                };

                // Attach to the target document with a particular element selector
                if (triggerDetails.selector) {
                  _this2.bindEventToTargetSelector(triggerDetails.on, triggerDetails.selector, doComponentMethod, triggerDetails.target);

                  // Attach to the target
                } else {
                  _this2.bindEventToTarget(triggerDetails.on, doComponentMethod, triggerDetails.target);
                }

                // Error
              } else {
                // @debug
                // console.log(this, trigger, triggerDetails)
                throw new Error('[' + _this2.NS + '] init: public method \'' + triggerDetails.do + '\' is not a valid function');
              }
            });
          }

          /**
           * Load any attributes that were attached to the DOM element
           */
          this.loadAttrs();

          /**
           * @trigger NAMESPACE:init:end
           * @param {Component}
           */
          this.triggerEvent('init:end');
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          // @TODO tear down the house!
          // @TODO remove the bound public events
          // @TODO other garbage collection/memory management

          /**
           * @trigger NAMESPACE:destroy:beforeend
           * @param {Component}
           */
          this.triggerEvent('destroy:beforeend');

          _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'destroy', this).apply(this, arguments);
        }
      }, {
        key: 'bindEventToTarget',
        value: function bindEventToTarget(eventName, method, target) {
          // Default to document
          if (!target) {
            target = document;
          } else {
            // Special string values to get the actual object
            switch (target) {
              case 'document':
                target = document;
                break;

              case 'window':
                target = window;
                break;

              case 'self':
                target = this.getElem()[0];
                break;
            }
          }

          // Extract the target event names from the input given
          var eventNames = (0, _parse.extractTargetEventNames)(eventName, this.NS);

          // @debug
          // console.log(`[${this.NS}] bindEventToTarget`, {
          //   eventName,
          //   method,
          //   target,
          //   triggerName: targetEventNames
          // })

          // Assign the trigger
          if (eventNames) {
            (0, _common.$)(target).on(eventNames.join(' '), method);
          }
        }
      }, {
        key: 'bindEventToTargetSelector',
        value: function bindEventToTargetSelector(eventName, selector, method, target) {
          target = (0, _parse.getTargetBySelector)(target, this);
          selector = (0, _parse.getTargetSelector)(selector, this);
          var eventNames = (0, _parse.extractTargetEventNames)(eventName, this.NS);

          // @debug
          // console.log(`[${this.NS}] bindEventToTargetSelector`, {
          //   eventName,
          //   selector,
          //   method,
          //   target,
          //   triggerName: `${this.NS}:${eventName}`
          // })

          if (eventNames) {
            (0, _common.$)(target).on(eventNames.join(' '), selector, method);
          }
        }
      }, {
        key: 'triggerEvent',
        value: function triggerEvent(eventName) {
          for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }

          // @debug
          // console.log(`[${this.NS}] triggerEvent: ${this.NS}:${eventName}`)

          // Always pass the component as the first argument parameter
          _common.$doc.trigger(this.NS + ':' + eventName, [this].concat(args));
        }
      }, {
        key: 'triggerEventOnSelector',
        value: function triggerEventOnSelector(eventName, selector) {
          selector = (0, _parse.getTargetSelector)(selector, this);

          // @debug
          // console.log(`[${this.NS}] triggerEventOnSelector: ${this.NS}:${eventName}`)

          // Always pass the component as the first argument parameter

          for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
            args[_key2 - 2] = arguments[_key2];
          }

          (0, _common.$)(selector).trigger(this.NS + ':' + eventName, [this].concat(args));
        }
      }]);

      return Component;
    }(_entity2.default);

    exports.default = Component;
    module.exports = exports['default'];
  });
});

/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = window.jQuery;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(11)))

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(6), __webpack_require__(4), __webpack_require__(3), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('uuid'), require('./entity'), require('../common'), require('../utils/parse'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.uuid, global.entity, global.common, global.parse);
    global.app = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(6), __webpack_require__(4), __webpack_require__(3), __webpack_require__(1)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.uuid, global.entity, global.common, global.parse);
      global.app = mod.exports;
    }
  })(this, function (module, exports, _uuid, _entity, _common, _parse) {
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
       */


      _createClass(App, [{
        key: 'extend',
        value: function extend() {
          var _get2;

          // @debug
          // console.log(`LVL99:App:extend`, ...arguments)

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
});

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(1), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./parse'), require('./inheritance'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.parse, global.inheritance);
    global.index = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(1), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.parse, global.inheritance);
      global.index = mod.exports;
    }
  })(this, function (module, exports, _parse, _inheritance) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _parse2 = _interopRequireDefault(_parse);

    var _inheritance2 = _interopRequireDefault(_inheritance);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    // import super from './super'

    /**
     * LVL99 Utils
     *
     * Utilities used throughout the framework
     *
     * @package lvl99
     */

    var utils = {
      parse: _parse2.default,
      inheritance: _inheritance2.default
    };

    exports.default = utils;
    module.exports = exports['default'];
  });
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(3), __webpack_require__(20), __webpack_require__(14), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('./common'), require('./utils'), require('./core'), require('./tools'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.common, global.utils, global.core, global.tools);
    global.index = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(3), __webpack_require__(20), __webpack_require__(14), __webpack_require__(7)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.common, global.utils, global.core, global.tools);
      global.index = mod.exports;
    }
  })(this, function (module, exports, _common, _utils, _core, _tools) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _common2 = _interopRequireDefault(_common);

    var _utils2 = _interopRequireDefault(_utils);

    var _core2 = _interopRequireDefault(_core);

    var _tools2 = _interopRequireDefault(_tools);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    /**
     * LVL99
     *
     * The whole framework in one discrete package
     *
     * @package lvl99
     */

    var lvl99 = {
      common: _common2.default,
      core: _core2.default,
      utils: _utils2.default,
      tools: _tools2.default
    };

    exports.default = lvl99;
    module.exports = exports['default'];
  });
});

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(17);
var bytesToUuid = __webpack_require__(18);

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(17);
var bytesToUuid = __webpack_require__(18);

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ })
/******/ ]);