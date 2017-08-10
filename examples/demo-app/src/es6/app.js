/**
 * LVL99 Demo App
 */

// I'm include the whole shebang here for convenience
// It's more likely you'll pick and choose the modules you want, to reduce the size of your JS
const lvl99 = require('../../../../es6')

// I'm going to do some shorthand aliases for convenience
const {
  common: {
    $, $doc, $win, $html, $body, events
  },
  utils: {
    parse: {
      extractTriggerDetails
    }
  },
  tools: {
    Queue,
    Breakpoints,
    Debug
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
class DemoApp extends App {
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

    // Shorthand aliases for the tools saved as _properties in the DemoAppProperties object
    let debug = this.getProp('debug')
    let queue = this.getProp('queue')

    // Let me explain something real quick here...
    //
    // You may have seen that the DemoApp has `_attributes` and `_properties`. Ideally you would use the
    // `getAttr`, `setAttr`, `getProp` and `setProp` methods on the Entity to read/write to those objects.
    //
    // If you really want to reference the object itself without the longer `get*/set*` function call, you can
    // reference each object like `this.attributes` and `this.properties`. These are read-only properties.
    //
    // Basically any Entity which is extended with properties that start with an underscore (`_`) are "semi-private"
    // in that you need to know more about them to affect them. Public getters are generated for any semi-private
    // property and they share the same name of the variable, just without the underscore.
    //
    // TL;DR: if you are creating a class, you can define semi-private variables in the Properties object and when it
    // is instantiated public getter read-only convenience properties will be generated, e.g. `this._NS` => `this.NS`
    //
    // In the next line we'll output the DemoApp's NAMESPACE, just for fun:
    debug.log(`${this.NS} is initialising...`)

    // Apps can have components registered. This means that you can programmatically create new component instances
    // using the constructed DemoApp instance, rather than going through the normal `require` etc. stuff. It saves
    // a reference of the component class to the app
    for (let componentClass in components) {
      if (components.hasOwnProperty(componentClass)) {
        this.registerComponentClass(components[componentClass])
      }
    }

    // Remove `no-js` class on the HTML DOM element
    $html.removeClass('no-js')

    // Scroll window events
    // This uses Queue to debounce operations
    $win.on('scroll', () => {
      queue.add('scrollWindow', this.scrollWindow, ...arguments)
    })

    // Resize window
    // Same as above, just with a different function
    $win.on('resize orientationchange', () => {
      queue.add('checkWindow', this.checkWindow, ...arguments)
    })

    // Search the DOM for any components to initialise
    // Components on DOM elements are specified with the `data-component` attribute, e.g.
    // ```html
    //   <div id="my-modal" data-component="Modal">...</div>
    // ```
    // Would be instantiated with the Modal component behaviours, and look like this after:
    // ```html
    //   <div id="my-modal" data-component-id="LVL99:Modal:123456"
    // ```
    $('[data-component]').each((i, elem) => {
      let $elem = $(elem)
      let componentType = $elem.attr('data-component')

      this.createComponentInstance(componentType, {
        $elem
      })
    })

    // The following allows DOM to trigger component events via other DOM elements
    // Attributes should be set to be extracted by convertStringToJson or extractClassDetails
    // Triggers have at least two properties (`on`, `do`) and can also specify a `target` (via query selector, or by
    // keyword `parent` which will target the first component in parent chain)
    //
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
    // Queue.add adds an action to the queue. A timer will then count a delay and then the actions within the queue
    // will be processed
    queue.add('checkWindow', this.checkWindow)

    // I personally like to publish events to the DOM when a specific event has finished, but you don't have to,
    // of course
    $doc.trigger(`${this.NS}:init:end`, [this])
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
