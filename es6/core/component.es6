/**
 * # Component
 *
 * The base class for components which itself is extended from the {Entity} class.
 *
 * The main difference is that components rely on a HTML DOM element and may output a warning if one isn't set, as well
 * as have event-based logic.
 *
 * It's important to take note of {Entity} lifecycle methods and how they must be incorporated within Components.
 *
 * ## Public Methods
 *
 * Components can have public methods configured in their properties which will automate creating event listeners that
 * link to the component's internal methods.
 *
 * Each entry can be a string (which will then be a global event; be careful with global events being attached twice),
 * or can be an object where you specify the target (often 'self') and set the name of the method to do:
 *
 * ```
 *  _publicMethods: [
 *
 *     // This will trigger the Component's `exampleMethod` when the Component's $elem is targeted/triggered
 *     // using the automatically generated custom event name:
 *     // `$elem.trigger('LVL99:Component:exampleMethod')`
 *     {
 *       target: 'self',
 *       do: 'exampleMethod'
 *     },
 *
 *     // This will trigger the Component's `exampleMethod` when the document is targeted/triggered using a custom
 *     // event name:
 *     // `$(document).trigger('customEventName')`
 *     {
 *       target: 'document',
 *       do: 'exampleMethod',
 *       on: 'customEventName'
 *     },
 *
 *     // This will trigger the Component's `exampleMethod` when the window is scrolled:
 *     // `$(window).scroll()`
 *     {
 *       target: 'window',
 *       do: 'exampleMethod',
 *       on: 'scroll'
 *     }
 *   ]
 * ```
 *
 * @module lvl99/core/component
 * @requires module:jquery
 * @requires module:object-path
 * @requires module:lodash.merge
 * @requires module:lvl99/utils/parse
 */

import objectPath from 'object-path'
import merge from 'lodash.merge'
import Entity from './entity'
import { $, $doc } from '../common'
// import { wrap } from '../utils/super'
import {
  extractTriggerDetails,
  extractTargetEventNames,
  getTargetBySelector,
  getTargetSelector
} from '../utils/parse'

// Track components and whether they have been initialised and public methods added, etc.
const trackComponents = {}

/**
 * The Component's base properties.
 *
 * @typedef {Object} ComponentProperties
 * @prop {String} _NS=LVL99:Component - Namespace for custom events and error reporting
 * @prop {String} _ns=lvl99-component - Namespace for CSS classes
 * @prop {Object} _properties - The properties shared between all instances of this Component
 * @prop {Array} _properties.publicMethods=[] - The names of Component methods to publicly expose in the DOM via custom events (attached during `init`).
 * @prop {undefined|jQueryObject} [_properties.$classTarget] - The target to apply any CSS classes to
 * @prop {Object} _attributes - The default attributes to load a created Component instance with
 * @prop {undefined|jQueryObject} $elem - The main element that represents the Component in the DOM. Component events will be managed through this element.
 */
const ComponentProperties = {
  _NS: 'LVL99:Component',
  _ns: 'lvl99-component',
  _properties: {
    publicMethods: [],
    $classTarget: undefined
  },
  _attributes: {
    $elem: undefined
  }
}

/**
 * Component Class.
 *
 * @class
 * @extends Entity
 */
export default class Component extends Entity {
  /**
   * Create a new Component instance.
   *
   * @param {Object} attributes - Attributes to pass to the newly created Component instance.
   */
  constructor (attributes) {
    // @debug
    // console.log('LVL99:Component:constructor', {
    //   arguments
    // })

    super(attributes)
  }

