/**
 * LVL99 Smooth Scroll
 * Ensures smooth motion when navigating to an internal anchor point on the page
 *
 * @package lvl99
 */

const $ = require('jquery')

function SmoothScroll () {
  return {
    /**
     * Scroll to a point in the window
     *
     * @param {HTMLElement}|{jQueryObject}|{String} point
     * @param {Function} cb
     * @param {Number} time
     */
    scrollTo (point, cb, time) {
      // Get element to scroll too
      let $elem = $(point)
      let winScrollTop = $win.scrollTop()
      let toScrollTop = 0
      let diff

      // Try numeric value
      if ($elem.length === 0) {
        toScrollTop = parseInt( point, 10 )
      } else {
        toScrollTop = $elem.eq(0).offset().top
      }

      if (toScrollTop !== winScrollTop) {
        diff = Math.max(toScrollTop, winScrollTop) - Math.min(toScrollTop, winScrollTop)

        if (typeof time === 'undefined') {
          time = diff * 0.1
        }

        $('html, body').animate({
          scrollTop: toScrollTop + 'px',
          skipGSAP: true
        }, time, 'swing', cb)
      }
    }
  }
}

module.exports = SmoothScroll
