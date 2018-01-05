/**
 * LVL99 Track Event
 *
 * Caches tracked events until Google Analytics is loaded, then uploads to GA
 *
 * @module lvl99/tools/trackevent
 * @requires module:lodash.merge
 * @requires module:lvl99/tools/storage
 */

const __loggerPath = 'LVL99:TrackEvent'
import merge from 'lodash.merge'
import Storage, { LOCAL_STORAGE } from './storage'

// Save events locally if GA isn't online
const STORAGE = new Storage({
  storageType: LOCAL_STORAGE
})
const STORAGE_KEY = 'LVL99:TrackedEvents'

export default function TrackEvent (debug, cb) {
  /**
   * Detect if GA is loaded and then send any stored GA events
   */
  let attempts = 0
  const checkGALoaded = () => {
    attempts++

    if (debug && window.console && window.console.log) {
      console.log(`[${__loggerPath}] Checking for GA loaded... (#${attempts})`)
    }

    // Check if GA object is available
    if (window.hasOwnProperty('ga') && window.ga && typeof window.ga === 'function') {
      if (debug && window.console && window.console.log) {
        console.log(`[${__loggerPath}] --> Found GA!`)
      }

      // Fire the callback when GA is loaded
      if (typeof cb === 'function') {
        cb.call(this)
      }

      // Send any saved events
      let trackedEvents = STORAGE.getItem(STORAGE_KEY)
      if (trackedEvents && trackedEvents.length > 0) {
        if (debug && window.console && window.console.log) {
          console.log(`[${__loggerPath}] --> Sending ${trackedEvents.length} tracked events to GA`, { trackedEvents })
        }

        for (let index in trackedEvents) {
          if (trackedEvents.hasOwnProperty(index)) {
            window.ga('send', trackedEvents[index])
          }
        }

        // Clear the saved events
        trackedEvents = []
        STORAGE.removeItem(STORAGE_KEY)
      }

      return
    }

    // Cap attempts to detect GA
    if (attempts >= 5) {
      if (debug && window.console && window.console.log) {
        console.warn(`[${__loggerPath}] --> Halted testing for GA to be loaded: maximum ${attempts} attempts reached.`)
      }
    } else {
      if (debug && window.console && window.console.log) {
        console.log(`[${__loggerPath}] --> GA not found... will try again`)
      }

      this.gaLoadedTimer = setTimeout(checkGALoaded, 5000)
    }
  }
  this.gaLoadedTimer = setTimeout(checkGALoaded, 5000)

  /**
   * Track an event.
   *
   * @param {String} eventCategory
   * @param {String} eventAction
   * @param {String} eventLabel
   * @param {Number} [eventValue]
   * @param {Object} [fieldsObject]
   */
  this.track = (eventCategory, eventAction, eventLabel, eventValue, fieldsObject = {}) => {
    let trackedEvent = merge({
      hitType: 'event',
      eventCategory,
      eventAction,
      eventLabel,
      eventValue
    }, fieldsObject)

    // GA is loaded
    if (typeof window.ga !== 'undefined') {
      if (debug && window.console && window.console.log) {
        console.log(`[${__loggerPath}] Send tracked event to GA`, trackedEvent)
      }

      window.ga('send', trackedEvent)

      // waiting for GA to load, use internal var to collect
    } else {
      if (debug && window.console && window.console.log) {
        console.log(`[${__loggerPath}] GA not loaded yet, caching tracked event...`, trackedEvent)
      }

      let trackedEvents = STORAGE.getItem(STORAGE_KEY) || []
      trackedEvents.push(trackedEvent)
      STORAGE.setItem(STORAGE_KEY, trackedEvents)
    }
  }
}
