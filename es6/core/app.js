/**
 * LVL99 App
 *
 * @package lvl99
 */

// const Promise = require('bluebird')
const uuid = require('uuid')
const Entity = require('./entity')

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
   * Add component instance to app and initialise the component instance
   *
   * @param {Component} componentInstance
   */
  addComponentInstance (componentInstance) {
    componentInstance._app = this

    // Add component instance to collection
    this._componentInstances[componentInstance._uuid] = componentInstance

    // Initialise the component
    componentInstance.init()
  }

  /**
   * Create component instance
   *
   * @param {String} componentType
   * @param {Object} attributes
   * @returns {Component}
   */
  createComponentInstance (componentType, attributes) {
    // @debug
    // console.log(`${this._NS}.getComponentInstance: ${componentUUID}`)

    // Create and initialise the component
    if (this._components.hasOwnProperty(componentType)) {
      let newComponent = new this._components[componentType](attributes)

      // @debug
      // console.log(`${this._NS}.createComponentInstance`, {
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
    // console.log(`${this._NS}.getComponentInstance: ${componentUUID}`)

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
    // console.log(`${this._NS}.removeComponentInstance: ${componentUUID}`)

    let removeComponentInstance = this.getComponentInstance(componentUUID)
    if (typeof removeComponentInstance !== 'undefined') {
      // @debug
      // console.log(`${this._NS}.removeComponentInstance: found component instance to remove`, removeComponentInstance)

      removeComponentInstance.destroy()

      // @TODO the following should probably only happen after a Promise is resolved
      // Remove entry in the componentInstances object
      this._componentInstances[componentUUID] = undefined
      delete this._componentInstances[componentUUID]
    }
  }
}

module.exports = App
