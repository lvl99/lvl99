/**
 * # Breakpoints
 *
 * Detect via JS what the breakpoint is by keyword
 *
 * @namespace lvl99.tools.Breakpoints
 * @module lvl99/tools/breakpoints
 */

/**
 * Breakpoints class.
 *
 * @constructor
 */
export default function Breakpoints (sizes) {
  return {
    /**
     * The defined breakpoint names with min/max widths (in 72dpi pixels). Should coincide with CSS for optimum expected behaviour.
     *
     * @type {Object}
     */
    sizes: sizes || {
      'xs':       [0,    399],
      'mobile':   [0,    799],
      'ms':       [400,  599],
      's':        [600,  799],
      'm':        [800,  999],
      'tablet':   [800,  1199],
      'l':        [1000, 1199],
      'laptop':   [1000, 1399],
      'computer': [1000, 99999],
      'xl':       [1200, 1399],
      'desktop':  [1200, 99999],
      'xxl':      [1400, 99999]
    },

    /**
     * Get an array of the currently active breakpoints.
     *
     * @return {Array}
     */
    getActive () {
      let width = window.innerWidth
      let bp = []

      for (let keyword in this.sizes) {
        if (this.sizes.hasOwnProperty(keyword) && width >= this.sizes[keyword][0] && width <= this.sizes[keyword][1]) {
          bp.push(keyword)
        }
      }

      return bp
    },

    /**
     * Check if a breakpoint keyword is currently active.
     *
     * @param {String|Array|RegExp} input - The breakpoint keyword(s) (as {String} or {Array}) or a {RegExp} to check which are currently active.
     * @return {Boolean}
     */
    isActive (input) {
      if (input instanceof Array) {
        input = input.join('|')
      }

      if (typeof input === 'string') {
        input = new RegExp('\\b(?:' + input.replace(/[\s,]+/g, '|') + ')\\b', 'i')
      }

      return input.test(this.getActive() + '')
    }
  }
}
