/**
 * LVL99.Toggleable
 * Extends {Component} to enable toggleability via CSS classes (open, close, toggle)
 *
 * @package lvl99
 */

const { $, $body, events } = require('../common')
const Component = require('../core/component')

/**
 * Toggleable Properties
 *
 * @type {Object}
 */
const ToggleableProperties = {
  /**
   * NAMESPACE
   * This is used for custom events and error reporting
   *
   * @type {String}
   */
  _NS: 'LVL99:Toggleable',

  /**
   * namespace
   * This is used for CSS classes
   *
   * @type {String}
   */
  _ns: 'lvl99-toggleable',

  /**
   * The properties shared between all instances of this Toggleable
   *
   * @type {Object}
   */
  _properties: {
    // Public methods on Toggleables
    publicMethods: [
      {
        target: 'self',
        do: 'open'
      }, {
        target: 'self',
        do: 'close'
      }, {
        target: 'self',
        do: 'toggle'
      }
    ],

    // The target DOM element which will hold the open/transition classes. If undefined it will revert to the `$elem` attribute value
    $classTarget: $body
  },

  /**
   * The default attributes to load a created Toggleable instance with.
   *
   * @type {Object}
   */
  _attributes: {
    _a11y: true,
    _toggleableUseTransitioning: true, // Whether to detect transitions or not
    _toggleableClassOpen: undefined,
    _toggleableClassTransitioning: undefined,
    _toggleableClassTransitioningOpen: undefined,
    _toggleableClassTransitioningClose: undefined,
    _toggleableCloseOnBlur: false, // Close the toggleable if user interacts away from it
    _toggleableCloseOnBlurTarget: undefined, // A selector identifying which element triggers CloseOnBlur
    $elem: undefined,
    isOpen: false
  }
}

/**
 * LVL99.Toggleable
 *
 * Toggleable components can be opened using the {Toggleable} method `open`, or closed using the
 * {Toggleable} method `close`. You can toggle between the open/closed states using the method `toggle`.
 *
 * To get the current state of the component, simply use `toggleableInstance.getAttr('isOpen')` which will
 * return a {Boolean} value.
 *
 * To incorporate this behaviour with your component, simply import and extend the {Toggleable} class.
 *
 * @constructor
 * @extends {Component}
 */
class Toggleable extends Component {
  constructor (attributes) {
    // @debug
    // console.log('LVL99:Toggleable:constructor')
    super(attributes)
  }

  extend () {
    // @debug
    // console.log('LVL99:Toggleable:extend', {
    //   arguments
    // })

    // Merge the properties with the instantiated attributes
    super.extend(ToggleableProperties, ...arguments)
  }

  /**
   * Initialise the {Toggleable} instance
   *
   * @note {Toggleable} relies on an `elem` attribute being set, or else it will error.
   */
  init () {
    // @debug
    // console.log('LVL99:Toggleable:init', this.NS, this)

    // No element found? Error
    if (!this.getElem() || !this.getElem().length) {
      throw new Error(`${this.NS}:init: elem is missing`)
    }

    // Add tabindex to elem for blur stuff
    if (this.getAttr('_toggleableCloseOnBlur')) {
      this.getElem().attr('tabindex', this.getElem().attr('tabindex') || 1)

      // Default blur target is elem
      let blurTarget = this.getElem()

      if (this.getAttr('_toggleableCloseOnBlurTarget')) {
        blurTarget = $(this.getAttr('_toggleableCloseOnBlurTarget'))
      }

      if (blurTarget.length) {
        blurTarget.on('blur', () => {
          this.close()
        })
      }
    }

    // Only if using transitioning
    if (this.getAttr('_toggleableUseTransitioning')) {
      // Remove transition classes after transitionend
      this.getElem().on(events.transitionend, /* `[data-component-id="${this.uuid}"]`, */ (jQueryEvent) => {
        // @debug
        // console.log(`[${this.NS}] transitionend`, {
        //   jQueryEvent,
        //   target: jQueryEvent.target
        // })
        this.getClassTarget().removeClass(this.getAttr('_toggleableClassTransitioning'))
      })
    }

    // Set up classes
    this.buildCSSClasses()

    super.init(...arguments)
  }

