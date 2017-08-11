'use strict';

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
 * @param {Object|Function} defaultPropValues
 * @param {Array} whitelist
 */
function exposePrivateProperties(target, defaultPropValues, whitelist) {
  var properties = void 0;

  if (!target) {
    throw new Error('No target was given');
  }

  // Filter non-private or non-whitelisted properties
  properties = Object.keys(target).filter(function (item) {
    if (whitelist && whitelist.includes(item) || !whitelist) {
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

  // Default prop values to target
  if (typeof defaultPropValues === 'undefined') {
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

module.exports = inheritance;