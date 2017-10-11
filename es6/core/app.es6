/**
 * LVL99 App
 *
 * @package lvl99
 */

// const Promise = require('bluebird')
const $ = require('jquery')
const uuid = require('uuid')
const Entity = require('./entity')
const {
  convertStringToJson,
  extractClassDetails
} = require('../utils/parse')

/**
 * Get a component's namespace
 *
 * @private
 * @param {Component} component
 * @returns {undefined|String|Component}
 */
function getComponentNamespace (component) {
  let componentNS = component

  // Function/class given
  if (typeof component === 'function') {
    if (component.NS) {
      componentNS = component.NS
    } else {
      componentNS = component.prototype.constructor.name
    }
  }

  return componentNS
}

/**
 * The App's base properties
 *
 * @type {Object}
 */
const AppProperties = {
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
}

/**
 * App
 *
 * @class
 * @extends Entity
 */
class App extends Entity {
  /**
   * App constructor
   *
   * @constructor
   * @param {Object} attributes
   */
  constructor (attributes) {
    // @debug
    // console.log(`LVL99:App:constructor`)

    super(attributes)
  }

  /**
   * Extend the App with any given {Object} arguments
   *
   * @param {Object} ...arguments
   */
  extend () {
    // @debug
    // console.log(`LVL99:App:extend`, {
    //   arguments
    // })

    // Merge the properties with the instantiated attributes
    super.extend(AppProperties, ...arguments)
  }

  /**
   * Register a component class in the app. You can also specify a separate namespace to register it under.
   *
   * @param {Component} componentClass
   * @param {String} componentClassNamespace
   */
  registerComponentClass (componentClass, componentClassNamespace) {
    let componentClassNS

    // No valid componentClass given
    if (!componentClass) {
      throw new Error('No component class was given')
    }

    // Get the namespace from the component class (or otherwise specified)
    componentClassNS = getComponentNamespace(componentClassNamespace || componentClass)

    // Register the component class
    if (componentClassNS) {
      this._components[componentClassNS] = componentClass
    }
  }

  /**
   * Deregister a component class by namespace
   *
   * @param {String|Component} componentClassNamespace
   */
  deregisterComponentClass (componentClassNamespace) {
    let componentClassNS

    // No valid componentClass given
    if (!componentClassNamespace) {
      throw new Error('No component class namespace was given')
    }

    // Get the namespace
    componentClassNS = getComponentNamespace(componentClassNamespace)

    // Remove the component class
    if (componentClassNS && this._components.hasOwnProperty(componentClassNS)) {
      this._components[componentClassNS] = undefined
      delete this._components[componentClassNS]
    }
  }

  /**
   * Get a component class by namespace
   *
   * @param {String} componentClassNamespace
   * @return {undefined|Component}
   */
  getComponentClass (componentClassNamespace) {
    let componentClassNS = componentClassNamespace

    if (!componentClassNamespace) {
      throw new Error('No component class namespace was given')
    }

    // Get the component class
    if (componentClassNS && this._components.hasOwnProperty(componentClassNS)) {
      return this._components[componentClassNS]
    }

    return undefined
  }

  /**
   * Add component instance to app and initialise the component instance
   *
   * @param {Component} componentInstance
   */
  addComponentInstance (componentInstance) {
    componentInstance._app = this

    // Add component instance to collection
    this._componentInstances[componentInstance.uuid] = componentInstance

    // Initialise the component
    componentInstance.init()
  }

  /**
   * Create component instance
   *
   * @param {String} componentClassNamespace
   * @param {Object} attributes
   * @returns {Component}
   */
  createComponentInstance (componentClassNamespace, attributes) {
    // @debug
    // console.log(`${this.NS}.createComponentInstance: ${componentClassNamespace}`)

    // Create and initialise the component
    if (this._components.hasOwnProperty(componentClassNamespace)) {
      let newComponent = new this._components[componentClassNamespace](attributes)

      // @debug
      // console.log(`${this.NS}.createComponentInstance`, {
      //   componentClassNamespace,
      //   newComponent,
      //   attributes
      // })

      // Add instance to app
      this.addComponentInstance(newComponent)

      return newComponent
    }
  }

  /**
   * Get a component instance by UUID
   *
   * @param {String} componentUUID
   * @returns {undefined|Component}
   */
  getComponentInstance (componentUUID) {
    // @debug
    // console.log(`${this.NS}.getComponentInstance: ${componentUUID}`)

    if (this._componentInstances.hasOwnProperty(componentUUID)) {
      return this._componentInstances[componentUUID]
    }

    return undefined
  }

  /**
   * Remove component instance by UUID
   *
   * @param {Component} componentUUID
   */
  removeComponentInstance (componentUUID) {
    // @debug
    // console.log(`${this.NS}.removeComponentInstance: ${componentUUID}`)

    let removeComponentInstance = this.getComponentInstance(componentUUID)
    if (typeof removeComponentInstance !== 'undefined') {
      // @debug
      // console.log(`${this.NS}.removeComponentInstance: found component instance to remove`, removeComponentInstance)

      removeComponentInstance.destroy()

      // @TODO the following should probably only happen after a Promise is resolved
      // Remove entry in the componentInstances object
      this._componentInstances[componentUUID] = undefined
      delete this._componentInstances[componentUUID]
    }
  }

  /**
   * Initialise any component which is marked in the DOM
   */
  initialiseComponents () {
    // Find any element marked with the `[data-component]` attribute
    $('[data-component]')
      // Ignore components which already have an ID assigned
      .not('[data-component-id]')
      // Initialise each component
      .each((index, elem) => {
        let $elem = $(elem)
        let elemComponentClass = $elem.attr('data-component')
        let elemComponentOptions = $elem.attr('data-component-options') || {}

        // @debug
        // console.log(`${this._NS}.initialiseComponents: found element to initialise with component`, {
        //   index,
        //   elem,
        //   elemComponentClass,
        //   elemComponentOptions
        // })

        // Ensure component class is registered
        if (!this.getComponentClass(elemComponentClass)) {
          // @debug
          // console.error(`${this._NS}.initialiseComponents: element's component class not registered`, {
          //   app: this,
          //   index,
          //   elem,
          //   elemComponentClass,
          //   elemComponentOptions
          // })
          return
        }

        // Extract/convert the options
        if (typeof elemComponentOptions === 'string') {
          // Set as JSON, e.g. '{"name":"value"}`
          if (/^\{/.test(elemComponentOptions)) {
            elemComponentOptions = convertStringToJson(elemComponentOptions)

            // Set as style-like attributes, e.g. `name: value; name: value`
          } else {
            elemComponentOptions = extractClassDetails(elemComponentOptions)
          }
        }

        // Add the $elem if it is not already set
        if (!elemComponentOptions.hasOwnProperty('$elem')) {
          elemComponentOptions.$elem = $elem
        }

        // Create the component
        let elemComponentInstance = this.createComponentInstance(elemComponentClass, elemComponentOptions)

        // @debug
        // console.log('Initialised component instance', {
        //   index,
        //   elem,
        //   elemComponentOptions,
        //   elemComponentInstance
        // })
      })
  }
}

module.exports = App
