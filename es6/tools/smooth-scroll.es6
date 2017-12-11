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

export default function SmoothScroll ($, options) {
  /**
   * Load in the settings
   */
  const settings = $.extend({
    // The parent selector which will be scrolled. By default this is `html, body`
    parent: 'html, body',

    // The space between the top of the window and the top of the target
    bufferTop: 0,

    // The speed to scroll the window
    scrollSpeed: 1000,

    // The distance from top of window to top of target element to trigger scrolling
    triggerDistance: 200
  }, options)

  /**
   * Get any scrollable parents and ensure they scroll too
   *
   * @TODO needs testing!
   */
  function getScrollableParents (target) {
    let $target = $(target)
    let scrollable = []

    console.log('[SmoothScroll] getScrollableParents', target)

    $target.parents().each(function getEachScrollableParent (elem) {
      let $elem = $(elem)
      let isVisibleAreaScrolled = elem.scrollHeight !== elem.scrollTop
      let isOverflowScrollable = $elem.css('overflow') === 'auto' || $elem.css('overflow') === 'scroll' || $elem.css('overflow-y') === 'auto' || $elem.css('overflow-y') === 'scroll'

      // @debug
      console.log('[SmoothScroll] getScrollableParents', {
        elem,
        scrollHeight: elem.scrollHeight,
        scrollTop: elem.scrollTop,
        isVisibleAreaScrolled,
        isOverflowScrollable
      })

      if (isVisibleAreaScrolled && isOverflowScrollable) {
        scrollable.push(elem)
      }
    })

    return scrollable
  }

  /**
   * Smoothly scroll to a target
   *
   * @param {String|HTMLElement|jQueryObject} target
   */
  function scrollTo (target, scrollToOptions) {
    // Figure out element to scroll to
    let $target = $(target).not('[data-disable-smooth-scroll]')

    // More than one target, default to first
    $target = ($target.length > 1 ? $target.eq(0) : $target)

    // @debug
    let scrollableParents = getScrollableParents($target)

    // Does a scroll target exist?
    if ($target.length === 1) {
      // Load in per-use settings
      let scrollToSettings = $.extend({}, settings, scrollToOptions)

      // The parent is the element(s) which will be scrolled to show the target in place
      let $parent = $(scrollToSettings.parent)

      // Get the target's top offset
      let targetOffsetTop = $target.offset().top

      // Get parent scrollTop (default to window)
      let parentScrollTop = $(window).scrollTop()
      if (!$parent.is('html') && !$parent.is('body')) {
        parentScrollTop = $parent.first().scrollTop()
      }

      // Support dynamic bufferTop if it is a function
      let scrollTop = targetOffsetTop - (typeof scrollToSettings.bufferTop === 'function' ? scrollToSettings.bufferTop() : scrollToSettings.bufferTop)

      // Don't trigger the scroll if the distance is within
      let checkTriggerDistance = Math.abs(parentScrollTop - scrollTop)
      if (checkTriggerDistance < scrollToSettings.triggerDistance) {
        return
      }

      /**
       * Emit start event
       *
       * @event SmoothScroll.scrollTo:start
       * @param {jQueryObject} $target
       * @param {Object}
       */
      $target.trigger('SmoothScroll.scrollTo:start', [ scrollToSettings ])

      // Do the scroll thing
      $parent.animate({
        scrollTop
      }, scrollToSettings.scrollSpeed, () => {
        // Callback after animation
        // Must change focus!
        $target.focus()

        /**
         * Emit end event
         *
         * @event SmoothScroll.scrollTo:end
         * @param {jQueryObject} $target
         * @param {Object}
         */
        $target.trigger('SmoothScroll.scrollTo:end', [scrollToSettings])

        // Checking if the target was focused
        if ($target.is(':focus')) {
          return false
        }
      })
    }
  }

  /**
   * Initialise all links on the page with the smoothScroll functionality
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

    // Attach custom event to trigger behaviour through DOM
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
    init,
    scrollTo
  }
}
