(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
"use strict";

var $ = typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null;

var $doc = $(document);
var $win = $(window);
var $html = $('html');
var $body = $('body');

var events = {
  click: 'click touchend',
  inputstart: 'mousedown touchstart keydown',
  inputend: 'mouseup touchend keyup',
  animationrun: 'animationrun webkitAnimationRun webkitanimationrun mozAnimationRun MSAnimationRun oAnimationRun oanimationrun',
  animationstart: 'animationstart webkitAnimationStart webkitanimationstart mozAnimationStart MSAnimationStart oAnimationStart oanimationstart',
  animationend: 'animationend webkitAnimationEnd webkitanimationend mozAnimationEnd MSAnimationEnd oAnimationEnd oanimationend',
  transitionrun: 'transitionrun webkitTransitionRun webkittransitionrun mozTransitionRun MSTransitionRun oTransitionRun otransitionrun',
  transitionstart: 'transitionstart webkitTransitionStart webkittransitionstart mozTransitionStart MSTransitionStart oTransitionStart otransitionstart',
  transitionend: 'transitionend webkitTransitionEnd webkittransitionend mozTransitionEnd MSTransitionEnd oTransitionEnd otransitionend'
};

var utils = {
  $: $,
  $doc: $doc,
  $win: $win,
  $html: $html,
  $body: $body,
  events: events
};

module.exports = utils;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
(function (global){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var $ = typeof window !== "undefined" ? window['jQuery'] : typeof global !== "undefined" ? global['jQuery'] : null;
var uuid = require('uuid');
var Entity = require('./entity');

var _require = require('../utils/parse'),
    convertStringToJson = _require.convertStringToJson,
    extractClassDetails = _require.extractClassDetails;

function getComponentNamespace(component) {
  var componentNS = component;

  if (typeof component === 'function') {
    if (component.NS) {
      componentNS = component.NS;
    } else {
      componentNS = component.prototype.constructor.name;
    }
  }

  return componentNS;
}

var AppProperties = {
  _NS: 'LVL99:App',

  _ns: 'lvl99-app',

  _properties: {},

  _attributes: {},

  _components: {},

  _componentInstances: {}
};

var App = function (_Entity) {
  _inherits(App, _Entity);

  function App(attributes) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, attributes));
  }

  _createClass(App, [{
    key: "extend",
    value: function extend() {
      var _get2;

      (_get2 = _get(App.prototype.__proto__ || Object.getPrototypeOf(App.prototype), "extend", this)).call.apply(_get2, [this, AppProperties].concat(Array.prototype.slice.call(arguments)));
    }
  }, {
    key: "registerComponentClass",
    value: function registerComponentClass(componentClass, componentClassNamespace) {
      var componentClassNS = void 0;

      if (!componentClass) {
        throw new Error('No component class was given');
      }

      componentClassNS = getComponentNamespace(componentClassNamespace || componentClass);

      if (componentClassNS) {
        this._components[componentClassNS] = componentClass;
      }
    }
  }, {
    key: "deregisterComponentClass",
    value: function deregisterComponentClass(componentClassNamespace) {
      var componentClassNS = void 0;

      if (!componentClassNamespace) {
        throw new Error('No component class namespace was given');
      }

      componentClassNS = getComponentNamespace(componentClassNamespace);

      if (componentClassNS && this._components.hasOwnProperty(componentClassNS)) {
        this._components[componentClassNS] = undefined;
        delete this._components[componentClassNS];
      }
    }
  }, {
    key: "getComponentClass",
    value: function getComponentClass(componentClassNamespace) {
      var componentClassNS = componentClassNamespace;

      if (!componentClassNamespace) {
        throw new Error('No component class namespace was given');
      }

      if (componentClassNS && this._components.hasOwnProperty(componentClassNS)) {
        return this._components[componentClassNS];
      }

      return undefined;
    }
  }, {
    key: "addComponentInstance",
    value: function addComponentInstance(componentInstance) {
      componentInstance._app = this;

      this._componentInstances[componentInstance.uuid] = componentInstance;

      componentInstance.init();
    }
  }, {
    key: "createComponentInstance",
    value: function createComponentInstance(componentClassNamespace, attributes) {
      if (this._components.hasOwnProperty(componentClassNamespace)) {
        var newComponent = new this._components[componentClassNamespace](attributes);

        this.addComponentInstance(newComponent);

        return newComponent;
      }
    }
  }, {
    key: "getComponentInstance",
    value: function getComponentInstance(componentUUID) {

      if (this._componentInstances.hasOwnProperty(componentUUID)) {
        return this._componentInstances[componentUUID];
      }

      return undefined;
    }
  }, {
    key: "removeComponentInstance",
    value: function removeComponentInstance(componentUUID) {

      var removeComponentInstance = this.getComponentInstance(componentUUID);
      if (typeof removeComponentInstance !== 'undefined') {

        removeComponentInstance.destroy();

        this._componentInstances[componentUUID] = undefined;
        delete this._componentInstances[componentUUID];
      }
    }
  }, {
    key: "initialiseComponents",
    value: function initialiseComponents() {
      var _this2 = this;

      $('[data-component]').not('[data-component-id]').each(function (index, elem) {
        var $elem = $(elem);
        var elemComponentClass = $elem.attr('data-component');
        var elemComponentOptions = $elem.attr('data-component-options') || {};

        console.log(_this2._NS + ".initialiseComponents: found element to initialise with component", {
          index: index,
          elem: elem,
          elemComponentClass: elemComponentClass,
          elemComponentOptions: elemComponentOptions
        });

        if (!_this2.getComponentClass(elemComponentClass)) {
          console.error(_this2._NS + ".initialiseComponents: element's component class not registered", {
            app: _this2,
            index: index,
            elem: elem,
            elemComponentClass: elemComponentClass,
            elemComponentOptions: elemComponentOptions
          });
          return;
        }

        if (typeof elemComponentOptions === 'string') {
          if (/^\{/.test(elemComponentOptions)) {
            elemComponentOptions = convertStringToJson(elemComponentOptions);
          } else {
            elemComponentOptions = extractClassDetails(elemComponentOptions);
          }
        }

        if (!elemComponentOptions.hasOwnProperty('$elem')) {
          elemComponentOptions.$elem = $elem;
        }

        var elemComponentInstance = _this2.createComponentInstance(elemComponentClass, elemComponentOptions);

        console.log('Initialised component instance', {
          index: index,
          elem: elem,
          elemComponentOptions: elemComponentOptions,
          elemComponentInstance: elemComponentInstance
        });
      });
    }
  }]);

  return App;
}(Entity);

module.exports = App;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../utils/parse":15,"./entity":4,"uuid":19}],3:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var objectPath = require('object-path');
var merge = require('lodash.merge');
var uuid = require('uuid');
var Entity = require('./entity');

var _require = require('../common'),
    $ = _require.$,
    $doc = _require.$doc;

var _require2 = require('../utils/parse'),
    extractTriggerDetails = _require2.extractTriggerDetails,
    extractTargetEventNames = _require2.extractTargetEventNames,
    getTargetBySelector = _require2.getTargetBySelector,
    getTargetSelector = _require2.getTargetSelector;

var ComponentProperties = {
  _NS: 'LVL99:Component',

  _ns: 'lvl99-component',

  _properties: {
    publicMethods: [],

    $classTarget: undefined
  },

  _attributes: {
    $elem: undefined
  }
};

var Component = function (_Entity) {
  _inherits(Component, _Entity);

  function Component(attributes) {
    _classCallCheck(this, Component);

    return _possibleConstructorReturn(this, (Component.__proto__ || Object.getPrototypeOf(Component)).call(this, attributes));
  }

  _createClass(Component, [{
    key: 'extend',
    value: function extend() {
      var _get2;

      var args = [].concat(Array.prototype.slice.call(arguments));
      var allPublicMethods = ComponentProperties._properties.publicMethods.slice(0);
      args.forEach(function (arg) {
        var hasPublicMethods = objectPath.get(arg, '_properties.publicMethods');
        if (hasPublicMethods && hasPublicMethods instanceof Array) {
          allPublicMethods = allPublicMethods.concat(hasPublicMethods);
        }
      });
      allPublicMethods = Array.from(new Set(allPublicMethods));

      (_get2 = _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'extend', this)).call.apply(_get2, [this, ComponentProperties].concat(Array.prototype.slice.call(arguments), [{
        _properties: {
          publicMethods: allPublicMethods
        }
      }]));
    }
  }, {
    key: 'getElem',
    value: function getElem() {
      if (!this.getAttr('elem') && (!this.getAttr('$elem') || !this.getAttr('$elem').length)) {
        console.warn(this.NS + '.getElem: no elem was found for this component. This may cause problems with components which rely on the elem attribute.');
        return undefined;
      }

      if (typeof this.getAttr('elem') === 'string' || typeof this.getAttr('$elem') === 'string') {
        var $elem = $(this.getAttr('elem'));
        if ($elem.length) {
          this.setAttr('elem', $elem[0]);
          this.setAttr('$elem', $elem);
        }
      }

      if (this.getAttr('elem') && !this.getAttr('$elem')) {
        this.setAttr($(this.getAttr('elem')));
      }

      return this.getAttr('$elem');
    }
  }, {
    key: 'markElem',
    value: function markElem() {
      if (this.getElem() && this.getElem().length) {
        if (!this.getElem().attr('data-component')) {
          this.getElem().attr('data-component', this.NS);
        }

        if (!this.getElem().attr('data-component-id')) {
          this.getElem().attr('data-component-id', this.uuid);
        }

        this.triggerEvent('markElem:end');
      }
    }
  }, {
    key: 'getClassTarget',
    value: function getClassTarget() {
      var $classTarget = this.getAttr('$classTarget');

      if (!$classTarget || !$classTarget.length) {
        $classTarget = this.getProp('$classTarget');
      }

      if (!$classTarget || !$classTarget.length) {
        $classTarget = this.getElem();

        this.setAttr('$classTarget', $classTarget);
      }

      return $classTarget;
    }
  }, {
    key: 'loadAttrs',
    value: function loadAttrs() {
      if (this.getElem() && this.getElem().is('[data-component-attributes]')) {
        var attrs = {};

        try {
          attrs = JSON.parse(this.getElem().attr('data-component-attributes'));
        } catch (e) {
          console.error('[' + this.NS + '] loadAttrs: Error loading attributes from DOM element');
        }

        this._attributes = merge(this._attributes, attrs);

        this.getElem().removeAttr('data-component-attributes');

        return this._attributes;
      }
    }
  }, {
    key: 'init',
    value: function init() {
      var _this2 = this,
          _arguments = arguments;

      _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'init', this).apply(this, arguments);

      this.markElem();

      var publicMethods = this.getProp('publicMethods');
      if (publicMethods && publicMethods.length) {
        publicMethods.forEach(function (trigger) {
          var triggerDetails = {};

          if ((typeof trigger === 'undefined' ? 'undefined' : _typeof(trigger)) === 'object') {
            triggerDetails = trigger;
          } else if (typeof trigger === 'string') {
            if (/^{/.test(trigger) || /[:;]/.test(trigger)) {
              triggerDetails = extractTriggerDetails(trigger);
            } else {
              triggerDetails.do = trigger;
            }
          }

          if (!objectPath.has(triggerDetails, 'on')) {
            triggerDetails.on = triggerDetails.do;
          }

          triggerDetails.context = _this2;

          var method = undefined;
          try {
            method = triggerDetails.context[triggerDetails.do];
          } catch (e) {
            throw new Error('[' + _this2.NS + '] init: public method \'' + triggerDetails.do + '\' was not found on this component');
          }

          if (typeof method === 'function') {
            var doComponentMethod = function doComponentMethod(jQueryEvent) {
              console.log('Triggered ' + _this2.NS + ':' + triggerDetails.do, {
                _class: _this2,
                _method: method,
                jQueryEvent: jQueryEvent,
                args: _arguments
              });

              method.call(_this2, jQueryEvent);
            };

            if (triggerDetails.selector) {
              _this2.bindEventToTargetSelector(triggerDetails.on, triggerDetails.selector, doComponentMethod, triggerDetails.target);
            } else {
              _this2.bindEventToTarget(triggerDetails.on, doComponentMethod, triggerDetails.target);
            }
          } else {
            throw new Error('[' + _this2.NS + '] init: public method \'' + triggerDetails.do + '\' is not a valid function');
          }
        });
      }

      this.loadAttrs();

      this.triggerEvent('init:end');
    }
  }, {
    key: 'destroy',
    value: function destroy() {
      this.triggerEvent('destroy:beforeend');

      _get(Component.prototype.__proto__ || Object.getPrototypeOf(Component.prototype), 'destroy', this).apply(this, arguments);
    }
  }, {
    key: 'bindEventToTarget',
    value: function bindEventToTarget(eventName, method, target) {
      if (!target) {
        target = document;
      } else {
        switch (target) {
          case 'document':
            target = document;
            break;

          case 'window':
            target = window;
            break;

          case 'self':
            target = this.getElem()[0];
            break;
        }
      }

      var eventNames = extractTargetEventNames(eventName, this.NS);

      if (eventNames) {
        $(target).on(eventNames.join(' '), method);
      }
    }
  }, {
    key: 'bindEventToTargetSelector',
    value: function bindEventToTargetSelector(eventName, selector, method, target) {
      target = getTargetBySelector(target, this);
      selector = getTargetSelector(selector, this);
      var eventNames = extractTargetEventNames(eventName, this.NS);

      if (eventNames) {
        $(target).on(eventNames.join(' '), selector, method);
      }
    }
  }, {
    key: 'triggerEvent',
    value: function triggerEvent(eventName) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      $doc.trigger(this.NS + ':' + eventName, [this].concat(args));
    }
  }, {
    key: 'triggerEventOnSelector',
    value: function triggerEventOnSelector(eventName, selector) {
      selector = getTargetSelector(selector, this);

      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      $(selector).trigger(this.NS + ':' + eventName, [this].concat(args));
    }
  }]);

  return Component;
}(Entity);

module.exports = Component;

},{"../common":1,"../utils/parse":15,"./entity":4,"lodash.merge":17,"object-path":18,"uuid":19}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuid = require('uuid');
var merge = require('lodash.merge');
var objectPath = require('object-path');

var _require = require('../utils/inheritance'),
    exposePrivateProperties = _require.exposePrivateProperties;

var EntityProperties = {
  _NS: 'LVL99:Entity',

  _ns: 'lvl99-entity',

  _properties: {},

  _attributes: {}
};

var Entity = function () {
  function Entity(attributes) {
    _classCallCheck(this, Entity);

    this.extend({
      _attributes: attributes
    });

    exposePrivateProperties(this);

    Object.defineProperty(this, 'uuid', {
      value: this.NS + ':' + uuid.v4(),
      writable: false,
      enumerable: true,
      configurable: false
    });
  }

  _createClass(Entity, [{
    key: 'extend',
    value: function extend() {
      merge.apply(undefined, [this, EntityProperties].concat(Array.prototype.slice.call(arguments)));

      return this;
    }
  }, {
    key: 'getProp',
    value: function getProp(propName) {
      if (!propName || typeof propName !== 'string') {
        throw new Error('[' + this.NS + '] get: \'propName\' value is invalid');
      }

      return objectPath.get(this.properties, propName);
    }
  }, {
    key: 'setProp',
    value: function setProp(propName, propValue) {
      if (!propName || typeof propName !== 'string') {
        throw new Error('[' + this.NS + '] set: \'propName\' value is invalid');
      }

      return objectPath.set(this.properties, propName, propValue);
    }
  }, {
    key: 'getAttr',
    value: function getAttr(attrName) {
      if (!attrName || typeof attrName !== 'string') {
        throw new Error('[' + this.NS + '] getAttr: \'attrName\' value is invalid');
      }

      return objectPath.get(this.attributes, attrName);
    }
  }, {
    key: 'setAttr',
    value: function setAttr(attrName, attrValue) {
      if (!attrName || typeof attrName !== 'string') {
        throw new Error('[' + this.NS + '] setAttr: \'attrName\' value is invalid');
      }

      return objectPath.set(this.attributes, attrName, attrValue);
    }
  }, {
    key: 'init',
    value: function init() {}
  }, {
    key: 'destroy',
    value: function destroy() {}
  }]);

  return Entity;
}();

module.exports = Entity;

},{"../utils/inheritance":14,"lodash.merge":17,"object-path":18,"uuid":19}],5:[function(require,module,exports){
'use strict';

var Entity = require('./entity');
var App = require('./app');
var Component = require('./component');

var core = {
  Entity: Entity,
  App: App,
  Component: Component
};

module.exports = core;

},{"./app":2,"./component":3,"./entity":4}],6:[function(require,module,exports){
'use strict';

var common = require('./common');
var utils = require('./utils');
var core = require('./core');
var tools = require('./tools');

var lvl99 = {
  common: common,
  core: core,
  utils: utils,
  tools: tools
};

module.exports = lvl99;

},{"./common":1,"./core":5,"./tools":9,"./utils":13}],7:[function(require,module,exports){
'use strict';

var merge = require('lodash.merge');

function Breakpoints(sizes) {
  return {
    sizes: sizes || {
      'xs': [0, 399],
      'mobile': [0, 799],
      'ms': [400, 599],
      's': [600, 799],
      'm': [800, 999],
      'tablet': [800, 1199],
      'l': [1000, 1199],
      'laptop': [1000, 1399],
      'computer': [1000, 99999],
      'xl': [1200, 1399],
      'desktop': [1200, 99999],
      'xxl': [1400, 99999]
    },

    getActive: function getActive() {
      var width = window.innerWidth;
      var bp = [];

      for (var x in this.sizes) {
        if (this.sizes.hasOwnProperty(x) && width >= this.sizes[x][0] && width <= this.sizes[x][1]) {
          bp.push(x);
        }
      }

      return bp;
    },
    isActive: function isActive(input) {
      if (input instanceof Array) {
        input = input.join('|');
      }

      if (typeof input === 'string') {
        input = new RegExp('\\b(?:' + input.replace(/[\s,]+/g, '|') + ')\\b', 'i');
      }

      return input.test(this.getActive() + '');
    }
  };
}

module.exports = Breakpoints;

},{"lodash.merge":17}],8:[function(require,module,exports){
"use strict";

function noop() {}

function Debug() {
  var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (silent) {
    return {
      clear: noop,
      count: noop,
      debug: noop,
      error: noop,
      group: noop,
      info: noop,
      log: noop,
      table: noop,
      time: noop,
      timeEnd: noop,
      trace: noop,
      warn: noop
    };
  } else {
    return console || window.console;
  }
}

module.exports = Debug;

},{}],9:[function(require,module,exports){
'use strict';

var Breakpoints = require('./breakpoints');
var Debug = require('./debug');
var Queue = require('./queue');
var TrackEvent = require('./trackevent');
var SmoothScroll = require('./smooth-scroll');

var utils = {
  Breakpoints: Breakpoints,
  Debug: Debug,
  Queue: Queue,
  TrackEvent: TrackEvent,
  SmoothScroll: SmoothScroll
};

module.exports = tools;

},{"./breakpoints":7,"./debug":8,"./queue":10,"./smooth-scroll":11,"./trackevent":12}],10:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var merge = require('lodash.merge');

function Queue(options) {
  var _options = merge({
    queue: {},
    timer: 0,
    timerDelay: 100
  }, options);

  var _queue = _options.queue;

  var _timer = _options.timer;

  var _timerDelay = _options.timerDelay;

  var _status = 1;

  return {
    queue: function queue(actionLabel, action) {
      for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      if (!actionLabel) {
        actionLabel = Date.now() + '';
      }

      if (actionLabel && action && typeof action === 'function') {
        _queue[actionLabel] = {
          action: action,
          args: args
        };
      }

      return this;
    },
    add: function add(actionLabel, action) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      this.queue.apply(this, [actionLabel, action].concat(_toConsumableArray(args)));

      if (_status) {
        this.play();
      }

      return this;
    },
    sync: function sync(actionLabel, action) {
      clearTimeout(_timer);

      for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      this.queue.apply(this, [actionLabel, action].concat(_toConsumableArray(args)));

      this.run();

      return this;
    },
    getActionByLabel: function getActionByLabel(actionLabel) {
      if (_queue.hasOwnProperty(actionLabel)) {
        return _queue[actionLabel];
      }

      return undefined;
    },
    remove: function remove(actionLabel) {
      if (_queue.hasOwnProperty(actionLabel)) {
        _queue[actionLabel] = undefined;
        delete _queue[actionLabel];
      }

      return this;
    },
    play: function play() {
      clearTimeout(_timer);

      _status = 1;

      _timer = setTimeout(function runQueueProcessAfterDelay(queueInstance) {
        queueInstance.run();
      }(this), _timerDelay);

      return this;
    },
    pause: function pause() {
      clearTimeout(_timer);

      _status = 0;

      return this;
    },
    run: function run() {
      clearTimeout(_timer);

      if (!Object.keys(_queue).length) {
        this.pause();

        return this;
      }

      for (var actionLabel in _queue) {
        if (_queue.hasOwnProperty(actionLabel) && _queue[actionLabel]) {
          var queuedItem = _queue[actionLabel];

          if (queuedItem && typeof queuedItem === 'function') {
            queuedItem();
          } else if (queuedItem.hasOwnProperty('action') && typeof queuedItem.action === 'function') {
            if (queuedItem.hasOwnProperty('args') && queuedItem.args instanceof Array) {
              queuedItem.action.apply(queuedItem, _toConsumableArray(queuedItem.args));
            } else {
              queuedItem.action();
            }
          }

          _queue[actionLabel] = undefined;
          delete _queue[actionLabel];
        }
      }

      return this;
    },
    checkStatus: function checkStatus() {
      return _status;
    },
    getTimerDelay: function getTimerDelay() {
      return _timerDelay;
    },
    setTimerDelay: function setTimerDelay(timerDelay) {
      if (timerDelay && timerDelay > 0) {
        _timerDelay = timerDelay;
      }

      return this;
    },
    getQueueLength: function getQueueLength() {
      return Object.keys(_queue).length;
    }
  };
}

