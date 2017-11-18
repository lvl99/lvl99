var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * LVL99 Entity
 *
 * Base class used for programmable entities within the app, such as components or other such entities that rely on
 * state and lifecycle functions.
 *
 * @package lvl99
 */

import uuid from 'uuid';
import merge from 'lodash.merge';
import objectPath from 'object-path';
import { exposePrivateProperties } from '../utils/inheritance';

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
    //   arguments
    // })

    this.extend({
      _attributes: attributes
    });

    // Expose private values
    exposePrivateProperties(this);

    // Create a unique ID for this Entity
    Object.defineProperty(this, 'uuid', {
      value: this.NS + ':' + uuid.v4(),
      writable: false,
      enumerable: true,
      configurable: false
    });
  }

  /**
   * Extend the Entity with any given {Object} arguments
   *
   * @param {Object} ...arguments
   * @returns {Self}
   */


  _createClass(Entity, [{
    key: 'extend',
    value: function extend() {
      // @debug
      // console.log('LVL99:Entity:extend', {
      //   arguments
      // })

      // Merge the properties with the instantiated attributes and concatenated public methods
      merge.apply(undefined, [this, EntityProperties].concat(Array.prototype.slice.call(arguments)));

      return this;
    }

    /**
     * Get an Entity's property value.
     *
     * @param {String} propName
     * @return {Mixed}
     */

  }, {
    key: 'getProp',
    value: function getProp(propName) {
      if (!propName || typeof propName !== 'string') {
        throw new Error('[' + this.NS + '] get: \'propName\' value is invalid');
      }

      return objectPath.get(this.properties, propName);
    }

    /**
     * Set an Entity's property to a value.
     *
     * @param {String} propName
     * @param {Mixed} propValue
     */

  }, {
    key: 'setProp',
    value: function setProp(propName, propValue) {
      if (!propName || typeof propName !== 'string') {
        throw new Error('[' + this.NS + '] set: \'propName\' value is invalid');
      }

      return objectPath.set(this.properties, propName, propValue);
    }

    /**
     * Get an Entity's attribute value.
     *
     * @param {String} attrName
     * @return {Mixed}
     */

  }, {
    key: 'getAttr',
    value: function getAttr(attrName) {
      if (!attrName || typeof attrName !== 'string') {
        throw new Error('[' + this.NS + '] getAttr: \'attrName\' value is invalid');
      }

      return objectPath.get(this.attributes, attrName);
    }

    /**
     * Set an Entity's property to a value.
     *
     * @param {String} attrName
     * @param {Mixed} attrValue
     */

  }, {
    key: 'setAttr',
    value: function setAttr(attrName, attrValue) {
      if (!attrName || typeof attrName !== 'string') {
        throw new Error('[' + this.NS + '] setAttr: \'attrName\' value is invalid');
      }

      return objectPath.set(this.attributes, attrName, attrValue);
    }

    /**
     * Initialise the Entity
     */

  }, {
    key: 'init',
    value: function init() {}

    /**
     * Destroy and tear down the component
     */

  }, {
    key: 'destroy',
    value: function destroy() {}
  }]);

  return Entity;
}();

export default Entity;