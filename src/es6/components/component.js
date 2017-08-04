/**
 * LVL99 Component
 *
 * @package lvl99
 */

const objectPath = require('object-path')
const merge = require('lodash.merge')
const uuid = require('uuid')
const { $, $doc } = require('../utils')
// import { wrap } from 'LVL99.Utils.Super'
const {
  extractTriggerDetails,
  getTargetBySelector,
  getTargetSelector
} = require('../utils/parse')

/**
 * The Component's base properties
 *
 * @type {Object}
 */
const ComponentProperties = {
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
}

/**
 * Component
 *
 * @class
 */
class Component {
  /**
   * Component constructor
   *
   * @constructor
   * @param {Object} attributes
   */
  constructor (attributes) {
    // @debug
    // console.log('LVL99:Component:constructor')

    this.extend({
      _attributes: attributes
    })

    this._uuid = `${this._NS}:${uuid.v4()}`
  }

  /**
   * Extend the Component's properties
   *
   * @param {Object} ...arguments
   */
  extend () {
    // @debug
    // console.log('LVL99:Component:extend', {
    //   arguments
    // })

    // Concat all the publicMethods into one array (since merge doesn't do that with plain arrays)
    let args = [...arguments]
    let allPublicMethods = ComponentProperties._properties.publicMethods.slice(0)
    args.forEach((arg) => {
      let hasPublicMethods = objectPath.get(arg, '_properties.publicMethods')
      // console.log('hasPublicMethods', hasPublicMethods, arg)
      if (hasPublicMethods && hasPublicMethods instanceof Array) {
        allPublicMethods = allPublicMethods.concat(hasPublicMethods)
      }
    })
    allPublicMethods = Array.from(new Set(allPublicMethods))
    // console.log('allPublicMethods', allPublicMethods)

    // Merge the properties with the instantiated attributes and concatenated public methods
    merge(this, ComponentProperties, ...arguments, {
      _properties: {
        publicMethods: allPublicMethods
      }
    })

    // @debug
    // console.log(this)
  }

  /**
   * Get a Component's property value.
   *
   * @param {String} propName The name of the property
   */
  getProp (propName) {
    if (!propName || typeof propName !== 'string') {
      throw new Error(`[${this._NS}] get: 'propName' value is invalid`)
    }

    return objectPath.get(this._properties, propName)

    // if (Object.keys(this._properties).includes(propName)) {
    //   return this._properties[propName]
    // } else {
    //   throw new Error(`[${this._NS}] get: property '${propName}' does not exist`)
    // }
  }

  /**
   * Get a Component's attribute value.
   *
   * @param {String} attrName The name of the attribute
   * @return {Any}
   */
  getAttr (attrName) {
    if (!attrName || typeof attrName !== 'string') {
      throw new Error(`[${this._NS}] getAttr: 'attrName' value is invalid`)
    }

    return objectPath.get(this._attributes, attrName)

    // if (Object.keys(this._attributes).includes(attrName)) {
    //   return this._attributes[attrName]
    // } else {
    //   return undefined
    // }
  }

  /**
   * Set a Component's property to a value.
   *
   * @param {String} propName
   * @param {Any} propValue
   */
  setProp (propName, propValue) {
    if (!propName || typeof propName !== 'string') {
      throw new Error(`[${this._NS}] set: 'propName' value is invalid`)
    }

    return objectPath.set(this._properties, propName, propValue)

    // this._properties[propName] = propValue
  }

  /**
   * Set a Component's property to a value.
   *
   * @param {String} propName
   * @param {Any} propValue
   */
  setAttr (attrName, attrValue) {
    if (!attrName || typeof attrName !== 'string') {
      throw new Error(`[${this._NS}] setAttr: 'attrName' value is invalid`)
    }

    return objectPath.set(this._attributes, attrName, attrValue)

    // this._attributes[attrName] = attrValue
  }

