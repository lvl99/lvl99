/**
 * # Storage
 *
 * Utilise modern browser features like localStorage and sessionStorage (if available within the environment).
 */

import merge from 'lodash.merge'
import { coerceToPrimitiveType } from '../utils/parse'

// Types of storage
export const SESSION_STORAGE = 'sessionStorage'
export const LOCAL_STORAGE = 'localStorage'
export const STORAGE_TYPES = [SESSION_STORAGE, LOCAL_STORAGE]

/**
 * Test to see if a storage type works within the environment
 *
 * @param {String} storageType
 * @return {Boolean}
 */
export function testStorageType (storageType) {
  try {
    let envStorage = window[storageType]
    let x = '__test__storage__'
    envStorage.setItem(x, storageType)
    envStorage.removeItem(x)
    return true
  } catch (e) {
    return false
  }
}

/**
 * Get the supported types of storage
 *
 * @return {Object} with name of storage type as keys with {Boolean} value
 */
export function getSupportedStorageTypes () {
  let supports = {}

  // Build the object from the constant's values
  STORAGE_TYPES.forEach((storageType, index) => {
    supports[storageType] = testStorageType(storageType)
  })

  return supports
}

/**
 * Perform a callback on each supported (or not) storage type
 *
 * @param {Function} cb
 */
export function eachStorageType (cb) {
  let supported = getSupportedStorageTypes()

  for (let storageType in supported) {
    if (supported.hasOwnProperty(storageType)) {
      cb.apply(this, [storageType, supported[storageType], supported])
    }
  }
}

/**
 * Storage class
 */
export default class Storage {
  /**
   * Create the storage class
   *
   * @param options
   */
  constructor (options) {
    this.settings = merge({
      // default to localStorage
      storageType: LOCAL_STORAGE
    }, options)

    return this
  }

  /**
   * Reset a single storage type
   *
   * @param storageType
   */
  clear (storageType) {
    // Use default storage type
    if (!storageType) {
      storageType = this.settings.storageType
    }

    if (!testStorageType(storageType)) {
      throw new Error(`Storage type ${storageType} not supported`)
    }

    window[storageType].clear()
  }

  /**
   * Reset all the data within all supported storage types
   */
  clearAll () {
    eachStorageType((storageType, isSupported) => {
      if (isSupported) {
        window[storageType].clear()
      }
    })
  }

  /**
   * Clear local storage
   */
  clearLocal () {
    this.clear(LOCAL_STORAGE)
  }

  /**
   * Clear session storage
   */
  clearSession () {
    this.clear(SESSION_STORAGE)
  }

  /**
   * Get stored item's value by key from a specified storage type
   *
   * @param {String} name The name of the data to retrieve from storage
   * @param {String} storageType The name of the storage type to retrieve from
   * @return {Mixed}
   * @throws {Error}
   */
  getItem (name, storageType) {
    // Use default storage type
    if (!storageType) {
      storageType = this.settings.storageType
    }

    // Check if storage type is available
    if (!testStorageType(storageType)) {
      throw new Error(`Storage type ${storageType} not supported`)
    }

    // Ensure value is coerced since storage stores as JSON/string
    return coerceToPrimitiveType(window[storageType].getItem(name))
  }

  /**
   * Get stored item's value by key from local storage
   *
   * @param {String} name The name of the data to retrieve from storage
   * @return {Mixed}
   */
  getItemLocal (name) {
    return this.getItem(name, LOCAL_STORAGE)
  }

  /**
   * Get stored item's value by key from session storage
   *
   * @param {String} name The name of the item to retrieve from storage
   * @return {Mixed}
   */
  getItemSession (name) {
    return this.getItem(name, SESSION_STORAGE)
  }

  /**
   * Set an item's value in a specified storage type
   *
   * @param {String} name The name of the item to set in storage
   * @param {Mixed} value
   * @param {String} storageType
   * @throws {Error}
   */
  setItem (name, value, storageType) {
    // Use default storage type
    if (!storageType) {
      storageType = this.settings.storageType
    }

    // Check if storage type is available
    if (!testStorageType(storageType)) {
      throw new Error(`Storage type ${storageType} not supported`)
    }

    window[storageType].setItem(name, JSON.stringify(value))
  }

  /**
   * Set an item's value in the local storage
   *
   * @param {String} name The name of the item to set in local storage
   * @param {Mixed} value
   */
  setItemLocal (name, value) {
    this.setItem(name, value, LOCAL_STORAGE)
  }

  /**
   * Set an item's value in the session storage
   *
   * @param {String} name The name of the item to set in session storage
   * @param {Mixed} value
   */
  setItemSession (name, value) {
    this.setItem(name, value, SESSION_STORAGE)
  }

  /**
   * Remove an item from the default storage type
   *
   * @param {String} name The name of the item to remove from the storage type
   * @param {String} storageType
   * @throws {Error}
   */
  removeItem (name, storageType) {
    // Use default storage type
    if (!storageType) {
      storageType = this.settings.storageType
    }

    // Check if storage type is available
    if (!testStorageType(storageType)) {
      throw new Error(`Storage type ${storageType} not supported`)
    }

    window[storageType].removeItem(name)
  }

  /**
   * Remove an item from local storage type
   *
   * @param {String} name The name of the item to remove from local storage
   * @throws {Error}
   */
  removeItemLocal (name) {
    this.removeItem(name, LOCAL_STORAGE)
  }

  /**
   * Remove an item from session storage
   *
   * @param {String} name The name of the item to remove from session storage
   * @throws {Error}
   */
  removeItemSession (name) {
    this.removeItem(name, SESSION_STORAGE)
  }
}
