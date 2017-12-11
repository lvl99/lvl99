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
    global.smoothScroll = mod.exports;
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
      global.smoothScroll = mod.exports;
    }
  })(this, function (module, exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.default = SmoothScroll;
    /**
     * # Smooth Scroll
     *
     * Smoothly scroll to internal anchor links on a page.
     *
     * ## Usage
     *
     * Smooth Scroll needs to be instantiated with jQuery and any configured options before using.
     *
     * ```javascript
     *   let SmoothScroll = require('lvl99/es6/tools/smooth-scroll')(jQuery, { bufferTop: 0 })
     * ```
     *
     * You can also initialise the SmoothScroll behaviours by calling `SmoothScroll.init()`. This will attach the necessary
     * events on to anchor links.
     *
     * You can trigger the scrollTo event by using the custom event `SmoothScroll.scrollTo`, e.g.:
     *
     * ```javascript
     *   $(document).trigger('SmoothScroll.scrollTo', [ scrollToOptions ])
     * ```
     *
     * The `scrollTo` function emits a custom event `SmoothScroll.scrollTo:start` when the action is invoked and
     * `SmoothScroll.scrollTo:end` when it finishes.
     */

    function SmoothScroll($, options) {
      /**
       * Load in the settings
       */
      var settings = $.extend({
        // The parent selector which will be scrolled. By default this is `html, body`
        parent: 'html, body',

        // The space between the top of the window and the top of the target
        bufferTop: 0,

        // The speed to scroll the window
        scrollSpeed: 1000,

        // The distance from top of window to top of target element to trigger scrolling
        triggerDistance: 200
      }, options);

      /**
       * Get any scrollable parents and ensure they scroll too
       *
       * @TODO needs testing!
       */
      function getScrollableParents(target) {
        var $target = $(target);
        var scrollable = [];

        console.log('[SmoothScroll] getScrollableParents', target);

        $target.parents().each(function getEachScrollableParent(elem) {
          var $elem = $(elem);
          var isVisibleAreaScrolled = elem.scrollHeight !== elem.scrollTop;
          var isOverflowScrollable = $elem.css('overflow') === 'auto' || $elem.css('overflow') === 'scroll' || $elem.css('overflow-y') === 'auto' || $elem.css('overflow-y') === 'scroll';

          // @debug
          console.log('[SmoothScroll] getScrollableParents', {
            elem: elem,
            scrollHeight: elem.scrollHeight,
            scrollTop: elem.scrollTop,
            isVisibleAreaScrolled: isVisibleAreaScrolled,
            isOverflowScrollable: isOverflowScrollable
          });

          if (isVisibleAreaScrolled && isOverflowScrollable) {
            scrollable.push(elem);
          }
        });

        return scrollable;
      }

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

        // @debug
        var scrollableParents = getScrollableParents($target);

        // Does a scroll target exist?
        if ($target.length === 1) {
          // Load in per-use settings
          var scrollToSettings = $.extend({}, settings, scrollToOptions);

          // The parent is the element(s) which will be scrolled to show the target in place
          var $parent = $(scrollToSettings.parent);

          // Get the target's top offset
          var targetOffsetTop = $target.offset().top;

          // Get parent scrollTop (default to window)
          var parentScrollTop = $(window).scrollTop();
          if (!$parent.is('html') && !$parent.is('body')) {
            parentScrollTop = $parent.first().scrollTop();
          }

          // Support dynamic bufferTop if it is a function
          var scrollTop = targetOffsetTop - (typeof scrollToSettings.bufferTop === 'function' ? scrollToSettings.bufferTop() : scrollToSettings.bufferTop);

          // Don't trigger the scroll if the distance is within
          var checkTriggerDistance = Math.abs(parentScrollTop - scrollTop);
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
          $parent.animate({
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

        // Attach custom event to trigger behaviour through DOM
        $(document).on('SmoothScroll.scrollTo', function (event) {
          if (event.target) {
            scrollTo(event.target, arguments.length <= 1 ? undefined : arguments[1]);
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
    }
    module.exports = exports['default'];
  });
});