module.exports = Queue;

},{"lodash.merge":17}],11:[function(require,module,exports){
'use strict';

var SmoothScroll = function SmoothScroll($, options) {
  var settings = $.extend({
    bufferTop: 0,

    scrollSpeed: 1000,

    triggerDistance: 400
  }, options);

  function scrollTo(target, scrollToOptions) {
    var $target = $(target).not('[data-disable-smooth-scroll]');

    $target = $target.length > 1 ? $target.eq(0) : $target;

    if ($target.length === 1) {
      var scrollToSettings = $.extend({}, settings, scrollToOptions);

      var targetOffsetTop = $target.offset().top;

      var windowScrollTop = $(window).scrollTop();

      var scrollTop = targetOffsetTop - (typeof scrollToSettings.bufferTop === 'function' ? scrollToSettings.bufferTop() : scrollToSettings.bufferTop);

      var checkTriggerDistance = Math.abs(windowScrollTop - scrollTop);
      if (checkTriggerDistance < scrollToSettings.triggerDistance) {
        return;
      }

      $target.trigger('SmoothScroll.scrollTo:start', [scrollToSettings]);

      $('html, body').animate({
        scrollTop: scrollTop
      }, scrollToSettings.scrollSpeed, function () {
        $target.focus();

        $target.trigger('SmoothScroll.scrollTo:end', [scrollToSettings]);

        if ($target.is(':focus')) {
          return false;
        }
      });
    }
  }

  function init() {
    $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
      var $a = $(event.target).closest('a');
      var hash = $a.attr('href').replace(/.*#([^?]+).*/, '#$1');
      if ($(hash).length > 0) {
        event.preventDefault();
        scrollTo(hash);
      }
    });

    $(document).on('SmoothScroll.scrollTo', function (event, scrollToOptions) {
      if (event.target) {
        scrollTo(event.target, scrollToOptions);
      }
    });

    if (window.location.hash) {
      setTimeout(function () {
        scrollTo(window.location.hash);
      }, 1000);
    }
  }

  return {
    init: init,
    scrollTo: scrollTo
  };
};

module.exports = SmoothScroll;

},{}],12:[function(require,module,exports){
'use strict';

function TrackEvent(debug) {
  var saved = [];

  this.gaLoadedTimer = setInterval(function (lvl99TrackEvent) {
    var i = void 0;

    if (typeof window.ga !== 'undefined') {
      clearInterval(lvl99TrackEvent.gaLoadedTimer);

      if (lvl99TrackEvent.saved.length > 0) {
        if (debug && window.console && window.console.log) {
          console.log('Sending ' + lvl99TrackEvent.saved.length + ' tracked events to ga');
        }

        for (i in lvl99TrackEvent.saved) {
          window.ga('send', lvl99TrackEvent.saved[i]);
        }
        lvl99TrackEvent.saved = [];
      }
    }
  }(this), 5000);

  return function track(eventCategory, eventAction, eventLabel, eventValue) {
    var trackedEvent = {
      hitType: 'event',
      eventCategory: eventCategory,
      eventAction: eventAction,
      eventLabel: eventLabel,
      eventValue: eventValue
    };

    if (!eventCategory || !eventAction) return;
    if (typeof eventValue === 'string') return;

    if (typeof window.ga !== 'undefined') {
      if (debug && window.console && window.console.log) {
        console.log('Send trackedEvent to GA', trackedEvent);
      }
      window.ga('send', trackedEvent);
    } else {
      if (debug && window.console && window.console.log) {
        console.log('GA not loaded yet, store trackedEvent', trackedEvent);
      }
      this.saved.push(trackedEvent);
    }
  };
}

module.exports = TrackEvent;

},{}],13:[function(require,module,exports){
'use strict';

var parse = require('./parse');
var inheritance = require('./inheritance');


var utils = {
  parse: parse,
  inheritance: inheritance
};

module.exports = utils;

},{"./inheritance":14,"./parse":15}],14:[function(require,module,exports){
'use strict';

var RE_PRIVATE = /^_/;

function exposeAllProperties(target, defaultPropValues, whitelist) {
  var properties = void 0;

  if (!target) {
    throw new Error('No target was given');
  }

  properties = Object.keys(target).filter(function (item) {
    return whitelist && whitelist.includes(item) || !whitelist;
  });

  if (!properties || !properties.length) {
    throw new Error('No properties were given');
  }

  if (typeof defaultPropValues === 'undefined') {
    defaultPropValues = target;
  }

  properties.forEach(function (propName) {
    var usePropName = propName;

    if (RE_PRIVATE.test(propName)) {
      usePropName = propName.replace(RE_PRIVATE, '');

      createPublicGetProperty(target, propName, usePropName, defaultPropValues[propName]);
    } else {
      createPublicGetSetProperty(target, propName, usePropName, defaultPropValues[propName]);
    }
  });
}

function exposePrivateProperties(target, defaultPropValues, whitelist) {
  var properties = void 0;

  if (!target) {
    throw new Error('No target was given');
  }

  properties = Object.keys(target).filter(function (item) {
    if (whitelist && whitelist.includes(item) || !whitelist) {
      return RE_PRIVATE.test(item);
    }
    return false;
  });

  if (!properties.length) {
    return;
  }

  if (typeof defaultPropValues === 'undefined') {
    defaultPropValues = target;
  }

  properties.forEach(function (propName) {
    var usePropName = propName;

    usePropName = propName.replace(RE_PRIVATE, '');

    createPublicGetProperty(target, propName, usePropName, defaultPropValues[propName]);
  });
}

function createPublicGetProperty(target, targetPropName, newPropName, defaultPropValue) {
  if (!target.hasOwnProperty(newPropName)) {
    Object.defineProperty(target, newPropName, {
      get: function get() {
        return typeof target[targetPropName] !== 'undefined' ? target[targetPropName] : defaultPropValue;
      },

      set: undefined,
      enumerable: true
    });
  }
}

function createPublicGetSetProperty(target, targetPropName, newPropName, defaultPropValue) {
  if (!target.hasOwnProperty(newPropName)) {
    Object.defineProperty(target, newPropName, {
      get: function get() {
        return typeof target[targetPropName] !== 'undefined' ? target[targetPropName] : defaultPropValue;
      },
      set: function set(newValue) {
        target[targetPropName] = newValue;
      },

      enumerable: true
    });
  }
}

var inheritance = {
  exposeAllProperties: exposeAllProperties,
  exposePrivateProperties: exposePrivateProperties,
  createPublicGetProperty: createPublicGetProperty,
  createPublicGetSetProperty: createPublicGetSetProperty
};

module.exports = inheritance;

},{}],15:[function(require,module,exports){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var __loggerPath = 'lvl99/utils/parse';
var objectPath = require('object-path');

function coerceToPrimitiveType(input) {
  if (typeof input !== 'string') return input;

  input = (input + '').trim();

  if (/^\-?(?:\d*[\.\,])*\d*(?:[eE](?:\-?\d+)?)?$/.test(input)) {
    return parseFloat(input);
  } else if (/^(true|1)$/.test(input)) {
    return true;
  } else if (/^NaN$/.test(input)) {
    return NaN;
  } else if (/^undefined$/.test(input)) {
    return undefined;
  } else if (/^null$/.test(input)) {
    return null;
  } else if (/^(false|0)$/.test(input) || input === '') {
    return false;
  } else if (/^[\[\{]/.test(input) && /[\]\}]$/.test(input)) {
    return convertStringToJson(input);
  }

  return input;
}

function convertToBoolean(input) {
  if (input === true || input === false) {
    return input;
  }

  switch (input) {
    case 1:
    case '1':
    case 'true':
      return true;

    case 0:
    case '0':
    case 'false':
    case undefined:
    case 'undefined':
    case null:
    case 'null':
    case NaN:
    case 'NaN':
    case '':
      return false;
  }

  return !!input;
}

function convertStringToJson(input) {
  var output = input;

  if (typeof input === 'string') {
    try {
      output = JSON.parse(input);
    } catch (e) {
      console.error(_loggerPath + '.convertStringToJson: Error parsing string JSON data', input);
    }
  }

  return output;
}

function convertStringToFloat(input) {
  if (typeof input === 'number') {
    return input;
  }

  var output = parseFloat((input + '').replace(/[^\d\-\.]+/g, ''));

  if (!isFinite(input) || isNaN(input) || isNaN(output)) {
    output = 0;
  }

  return output;
}

function extractClassDetails(input) {
  var output = {};
  var inputParts = [input];

  if (/;/.test(input)) {
    inputParts = input.split(';');
  }

  inputParts.forEach(function (part) {
    part = part.trim();
    if (part) {
      var partParts = part.match(/([a-z0-9_.-]+):([^;]+);?/i);
      var partName = partParts[1].trim();
      var partValue = coerceToPrimitiveType(partParts[2].trim());

      if (/\./.test(partName)) {
        var objParts = partName.split('.');
        var objPartPath = '';

        for (var objPartIndex = 0; objPartIndex < objParts.length - 1; objPartIndex++) {
          objPartPath += (objPartIndex > 0 ? '.' : '') + objParts[objPartIndex];

          if (!objectPath.has(output, objPartPath)) {

            objectPath.set(output, objPartPath, {});
          }
        }
      }

      objectPath.set(output, partName, partValue);
    }
  });

  return output;
}

function extractTriggerDetails(input, context) {
  var trigger = input;

  if (!context) {
    context = window;
  }

  if (typeof input === 'string') {
    if (/^{/.test(input)) {
      trigger = convertStringToJson(input);
    } else if (/^[a-z0-9_-]+:/.test(input)) {
      trigger = extractClassDetails(input);
    } else if (!/ /.test(input)) {
      trigger = {
        do: input
      };
    }
  }

  if ((typeof trigger === 'undefined' ? 'undefined' : _typeof(trigger)) !== 'object') {
    throw new Error(_loggerPath + '.extractTriggerDetails: input was not valid JSON or CSS-style definition');
  }

  if (!objectPath.has(trigger, 'do')) {
    throw new Error(_loggerPath + '.extractTriggerDetails: trigger is missing required \'do\' property');
  }

  if (objectPath.has(trigger, 'target')) {
    switch (trigger.target) {
      case 'self':
        console.log('Targeting self', context);
        trigger.target = context;
        break;

      case 'document':
        trigger.target = document;
        break;

      case 'window':
        trigger.target = window;
        break;
    }
  }

  if (objectPath.has(trigger, 'context')) {
    switch (trigger.context) {
      case 'document':
        trigger.context = document;
        break;

      case 'window':
        trigger.context = window;
        break;
    }
  } else {
    trigger.context = context;
  }

  return trigger;
}

function fixedEncodeURIComponent(input) {
  return encodeURIComponent(input).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

function getTargetBySelector(target, context) {
  if (!target) {
    target = document;
  }

  if (typeof target === 'string') {
    switch (target) {
      case 'document':
        target = document;
        break;

      case 'window':
        target = window;
        break;

      case 'self':
        target = context;
        break;
    }
  }

  return target;
}

function getTargetSelector(target, context) {
  if (typeof target === 'string') {
    return target;
  }

  if ($.isWindow(target)) {
    return 'window';
  } else if (target === document) {
    return 'document';
  } else if (target.hasOwnProperty('uuid')) {
    return '[data-component-id="' + target.uuid + '"]';
  } else if ($(target).length) {
    if ($(target).attr('data-component-id')) {
      return '[data-component-id="' + $(target).attr('data-component-id') + '"]';
    } else if ($(target).attr('id')) {
      return '#' + $(target).attr('id');
    } else {
      return '' + target.tagName.toLowerCase();
    }
  }

  return target;
}

function extractTargetEventNames(inputEventNames, namespace) {
  var targetEventNames = [];
  var eventNames = inputEventNames;

  if (typeof inputEventNames === 'string') {
    if (/\s/.test(inputEventNames)) {
      eventNames = inputEventNames.split(/\s+/);
    } else {
      eventNames = [inputEventNames];
    }
  }

  if (eventNames instanceof Array) {
    eventNames.forEach(function (eventName) {
      var targetEventName = typeof namespace === 'string' && namespace !== '' ? namespace + ':' + eventName : eventName;

      if (/^dom:/i.test(eventName)) {
        targetEventName = eventName.replace(/^dom\:/gi, '', eventName);
      }

      targetEventNames.push(targetEventName);
    });

    return targetEventNames;
  }

  return false;
}

var parse = {
  coerceToPrimitiveType: coerceToPrimitiveType,
  convertToBoolean: convertToBoolean,
  convertStringToJson: convertStringToJson,
  convertStringToFloat: convertStringToFloat,
  extractClassDetails: extractClassDetails,
  extractTriggerDetails: extractTriggerDetails,
  fixedEncodeURIComponent: fixedEncodeURIComponent,
  getTargetBySelector: getTargetBySelector,
  getTargetSelector: getTargetSelector,
  extractTargetEventNames: extractTargetEventNames
};

module.exports = parse;

},{"object-path":18}],16:[function(require,module,exports){
/**
 * LVL99
 */

const lvl99 = require('./es6')

module.exports = lvl99

},{"./es6":6}],17:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (typeof key == 'number' && value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  if (!(isArray(source) || isTypedArray(source))) {
    var props = baseKeysIn(source);
  }
  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  });
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    newValue = srcValue;
    if (isArray(srcValue) || isTypedArray(srcValue)) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
      else {
        newValue = objValue;
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = merge;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],18:[function(require,module,exports){
(function (root, factory){
  'use strict';

  /*istanbul ignore next:cant test*/
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else {
    // Browser globals
    root.objectPath = factory();
  }
})(this, function(){
  'use strict';

  var toStr = Object.prototype.toString;
  function hasOwnProperty(obj, prop) {
    if(obj == null) {
      return false
    }
    //to handle objects with null prototypes (too edge case?)
    return Object.prototype.hasOwnProperty.call(obj, prop)
  }

  function isEmpty(value){
    if (!value) {
      return true;
    }
    if (isArray(value) && value.length === 0) {
        return true;
    } else if (typeof value !== 'string') {
        for (var i in value) {
            if (hasOwnProperty(value, i)) {
                return false;
            }
        }
        return true;
    }
    return false;
  }

  function toString(type){
    return toStr.call(type);
  }

  function isObject(obj){
    return typeof obj === 'object' && toString(obj) === "[object Object]";
  }

  var isArray = Array.isArray || function(obj){
    /*istanbul ignore next:cant test*/
    return toStr.call(obj) === '[object Array]';
  }

  function isBoolean(obj){
    return typeof obj === 'boolean' || toString(obj) === '[object Boolean]';
  }

  function getKey(key){
    var intKey = parseInt(key);
    if (intKey.toString() === key) {
      return intKey;
    }
    return key;
  }

  function factory(options) {
    options = options || {}

    var objectPath = function(obj) {
      return Object.keys(objectPath).reduce(function(proxy, prop) {
        if(prop === 'create') {
          return proxy;
        }

        /*istanbul ignore else*/
        if (typeof objectPath[prop] === 'function') {
          proxy[prop] = objectPath[prop].bind(objectPath, obj);
        }

        return proxy;
      }, {});
    };

    function hasShallowProperty(obj, prop) {
      return (options.includeInheritedProps || (typeof prop === 'number' && Array.isArray(obj)) || hasOwnProperty(obj, prop))
    }

    function getShallowProperty(obj, prop) {
      if (hasShallowProperty(obj, prop)) {
        return obj[prop];
      }
    }

    function set(obj, path, value, doNotReplace){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (typeof path === 'string') {
        return set(obj, path.split('.').map(getKey), value, doNotReplace);
      }
      var currentPath = path[0];
      var currentValue = getShallowProperty(obj, currentPath);
      if (path.length === 1) {
        if (currentValue === void 0 || !doNotReplace) {
          obj[currentPath] = value;
        }
        return currentValue;
      }

      if (currentValue === void 0) {
        //check if we assume an array
        if(typeof path[1] === 'number') {
          obj[currentPath] = [];
        } else {
          obj[currentPath] = {};
        }
      }

      return set(obj[currentPath], path.slice(1), value, doNotReplace);
    }

    objectPath.has = function (obj, path) {
      if (typeof path === 'number') {
        path = [path];
      } else if (typeof path === 'string') {
        path = path.split('.');
      }

      if (!path || path.length === 0) {
        return !!obj;
      }

      for (var i = 0; i < path.length; i++) {
        var j = getKey(path[i]);

        if((typeof j === 'number' && isArray(obj) && j < obj.length) ||
          (options.includeInheritedProps ? (j in Object(obj)) : hasOwnProperty(obj, j))) {
          obj = obj[j];
        } else {
          return false;
        }
      }

      return true;
    };

    objectPath.ensureExists = function (obj, path, value){
      return set(obj, path, value, true);
    };

    objectPath.set = function (obj, path, value, doNotReplace){
      return set(obj, path, value, doNotReplace);
    };

    objectPath.insert = function (obj, path, value, at){
      var arr = objectPath.get(obj, path);
      at = ~~at;
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }
      arr.splice(at, 0, value);
    };

    objectPath.empty = function(obj, path) {
      if (isEmpty(path)) {
        return void 0;
      }
      if (obj == null) {
        return void 0;
      }

      var value, i;
      if (!(value = objectPath.get(obj, path))) {
        return void 0;
      }

      if (typeof value === 'string') {
        return objectPath.set(obj, path, '');
      } else if (isBoolean(value)) {
        return objectPath.set(obj, path, false);
      } else if (typeof value === 'number') {
        return objectPath.set(obj, path, 0);
      } else if (isArray(value)) {
        value.length = 0;
      } else if (isObject(value)) {
        for (i in value) {
          if (hasShallowProperty(value, i)) {
            delete value[i];
          }
        }
      } else {
        return objectPath.set(obj, path, null);
      }
    };

    objectPath.push = function (obj, path /*, values */){
      var arr = objectPath.get(obj, path);
      if (!isArray(arr)) {
        arr = [];
        objectPath.set(obj, path, arr);
      }

      arr.push.apply(arr, Array.prototype.slice.call(arguments, 2));
    };

    objectPath.coalesce = function (obj, paths, defaultValue) {
      var value;

      for (var i = 0, len = paths.length; i < len; i++) {
        if ((value = objectPath.get(obj, paths[i])) !== void 0) {
          return value;
        }
      }

      return defaultValue;
    };

    objectPath.get = function (obj, path, defaultValue){
      if (typeof path === 'number') {
        path = [path];
      }
      if (!path || path.length === 0) {
        return obj;
      }
      if (obj == null) {
        return defaultValue;
      }
      if (typeof path === 'string') {
        return objectPath.get(obj, path.split('.'), defaultValue);
      }

      var currentPath = getKey(path[0]);
      var nextObj = getShallowProperty(obj, currentPath)
      if (nextObj === void 0) {
        return defaultValue;
      }

      if (path.length === 1) {
        return nextObj;
      }

      return objectPath.get(obj[currentPath], path.slice(1), defaultValue);
    };

    objectPath.del = function del(obj, path) {
      if (typeof path === 'number') {
        path = [path];
      }

      if (obj == null) {
        return obj;
      }

      if (isEmpty(path)) {
        return obj;
      }
      if(typeof path === 'string') {
        return objectPath.del(obj, path.split('.'));
      }

      var currentPath = getKey(path[0]);
      if (!hasShallowProperty(obj, currentPath)) {
        return obj;
      }

      if(path.length === 1) {
        if (isArray(obj)) {
          obj.splice(currentPath, 1);
        } else {
          delete obj[currentPath];
        }
      } else {
        return objectPath.del(obj[currentPath], path.slice(1));
      }

      return obj;
    }

    return objectPath;
  }

  var mod = factory();
  mod.create = factory;
  mod.withInheritedProps = factory({includeInheritedProps: true})
  return mod;
});

},{}],19:[function(require,module,exports){
var v1 = require('./v1');
var v4 = require('./v4');

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;

},{"./v1":22,"./v4":23}],20:[function(require,module,exports){
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  return bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

module.exports = bytesToUuid;

},{}],21:[function(require,module,exports){
(function (global){
// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection
var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef
  rng = function whatwgRNG() {
    crypto.getRandomValues(rnds8);
    return rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}

module.exports = rng;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],22:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;

},{"./lib/bytesToUuid":20,"./lib/rng":21}],23:[function(require,module,exports){
var rng = require('./lib/rng');
var bytesToUuid = require('./lib/bytesToUuid');

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;

},{"./lib/bytesToUuid":20,"./lib/rng":21}]},{},[16])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvY29tbW9uLmVzNiIsImVzNi9jb3JlL2FwcC5lczYiLCJlczYvY29yZS9jb21wb25lbnQuZXM2IiwiZXM2L2NvcmUvZW50aXR5LmVzNiIsImVzNi9jb3JlL2luZGV4LmVzNiIsImVzNi9pbmRleC5lczYiLCJlczYvdG9vbHMvYnJlYWtwb2ludHMuZXM2IiwiZXM2L3Rvb2xzL2RlYnVnLmVzNiIsImVzNi90b29scy9pbmRleC5lczYiLCJlczYvdG9vbHMvcXVldWUuZXM2IiwiZXM2L3Rvb2xzL3Ntb290aC1zY3JvbGwuZXM2IiwiZXM2L3Rvb2xzL3RyYWNrZXZlbnQuZXM2IiwiZXM2L3V0aWxzL2luZGV4LmVzNiIsImVzNi91dGlscy9pbmhlcml0YW5jZS5lczYiLCJlczYvdXRpbHMvcGFyc2UuZXM2IiwiaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm1lcmdlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1wYXRoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDUUEsSUFBTSxJQUFLLE9BQU8sTUFBUCxLQUFrQixXQUFsQixHQUFnQyxPQUFPLFFBQVAsQ0FBaEMsR0FBbUQsT0FBTyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDLE9BQU8sUUFBUCxDQUFoQyxHQUFtRCxJQUFqSDs7QUFLQSxJQUFNLE9BQU8sRUFBRSxRQUFGLENBQWI7QUFDQSxJQUFNLE9BQU8sRUFBRSxNQUFGLENBQWI7QUFDQSxJQUFNLFFBQVEsRUFBRSxNQUFGLENBQWQ7QUFDQSxJ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QWpCOzs7QUNqYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogTFZMOTkgQ29tbW9uXG4gKlxuICogQ29tbW9uIGRlcGVuZGVuY2llcyBhbmQgb3RoZXIgdXNlZnVsIHRoaW5nc1xuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydqUXVlcnknXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2pRdWVyeSddIDogbnVsbClcblxuLyoqXG4gKiBCYXNpYyBzaG9ydGhhbmQgcHJvcHMgdG8gY2FjaGUvcmVmZXJlbmNlIGNvbW1vbiBqUXVlcnkgb2JqZWN0c1xuICovXG5jb25zdCAkZG9jID0gJChkb2N1bWVudClcbmNvbnN0ICR3aW4gPSAkKHdpbmRvdylcbmNvbnN0ICRodG1sID0gJCgnaHRtbCcpXG5jb25zdCAkYm9keSA9ICQoJ2JvZHknKVxuXG4vKipcbiAqIEV2ZW50IG5hbWUgc2hvcnRoYW5kc1xuICovXG5jb25zdCBldmVudHMgPSB7XG4gIGNsaWNrOiAnY2xpY2sgdG91Y2hlbmQnLFxuICBpbnB1dHN0YXJ0OiAnbW91c2Vkb3duIHRvdWNoc3RhcnQga2V5ZG93bicsXG4gIGlucHV0ZW5kOiAnbW91c2V1cCB0b3VjaGVuZCBrZXl1cCcsXG4gIGFuaW1hdGlvbnJ1bjogJ2FuaW1hdGlvbnJ1biB3ZWJraXRBbmltYXRpb25SdW4gd2Via2l0YW5pbWF0aW9ucnVuIG1vekFuaW1hdGlvblJ1biBNU0FuaW1hdGlvblJ1biBvQW5pbWF0aW9uUnVuIG9hbmltYXRpb25ydW4nLFxuICBhbmltYXRpb25zdGFydDogJ2FuaW1hdGlvbnN0YXJ0IHdlYmtpdEFuaW1hdGlvblN0YXJ0IHdlYmtpdGFuaW1hdGlvbnN0YXJ0IG1vekFuaW1hdGlvblN0YXJ0IE1TQW5pbWF0aW9uU3RhcnQgb0FuaW1hdGlvblN0YXJ0IG9hbmltYXRpb25zdGFydCcsXG4gIGFuaW1hdGlvbmVuZDogJ2FuaW1hdGlvbmVuZCB3ZWJraXRBbmltYXRpb25FbmQgd2Via2l0YW5pbWF0aW9uZW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQnLFxuICB0cmFuc2l0aW9ucnVuOiAndHJhbnNpdGlvbnJ1biB3ZWJraXRUcmFuc2l0aW9uUnVuIHdlYmtpdHRyYW5zaXRpb25ydW4gbW96VHJhbnNpdGlvblJ1biBNU1RyYW5zaXRpb25SdW4gb1RyYW5zaXRpb25SdW4gb3RyYW5zaXRpb25ydW4nLFxuICB0cmFuc2l0aW9uc3RhcnQ6ICd0cmFuc2l0aW9uc3RhcnQgd2Via2l0VHJhbnNpdGlvblN0YXJ0IHdlYmtpdHRyYW5zaXRpb25zdGFydCBtb3pUcmFuc2l0aW9uU3RhcnQgTVNUcmFuc2l0aW9uU3RhcnQgb1RyYW5zaXRpb25TdGFydCBvdHJhbnNpdGlvbnN0YXJ0JyxcbiAgdHJhbnNpdGlvbmVuZDogJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCB3ZWJraXR0cmFuc2l0aW9uZW5kIG1velRyYW5zaXRpb25FbmQgTVNUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJ1xufVxuXG5jb25zdCB1dGlscyA9IHtcbiAgJCxcbiAgJGRvYyxcbiAgJHdpbixcbiAgJGh0bWwsXG4gICRib2R5LFxuICBldmVudHNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsc1xuIiwiLyoqXG4gKiBMVkw5OSBBcHBcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbi8vIGNvbnN0IFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpXG5jb25zdCAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2pRdWVyeSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnalF1ZXJ5J10gOiBudWxsKVxuY29uc3QgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKVxuY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKVxuY29uc3Qge1xuICBjb252ZXJ0U3RyaW5nVG9Kc29uLFxuICBleHRyYWN0Q2xhc3NEZXRhaWxzXG59ID0gcmVxdWlyZSgnLi4vdXRpbHMvcGFyc2UnKVxuXG4vKipcbiAqIEdldCBhIGNvbXBvbmVudCdzIG5hbWVzcGFjZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfFN0cmluZ3xDb21wb25lbnR9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWVzcGFjZSAoY29tcG9uZW50KSB7XG4gIGxldCBjb21wb25lbnROUyA9IGNvbXBvbmVudFxuXG4gIC8vIEZ1bmN0aW9uL2NsYXNzIGdpdmVuXG4gIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGNvbXBvbmVudC5OUykge1xuICAgICAgY29tcG9uZW50TlMgPSBjb21wb25lbnQuTlNcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50TlMgPSBjb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50TlNcbn1cblxuLyoqXG4gKiBUaGUgQXBwJ3MgYmFzZSBwcm9wZXJ0aWVzXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgQXBwUHJvcGVydGllcyA9IHtcbiAgLyoqXG4gICAqIE5BTUVTUEFDRVxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIGN1c3RvbSBldmVudHMgYW5kIGVycm9yIHJlcG9ydGluZ1xuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgX05TOiAnTFZMOTk6QXBwJyxcblxuICAvKipcbiAgICogbmFtZXNwYWNlXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgQ1NTIGNsYXNzZXNcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIF9uczogJ2x2bDk5LWFwcCcsXG5cbiAgLyoqXG4gICAqIFRoZSBwcm9wZXJ0aWVzIHNoYXJlZCBiZXR3ZWVuIGFsbCBpbnN0YW5jZXMgb2YgdGhpcyBBcHBcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9wcm9wZXJ0aWVzOiB7fSxcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgYXR0cmlidXRlcyB0byBsb2FkIGEgY3JlYXRlZCBBcHAgaW5zdGFuY2Ugd2l0aC5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9hdHRyaWJ1dGVzOiB7fSxcblxuICAvKipcbiAgICogVGhlIGxpYnJhcnkgb2YgY29tcG9uZW50cyB0aGF0IHRoZSBhcHAgaGFzIGFjY2VzcyB0b1xuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX2NvbXBvbmVudHM6IHt9LFxuXG4gIC8qKlxuICAgKiBUaGUgY29sbGVjdGlvbiBvZiBjb21wb25lbnRzIHdoaWNoIGhhdmUgYmVlbiBpbnN0YW50aWF0ZWQgd2l0aGluIHRoZSBhcHBcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9jb21wb25lbnRJbnN0YW5jZXM6IHt9XG59XG5cbi8qKlxuICogQXBwXG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBFbnRpdHlcbiAqL1xuY2xhc3MgQXBwIGV4dGVuZHMgRW50aXR5IHtcbiAgLyoqXG4gICAqIEFwcCBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYExWTDk5OkFwcDpjb25zdHJ1Y3RvcmApXG5cbiAgICBzdXBlcihhdHRyaWJ1dGVzKVxuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVuZCB0aGUgQXBwIHdpdGggYW55IGdpdmVuIHtPYmplY3R9IGFyZ3VtZW50c1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gLi4uYXJndW1lbnRzXG4gICAqL1xuICBleHRlbmQgKCkge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGBMVkw5OTpBcHA6ZXh0ZW5kYCwge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIC8vIE1lcmdlIHRoZSBwcm9wZXJ0aWVzIHdpdGggdGhlIGluc3RhbnRpYXRlZCBhdHRyaWJ1dGVzXG4gICAgc3VwZXIuZXh0ZW5kKEFwcFByb3BlcnRpZXMsIC4uLmFyZ3VtZW50cylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGNvbXBvbmVudCBjbGFzcyBpbiB0aGUgYXBwLiBZb3UgY2FuIGFsc28gc3BlY2lmeSBhIHNlcGFyYXRlIG5hbWVzcGFjZSB0byByZWdpc3RlciBpdCB1bmRlci5cbiAgICpcbiAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudENsYXNzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnRDbGFzc05hbWVzcGFjZVxuICAgKi9cbiAgcmVnaXN0ZXJDb21wb25lbnRDbGFzcyAoY29tcG9uZW50Q2xhc3MsIGNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSB7XG4gICAgbGV0IGNvbXBvbmVudENsYXNzTlNcblxuICAgIC8vIE5vIHZhbGlkIGNvbXBvbmVudENsYXNzIGdpdmVuXG4gICAgaWYgKCFjb21wb25lbnRDbGFzcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb21wb25lbnQgY2xhc3Mgd2FzIGdpdmVuJylcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIG5hbWVzcGFjZSBmcm9tIHRoZSBjb21wb25lbnQgY2xhc3MgKG9yIG90aGVyd2lzZSBzcGVjaWZpZWQpXG4gICAgY29tcG9uZW50Q2xhc3NOUyA9IGdldENvbXBvbmVudE5hbWVzcGFjZShjb21wb25lbnRDbGFzc05hbWVzcGFjZSB8fCBjb21wb25lbnRDbGFzcylcblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBjb21wb25lbnQgY2xhc3NcbiAgICBpZiAoY29tcG9uZW50Q2xhc3NOUykge1xuICAgICAgdGhpcy5fY29tcG9uZW50c1tjb21wb25lbnRDbGFzc05TXSA9IGNvbXBvbmVudENsYXNzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXIgYSBjb21wb25lbnQgY2xhc3MgYnkgbmFtZXNwYWNlXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfENvbXBvbmVudH0gY29tcG9uZW50Q2xhc3NOYW1lc3BhY2VcbiAgICovXG4gIGRlcmVnaXN0ZXJDb21wb25lbnRDbGFzcyAoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpIHtcbiAgICBsZXQgY29tcG9uZW50Q2xhc3NOU1xuXG4gICAgLy8gTm8gdmFsaWQgY29tcG9uZW50Q2xhc3MgZ2l2ZW5cbiAgICBpZiAoIWNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbXBvbmVudCBjbGFzcyBuYW1lc3BhY2Ugd2FzIGdpdmVuJylcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIG5hbWVzcGFjZVxuICAgIGNvbXBvbmVudENsYXNzTlMgPSBnZXRDb21wb25lbnROYW1lc3BhY2UoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpXG5cbiAgICAvLyBSZW1vdmUgdGhlIGNvbXBvbmVudCBjbGFzc1xuICAgIGlmIChjb21wb25lbnRDbGFzc05TICYmIHRoaXMuX2NvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoY29tcG9uZW50Q2xhc3NOUykpIHtcbiAgICAgIHRoaXMuX2NvbXBvbmVudHNbY29tcG9uZW50Q2xhc3NOU10gPSB1bmRlZmluZWRcbiAgICAgIGRlbGV0ZSB0aGlzLl9jb21wb25lbnRzW2NvbXBvbmVudENsYXNzTlNdXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGNvbXBvbmVudCBjbGFzcyBieSBuYW1lc3BhY2VcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudENsYXNzTmFtZXNwYWNlXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZHxDb21wb25lbnR9XG4gICAqL1xuICBnZXRDb21wb25lbnRDbGFzcyAoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpIHtcbiAgICBsZXQgY29tcG9uZW50Q2xhc3NOUyA9IGNvbXBvbmVudENsYXNzTmFtZXNwYWNlXG5cbiAgICBpZiAoIWNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbXBvbmVudCBjbGFzcyBuYW1lc3BhY2Ugd2FzIGdpdmVuJylcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGNvbXBvbmVudCBjbGFzc1xuICAgIGlmIChjb21wb25lbnRDbGFzc05TICYmIHRoaXMuX2NvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoY29tcG9uZW50Q2xhc3NOUykpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzW2NvbXBvbmVudENsYXNzTlNdXG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb21wb25lbnQgaW5zdGFuY2UgdG8gYXBwIGFuZCBpbml0aWFsaXNlIHRoZSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudEluc3RhbmNlXG4gICAqL1xuICBhZGRDb21wb25lbnRJbnN0YW5jZSAoY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICBjb21wb25lbnRJbnN0YW5jZS5fYXBwID0gdGhpc1xuXG4gICAgLy8gQWRkIGNvbXBvbmVudCBpbnN0YW5jZSB0byBjb2xsZWN0aW9uXG4gICAgdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzW2NvbXBvbmVudEluc3RhbmNlLnV1aWRdID0gY29tcG9uZW50SW5zdGFuY2VcblxuICAgIC8vIEluaXRpYWxpc2UgdGhlIGNvbXBvbmVudFxuICAgIGNvbXBvbmVudEluc3RhbmNlLmluaXQoKVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudENsYXNzTmFtZXNwYWNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzXG4gICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAqL1xuICBjcmVhdGVDb21wb25lbnRJbnN0YW5jZSAoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UsIGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLk5TfS5jcmVhdGVDb21wb25lbnRJbnN0YW5jZTogJHtjb21wb25lbnRDbGFzc05hbWVzcGFjZX1gKVxuXG4gICAgLy8gQ3JlYXRlIGFuZCBpbml0aWFsaXNlIHRoZSBjb21wb25lbnRcbiAgICBpZiAodGhpcy5fY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShjb21wb25lbnRDbGFzc05hbWVzcGFjZSkpIHtcbiAgICAgIGxldCBuZXdDb21wb25lbnQgPSBuZXcgdGhpcy5fY29tcG9uZW50c1tjb21wb25lbnRDbGFzc05hbWVzcGFjZV0oYXR0cmlidXRlcylcblxuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLk5TfS5jcmVhdGVDb21wb25lbnRJbnN0YW5jZWAsIHtcbiAgICAgIC8vICAgY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UsXG4gICAgICAvLyAgIG5ld0NvbXBvbmVudCxcbiAgICAgIC8vICAgYXR0cmlidXRlc1xuICAgICAgLy8gfSlcblxuICAgICAgLy8gQWRkIGluc3RhbmNlIHRvIGFwcFxuICAgICAgdGhpcy5hZGRDb21wb25lbnRJbnN0YW5jZShuZXdDb21wb25lbnQpXG5cbiAgICAgIHJldHVybiBuZXdDb21wb25lbnRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgY29tcG9uZW50IGluc3RhbmNlIGJ5IFVVSURcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudFVVSURcbiAgICogQHJldHVybnMge3VuZGVmaW5lZHxDb21wb25lbnR9XG4gICAqL1xuICBnZXRDb21wb25lbnRJbnN0YW5jZSAoY29tcG9uZW50VVVJRCkge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGAke3RoaXMuTlN9LmdldENvbXBvbmVudEluc3RhbmNlOiAke2NvbXBvbmVudFVVSUR9YClcblxuICAgIGlmICh0aGlzLl9jb21wb25lbnRJbnN0YW5jZXMuaGFzT3duUHJvcGVydHkoY29tcG9uZW50VVVJRCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbY29tcG9uZW50VVVJRF1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGNvbXBvbmVudCBpbnN0YW5jZSBieSBVVUlEXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRVVUlEXG4gICAqL1xuICByZW1vdmVDb21wb25lbnRJbnN0YW5jZSAoY29tcG9uZW50VVVJRCkge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGAke3RoaXMuTlN9LnJlbW92ZUNvbXBvbmVudEluc3RhbmNlOiAke2NvbXBvbmVudFVVSUR9YClcblxuICAgIGxldCByZW1vdmVDb21wb25lbnRJbnN0YW5jZSA9IHRoaXMuZ2V0Q29tcG9uZW50SW5zdGFuY2UoY29tcG9uZW50VVVJRClcbiAgICBpZiAodHlwZW9mIHJlbW92ZUNvbXBvbmVudEluc3RhbmNlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLk5TfS5yZW1vdmVDb21wb25lbnRJbnN0YW5jZTogZm91bmQgY29tcG9uZW50IGluc3RhbmNlIHRvIHJlbW92ZWAsIHJlbW92ZUNvbXBvbmVudEluc3RhbmNlKVxuXG4gICAgICByZW1vdmVDb21wb25lbnRJbnN0YW5jZS5kZXN0cm95KClcblxuICAgICAgLy8gQFRPRE8gdGhlIGZvbGxvd2luZyBzaG91bGQgcHJvYmFibHkgb25seSBoYXBwZW4gYWZ0ZXIgYSBQcm9taXNlIGlzIHJlc29sdmVkXG4gICAgICAvLyBSZW1vdmUgZW50cnkgaW4gdGhlIGNvbXBvbmVudEluc3RhbmNlcyBvYmplY3RcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tjb21wb25lbnRVVUlEXSA9IHVuZGVmaW5lZFxuICAgICAgZGVsZXRlIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tjb21wb25lbnRVVUlEXVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIGFueSBjb21wb25lbnQgd2hpY2ggaXMgbWFya2VkIGluIHRoZSBET01cbiAgICovXG4gIGluaXRpYWxpc2VDb21wb25lbnRzICgpIHtcbiAgICAvLyBGaW5kIGFueSBlbGVtZW50IG1hcmtlZCB3aXRoIHRoZSBgW2RhdGEtY29tcG9uZW50XWAgYXR0cmlidXRlXG4gICAgJCgnW2RhdGEtY29tcG9uZW50XScpXG4gICAgICAvLyBJZ25vcmUgY29tcG9uZW50cyB3aGljaCBhbHJlYWR5IGhhdmUgYW4gSUQgYXNzaWduZWRcbiAgICAgIC5ub3QoJ1tkYXRhLWNvbXBvbmVudC1pZF0nKVxuICAgICAgLy8gSW5pdGlhbGlzZSBlYWNoIGNvbXBvbmVudFxuICAgICAgLmVhY2goKGluZGV4LCBlbGVtKSA9PiB7XG4gICAgICAgIGxldCAkZWxlbSA9ICQoZWxlbSlcbiAgICAgICAgbGV0IGVsZW1Db21wb25lbnRDbGFzcyA9ICRlbGVtLmF0dHIoJ2RhdGEtY29tcG9uZW50JylcbiAgICAgICAgbGV0IGVsZW1Db21wb25lbnRPcHRpb25zID0gJGVsZW0uYXR0cignZGF0YS1jb21wb25lbnQtb3B0aW9ucycpIHx8IHt9XG5cbiAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgIGNvbnNvbGUubG9nKGAke3RoaXMuX05TfS5pbml0aWFsaXNlQ29tcG9uZW50czogZm91bmQgZWxlbWVudCB0byBpbml0aWFsaXNlIHdpdGggY29tcG9uZW50YCwge1xuICAgICAgICAgIGluZGV4LFxuICAgICAgICAgIGVsZW0sXG4gICAgICAgICAgZWxlbUNvbXBvbmVudENsYXNzLFxuICAgICAgICAgIGVsZW1Db21wb25lbnRPcHRpb25zXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gRW5zdXJlIGNvbXBvbmVudCBjbGFzcyBpcyByZWdpc3RlcmVkXG4gICAgICAgIGlmICghdGhpcy5nZXRDb21wb25lbnRDbGFzcyhlbGVtQ29tcG9uZW50Q2xhc3MpKSB7XG4gICAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgICAgY29uc29sZS5lcnJvcihgJHt0aGlzLl9OU30uaW5pdGlhbGlzZUNvbXBvbmVudHM6IGVsZW1lbnQncyBjb21wb25lbnQgY2xhc3Mgbm90IHJlZ2lzdGVyZWRgLCB7XG4gICAgICAgICAgICBhcHA6IHRoaXMsXG4gICAgICAgICAgICBpbmRleCxcbiAgICAgICAgICAgIGVsZW0sXG4gICAgICAgICAgICBlbGVtQ29tcG9uZW50Q2xhc3MsXG4gICAgICAgICAgICBlbGVtQ29tcG9uZW50T3B0aW9uc1xuICAgICAgICAgIH0pXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyBFeHRyYWN0L2NvbnZlcnQgdGhlIG9wdGlvbnNcbiAgICAgICAgaWYgKHR5cGVvZiBlbGVtQ29tcG9uZW50T3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAvLyBTZXQgYXMgSlNPTiwgZS5nLiAne1wibmFtZVwiOlwidmFsdWVcIn1gXG4gICAgICAgICAgaWYgKC9eXFx7Ly50ZXN0KGVsZW1Db21wb25lbnRPcHRpb25zKSkge1xuICAgICAgICAgICAgZWxlbUNvbXBvbmVudE9wdGlvbnMgPSBjb252ZXJ0U3RyaW5nVG9Kc29uKGVsZW1Db21wb25lbnRPcHRpb25zKVxuXG4gICAgICAgICAgICAvLyBTZXQgYXMgc3R5bGUtbGlrZSBhdHRyaWJ1dGVzLCBlLmcuIGBuYW1lOiB2YWx1ZTsgbmFtZTogdmFsdWVgXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1Db21wb25lbnRPcHRpb25zID0gZXh0cmFjdENsYXNzRGV0YWlscyhlbGVtQ29tcG9uZW50T3B0aW9ucylcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgdGhlICRlbGVtIGlmIGl0IGlzIG5vdCBhbHJlYWR5IHNldFxuICAgICAgICBpZiAoIWVsZW1Db21wb25lbnRPcHRpb25zLmhhc093blByb3BlcnR5KCckZWxlbScpKSB7XG4gICAgICAgICAgZWxlbUNvbXBvbmVudE9wdGlvbnMuJGVsZW0gPSAkZWxlbVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ3JlYXRlIHRoZSBjb21wb25lbnRcbiAgICAgICAgbGV0IGVsZW1Db21wb25lbnRJbnN0YW5jZSA9IHRoaXMuY3JlYXRlQ29tcG9uZW50SW5zdGFuY2UoZWxlbUNvbXBvbmVudENsYXNzLCBlbGVtQ29tcG9uZW50T3B0aW9ucylcblxuICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpc2VkIGNvbXBvbmVudCBpbnN0YW5jZScsIHtcbiAgICAgICAgICBpbmRleCxcbiAgICAgICAgICBlbGVtLFxuICAgICAgICAgIGVsZW1Db21wb25lbnRPcHRpb25zLFxuICAgICAgICAgIGVsZW1Db21wb25lbnRJbnN0YW5jZVxuICAgICAgICB9KVxuICAgICAgfSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEFwcFxuIiwiLyoqXG4gKiBMVkw5OSBDb21wb25lbnRcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IG9iamVjdFBhdGggPSByZXF1aXJlKCdvYmplY3QtcGF0aCcpXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC5tZXJnZScpXG5jb25zdCB1dWlkID0gcmVxdWlyZSgndXVpZCcpXG5jb25zdCBFbnRpdHkgPSByZXF1aXJlKCcuL2VudGl0eScpXG5jb25zdCB7ICQsICRkb2MgfSA9IHJlcXVpcmUoJy4uL2NvbW1vbicpXG4vLyBjb25zdCB7IHdyYXAgfSA9IHJlcXVpcmUoJy4uL3V0aWxzL3N1cGVyJylcbmNvbnN0IHtcbiAgZXh0cmFjdFRyaWdnZXJEZXRhaWxzLFxuICBleHRyYWN0VGFyZ2V0RXZlbnROYW1lcyxcbiAgZ2V0VGFyZ2V0QnlTZWxlY3RvcixcbiAgZ2V0VGFyZ2V0U2VsZWN0b3Jcbn0gPSByZXF1aXJlKCcuLi91dGlscy9wYXJzZScpXG5cbi8qKlxuICogVGhlIENvbXBvbmVudCdzIGJhc2UgcHJvcGVydGllc1xuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IENvbXBvbmVudFByb3BlcnRpZXMgPSB7XG4gIC8qKlxuICAgKiBOQU1FU1BBQ0VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBjdXN0b20gZXZlbnRzIGFuZCBlcnJvciByZXBvcnRpbmdcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICogQGRlZmF1bHQgTFZMOTlcbiAgICovXG4gIF9OUzogJ0xWTDk5OkNvbXBvbmVudCcsXG5cbiAgLyoqXG4gICAqIG5hbWVzcGFjZVxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIENTUyBjbGFzc2VzXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqIEBkZWZhdWx0IGx2bDk5XG4gICAqL1xuICBfbnM6ICdsdmw5OS1jb21wb25lbnQnLFxuXG4gIC8qKlxuICAgKiBUaGUgcHJvcGVydGllcyBzaGFyZWQgYmV0d2VlbiBhbGwgaW5zdGFuY2VzIG9mIHRoaXMgQ29tcG9uZW50XG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfcHJvcGVydGllczoge1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lcyBvZiBDb21wb25lbnQgbWV0aG9kcyB0byBwdWJsaWNseSBleHBvc2UgaW4gdGhlIERPTSB2aWEgY3VzdG9tIGV2ZW50cyAoYXR0YWNoZWQgZHVyaW5nIGBpbml0YCkuXG4gICAgICpcbiAgICAgKiBFYWNoIGVudHJ5IGNhbiBiZSBhIHN0cmluZyAod2hpY2ggd2lsbCB0aGVuIGJlIGEgZ2xvYmFsIGV2ZW50OyBiZSBjYXJlZnVsIHdpdGggZ2xvYmFsIGV2ZW50cyBiZWluZyBhdHRhY2hlZCB0d2ljZSksXG4gICAgICogb3IgY2FuIGJlIGFuIG9iamVjdCB3aGVyZSB5b3Ugc3BlY2lmeSB0aGUgdGFyZ2V0IChvZnRlbiAnc2VsZicpIGFuZCBzZXQgd2hhdCBtZXRob2QgdG8gZG8gb24gd2hhdGV2ZXIgZXZlbnQsIGUuZy46XG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAgIC8vIFRoaXMgd2lsbCB0cmlnZ2VyIHRoZSBDb21wb25lbnQncyBgZXhhbXBsZU1ldGhvZGAgd2hlbiB0aGUgQ29tcG9uZW50J3MgJGVsZW0gaXMgdGFyZ2V0ZWQvdHJpZ2dlcmVkXG4gICAgICogICAvLyB1c2luZyB0aGUgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgY3VzdG9tIGV2ZW50IG5hbWU6XG4gICAgICogICAvLyBgJGVsZW0udHJpZ2dlcignQ29tcG9uZW50OmV4YW1wbGVNZXRob2QnKWBcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgdGFyZ2V0OiAnc2VsZicsXG4gICAgICogICAgIGRvOiAnZXhhbXBsZU1ldGhvZCdcbiAgICAgKiAgIH1cbiAgICAgKlxuICAgICAqICAgLy8gVGhpcyB3aWxsIHRyaWdnZXIgdGhlIENvbXBvbmVudCdzIGBleGFtcGxlTWV0aG9kYCB3aGVuIHRoZSBkb2N1bWVudCBpcyB0YXJnZXRlZC90cmlnZ2VyZWQgdXNpbmcgYSBjdXN0b21cbiAgICAgKiAgIC8vIGV2ZW50IG5hbWU6XG4gICAgICogICAvLyBgJChkb2N1bWVudCkudHJpZ2dlcignY3VzdG9tRXZlbnROYW1lJylgXG4gICAgICogICB7XG4gICAgICogICAgIHRhcmdldDogJ2RvY3VtZW50JyxcbiAgICAgKiAgICAgZG86ICdleGFtcGxlTWV0aG9kJyxcbiAgICAgKiAgICAgb246ICdjdXN0b21FdmVudE5hbWUnXG4gICAgICogICB9XG4gICAgICpcbiAgICAgKiAgIC8vIFRoaXMgd2lsbCB0cmlnZ2VyIHRoZSBDb21wb25lbnQncyBgZXhhbXBsZU1ldGhvZGAgd2hlbiB0aGUgd2luZG93IGlzIHNjcm9sbGVkOlxuICAgICAqICAgLy8gYCQod2luZG93KS5zY3JvbGwoKWBcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgdGFyZ2V0OiAnd2luZG93JyxcbiAgICAgKiAgICAgZG86ICdleGFtcGxlTWV0aG9kJyxcbiAgICAgKiAgICAgb246ICdzY3JvbGwnXG4gICAgICogICB9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgcHVibGljTWV0aG9kczogW10sXG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IHRvIGFwcGx5IGFueSBDU1MgY2xhc3NlcyB0b1xuICAgICAqXG4gICAgICogQHR5cGUge2pRdWVyeU9iamVjdH1cbiAgICAgKi9cbiAgICAkY2xhc3NUYXJnZXQ6IHVuZGVmaW5lZFxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBhdHRyaWJ1dGVzIHRvIGxvYWQgYSBjcmVhdGVkIENvbXBvbmVudCBpbnN0YW5jZSB3aXRoLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX2F0dHJpYnV0ZXM6IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbWFpbiBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGUgQ29tcG9uZW50IGluIHRoZSBET00uIENvbXBvbmVudCBldmVudHMgd2lsbCBiZSBtYW5hZ2VkIHRocm91Z2ggdGhpcyBlbGVtZW50LlxuICAgICAqL1xuICAgICRlbGVtOiB1bmRlZmluZWRcbiAgfVxufVxuXG4vKipcbiAqIENvbXBvbmVudFxuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgRW50aXR5XG4gKi9cbmNsYXNzIENvbXBvbmVudCBleHRlbmRzIEVudGl0eSB7XG4gIC8qKlxuICAgKiBDb21wb25lbnQgY29uc3RydWN0b3JcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoYXR0cmlidXRlcykge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKCdMVkw5OTpDb21wb25lbnQ6Y29uc3RydWN0b3InLCB7XG4gICAgLy8gICBhcmd1bWVudHNcbiAgICAvLyB9KVxuXG4gICAgc3VwZXIoYXR0cmlidXRlcylcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIENvbXBvbmVudCdzIHByb3BlcnRpZXNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IC4uLmFyZ3VtZW50c1xuICAgKi9cbiAgZXh0ZW5kICgpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZygnTFZMOTk6Q29tcG9uZW50OmV4dGVuZCcsIHtcbiAgICAvLyAgIGFyZ3VtZW50c1xuICAgIC8vIH0pXG5cbiAgICAvLyBDb25jYXQgYWxsIHRoZSBwdWJsaWNNZXRob2RzIGludG8gb25lIGFycmF5IChzaW5jZSBtZXJnZSBkb2Vzbid0IGRvIHRoYXQgd2l0aCBwbGFpbiBhcnJheXMpXG4gICAgbGV0IGFyZ3MgPSBbLi4uYXJndW1lbnRzXVxuICAgIGxldCBhbGxQdWJsaWNNZXRob2RzID0gQ29tcG9uZW50UHJvcGVydGllcy5fcHJvcGVydGllcy5wdWJsaWNNZXRob2RzLnNsaWNlKDApXG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgIGxldCBoYXNQdWJsaWNNZXRob2RzID0gb2JqZWN0UGF0aC5nZXQoYXJnLCAnX3Byb3BlcnRpZXMucHVibGljTWV0aG9kcycpXG4gICAgICBpZiAoaGFzUHVibGljTWV0aG9kcyAmJiBoYXNQdWJsaWNNZXRob2RzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgYWxsUHVibGljTWV0aG9kcyA9IGFsbFB1YmxpY01ldGhvZHMuY29uY2F0KGhhc1B1YmxpY01ldGhvZHMpXG4gICAgICB9XG4gICAgfSlcbiAgICBhbGxQdWJsaWNNZXRob2RzID0gQXJyYXkuZnJvbShuZXcgU2V0KGFsbFB1YmxpY01ldGhvZHMpKVxuXG4gICAgLy8gRXh0ZW5kIHRoZSBjb21wb25lbnQncyBwcm9wZXJ0aWVzIHdpdGggdGhlIGluc3RhbnRpYXRlZCBhdHRyaWJ1dGVzIGFuZCBjb25jYXRlbmF0ZWQgcHVibGljIG1ldGhvZHNcbiAgICBzdXBlci5leHRlbmQoQ29tcG9uZW50UHJvcGVydGllcywgLi4uYXJndW1lbnRzLCB7XG4gICAgICBfcHJvcGVydGllczoge1xuICAgICAgICBwdWJsaWNNZXRob2RzOiBhbGxQdWJsaWNNZXRob2RzXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbXBvbmVudCdzIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfGpRdWVyeU9iamVjdH1cbiAgICovXG4gIGdldEVsZW0gKCkge1xuICAgIC8vIFNvZnQgcmV0dXJuXG4gICAgaWYgKCF0aGlzLmdldEF0dHIoJ2VsZW0nKSAmJiAoIXRoaXMuZ2V0QXR0cignJGVsZW0nKSB8fCAhdGhpcy5nZXRBdHRyKCckZWxlbScpLmxlbmd0aCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihgJHt0aGlzLk5TfS5nZXRFbGVtOiBubyBlbGVtIHdhcyBmb3VuZCBmb3IgdGhpcyBjb21wb25lbnQuIFRoaXMgbWF5IGNhdXNlIHByb2JsZW1zIHdpdGggY29tcG9uZW50cyB3aGljaCByZWx5IG9uIHRoZSBlbGVtIGF0dHJpYnV0ZS5gKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cblxuICAgIC8vIEVsZW0gKG9yICRlbGVtKSBpcyBzZXQgdG8gc3RyaW5nXG4gICAgaWYgKHR5cGVvZiB0aGlzLmdldEF0dHIoJ2VsZW0nKSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRoaXMuZ2V0QXR0cignJGVsZW0nKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCAkZWxlbSA9ICQodGhpcy5nZXRBdHRyKCdlbGVtJykpXG4gICAgICBpZiAoJGVsZW0ubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cignZWxlbScsICRlbGVtWzBdKVxuICAgICAgICB0aGlzLnNldEF0dHIoJyRlbGVtJywgJGVsZW0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2V0ICYgc2V0IHRoZSBlbGVtZW50XG4gICAgaWYgKHRoaXMuZ2V0QXR0cignZWxlbScpICYmICF0aGlzLmdldEF0dHIoJyRlbGVtJykpIHtcbiAgICAgIHRoaXMuc2V0QXR0cigkKHRoaXMuZ2V0QXR0cignZWxlbScpKSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyKCckZWxlbScpXG4gIH1cblxuICAvKipcbiAgICogTWFyayB0aGUgQ29tcG9uZW50J3MgZWxlbWVudCB3aXRoIG5lY2Vzc2FyeSBhdHRyaWJ1dGVzXG4gICAqL1xuICBtYXJrRWxlbSAoKSB7XG4gICAgLy8gTWFyayB0aGUgZWxlbWVudFxuICAgIGlmICh0aGlzLmdldEVsZW0oKSAmJiB0aGlzLmdldEVsZW0oKS5sZW5ndGgpIHtcbiAgICAgIGlmICghdGhpcy5nZXRFbGVtKCkuYXR0cignZGF0YS1jb21wb25lbnQnKSkge1xuICAgICAgICB0aGlzLmdldEVsZW0oKS5hdHRyKCdkYXRhLWNvbXBvbmVudCcsIHRoaXMuTlMpXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5nZXRFbGVtKCkuYXR0cignZGF0YS1jb21wb25lbnQtaWQnKSkge1xuICAgICAgICB0aGlzLmdldEVsZW0oKS5hdHRyKCdkYXRhLWNvbXBvbmVudC1pZCcsIHRoaXMudXVpZClcbiAgICAgIH1cblxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ21hcmtFbGVtOmVuZCcpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdGFyZ2V0IHRvIGFwcGx5IHRoZSBDU1Mgc3RhdGUgY2xhc3NlcyB0b1xuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR8alF1ZXJ5T2JqZWN0fVxuICAgKi9cbiAgZ2V0Q2xhc3NUYXJnZXQgKCkge1xuICAgIC8vIFByaW9yaXRpc2UgYXR0clxuICAgIGxldCAkY2xhc3NUYXJnZXQgPSB0aGlzLmdldEF0dHIoJyRjbGFzc1RhcmdldCcpXG5cbiAgICAvLyBOb3QgZm91bmQgaW4gYXR0cj8gVXNlIHByb3BcbiAgICBpZiAoISRjbGFzc1RhcmdldCB8fCAhJGNsYXNzVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgJGNsYXNzVGFyZ2V0ID0gdGhpcy5nZXRQcm9wKCckY2xhc3NUYXJnZXQnKVxuICAgIH1cblxuICAgIC8vIE5vdCBmb3VuZCBpbiBwcm9wPyBVc2UgZWxlbVxuICAgIGlmICghJGNsYXNzVGFyZ2V0IHx8ICEkY2xhc3NUYXJnZXQubGVuZ3RoKSB7XG4gICAgICAkY2xhc3NUYXJnZXQgPSB0aGlzLmdldEVsZW0oKVxuXG4gICAgICAvLyBFbnN1cmUgc2V0IGFzIGF0dHJcbiAgICAgIHRoaXMuc2V0QXR0cignJGNsYXNzVGFyZ2V0JywgJGNsYXNzVGFyZ2V0KVxuICAgIH1cblxuICAgIHJldHVybiAkY2xhc3NUYXJnZXRcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NIGVsZW1lbnQgYW5kIHBsYWNlIGludG8gdGhlIENvbXBvbmVudCBpbnN0YW5jZVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBsb2FkQXR0cnMgKCkge1xuICAgIGlmICh0aGlzLmdldEVsZW0oKSAmJiB0aGlzLmdldEVsZW0oKS5pcygnW2RhdGEtY29tcG9uZW50LWF0dHJpYnV0ZXNdJykpIHtcbiAgICAgIGxldCBhdHRycyA9IHt9XG5cbiAgICAgIC8vIEF0dGVtcHQgdG8gZ2V0IHRoZSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTSBlbGVtZW50XG4gICAgICB0cnkge1xuICAgICAgICBhdHRycyA9IEpTT04ucGFyc2UodGhpcy5nZXRFbGVtKCkuYXR0cignZGF0YS1jb21wb25lbnQtYXR0cmlidXRlcycpKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBbJHt0aGlzLk5TfV0gbG9hZEF0dHJzOiBFcnJvciBsb2FkaW5nIGF0dHJpYnV0ZXMgZnJvbSBET00gZWxlbWVudGApXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSBtZXJnZSh0aGlzLl9hdHRyaWJ1dGVzLCBhdHRycylcblxuICAgICAgLy8gT25jZSBsb2FkZWQsIHJlbW92ZSB0aGUgY29tcG9uZW50IGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NXG4gICAgICB0aGlzLmdldEVsZW0oKS5yZW1vdmVBdHRyKCdkYXRhLWNvbXBvbmVudC1hdHRyaWJ1dGVzJylcblxuICAgICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZXNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSBDb21wb25lbnRcbiAgICovXG4gIGluaXQgKCkge1xuICAgIHN1cGVyLmluaXQoLi4uYXJndW1lbnRzKVxuXG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlM6aW5pdH1dYClcblxuICAgIC8vIE1hcmsgdGhlIGVsZW1lbnRcbiAgICB0aGlzLm1hcmtFbGVtKClcblxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBDb21wb25lbnQncyBwdWJsaWMgbWV0aG9kcyB0byB0YXJnZXRzXG4gICAgICogUHVibGljIG1ldGhvZHMgY2FuIGJlIHRyaWdnZXJlZCBvbiB0aGUgdGFyZ2V0cyB2aWEgYCQodGFyZ2V0KS50cmlnZ2VyKCdOQU1FU1BBQ0U6cHVibGljTWV0aG9kTmFtZScpYFxuICAgICAqL1xuICAgIGxldCBwdWJsaWNNZXRob2RzID0gdGhpcy5nZXRQcm9wKCdwdWJsaWNNZXRob2RzJylcbiAgICBpZiAocHVibGljTWV0aG9kcyAmJiBwdWJsaWNNZXRob2RzLmxlbmd0aCkge1xuICAgICAgcHVibGljTWV0aG9kcy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XG4gICAgICAgIGxldCB0cmlnZ2VyRGV0YWlscyA9IHt9XG5cbiAgICAgICAgLy8gQWxyZWFkeSBvYmplY3RcbiAgICAgICAgaWYgKHR5cGVvZiB0cmlnZ2VyID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRyaWdnZXJEZXRhaWxzID0gdHJpZ2dlclxuXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyaWdnZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKC9eey8udGVzdCh0cmlnZ2VyKSB8fCAvWzo7XS8udGVzdCh0cmlnZ2VyKSkge1xuICAgICAgICAgICAgdHJpZ2dlckRldGFpbHMgPSBleHRyYWN0VHJpZ2dlckRldGFpbHModHJpZ2dlcilcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJpZ2dlckRldGFpbHMuZG8gPSB0cmlnZ2VyXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgZW1wdHksIHNldCBgb25gIHRvIGBkb2AgdmFsdWUgKGNvbnNpZGVyIGl0IGEgY3VzdG9tIGV2ZW50IHRvIGludm9rZSwgZS5nLiAnaW5pdCcgd291bGQgaW52b2tlICdpbml0JyBvbiB0aGlzIENvbXBvbmVudClcbiAgICAgICAgaWYgKCFvYmplY3RQYXRoLmhhcyh0cmlnZ2VyRGV0YWlscywgJ29uJykpIHtcbiAgICAgICAgICB0cmlnZ2VyRGV0YWlscy5vbiA9IHRyaWdnZXJEZXRhaWxzLmRvXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb250ZXh0IHNob3VsZCBhbHdheXMgYmUgdGhpcyBDb21wb25lbnRcbiAgICAgICAgdHJpZ2dlckRldGFpbHMuY29udGV4dCA9IHRoaXNcblxuICAgICAgICAvLyBHZXQgdGhlIENvbXBvbmVudCdzIG1ldGhvZFxuICAgICAgICBsZXQgbWV0aG9kID0gdW5kZWZpbmVkXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbWV0aG9kID0gdHJpZ2dlckRldGFpbHMuY29udGV4dFt0cmlnZ2VyRGV0YWlscy5kb11cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIGluaXQ6IHB1YmxpYyBtZXRob2QgJyR7dHJpZ2dlckRldGFpbHMuZG99JyB3YXMgbm90IGZvdW5kIG9uIHRoaXMgY29tcG9uZW50YClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OU31dIGluaXQ6IGF0dGFjaCBwdWJsaWMgbWV0aG9kYCwge1xuICAgICAgICAvLyAgIHRyaWdnZXJEZXRhaWxzLFxuICAgICAgICAvLyAgIG1ldGhvZFxuICAgICAgICAvLyB9KVxuXG4gICAgICAgIC8vIEF0dGFjaCB0aGUgbWV0aG9kIGFzIGEgY3VzdG9tIGV2ZW50IHRvIHRoZSB0YXJnZXRcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAvLyBXcmFwIHRoZSBtZXRob2QgaW50byBhIGNsb3N1cmVcbiAgICAgICAgICBsZXQgZG9Db21wb25lbnRNZXRob2QgPSAoalF1ZXJ5RXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAgICAgY29uc29sZS5sb2coYFRyaWdnZXJlZCAke3RoaXMuTlN9OiR7dHJpZ2dlckRldGFpbHMuZG99YCwge1xuICAgICAgICAgICAgICBfY2xhc3M6IHRoaXMsXG4gICAgICAgICAgICAgIF9tZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgICAgalF1ZXJ5RXZlbnQsXG4gICAgICAgICAgICAgIGFyZ3M6IGFyZ3VtZW50c1xuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgbWV0aG9kLmNhbGwodGhpcywgalF1ZXJ5RXZlbnQpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQXR0YWNoIHRvIHRoZSB0YXJnZXQgZG9jdW1lbnQgd2l0aCBhIHBhcnRpY3VsYXIgZWxlbWVudCBzZWxlY3RvclxuICAgICAgICAgIGlmICh0cmlnZ2VyRGV0YWlscy5zZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRUb1RhcmdldFNlbGVjdG9yKHRyaWdnZXJEZXRhaWxzLm9uLCB0cmlnZ2VyRGV0YWlscy5zZWxlY3RvciwgZG9Db21wb25lbnRNZXRob2QsIHRyaWdnZXJEZXRhaWxzLnRhcmdldClcblxuICAgICAgICAgICAgLy8gQXR0YWNoIHRvIHRoZSB0YXJnZXRcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRUb1RhcmdldCh0cmlnZ2VyRGV0YWlscy5vbiwgZG9Db21wb25lbnRNZXRob2QsIHRyaWdnZXJEZXRhaWxzLnRhcmdldClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBFcnJvclxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMsIHRyaWdnZXIsIHRyaWdnZXJEZXRhaWxzKVxuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIGluaXQ6IHB1YmxpYyBtZXRob2QgJyR7dHJpZ2dlckRldGFpbHMuZG99JyBpcyBub3QgYSB2YWxpZCBmdW5jdGlvbmApXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTG9hZCBhbnkgYXR0cmlidXRlcyB0aGF0IHdlcmUgYXR0YWNoZWQgdG8gdGhlIERPTSBlbGVtZW50XG4gICAgICovXG4gICAgdGhpcy5sb2FkQXR0cnMoKVxuXG4gICAgLyoqXG4gICAgICogQHRyaWdnZXIgTkFNRVNQQUNFOmluaXQ6ZW5kXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2luaXQ6ZW5kJylcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGFuZCB0ZWFyIGRvd24gdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgZGVzdHJveSAoKSB7XG4gICAgLy8gQFRPRE8gdGVhciBkb3duIHRoZSBob3VzZSFcbiAgICAvLyBAVE9ETyByZW1vdmUgdGhlIGJvdW5kIHB1YmxpYyBldmVudHNcbiAgICAvLyBAVE9ETyBvdGhlciBnYXJiYWdlIGNvbGxlY3Rpb24vbWVtb3J5IG1hbmFnZW1lbnRcblxuICAgIC8qKlxuICAgICAqIEB0cmlnZ2VyIE5BTUVTUEFDRTpkZXN0cm95OmJlZm9yZWVuZFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHRoaXMudHJpZ2dlckV2ZW50KCdkZXN0cm95OmJlZm9yZWVuZCcpXG5cbiAgICBzdXBlci5kZXN0cm95KC4uLmFyZ3VtZW50cylcbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIG1ldGhvZCB0byBjdXN0b20gZXZlbnQgb24gdGFyZ2V0XG4gICAqIEV2ZW50IG5hbWVzIGFyZSBhdXRvbWF0aWNhbGx5IG5hbWVzcGFjZWQgdXNpbmcgdGhlIENvbXBvbmVudCdzIF9OUyBwcm9wZXJ0eS5cbiAgICogVG8gbm90IHVzZSBuYW1lc3BhY2VkIGV2ZW50cywgcHJlZmFjZSB3aXRoIGBkb206YFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZFxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IERlZmF1bHQgaXMgYGRvY3VtZW50YC4gVGhpcyBpcyB0aGUgdGFyZ2V0IERPTSBlbGVtZW50IHdoaWNoIHRoZSBjdXN0b20gZXZlbnQgd2lsbCBidWJibGUgdXAgdG9cbiAgICovXG4gIGJpbmRFdmVudFRvVGFyZ2V0IChldmVudE5hbWUsIG1ldGhvZCwgdGFyZ2V0KSB7XG4gICAgLy8gRGVmYXVsdCB0byBkb2N1bWVudFxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgPSBkb2N1bWVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTcGVjaWFsIHN0cmluZyB2YWx1ZXMgdG8gZ2V0IHRoZSBhY3R1YWwgb2JqZWN0XG4gICAgICBzd2l0Y2ggKHRhcmdldCkge1xuICAgICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnRcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJ3dpbmRvdyc6XG4gICAgICAgICAgdGFyZ2V0ID0gd2luZG93XG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICdzZWxmJzpcbiAgICAgICAgICB0YXJnZXQgPSB0aGlzLmdldEVsZW0oKVswXVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXh0cmFjdCB0aGUgdGFyZ2V0IGV2ZW50IG5hbWVzIGZyb20gdGhlIGlucHV0IGdpdmVuXG4gICAgbGV0IGV2ZW50TmFtZXMgPSBleHRyYWN0VGFyZ2V0RXZlbnROYW1lcyhldmVudE5hbWUsIHRoaXMuTlMpXG5cbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OU31dIGJpbmRFdmVudFRvVGFyZ2V0YCwge1xuICAgIC8vICAgZXZlbnROYW1lLFxuICAgIC8vICAgbWV0aG9kLFxuICAgIC8vICAgdGFyZ2V0LFxuICAgIC8vICAgdHJpZ2dlck5hbWU6IHRhcmdldEV2ZW50TmFtZXNcbiAgICAvLyB9KVxuXG4gICAgLy8gQXNzaWduIHRoZSB0cmlnZ2VyXG4gICAgaWYgKGV2ZW50TmFtZXMpIHtcbiAgICAgICQodGFyZ2V0KS5vbihldmVudE5hbWVzLmpvaW4oJyAnKSwgbWV0aG9kKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBCaW5kIG1ldGhvZCB0byBjdXN0b20gZXZlbnQgb24gdGFyZ2V0IHdpdGggYW4gZWxlbWVudCBzZWxlY3Rvci5cbiAgICogRXZlbnQgbmFtZXMgYXJlIGF1dG9tYXRpY2FsbHkgbmFtZXNwYWNlZCB1c2luZyB0aGUgQ29tcG9uZW50J3MgX05TIHByb3BlcnR5LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvciBUYXJnZXQgYSBzcGVjaWZpYyBlbGVtZW50ICh2aWEgcXVlcnkgc2VsZWN0b3IpIHRvIHRyaWdnZXIgdGhlIGV2ZW50XG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZFxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IERlZmF1bHQgaXMgYGRvY3VtZW50YC4gVGhpcyBpcyB0aGUgdGFyZ2V0IERPTSBlbGVtZW50IHdoaWNoIHRoZSBjdXN0b20gZXZlbnQgd2lsbCBidWJibGUgdXAgdG9cbiAgICovXG4gIGJpbmRFdmVudFRvVGFyZ2V0U2VsZWN0b3IgKGV2ZW50TmFtZSwgc2VsZWN0b3IsIG1ldGhvZCwgdGFyZ2V0KSB7XG4gICAgdGFyZ2V0ID0gZ2V0VGFyZ2V0QnlTZWxlY3Rvcih0YXJnZXQsIHRoaXMpXG4gICAgc2VsZWN0b3IgPSBnZXRUYXJnZXRTZWxlY3RvcihzZWxlY3RvciwgdGhpcylcbiAgICBsZXQgZXZlbnROYW1lcyA9IGV4dHJhY3RUYXJnZXRFdmVudE5hbWVzKGV2ZW50TmFtZSwgdGhpcy5OUylcblxuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGBbJHt0aGlzLk5TfV0gYmluZEV2ZW50VG9UYXJnZXRTZWxlY3RvcmAsIHtcbiAgICAvLyAgIGV2ZW50TmFtZSxcbiAgICAvLyAgIHNlbGVjdG9yLFxuICAgIC8vICAgbWV0aG9kLFxuICAgIC8vICAgdGFyZ2V0LFxuICAgIC8vICAgdHJpZ2dlck5hbWU6IGAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWBcbiAgICAvLyB9KVxuXG4gICAgaWYgKGV2ZW50TmFtZXMpIHtcbiAgICAgICQodGFyZ2V0KS5vbihldmVudE5hbWVzLmpvaW4oJyAnKSwgc2VsZWN0b3IsIG1ldGhvZClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBhIGN1c3RvbSBkb2N1bWVudCBldmVudCBvbiB0aGUgQ29tcG9uZW50LlxuICAgKiBUaGUgZXZlbnQgdHJpZ2dlcmVkIHdpbGwgYmUgYE5BTUVTUEFDRTpldmVudE5hbWVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gICAqIEBwYXJhbSB7QW55fSAuLi5hcmdzXG4gICAqL1xuICB0cmlnZ2VyRXZlbnQgKGV2ZW50TmFtZSwgLi4uYXJncykge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGBbJHt0aGlzLk5TfV0gdHJpZ2dlckV2ZW50OiAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWApXG5cbiAgICAvLyBBbHdheXMgcGFzcyB0aGUgY29tcG9uZW50IGFzIHRoZSBmaXJzdCBhcmd1bWVudCBwYXJhbWV0ZXJcbiAgICAkZG9jLnRyaWdnZXIoYCR7dGhpcy5OU306JHtldmVudE5hbWV9YCwgW3RoaXMsIC4uLmFyZ3NdKVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYSBjdXN0b20gZG9jdW1lbnQgZXZlbnQgb24gYW4gZWxlbWVudCBvbiB0aGUgQ29tcG9uZW50LlxuICAgKiBUaGUgZXZlbnQgdHJpZ2dlcmVkIHdpbGwgYmUgYE5BTUVTUEFDRTpldmVudE5hbWVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBzZWxlY3RvclxuICAgKiBAcGFyYW0ge0FueX0gLi4uYXJnc1xuICAgKi9cbiAgdHJpZ2dlckV2ZW50T25TZWxlY3RvciAoZXZlbnROYW1lLCBzZWxlY3RvciwgLi4uYXJncykge1xuICAgIHNlbGVjdG9yID0gZ2V0VGFyZ2V0U2VsZWN0b3Ioc2VsZWN0b3IsIHRoaXMpXG5cbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OU31dIHRyaWdnZXJFdmVudE9uU2VsZWN0b3I6ICR7dGhpcy5OU306JHtldmVudE5hbWV9YClcblxuICAgIC8vIEFsd2F5cyBwYXNzIHRoZSBjb21wb25lbnQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHBhcmFtZXRlclxuICAgICQoc2VsZWN0b3IpLnRyaWdnZXIoYCR7dGhpcy5OU306JHtldmVudE5hbWV9YCwgW3RoaXMsIC4uLmFyZ3NdKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQ29tcG9uZW50XG4iLCIvKipcbiAqIExWTDk5IEVudGl0eVxuICpcbiAqIEJhc2UgY2xhc3MgdXNlZCBmb3IgcHJvZ3JhbW1hYmxlIGVudGl0aWVzIHdpdGhpbiB0aGUgYXBwLCBzdWNoIGFzIGNvbXBvbmVudHMgb3Igb3RoZXIgc3VjaCBlbnRpdGllcyB0aGF0IHJlbHkgb25cbiAqIHN0YXRlIGFuZCBsaWZlY3ljbGUgZnVuY3Rpb25zLlxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKVxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKVxuY29uc3Qgb2JqZWN0UGF0aCA9IHJlcXVpcmUoJ29iamVjdC1wYXRoJylcbmNvbnN0IHtcbiAgZXhwb3NlUHJpdmF0ZVByb3BlcnRpZXNcbn0gPSByZXF1aXJlKCcuLi91dGlscy9pbmhlcml0YW5jZScpXG5cbi8qKlxuICogVGhlIEVudGl0eSdzIGJhc2UgcHJvcGVydGllc1xuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IEVudGl0eVByb3BlcnRpZXMgPSB7XG4gIC8qKlxuICAgKiBOQU1FU1BBQ0VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBjdXN0b20gZXZlbnRzIGFuZCBlcnJvciByZXBvcnRpbmdcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIF9OUzogJ0xWTDk5OkVudGl0eScsXG5cbiAgLyoqXG4gICAqIG5hbWVzcGFjZVxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIENTUyBjbGFzc2VzIChvbmx5IGlmIHRoZSBlbnRpdHkgaGFzIGFuIEhUTUxFbGVtZW50KVxuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgX25zOiAnbHZsOTktZW50aXR5JyxcblxuICAvKipcbiAgICogVGhlIHByb3BlcnRpZXMgc2hhcmVkIGJldHdlZW4gYWxsIGluc3RhbmNlcyBvZiB0aGlzIEVudGl0eVxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX3Byb3BlcnRpZXM6IHt9LFxuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBhdHRyaWJ1dGVzIHRvIGxvYWQgYSBjcmVhdGVkIEVudGl0eSBpbnN0YW5jZSB3aXRoLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX2F0dHJpYnV0ZXM6IHt9XG59XG5cbmNsYXNzIEVudGl0eSB7XG4gIC8qKlxuICAgKiBFbnRpdHkgY29uc3RydWN0b3JcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoYXR0cmlidXRlcykge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKCdMVkw5OTpFbnRpdHk6Y29uc3RydWN0b3InLCB7XG4gICAgLy8gICBhcmd1bWVudHNcbiAgICAvLyB9KVxuXG4gICAgdGhpcy5leHRlbmQoe1xuICAgICAgX2F0dHJpYnV0ZXM6IGF0dHJpYnV0ZXNcbiAgICB9KVxuXG4gICAgLy8gRXhwb3NlIHByaXZhdGUgdmFsdWVzXG4gICAgZXhwb3NlUHJpdmF0ZVByb3BlcnRpZXModGhpcylcblxuICAgIC8vIENyZWF0ZSBhIHVuaXF1ZSBJRCBmb3IgdGhpcyBFbnRpdHlcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ3V1aWQnLCB7XG4gICAgICB2YWx1ZTogYCR7dGhpcy5OU306JHt1dWlkLnY0KCl9YCxcbiAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIEVudGl0eSB3aXRoIGFueSBnaXZlbiB7T2JqZWN0fSBhcmd1bWVudHNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IC4uLmFyZ3VtZW50c1xuICAgKiBAcmV0dXJucyB7U2VsZn1cbiAgICovXG4gIGV4dGVuZCAoKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coJ0xWTDk5OkVudGl0eTpleHRlbmQnLCB7XG4gICAgLy8gICBhcmd1bWVudHNcbiAgICAvLyB9KVxuXG4gICAgLy8gTWVyZ2UgdGhlIHByb3BlcnRpZXMgd2l0aCB0aGUgaW5zdGFudGlhdGVkIGF0dHJpYnV0ZXMgYW5kIGNvbmNhdGVuYXRlZCBwdWJsaWMgbWV0aG9kc1xuICAgIG1lcmdlKHRoaXMsIEVudGl0eVByb3BlcnRpZXMsIC4uLmFyZ3VtZW50cylcblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIEVudGl0eSdzIHByb3BlcnR5IHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcbiAgICogQHJldHVybiB7TWl4ZWR9XG4gICAqL1xuICBnZXRQcm9wIChwcm9wTmFtZSkge1xuICAgIGlmICghcHJvcE5hbWUgfHwgdHlwZW9mIHByb3BOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aGlzLk5TfV0gZ2V0OiAncHJvcE5hbWUnIHZhbHVlIGlzIGludmFsaWRgKVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RQYXRoLmdldCh0aGlzLnByb3BlcnRpZXMsIHByb3BOYW1lKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhbiBFbnRpdHkncyBwcm9wZXJ0eSB0byBhIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcE5hbWVcbiAgICogQHBhcmFtIHtNaXhlZH0gcHJvcFZhbHVlXG4gICAqL1xuICBzZXRQcm9wIChwcm9wTmFtZSwgcHJvcFZhbHVlKSB7XG4gICAgaWYgKCFwcm9wTmFtZSB8fCB0eXBlb2YgcHJvcE5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RoaXMuTlN9XSBzZXQ6ICdwcm9wTmFtZScgdmFsdWUgaXMgaW52YWxpZGApXG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KHRoaXMucHJvcGVydGllcywgcHJvcE5hbWUsIHByb3BWYWx1ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gRW50aXR5J3MgYXR0cmlidXRlIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0ck5hbWVcbiAgICogQHJldHVybiB7TWl4ZWR9XG4gICAqL1xuICBnZXRBdHRyIChhdHRyTmFtZSkge1xuICAgIGlmICghYXR0ck5hbWUgfHwgdHlwZW9mIGF0dHJOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aGlzLk5TfV0gZ2V0QXR0cjogJ2F0dHJOYW1lJyB2YWx1ZSBpcyBpbnZhbGlkYClcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQodGhpcy5hdHRyaWJ1dGVzLCBhdHRyTmFtZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYW4gRW50aXR5J3MgcHJvcGVydHkgdG8gYSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGF0dHJOYW1lXG4gICAqIEBwYXJhbSB7TWl4ZWR9IGF0dHJWYWx1ZVxuICAgKi9cbiAgc2V0QXR0ciAoYXR0ck5hbWUsIGF0dHJWYWx1ZSkge1xuICAgIGlmICghYXR0ck5hbWUgfHwgdHlwZW9mIGF0dHJOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aGlzLk5TfV0gc2V0QXR0cjogJ2F0dHJOYW1lJyB2YWx1ZSBpcyBpbnZhbGlkYClcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQodGhpcy5hdHRyaWJ1dGVzLCBhdHRyTmFtZSwgYXR0clZhbHVlKVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2UgdGhlIEVudGl0eVxuICAgKi9cbiAgaW5pdCAoKSB7fVxuXG4gIC8qKlxuICAgKiBEZXN0cm95IGFuZCB0ZWFyIGRvd24gdGhlIGNvbXBvbmVudFxuICAgKi9cbiAgZGVzdHJveSAoKSB7fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEVudGl0eVxuIiwiLyoqXG4gKiBMVkw5OSBDb3JlXG4gKlxuICogQ29yZSBjbGFzc2VzIHVzZWQgdGhyb3VnaG91dCB0aGUgZnJhbWV3b3JrXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBFbnRpdHkgPSByZXF1aXJlKCcuL2VudGl0eScpXG5jb25zdCBBcHAgPSByZXF1aXJlKCcuL2FwcCcpXG5jb25zdCBDb21wb25lbnQgPSByZXF1aXJlKCcuL2NvbXBvbmVudCcpXG5cbmNvbnN0IGNvcmUgPSB7XG4gIEVudGl0eSxcbiAgQXBwLFxuICBDb21wb25lbnRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb3JlXG4iLCIvKipcbiAqIExWTDk5XG4gKlxuICogVGhlIHdob2xlIGZyYW1ld29yayBpbiBvbmUgZGlzY3JldGUgcGFja2FnZVxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgY29tbW9uID0gcmVxdWlyZSgnLi9jb21tb24nKVxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJylcbmNvbnN0IGNvcmUgPSByZXF1aXJlKCcuL2NvcmUnKVxuY29uc3QgdG9vbHMgPSByZXF1aXJlKCcuL3Rvb2xzJylcblxuY29uc3QgbHZsOTkgPSB7XG4gIGNvbW1vbixcbiAgY29yZSxcbiAgdXRpbHMsXG4gIHRvb2xzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gbHZsOTlcbiIsIi8qKlxuICogTFZMOTkgQnJlYWtwb2ludHNcbiAqIERldGVjdCB2aWEgSlMgd2hhdCB0aGUgYnJlYWtwb2ludCBpcyBieSBrZXl3b3JkXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC5tZXJnZScpXG5cbmZ1bmN0aW9uIEJyZWFrcG9pbnRzIChzaXplcykge1xuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIFRoZSBkZWZpbmVkIGJyZWFrcG9pbnQgbmFtZXMgd2l0aCBtaW4vbWF4IHdpZHRocyAoaW4gNzJkcGkgcGl4ZWxzKVxuICAgICAqIFNob3VsZCBjb2luY2lkZSB3aXRoIENTUyBmb3Igb3B0aW11bSBleHBlY3RlZCBiZWhhdmlvdXJcbiAgICAgKlxuICAgICAqIEBwcm9wZXJ0eSBzaXplc1xuICAgICAqIEB0eXBlIHtPYmplY3R9ID0+IHtBcnJheX0gWzAgPSB7TnVtYmVyfSBtaW5XaWR0aCwgMSA9IHtOdW1iZXJ9IG1heFdpZHRoXVxuICAgICAqL1xuICAgIHNpemVzOiBzaXplcyB8fCB7XG4gICAgICAneHMnOiAgICAgICBbMCwgICAgMzk5XSxcbiAgICAgICdtb2JpbGUnOiAgIFswLCAgICA3OTldLFxuICAgICAgJ21zJzogICAgICAgWzQwMCwgIDU5OV0sXG4gICAgICAncyc6ICAgICAgICBbNjAwLCAgNzk5XSxcbiAgICAgICdtJzogICAgICAgIFs4MDAsICA5OTldLFxuICAgICAgJ3RhYmxldCc6ICAgWzgwMCwgIDExOTldLFxuICAgICAgJ2wnOiAgICAgICAgWzEwMDAsIDExOTldLFxuICAgICAgJ2xhcHRvcCc6ICAgWzEwMDAsIDEzOTldLFxuICAgICAgJ2NvbXB1dGVyJzogWzEwMDAsIDk5OTk5XSxcbiAgICAgICd4bCc6ICAgICAgIFsxMjAwLCAxMzk5XSxcbiAgICAgICdkZXNrdG9wJzogIFsxMjAwLCA5OTk5OV0sXG4gICAgICAneHhsJzogICAgICBbMTQwMCwgOTk5OTldXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCBhIHN0cmluZyBvZiB0aGUgY3VycmVudGx5IGFjdGl2ZSBicmVha3BvaW50c1xuICAgICAqIEBtZXRob2QgZ2V0QWN0aXZlXG4gICAgICogQHJldHVybnMge0FycmF5fVxuICAgICAqL1xuICAgIGdldEFjdGl2ZSAoKSB7XG4gICAgICBsZXQgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgbGV0IGJwID0gW11cblxuICAgICAgZm9yIChsZXQgeCBpbiB0aGlzLnNpemVzKSB7XG4gICAgICAgIGlmICh0aGlzLnNpemVzLmhhc093blByb3BlcnR5KHgpICYmIHdpZHRoID49IHRoaXMuc2l6ZXNbeF1bMF0gJiYgd2lkdGggPD0gdGhpcy5zaXplc1t4XVsxXSkge1xuICAgICAgICAgIGJwLnB1c2goeClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gYnBcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgYSBicmVha3BvaW50IGtleXdvcmQgaXMgY3VycmVudGx5IGFjdGl2ZVxuICAgICAqIEBtZXRob2QgaXNBY3RpdmVcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAgICAgKi9cbiAgICBpc0FjdGl2ZSAoaW5wdXQpIHtcbiAgICAgIGlmIChpbnB1dCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGlucHV0ID0gaW5wdXQuam9pbignfCcpXG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlucHV0ID0gbmV3IFJlZ0V4cCgnXFxcXGIoPzonICsgaW5wdXQucmVwbGFjZSgvW1xccyxdKy9nLCAnfCcpICsgJylcXFxcYicsICdpJylcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGlucHV0LnRlc3QodGhpcy5nZXRBY3RpdmUoKSsnJylcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBCcmVha3BvaW50c1xuIiwiLyoqXG4gKiBMVkw5OSBEZWJ1Z1xuICogQSBjb25zb2xlLWxpa2UgcmVwbGFjZW1lbnQgd2hpY2ggY3JlYXRlcyBhIG5vb3AgY29uc29sZSBvYmplY3QgaWYgeW91IGRvbid0IHdhbnQgdG8gb3V0cHV0IHN0dWZmIHZpYSB0aGUgY29uc29sZVxuICovXG5cbmZ1bmN0aW9uIG5vb3AgKCkge31cblxuLyoqXG4gKiBEZWJ1Z1xuICpcbiAqIEBwYXJhbSB7Qm9vbGVhbn0gc2lsZW50IFNldCB0byB0cnVlIHRvIG1ha2UgdGhlIGNvbnNvbGUgYmVoYXZpb3VycyBzaWxlbnRcbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBEZWJ1ZyAoc2lsZW50ID0gZmFsc2UpIHtcbiAgaWYgKHNpbGVudCkge1xuICAgIHJldHVybiB7XG4gICAgICBjbGVhcjogbm9vcCxcbiAgICAgIGNvdW50OiBub29wLFxuICAgICAgZGVidWc6IG5vb3AsXG4gICAgICBlcnJvcjogbm9vcCxcbiAgICAgIGdyb3VwOiBub29wLFxuICAgICAgaW5mbzogbm9vcCxcbiAgICAgIGxvZzogbm9vcCxcbiAgICAgIHRhYmxlOiBub29wLFxuICAgICAgdGltZTogbm9vcCxcbiAgICAgIHRpbWVFbmQ6IG5vb3AsXG4gICAgICB0cmFjZTogbm9vcCxcbiAgICAgIHdhcm46IG5vb3BcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbnNvbGUgfHwgd2luZG93LmNvbnNvbGVcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IERlYnVnXG4iLCIvKipcbiAqIExWTDk5IFRvb2xzXG4gKlxuICogU3RhbmRhbG9uZSB0b29scyB0aGF0IGRvbid0IHJlcXVpcmUgYW55IGRlcGVuZGVuY2llcyB3aXRoaW4gdGhlIGZyYW1ld29yaywgYnV0IHdvcmsgYWxvbmdzaWRlXG4gKi9cblxuY29uc3QgQnJlYWtwb2ludHMgPSByZXF1aXJlKCcuL2JyZWFrcG9pbnRzJylcbmNvbnN0IERlYnVnID0gcmVxdWlyZSgnLi9kZWJ1ZycpXG5jb25zdCBRdWV1ZSA9IHJlcXVpcmUoJy4vcXVldWUnKVxuY29uc3QgVHJhY2tFdmVudCA9IHJlcXVpcmUoJy4vdHJhY2tldmVudCcpXG5jb25zdCBTbW9vdGhTY3JvbGwgPSByZXF1aXJlKCcuL3Ntb290aC1zY3JvbGwnKVxuXG5jb25zdCB1dGlscyA9IHtcbiAgQnJlYWtwb2ludHMsXG4gIERlYnVnLFxuICBRdWV1ZSxcbiAgVHJhY2tFdmVudCxcbiAgU21vb3RoU2Nyb2xsXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9vbHNcbiIsIi8qKlxuICogTFZMOTkgUXVldWVcbiAqXG4gKiBCYXRjaCBhY3Rpb25zIGludG8gYSBkZWJvdW5jZWQgcXVldWVcbiAqIFVzZWZ1bCB0byByZWR1Y2UgYW1vdW50IG9mIHdvcmsgY29tcHV0ZXIvYnJvd3NlciBkb2VzXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC5tZXJnZScpXG5cbi8qKlxuICogUXVldWUgY2xhc3NcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIFF1ZXVlIChvcHRpb25zKSB7XG4gIC8qKlxuICAgKiBRdWV1ZSBvcHRpb25zXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBsZXQgX29wdGlvbnMgPSBtZXJnZSh7XG4gICAgcXVldWU6IHt9LFxuICAgIHRpbWVyOiAwLFxuICAgIHRpbWVyRGVsYXk6IDEwMFxuICB9LCBvcHRpb25zKVxuXG4gIC8qKlxuICAgKiBUaGUgYmF0Y2hlZCBxdWV1ZVxuICAgKiBRdWV1ZSBhY3Rpb25zIGFyZSBiYXRjaGVkIGluIGFuIHtPYmplY3R9IHdpdGggYSBzcGVjaWZpYyBsYWJlbFxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbGV0IF9xdWV1ZSA9IF9vcHRpb25zLnF1ZXVlXG5cbiAgLyoqXG4gICAqIFRoZSBxdWV1ZSB0aW1lclxuICAgKiBXaGVuIHRoZSBxdWV1ZSBpcyBhZGRlZCB0bywgdGhlIHRpbWVyIGlzIHVwZGF0ZWQgd2l0aCBhIGBzZXRUaW1lb3V0YCBjYWxsIHRvIHRoZSBgcnVuYCBmdW5jdGlvblxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbGV0IF90aW1lciA9IF9vcHRpb25zLnRpbWVyXG5cbiAgLyoqXG4gICAqIFRoZSBxdWV1ZSB0aW1lciBkZWxheVxuICAgKiBUaGUgZGVsYXkgYmV0d2VlbiBxdWV1ZSB0aW1lciB1cGRhdGVzIChpbiBtaWxsaXNlY29uZHMpXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqIEBkZWZhdWx0IDEwMFxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbGV0IF90aW1lckRlbGF5ID0gX29wdGlvbnMudGltZXJEZWxheVxuXG4gIC8qKlxuICAgKiBUaGUgcGxheSBzdGF0dXNcbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICogQGRlZmF1bHQgMVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbGV0IF9zdGF0dXMgPSAxXG5cbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBRdWV1ZSBhbiBhY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25MYWJlbCBBIHVuaXF1ZSBsYWJlbCBmb3IgdGhlIGFjdGlvbiBpbiB0aGUgcXVldWUuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbiBiZSBzZXQgdG8ge3VuZGVmaW5lZH0gKHdoaWNoIG1lYW5zIHRoZSBhY3Rpb24gY2FuJ3QgYmUgcmVtb3ZlZClcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgYWN0aW9uXG4gICAgICogQHBhcmFtIHtNaXhlZH0gLi4uYXJncyBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGFjdGlvbiBoYW5kbGVyXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcXVldWUgKGFjdGlvbkxhYmVsLCBhY3Rpb24sIC4uLmFyZ3MpIHtcbiAgICAgIC8vIERlZmF1bHQgYWN0aW9uTGFiZWwgaXMgdGltZSB2YWx1ZSBhcyBzdHJpbmdcbiAgICAgIGlmICghYWN0aW9uTGFiZWwpIHtcbiAgICAgICAgYWN0aW9uTGFiZWwgPSBEYXRlLm5vdygpICsgJydcbiAgICAgIH1cblxuICAgICAgLy8gQXNzaWduIHRoZSBmdW5jdGlvbiB0byB0aGUgcXVldWVcbiAgICAgIGlmIChhY3Rpb25MYWJlbCAmJiBhY3Rpb24gJiYgdHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBfcXVldWVbYWN0aW9uTGFiZWxdID0ge1xuICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIGFjdGlvbiB0byB0aGUgcXVldWUuIEFmdGVyIGFkZGluZyB0aGlzIHdpbGwgc3RhcnQgdGhlIHF1ZXVlIHRpbWVyIHRvIHRoZW4gcnVuIHRoZSBxdWV1ZSBhZnRlciB0aGUgZGVsYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25MYWJlbCBBIHVuaXF1ZSBsYWJlbCBmb3IgdGhlIGFjdGlvbiBpbiB0aGUgcXVldWUuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbiBiZSBzZXQgdG8ge3VuZGVmaW5lZH0gKHdoaWNoIG1lYW5zIHRoZSBhY3Rpb24gY2FuJ3QgYmUgcmVtb3ZlZClcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgYWN0aW9uXG4gICAgICogQHBhcmFtIHtNaXhlZH0gLi4uYXJncyBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGFjdGlvbiBoYW5kbGVyXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgYWRkIChhY3Rpb25MYWJlbCwgYWN0aW9uLCAuLi5hcmdzKSB7XG4gICAgICAvLyBRdWV1ZSB0aGUgYWN0aW9uXG4gICAgICB0aGlzLnF1ZXVlKGFjdGlvbkxhYmVsLCBhY3Rpb24sIC4uLmFyZ3MpXG5cbiAgICAgIC8vIFBsYXkgdGhlIHRpbWVyIHRvIGdldCB0aGUgcXVldWUgdG8gcnVuIGFmdGVyIGEgZGVsYXkgKG9ubHkgd2hlbiBwbGF5aW5nKVxuICAgICAgaWYgKF9zdGF0dXMpIHtcbiAgICAgICAgdGhpcy5wbGF5KClcbiAgICAgIH1cbiAgICAgIC8vIH0gZWxzZSB7XG4gICAgICAvLyAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gICBjb25zb2xlLmxvZygncXVldWUgaXMgY3VycmVudGx5IHBhdXNlZCcpXG4gICAgICAvLyB9XG5cbiAgICAgIC8vIEBjaGFpbmFibGVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCBhY3Rpb24gYW5kIHRoZW4gcnVuIHRoZSBxdWV1ZSBpbW1lZGlhdGVseVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbkxhYmVsXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uXG4gICAgICogQHBhcmFtIHtNaXhlZH0gYWN0aW9uQXJnc1xuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHN5bmMgKGFjdGlvbkxhYmVsLCBhY3Rpb24sIC4uLmFyZ3MpIHtcbiAgICAgIGNsZWFyVGltZW91dChfdGltZXIpXG5cbiAgICAgIC8vIFF1ZXVlIGFjdGlvbi4uLlxuICAgICAgdGhpcy5xdWV1ZShhY3Rpb25MYWJlbCwgYWN0aW9uLCAuLi5hcmdzKVxuXG4gICAgICAvLyAuLi4gVGhlbiBydW4gdGhlIHF1ZXVlIGltbWVkaWF0ZWx5XG4gICAgICB0aGlzLnJ1bigpXG5cbiAgICAgIC8vIEBjaGFpbmFibGVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgYWN0aW9uIGJ5IGl0cyBsYWJlbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbkxhYmVsXG4gICAgICogQHJldHVybiB7dW5kZWZpbmVkfE9iamVjdH1cbiAgICAgKi9cbiAgICBnZXRBY3Rpb25CeUxhYmVsIChhY3Rpb25MYWJlbCkge1xuICAgICAgaWYgKF9xdWV1ZS5oYXNPd25Qcm9wZXJ0eShhY3Rpb25MYWJlbCkpIHtcbiAgICAgICAgcmV0dXJuIF9xdWV1ZVthY3Rpb25MYWJlbF1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmUgYWN0aW9uIGZyb20gcXVldWUuIENhbiBvbmx5IHJlbW92ZSBhY3Rpb25zIGlmIHlvdSBrbm93IHRoZWlyIGxhYmVsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTGFiZWxcbiAgICAgKiBAcmV0dXJuIHtTZWxmfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICByZW1vdmUgKGFjdGlvbkxhYmVsKSB7XG4gICAgICBpZiAoX3F1ZXVlLmhhc093blByb3BlcnR5KGFjdGlvbkxhYmVsKSkge1xuICAgICAgICBfcXVldWVbYWN0aW9uTGFiZWxdID0gdW5kZWZpbmVkXG4gICAgICAgIGRlbGV0ZSBfcXVldWVbYWN0aW9uTGFiZWxdXG4gICAgICB9XG5cbiAgICAgIC8vIEBjaGFpbmFibGVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBsYXkgdGhlIHF1ZXVlIHRpbWVyICh3aWxsIHJ1biBxdWV1ZSBhZnRlciB0aW1lciBkZWxheSlcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHBsYXkgKCkge1xuICAgICAgLy8gT25seSBwbGF5IGlmIGFscmVhZHkgcGF1c2VkXG4gICAgICBjbGVhclRpbWVvdXQoX3RpbWVyKVxuXG4gICAgICAvLyBTZXQgdG8gcGxheWluZ1xuICAgICAgX3N0YXR1cyA9IDFcblxuICAgICAgLy8gUmVzZXQgdGltZXIgdG8gcnVuIHRoZSBxdWV1ZVxuICAgICAgX3RpbWVyID0gc2V0VGltZW91dChmdW5jdGlvbiBydW5RdWV1ZVByb2Nlc3NBZnRlckRlbGF5KHF1ZXVlSW5zdGFuY2UpIHtcbiAgICAgICAgcXVldWVJbnN0YW5jZS5ydW4oKVxuICAgICAgfSh0aGlzKSwgX3RpbWVyRGVsYXkpXG5cbiAgICAgIC8vIEBjaGFpbmFibGVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBhdXNlIHRoZSBxdWV1ZSB0aW1lclxuICAgICAqXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcGF1c2UgKCkge1xuICAgICAgLy8gT25seSBwYXVzZSBpZiBhbHJlYWR5IHBsYXlpbmdcbiAgICAgIGNsZWFyVGltZW91dChfdGltZXIpXG5cbiAgICAgIC8vIFNldCB0byBwYXVzZWRcbiAgICAgIF9zdGF0dXMgPSAwXG5cbiAgICAgIC8vIEBjaGFpbmFibGVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MvcnVuIGFsbCB0aGUgYWN0aW9ucyBpbiB0aGUgcXVldWVcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHJ1biAoKSB7XG4gICAgICBjbGVhclRpbWVvdXQoX3RpbWVyKVxuXG4gICAgICAvLyBObyBpdGVtcyBpbiB0aGUgcXVldWUsIHNvIHNldCB0byBwYXVzZVxuICAgICAgaWYgKCFPYmplY3Qua2V5cyhfcXVldWUpLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnBhdXNlKClcblxuICAgICAgICByZXR1cm4gdGhpc1xuICAgICAgfVxuXG4gICAgICAvLyBQcm9jZXNzIHRoZSBxdWV1ZVxuICAgICAgZm9yIChsZXQgYWN0aW9uTGFiZWwgaW4gX3F1ZXVlKSB7XG4gICAgICAgIGlmIChfcXVldWUuaGFzT3duUHJvcGVydHkoYWN0aW9uTGFiZWwpICYmIF9xdWV1ZVthY3Rpb25MYWJlbF0pIHtcbiAgICAgICAgICBsZXQgcXVldWVkSXRlbSA9IF9xdWV1ZVthY3Rpb25MYWJlbF1cblxuICAgICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdydW5uaW5nIHF1ZXVlZCBpdGVtJywgcXVldWVkSXRlbSlcblxuICAgICAgICAgIC8vIEZ1bmN0aW9uXG4gICAgICAgICAgaWYgKHF1ZXVlZEl0ZW0gJiYgdHlwZW9mIHF1ZXVlZEl0ZW0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHF1ZXVlZEl0ZW0oKVxuXG4gICAgICAgICAgLy8gT2JqZWN0XG4gICAgICAgICAgfSBlbHNlIGlmIChxdWV1ZWRJdGVtLmhhc093blByb3BlcnR5KCdhY3Rpb24nKSAmJiB0eXBlb2YgcXVldWVkSXRlbS5hY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEFwcGx5IGFyZ3VtZW50cyB0byB0aGUgYWN0aW9uXG4gICAgICAgICAgICBpZiAocXVldWVkSXRlbS5oYXNPd25Qcm9wZXJ0eSgnYXJncycpICYmIHF1ZXVlZEl0ZW0uYXJncyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgIHF1ZXVlZEl0ZW0uYWN0aW9uKC4uLnF1ZXVlZEl0ZW0uYXJncylcblxuICAgICAgICAgICAgLy8gUnVuIHRoZSBhY3Rpb24gbGlrZSBub3JtYWxcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHF1ZXVlZEl0ZW0uYWN0aW9uKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBEZWxldGUgdGhlIHF1ZXVlZCBpdGVtXG4gICAgICAgICAgX3F1ZXVlW2FjdGlvbkxhYmVsXSA9IHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSBfcXVldWVbYWN0aW9uTGFiZWxdXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ29udGludWUgcGxheWluZyBpZiBpbiBwbGF5IG1vZGVcbiAgICAgIC8vIGlmIChfc3RhdHVzKSB7XG4gICAgICAvLyAgIHRoaXMucGxheSgpXG4gICAgICAvLyB9XG5cbiAgICAgIC8vIEBjaGFpbmFibGVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc3RhdHVzIG9mIHRoZSBxdWV1ZTpcbiAgICAgKiAgIDAgPSBQYXVzZWRcbiAgICAgKiAgIDEgPSBQbGF5aW5nXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBjaGVja1N0YXR1cyAoKSB7XG4gICAgICByZXR1cm4gX3N0YXR1c1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpbWVyIGRlbGF5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldFRpbWVyRGVsYXkgKCkge1xuICAgICAgcmV0dXJuIF90aW1lckRlbGF5XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdGltZXIgZGVsYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0aW1lckRlbGF5XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqIEByZXR1cm5zIHtTZWxmfVxuICAgICAqL1xuICAgIHNldFRpbWVyRGVsYXkgKHRpbWVyRGVsYXkpIHtcbiAgICAgIC8vIE9ubHkgc2V0IGlmIHRpbWVyRGVsYXkgaXMgZ3JlYXRlciB0aGFuIDBcbiAgICAgIGlmICh0aW1lckRlbGF5ICYmIHRpbWVyRGVsYXkgPiAwKSB7XG4gICAgICAgIF90aW1lckRlbGF5ID0gdGltZXJEZWxheVxuICAgICAgfVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgcXVldWVcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRRdWV1ZUxlbmd0aCAoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoX3F1ZXVlKS5sZW5ndGhcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBRdWV1ZVxuIiwiLyoqXG4gKiBMVkw5OSBTbW9vdGggU2Nyb2xsXG4gKlxuICogU21vb3RobHkgc2Nyb2xsIHRvIGludGVybmFsIGFuY2hvciBsaW5rcyBvbiBhIHBhZ2UuXG4gKlxuICogIyMgVXNhZ2VcbiAqXG4gKiBTbW9vdGggU2Nyb2xsIG5lZWRzIHRvIGJlIGluaXRpYWxpc2VkIHdpdGggalF1ZXJ5IGFuZCBhbnkgY29uZmlndXJlZCBvcHRpb25zLiBEdXJpbmcgaW5pdGlhbGlzYXRpb24gdGhlIHNjcmlwdCB3aWxsXG4gKiBhcHBseSB0aGUgYmVoYXZpb3VycyB0byBhbnkgYXBwbGljYWJsZSBhbmNob3IgbGlua3MuXG4gKlxuICogYGBgXG4gKiAgIGxldCBTbW9vdGhTY3JvbGwgPSByZXF1aXJlKCdsdmw5OS9lczYvdG9vbHMvc21vb3RoLXNjcm9sbCcpKGpRdWVyeSwgeyBidWZmZXJUb3A6IDAgfSlcbiAqIGBgYFxuICpcbiAqIFlvdSBjYW4gYWxzbyBpbml0aWFsaXNlIHRoZSBzbW9vdGhTY3JvbGwgYmVoYXZpb3VycyBieSBjYWxsaW5nIGBzbW9vdGhTY3JvbGwuaW5pdCgpYC4gVGhpcyB3aWxsIGF0dGFjaCB0aGUgbmVjZXNzYXJ5XG4gKiBldmVudHMgb24gdG8gYW5jaG9yIGxpbmtzLlxuICpcbiAqIFlvdSBjYW4gdHJpZ2dlciB0aGUgc2Nyb2xsVG8gZXZlbnQgYnkgdXNpbmcgdGhlIGN1c3RvbSBldmVudCBgU21vb3RoU2Nyb2xsLnNjcm9sbFRvYCwgZS5nLjpcbiAqXG4gKiBgYGBcbiAqICAgJChkb2N1bWVudCkudHJpZ2dlcignU21vb3RoU2Nyb2xsLnNjcm9sbFRvJywgWyBzY3JvbGxUb09wdGlvbnMgXSlcbiAqIGBgYFxuICpcbiAqIFRoZSBgc2Nyb2xsVG9gIGZ1bmN0aW9uIGVtaXRzIGEgY3VzdG9tIGV2ZW50IGBTbW9vdGhTY3JvbGwuc2Nyb2xsVG86c3RhcnRgIHdoZW4gdGhlIGFjdGlvbiBpcyBpbnZva2VkIGFuZFxuICogYFNtb290aFNjcm9sbC5zY3JvbGxUbzplbmRgIHdoZW4gaXQgZmluaXNoZXMuXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBTbW9vdGhTY3JvbGwgPSBmdW5jdGlvbiAoJCwgb3B0aW9ucykge1xuICAvKipcbiAgICogTG9hZCBpbiB0aGUgc2V0dGluZ3NcbiAgICovXG4gIGNvbnN0IHNldHRpbmdzID0gJC5leHRlbmQoe1xuICAgIC8vIFRoZSBzcGFjZSBiZXR3ZWVuIHRoZSB0b3Agb2YgdGhlIHdpbmRvdyBhbmQgdGhlIHRvcCBvZiB0aGUgdGFyZ2V0XG4gICAgYnVmZmVyVG9wOiAwLFxuXG4gICAgLy8gVGhlIHNwZWVkIHRvIHNjcm9sbCB0aGUgd2luZG93XG4gICAgc2Nyb2xsU3BlZWQ6IDEwMDAsXG5cbiAgICAvLyBUaGUgZGlzdGFuY2UgZnJvbSB0b3Agb2Ygd2luZG93IHRvIHRvcCBvZiB0YXJnZXQgZWxlbWVudCB0byB0cmlnZ2VyIHNjcm9sbGluZ1xuICAgIHRyaWdnZXJEaXN0YW5jZTogNDAwXG4gIH0sIG9wdGlvbnMpXG5cbiAgLyoqXG4gICAqIFNtb290aGx5IHNjcm9sbCB0byBhIHRhcmdldFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudHxqUXVlcnlPYmplY3R9IHRhcmdldFxuICAgKi9cbiAgZnVuY3Rpb24gc2Nyb2xsVG8gKHRhcmdldCwgc2Nyb2xsVG9PcHRpb25zKSB7XG4gICAgLy8gRmlndXJlIG91dCBlbGVtZW50IHRvIHNjcm9sbCB0b1xuICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpLm5vdCgnW2RhdGEtZGlzYWJsZS1zbW9vdGgtc2Nyb2xsXScpXG5cbiAgICAvLyBNb3JlIHRoYW4gb25lIHRhcmdldCwgZGVmYXVsdCB0byBmaXJzdFxuICAgICR0YXJnZXQgPSAoJHRhcmdldC5sZW5ndGggPiAxID8gJHRhcmdldC5lcSgwKSA6ICR0YXJnZXQpXG5cbiAgICAvLyBEb2VzIGEgc2Nyb2xsIHRhcmdldCBleGlzdD9cbiAgICBpZiAoJHRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIExvYWQgaW4gcGVyLXVzZSBzZXR0aW5nc1xuICAgICAgbGV0IHNjcm9sbFRvU2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgc2V0dGluZ3MsIHNjcm9sbFRvT3B0aW9ucylcblxuICAgICAgLy8gR2V0IHRoZSB0YXJnZXQncyB0b3Agb2Zmc2V0XG4gICAgICBsZXQgdGFyZ2V0T2Zmc2V0VG9wID0gJHRhcmdldC5vZmZzZXQoKS50b3BcblxuICAgICAgLy8gR2V0IGN1cnJlbnQgd2luZG93IHNjcm9sbFRvcFxuICAgICAgbGV0IHdpbmRvd1Njcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKVxuXG4gICAgICAvLyBTdXBwb3J0IGR5bmFtaWMgYnVmZmVyVG9wIGlmIGl0IGlzIGEgZnVuY3Rpb25cbiAgICAgIGxldCBzY3JvbGxUb3AgPSB0YXJnZXRPZmZzZXRUb3AgLSAodHlwZW9mIHNjcm9sbFRvU2V0dGluZ3MuYnVmZmVyVG9wID09PSAnZnVuY3Rpb24nID8gc2Nyb2xsVG9TZXR0aW5ncy5idWZmZXJUb3AoKSA6IHNjcm9sbFRvU2V0dGluZ3MuYnVmZmVyVG9wKVxuXG4gICAgICAvLyBEb24ndCB0cmlnZ2VyIHRoZSBzY3JvbGwgaWYgdGhlIGRpc3RhbmNlIGlzIHdpdGhpblxuICAgICAgbGV0IGNoZWNrVHJpZ2dlckRpc3RhbmNlID0gTWF0aC5hYnMod2luZG93U2Nyb2xsVG9wIC0gc2Nyb2xsVG9wKVxuICAgICAgaWYgKGNoZWNrVHJpZ2dlckRpc3RhbmNlIDwgc2Nyb2xsVG9TZXR0aW5ncy50cmlnZ2VyRGlzdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogRW1pdCBzdGFydCBldmVudFxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBTbW9vdGhTY3JvbGwuc2Nyb2xsVG86c3RhcnRcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5T2JqZWN0fSAkdGFyZ2V0XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH1cbiAgICAgICAqL1xuICAgICAgJHRhcmdldC50cmlnZ2VyKCdTbW9vdGhTY3JvbGwuc2Nyb2xsVG86c3RhcnQnLCBbIHNjcm9sbFRvU2V0dGluZ3MgXSlcblxuICAgICAgLy8gRG8gdGhlIHNjcm9sbCB0aGluZ1xuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3BcbiAgICAgIH0sIHNjcm9sbFRvU2V0dGluZ3Muc2Nyb2xsU3BlZWQsICgpID0+IHtcbiAgICAgICAgLy8gQ2FsbGJhY2sgYWZ0ZXIgYW5pbWF0aW9uXG4gICAgICAgIC8vIE11c3QgY2hhbmdlIGZvY3VzIVxuICAgICAgICAkdGFyZ2V0LmZvY3VzKClcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW1pdCBlbmQgZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFNtb290aFNjcm9sbC5zY3JvbGxUbzplbmRcbiAgICAgICAgICogQHBhcmFtIHtqUXVlcnlPYmplY3R9ICR0YXJnZXRcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICAkdGFyZ2V0LnRyaWdnZXIoJ1Ntb290aFNjcm9sbC5zY3JvbGxUbzplbmQnLCBbIHNjcm9sbFRvU2V0dGluZ3MgXSlcblxuICAgICAgICAvLyBDaGVja2luZyBpZiB0aGUgdGFyZ2V0IHdhcyBmb2N1c2VkXG4gICAgICAgIGlmICgkdGFyZ2V0LmlzKCc6Zm9jdXMnKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIGFsbCBsaW5rcyBvbiB0aGUgcGFnZSB3aXRoIHRoZSBzbW9vdGhTY3JvbGwgZnVuY3Rpb25hbGl0eVxuICAgKi9cbiAgZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgLy8gQXR0YWNoIGxpbmsgYmVoYXZpb3Vyc1xuICAgICQoJ2FbaHJlZio9XCIjXCJdJylcbiAgICAvLyBSZW1vdmUgbGlua3MgdGhhdCBkb24ndCBhY3R1YWxseSBsaW5rIHRvIGFueXRoaW5nXG4gICAgICAubm90KCdbaHJlZj1cIiNcIl0nKVxuICAgICAgLm5vdCgnW2hyZWY9XCIjMFwiXScpXG4gICAgICAuY2xpY2soZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCAkYSA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCdhJylcbiAgICAgICAgY29uc3QgaGFzaCA9ICRhLmF0dHIoJ2hyZWYnKS5yZXBsYWNlKC8uKiMoW14/XSspLiovLCAnIyQxJylcbiAgICAgICAgaWYgKCQoaGFzaCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBzY3JvbGxUbyhoYXNoKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgLy8gQXR0YWNoIGN1c3RvbSBldmVudCB0byB0cmlnZ2VyIHRocm91Z2ggRE9NXG4gICAgJChkb2N1bWVudCkub24oJ1Ntb290aFNjcm9sbC5zY3JvbGxUbycsIGZ1bmN0aW9uIChldmVudCwgc2Nyb2xsVG9PcHRpb25zKSB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgIHNjcm9sbFRvKGV2ZW50LnRhcmdldCwgc2Nyb2xsVG9PcHRpb25zKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBDaGVjayB0byBzZWUgaWYgYSBoYXNoIGlzIGxvY2F0ZWQgaW4gdGhlIHdpbmRvdy5sb2NhdGlvbiBhbmQgc2Nyb2xsIHRvIHRoZSBlbGVtZW50XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2Nyb2xsVG8od2luZG93LmxvY2F0aW9uLmhhc2gpXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBzY3JvbGxUb1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU21vb3RoU2Nyb2xsXG4iLCIvKipcbiAqIExWTDk5IFRyYWNrIEV2ZW50XG4gKiBDYWNoZXMgdHJhY2tlZCBldmVudHMgdW50aWwgR29vZ2xlIEFuYWx5dGljcyBpcyBsb2FkZWQsIHRoZW4gdXBsb2FkcyB0byBHQVxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuZnVuY3Rpb24gVHJhY2tFdmVudCAoZGVidWcpIHtcbiAgLyoqXG4gICAqIENvbGxlY3QgdHJhY2tlZCBldmVudHMgYmVmb3JlIEdBIGlzIGxvYWRlZFxuICAgKiBAdHlwZSB7QXJyYXl9XG4gICAqL1xuICBsZXQgc2F2ZWQgPSBbXVxuXG4gIC8qKlxuICAgKiBTdGFydCBjaGVja2luZyB0byBzZWUgaWYgdGhlIEdBIG9iamVjdCBpcyBsb2FkZWRcbiAgICovXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgR0EgaXMgbG9hZGVkIGFuZCB0aGVuIHNlbmQgYW55IHN0b3JlZCBHQSBldmVudHNcbiAgICovXG4gIHRoaXMuZ2FMb2FkZWRUaW1lciA9IHNldEludGVydmFsKChmdW5jdGlvbiAobHZsOTlUcmFja0V2ZW50KSB7XG4gICAgbGV0IGlcblxuICAgIC8vIFdhaXQgdW50aWwgR0Egb2JqZWN0IGlzIGF2YWlsYWJsZVxuICAgIGlmICh0eXBlb2Ygd2luZG93LmdhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY2xlYXJJbnRlcnZhbChsdmw5OVRyYWNrRXZlbnQuZ2FMb2FkZWRUaW1lcilcblxuICAgICAgLy8gU2VuZCBzYXZlZCBldmVudHNcbiAgICAgIGlmIChsdmw5OVRyYWNrRXZlbnQuc2F2ZWQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoZGVidWcgJiYgd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYFNlbmRpbmcgJHtsdmw5OVRyYWNrRXZlbnQuc2F2ZWQubGVuZ3RofSB0cmFja2VkIGV2ZW50cyB0byBnYWApXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgaW4gbHZsOTlUcmFja0V2ZW50LnNhdmVkKSB7XG4gICAgICAgICAgd2luZG93LmdhKCdzZW5kJywgbHZsOTlUcmFja0V2ZW50LnNhdmVkW2ldKVxuICAgICAgICB9XG4gICAgICAgIGx2bDk5VHJhY2tFdmVudC5zYXZlZCA9IFtdXG4gICAgICB9XG4gICAgfVxuICB9KHRoaXMpKSwgNTAwMClcblxuICAvKipcbiAgICogVHJhY2sgZXZlbnQgbWFnaWNcbiAgICogQHBhcmFtIGV2ZW50Q2F0ZWdvcnlcbiAgICogQHBhcmFtIGV2ZW50QWN0aW9uXG4gICAqIEBwYXJhbSBldmVudExhYmVsXG4gICAqIEBwYXJhbSBldmVudFZhbHVlXG4gICAqL1xuICByZXR1cm4gZnVuY3Rpb24gdHJhY2sgKGV2ZW50Q2F0ZWdvcnksIGV2ZW50QWN0aW9uLCBldmVudExhYmVsLCBldmVudFZhbHVlKSB7XG4gICAgbGV0IHRyYWNrZWRFdmVudCA9IHtcbiAgICAgIGhpdFR5cGU6ICdldmVudCcsXG4gICAgICBldmVudENhdGVnb3J5OiBldmVudENhdGVnb3J5LFxuICAgICAgZXZlbnRBY3Rpb246IGV2ZW50QWN0aW9uLFxuICAgICAgZXZlbnRMYWJlbDogZXZlbnRMYWJlbCxcbiAgICAgIGV2ZW50VmFsdWU6IGV2ZW50VmFsdWVcbiAgICB9XG5cbiAgICBpZiAoIWV2ZW50Q2F0ZWdvcnkgfHwgIWV2ZW50QWN0aW9uKSByZXR1cm47XG4gICAgaWYgKHR5cGVvZiBldmVudFZhbHVlID09PSAnc3RyaW5nJykgcmV0dXJuO1xuXG4gICAgLy8gR0EgaXMgbG9hZGVkXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuZ2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoZGVidWcgJiYgd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTZW5kIHRyYWNrZWRFdmVudCB0byBHQScsIHRyYWNrZWRFdmVudClcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5nYSgnc2VuZCcsIHRyYWNrZWRFdmVudClcblxuICAgICAgLy8gd2FpdGluZyBmb3IgR0EgdG8gbG9hZCwgdXNlIGludGVybmFsIHZhciB0byBjb2xsZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS5sb2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0dBIG5vdCBsb2FkZWQgeWV0LCBzdG9yZSB0cmFja2VkRXZlbnQnLCB0cmFja2VkRXZlbnQpXG4gICAgICB9XG4gICAgICB0aGlzLnNhdmVkLnB1c2godHJhY2tlZEV2ZW50KVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNrRXZlbnRcbiIsIi8qKlxuICogTFZMOTkgVXRpbHNcbiAqXG4gKiBVdGlsaXRpZXMgdXNlZCB0aHJvdWdob3V0IHRoZSBmcmFtZXdvcmtcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5jb25zdCBpbmhlcml0YW5jZSA9IHJlcXVpcmUoJy4vaW5oZXJpdGFuY2UnKVxuLy8gY29uc3Qgc3VwZXIgPSByZXF1aXJlKCcuL3N1cGVyJylcblxuY29uc3QgdXRpbHMgPSB7XG4gIHBhcnNlLFxuICBpbmhlcml0YW5jZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzXG4iLCIvKipcbiAqIExWTDk5IEluaGVyaXRhbmNlIHV0aWxpdGllc1xuICovXG5cbmNvbnN0IFJFX1BSSVZBVEUgPSAvXl8vXG5cbi8qKlxuICogQXNzaWduIHB1YmxpYyBnZXR0ZXIvc2V0dGVyIHByb3BlcnRpZXMgdG8gdGhlIHRhcmdldC4gVGhpcyB3aWxsIHJlZmVyZW5jZSB0aGUgdGFyZ2V0IHByb3BlcnR5IChpZiBpdCBpcyBzZXQpXG4gKiBvdGhlcndpc2UgdXNlIHRoZSBkZWZhdWx0IHByb3BlcnR5IHZhbHVlLiBZb3UgY2FuIGFsc28gd2hpdGVsaXN0IHRoZSBwcm9wZXJ0aWVzIHlvdSB3YW50IHRvIHNlbGVjdGl2ZWx5XG4gKiBleHBvc2UgYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdFByb3BWYWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IHdoaXRlbGlzdFxuICovXG5mdW5jdGlvbiBleHBvc2VBbGxQcm9wZXJ0aWVzICh0YXJnZXQsIGRlZmF1bHRQcm9wVmFsdWVzLCB3aGl0ZWxpc3QpIHtcbiAgbGV0IHByb3BlcnRpZXNcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gdGFyZ2V0IHdhcyBnaXZlbicpXG4gIH1cblxuICAvLyBGaWx0ZXIgbm9uLXdoaXRlbGlzdGVkIHByb3BlcnRpZXNcbiAgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRhcmdldCkuZmlsdGVyKGl0ZW0gPT4ge1xuICAgIHJldHVybiAod2hpdGVsaXN0ICYmIHdoaXRlbGlzdC5pbmNsdWRlcyhpdGVtKSkgfHwgIXdoaXRlbGlzdFxuICB9KVxuXG4gIC8vIEBkZWJ1Z1xuICAvLyBjb25zb2xlLmxvZygnZmlsdGVyZWQgcHJvcGVydGllcycsIHByb3BlcnRpZXMpXG5cbiAgaWYgKCFwcm9wZXJ0aWVzIHx8ICFwcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gcHJvcGVydGllcyB3ZXJlIGdpdmVuJylcbiAgfVxuXG4gIC8vIERlZmF1bHQgcHJvcCB2YWx1ZXMgdG8gdGFyZ2V0XG4gIGlmICh0eXBlb2YgZGVmYXVsdFByb3BWYWx1ZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZGVmYXVsdFByb3BWYWx1ZXMgPSB0YXJnZXRcbiAgfVxuXG4gIC8vIFByb2Nlc3MgYW5kIGV4cG9zZSB0aGUgcHJvcGVydGllcyBvbiB0aGUgdGFyZ2V0XG4gIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wTmFtZSA9PiB7XG4gICAgbGV0IHVzZVByb3BOYW1lID0gcHJvcE5hbWVcblxuICAgIC8vIFByaXZhdGUgdmFsdWVzIGNhbiBvbmx5IGhhdmUgYSBwdWJsaWMgZ2V0dGVyXG4gICAgaWYgKFJFX1BSSVZBVEUudGVzdChwcm9wTmFtZSkpIHtcbiAgICAgIHVzZVByb3BOYW1lID0gcHJvcE5hbWUucmVwbGFjZShSRV9QUklWQVRFLCAnJylcblxuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZygnRm91bmQgcHJpdmF0ZSBwcm9wZXJ0eScsIHtcbiAgICAgIC8vICAgcHJvcE5hbWUsXG4gICAgICAvLyAgIHVzZVByb3BOYW1lLFxuICAgICAgLy8gICBwcm9wVmFsdWU6IGRlZmF1bHRQcm9wVmFsdWVzW3Byb3BOYW1lXSxcbiAgICAgIC8vICAgdGFyZ2V0XG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBIaWRlIG9yaWdpbmFsIHByaXZhdGUgdmFsdWVcbiAgICAgIC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BOYW1lLCB7XG4gICAgICAvLyAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBDcmVhdGUgcHVibGljIGludGVyZmFjZVxuICAgICAgY3JlYXRlUHVibGljR2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wTmFtZSwgdXNlUHJvcE5hbWUsIGRlZmF1bHRQcm9wVmFsdWVzW3Byb3BOYW1lXSlcblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBAZGVidWdcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdGb3VuZCBwdWJsaWMgcHJvcGVydHknLCB7XG4gICAgICAvLyAgIHByb3BOYW1lLFxuICAgICAgLy8gICB1c2VQcm9wTmFtZSxcbiAgICAgIC8vICAgcHJvcFZhbHVlOiBwcm9wZXJ0aWVzW3Byb3BOYW1lXSxcbiAgICAgIC8vICAgdGFyZ2V0XG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBDcmVhdGUgcHVibGljIGludGVyZmFjZVxuICAgICAgY3JlYXRlUHVibGljR2V0U2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wTmFtZSwgdXNlUHJvcE5hbWUsIGRlZmF1bHRQcm9wVmFsdWVzW3Byb3BOYW1lXSlcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogRXhwb3NlIG9ubHkgdGhlIHByaXZhdGUgcHJvcGVydGllcyBsaXN0ZWQgb24gdGhlIHRhcmdldCB3aXRoIHB1YmxpYyBnZXR0ZXIgcHJvcGVydHkuIFdoaXRlbGlzdCBvbmx5IHRob3NlIHlvdSB3YW50XG4gKiBieSBhZGRpbmcgdGhlIHByb3BlcnR5J3MgbmFtZSB0byB0aGUgd2hpdGVsaXN0IHtBcnJheX1cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gZGVmYXVsdFByb3BWYWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IHdoaXRlbGlzdFxuICovXG5mdW5jdGlvbiBleHBvc2VQcml2YXRlUHJvcGVydGllcyh0YXJnZXQsIGRlZmF1bHRQcm9wVmFsdWVzLCB3aGl0ZWxpc3QpIHtcbiAgbGV0IHByb3BlcnRpZXNcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gdGFyZ2V0IHdhcyBnaXZlbicpXG4gIH1cblxuICAvLyBGaWx0ZXIgbm9uLXByaXZhdGUgb3Igbm9uLXdoaXRlbGlzdGVkIHByb3BlcnRpZXNcbiAgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRhcmdldCkuZmlsdGVyKGl0ZW0gPT4ge1xuICAgIGlmICgod2hpdGVsaXN0ICYmIHdoaXRlbGlzdC5pbmNsdWRlcyhpdGVtKSkgfHwgIXdoaXRlbGlzdCkge1xuICAgICAgcmV0dXJuIFJFX1BSSVZBVEUudGVzdChpdGVtKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcblxuICAvLyBAZGVidWdcbiAgLy8gY29uc29sZS5sb2coJ2ZpbHRlcmVkIHByb3BlcnRpZXMnLCBwcm9wZXJ0aWVzKVxuXG4gIC8vIFNpbGVudCBkZWF0aFxuICBpZiAoIXByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBEZWZhdWx0IHByb3AgdmFsdWVzIHRvIHRhcmdldFxuICBpZiAodHlwZW9mIGRlZmF1bHRQcm9wVmFsdWVzID09PSAndW5kZWZpbmVkJykge1xuICAgIGRlZmF1bHRQcm9wVmFsdWVzID0gdGFyZ2V0XG4gIH1cblxuICAvLyBQcm9jZXNzIGFuZCBleHBvc2UgdGhlIHByb3BlcnRpZXMgb24gdGhlIHRhcmdldFxuICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcE5hbWUgPT4ge1xuICAgIGxldCB1c2VQcm9wTmFtZSA9IHByb3BOYW1lXG5cbiAgICAvLyBDcmVhdGUgYSBwdWJsaWMgaGFuZGxlIGZvciB0aGUgcHJpdmF0ZSBwcm9wZXJ0eSAocmVtb3ZlcyB0aGUgXCJfXCIgYXQgdGhlIHN0YXJ0KVxuICAgIHVzZVByb3BOYW1lID0gcHJvcE5hbWUucmVwbGFjZShSRV9QUklWQVRFLCAnJylcblxuICAgIC8vIENyZWF0ZSBwdWJsaWMgaW50ZXJmYWNlXG4gICAgY3JlYXRlUHVibGljR2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wTmFtZSwgdXNlUHJvcE5hbWUsIGRlZmF1bHRQcm9wVmFsdWVzW3Byb3BOYW1lXSlcbiAgfSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwdWJsaWMgZ2V0dGVyIGludGVyZmFjZSBmb3IgYSBwcm9wZXJ0eSBvbiBhIHRhcmdldFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXRQcm9wTmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IG5ld1Byb3BOYW1lXG4gKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0UHJvcFZhbHVlIFVzZWQgaWYgdGhlIHRhcmdldCdzIHRhcmdldFByb3BOYW1lIGlzIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBjcmVhdGVQdWJsaWNHZXRQcm9wZXJ0eSAodGFyZ2V0LCB0YXJnZXRQcm9wTmFtZSwgbmV3UHJvcE5hbWUsIGRlZmF1bHRQcm9wVmFsdWUpIHtcbiAgaWYgKCF0YXJnZXQuaGFzT3duUHJvcGVydHkobmV3UHJvcE5hbWUpKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmV3UHJvcE5hbWUsIHtcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIHRhcmdldFt0YXJnZXRQcm9wTmFtZV0gIT09ICd1bmRlZmluZWQnID8gdGFyZ2V0W3RhcmdldFByb3BOYW1lXSA6IGRlZmF1bHRQcm9wVmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0OiB1bmRlZmluZWQsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHB1YmxpYyBnZXR0ZXIvc2V0dGVyIGludGVyZmFjZSBmb3IgYSBwcm9wZXJ0eSBvbiBhIHRhcmdldFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXRQcm9wTmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IG5ld1Byb3BOYW1lXG4gKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0UHJvcFZhbHVlIFVzZWQgaWYgdGhlIHRhcmdldCdzIHRhcmdldFByb3BOYW1lIGlzIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBjcmVhdGVQdWJsaWNHZXRTZXRQcm9wZXJ0eSAodGFyZ2V0LCB0YXJnZXRQcm9wTmFtZSwgbmV3UHJvcE5hbWUsIGRlZmF1bHRQcm9wVmFsdWUpIHtcbiAgaWYgKCF0YXJnZXQuaGFzT3duUHJvcGVydHkobmV3UHJvcE5hbWUpKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmV3UHJvcE5hbWUsIHtcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIHRhcmdldFt0YXJnZXRQcm9wTmFtZV0gIT09ICd1bmRlZmluZWQnID8gdGFyZ2V0W3RhcmdldFByb3BOYW1lXSA6IGRlZmF1bHRQcm9wVmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0IChuZXdWYWx1ZSkge1xuICAgICAgICB0YXJnZXRbdGFyZ2V0UHJvcE5hbWVdID0gbmV3VmFsdWVcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCBpbmhlcml0YW5jZSA9IHtcbiAgZXhwb3NlQWxsUHJvcGVydGllcyxcbiAgZXhwb3NlUHJpdmF0ZVByb3BlcnRpZXMsXG4gIGNyZWF0ZVB1YmxpY0dldFByb3BlcnR5LFxuICBjcmVhdGVQdWJsaWNHZXRTZXRQcm9wZXJ0eVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaGVyaXRhbmNlXG4iLCIvKipcbiAqIExWTDk5IFBhcnNlXG4gKlxuICogUGFyc2Ugc3RyaW5ncyBvciB0cmFuc2Zvcm0gZnJvbSBvbmUgZm9ybWF0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IF9fbG9nZ2VyUGF0aCA9ICdsdmw5OS91dGlscy9wYXJzZSdcbmNvbnN0IG9iamVjdFBhdGggPSByZXF1aXJlKCdvYmplY3QtcGF0aCcpXG5cbi8qKlxuICogQ29lcmNlIGEgdmFsdWUgdG8gaXRzIHByaW1pdGl2ZSB0eXBlXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gaW5wdXRcbiAqIEByZXR1cm5zIHtNaXhlZH1cbiAqL1xuZnVuY3Rpb24gY29lcmNlVG9QcmltaXRpdmVUeXBlIChpbnB1dCkge1xuICAvLyBOb24tc3RyaW5nPyBKdXN0IHJldHVybiBpdCBzdHJhaWdodCBhd2F5XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSByZXR1cm4gaW5wdXRcblxuICAvLyBUcmltIGFueSB3aGl0ZXNwYWNlXG4gIGlucHV0ID0gKGlucHV0ICsgJycpLnRyaW0oKVxuXG4gIC8vIE51bWJlclxuICBpZiAoL15cXC0/KD86XFxkKltcXC5cXCxdKSpcXGQqKD86W2VFXSg/OlxcLT9cXGQrKT8pPyQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoaW5wdXQpXG5cbiAgICAvLyBCb29sZWFuOiB0cnVlXG4gIH0gZWxzZSBpZiAoL14odHJ1ZXwxKSQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIHRydWVcblxuICAgIC8vIE5hTlxuICB9IGVsc2UgaWYgKC9eTmFOJC8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gTmFOXG5cbiAgICAvLyB1bmRlZmluZWRcbiAgfSBlbHNlIGlmICgvXnVuZGVmaW5lZCQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuXG4gICAgLy8gbnVsbFxuICB9IGVsc2UgaWYgKC9ebnVsbCQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIG51bGxcblxuICAgIC8vIEJvb2xlYW46IGZhbHNlXG4gIH0gZWxzZSBpZiAoL14oZmFsc2V8MCkkLy50ZXN0KGlucHV0KSB8fCBpbnB1dCA9PT0gJycpIHtcbiAgICByZXR1cm4gZmFsc2VcblxuICAgIC8vIEpTT046IHN0YXJ0cyB3aXRoIFsgb3IgeyBhbmQgZW5kcyB3aXRoIF0gb3IgfVxuICB9IGVsc2UgaWYgKC9eW1xcW1xce10vLnRlc3QoaW5wdXQpICYmIC9bXFxdXFx9XSQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGNvbnZlcnRTdHJpbmdUb0pzb24oaW5wdXQpXG4gIH1cblxuICAvLyBEZWZhdWx0IHRvIHN0cmluZ1xuICByZXR1cm4gaW5wdXRcbn1cblxuLyoqXG4gKiBDb252ZXJ0IHZhbHVlIHRvIGFuIGV4cGxpY2l0IGJvb2xlYW4uIE5hbWVseSBmb3IgcHJvY2Vzc2luZyBzdHJpbmcgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGlucHV0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY29udmVydFRvQm9vbGVhbiAoaW5wdXQpIHtcbiAgLy8gQWxyZWFkeSBib29sZWFuXG4gIGlmIChpbnB1dCA9PT0gdHJ1ZSB8fCBpbnB1dCA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gaW5wdXRcbiAgfVxuXG4gIC8vIENhc2VzIG9mIHRydXRoeS9mYWxzZXkgdmFsdWVzXG4gIHN3aXRjaCAoaW5wdXQpIHtcbiAgICBjYXNlIDE6XG4gICAgY2FzZSAnMSc6XG4gICAgY2FzZSAndHJ1ZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgY2FzZSAwOlxuICAgIGNhc2UgJzAnOlxuICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgIGNhc2UgbnVsbDpcbiAgICBjYXNlICdudWxsJzpcbiAgICBjYXNlIE5hTjpcbiAgICBjYXNlICdOYU4nOlxuICAgIGNhc2UgJyc6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIE90aGVyd2lzZS4uLlxuICByZXR1cm4gISFpbnB1dFxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHJpbmcgdG8gSlNPTiBvciBqdXN0IHJldHVybiB0aGUgc3RyaW5nIGlmIGNhbid0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBjb252ZXJ0U3RyaW5nVG9Kc29uIChpbnB1dCkge1xuICBsZXQgb3V0cHV0ID0gaW5wdXRcblxuICAvLyBDb252ZXJ0IHN0cmluZyBkYXRhIHRvIEpTT05cbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICB0cnkge1xuICAgICAgb3V0cHV0ID0gSlNPTi5wYXJzZShpbnB1dClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGAke19sb2dnZXJQYXRofS5jb252ZXJ0U3RyaW5nVG9Kc29uOiBFcnJvciBwYXJzaW5nIHN0cmluZyBKU09OIGRhdGFgLCBpbnB1dClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbi8qKlxuICogQ29udmVydCBhIHN0cmluZyB0byBhIGZsb2F0LlxuICogVGhpcyBhbHNvIGNvbnZlcnRzIG51bWJlciBjb25zdGFudHMgbGlrZSBJbmZpbml0eSBhbmQgTmFOIHRvIHplcm8uXG4gKlxuICogQHBhcmFtIGlucHV0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gY29udmVydFN0cmluZ1RvRmxvYXQgKGlucHV0KSB7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGlucHV0XG4gIH1cblxuICBsZXQgb3V0cHV0ID0gcGFyc2VGbG9hdCgoaW5wdXQgKyAnJykucmVwbGFjZSgvW15cXGRcXC1cXC5dKy9nLCAnJykpXG5cbiAgLy8gSW5maW5pdHkgLyBOYU5cbiAgaWYgKCFpc0Zpbml0ZShpbnB1dCkgfHwgaXNOYU4oaW5wdXQpIHx8IGlzTmFOKG91dHB1dCkpIHtcbiAgICBvdXRwdXQgPSAwXG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbi8qKlxuICogRXh0cmFjdCBrZXktdmFsdWVzIGZyb20gYSBzdHJpbmcgd2hpY2ggaXMgbGlrZSBhIENTUyBjbGFzcyBkZWNsYXJhdGlvbiwgZS5nLiBga2V5OiB2YWx1ZTsga2V5OiB2YWx1ZWBcbiAqXG4gKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgaW50ZXJlc3RpbmcgYXMgaXQgY2FuIHRha2UgYSBuYW1lIHdpdGggZG90c1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dFxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBleHRyYWN0Q2xhc3NEZXRhaWxzIChpbnB1dCkge1xuICBsZXQgb3V0cHV0ID0ge31cbiAgbGV0IGlucHV0UGFydHMgPSBbaW5wdXRdXG5cbiAgLy8gQ2hlY2sgaWYgaXQgaGFzIHNlbWktY29sb25zXG4gIGlmICgvOy8udGVzdChpbnB1dCkpIHtcbiAgICBpbnB1dFBhcnRzID0gaW5wdXQuc3BsaXQoJzsnKVxuICB9XG5cbiAgLy8gUHJvY2VzcyBlYWNoIGlucHV0IHBhcnRcbiAgaW5wdXRQYXJ0cy5mb3JFYWNoKChwYXJ0KSA9PiB7XG4gICAgcGFydCA9IHBhcnQudHJpbSgpXG4gICAgaWYgKHBhcnQpIHtcbiAgICAgIGxldCBwYXJ0UGFydHMgPSBwYXJ0Lm1hdGNoKC8oW2EtejAtOV8uLV0rKTooW147XSspOz8vaSlcbiAgICAgIGxldCBwYXJ0TmFtZSA9IHBhcnRQYXJ0c1sxXS50cmltKClcbiAgICAgIGxldCBwYXJ0VmFsdWUgPSBjb2VyY2VUb1ByaW1pdGl2ZVR5cGUocGFydFBhcnRzWzJdLnRyaW0oKSlcblxuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZygncGFyc2VkIHBhcnQnLCB7XG4gICAgICAvLyAgIHBhcnQsXG4gICAgICAvLyAgIHBhcnROYW1lLFxuICAgICAgLy8gICBwYXJ0VmFsdWUsXG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBFbnN1cmUgb3V0cHV0IG9iamVjdCBleGlzdHMgaWYgdXNpbmcgZG90IG5vdGF0aW9uXG4gICAgICBpZiAoL1xcLi8udGVzdChwYXJ0TmFtZSkpIHtcbiAgICAgICAgbGV0IG9ialBhcnRzID0gcGFydE5hbWUuc3BsaXQoJy4nKVxuICAgICAgICBsZXQgb2JqUGFydFBhdGggPSAnJ1xuXG4gICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncGFydCBoYXMgZG90IG5vdGF0aW9uJywge1xuICAgICAgICAvLyAgIG91dHB1dCxcbiAgICAgICAgLy8gICBwYXJ0TmFtZSxcbiAgICAgICAgLy8gICBwYXJ0VmFsdWUsXG4gICAgICAgIC8vICAgb2JqUGFydHMsXG4gICAgICAgIC8vICAgb2JqUGFydFBhdGhcbiAgICAgICAgLy8gfSlcblxuICAgICAgICBmb3IgKGxldCBvYmpQYXJ0SW5kZXggPSAwOyBvYmpQYXJ0SW5kZXggPCAob2JqUGFydHMubGVuZ3RoIC0gMSk7IG9ialBhcnRJbmRleCsrKSB7XG4gICAgICAgICAgb2JqUGFydFBhdGggKz0gKG9ialBhcnRJbmRleCA+IDAgPyAnLicgOiAnJykgKyBvYmpQYXJ0c1tvYmpQYXJ0SW5kZXhdXG5cbiAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmpQYXJ0UGF0aClcblxuICAgICAgICAgIGlmICghb2JqZWN0UGF0aC5oYXMob3V0cHV0LCBvYmpQYXJ0UGF0aCkpIHtcbiAgICAgICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NldHRpbmcgb2JqZWN0IHBhcnQgcGF0aCcsIHtcbiAgICAgICAgICAgIC8vICAgb3V0cHV0LFxuICAgICAgICAgICAgLy8gICBwYXJ0TmFtZSxcbiAgICAgICAgICAgIC8vICAgcGFydFZhbHVlLFxuICAgICAgICAgICAgLy8gICBvYmpQYXJ0SW5kZXgsXG4gICAgICAgICAgICAvLyAgIG9ialBhcnRQYXRoXG4gICAgICAgICAgICAvLyB9KVxuXG4gICAgICAgICAgICBvYmplY3RQYXRoLnNldChvdXRwdXQsIG9ialBhcnRQYXRoLCB7fSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHZpYSBvYmplY3RQYXRoXG4gICAgICBvYmplY3RQYXRoLnNldChvdXRwdXQsIHBhcnROYW1lLCBwYXJ0VmFsdWUpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHRoZSB0cmlnZ2VyJ3MgdGFyZ2V0IGRldGFpbHNcbiAqXG4gKiBUaGlzIGFsbG93cyB5b3UgdG8gZXh0cmFjdCB0aGUgbmVjZXNzYXJ5IGRhdGEgZnJvbSB0aGUgc3RyaW5nIGFuZCB0aGUgZ2xvYmFsIHdpbmRvdy9kb2N1bWVudCBhdmFpbGFibGUsIHRvIGNyZWF0ZVxuICogZHluYW1pYyBldmVudCBiaW5kaW5ncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGlucHV0XG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gY29udGV4dCBEZWZhdWx0cyB0byBgd2luZG93YC4gV2hlcmUgdG8gZmluZCB0aGUgYGRvYCBhY3Rpb25cbiAqIEByZXR1cm5zIHtPYmplY3R9ID0+IHsgZXZlbnROYW1lOiB7U3RyaW5nfSwgbWV0aG9kOiB7RnVuY3Rpb259LCBzZWxlY3Rvcjoge1N0cmluZ30sIHRhcmdldDoge09iamVjdH0gfVxuICovXG5mdW5jdGlvbiBleHRyYWN0VHJpZ2dlckRldGFpbHMoaW5wdXQsIGNvbnRleHQpIHtcbiAgbGV0IHRyaWdnZXIgPSBpbnB1dFxuXG4gIGlmICghY29udGV4dCkge1xuICAgIGNvbnRleHQgPSB3aW5kb3dcbiAgfVxuXG4gIC8vIFN0cmluZyBpbnB1dCBnaXZlblxuICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgIC8vIFRyeSBKU09OIGZpcnN0XG4gICAgaWYgKC9eey8udGVzdChpbnB1dCkpIHtcbiAgICAgIHRyaWdnZXIgPSBjb252ZXJ0U3RyaW5nVG9Kc29uKGlucHV0KVxuXG4gICAgICAvLyBUcnkgY2xhc3MgZGV0YWlsc1xuICAgIH0gZWxzZSBpZiAoL15bYS16MC05Xy1dKzovLnRlc3QoaW5wdXQpKSB7XG4gICAgICB0cmlnZ2VyID0gZXh0cmFjdENsYXNzRGV0YWlscyhpbnB1dClcblxuICAgICAgLy8gU3RyaW5nIHdpdGggbm8gc3BhY2VzXG4gICAgfSBlbHNlIGlmICghLyAvLnRlc3QoaW5wdXQpKSB7XG4gICAgICB0cmlnZ2VyID0ge1xuICAgICAgICBkbzogaW5wdXRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBObyBvYmplY3QgZm91bmQhXG4gIGlmICh0eXBlb2YgdHJpZ2dlciAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7X2xvZ2dlclBhdGh9LmV4dHJhY3RUcmlnZ2VyRGV0YWlsczogaW5wdXQgd2FzIG5vdCB2YWxpZCBKU09OIG9yIENTUy1zdHlsZSBkZWZpbml0aW9uYClcbiAgfVxuXG4gIC8vIEVuc3VyZSBpdCBoYXMgYG9uYCBhbmQgYGRvYCBwcm9wZXJ0aWVzXG4gIC8vIGlmICghb2JqZWN0UGF0aC5oYXModHJpZ2dlciwgJ29uJykpIHtcbiAgLy8gICB0aHJvdyBuZXcgRXJyb3IoYCR7X2xvZ2dlclBhdGh9LmV4dHJhY3RUcmlnZ2VyRGV0YWlsczogdHJpZ2dlciBpcyBtaXNzaW5nIHJlcXVpcmVkICdvbicgcHJvcGVydHlgKVxuICAvLyB9XG4gIGlmICghb2JqZWN0UGF0aC5oYXModHJpZ2dlciwgJ2RvJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7X2xvZ2dlclBhdGh9LmV4dHJhY3RUcmlnZ2VyRGV0YWlsczogdHJpZ2dlciBpcyBtaXNzaW5nIHJlcXVpcmVkICdkbycgcHJvcGVydHlgKVxuICB9XG5cbiAgLy8gSWYgdGFyZ2V0IGlzIHNldCwgdXNlIHJlYWwgdmFsdWVzIGZvciB3aW5kb3cgYW5kIGRvY3VtZW50XG4gIGlmIChvYmplY3RQYXRoLmhhcyh0cmlnZ2VyLCAndGFyZ2V0JykpIHtcbiAgICBzd2l0Y2ggKHRyaWdnZXIudGFyZ2V0KSB7XG4gICAgICBjYXNlICdzZWxmJzpcbiAgICAgICAgY29uc29sZS5sb2coJ1RhcmdldGluZyBzZWxmJywgY29udGV4dClcbiAgICAgICAgdHJpZ2dlci50YXJnZXQgPSBjb250ZXh0XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgdHJpZ2dlci50YXJnZXQgPSBkb2N1bWVudFxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICd3aW5kb3cnOlxuICAgICAgICB0cmlnZ2VyLnRhcmdldCA9IHdpbmRvd1xuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIC8vIERvIHNhbWUgYXMgYWJvdmUgaWYgYSBjb250ZXh0IHdhcyBzZXQhXG4gIGlmIChvYmplY3RQYXRoLmhhcyh0cmlnZ2VyLCAnY29udGV4dCcpKSB7XG4gICAgc3dpdGNoICh0cmlnZ2VyLmNvbnRleHQpIHtcbiAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgdHJpZ2dlci5jb250ZXh0ID0gZG9jdW1lbnRcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAnd2luZG93JzpcbiAgICAgICAgdHJpZ2dlci5jb250ZXh0ID0gd2luZG93XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRyaWdnZXIuY29udGV4dCA9IGNvbnRleHRcbiAgfVxuXG4gIHJldHVybiB0cmlnZ2VyXG59XG5cbi8qKlxuICogRW5jb2RlIHN0cmluZyB0byBVUkwsIHdpdGggc3BhY2VzIHRoYXQgYXJlIHJlcHJlc2VudGVkIGFzIGArYFxuICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9lbmNvZGVVUklDb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZpeGVkRW5jb2RlVVJJQ29tcG9uZW50IChpbnB1dCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KS5yZXBsYWNlKC9bIScoKSpdL2csIGZ1bmN0aW9uKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KTtcbiAgfSlcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRhcmdldCBvYmplY3QgYnkgYSBzdHJpbmcgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBnZXRUYXJnZXRCeVNlbGVjdG9yICh0YXJnZXQsIGNvbnRleHQpIHtcbiAgLy8gRGVmYXVsdCB0byBkb2N1bWVudFxuICBpZiAoIXRhcmdldCkge1xuICAgIHRhcmdldCA9IGRvY3VtZW50XG4gIH1cblxuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBTcGVjaWFsIHN0cmluZyB2YWx1ZXMgdG8gZ2V0IHRoZSBhY3R1YWwgb2JqZWN0XG4gICAgc3dpdGNoICh0YXJnZXQpIHtcbiAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnRcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAnd2luZG93JzpcbiAgICAgICAgdGFyZ2V0ID0gd2luZG93XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ3NlbGYnOlxuICAgICAgICB0YXJnZXQgPSBjb250ZXh0XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIEdldCB0aGUgdGFyZ2V0IG9iamVjdCdzIHN0cmluZyBzZWxlY3RvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJuIHt1bmRlZmluZWR8U3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRUYXJnZXRTZWxlY3RvciAodGFyZ2V0LCBjb250ZXh0KSB7XG4gIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0YXJnZXRcbiAgfVxuXG4gIC8vIFdpbmRvd1xuICBpZiAoJC5pc1dpbmRvdyh0YXJnZXQpKSB7XG4gICAgcmV0dXJuICd3aW5kb3cnXG5cbiAgICAvLyBEb2N1bWVudFxuICB9IGVsc2UgaWYgKHRhcmdldCA9PT0gZG9jdW1lbnQpIHtcbiAgICByZXR1cm4gJ2RvY3VtZW50J1xuXG4gICAgLy8gU2VsZlxuICB9IGVsc2UgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eSgndXVpZCcpKSB7XG4gICAgcmV0dXJuIGBbZGF0YS1jb21wb25lbnQtaWQ9XCIke3RhcmdldC51dWlkfVwiXWBcblxuICAgIC8vIEhUTUwgRWxlbVxuICB9IGVsc2UgaWYgKCQodGFyZ2V0KS5sZW5ndGgpIHtcbiAgICBpZiAoJCh0YXJnZXQpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWlkJykpIHtcbiAgICAgIHJldHVybiBgW2RhdGEtY29tcG9uZW50LWlkPVwiJHskKHRhcmdldCkuYXR0cignZGF0YS1jb21wb25lbnQtaWQnKX1cIl1gXG4gICAgfSBlbHNlIGlmICgkKHRhcmdldCkuYXR0cignaWQnKSkge1xuICAgICAgcmV0dXJuIGAjJHskKHRhcmdldCkuYXR0cignaWQnKX1gXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHt0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpfWBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogUGFyc2UgdGhlIHRhcmdldCBldmVudCBuYW1lc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudE5hbWVzIGUuZy4gYENvbXBvbmVudDpjdXN0b21FdmVudCBkb206bW91c2VvdmVyYFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSBPcHRpb25hbCBuYW1lc3BhY2UgdG8gYXNzaWduIGVhY2ggZXh0cmFjdGVkIGN1c3RvbSAobm9uLURPTSkgZXZlbnQgbmFtZVxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiBleHRyYWN0VGFyZ2V0RXZlbnROYW1lcyAoaW5wdXRFdmVudE5hbWVzLCBuYW1lc3BhY2UpIHtcbiAgbGV0IHRhcmdldEV2ZW50TmFtZXMgPSBbXVxuICBsZXQgZXZlbnROYW1lcyA9IGlucHV0RXZlbnROYW1lc1xuXG4gIGlmICh0eXBlb2YgaW5wdXRFdmVudE5hbWVzID09PSAnc3RyaW5nJykge1xuICAgIC8vIFNwbGl0IGV2ZW50TmFtZXMgYnkgc3BhY2VzXG4gICAgaWYgKC9cXHMvLnRlc3QoaW5wdXRFdmVudE5hbWVzKSkge1xuICAgICAgZXZlbnROYW1lcyA9IGlucHV0RXZlbnROYW1lcy5zcGxpdCgvXFxzKy8pXG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50TmFtZXMgPSBbIGlucHV0RXZlbnROYW1lcyBdXG4gICAgfVxuICB9XG5cbiAgaWYgKGV2ZW50TmFtZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIC8vIFByb2Nlc3MgZWFjaCBldmVudCBuYW1lXG4gICAgZXZlbnROYW1lcy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAvLyBEZWZhdWx0IHRvIG5hbWVzcGFjZWQgZXZlbnQgbmFtZVxuICAgICAgbGV0IHRhcmdldEV2ZW50TmFtZSA9ICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJyAmJiBuYW1lc3BhY2UgIT09ICcnID8gYCR7bmFtZXNwYWNlfToke2V2ZW50TmFtZX1gIDogZXZlbnROYW1lKVxuXG4gICAgICAvLyBSZW1vdmUgYW55IHJlZmVyZW5jZSB0byB0aGUgbmF0aXZlIERPTSBldmVudCBuYW1lc3BhY2VcbiAgICAgIGlmICgvXmRvbTovaS50ZXN0KGV2ZW50TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0RXZlbnROYW1lID0gZXZlbnROYW1lLnJlcGxhY2UoL15kb21cXDovZ2ksICcnLCBldmVudE5hbWUpXG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB0byB0aGUgbGlzdFxuICAgICAgdGFyZ2V0RXZlbnROYW1lcy5wdXNoKHRhcmdldEV2ZW50TmFtZSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRhcmdldEV2ZW50TmFtZXNcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5jb25zdCBwYXJzZSA9IHtcbiAgY29lcmNlVG9QcmltaXRpdmVUeXBlLFxuICBjb252ZXJ0VG9Cb29sZWFuLFxuICBjb252ZXJ0U3RyaW5nVG9Kc29uLFxuICBjb252ZXJ0U3RyaW5nVG9GbG9hdCxcbiAgZXh0cmFjdENsYXNzRGV0YWlscyxcbiAgZXh0cmFjdFRyaWdnZXJEZXRhaWxzLFxuICBmaXhlZEVuY29kZVVSSUNvbXBvbmVudCxcbiAgZ2V0VGFyZ2V0QnlTZWxlY3RvcixcbiAgZ2V0VGFyZ2V0U2VsZWN0b3IsXG4gIGV4dHJhY3RUYXJnZXRFdmVudE5hbWVzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VcbiIsIi8qKlxuICogTFZMOTlcbiAqL1xuXG5jb25zdCBsdmw5OSA9IHJlcXVpcmUoJy4vZXM2JylcblxubW9kdWxlLmV4cG9ydHMgPSBsdmw5OVxuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBmbGFncyBmcm9tIHRoZWlyIGNvZXJjZWQgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUZsYWdzID0gL1xcdyokLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBzdXBwb3J0ZWQgYnkgYF8uY2xvbmVgLiAqL1xudmFyIGNsb25lYWJsZVRhZ3MgPSB7fTtcbmNsb25lYWJsZVRhZ3NbYXJnc1RhZ10gPSBjbG9uZWFibGVUYWdzW2FycmF5VGFnXSA9XG5jbG9uZWFibGVUYWdzW2FycmF5QnVmZmVyVGFnXSA9IGNsb25lYWJsZVRhZ3NbZGF0YVZpZXdUYWddID1cbmNsb25lYWJsZVRhZ3NbYm9vbFRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGVUYWddID1cbmNsb25lYWJsZVRhZ3NbZmxvYXQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW2Zsb2F0NjRUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW2ludDE2VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDMyVGFnXSA9IGNsb25lYWJsZVRhZ3NbbWFwVGFnXSA9XG5jbG9uZWFibGVUYWdzW251bWJlclRhZ10gPSBjbG9uZWFibGVUYWdzW29iamVjdFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tyZWdleHBUYWddID0gY2xvbmVhYmxlVGFnc1tzZXRUYWddID1cbmNsb25lYWJsZVRhZ3Nbc3RyaW5nVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc3ltYm9sVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQxNlRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xuY2xvbmVhYmxlVGFnc1tlcnJvclRhZ10gPSBjbG9uZWFibGVUYWdzW2Z1bmNUYWddID1cbmNsb25lYWJsZVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQWRkcyB0aGUga2V5LXZhbHVlIGBwYWlyYCB0byBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXIgVGhlIGtleS12YWx1ZSBwYWlyIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG1hcGAuXG4gKi9cbmZ1bmN0aW9uIGFkZE1hcEVudHJ5KG1hcCwgcGFpcikge1xuICAvLyBEb24ndCByZXR1cm4gYG1hcC5zZXRgIGJlY2F1c2UgaXQncyBub3QgY2hhaW5hYmxlIGluIElFIDExLlxuICBtYXAuc2V0KHBhaXJbMF0sIHBhaXJbMV0pO1xuICByZXR1cm4gbWFwO1xufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYHNldGAuXG4gKi9cbmZ1bmN0aW9uIGFkZFNldEVudHJ5KHNldCwgdmFsdWUpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBzZXQuYWRkYCBiZWNhdXNlIGl0J3Mgbm90IGNoYWluYWJsZSBpbiBJRSAxMS5cbiAgc2V0LmFkZCh2YWx1ZSk7XG4gIHJldHVybiBzZXQ7XG59XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheSxcbiAgICBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KSxcbiAgICBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgICBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KSxcbiAgICBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpLFxuICAgIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX19bJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgY2FjaGUgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoY2FjaGUgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBjYWNoZS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2FjaGUgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBjYWNoZS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh0eXBlb2Yga2V5ID09ICdudW1iZXInICYmIHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlc1xuICogb3IgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBjb3B5T2JqZWN0KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNsb25lYCBhbmQgYF8uY2xvbmVEZWVwYCB3aGljaCB0cmFja3NcbiAqIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0Z1bGxdIFNwZWNpZnkgYSBjbG9uZSBpbmNsdWRpbmcgc3ltYm9scy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleV0gVGhlIGtleSBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBwYXJlbnQgb2JqZWN0IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIG9iamVjdHMgYW5kIHRoZWlyIGNsb25lIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDbG9uZSh2YWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgb2JqZWN0LCBzdGFjaykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoY3VzdG9taXplcikge1xuICAgIHJlc3VsdCA9IG9iamVjdCA/IGN1c3RvbWl6ZXIodmFsdWUsIGtleSwgb2JqZWN0LCBzdGFjaykgOiBjdXN0b21pemVyKHZhbHVlKTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBjb3B5QXJyYXkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgICBpc0Z1bmMgPSB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNsb25lQnVmZmVyKHZhbHVlLCBpc0RlZXApO1xuICAgIH1cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICBpZiAoaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZU9iamVjdChpc0Z1bmMgPyB7fSA6IHZhbHVlKTtcbiAgICAgIGlmICghaXNEZWVwKSB7XG4gICAgICAgIHJldHVybiBjb3B5U3ltYm9scyh2YWx1ZSwgYmFzZUFzc2lnbihyZXN1bHQsIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2xvbmVhYmxlVGFnc1t0YWddKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lQnlUYWcodmFsdWUsIHRhZywgYmFzZUNsb25lLCBpc0RlZXApO1xuICAgIH1cbiAgfVxuICAvLyBDaGVjayBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcyBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIGNsb25lLlxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldCh2YWx1ZSk7XG4gIGlmIChzdGFja2VkKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQ7XG4gIH1cbiAgc3RhY2suc2V0KHZhbHVlLCByZXN1bHQpO1xuXG4gIGlmICghaXNBcnIpIHtcbiAgICB2YXIgcHJvcHMgPSBpc0Z1bGwgPyBnZXRBbGxLZXlzKHZhbHVlKSA6IGtleXModmFsdWUpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCB2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3ViVmFsdWU7XG4gICAgICBzdWJWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IHBvcHVsYXRlIGNsb25lIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgYXNzaWduVmFsdWUocmVzdWx0LCBrZXksIGJhc2VDbG9uZShzdWJWYWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNyZWF0ZShwcm90bykge1xuICByZXR1cm4gaXNPYmplY3QocHJvdG8pID8gb2JqZWN0Q3JlYXRlKHByb3RvKSA6IHt9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXNJbihvYmplY3QpO1xuICB9XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKG9iamVjdCA9PT0gc291cmNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSkpIHtcbiAgICB2YXIgcHJvcHMgPSBiYXNlS2V5c0luKHNvdXJjZSk7XG4gIH1cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3JjVmFsdWU7XG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFjaykge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV0sXG4gICAgICBzdGFja2VkID0gc3RhY2suZ2V0KHNyY1ZhbHVlKTtcblxuICBpZiAoc3RhY2tlZCkge1xuICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHN0YWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHZhciBpc0NvbW1vbiA9IG5ld1ZhbHVlID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IChzcmNJbmRleCAmJiBpc0Z1bmN0aW9uKG9ialZhbHVlKSkpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBiYXNlQ2xvbmUoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgc3RhY2suc2V0KHNyY1ZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgbWVyZ2VGdW5jKG5ld1ZhbHVlLCBzcmNWYWx1ZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICB9XG4gIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IG5ldyBidWZmZXIuY29uc3RydWN0b3IoYnVmZmVyLmxlbmd0aCk7XG4gIGJ1ZmZlci5jb3B5KHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGRhdGFWaWV3YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFWaWV3IFRoZSBkYXRhIHZpZXcgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIGRhdGEgdmlldy5cbiAqL1xuZnVuY3Rpb24gY2xvbmVEYXRhVmlldyhkYXRhVmlldywgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKGRhdGFWaWV3LmJ1ZmZlcikgOiBkYXRhVmlldy5idWZmZXI7XG4gIHJldHVybiBuZXcgZGF0YVZpZXcuY29uc3RydWN0b3IoYnVmZmVyLCBkYXRhVmlldy5ieXRlT2Zmc2V0LCBkYXRhVmlldy5ieXRlTGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBtYXAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lTWFwKG1hcCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKG1hcFRvQXJyYXkobWFwKSwgdHJ1ZSkgOiBtYXBUb0FycmF5KG1hcCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkTWFwRW50cnksIG5ldyBtYXAuY29uc3RydWN0b3IpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgcmVnZXhwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHJlZ2V4cCBUaGUgcmVnZXhwIHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHJlZ2V4cC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVSZWdFeHAocmVnZXhwKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgcmVnZXhwLmNvbnN0cnVjdG9yKHJlZ2V4cC5zb3VyY2UsIHJlRmxhZ3MuZXhlYyhyZWdleHApKTtcbiAgcmVzdWx0Lmxhc3RJbmRleCA9IHJlZ2V4cC5sYXN0SW5kZXg7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBzZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc2V0LlxuICovXG5mdW5jdGlvbiBjbG9uZVNldChzZXQsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhzZXRUb0FycmF5KHNldCksIHRydWUpIDogc2V0VG9BcnJheShzZXQpO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZFNldEVudHJ5LCBuZXcgc2V0LmNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIGBzeW1ib2xgIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHN5bWJvbCBUaGUgc3ltYm9sIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzeW1ib2wgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjbG9uZVN5bWJvbChzeW1ib2wpIHtcbiAgcmV0dXJuIHN5bWJvbFZhbHVlT2YgPyBPYmplY3Qoc3ltYm9sVmFsdWVPZi5jYWxsKHN5bWJvbCkpIDoge307XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGB0eXBlZEFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVkQXJyYXkgVGhlIHR5cGVkIGFycmF5IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB0eXBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHR5cGVkQXJyYXksIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcih0eXBlZEFycmF5LmJ1ZmZlcikgOiB0eXBlZEFycmF5LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyB0eXBlZEFycmF5LmNvbnN0cnVjdG9yKGJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5Lmxlbmd0aCk7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVtrZXldIDogbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ29waWVzIG93biBzeW1ib2wgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weVN5bWJvbHMoc291cmNlLCBvYmplY3QpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3Qoc291cmNlLCBnZXRTeW1ib2xzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5cywgZ2V0U3ltYm9scyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2wgcHJvcGVydGllcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9IG5hdGl2ZUdldFN5bWJvbHMgPyBvdmVyQXJnKG5hdGl2ZUdldFN5bWJvbHMsIE9iamVjdCkgOiBzdHViQXJyYXk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSxcbi8vIGZvciBkYXRhIHZpZXdzIGluIEVkZ2UgPCAxNCwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBhcnJheSBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQXJyYXkoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFycmF5LmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgLy8gQWRkIHByb3BlcnRpZXMgYXNzaWduZWQgYnkgYFJlZ0V4cCNleGVjYC5cbiAgaWYgKGxlbmd0aCAmJiB0eXBlb2YgYXJyYXlbMF0gPT0gJ3N0cmluZycgJiYgaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgJ2luZGV4JykpIHtcbiAgICByZXN1bHQuaW5kZXggPSBhcnJheS5pbmRleDtcbiAgICByZXN1bHQuaW5wdXQgPSBhcnJheS5pbnB1dDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lIGJhc2VkIG9uIGl0cyBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY2xvbmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUJ5VGFnKG9iamVjdCwgdGFnLCBjbG9uZUZ1bmMsIGlzRGVlcCkge1xuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lQXJyYXlCdWZmZXIob2JqZWN0KTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3IoK29iamVjdCk7XG5cbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgcmV0dXJuIGNsb25lRGF0YVZpZXcob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBmbG9hdDMyVGFnOiBjYXNlIGZsb2F0NjRUYWc6XG4gICAgY2FzZSBpbnQ4VGFnOiBjYXNlIGludDE2VGFnOiBjYXNlIGludDMyVGFnOlxuICAgIGNhc2UgdWludDhUYWc6IGNhc2UgdWludDhDbGFtcGVkVGFnOiBjYXNlIHVpbnQxNlRhZzogY2FzZSB1aW50MzJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVUeXBlZEFycmF5KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lTWFwKG9iamVjdCwgaXNEZWVwLCBjbG9uZUZ1bmMpO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3Iob2JqZWN0KTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lUmVnRXhwKG9iamVjdCk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVNldChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgcmV0dXJuIGNsb25lU3ltYm9sKG9iamVjdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8XG4gICAgICBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbmAgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgbWVyZ2VzIG93biBhbmRcbiAqIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIGludG8gdGhlXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuIFNvdXJjZSBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBhcmVcbiAqIHNraXBwZWQgaWYgYSBkZXN0aW5hdGlvbiB2YWx1ZSBleGlzdHMuIEFycmF5IGFuZCBwbGFpbiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1lcmdlZCByZWN1cnNpdmVseS4gT3RoZXIgb2JqZWN0cyBhbmQgdmFsdWUgdHlwZXMgYXJlIG92ZXJyaWRkZW4gYnlcbiAqIGFzc2lnbm1lbnQuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC4gU3Vic2VxdWVudFxuICogc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdhJzogW3sgJ2InOiAyIH0sIHsgJ2QnOiA0IH1dXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2EnOiBbeyAnYyc6IDMgfSwgeyAnZSc6IDUgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHsgJ2EnOiBbeyAnYic6IDIsICdjJzogMyB9LCB7ICdkJzogNCwgJ2UnOiA1IH1dIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpO1xufSk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcbiIsIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSl7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKmlzdGFuYnVsIGlnbm9yZSBuZXh0OmNhbnQgdGVzdCovXG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgcm9vdC5vYmplY3RQYXRoID0gZmFjdG9yeSgpO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gICAgaWYob2JqID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvL3RvIGhhbmRsZSBvYmplY3RzIHdpdGggbnVsbCBwcm90b3R5cGVzICh0b28gZWRnZSBjYXNlPylcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcClcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpe1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICBmb3IgKHZhciBpIGluIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIGkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB0b1N0cmluZyh0eXBlKXtcbiAgICByZXR1cm4gdG9TdHIuY2FsbCh0eXBlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nKG9iaikgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG4gIH1cblxuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKXtcbiAgICAvKmlzdGFuYnVsIGlnbm9yZSBuZXh0OmNhbnQgdGVzdCovXG4gICAgcmV0dXJuIHRvU3RyLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQm9vbGVhbihvYmope1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdG9TdHJpbmcob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0S2V5KGtleSl7XG4gICAgdmFyIGludEtleSA9IHBhcnNlSW50KGtleSk7XG4gICAgaWYgKGludEtleS50b1N0cmluZygpID09PSBrZXkpIHtcbiAgICAgIHJldHVybiBpbnRLZXk7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cblxuICBmdW5jdGlvbiBmYWN0b3J5KG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gICAgdmFyIG9iamVjdFBhdGggPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3RQYXRoKS5yZWR1Y2UoZnVuY3Rpb24ocHJveHksIHByb3ApIHtcbiAgICAgICAgaWYocHJvcCA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgICAgIH1cblxuICAgICAgICAvKmlzdGFuYnVsIGlnbm9yZSBlbHNlKi9cbiAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RQYXRoW3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcHJveHlbcHJvcF0gPSBvYmplY3RQYXRoW3Byb3BdLmJpbmQob2JqZWN0UGF0aCwgb2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgIH0sIHt9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGFzU2hhbGxvd1Byb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgICAgcmV0dXJuIChvcHRpb25zLmluY2x1ZGVJbmhlcml0ZWRQcm9wcyB8fCAodHlwZW9mIHByb3AgPT09ICdudW1iZXInICYmIEFycmF5LmlzQXJyYXkob2JqKSkgfHwgaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTaGFsbG93UHJvcGVydHkob2JqLCBwcm9wKSB7XG4gICAgICBpZiAoaGFzU2hhbGxvd1Byb3BlcnR5KG9iaiwgcHJvcCkpIHtcbiAgICAgICAgcmV0dXJuIG9ialtwcm9wXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXQob2JqLCBwYXRoLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKXtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH1cbiAgICAgIGlmICghcGF0aCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gc2V0KG9iaiwgcGF0aC5zcGxpdCgnLicpLm1hcChnZXRLZXkpLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKTtcbiAgICAgIH1cbiAgICAgIHZhciBjdXJyZW50UGF0aCA9IHBhdGhbMF07XG4gICAgICB2YXIgY3VycmVudFZhbHVlID0gZ2V0U2hhbGxvd1Byb3BlcnR5KG9iaiwgY3VycmVudFBhdGgpO1xuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09IHZvaWQgMCB8fCAhZG9Ob3RSZXBsYWNlKSB7XG4gICAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAvL2NoZWNrIGlmIHdlIGFzc3VtZSBhbiBhcnJheVxuICAgICAgICBpZih0eXBlb2YgcGF0aFsxXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBvYmpbY3VycmVudFBhdGhdID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IHt9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgfVxuXG4gICAgb2JqZWN0UGF0aC5oYXMgPSBmdW5jdGlvbiAob2JqLCBwYXRoKSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICBwYXRoID0gcGF0aC5zcGxpdCgnLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhdGggfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICEhb2JqO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGogPSBnZXRLZXkocGF0aFtpXSk7XG5cbiAgICAgICAgaWYoKHR5cGVvZiBqID09PSAnbnVtYmVyJyAmJiBpc0FycmF5KG9iaikgJiYgaiA8IG9iai5sZW5ndGgpIHx8XG4gICAgICAgICAgKG9wdGlvbnMuaW5jbHVkZUluaGVyaXRlZFByb3BzID8gKGogaW4gT2JqZWN0KG9iaikpIDogaGFzT3duUHJvcGVydHkob2JqLCBqKSkpIHtcbiAgICAgICAgICBvYmogPSBvYmpbal07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmVuc3VyZUV4aXN0cyA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlKXtcbiAgICAgIHJldHVybiBzZXQob2JqLCBwYXRoLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguc2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSl7XG4gICAgICByZXR1cm4gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguaW5zZXJ0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUsIGF0KXtcbiAgICAgIHZhciBhcnIgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGgpO1xuICAgICAgYXQgPSB+fmF0O1xuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgICAgYXJyID0gW107XG4gICAgICAgIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgYXJyKTtcbiAgICAgIH1cbiAgICAgIGFyci5zcGxpY2UoYXQsIDAsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5lbXB0eSA9IGZ1bmN0aW9uKG9iaiwgcGF0aCkge1xuICAgICAgaWYgKGlzRW1wdHkocGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWUsIGk7XG4gICAgICBpZiAoISh2YWx1ZSA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCkpKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsICcnKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgMCk7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlLmxlbmd0aCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBmb3IgKGkgaW4gdmFsdWUpIHtcbiAgICAgICAgICBpZiAoaGFzU2hhbGxvd1Byb3BlcnR5KHZhbHVlLCBpKSkge1xuICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgbnVsbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGgucHVzaCA9IGZ1bmN0aW9uIChvYmosIHBhdGggLyosIHZhbHVlcyAqLyl7XG4gICAgICB2YXIgYXJyID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKTtcbiAgICAgIGlmICghaXNBcnJheShhcnIpKSB7XG4gICAgICAgIGFyciA9IFtdO1xuICAgICAgICBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGFycik7XG4gICAgICB9XG5cbiAgICAgIGFyci5wdXNoLmFwcGx5KGFyciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguY29hbGVzY2UgPSBmdW5jdGlvbiAob2JqLCBwYXRocywgZGVmYXVsdFZhbHVlKSB7XG4gICAgICB2YXIgdmFsdWU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXRocy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoKHZhbHVlID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoc1tpXSkpICE9PSB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5nZXQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCBkZWZhdWx0VmFsdWUpe1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfVxuICAgICAgaWYgKCFwYXRoIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG4gICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aC5zcGxpdCgnLicpLCBkZWZhdWx0VmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudFBhdGggPSBnZXRLZXkocGF0aFswXSk7XG4gICAgICB2YXIgbmV4dE9iaiA9IGdldFNoYWxsb3dQcm9wZXJ0eShvYmosIGN1cnJlbnRQYXRoKVxuICAgICAgaWYgKG5leHRPYmogPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5leHRPYmo7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmplY3RQYXRoLmdldChvYmpbY3VycmVudFBhdGhdLCBwYXRoLnNsaWNlKDEpLCBkZWZhdWx0VmFsdWUpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmRlbCA9IGZ1bmN0aW9uIGRlbChvYmosIHBhdGgpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0VtcHR5KHBhdGgpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG4gICAgICBpZih0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguZGVsKG9iaiwgcGF0aC5zcGxpdCgnLicpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJlbnRQYXRoID0gZ2V0S2V5KHBhdGhbMF0pO1xuICAgICAgaWYgKCFoYXNTaGFsbG93UHJvcGVydHkob2JqLCBjdXJyZW50UGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cblxuICAgICAgaWYocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgIG9iai5zcGxpY2UoY3VycmVudFBhdGgsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBvYmpbY3VycmVudFBhdGhdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5kZWwob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGg7XG4gIH1cblxuICB2YXIgbW9kID0gZmFjdG9yeSgpO1xuICBtb2QuY3JlYXRlID0gZmFjdG9yeTtcbiAgbW9kLndpdGhJbmhlcml0ZWRQcm9wcyA9IGZhY3Rvcnkoe2luY2x1ZGVJbmhlcml0ZWRQcm9wczogdHJ1ZX0pXG4gIHJldHVybiBtb2Q7XG59KTtcbiIsInZhciB2MSA9IHJlcXVpcmUoJy4vdjEnKTtcbnZhciB2NCA9IHJlcXVpcmUoJy4vdjQnKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIHJldHVybiBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxudmFyIHJuZztcblxudmFyIGNyeXB0byA9IGdsb2JhbC5jcnlwdG8gfHwgZ2xvYmFsLm1zQ3J5cHRvOyAvLyBmb3IgSUUgMTFcbmlmIChjcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gIHJuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59XG5cbmlmICghcm5nKSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBybmc7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbi8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG52YXIgX3NlZWRCeXRlcyA9IHJuZygpO1xuXG4vLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbnZhciBfbm9kZUlkID0gW1xuICBfc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgX3NlZWRCeXRlc1sxXSwgX3NlZWRCeXRlc1syXSwgX3NlZWRCeXRlc1szXSwgX3NlZWRCeXRlc1s0XSwgX3NlZWRCeXRlc1s1XVxuXTtcblxuLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbnZhciBfY2xvY2tzZXEgPSAoX3NlZWRCeXRlc1s2XSA8PCA4IHwgX3NlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwLCBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7XG4iXX0=
