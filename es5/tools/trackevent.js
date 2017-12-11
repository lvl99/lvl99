(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.trackevent = mod.exports;
  }
})(this, function (module, exports) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['module', 'exports'], factory);
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports);
      global.trackevent = mod.exports;
    }
  })(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = TrackEvent;
    /**
     * # Track Event
     *
     * Caches tracked events until Google Analytics is loaded, then uploads to GA.
     */

    function TrackEvent(debug) {
      /**
       * Collect tracked events before GA is loaded.
       *
       * @type {Array}
       */
      var saved = [];

      /**
       * Detect if GA is loaded and then send any stored GA events.
       */
      this.gaLoadedTimer = setInterval(function (lvl99TrackEvent) {
        var index = void 0;

        // Wait until GA object is available
        if (typeof window.ga !== 'undefined') {
          clearInterval(lvl99TrackEvent.gaLoadedTimer);

          // Send saved events
          if (lvl99TrackEvent.saved.length > 0) {
            if (debug && window.console && window.console.log) {
              console.log('Sending ' + lvl99TrackEvent.saved.length + ' tracked events to ga');
            }

            for (i in lvl99TrackEvent.saved) {
              if (lvl99TrackEvent.saved.hasOwnProperty(index)) {
                window.ga('send', lvl99TrackEvent.saved[index]);
              }
            }
            lvl99TrackEvent.saved = [];
          }
        }
      }(this), 5000);

      /**
       * Track an event.
       *
       * @param {String} eventCategory
       * @param {String} eventAction
       * @param {String} eventLabel
       * @param {String} eventValue
       */
      return function track(eventCategory, eventAction, eventLabel, eventValue) {
        var trackedEvent = {
          hitType: 'event',
          eventCategory: eventCategory,
          eventAction: eventAction,
          eventLabel: eventLabel,
          eventValue: eventValue
        };

        if (!eventCategory || !eventAction) return;
        if (typeof eventValue === 'string') return;

        // GA is loaded
        if (typeof window.ga !== 'undefined') {
          if (debug && window.console && window.console.log) {
            console.log('Send trackedEvent to GA', trackedEvent);
          }
          window.ga('send', trackedEvent);

          // waiting for GA to load, use internal var to collect
        } else {
          if (debug && window.console && window.console.log) {
            console.log('GA not loaded yet, store trackedEvent', trackedEvent);
          }
          this.saved.push(trackedEvent);
        }
      };
    }
    module.exports = exports['default'];
  });
});