  /**
   * Extend the Component's properties with any extra properties/methods.
   *
   * @param {...ComponentProperties} properties
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
      if (hasPublicMethods && hasPublicMethods instanceof Array) {
        allPublicMethods = allPublicMethods.concat(hasPublicMethods)
      }
    })
    allPublicMethods = Array.from(new Set(allPublicMethods))

    // Extend the component's properties with the instantiated attributes and concatenated public methods
    super.extend(ComponentProperties, ...args, {
      _properties: {
        publicMethods: allPublicMethods
      }
    })
  }

  /**
   * Get the component's DOM element.
   *
   * @return {undefined|jQueryObject}
   */
  getElem () {
    // Soft return
    if (!this.getAttr('elem') && (!this.getAttr('$elem') || !this.getAttr('$elem').length)) {
      console.warn(`${this.NS}.getElem: no elem was found for this component. This may cause problems with components which rely on the elem attribute.`)
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
   * Mark the Component's element with necessary attributes.
   */
  markElem () {
    // Mark the element
    if (this.getElem() && this.getElem().length) {
      if (!this.getElem().attr('data-component')) {
        this.getElem().attr('data-component', this.NS)
      }

      if (!this.getElem().attr('data-component-id')) {
        this.getElem().attr('data-component-id', this.uuid)
      }

      this.triggerEvent('markElem:end')
    }
  }

  /**
   * Get the target to apply the CSS state classes to.
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
   * Get the attributes from the DOM element and place into the Component instance.
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
        console.error(`[${this.NS}] loadAttrs: Error loading attributes from DOM element`)
      }

      this._attributes = merge(this._attributes, attrs)

      // Once loaded, remove the component attributes from the DOM
      this.getElem().removeAttr('data-component-attributes')

      return this._attributes
    }
  }

  /**
   * Initialise Component.
   *
   * All extended components will need to fire the `super(...arguments)` to ensure the inherited lifecycle operations are fired.
   */
  init () {
    super.init(...arguments)

    // @debug
    // console.log(`[${this.NS:init}]`)

    // Track that the component has been initialised
    if (!trackComponents.hasOwnProperty(this.NS)) {
      trackComponents[this.NS] = {
        instances: {
          [`${this.uuid}`]: this
        }
      }
    } else {
      trackComponents[this.NS].instances[`${this.uuid}`] = this
    }

    // @debug
    // console.log(trackComponents)

    // Mark the element
    this.markElem()

    //
    // Attach Component's public methods to targets
    // Public methods can be triggered on the targets via `$(target).trigger('NAMESPACE:publicMethodName')`
    //
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
          throw new Error(`[${this.NS}] init: public method '${triggerDetails.do}' was not found on this component`)
        }

        // @debug
        // console.log(`[${this.NS}] init: public method "${triggerDetails.do}"`, {
        //   triggerDetails,
        //   method
        // })

        // Only attach public method if it hasn't been attached already or has a target
        if (!triggerDetails.hasOwnProperty('target') && Object.keys(trackComponents[this.NS].instances).length > 1) {
          // @debug
          // console.warn(`[${this.NS}] init: public method ${this.NS}:${triggerDetails.do} already assigned. Skipping...`)
          return
        }

        // Attach the method as a custom event to the target
        if (typeof method === 'function') {
          // Wrap the method into a closure
          let doComponentMethod = (jQueryEvent) => {
            // @debug
            // console.log(`Triggered ${this.NS}:${triggerDetails.do}`, {
            //   _class: this,
            //   _method: method,
            //   jQueryEvent,
            //   args: arguments
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
          throw new Error(`[${this.NS}] init: public method '${triggerDetails.do}' is not a valid function`)
        }
      })
    }

    // Load any attributes that were attached to the DOM element
    this.loadAttrs()

    /**
     * @event LVL99:Component:init:end
     */
    this.triggerEvent('init:end')
  }

  /**
   * Destroy and tear down the component.
   */
  destroy () {
    // @TODO tear down the house!
    // @TODO remove the bound public events
    // @TODO other garbage collection/memory management

    /**
     * @event LVL99:Component:destroy:beforeend
     */
    this.triggerEvent('destroy:beforeend')

    super.destroy(...arguments)
  }

  /**
   * Bind method to custom event on target.
   *
   * Event names are automatically namespaced using the Component's _NS property.
   *
   * To not use the component's own namespaced events, preface the `eventName` with `dom:`
   *
   * @param {String} eventName
   * @param {Function} method
   * @param {Object} target - Default is `document`. This is the target DOM element which the custom event will bubble up to
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

    // Extract the target event names from the input given
    let eventNames = extractTargetEventNames(eventName, this.NS)

    // @debug
    // console.log(`[${this.NS}] bindEventToTarget`, {
    //   eventName,
    //   method,
    //   target,
    //   triggerName: targetEventNames
    // })

    // Assign the trigger
    if (eventNames) {
      $(target).on(eventNames.join(' '), method)
    }
  }

  /**
   * Bind method to custom event on target with an element selector.
   *
   * Event names are automatically namespaced using the Component's _NS property.
   *
   * @param {String} eventName
   * @param {String} selector - Target a specific element (via query selector) to trigger the event
   * @param {Function} method
   * @param {Object} target - Default is `document`. This is the target DOM element which the custom event will bubble up to
   */
  bindEventToTargetSelector (eventName, selector, method, target) {
    target = getTargetBySelector(target, this)
    selector = getTargetSelector(selector, this)
    let eventNames = extractTargetEventNames(eventName, this.NS)

    // @debug
    // console.log(`[${this.NS}] bindEventToTargetSelector`, {
    //   eventName,
    //   selector,
    //   method,
    //   target,
    //   triggerName: `${this.NS}:${eventName}`
    // })

    if (eventNames) {
      $(target).on(eventNames.join(' '), selector, method)
    }
  }

  /**
   * Trigger a custom document event on the Component.
   *
   * The event triggered will be `${this.NS}:eventName`.
   *
   * @param {String} eventName
   * @param {Any} ...args
   */
  triggerEvent (eventName, ...args) {
    // @debug
    // console.log(`[${this.NS}] triggerEvent: ${this.NS}:${eventName}`)

    // Always pass the component as the first argument parameter
    $doc.trigger(`${this.NS}:${eventName}`, [this, ...args])
  }

  /**
   * Trigger a custom document event on an element on the Component.
   * The event triggered will be `${this.NS}:eventName`.
   *
   * @param {String} eventName
   * @param {String} selector
   * @param {Any} ...args
   */
  triggerEventOnSelector (eventName, selector, ...args) {
    selector = getTargetSelector(selector, this)

    // @debug
    // console.log(`[${this.NS}] triggerEventOnSelector: ${this.NS}:${eventName}`)

    // Always pass the component as the first argument parameter
    $(selector).trigger(`${this.NS}:${eventName}`, [this, ...args])
  }
}
