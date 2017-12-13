/**
 * # Entity
 *
 * Base class used for programmable entities within the app, such as the app, its components, or other such entities
 * that rely on storing state and lifecycle methods.
 *
 * ## Lifecycle Methods
 *
 * All entities have these 4 core lifecycle methods:
 *   - `constructor` - Create a new instance: `new Entity()`
 *   - `extend` - For extending the instance itself: `entityInstance.extend(...)`
 *   - `init` - Initialising the created instance: `entityInstance.init()`
 *   - `destroy` - Teardown and destroying the instance: `entityInstance.destroy()`
 *
 * {App} and {Component} classes extend from the base {Entity} class.
 *
 * When a class is classically extended, these lifecycle methods will need to be defined to fire the super's related
 * lifecycle method through the `super[.<methodName>](...arguments)` call:
 *
 * ```
 * // Define your new component class which extends the base Component and Entity classes
 * class NewComponent extends Component {
 *   // Fired when the component instance is created.
 *   constructor (attributes) {
 *     super(attributes)
 *   }
 *
 *   // Fired when the component instance is being extended, such as to compose the instance with extra behaviours.
 *   extend () {
 *     super.extend(...arguments)
 *   }
 *
 *   // This method fires when the component is being initialised in the browser.
 *   init () {
 *     super.init(...arguments)
 *
 *     // Put your code here to fire after the super's init method
 *   }
 *
 *   destroy () {
 *     // Put your code here to fire before the super's destroy method.
 *
 *     super.destroy(...arguments)
 *   }
 *
 *   // ... the rest of your component code
 * }
 * ```
 *
 * # Properties versus attributes
 *
 *   - ***Properties are shared between all related entities***
 *     Use properties to share common values, instances, functionality between entities.
 *
 *     Using properties means you can attach a single instance of another entity which can be shared between all
 *     the instances of the class. Services, stores and other higher-level entities can effectively be utilised here.
 *
 *   - ***Attributes are only available to the entity instance.***
 *     Use attributes when you want to set values per instance.
 *
 * Properties and attributes should be retrieved and assigned using the respective `getProp`/`getAttr` and `setProp`/
 * `setAttr` entity methods.
 *
 * @module lvl99/core/entity
 * @requires module:object-path
 * @requires module:uuid
 * @requires module:lodash.merge
 * @requires module:lvl99/utils/inheritance
 */

import merge from 'lodash.merge'
import uuid from 'uuid'
import objectPath from 'object-path'
import { exposePrivateProperties } from '../utils/inheritance'

/**
 * The Entity's base properties.
 *
 * @typedef {Object} AppProperties
 * @prop {String} _NS=LVL99:Entity - Namespace for custom events and error reporting
 * @prop {String} _ns=lvl99-entity - Namespace for CSS classes
 * @prop {Object} _properties - The properties shared between all instances of this App
 * @prop {Object} _attributes - The default attributes to load a created App instance with
 */
const EntityProperties = {
  _NS: 'LVL99:Entity',
  _ns: 'lvl99-entity',
  _properties: {},
  _attributes: {}
}

/**
 * Entity Class.
 *
 * @class
 * @prop {String} uuid - All entities will be assigned a unique identifier when they are created.
 */
export default class Entity {
  /**
   * Entity constructor.
   *
   * @constructor
   * @param {Object} attributes - Attributes to pass to the newly created Entity instance.
   */
  constructor (attributes) {
    // @debug
    // console.log('LVL99:Entity:constructor', {
    //   attributes
    // })

    this.extend({
      _attributes: attributes
    })

    // Expose private values
    exposePrivateProperties(this)

    // Create a unique ID for this Entity
    Object.defineProperty(this, 'uuid', {
      value: `${this.NS}:${uuid.v4()}`,
      writable: false,
      enumerable: true,
      configurable: false
    })
  }

  /**
   * Extend the Entity with any given {Object} arguments.
   *
   * @param {...EntityProperties} entityProperties
   */
  extend () {
    // @debug
    // console.log('LVL99:Entity:extend', {
    //   args
    // })

    // Merge the properties with the instantiated attributes and concatenated public methods
    merge(this, EntityProperties, ...arguments)

    return this
  }

  /**
   * Get an Entity's property value by name.
   *
   * You can get a property value using an object path format, e.g. `name.of.the.value`
   *
   * @param {String} propName
   * @return {*}
   * @throws Error
   */
  getProp (propName) {
    if (!propName || typeof propName !== 'string') {
      throw new Error(`[${this.NS}] get: 'propName' value is invalid`)
    }

    return objectPath.get(this.properties, propName)
  }

  /**
   * Set an Entity's property to a value.
   *
   * Same as `getProp`, `setProp` works by using the object path format, e.g. `name.of.the.value`
   *
   * @param {String} propName
   * @param {*} propValue
   * @throws Error
   */
  setProp (propName, propValue) {
    if (!propName || typeof propName !== 'string') {
      throw new Error(`[${this.NS}] set: 'propName' value is invalid`)
    }

    return objectPath.set(this.properties, propName, propValue)
  }

  /**
   * Get an Entity's attribute value by name.
   *
   * @param {String} attrName
   * @return {Mixed}
   * @throws Error
   */
  getAttr (attrName) {
    if (!attrName || typeof attrName !== 'string') {
      throw new Error(`[${this.NS}] getAttr: 'attrName' value is invalid`)
    }

    return objectPath.get(this.attributes, attrName)
  }

  /**
   * Set an Entity's property to a value.
   *
   * @param {String} attrName
   * @param {Mixed} attrValue
   */
  setAttr (attrName, attrValue) {
    if (!attrName || typeof attrName !== 'string') {
      throw new Error(`[${this.NS}] setAttr: 'attrName' value is invalid`)
    }

    return objectPath.set(this.attributes, attrName, attrValue)
  }

  /**
   * Initialise the Entity
   */
  init () {}

  /**
   * Destroy and tear down the component
   */
  destroy () {}
}
