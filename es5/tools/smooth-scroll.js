'use strict';

/**
 * LVL99 Smooth Scroll
 *
 * Smoothly scroll to internal anchor links on a page.
 *
 * ## Usage
 *
 * Smooth Scroll needs to be initialised with jQuery and any configured options. During initialisation the script will
 * apply the behaviours to any applicable anchor links.
 *
 * ```
 *   let SmoothScroll = require('lvl99/es6/tools/smooth-scroll')(jQuery, { bufferTop: 0 })
 * ```
 *
 * You can also initialise the smoothScroll behaviours by calling `smoothScroll.init()`. This will attach the necessary
 * events on to anchor links.
 *
 * You can trigger the scrollTo event by using the custom event `SmoothScroll.scrollTo`, e.g.:
 *
 * ```
 *   $(document).trigger('SmoothScroll.scrollTo', [ scrollToOptions ])
 * ```
 *
 * The `scrollTo` function emits a custom event `SmoothScroll.scrollTo:start` when the action is invoked and
 * `SmoothScroll.scrollTo:end` when it finishes.
 *
 * @package lvl99
 */

var SmoothScroll = function SmoothScroll($, options) {
  /**
   * Load in the settings
   */
  var settings = $.extend({
    // The space between the top of the window and the top of the target
    bufferTop: 0,

    // The speed to scroll the window
    scrollSpeed: 1000,

    // The distance from top of window to top of target element to trigger scrolling
    triggerDistance: 400
  }, options);

  /**
   * Smoothly scroll to a target
   *
   * @param {String|HTMLElement|jQueryObject} target
   */
  function scrollTo(target, scrollToOptions) {
    // Figure out element to scroll to
    var $target = $(target).not('[data-disable-smooth-scroll]');

    // More than one target, default to first
    $target = $target.length > 1 ? $target.eq(0) : $target;

    // Does a scroll target exist?
    if ($target.length === 1) {
      // Load in per-use settings
      var scrollToSettings = $.extend({}, settings, scrollToOptions);

      // Get the target's top offset
      var targetOffsetTop = $target.offset().top;

      // Get current window scrollTop
      var windowScrollTop = $(window).scrollTop();

      // Support dynamic bufferTop if it is a function
      var scrollTop = targetOffsetTop - (typeof scrollToSettings.bufferTop === 'function' ? scrollToSettings.bufferTop() : scrollToSettings.bufferTop);

      // Don't trigger the scroll if the distance is within
      var checkTriggerDistance = Math.abs(windowScrollTop - scrollTop);
      if (checkTriggerDistance < scrollToSettings.triggerDistance) {
        return;
      }

      /**
       * Emit start event
       *
       * @event SmoothScroll.scrollTo:start
       * @param {jQueryObject} $target
       * @param {Object}
       */
      $target.trigger('SmoothScroll.scrollTo:start', [scrollToSettings]);

      // Do the scroll thing
      $('html, body').animate({
        scrollTop: scrollTop
      }, scrollToSettings.scrollSpeed, function () {
        // Callback after animation
        // Must change focus!
        $target.focus();

        /**
         * Emit end event
         *
         * @event SmoothScroll.scrollTo:end
         * @param {jQueryObject} $target
         * @param {Object}
         */
        $target.trigger('SmoothScroll.scrollTo:end', [scrollToSettings]);

        // Checking if the target was focused
        if ($target.is(':focus')) {
          return false;
        }
      });
    }
  }

  /**
   * Initialise all links on the page with the smoothScroll functionality
   */
  function init() {
    // Attach link behaviours
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]').not('[href="#0"]').click(function (event) {
      var $a = $(event.target).closest('a');
      var hash = $a.attr('href').replace(/.*#([^?]+).*/, '#$1');
      if ($(hash).length > 0) {
        event.preventDefault();
        scrollTo(hash);
      }
    });

    // Attach custom event to trigger through DOM
    $(document).on('SmoothScroll.scrollTo', function (event, scrollToOptions) {
      if (event.target) {
        scrollTo(event.target, scrollToOptions);
      }
    });

    // Check to see if a hash is located in the window.location and scroll to the element
    if (window.location.hash) {
      setTimeout(function () {
        scrollTo(window.location.hash);
      }, 1000);
    }
  }

  return {
    init: init,
    scrollTo: scrollTo
  };
};

module.exports = SmoothScroll;