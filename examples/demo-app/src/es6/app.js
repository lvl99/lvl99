/**
 * LVL99 Demo App
 */

// I'm include the whole shebang here for convenience
const lvl99 = require('lvl99')

// @TODO change reference to package tool
const Debug = require('../../../../es6/tools/debug')()

// I'm going to do some shorthand aliases for convenience
const {
  utils: {
    $, $doc, $win, $html, $body
  },
  tools: {
    Queue,
    Breakpoints
  },
  core: {
    App
  }
} = lvl99

// These are the initial properties any DemoApp class will start with
const DemoAppProperties = {
  // Setting a NAMESPACE ensures that any DOM events will be named as such
  // This helps with triggering public DOM events on other components too
  _NS: 'DemoApp',
  _ns: 'demoapp',

  // The properties are what each DemoApp class will share between all instances
  _properties: {
    // I'm saving a reference to the initialised debug object for use within all demo apps
    debug: Debug(),

    // I'm creating a single Queue object to be shared between all demo apps
    queue: new Queue(),

    // Same with the breakpoints tool
    breakpoints: Breakpoints({
      'mobile':  [0, 600],
      'tablet':  [600, 1024],
      'desktop': [1024, 99999]
    })
  },

  // The attributes are what each new DemoApp class instance will have for itself
  _attributes: {
    // Assign a DOM element to the app (not necessary but I'm doing it anyway)
    // I've made it undefined because I want it to be declared when the DemoApp instance is constructed
    $elem: undefined,

    // You can store attributes for each app class to start with. In this case, I'm going to do a default set of
    // options
    config: {
      debug: true
    }
  }
}

// Create a new class for our demo app
class DemoApp extends lvl99.core.App {
  // This function occurs when a `new DemoApp(...)` call is made
  constructor (attributes) {
    // It's required to call the super with the given attributes
    super(attributes)
  }

  extend () {
    // When an new DemoApp instance is constructed, it is constructed then extended. Here we place in the
    // DemoAppProperties to ensure that the newly instantiated DemoApp class loads in its necessary variables.
    super.extend(DemoAppProperties, ...arguments)
  }

  init () {
    // Generally Entities don't have anything to initialise but it's good practice to initialise on the super anyway
    // so you don't forget about it later
    super.init(...arguments)

    // Apps can have components registered. This means that you can programmatically create new component instances
    // using the constructed DemoApp instance, rather than going through the normal `require` etc. stuff. It saves
    // a reference of the component class to the app
    for (let componentClass in components) {
      if (components.hasOwnProperty(componentClass)) {
        this.registerComponentClass(components[componentClass])
      }
    }

    // Shorthand aliases for the tools saved as props on the DemoApp
    let debug = this.getProp('debug')
    let queue = this.getProp('queue')

    // Remove `no-js` class
    $html.removeClass('no-js')

    // Scroll window events
    $win.on('scroll', () => {
      queue.sync('scrollWindow', this.scrollWindow, ...arguments)
    })

    // Resize window
    $win.on('resize orientationchange', () => {
      queue.sync('checkWindow', this.checkWindow, ...arguments)
    })

    // Search the DOM for any components to initialise
    $('[data-component]').each((i, elem) => {
      let $elem = $(elem)
      let componentType = $elem.attr('data-component')

      this.createComponentInstance(componentType, {
        $elem
      })
    })

    /**
     * Trigger component events by other elements
     * Attributes should be set to be extracted by convertStringToJson or extractClassDetails
     * Triggers have at least two properties (`on`, `do`) and can also specify a `target` (via query selector, or by
     * keyword `parent` which will target the first component in parent chain)
     */
    $('[data-trigger]').each((i, elem) => {
      let $elem = $(elem)
      let elemId = $elem.attr('id') || `trigger-${uuid.v4()}`
      $elem.attr('id', elemId)
      let triggerAttr = $elem.attr('data-trigger')
      let trigger = extractTriggerDetails(triggerAttr)

      // @debug
      debug.log('[data-trigger]', {
        triggerAttr,
        trigger
      })

      // Change elem selector
      if (!trigger.hasOwnProperty('selector')) {
        trigger.selector = `#${$elem.attr('id')}`
      }

      // Specific target element
      if (objectPath.has(trigger, 'target')) {
        // Get the first parent component
        if (trigger.target === 'parent') {
          trigger.target = `[data-component-id="${$elem.parents('[data-component-id]').first().attr('data-component-id')}"]`
        }

        $doc.on(trigger.on, trigger.selector, (jQueryEvent) => {
          jQueryEvent.preventDefault()
          debug.log('Assigned trigger with specified target', {
            trigger,
            jQueryEvent,
            $triggerTarget: $(trigger.target),
            triggerDo: trigger.do
          })
          $(trigger.target).trigger(trigger.do, [jQueryEvent])
        })

        // Global
      } else {
        $doc.on(trigger.on, trigger.selector, (jQueryEvent) => {
          jQueryEvent.preventDefault()
          debug.log('Assigned trigger with no specific target', {
            trigger,
            jQueryEvent
          })
          $doc.trigger(trigger.do, [jQueryEvent])
        })
      }
    })

    // Fire checkWindow on init
    queue.sync('checkWindow', this.checkWindow)

    /**
     * @trigger Theme:App:init:end
     * @target document
     * @param {ThemeApp}
     */
    $doc.trigger(`${this._NS}:init:end`, [this])
  }

  /**
   * Perform on each queued window scroll event
   */
  scrollWindow () {
    /**
     * @trigger Theme:App:scrollWindow:end
     * @target document
     * @param {ThemeApp}
     */
    $doc.trigger(`${this._NS}:scrollWindow:end`, [this])
  }

  /**
   * Perform on each queued window resize/orientationchange event
   */
  checkWindow () {
    // Shorthand to breakpoints tool
    const breakpoints = this.getProp('breakpoints')

    // Get the breakpoints to set to the HTML class
    let allBreakpoints = this.getAttr('breakpoints')
    let activatedBreakpoints = this.getAttr('activatedBreakpoints')
    let activeBreakpoints = breakpoints.getActive()
    let inactiveBreakpoints = []

    // Activated breakpoints have changed
    if (activatedBreakpoints !== activeBreakpoints) {
      this.setAttr('activatedBreakpoints', activeBreakpoints)

      // Get the breakpoints to remove
      allBreakpoints.forEach(bp => {
        if (!activeBreakpoints.includes(bp)) {
          inactiveBreakpoints.push(bp)
        }
      })

      // Add/remove breakpoints on the HTML element
      $html
        .removeClass(inactiveBreakpoints.map(bp => `ui-${this.ns}-bp-${bp}`).join(' '))
        .addClass(activeBreakpoints.map(bp => `ui-${this.ns}-bp-${bp}`).join(' '))
    }

    /**
     * @trigger Theme:App:checkWindow:end
     * @target document
     * @param {ThemeApp}
     */
    $doc.trigger(`${this.NS}:checkWindow:end`, [this])
  }
}

// Create your new app instance and initialise any attributes that this app instance requires
const demoApp = new App({

})

// Here I'm going to export the instance and not the class
module.exports = demoApp
