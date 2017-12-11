/**
 * # Spinner Component
 *
 * Extends {Component} to enable starting/stopping a spinner based on the events of other elements
 */

import { $, $doc, $body, events } from '../common'
import Toggleable from './toggleable'

/**
 * Spinner Properties
 *
 * @private
 * @type {Object}
 */
const SpinnerProperties = {
  /**
   * NAMESPACE
   * This is used for custom events and error reporting
   *
   * @type {String}
   */
  _NS: 'LVL99:Spinner',

  /**
   * namespace
   * This is used for CSS classes
   *
   * @type {String}
   */
  _ns: 'lvl99-spinner',

  /**
   * The properties shared between all instances of this Toggleable
   *
   * @type {Object}
   */
  _properties: {
    // Public methods on Spinner
    publicMethods: [
      {
        target: 'self',
        do: 'startSpinning'
      }, {
        target: 'self',
        do: 'stopSpinning'
      }
    ],

    // Set to false to target the component's $elem
    $classTarget: false
  },

  /**
   * The default attributes to load a created Toggleable instance with.
   *
   * @type {Object}
   */
  _attributes: {
    // Disable these toggleable attributes
    _toggleableCloseOnBlur: false,
    _toggleableCloseOnBlurTarget: undefined,

    // CSS classes for spinning
    _spinnerClassSpinning: undefined,

    // Watch this DOM element selector for the events
    _spinnerWatchTarget: undefined,

    // Events to hook into to start the spinner on
    _spinnerWatchEventsForStart: 'load submit start',

    // Events to hook into to stop the spinner on
    _spinnerWatchEventsForStop: 'error reset stop',

    $elem: undefined,
    isSpinning: false
  }
}

/**
 * Spinner Class
 *
 * Spinners show when stuff is loading, working, etc. Spinners can watch other DOM element targets for
 * events to start/stop spinning on.
 */
export default class Spinner extends Toggleable {
  constructor (attributes) {
    // @debug
    // console.log('LVL99:Spinner:constructor')
    super(attributes)
  }

  extend () {
    // @debug
    // console.log('LVL99:Spinner:extend', {
    //   arguments
    // })

    // Merge the properties with the instantiated attributes
    super.extend(SpinnerProperties, ...arguments)
  }

  buildCSSClasses () {
    super.buildCSSClasses(...arguments)

    if (!this.getAttr('_spinnerClassSpinning')) {
      this.setAttr('_spinnerClassSpinning', `ui-${this.ns}-spinning`)
    }
  }

  /**
   * Initialise the {Spinner} instance
   *
   * @note {Spinner} relies on an `elem` attribute being set, or else it will error.
   */
  init () {
    // @debug
    // console.log('LVL99:Spinner:init', this.NS, this)

    // No element found? Error
    if (!this.getElem() || !this.getElem().length) {
      throw new Error(`${this.NS}:init: elem is missing`)
    }

    // Set up watching target events for start/stop
    if (this.getAttr('_spinnerWatchTarget')) {
      if (this.getAttr('_spinnerWatchEventsForStart')) {
        $doc.on(this.getAttr('_spinnerWatchEventsForStart'), this.getAttr('_spinnerWatchTarget'), (jQueryEvent) => {
          this.startSpinning()
        })
      }

      if (this.getAttr('_spinnerWatchEventsForStop')) {
        $doc.on(this.getAttr('_spinnerWatchEventsForStop'), this.getAttr('_spinnerWatchTarget'), (jQueryEvent) => {
          this.stopSpinning()
        })
      }
    }

    super.init(...arguments)
  }

  /**
   * Show the spinner
   */
  startSpinning () {
    // @debug
    // console.log(`${this.NS}:startSpinning`)

    if (!this.getAttr('isSpinning')) {
      if (!this.getAttr('isOpen')) {
        this.open()
      }
      this.setAttr('isSpinning', true)
      this.getClassTarget().addClass(this.getAttr('_spinnerClassSpinning'))
      this.triggerEvent('startSpinning:end')
    }
  }

  /**
   * Hide the spinner
   */
  stopSpinning () {
    // @debug
    // console.log(`${this.NS}:stopSpinning`)

    if (this.getAttr('isSpinning')) {
      this.setAttr('isSpinning', false)
      this.getClassTarget().removeClass(this.getAttr('_spinnerClassSpinning'))
      if (this.getAttr('isOpen')) {
        this.close()
      }
      this.triggerEvent('stopSpinning:end')
    }
  }
}
