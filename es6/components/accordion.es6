/**
 * LVL99.Accordion
 * Uses the {ToggleableComponent} and manages the parent/child relationship between children
 *
 * @package lvl99
 */

import merge from 'lodash.merge'
import { $, $body, events } from '../common'
import Component from '../core/component'

const AccordionProperties = {
  // Namespaces
  _NS: 'LVL99:Accordion',
  _ns: 'lvl99-accordion',

  // Modal properties
  _properties: {
    // Public methods
    publicMethods: [],

    // The target DOM element which will hold the open/transition classes. If undefined it will revert to the `$elem` attribute value
    $classTarget: undefined
  },

  // Default Accordion attributes
  _attributes: {
    _a11y: true,
    _accordionClassItemActive: 'active',
    _accordionItemSelector: '.accordion-item',
    _accordionItemToggleSelector: '.accordion-item-toggle',
    _accordionItemContentSelector: '.accordion-item-content',
    _accordionCloseOthersOnOpen: true,
    _accordionItemToggleableAttributes: {
      _a11y: false,
      _toggleableUseTransitioning: false,
      _toggleableClassOpen: 'ui-accordion-item-open',
      _toggleableClassTransitioning: 'ui-accordion-item-transitioning ui-accordion-item-opening ui-accordion-item-closing',
      _toggleableClassTransitioningOpen: 'ui-accordion-item-opening ui-accordion-item-open',
      _toggleableClassTransitioningClose: 'ui-accordion-item-closing',
      _toggleableCloseOnBlur: false
    },
    $elem: undefined,
    $items: undefined,
    $activeItem: undefined
  }
}

/**
 * LVL99.Accordion
 *
 * An {Accordion} manages the toggleable states of its children. Each child can be opened/closed, which may or may not
 * close the other children.
 *
 * @constructor
 * @extends {Component}
 */
export default class Accordion extends Component {
  constructor (attributes) {
    // @debug
    // console.log('LVL99:Accordion:constructor')
    super(attributes)
  }

  extend () {
    // @debug
    // console.log('LVL99:Accordion:extend')

    // Merge the properties with the instantiated attributes
    super.extend(AccordionProperties, ...arguments)
  }

  init () {
    // @debug
    // console.log('LVL99:Accordion:init', this.NS, this)

    // No element found? Error
    if (!this.getElem() || !this.getElem().length) {
      throw new Error(`${this.NS}:init: elem is missing`)
    }

    // Turn children into {ToggleableComponent}s (if not already {ToggleableComponent}s)
    if (!this.getAttr('$items') || !this.getAttr('$items').length) {
      let $items = this.getElem().find(this.getAttr('_accordionItemSelector'))
      this.setAttr('$items', $items)

      // @debug
      // console.log(`${this.NS}:init`, {
      //   component: this,
      //   $items: this.getAttr('$items')
      // })

      // No items!
      if (!this.getAttr('$items').length) {
        console.warn(`[${this.NS}:init] Warning: no $items were found to assign to this Accordion`)

      } else {
        // Turn child into {ToggleableComponent} using the app's `createComponentInstance` method
        $items.each((i, item) => {
          let $item = $(item)

          // If already set as active item, ensure it is set correctly
          if ($item.is(`.${this.getAttr('_accordionClassItemActive')}`)) {
            this.setActiveItem($item)
          }

          // Setup for a11y
          if (this.getAttr('_a11y')) {
            let $itemToggle = $item.find(this.getAttr('_accordionItemToggleSelector'))
            let $itemContent = $item.find(this.getAttr('_accordionItemContentSelector'))

            // Ensure the toggle is tabbable and is a button
            $itemToggle.attr('tabindex', $itemToggle.attr('tabindex') || 1)
            $itemToggle.attr('role', 'button')
          }

          // Create the component instance, or reference the component instance
          let accordionToggleableItem
          if (!$item.attr('data-component-id')) {
            accordionToggleableItem = this._app.createComponentInstance('LVL99:ToggleableComponent', merge({
              // Regular {ToggleableComponent} attributes
              $classTarget: $item,
              $elem: $item
            }, this.getAttr('_accordionItemToggleableAttributes')))
          } else {
            accordionToggleableItem = this._app.getComponentInstance($item.attr('data-component-id'))
          }

          // Set special _controllers reference since this item was dynamically instantiated within another component
          accordionToggleableItem.extend({
            _controllers: {
              accordion: {
                $elem: this.getElem(),
                controller: this
              }
            }
          })
        })
      }
    }

    // Special a11y enhancements
    if (this.getAttr('a11y')) {
      this.getElem().on('focus', `${this.getAttr('_accordionItemSelector')} ${ this.getAttr('_accordionItemToggleSelector')}`, (jQueryEvent) => {
        let $item = $(jQueryEvent.target).closest(this.getAttr('_accordionItemSelector'))
        $item.trigger('LVL99:ToggleableComponent:open')
      })
    }

    // Attach eventListener to elem to hide other children when {ToggleableComponent} child is opened
    if (this.getAttr('_accordionCloseOthersOnOpen')) {
      this.getElem().on('LVL99:ToggleableComponent:open', this.getAttr('_accordionItemSelector'), (jQueryEvent) => {
        let $item = $(jQueryEvent.target).closest(this.getAttr('_accordionItemSelector'))
        if (!$item.is(`.${this.getAttr('_accordionClassItemActive')}`)) {
          let $otherItems = this.getAttr('$items').not($item)
          jQueryEvent.preventDefault()
          jQueryEvent.stopPropagation()
          $otherItems.trigger('LVL99:ToggleableComponent:close')
          this.unsetActiveItem($otherItems)
        }
      })
    }

    // Trigger ToggleableComponent:open when the item's toggle is interacted with
    this.getElem().on(events.inputstart, `${this.getAttr('_accordionItemSelector')} ${this.getAttr('_accordionItemToggleSelector')}`, (jQueryEvent) => {
      let $item = $(jQueryEvent.target).closest(this.getAttr('_accordionItemSelector'))
      jQueryEvent.preventDefault()
      $item.trigger('LVL99:ToggleableComponent:open')
      this.setActiveItem($item)
    })

    super.init(...arguments)
  }

  /**
   * Set an item within the accordion to be active.
   * Note: This does not actually open the item! (unless the CSS class opens the item)
   *
   * @param item
   */
  setActiveItem (item) {
    let $item = $(item)

    // Add to $activeItem
    if ($item.is(`.${this.getAttr('_accordionClassItemActive')}`) || (this.getAttr('$activeItem') && this.getAttr('$activeItem').find($item).length)) {
      // Empty or unset
      if (!this.getAttr('$activeItem')) {
        this.setAttr('$activeItem', $item)
      } else {
        this.setAttr('$activeItem', this.getAttr('$activeItem').add($item))
      }
    }

    // Add the active class
    $item.addClass(this.getAttr('_accordionClassItemActive'))
  }

  /**
   * Unset an item within the accordion to be active
   *
   * @param item
   */
  unsetActiveItem (item) {
    let $item = $(item)

    // Currently active
    if ($item.is(`.${this.getAttr('_accordionClassItemActive')}`) || (this.getAttr('$activeItem') && this.getAttr('$activeItem').find($item).length)) {
      // Empty or unset
      if (this.getAttr('$activeItem') && this.getAttr('$activeItem').length && this.getAttr('$activeItem').find($item).length) {
        this.setAttr('$activeItem', this.getAttr('$activeItem').not($item))
      }
    }

    // Remove the active class
    $item.removeClass(this.getAttr('_accordionClassItemActive'))
  }
}
