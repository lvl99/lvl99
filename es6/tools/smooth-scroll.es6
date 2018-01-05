/**
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

import { $ } from '../common'

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
export const DEFAULT_SCROLLTO_OPTIONS = {
  // The space between the top of the window and the top of the target
  bufferTop: 0,

  // The speed to scroll the window
  scrollSpeed: 1000,

  // The distance from top of window to top of target element to trigger scrolling
  triggerDistance: 200,

  // Ignore scrolling scrollable parent elements
  ignoreScrollingParents: false
}

/**
 * Check if an element is scrollable.
 *
 * @param {String|HTMLElement|jQueryObject} elem
 * @return {Boolean}
 */
export function isScrollable (elem) {
  let $elem = $(elem)
  let hasLargerScrollableArea = ($elem.outerHeight() > $elem[0].scrollHeight)
  let isOverflowScrollable = ($elem.css('overflow') === 'auto' ||
    $elem.css('overflow') === 'scroll' ||
    $elem.css('overflowX') === 'auto' ||
    $elem.css('overflowX') === 'scroll' ||
    $elem.css('overflowY') === 'auto' ||
    $elem.css('overflowY') === 'scroll')
  return ($elem.length && /* hasLargerScrollableArea && */ isOverflowScrollable)
}

/**
 * Get any scrollable parents of the target.
 *
 * This will go up the DOM tree and detect if any parent elements have an `overflow` value of `auto` or `scroll`.
 *
 * @param {String|HTMLElement|jQueryObject} target - The target element to get the scrollable parents for
 * @returns {Array}
 */
export function getScrollableParents (target) {
  let $target = $(target)
  let scrollable = []

  // @debug
  // console.log('[SmoothScroll] getScrollableParents', target)

  $target.parents().not('html, body').each(function getEachScrollableParent  (index, elem) {
    if (isScrollable(elem)) {
      scrollable.push(elem)
    }
  })

  // Ensure the window is added last
  scrollable.push(window)

  // @debug
  // console.log('[SmoothScroll] getScrollableParents', {
  //   scrollable
  // })

  return scrollable.reverse()
}

/**
 * Get the parent's position to scroll to the intended target.
 *
 * @param {String|HTMLElement|jQueryObject} target
 * @param {String|HTMLElement|jQueryObject} [parent] - Will detect its scrollable parents or use the window if not set/falsey
 * @returns {{left: number, top: number}}
 */
export function getScrollToPosition (target, parent) {
  let $target = $(target).first()
  let $parent = $(parent || getScrollableParents(target) || window).first()
  let targetPosition = $target.position()
  let scrollTo = {
    top: ($parent[0].scrollTop || 0) + targetPosition.top,
    left: ($parent[0].scrollLeft || 0) + targetPosition.left
  }

  return scrollTo
}

/**
 * SmoothScroll class
 *
 * @namespace lvl99.tools.SmoothScroll
 * @class
 * @param {ScrollToOptions} [scrollToOptions] - The options to pass to the SmoothScroll instance
 */
