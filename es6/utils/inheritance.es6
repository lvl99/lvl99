/**
 * LVL99 Inheritance utilities
 */

const RE_PRIVATE = /^_/

/**
 * Assign public getter/setter properties to the target. This will reference the target property (if it is set)
 * otherwise use the default property value. You can also whitelist the properties you want to selectively
 * expose by name.
 *
 * @param {Object|Function} target
 * @param {Object} defaultPropValues
 * @param {Array} whitelist
 */
export function exposeAllProperties (target, defaultPropValues, whitelist) {
  let properties

  if (!target) {
    throw new Error('No target was given')
  }

  // Filter non-whitelisted properties
  properties = Object.keys(target).filter(item => {
    return (whitelist && whitelist.includes(item)) || !whitelist
  })

  // @debug
  // console.log('filtered properties', properties)

  if (!properties || !properties.length) {
    throw new Error('No properties were given')
  }

  // Default prop values to target
  if (typeof defaultPropValues === 'undefined') {
    defaultPropValues = target
  }

  // Process and expose the properties on the target
  properties.forEach(propName => {
    let usePropName = propName

    // Private values can only have a public getter
    if (RE_PRIVATE.test(propName)) {
      usePropName = propName.replace(RE_PRIVATE, '')

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
      createPublicGetProperty(target, propName, usePropName, defaultPropValues[propName])

    } else {
      // @debug
      // console.log('Found public property', {
      //   propName,
      //   usePropName,
      //   propValue: properties[propName],
      //   target
      // })

      // Create public interface
      createPublicGetSetProperty(target, propName, usePropName, defaultPropValues[propName])
    }
  })
}

/**
 * Expose only the private properties listed on the target with public getter property. Whitelist only those you want
 * by adding the property's name to the whitelist {Array}
 *
 * @param {Object|Function} target
 * @param {Boolean|Object|Function} defaultPropValues
 * @param {Array} whitelist
 */
export function exposePrivateProperties(target, defaultPropValues = false, whitelist = []) {
  let properties

  // Target is always required
  if (!target) {
    throw new Error('No target was given')
  }

  // Filter non-private or non-whitelisted properties
  properties = Object.keys(target).filter(item => {
    if ((whitelist && whitelist.includes(item)) || !whitelist || !whitelist.length) {
      return RE_PRIVATE.test(item)
    }
    return false
  })

  // @debug
  // console.log('filtered properties', properties)

  // Silent death
  if (!properties.length) {
    return
  }

  // If default prop values not set, just use target properties
  if (!defaultPropValues || defaultPropValues === undefined) {
    defaultPropValues = target
  }

  // Process and expose the properties on the target
  properties.forEach(propName => {
    let usePropName = propName

    // Create a public handle for the private property (removes the "_" at the start)
    usePropName = propName.replace(RE_PRIVATE, '')

    // Create public interface
    createPublicGetProperty(target, propName, usePropName, defaultPropValues[propName])
  })
}

/**
 * Create a public getter interface for a property on a target
 *
 * @param {Object|Function} target
 * @param {String} targetPropName
 * @param {String} newPropName
 * @param {Mixed} defaultPropValue Used if the target's targetPropName is undefined
 */
export function createPublicGetProperty (target, targetPropName, newPropName, defaultPropValue) {
  if (!target.hasOwnProperty(newPropName)) {
    Object.defineProperty(target, newPropName, {
      get () {
        return (typeof target[targetPropName] !== 'undefined' ? target[targetPropName] : defaultPropValue)
      },
      set: undefined,
      enumerable: true
    })
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
export function createPublicGetSetProperty (target, targetPropName, newPropName, defaultPropValue) {
  if (!target.hasOwnProperty(newPropName)) {
    Object.defineProperty(target, newPropName, {
      get () {
        return (typeof target[targetPropName] !== 'undefined' ? target[targetPropName] : defaultPropValue)
      },
      set (newValue) {
        target[targetPropName] = newValue
      },
      enumerable: true
    })
  }
}

const inheritance = {
  exposeAllProperties,
  exposePrivateProperties,
  createPublicGetProperty,
  createPublicGetSetProperty
}

export default inheritance