  /**
   * Get the component's element
   *
   * @return {undefined|jQueryObject}
   */
  getElem () {
    // Soft return
    if (!this.getAttr('elem') && (!this.getAttr('$elem') || !this.getAttr('$elem').length)) {
      console.warn(`${this._NS}.getElem: no elem was found for this component. This may cause problems with components which rely on the elem attribute.`)
      return undefined
    }

    // Elem (or $elem) is set to string
    if (typeof this.getAttr('elem') === 'string' || typeof this.getAttr('$elem') === 'string') {
      let $elem = $(this.getAttr('elem'))
      if ($elem.length) {
        this.setAttr('elem', $elem[0])
        this.setAttr('$elem', $elem)
      }
    }

    // Get & set the element
    if (this.getAttr('elem') && !this.getAttr('$elem')) {
      this.setAttr($(this.getAttr('elem')))
    }

    return this.getAttr('$elem')
  }

  /**
   * Mark the Component's element with necessary attributes
   */
  markElem () {
    // Mark the element
    if (this.getElem() && this.getElem().length) {
      if (!this.getElem().attr('data-component')) {
        this.getElem().attr('data-component', this._NS)
      }

      if (!this.getElem().attr('data-component-id')) {
        this.getElem().attr('data-component-id', this._uuid)
      }

      this.triggerEvent('markElem:end')
    }
  }

  /**
   * Get the target to apply the CSS state classes to
   *
   * @return {undefined|jQueryObject}
   */
  getClassTarget () {
    // Prioritise attr
    let $classTarget = this.getAttr('$classTarget')

    // Not found in attr? Use prop
    if (!$classTarget || !$classTarget.length) {
      $classTarget = this.getProp('$classTarget')
    }

    // Not found in prop? Use elem
    if (!$classTarget || !$classTarget.length) {
      $classTarget = this.getElem()

      // Ensure set as attr
      this.setAttr('$classTarget', $classTarget)
    }

    return $classTarget
  }

  /**
   * Get the attributes from the DOM element and place into the Component instance
   *
   * @return {Object}
   */
  loadAttrs () {
    if (this.getElem() && this.getElem().is('[data-component-attributes]')) {
      let attrs = {}

      // Attempt to get the attributes from the DOM element
      try {
        attrs = JSON.parse(this.getElem().attr('data-component-attributes'))
      } catch (e) {
        console.error(`[${this._NS}] loadAttrs: Error loading attributes from DOM element`)
      }

      this._attributes = merge(this._attributes, attrs)

      // Once loaded, remove the component attributes from the DOM
      this.getElem().removeAttr('data-component-attributes')

      return this._attributes
    }
  }