export default function SmoothScroll (options) {
  // Load in the settings
  const settings = $.extend({}, DEFAULT_SCROLLTO_OPTIONS, options)

  /**
   * Smoothly scroll to a target
   *
   * @memberof lvl99.tools.SmoothScroll
   *
   * @param {String|HTMLElement|jQueryObject} target
   * @param {ScrollToOptions} scrollToOptions - The options to affect how the smooth scroll behaves
   */
  function scrollTo (target, scrollToOptions) {
    // Load in per-use settings
    let scrollToSettings = $.extend({}, settings, scrollToOptions)
    let scrollTargets = []

    // Figure out element to scroll to
    let $target = $(target).not('[data-disable-smooth-scroll]')

    // More than one target, only use first
    $target = ($target.length > 1 ? $target.eq(0) : $target)

    // No valid target found
    if (!$target.length) {
      return
    }

    // Set the original target
    scrollToSettings.originalTarget = $target[0]

    // The top buffer
    let bufferTop = (typeof scrollToSettings.bufferTop === 'function'
      ? scrollToSettings.bufferTop.apply(this, [target, scrollToOptions])
      : scrollToSettings.bufferTop || 0)

    // Ensure that the parents will be scrolled to show the target as well
    let scrollableParents = getScrollableParents($target)
    if (!scrollToSettings.ignoreScrollableParents && scrollableParents && scrollableParents.length) {
      scrollableParents.forEach((scrollableParent, index) => {
        let $elem = $(scrollableParent)
        let $nextTarget = $(index === (scrollableParents.length - 1) ? $target : scrollableParents[index + 1])

        // @debug
        // console.log('generate scrollTarget', scrollTarget)

        let scrollTarget = {
          // Use the 'html,body' parent if it's the window
          elem: ($.isWindow(scrollableParent) ? $('html,body') : $elem),
          target: $nextTarget,
          scrollTo: getScrollToPosition($nextTarget, $elem)
        }

        scrollTargets.push(scrollTarget)
      })

      // Scroll only the window ('html,body' for jQuery.animate to work)
    } else {
      scrollTargets.push({
        elem: $('html,body'),
        target: $target,
        scrollTo: getScrollToPosition($target, window)
      })
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
      $target.trigger('SmoothScroll.scrollTo:before', [scrollTargets, scrollToSettings])

      // Scroll each target
      scrollTargets.forEach((scrollTarget) => {
        let $scrollTarget = $(scrollTarget.elem)

        /**
         * Emit scrollTo:start event.
         *
         * Triggered on the element which is being scrolled, not the target being scrolled to.
         *
         * @event SmoothScroll#SmoothScroll.scrollTo:start
         * @param {Array} scrollTarget
         * @param {ScrollToOptions} scrollToSettings
         */
        $scrollTarget.trigger('SmoothScroll.scrollTo:start', [scrollTarget, scrollToSettings])

        // Doits!
        $scrollTarget.animate({
          scrollLeft: scrollTarget.scrollTo.left,
          scrollTop: scrollTarget.scrollTo.top + bufferTop
        }, scrollToSettings.scrollSpeed, () => {
          // Only perform the following if pointing to the original target
          if (scrollTarget.elem === scrollToSettings.originalTarget) {
            // Callback after animation
            // Must change focus!
            $target.focus()

            /**
             * Emit `SmoothScroll.scrollTo:end` event.
             *
             * Triggered on the element which is being scrolled (not the target).
             *
             * @event SmoothScroll#SmoothScroll.scrollTo:end
             * @param {Object} scrollTarget
             * @param {ScrollToOptions} scrollToSettings
             */
            $scrollTarget.trigger('SmoothScroll.scrollTo:end', [scrollTarget, scrollToSettings])

            // Checking if the target was focused
            if ($target.is(':focus')) {
              return false
            }
          }
        })
      })
    }
  }

  /**
   * Initialise all links on the page with the smoothScroll functionality
   *
   * @memberof lvl99.tools.SmoothScroll
   */
  function init () {
    // Attach link behaviours
    $('a[href*="#"]')
    // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(event => {
        const $a = $(event.target).closest('a')
        const hash = $a.attr('href').replace(/.*#([^?]+).*/, '#$1')
        if ($(hash).length > 0) {
          event.preventDefault()
          scrollTo(hash)
        }
      })

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
    $(document).on('SmoothScroll.scrollTo', function (event, ...options) {
      if (event.target) {
        scrollTo(event.target, options[0])
      }
    })

    // Check to see if a hash is located in the window.location and scroll to the element
    if (window.location.hash) {
      setTimeout(() => {
        scrollTo(window.location.hash)
      }, 1000)
    }
  }

  return {
    settings,
    init,
    scrollTo
  }
}
