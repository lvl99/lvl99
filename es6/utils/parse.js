/**
 * LVL99 Parse
 *
 * Parse strings or transform from one format to another
 *
 * @package lvl99
 */

const __loggerPath = 'lvl99/utils/parse'
const objectPath = require('object-path')

/**
 * Coerce a value to its primitive type
 *
 * @param {Mixed} input
 * @returns {Mixed}
 */
function coerceToPrimitiveType (input) {
  // Non-string? Just return it straight away
  if (typeof input !== 'string') return input

  // Trim any whitespace
  input = (input + '').trim()

  // Number
  if (/^\-?(?:\d*[\.\,])*\d*(?:[eE](?:\-?\d+)?)?$/.test(input)) {
    return parseFloat(input)

  // Boolean: true
  } else if (/^(true|1)$/.test(input)) {
    return true

  // NaN
  } else if (/^NaN$/.test(input)) {
    return NaN

  // undefined
  } else if (/^undefined$/.test(input)) {
    return undefined

  // null
  } else if (/^null$/.test(input)) {
    return null

  // Boolean: false
  } else if (/^(false|0)$/.test(input) || input === '') {
    return false

  // JSON: starts with [ or { and ends with ] or }
  } else if (/^[\[\{]/.test(input) && /[\]\}]$/.test(input)) {
    return convertStringToJson(input)
  }

  // Default to string
  return input
}

/**
 * Convert value to an explicit boolean. Namely for processing string values.
 *
 * @param {Mixed} input
 * @returns {Boolean}
 */
function convertToBoolean (input) {
  // Already boolean
  if (input === true || input === false) {
    return input
  }

  // Cases of truthy/falsey values
  switch (input) {
    case 1:
    case '1':
    case 'true':
      return true

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
      return false
  }

  // Otherwise...
  return !!input
}

/**
 * Convert a string to JSON or just return the string if can't
 *
 * @param {String} input
 * @returns {Object}
 */
function convertStringToJson (input) {
  let output = input

  // Convert string data to JSON
  if (typeof input === 'string') {
    try {
      output = JSON.parse(input)
    } catch (e) {
      console.error(`${_loggerPath}.convertStringToJson: Error parsing string JSON data`, input)
    }
  }

  return output
}

/**
 * Convert a string to a float.
 * This also converts number constants like Infinity and NaN to zero.
 *
 * @param input
 * @returns {*}
 */
function convertStringToFloat (input) {
  if (typeof input === 'number') {
    return input
  }

  let output = parseFloat((input + '').replace(/[^\d\-\.]+/g, ''))

  // Infinity / NaN
  if (!isFinite(input) || isNaN(input) || isNaN(output)) {
    output = 0
  }

  return output
}

/**
 * Extract key-values from a string which is like a CSS class declaration, e.g. `key: value; key: value`
 *
 * @param {String} input
 * @return {Object}
 */
function extractClassDetails (input) {
  let output = {}
  let inputParts = [input]

  // Check if it has semi-colons
  if (/;/.test(input)) {
    inputParts = input.split(';')
  }

  // Process each input part
  inputParts.forEach((part) => {
    part = part.trim()
    if (part) {
      let partParts = part.match(/([a-z0-9_-]+):([^;]+);?/i)
      output[partParts[1].trim()] = coerceToPrimitiveType(partParts[2].trim())
    }
  })

  return output
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
  let trigger = input

  if (!context) {
    context = window
  }

  // String input given
  if (typeof input === 'string') {
    // Try JSON first
    if (/^{/.test(input)) {
      trigger = convertStringToJson(input)

    // Try class details
    } else if (/^[a-z0-9_-]+:/.test(input)) {
      trigger = extractClassDetails(input)

    // String with no spaces
    } else if (!/ /.test(input)) {
      trigger = {
        do: input
      }
    }
  }

  // No object found!
  if (typeof trigger !== 'object') {
    throw new Error(`${_loggerPath}.extractTriggerDetails: input was not valid JSON or CSS-style definition`)
  }

  // Ensure it has `on` and `do` properties
  // if (!objectPath.has(trigger, 'on')) {
  //   throw new Error(`${_loggerPath}.extractTriggerDetails: trigger is missing required 'on' property`)
  // }
  if (!objectPath.has(trigger, 'do')) {
    throw new Error(`${_loggerPath}.extractTriggerDetails: trigger is missing required 'do' property`)
  }

  // If target is set, use real values for window and document
  if (objectPath.has(trigger, 'target')) {
    switch (trigger.target) {
      case 'self':
        console.log('Targeting self', context)
        trigger.target = context
        break

      case 'document':
        trigger.target = document
        break

      case 'window':
        trigger.target = window
        break
    }
  }

  // Do same as above if a context was set!
  if (objectPath.has(trigger, 'context')) {
    switch (trigger.context) {
      case 'document':
        trigger.context = document
        break

      case 'window':
        trigger.context = window
        break
    }
  } else {
    trigger.context = context
  }

  return trigger
}

/**
 * Encode string to URL, with spaces that are represented as `+`
 * See: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
 *
 * @param {String} input
 * @returns {String}
 */
function fixedEncodeURIComponent (input) {
  return encodeURIComponent(input).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  })
}

/**
 * Get the target object by a string selector
 *
 * @param {String} target
 * @param {Object} context
 * @return {Object}
 */
function getTargetBySelector (target, context) {
  // Default to document
  if (!target) {
    target = document
  }

  if (typeof target === 'string') {
    // Special string values to get the actual object
    switch (target) {
      case 'document':
        target = document
        break

      case 'window':
        target = window
        break

      case 'self':
        target = context
        break
    }
  }

  return target
}

/**
 * Get the target object's string selector
 *
 * @param {Object} target
 * @param {Object} context
 * @return {undefined|String}
 */
function getTargetSelector (target, context) {
  if (typeof target === 'string') {
    return target
  }

  // Window
  if ($.isWindow(target)) {
    return 'window'

  // Document
  } else if (target === document) {
    return 'document'

  // Self
  } else if (target.hasOwnProperty('_uuid')) {
    return `[data-component-id="${target._uuid}"]`

  // HTML Elem
  } else if ($(target).length) {
    if ($(target).attr('data-component-id')) {
      return `[data-component-id="${$(target).attr('data-component-id')}"]`
    } else if ($(target).attr('id')) {
      return `#${$(target).attr('id')}`
    } else {
      return `${target.tagName.toLowerCase()}`
    }
  }

  return target
}

const parse = {
  coerceToPrimitiveType,
  convertToBoolean,
  convertStringToJson,
  convertStringToFloat,
  extractClassDetails,
  extractTriggerDetails,
  fixedEncodeURIComponent,
  getTargetBySelector,
  getTargetSelector
}

module.exports = parse