  /**
   * Initialise Component
   */
  init () {
    // @debug
    // console.log(`[${this._NS:init}]`)

    // Mark the element
    this.markElem()

    /**
     * Attach Component's public methods to targets
     * Public methods can be triggered on the targets via `$(target).trigger('NAMESPACE:publicMethodName')`
     */
    let publicMethods = this.getProp('publicMethods')
    if (publicMethods && publicMethods.length) {
      publicMethods.forEach((trigger) => {
        let triggerDetails = {}

        // Already object
        if (typeof trigger === 'object') {
          triggerDetails = trigger

        } else if (typeof trigger === 'string') {
          if (/^{/.test(trigger) || /[:;]/.test(trigger)) {
            triggerDetails = extractTriggerDetails(trigger)
          } else {
            triggerDetails.do = trigger
          }
        }

        // If empty, set `on` to `do` value (consider it a custom event to invoke, e.g. 'init' would invoke 'init' on this Component)
        if (!objectPath.has(triggerDetails, 'on')) {
          triggerDetails.on = triggerDetails.do
        }

        // Context should always be this Component
        triggerDetails.context = this

        // Get the Component's method
        let method = undefined
        try {
          method = triggerDetails.context[triggerDetails.do]
        } catch (e) {
          throw new Error(`[${this._NS}] init: public method '${triggerDetails.do}' was not found on this component`)
        }

        // @debug
        // console.log(`[${this._NS}] init: attach public method`, {
        //   triggerDetails,
        //   method
        // })

        // Attach the method as a custom event to the target
        if (typeof method === 'function') {
          // Wrap the method into a closure
          let doComponentMethod = (jQueryEvent) => {
            // @debug
            // console.log(`Triggered ${this._NS}:${triggerDetails.do}`, {
            //   _class: this,
            //   _method: method,
            //   jQueryEvent,
            //   arguments
            // })

            method.call(this, jQueryEvent)
          }

          // Attach to the target document with a particular element selector
          if (triggerDetails.selector) {
            this.bindEventToTargetSelector(triggerDetails.on, triggerDetails.selector, doComponentMethod, triggerDetails.target)

          // Attach to the target
          } else {
            this.bindEventToTarget(triggerDetails.on, doComponentMethod, triggerDetails.target)
          }

        // Error
        } else {
          // @debug
          // console.log(this, trigger, triggerDetails)
          throw new Error(`[${this._NS}] init: public method '${triggerDetails.do}' is not a valid function`)
        }
      })
    }

    /**
     * Load any attributes that were attached to the DOM element
     */
    this.loadAttrs()

    /**
     * @trigger NAMESPACE:init:end
     * @param {Component}
     */
    this.triggerEvent('init:end')
  }

  /**
   * Destroy and tear down the component
   */
  destroy () {
    // @TODO tear down the house!
    // @TODO remove the bound public events
    // @TODO other garbage collection/memory management

    /**
     * @trigger NAMESPACE:destroy:beforeend
     * @param {Component}
     */
    this.triggerEvent('destroy:beforeend')

    delete this
  }

  /**
   * Bind method to custom event on target
   * Event names are automatically namespaced using the Component's _NS property.
   *
   * @param {String} eventName
   * @param {Function} method
   * @param {Object} target Default is `document`. This is the target DOM element which the custom event will bubble up to
   */
  bindEventToTarget (eventName, method, target) {
    // Default to document
    if (!target) {
      target = document
    } else {
      // Special string values to get the actual object
      switch (target) {
        case 'document':
          target = document
          break

        case 'window':
          target = window
          break

        case 'self':
          target = this.getElem()[0]
          break
      }
    }

    // @debug
    // console.log(`[${this._NS}] bindEventToTarget`, {
    //   eventName,
    //   method,
    //   target,
    //   triggerName: `${this._NS}:${eventName}`
    // })

    $(target).on(`${this._NS}:${eventName}`, method)
  }

  /**
   * Bind method to custom event on target with an element selector.
   * Event names are automatically namespaced using the Component's _NS property.
   *
   * @param {String} eventName
   * @param {String} selector Target a specific element (via query selector) to trigger the event
   * @param {Function} method
   * @param {Object} target Default is `document`. This is the target DOM element which the custom event will bubble up to
   */
  bindEventToTargetSelector (eventName, selector, method, target) {
    target = getTargetBySelector(target, this)
    selector = getTargetSelector(selector, this)

    // @debug
    // console.log(`[${this._NS}] bindEventToTargetSelector`, {
    //   eventName,
    //   selector,
    //   method,
    //   target,
    //   triggerName: `${this._NS}:${eventName}`
    // })

    $(target).on(`${this._NS}:${eventName}`, selector, method)
  }

  /**
   * Trigger a custom document event on the Component.
   * The event triggered will be `NAMESPACE:eventName`.
   *
   * @param {String} eventName
   * @param {Any} ...args
   */
  triggerEvent (eventName, ...args) {
    // @debug
    // console.log(`[${this._NS}] triggerEvent: ${this._NS}:${eventName}`)

    // Always pass the component as the first argument parameter
    $doc.trigger(`${this._NS}:${eventName}`, [this, ...args])
  }

  /**
   * Trigger a custom document event on an element on the Component.
   * The event triggered will be `NAMESPACE:eventName`.
   *
   * @param {String} eventName
   * @param {String} selector
   * @param {Any} ...args
   */
  triggerEventOnSelector (eventName, selector, ...args) {
    selector = getTargetSelector(selector, this)

    // @debug
    // console.log(`[${this._NS}] triggerEventOnSelector: ${this._NS}:${eventName}`)

    // Always pass the component as the first argument parameter
    $(selector).trigger(`${this._NS}:${eventName}`, [this, ...args])
  }
}

module.exports = Component
