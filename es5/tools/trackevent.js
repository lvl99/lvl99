'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TrackEvent;

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * LVL99 Track Event
 *
 * Caches tracked events until Google Analytics is loaded, then uploads to GA
 *
 * @module lvl99/tools/trackevent
 * @requires module:lvl99/tools/storage
 */

var __loggerPath = 'LVL99:TrackEvent';


// Save events locally if GA isn't online
var STORAGE = new _storage2.default({
  storageType: _storage.LOCAL_STORAGE
});
var STORAGE_KEY = 'LVL99:TrackedEvents';

function TrackEvent(debug) {
  var _this = this;

  /**
   * Detect if GA is loaded and then send any stored GA events
   */
  var attempts = 0;
  var checkGALoaded = function checkGALoaded() {
    attempts++;

    if (debug && window.console && window.console.log) {
      console.log('[' + __loggerPath + '] Checking for GA loaded... (#' + attempts + ')');
    }

    // Check if GA object is available
    if (window.hasOwnProperty('ga') && window.ga && typeof window.ga === 'function') {
      if (debug && window.console && window.console.log) {
        console.log('[' + __loggerPath + '] --> Found GA!');
      }

      // Send any saved events
      var trackedEvents = STORAGE.getItem(STORAGE_KEY);
      if (trackedEvents && trackedEvents.length > 0) {
        if (debug && window.console && window.console.log) {
          console.log('[' + __loggerPath + '] --> Sending ' + trackedEvents.length + ' tracked events to GA', { trackedEvents: trackedEvents });
        }

        for (var index in trackedEvents) {
          if (trackedEvents.hasOwnProperty(index)) {
            window.ga('send', trackedEvents[index]);
          }
        }

        // Clear the saved events
        trackedEvents = [];
        STORAGE.removeItem(STORAGE_KEY);
      }

      return;
    }

    // Cap attempts to detect GA
    if (attempts >= 5) {
      if (debug && window.console && window.console.log) {
        console.warn('[' + __loggerPath + '] --> Halted testing for GA to be loaded: maximum ' + attempts + ' attempts reached.');
      }
    } else {
      if (debug && window.console && window.console.log) {
        console.log('[' + __loggerPath + '] --> GA not found... will try again');
      }

      _this.gaLoadedTimer = setTimeout(checkGALoaded, 5000);
    }
  };
  this.gaLoadedTimer = setTimeout(checkGALoaded, 5000);

  /**
   * Track an event magic.
   *
   * @param {String} eventCategory
   * @param {String} eventAction
   * @param {String} eventLabel
   * @param {Number} [eventValue]
   */
  this.track = function (eventCategory, eventAction, eventLabel, eventValue) {
    var trackedEvent = {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: eventAction,
      eventLabel: eventLabel,
      eventValue: eventValue

      // Required fields
    };if (!eventCategory || !eventAction) {
      return;
    }

    // Event value must be string
    if (typeof eventValue === 'string') {
      return;
    }

    // GA is loaded
    if (typeof window.ga !== 'undefined') {
      if (debug && window.console && window.console.log) {
        console.log('Send tracked event to GA', trackedEvent);
      }
      window.ga('send', trackedEvent);

      // waiting for GA to load, use internal var to collect
    } else {
      if (debug && window.console && window.console.log) {
        console.log('GA not loaded yet, caching tracked event...', trackedEvent);
      }

      var trackedEvents = STORAGE.getItem(STORAGE_KEY) || [];
      trackedEvents.push(trackedEvent);
      STORAGE.setItem(STORAGE_KEY, trackedEvents);
    }
  };
}