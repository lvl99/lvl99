/**
 * # Modal
 *
 * Extends {Toggleable} and adds some extra Modal-specific behaviours to support dialogs and modals like
 * alerts, confirm and input prompts.
 */

import { $, $body, events } from '../common'
import Toggleable from './toggleable'

const ModalProperties = {
  // Namespaces
  _NS: 'LVL99:Modal',
  _ns: 'lvl99-modal',

  // Modal properties
  _properties: {
    // Public methods (others should be inherited from the ToggleableComponent
    publicMethods: [
      {
        target: 'self',
        do: 'confirm'
      }, {
        target: 'self',
        do: 'cancel'
      }
    ],

    // The target DOM element which will hold the open/transition classes. If undefined it will revert to the `$elem` attribute value
    $classTarget: $body
  },

  // Default Toggleable attributes
  _attributes: {
    _a11y: true,
    _toggleableClassOpen: 'ui-modal-open',
    _toggleableClassTransitioning: 'ui-modal-transitioning ui-modal-opening ui-modal-closing',
    _toggleableClassTransitioningOpen: 'ui-modal-opening ui-modal-open',
    _toggleableClassTransitioningClose: 'ui-modal-closing',
    _toggleableCloseOnBlur: false,
    _modalCloseOnKeyPress: [27],
    _modalResetOnClose: true,
    _modalCloseOnTarget: undefined,
    _modalCloseOnTargetEvent: 'click touchend',
    _modalCloseOnTargetStrict: true,
    $elem: undefined
  }
}

/**
 * Modal Class
 *
 * Modal inherit {Toggleable} public behaviours.
 *
 * To incorporate this behaviour with your component, simply import and extend the {Modal} class.
 */
export default class Modal extends Toggleable {
  constructor (attributes) {
    // @debug
    // console.log('LVL99:Modal:constructor')
    super(attributes)
  }

  extend () {
    // @debug
    // console.log('LVL99:Modal:extend')

    // Merge the properties with the instantiated attributes
    super.extend(ModalProperties, ...arguments)
  }

  init () {
    // @debug
    // console.log('LVL99:Modal:init', this.NS, this)

    // Close on target event
    if (this.getAttr('_modalCloseOnTarget') && this.getAttr('_modalCloseOnTargetEvent')) {
      this.getElem().find(this.getAttr('_modalCloseOnTarget')).on(this.getAttr('_modalCloseOnTargetEvent'), (jQueryEvent) => {
        // @debug
        // console.log('modalCloseOnTarget', jQueryEvent.target, jQueryEvent.type)
        if (this.getAttr('_modalCloseOnTargetStrict') && $(jQueryEvent.target).is(this.getAttr('_modalCloseOnTarget'))) {
          this.close()
        } else if (!this.getAttr('_modalCloseOnTargetStrict')) {
          this.close()
        }
      })
    }

    // Close on blur
    if (this.getAttr('_modalCloseOnBlur')) {
      this.getElem().on('blur', () => {
        this.close()
      })
    }

    // Close on keypress
    if (typeof this.getAttr('_modalCloseOnKeyPress') !== 'undefined' && this.getAttr('_modalCloseOnKeyPress').length) {
      this.getElem().on('keyup', (event) => {
        if (this.getAttr('_modalCloseOnKeyPress').includes(event.which)) {
          this.close()
          return false
        }
      })
    }

    super.init(...arguments)
  }

  /**
   * Confirm the modal
   *
   * Usually closes the modal
   */
  confirm () {
    this.triggerEvent('confirm:end')
    this.close()
  }

  /**
   * Cancel the modal
   *
   * Closes the modal
   */
  cancel () {
    this.triggerEvent('cancel:end')
    this.close()
  }

  /**
   * Close the modal
   */
  close () {
    if (this.getAttr('_modalResetOnClose')) {
      this.getElem().find('form').each(function (i, form) {
        form.reset()
      })
      this.triggerEvent('reset:end')
    }

    super.close(...arguments)
  }
}
