/**
 * LVL99 Track Event
 *
 * Caches tracked events until Google Analytics is loaded, then uploads to GA
 *
 * @package lvl99
 */

export default function TrackEvent (debug) {
  /**
   * Collect tracked events before GA is loaded
   * @private
   * @type {Array}
   */
  this.saved = []

  /**
   * Detect if GA is loaded and then send any stored GA events
   */
  this.gaLoadedTimer = setInterval((function checkGaLoaded (lvl99TrackEvent) {
    let index

    // Wait until GA object is available
    if (typeof window.ga !== 'undefined') {
      clearInterval(lvl99TrackEvent.gaLoadedTimer)

      // Send saved events
      if (lvl99TrackEvent.saved.length > 0) {
        if (debug && window.console && window.console.log) {
          console.log(`Sending ${lvl99TrackEvent.saved.length} tracked events to ga`)
        }

        for (let index in lvl99TrackEvent.saved) {
          if (lvl99TrackEvent.saved.hasOwnProperty(index)) {
            window.ga('send', lvl99TrackEvent.saved[index])
          }
        }
        lvl99TrackEvent.saved = []
      }
    }
  }(this)), 5000)

  /**
   * Track an event magic.
   *
   * @param {String} eventCategory
   * @param {String} eventAction
   * @param {String} eventLabel
   * @param {Number} eventValue
   */
  this.track = function (eventCategory, eventAction, eventLabel, eventValue) {
    let trackedEvent = {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: eventAction,
      eventLabel: eventLabel,
      eventValue: eventValue
    }

    if (!eventCategory || !eventAction) return;
    if (typeof eventValue === 'string') return;

    // GA is loaded
    if (typeof window.ga !== 'undefined') {
      if (debug && window.console && window.console.log) {
        console.log('Send tracked event to GA', trackedEvent)
      }
      window.ga('send', trackedEvent)

      // waiting for GA to load, use internal var to collect
    } else {
      if (debug && window.console && window.console.log) {
        console.log('GA not loaded yet, caching tracked event...', trackedEvent)
      }
      this.saved.push(trackedEvent)
    }
  }
}