  /**
   * Set up the CSS transition classes based on the Component's namespace
   */
  buildCSSClasses () {
    if (super.buildCSSClasses) {
      super.buildCSSClasses(...arguments)
    }

    if (!this.getAttr('_toggleableClassOpen')) {
      this.setAttr('_toggleableClassOpen', `ui-${this.ns}-open`)
    }

    // Only if using transitioning
    if (this.getAttr('_toggleableUseTransitioning')) {
      if (!this.getAttr('_toggleableClassTransitioning')) {
        this.setAttr('_toggleableClassTransitioning', `ui-${this.ns}-transitioning ui-${this.ns}-opening ui-${this.ns}-closing`)
      }

      if (!this.getAttr('_toggleableClassTransitioningOpen')) {
        this.setAttr('_toggleableClassTransitioningOpen', `ui-${this.ns}-transitioning ui-${this.ns}-opening ${this.getAttr('_toggleableClassOpen')}`)
      }

      if (!this.getAttr('_toggleableClassTransitioningClose')) {
        this.setAttr('_toggleableClassTransitioningClose', `ui-${this.ns}-transitioning ui-${this.ns}-closing`)
      }

    // If not, unset these values
    } else {
      this.setAttr('_toggleableClassTransitioning', '')
      this.setAttr('_toggleableClassTransitioningOpen', '')
      this.setAttr('_toggleableClassTransitioningClose', '')
    }
  }

  /**
   * Opens the {Toggleable}
   */
  open () {
    // @debug
    // console.log(`${this.NS}:open`)

    if (!this.getAttr('isOpen')) {
      this.setAttr('isOpen', true)
      this.getClassTarget().addClass(this.getAttr('_toggleableClassTransitioningOpen'))

      // @a11y
      if (this.getAttr('a11y')) {
        this.getElem().attr('aria-hidden', false)
      }

      if (this.getAttr('_toggleableCloseOnBlur')) {
        this.getElem().focus()
      }

      /**
       * @trigger LVL99:Toggleable:open:end
       */
      this.triggerEvent('open:end')
    }
  }

  /**
   * Close the {Toggleable}
   */
  close () {
    // @debug
    // console.log(`${this.NS}:close`)

    if (this.getAttr('isOpen')) {
      this.setAttr('isOpen', false)
      this.getClassTarget().addClass(this.getAttr('_toggleableClassTransitioningClose')).removeClass(this.getAttr('_toggleableClassOpen'))

      // @a11y
      if (this.getAttr('a11y')) {
        this.getElem().attr('aria-hidden', true)
      }

      /**
       * @trigger LVL99:Toggleable:close:end
       */
      this.triggerEvent('close:end')
    }
  }

  /**
   * Toggle the SiteMenu
   */
  toggle (jQueryEvent) {
    // @debug
    // console.log(`${this.NS}:toggle`)

    // If the event was keyup/keydown
    let acceptedKeys = [13, 32] // enter and space
    if (jQueryEvent && jQueryEvent.type === 'keypress' && !acceptedKeys.includes(jQueryEvent.which)) {
      // Nothing...
    } else {

      if (this.getAttr('isOpen')) {
        this.close()
      } else {
        this.open()
      }

      /**
       * @trigger LVL99:Toggleable:toggle:end
       */
      this.triggerEvent('toggle:end')
    }
  }
}

/**
 * Class properties
 */
Object.defineProperty(Toggleable, 'NS', {
  value: ToggleableProperties._NS,
  writable: true
})

Object.defineProperty(Toggleable, 'ns', {
  value: ToggleableProperties._ns,
  writable: true
})

module.exports = Toggleable
