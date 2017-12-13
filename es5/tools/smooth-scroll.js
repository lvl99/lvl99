(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../common'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../common'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.common);
    global.smoothScroll = mod.exports;
  }
})(this, function (exports) {
  (function (global, factory) {
    if (typeof define === "function" && define.amd) {
      define(['exports', '../common'], factory);
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports, global.common);
      global.smoothScroll = mod.exports;
    }
  })(this, function (exports, _common) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.DEFAULT_SCROLLTO_OPTIONS = undefined;
    exports.isScrollable = isScrollable;
    exports.getScrollableParents = getScrollableParents;
    exports.getScrollToPosition = getScrollToPosition;
    exports.default = SmoothScroll;


    /**
     * Default scrollTo options.
     *
     * @typedef {Object} ScrollToOptions
     *
     * @param {String|HTMLElement|jQueryObject} parent="html, body"
     * The selector to match on the parent to be scrolled.
     *
     * @param {Number} bufferTop=0
     * The distance away from the the top of the parent to scroll to.
     *
     * @param {Number} scrollSpeed=1000
     * The total time in milliseconds to smoothly scroll. This will be relative to the distance, i.e. it will take a shorter
     * amount of time if the distance isn't that far.
     *
     * @param {Number} triggerDistance=200
     * The distance from the top that the target element must be from the top of the parent element.
     *
     * @param {Boolean} ignoreScrollingParents=true
     * Enable/disable scrolling parents to ensure the target is in view.
     */
    var DEFAULT_SCROLLTO_OPTIONS = exports.DEFAULT_SCROLLTO_OPTIONS = {
      // The space between the top of the window and the top of the target
      bufferTop: 0,

      // The speed to scroll the window
      scrollSpeed: 1000,

      // The distance from top of window to top of target element to trigger scrolling
      triggerDistance: 200,

      // Ignore scrolling scrollable parent elements
      ignoreScrollingParents: false

      /**
       * Check if an element is scrollable.
       *
       * @param {String|HTMLElement|jQueryObject} elem
       * @return {Boolean}
       */
    }; /**
        * # Smooth Scroll
        *
        * Smoothly scroll to internal anchor links on a page.
        *
        * ## Usage
        *
        * Smooth Scroll needs to be instantiated with jQuery and any configured options before using.
        *
        * ```
        *   let SmoothScroll = require('lvl99/es6/tools/smooth-scroll')(jQuery, { bufferTop: 0 })
        * ```
        *
        * You can also initialise the SmoothScroll behaviours by calling `SmoothScroll.init()`. This will attach the necessary
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
        * @namespace lvl99.tools.SmoothScroll
        * @requires module:jquery
        */

    function isScrollable(elem) {
      var $elem = (0, _common.$)(elem);
      var hasLargerScrollableArea = $elem.outerHeight() > $elem[0].scrollHeight;
      var isOverflowScrollable = $elem.css('overflow') === 'auto' || $elem.css('overflow') === 'scroll' || $elem.css('overflowX') === 'auto' || $elem.css('overflowX') === 'scroll' || $elem.css('overflowY') === 'auto' || $elem.css('overflowY') === 'scroll';
      return $elem.length && /* hasLargerScrollableArea && */isOverflowScrollable;
    }

    /**
     * Get any scrollable parents of the target.
     *
     * This will go up the DOM tree and detect if any parent elements have an `overflow` value of `auto` or `scroll`.
     *
     * @param {String|HTMLElement|jQueryObject} target - The target element to get the scrollable parents for
     * @returns {Array}
     */
    function getScrollableParents(target) {
      var $target = (0, _common.$)(target);
      var scrollable = [];

      // @debug
      // console.log('[SmoothScroll] getScrollableParents', target)

      $target.parents().not('html, body').each(function getEachScrollableParent(index, elem) {
        if (isScrollable(elem)) {
          scrollable.push(elem);
        }
      });

      // Ensure the window is added last
      scrollable.push(window);

      // @debug
      // console.log('[SmoothScroll] getScrollableParents', {
      //   scrollable
      // })

      return scrollable.reverse();
    }

    /**
     * Get the parent's position to scroll to the intended target.
     *
     * @param {String|HTMLElement|jQueryObject} target
     * @param {String|HTMLElement|jQueryObject} [parent] - Will detect its scrollable parents or use the window if not set/falsey
     * @returns {{left: number, top: number}}
     */
    function getScrollToPosition(target, parent) {
      var $target = (0, _common.$)(target).first();
      var $parent = (0, _common.$)(parent || getScrollableParents(target) || window).first();
      var targetPosition = $target.position();
      var scrollTo = {
        top: ($parent[0].scrollTop || 0) + targetPosition.top,
        left: ($parent[0].scrollLeft || 0) + targetPosition.left
      };

      return scrollTo;
    }

    /**
     * SmoothScroll class
     *
     * @namespace lvl99.tools.SmoothScroll
     * @class
     * @param {ScrollToOptions} [scrollToOptions] - The options to pass to the SmoothScroll instance
     */
    function SmoothScroll(options) {
      // Load in the settings
      var settings = _common.$.extend({}, DEFAULT_SCROLLTO_OPTIONS, options);

      /**
       * Smoothly scroll to a target
       *
       * @memberof lvl99.tools.SmoothScroll
       *
       * @param {String|HTMLElement|jQueryObject} target
       * @param {ScrollToOptions} scrollToOptions - The options to affect how the smooth scroll behaves
       */
      function scrollTo(target, scrollToOptions) {
        // Load in per-use settings
        var scrollToSettings = _common.$.extend({}, settings, scrollToOptions);
        var scrollTargets = [];

        // Figure out element to scroll to
        var $target = (0, _common.$)(target).not('[data-disable-smooth-scroll]');

        // More than one target, only use first
        $target = $target.length > 1 ? $target.eq(0) : $target;

        // No valid target found
        if (!$target.length) {
          return;
        }

        // The top buffer
        var bufferTop = typeof scrollToSettings.bufferTop === 'function' ? scrollToSettings.bufferTop.apply(this, [target, scrollToOptions]) : scrollToSettings.bufferTop || 0;

        // Ensure that the parents will be scrolled to show the target as well
        var scrollableParents = getScrollableParents($target);
        if (!scrollToSettings.ignoreScrollableParents && scrollableParents && scrollableParents.length) {
          scrollableParents.forEach(function (scrollableParent, index) {
            var $elem = (0, _common.$)(scrollableParent);
            var $nextTarget = (0, _common.$)(index === scrollableParents.length - 1 ? $target : scrollableParents[index + 1]);

            // @debug
            // console.log('generate scrollTarget', scrollTarget)

            var scrollTarget = {
              // Use the 'html,body' parent if it's the window
              elem: _common.$.isWindow(scrollableParent) ? (0, _common.$)('html,body') : $elem,
              target: $nextTarget,
              scrollTo: getScrollToPosition($nextTarget, $elem)
            };

            scrollTargets.push(scrollTarget);
          });

          // Scroll only the window ('html,body' for jQuery.animate to work)
        } else {
          scrollTargets.push({
            elem: (0, _common.$)('html,body'),
            target: $target,
            scrollTo: getScrollToPosition($target, window)
          });
        }

        // @debug
        // console.log('[SmoothScroll] scrollTo', scrollTargets)

        // Do scroll targets exist?
        if (scrollTargets && scrollTargets.length) {
          /**
           * Emit scrollTo:before event.
           *
           * Triggered on the target element being scrolled to.
           *
           * @event SmoothScroll#SmoothScroll.scrollTo:before
           * @param {Array} scrollTargets
           * @param {ScrollToOptions} scrollToSettings
           */
          $target.trigger('SmoothScroll.scrollTo:before', [scrollTargets, scrollToSettings]);

          // Scroll each target
          scrollTargets.forEach(function (scrollTarget) {
            /**
             * Emit scrollTo:start event.
             *
             * Triggered on the element which is being scrolled, not the target being scrolled to.
             *
             * @event SmoothScroll#SmoothScroll.scrollTo:start
             * @param {Array} scrollTarget
             * @param {ScrollToOptions} scrollToSettings
             */
            (0, _common.$)(scrollTarget.elem).trigger('SmoothScroll.scrollTo:start', [scrollTarget, scrollToSettings]);

            // Doits!
            (0, _common.$)(scrollTarget.elem).animate({
              scrollLeft: scrollTarget.scrollTo.left,
              scrollTop: scrollTarget.scrollTo.top + bufferTop
            }, scrollToSettings.scrollSpeed, function () {
              // Callback after animation
              // Must change focus!
              $target.focus();

              /**
               * Emit scrollTo:end event.
               *
               * Triggered on the element which is being scrolled, not the target being scrolled to.
               *
               * @event SmoothScroll#SmoothScroll.scrollTo:end
               * @param {Object} scrollTarget
               * @param {ScrollToOptions} scrollToSettings
               */
              (0, _common.$)(scrollTarget.elem).trigger('SmoothScroll.scrollTo:end', [scrollTarget, scrollToSettings]);

              // Checking if the target was focused
              if ($target.is(':focus')) {
                return false;
              }
            });
          });
        }
      }

      /**
       * Initialise all links on the page with the smoothScroll functionality
       *
       * @memberof lvl99.tools.SmoothScroll
       */
      function init() {
        // Attach link behaviours
        (0, _common.$)('a[href*="#"]')
        // Remove links that don't actually link to anything
        .not('[href="#"]').not('[href="#0"]').click(function (event) {
          var $a = (0, _common.$)(event.target).closest('a');
          var hash = $a.attr('href').replace(/.*#([^?]+).*/, '#$1');
          if ((0, _common.$)(hash).length > 0) {
            event.preventDefault();
            scrollTo(hash);
          }
        });

        /**
         * Trigger the scrollTo behaviour through the DOM
         *
         * ```javascript
         *   $('#target-element').trigger('SmoothScroll.scrollTo')
         * ```
         *
         * @event SmoothScroll#SmoothScroll.scrollTo
         * @param {ScrollToOptions} options
         */
        (0, _common.$)(document).on('SmoothScroll.scrollTo', function (event) {
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
        settings: settings,
        init: init,
        scrollTo: scrollTo
      };
    }
  });
});