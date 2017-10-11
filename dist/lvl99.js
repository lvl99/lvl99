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

        if (!_this2.getComponentClass(elemComponentClass)) {
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
      var _this2 = this;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvY29tbW9uLmVzNiIsImVzNi9jb3JlL2FwcC5lczYiLCJlczYvY29yZS9jb21wb25lbnQuZXM2IiwiZXM2L2NvcmUvZW50aXR5LmVzNiIsImVzNi9jb3JlL2luZGV4LmVzNiIsImVzNi9pbmRleC5lczYiLCJlczYvdG9vbHMvYnJlYWtwb2ludHMuZXM2IiwiZXM2L3Rvb2xzL2RlYnVnLmVzNiIsImVzNi90b29scy9pbmRleC5lczYiLCJlczYvdG9vbHMvcXVldWUuZXM2IiwiZXM2L3Rvb2xzL3Ntb290aC1zY3JvbGwuZXM2IiwiZXM2L3Rvb2xzL3RyYWNrZXZlbnQuZXM2IiwiZXM2L3V0aWxzL2luZGV4LmVzNiIsImVzNi91dGlscy9pbmhlcml0YW5jZS5lczYiLCJlczYvdXRpbHMvcGFyc2UuZXM2IiwiaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm1lcmdlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1wYXRoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDUUEsSUFBTSxJQUFLLE9BQU8sTUFBUCxLQUFrQixXQUFsQixHQUFnQyxPQUFPLFFBQVAsQ0FBaEMsR0FBbUQsT0FBTyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDLE9BQU8sUUFBUCxDQUFoQyxHQUFtRCxJQUFqSDs7QUFLQSxJQUFNLE9BQU8sRUFBRSxRQUFGLENBQWI7QUFDQSxJQUFNLE9BQU8sRUFBRSxNQUFGLENBQWI7QUFDQSxJQUFNLFFBQVEsRUFBRSxNQUFGLENBQWQ7QUFDQSxJ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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9wRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIExWTDk5IENvbW1vblxuICpcbiAqIENvbW1vbiBkZXBlbmRlbmNpZXMgYW5kIG90aGVyIHVzZWZ1bCB0aGluZ3NcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0ICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snalF1ZXJ5J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydqUXVlcnknXSA6IG51bGwpXG5cbi8qKlxuICogQmFzaWMgc2hvcnRoYW5kIHByb3BzIHRvIGNhY2hlL3JlZmVyZW5jZSBjb21tb24galF1ZXJ5IG9iamVjdHNcbiAqL1xuY29uc3QgJGRvYyA9ICQoZG9jdW1lbnQpXG5jb25zdCAkd2luID0gJCh3aW5kb3cpXG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKVxuY29uc3QgJGJvZHkgPSAkKCdib2R5JylcblxuLyoqXG4gKiBFdmVudCBuYW1lIHNob3J0aGFuZHNcbiAqL1xuY29uc3QgZXZlbnRzID0ge1xuICBjbGljazogJ2NsaWNrIHRvdWNoZW5kJyxcbiAgaW5wdXRzdGFydDogJ21vdXNlZG93biB0b3VjaHN0YXJ0IGtleWRvd24nLFxuICBpbnB1dGVuZDogJ21vdXNldXAgdG91Y2hlbmQga2V5dXAnLFxuICBhbmltYXRpb25ydW46ICdhbmltYXRpb25ydW4gd2Via2l0QW5pbWF0aW9uUnVuIHdlYmtpdGFuaW1hdGlvbnJ1biBtb3pBbmltYXRpb25SdW4gTVNBbmltYXRpb25SdW4gb0FuaW1hdGlvblJ1biBvYW5pbWF0aW9ucnVuJyxcbiAgYW5pbWF0aW9uc3RhcnQ6ICdhbmltYXRpb25zdGFydCB3ZWJraXRBbmltYXRpb25TdGFydCB3ZWJraXRhbmltYXRpb25zdGFydCBtb3pBbmltYXRpb25TdGFydCBNU0FuaW1hdGlvblN0YXJ0IG9BbmltYXRpb25TdGFydCBvYW5pbWF0aW9uc3RhcnQnLFxuICBhbmltYXRpb25lbmQ6ICdhbmltYXRpb25lbmQgd2Via2l0QW5pbWF0aW9uRW5kIHdlYmtpdGFuaW1hdGlvbmVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kJyxcbiAgdHJhbnNpdGlvbnJ1bjogJ3RyYW5zaXRpb25ydW4gd2Via2l0VHJhbnNpdGlvblJ1biB3ZWJraXR0cmFuc2l0aW9ucnVuIG1velRyYW5zaXRpb25SdW4gTVNUcmFuc2l0aW9uUnVuIG9UcmFuc2l0aW9uUnVuIG90cmFuc2l0aW9ucnVuJyxcbiAgdHJhbnNpdGlvbnN0YXJ0OiAndHJhbnNpdGlvbnN0YXJ0IHdlYmtpdFRyYW5zaXRpb25TdGFydCB3ZWJraXR0cmFuc2l0aW9uc3RhcnQgbW96VHJhbnNpdGlvblN0YXJ0IE1TVHJhbnNpdGlvblN0YXJ0IG9UcmFuc2l0aW9uU3RhcnQgb3RyYW5zaXRpb25zdGFydCcsXG4gIHRyYW5zaXRpb25lbmQ6ICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgd2Via2l0dHJhbnNpdGlvbmVuZCBtb3pUcmFuc2l0aW9uRW5kIE1TVHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCdcbn1cblxuY29uc3QgdXRpbHMgPSB7XG4gICQsXG4gICRkb2MsXG4gICR3aW4sXG4gICRodG1sLFxuICAkYm9keSxcbiAgZXZlbnRzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHNcbiIsIi8qKlxuICogTFZMOTkgQXBwXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG4vLyBjb25zdCBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKVxuY29uc3QgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydqUXVlcnknXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2pRdWVyeSddIDogbnVsbClcbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJylcbmNvbnN0IEVudGl0eSA9IHJlcXVpcmUoJy4vZW50aXR5JylcbmNvbnN0IHtcbiAgY29udmVydFN0cmluZ1RvSnNvbixcbiAgZXh0cmFjdENsYXNzRGV0YWlsc1xufSA9IHJlcXVpcmUoJy4uL3V0aWxzL3BhcnNlJylcblxuLyoqXG4gKiBHZXQgYSBjb21wb25lbnQncyBuYW1lc3BhY2VcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudFxuICogQHJldHVybnMge3VuZGVmaW5lZHxTdHJpbmd8Q29tcG9uZW50fVxuICovXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lc3BhY2UgKGNvbXBvbmVudCkge1xuICBsZXQgY29tcG9uZW50TlMgPSBjb21wb25lbnRcblxuICAvLyBGdW5jdGlvbi9jbGFzcyBnaXZlblxuICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChjb21wb25lbnQuTlMpIHtcbiAgICAgIGNvbXBvbmVudE5TID0gY29tcG9uZW50Lk5TXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudE5TID0gY29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbXBvbmVudE5TXG59XG5cbi8qKlxuICogVGhlIEFwcCdzIGJhc2UgcHJvcGVydGllc1xuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IEFwcFByb3BlcnRpZXMgPSB7XG4gIC8qKlxuICAgKiBOQU1FU1BBQ0VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBjdXN0b20gZXZlbnRzIGFuZCBlcnJvciByZXBvcnRpbmdcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIF9OUzogJ0xWTDk5OkFwcCcsXG5cbiAgLyoqXG4gICAqIG5hbWVzcGFjZVxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIENTUyBjbGFzc2VzXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBfbnM6ICdsdmw5OS1hcHAnLFxuXG4gIC8qKlxuICAgKiBUaGUgcHJvcGVydGllcyBzaGFyZWQgYmV0d2VlbiBhbGwgaW5zdGFuY2VzIG9mIHRoaXMgQXBwXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfcHJvcGVydGllczoge30sXG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGF0dHJpYnV0ZXMgdG8gbG9hZCBhIGNyZWF0ZWQgQXBwIGluc3RhbmNlIHdpdGguXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfYXR0cmlidXRlczoge30sXG5cbiAgLyoqXG4gICAqIFRoZSBsaWJyYXJ5IG9mIGNvbXBvbmVudHMgdGhhdCB0aGUgYXBwIGhhcyBhY2Nlc3MgdG9cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9jb21wb25lbnRzOiB7fSxcblxuICAvKipcbiAgICogVGhlIGNvbGxlY3Rpb24gb2YgY29tcG9uZW50cyB3aGljaCBoYXZlIGJlZW4gaW5zdGFudGlhdGVkIHdpdGhpbiB0aGUgYXBwXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfY29tcG9uZW50SW5zdGFuY2VzOiB7fVxufVxuXG4vKipcbiAqIEFwcFxuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgRW50aXR5XG4gKi9cbmNsYXNzIEFwcCBleHRlbmRzIEVudGl0eSB7XG4gIC8qKlxuICAgKiBBcHAgY29uc3RydWN0b3JcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoYXR0cmlidXRlcykge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGBMVkw5OTpBcHA6Y29uc3RydWN0b3JgKVxuXG4gICAgc3VwZXIoYXR0cmlidXRlcylcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIEFwcCB3aXRoIGFueSBnaXZlbiB7T2JqZWN0fSBhcmd1bWVudHNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IC4uLmFyZ3VtZW50c1xuICAgKi9cbiAgZXh0ZW5kICgpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgTFZMOTk6QXBwOmV4dGVuZGAsIHtcbiAgICAvLyAgIGFyZ3VtZW50c1xuICAgIC8vIH0pXG5cbiAgICAvLyBNZXJnZSB0aGUgcHJvcGVydGllcyB3aXRoIHRoZSBpbnN0YW50aWF0ZWQgYXR0cmlidXRlc1xuICAgIHN1cGVyLmV4dGVuZChBcHBQcm9wZXJ0aWVzLCAuLi5hcmd1bWVudHMpXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBjb21wb25lbnQgY2xhc3MgaW4gdGhlIGFwcC4gWW91IGNhbiBhbHNvIHNwZWNpZnkgYSBzZXBhcmF0ZSBuYW1lc3BhY2UgdG8gcmVnaXN0ZXIgaXQgdW5kZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRDbGFzc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50Q2xhc3NOYW1lc3BhY2VcbiAgICovXG4gIHJlZ2lzdGVyQ29tcG9uZW50Q2xhc3MgKGNvbXBvbmVudENsYXNzLCBjb21wb25lbnRDbGFzc05hbWVzcGFjZSkge1xuICAgIGxldCBjb21wb25lbnRDbGFzc05TXG5cbiAgICAvLyBObyB2YWxpZCBjb21wb25lbnRDbGFzcyBnaXZlblxuICAgIGlmICghY29tcG9uZW50Q2xhc3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY29tcG9uZW50IGNsYXNzIHdhcyBnaXZlbicpXG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBuYW1lc3BhY2UgZnJvbSB0aGUgY29tcG9uZW50IGNsYXNzIChvciBvdGhlcndpc2Ugc3BlY2lmaWVkKVxuICAgIGNvbXBvbmVudENsYXNzTlMgPSBnZXRDb21wb25lbnROYW1lc3BhY2UoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UgfHwgY29tcG9uZW50Q2xhc3MpXG5cbiAgICAvLyBSZWdpc3RlciB0aGUgY29tcG9uZW50IGNsYXNzXG4gICAgaWYgKGNvbXBvbmVudENsYXNzTlMpIHtcbiAgICAgIHRoaXMuX2NvbXBvbmVudHNbY29tcG9uZW50Q2xhc3NOU10gPSBjb21wb25lbnRDbGFzc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVyIGEgY29tcG9uZW50IGNsYXNzIGJ5IG5hbWVzcGFjZVxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xDb21wb25lbnR9IGNvbXBvbmVudENsYXNzTmFtZXNwYWNlXG4gICAqL1xuICBkZXJlZ2lzdGVyQ29tcG9uZW50Q2xhc3MgKGNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSB7XG4gICAgbGV0IGNvbXBvbmVudENsYXNzTlNcblxuICAgIC8vIE5vIHZhbGlkIGNvbXBvbmVudENsYXNzIGdpdmVuXG4gICAgaWYgKCFjb21wb25lbnRDbGFzc05hbWVzcGFjZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb21wb25lbnQgY2xhc3MgbmFtZXNwYWNlIHdhcyBnaXZlbicpXG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBuYW1lc3BhY2VcbiAgICBjb21wb25lbnRDbGFzc05TID0gZ2V0Q29tcG9uZW50TmFtZXNwYWNlKGNvbXBvbmVudENsYXNzTmFtZXNwYWNlKVxuXG4gICAgLy8gUmVtb3ZlIHRoZSBjb21wb25lbnQgY2xhc3NcbiAgICBpZiAoY29tcG9uZW50Q2xhc3NOUyAmJiB0aGlzLl9jb21wb25lbnRzLmhhc093blByb3BlcnR5KGNvbXBvbmVudENsYXNzTlMpKSB7XG4gICAgICB0aGlzLl9jb21wb25lbnRzW2NvbXBvbmVudENsYXNzTlNdID0gdW5kZWZpbmVkXG4gICAgICBkZWxldGUgdGhpcy5fY29tcG9uZW50c1tjb21wb25lbnRDbGFzc05TXVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBjb21wb25lbnQgY2xhc3MgYnkgbmFtZXNwYWNlXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnRDbGFzc05hbWVzcGFjZVxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR8Q29tcG9uZW50fVxuICAgKi9cbiAgZ2V0Q29tcG9uZW50Q2xhc3MgKGNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSB7XG4gICAgbGV0IGNvbXBvbmVudENsYXNzTlMgPSBjb21wb25lbnRDbGFzc05hbWVzcGFjZVxuXG4gICAgaWYgKCFjb21wb25lbnRDbGFzc05hbWVzcGFjZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb21wb25lbnQgY2xhc3MgbmFtZXNwYWNlIHdhcyBnaXZlbicpXG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBjb21wb25lbnQgY2xhc3NcbiAgICBpZiAoY29tcG9uZW50Q2xhc3NOUyAmJiB0aGlzLl9jb21wb25lbnRzLmhhc093blByb3BlcnR5KGNvbXBvbmVudENsYXNzTlMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50c1tjb21wb25lbnRDbGFzc05TXVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29tcG9uZW50IGluc3RhbmNlIHRvIGFwcCBhbmQgaW5pdGlhbGlzZSB0aGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRJbnN0YW5jZVxuICAgKi9cbiAgYWRkQ29tcG9uZW50SW5zdGFuY2UgKGNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgY29tcG9uZW50SW5zdGFuY2UuX2FwcCA9IHRoaXNcblxuICAgIC8vIEFkZCBjb21wb25lbnQgaW5zdGFuY2UgdG8gY29sbGVjdGlvblxuICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tjb21wb25lbnRJbnN0YW5jZS51dWlkXSA9IGNvbXBvbmVudEluc3RhbmNlXG5cbiAgICAvLyBJbml0aWFsaXNlIHRoZSBjb21wb25lbnRcbiAgICBjb21wb25lbnRJbnN0YW5jZS5pbml0KClcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnRDbGFzc05hbWVzcGFjZVxuICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgKi9cbiAgY3JlYXRlQ29tcG9uZW50SW5zdGFuY2UgKGNvbXBvbmVudENsYXNzTmFtZXNwYWNlLCBhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5OU30uY3JlYXRlQ29tcG9uZW50SW5zdGFuY2U6ICR7Y29tcG9uZW50Q2xhc3NOYW1lc3BhY2V9YClcblxuICAgIC8vIENyZWF0ZSBhbmQgaW5pdGlhbGlzZSB0aGUgY29tcG9uZW50XG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpKSB7XG4gICAgICBsZXQgbmV3Q29tcG9uZW50ID0gbmV3IHRoaXMuX2NvbXBvbmVudHNbY29tcG9uZW50Q2xhc3NOYW1lc3BhY2VdKGF0dHJpYnV0ZXMpXG5cbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5OU30uY3JlYXRlQ29tcG9uZW50SW5zdGFuY2VgLCB7XG4gICAgICAvLyAgIGNvbXBvbmVudENsYXNzTmFtZXNwYWNlLFxuICAgICAgLy8gICBuZXdDb21wb25lbnQsXG4gICAgICAvLyAgIGF0dHJpYnV0ZXNcbiAgICAgIC8vIH0pXG5cbiAgICAgIC8vIEFkZCBpbnN0YW5jZSB0byBhcHBcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50SW5zdGFuY2UobmV3Q29tcG9uZW50KVxuXG4gICAgICByZXR1cm4gbmV3Q29tcG9uZW50XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGNvbXBvbmVudCBpbnN0YW5jZSBieSBVVUlEXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnRVVUlEXG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR8Q29tcG9uZW50fVxuICAgKi9cbiAgZ2V0Q29tcG9uZW50SW5zdGFuY2UgKGNvbXBvbmVudFVVSUQpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLk5TfS5nZXRDb21wb25lbnRJbnN0YW5jZTogJHtjb21wb25lbnRVVUlEfWApXG5cbiAgICBpZiAodGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmhhc093blByb3BlcnR5KGNvbXBvbmVudFVVSUQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzW2NvbXBvbmVudFVVSURdXG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjb21wb25lbnQgaW5zdGFuY2UgYnkgVVVJRFxuICAgKlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50VVVJRFxuICAgKi9cbiAgcmVtb3ZlQ29tcG9uZW50SW5zdGFuY2UgKGNvbXBvbmVudFVVSUQpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLk5TfS5yZW1vdmVDb21wb25lbnRJbnN0YW5jZTogJHtjb21wb25lbnRVVUlEfWApXG5cbiAgICBsZXQgcmVtb3ZlQ29tcG9uZW50SW5zdGFuY2UgPSB0aGlzLmdldENvbXBvbmVudEluc3RhbmNlKGNvbXBvbmVudFVVSUQpXG4gICAgaWYgKHR5cGVvZiByZW1vdmVDb21wb25lbnRJbnN0YW5jZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5OU30ucmVtb3ZlQ29tcG9uZW50SW5zdGFuY2U6IGZvdW5kIGNvbXBvbmVudCBpbnN0YW5jZSB0byByZW1vdmVgLCByZW1vdmVDb21wb25lbnRJbnN0YW5jZSlcblxuICAgICAgcmVtb3ZlQ29tcG9uZW50SW5zdGFuY2UuZGVzdHJveSgpXG5cbiAgICAgIC8vIEBUT0RPIHRoZSBmb2xsb3dpbmcgc2hvdWxkIHByb2JhYmx5IG9ubHkgaGFwcGVuIGFmdGVyIGEgUHJvbWlzZSBpcyByZXNvbHZlZFxuICAgICAgLy8gUmVtb3ZlIGVudHJ5IGluIHRoZSBjb21wb25lbnRJbnN0YW5jZXMgb2JqZWN0XG4gICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbY29tcG9uZW50VVVJRF0gPSB1bmRlZmluZWRcbiAgICAgIGRlbGV0ZSB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbY29tcG9uZW50VVVJRF1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSBhbnkgY29tcG9uZW50IHdoaWNoIGlzIG1hcmtlZCBpbiB0aGUgRE9NXG4gICAqL1xuICBpbml0aWFsaXNlQ29tcG9uZW50cyAoKSB7XG4gICAgLy8gRmluZCBhbnkgZWxlbWVudCBtYXJrZWQgd2l0aCB0aGUgYFtkYXRhLWNvbXBvbmVudF1gIGF0dHJpYnV0ZVxuICAgICQoJ1tkYXRhLWNvbXBvbmVudF0nKVxuICAgICAgLy8gSWdub3JlIGNvbXBvbmVudHMgd2hpY2ggYWxyZWFkeSBoYXZlIGFuIElEIGFzc2lnbmVkXG4gICAgICAubm90KCdbZGF0YS1jb21wb25lbnQtaWRdJylcbiAgICAgIC8vIEluaXRpYWxpc2UgZWFjaCBjb21wb25lbnRcbiAgICAgIC5lYWNoKChpbmRleCwgZWxlbSkgPT4ge1xuICAgICAgICBsZXQgJGVsZW0gPSAkKGVsZW0pXG4gICAgICAgIGxldCBlbGVtQ29tcG9uZW50Q2xhc3MgPSAkZWxlbS5hdHRyKCdkYXRhLWNvbXBvbmVudCcpXG4gICAgICAgIGxldCBlbGVtQ29tcG9uZW50T3B0aW9ucyA9ICRlbGVtLmF0dHIoJ2RhdGEtY29tcG9uZW50LW9wdGlvbnMnKSB8fCB7fVxuXG4gICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLl9OU30uaW5pdGlhbGlzZUNvbXBvbmVudHM6IGZvdW5kIGVsZW1lbnQgdG8gaW5pdGlhbGlzZSB3aXRoIGNvbXBvbmVudGAsIHtcbiAgICAgICAgLy8gICBpbmRleCxcbiAgICAgICAgLy8gICBlbGVtLFxuICAgICAgICAvLyAgIGVsZW1Db21wb25lbnRDbGFzcyxcbiAgICAgICAgLy8gICBlbGVtQ29tcG9uZW50T3B0aW9uc1xuICAgICAgICAvLyB9KVxuXG4gICAgICAgIC8vIEVuc3VyZSBjb21wb25lbnQgY2xhc3MgaXMgcmVnaXN0ZXJlZFxuICAgICAgICBpZiAoIXRoaXMuZ2V0Q29tcG9uZW50Q2xhc3MoZWxlbUNvbXBvbmVudENsYXNzKSkge1xuICAgICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5fTlN9LmluaXRpYWxpc2VDb21wb25lbnRzOiBlbGVtZW50J3MgY29tcG9uZW50IGNsYXNzIG5vdCByZWdpc3RlcmVkYCwge1xuICAgICAgICAgIC8vICAgYXBwOiB0aGlzLFxuICAgICAgICAgIC8vICAgaW5kZXgsXG4gICAgICAgICAgLy8gICBlbGVtLFxuICAgICAgICAgIC8vICAgZWxlbUNvbXBvbmVudENsYXNzLFxuICAgICAgICAgIC8vICAgZWxlbUNvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICAvLyB9KVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXh0cmFjdC9jb252ZXJ0IHRoZSBvcHRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbUNvbXBvbmVudE9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgLy8gU2V0IGFzIEpTT04sIGUuZy4gJ3tcIm5hbWVcIjpcInZhbHVlXCJ9YFxuICAgICAgICAgIGlmICgvXlxcey8udGVzdChlbGVtQ29tcG9uZW50T3B0aW9ucykpIHtcbiAgICAgICAgICAgIGVsZW1Db21wb25lbnRPcHRpb25zID0gY29udmVydFN0cmluZ1RvSnNvbihlbGVtQ29tcG9uZW50T3B0aW9ucylcblxuICAgICAgICAgICAgLy8gU2V0IGFzIHN0eWxlLWxpa2UgYXR0cmlidXRlcywgZS5nLiBgbmFtZTogdmFsdWU7IG5hbWU6IHZhbHVlYFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtQ29tcG9uZW50T3B0aW9ucyA9IGV4dHJhY3RDbGFzc0RldGFpbHMoZWxlbUNvbXBvbmVudE9wdGlvbnMpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRoZSAkZWxlbSBpZiBpdCBpcyBub3QgYWxyZWFkeSBzZXRcbiAgICAgICAgaWYgKCFlbGVtQ29tcG9uZW50T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnJGVsZW0nKSkge1xuICAgICAgICAgIGVsZW1Db21wb25lbnRPcHRpb25zLiRlbGVtID0gJGVsZW1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29tcG9uZW50XG4gICAgICAgIGxldCBlbGVtQ29tcG9uZW50SW5zdGFuY2UgPSB0aGlzLmNyZWF0ZUNvbXBvbmVudEluc3RhbmNlKGVsZW1Db21wb25lbnRDbGFzcywgZWxlbUNvbXBvbmVudE9wdGlvbnMpXG5cbiAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdJbml0aWFsaXNlZCBjb21wb25lbnQgaW5zdGFuY2UnLCB7XG4gICAgICAgIC8vICAgaW5kZXgsXG4gICAgICAgIC8vICAgZWxlbSxcbiAgICAgICAgLy8gICBlbGVtQ29tcG9uZW50T3B0aW9ucyxcbiAgICAgICAgLy8gICBlbGVtQ29tcG9uZW50SW5zdGFuY2VcbiAgICAgICAgLy8gfSlcbiAgICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBcHBcbiIsIi8qKlxuICogTFZMOTkgQ29tcG9uZW50XG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBvYmplY3RQYXRoID0gcmVxdWlyZSgnb2JqZWN0LXBhdGgnKVxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKVxuY29uc3QgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKVxuY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKVxuY29uc3QgeyAkLCAkZG9jIH0gPSByZXF1aXJlKCcuLi9jb21tb24nKVxuLy8gY29uc3QgeyB3cmFwIH0gPSByZXF1aXJlKCcuLi91dGlscy9zdXBlcicpXG5jb25zdCB7XG4gIGV4dHJhY3RUcmlnZ2VyRGV0YWlscyxcbiAgZXh0cmFjdFRhcmdldEV2ZW50TmFtZXMsXG4gIGdldFRhcmdldEJ5U2VsZWN0b3IsXG4gIGdldFRhcmdldFNlbGVjdG9yXG59ID0gcmVxdWlyZSgnLi4vdXRpbHMvcGFyc2UnKVxuXG4vKipcbiAqIFRoZSBDb21wb25lbnQncyBiYXNlIHByb3BlcnRpZXNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBDb21wb25lbnRQcm9wZXJ0aWVzID0ge1xuICAvKipcbiAgICogTkFNRVNQQUNFXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgY3VzdG9tIGV2ZW50cyBhbmQgZXJyb3IgcmVwb3J0aW5nXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqIEBkZWZhdWx0IExWTDk5XG4gICAqL1xuICBfTlM6ICdMVkw5OTpDb21wb25lbnQnLFxuXG4gIC8qKlxuICAgKiBuYW1lc3BhY2VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBDU1MgY2xhc3Nlc1xuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKiBAZGVmYXVsdCBsdmw5OVxuICAgKi9cbiAgX25zOiAnbHZsOTktY29tcG9uZW50JyxcblxuICAvKipcbiAgICogVGhlIHByb3BlcnRpZXMgc2hhcmVkIGJldHdlZW4gYWxsIGluc3RhbmNlcyBvZiB0aGlzIENvbXBvbmVudFxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX3Byb3BlcnRpZXM6IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZXMgb2YgQ29tcG9uZW50IG1ldGhvZHMgdG8gcHVibGljbHkgZXhwb3NlIGluIHRoZSBET00gdmlhIGN1c3RvbSBldmVudHMgKGF0dGFjaGVkIGR1cmluZyBgaW5pdGApLlxuICAgICAqXG4gICAgICogRWFjaCBlbnRyeSBjYW4gYmUgYSBzdHJpbmcgKHdoaWNoIHdpbGwgdGhlbiBiZSBhIGdsb2JhbCBldmVudDsgYmUgY2FyZWZ1bCB3aXRoIGdsb2JhbCBldmVudHMgYmVpbmcgYXR0YWNoZWQgdHdpY2UpLFxuICAgICAqIG9yIGNhbiBiZSBhbiBvYmplY3Qgd2hlcmUgeW91IHNwZWNpZnkgdGhlIHRhcmdldCAob2Z0ZW4gJ3NlbGYnKSBhbmQgc2V0IHdoYXQgbWV0aG9kIHRvIGRvIG9uIHdoYXRldmVyIGV2ZW50LCBlLmcuOlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogICAvLyBUaGlzIHdpbGwgdHJpZ2dlciB0aGUgQ29tcG9uZW50J3MgYGV4YW1wbGVNZXRob2RgIHdoZW4gdGhlIENvbXBvbmVudCdzICRlbGVtIGlzIHRhcmdldGVkL3RyaWdnZXJlZFxuICAgICAqICAgLy8gdXNpbmcgdGhlIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGN1c3RvbSBldmVudCBuYW1lOlxuICAgICAqICAgLy8gYCRlbGVtLnRyaWdnZXIoJ0NvbXBvbmVudDpleGFtcGxlTWV0aG9kJylgXG4gICAgICogICB7XG4gICAgICogICAgIHRhcmdldDogJ3NlbGYnLFxuICAgICAqICAgICBkbzogJ2V4YW1wbGVNZXRob2QnXG4gICAgICogICB9XG4gICAgICpcbiAgICAgKiAgIC8vIFRoaXMgd2lsbCB0cmlnZ2VyIHRoZSBDb21wb25lbnQncyBgZXhhbXBsZU1ldGhvZGAgd2hlbiB0aGUgZG9jdW1lbnQgaXMgdGFyZ2V0ZWQvdHJpZ2dlcmVkIHVzaW5nIGEgY3VzdG9tXG4gICAgICogICAvLyBldmVudCBuYW1lOlxuICAgICAqICAgLy8gYCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2N1c3RvbUV2ZW50TmFtZScpYFxuICAgICAqICAge1xuICAgICAqICAgICB0YXJnZXQ6ICdkb2N1bWVudCcsXG4gICAgICogICAgIGRvOiAnZXhhbXBsZU1ldGhvZCcsXG4gICAgICogICAgIG9uOiAnY3VzdG9tRXZlbnROYW1lJ1xuICAgICAqICAgfVxuICAgICAqXG4gICAgICogICAvLyBUaGlzIHdpbGwgdHJpZ2dlciB0aGUgQ29tcG9uZW50J3MgYGV4YW1wbGVNZXRob2RgIHdoZW4gdGhlIHdpbmRvdyBpcyBzY3JvbGxlZDpcbiAgICAgKiAgIC8vIGAkKHdpbmRvdykuc2Nyb2xsKClgXG4gICAgICogICB7XG4gICAgICogICAgIHRhcmdldDogJ3dpbmRvdycsXG4gICAgICogICAgIGRvOiAnZXhhbXBsZU1ldGhvZCcsXG4gICAgICogICAgIG9uOiAnc2Nyb2xsJ1xuICAgICAqICAgfVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIHB1YmxpY01ldGhvZHM6IFtdLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCB0byBhcHBseSBhbnkgQ1NTIGNsYXNzZXMgdG9cbiAgICAgKlxuICAgICAqIEB0eXBlIHtqUXVlcnlPYmplY3R9XG4gICAgICovXG4gICAgJGNsYXNzVGFyZ2V0OiB1bmRlZmluZWRcbiAgfSxcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgYXR0cmlidXRlcyB0byBsb2FkIGEgY3JlYXRlZCBDb21wb25lbnQgaW5zdGFuY2Ugd2l0aC5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9hdHRyaWJ1dGVzOiB7XG4gICAgLyoqXG4gICAgICogVGhlIG1haW4gZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhlIENvbXBvbmVudCBpbiB0aGUgRE9NLiBDb21wb25lbnQgZXZlbnRzIHdpbGwgYmUgbWFuYWdlZCB0aHJvdWdoIHRoaXMgZWxlbWVudC5cbiAgICAgKi9cbiAgICAkZWxlbTogdW5kZWZpbmVkXG4gIH1cbn1cblxuLyoqXG4gKiBDb21wb25lbnRcbiAqXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIEVudGl0eVxuICovXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBFbnRpdHkge1xuICAvKipcbiAgICogQ29tcG9uZW50IGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZygnTFZMOTk6Q29tcG9uZW50OmNvbnN0cnVjdG9yJywge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIHN1cGVyKGF0dHJpYnV0ZXMpXG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBDb21wb25lbnQncyBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAuLi5hcmd1bWVudHNcbiAgICovXG4gIGV4dGVuZCAoKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coJ0xWTDk5OkNvbXBvbmVudDpleHRlbmQnLCB7XG4gICAgLy8gICBhcmd1bWVudHNcbiAgICAvLyB9KVxuXG4gICAgLy8gQ29uY2F0IGFsbCB0aGUgcHVibGljTWV0aG9kcyBpbnRvIG9uZSBhcnJheSAoc2luY2UgbWVyZ2UgZG9lc24ndCBkbyB0aGF0IHdpdGggcGxhaW4gYXJyYXlzKVxuICAgIGxldCBhcmdzID0gWy4uLmFyZ3VtZW50c11cbiAgICBsZXQgYWxsUHVibGljTWV0aG9kcyA9IENvbXBvbmVudFByb3BlcnRpZXMuX3Byb3BlcnRpZXMucHVibGljTWV0aG9kcy5zbGljZSgwKVxuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICBsZXQgaGFzUHVibGljTWV0aG9kcyA9IG9iamVjdFBhdGguZ2V0KGFyZywgJ19wcm9wZXJ0aWVzLnB1YmxpY01ldGhvZHMnKVxuICAgICAgaWYgKGhhc1B1YmxpY01ldGhvZHMgJiYgaGFzUHVibGljTWV0aG9kcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGFsbFB1YmxpY01ldGhvZHMgPSBhbGxQdWJsaWNNZXRob2RzLmNvbmNhdChoYXNQdWJsaWNNZXRob2RzKVxuICAgICAgfVxuICAgIH0pXG4gICAgYWxsUHVibGljTWV0aG9kcyA9IEFycmF5LmZyb20obmV3IFNldChhbGxQdWJsaWNNZXRob2RzKSlcblxuICAgIC8vIEV4dGVuZCB0aGUgY29tcG9uZW50J3MgcHJvcGVydGllcyB3aXRoIHRoZSBpbnN0YW50aWF0ZWQgYXR0cmlidXRlcyBhbmQgY29uY2F0ZW5hdGVkIHB1YmxpYyBtZXRob2RzXG4gICAgc3VwZXIuZXh0ZW5kKENvbXBvbmVudFByb3BlcnRpZXMsIC4uLmFyZ3VtZW50cywge1xuICAgICAgX3Byb3BlcnRpZXM6IHtcbiAgICAgICAgcHVibGljTWV0aG9kczogYWxsUHVibGljTWV0aG9kc1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb21wb25lbnQncyBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZHxqUXVlcnlPYmplY3R9XG4gICAqL1xuICBnZXRFbGVtICgpIHtcbiAgICAvLyBTb2Z0IHJldHVyblxuICAgIGlmICghdGhpcy5nZXRBdHRyKCdlbGVtJykgJiYgKCF0aGlzLmdldEF0dHIoJyRlbGVtJykgfHwgIXRoaXMuZ2V0QXR0cignJGVsZW0nKS5sZW5ndGgpKSB7XG4gICAgICBjb25zb2xlLndhcm4oYCR7dGhpcy5OU30uZ2V0RWxlbTogbm8gZWxlbSB3YXMgZm91bmQgZm9yIHRoaXMgY29tcG9uZW50LiBUaGlzIG1heSBjYXVzZSBwcm9ibGVtcyB3aXRoIGNvbXBvbmVudHMgd2hpY2ggcmVseSBvbiB0aGUgZWxlbSBhdHRyaWJ1dGUuYClcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvLyBFbGVtIChvciAkZWxlbSkgaXMgc2V0IHRvIHN0cmluZ1xuICAgIGlmICh0eXBlb2YgdGhpcy5nZXRBdHRyKCdlbGVtJykgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aGlzLmdldEF0dHIoJyRlbGVtJykgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgJGVsZW0gPSAkKHRoaXMuZ2V0QXR0cignZWxlbScpKVxuICAgICAgaWYgKCRlbGVtLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnNldEF0dHIoJ2VsZW0nLCAkZWxlbVswXSlcbiAgICAgICAgdGhpcy5zZXRBdHRyKCckZWxlbScsICRlbGVtKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdldCAmIHNldCB0aGUgZWxlbWVudFxuICAgIGlmICh0aGlzLmdldEF0dHIoJ2VsZW0nKSAmJiAhdGhpcy5nZXRBdHRyKCckZWxlbScpKSB7XG4gICAgICB0aGlzLnNldEF0dHIoJCh0aGlzLmdldEF0dHIoJ2VsZW0nKSkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cignJGVsZW0nKVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcmsgdGhlIENvbXBvbmVudCdzIGVsZW1lbnQgd2l0aCBuZWNlc3NhcnkgYXR0cmlidXRlc1xuICAgKi9cbiAgbWFya0VsZW0gKCkge1xuICAgIC8vIE1hcmsgdGhlIGVsZW1lbnRcbiAgICBpZiAodGhpcy5nZXRFbGVtKCkgJiYgdGhpcy5nZXRFbGVtKCkubGVuZ3RoKSB7XG4gICAgICBpZiAoIXRoaXMuZ2V0RWxlbSgpLmF0dHIoJ2RhdGEtY29tcG9uZW50JykpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtKCkuYXR0cignZGF0YS1jb21wb25lbnQnLCB0aGlzLk5TKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuZ2V0RWxlbSgpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWlkJykpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtKCkuYXR0cignZGF0YS1jb21wb25lbnQtaWQnLCB0aGlzLnV1aWQpXG4gICAgICB9XG5cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdtYXJrRWxlbTplbmQnKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHRhcmdldCB0byBhcHBseSB0aGUgQ1NTIHN0YXRlIGNsYXNzZXMgdG9cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfGpRdWVyeU9iamVjdH1cbiAgICovXG4gIGdldENsYXNzVGFyZ2V0ICgpIHtcbiAgICAvLyBQcmlvcml0aXNlIGF0dHJcbiAgICBsZXQgJGNsYXNzVGFyZ2V0ID0gdGhpcy5nZXRBdHRyKCckY2xhc3NUYXJnZXQnKVxuXG4gICAgLy8gTm90IGZvdW5kIGluIGF0dHI/IFVzZSBwcm9wXG4gICAgaWYgKCEkY2xhc3NUYXJnZXQgfHwgISRjbGFzc1RhcmdldC5sZW5ndGgpIHtcbiAgICAgICRjbGFzc1RhcmdldCA9IHRoaXMuZ2V0UHJvcCgnJGNsYXNzVGFyZ2V0JylcbiAgICB9XG5cbiAgICAvLyBOb3QgZm91bmQgaW4gcHJvcD8gVXNlIGVsZW1cbiAgICBpZiAoISRjbGFzc1RhcmdldCB8fCAhJGNsYXNzVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgJGNsYXNzVGFyZ2V0ID0gdGhpcy5nZXRFbGVtKClcblxuICAgICAgLy8gRW5zdXJlIHNldCBhcyBhdHRyXG4gICAgICB0aGlzLnNldEF0dHIoJyRjbGFzc1RhcmdldCcsICRjbGFzc1RhcmdldClcbiAgICB9XG5cbiAgICByZXR1cm4gJGNsYXNzVGFyZ2V0XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTSBlbGVtZW50IGFuZCBwbGFjZSBpbnRvIHRoZSBDb21wb25lbnQgaW5zdGFuY2VcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbG9hZEF0dHJzICgpIHtcbiAgICBpZiAodGhpcy5nZXRFbGVtKCkgJiYgdGhpcy5nZXRFbGVtKCkuaXMoJ1tkYXRhLWNvbXBvbmVudC1hdHRyaWJ1dGVzXScpKSB7XG4gICAgICBsZXQgYXR0cnMgPSB7fVxuXG4gICAgICAvLyBBdHRlbXB0IHRvIGdldCB0aGUgYXR0cmlidXRlcyBmcm9tIHRoZSBET00gZWxlbWVudFxuICAgICAgdHJ5IHtcbiAgICAgICAgYXR0cnMgPSBKU09OLnBhcnNlKHRoaXMuZ2V0RWxlbSgpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWF0dHJpYnV0ZXMnKSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgWyR7dGhpcy5OU31dIGxvYWRBdHRyczogRXJyb3IgbG9hZGluZyBhdHRyaWJ1dGVzIGZyb20gRE9NIGVsZW1lbnRgKVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9hdHRyaWJ1dGVzID0gbWVyZ2UodGhpcy5fYXR0cmlidXRlcywgYXR0cnMpXG5cbiAgICAgIC8vIE9uY2UgbG9hZGVkLCByZW1vdmUgdGhlIGNvbXBvbmVudCBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTVxuICAgICAgdGhpcy5nZXRFbGVtKCkucmVtb3ZlQXR0cignZGF0YS1jb21wb25lbnQtYXR0cmlidXRlcycpXG5cbiAgICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2UgQ29tcG9uZW50XG4gICAqL1xuICBpbml0ICgpIHtcbiAgICBzdXBlci5pbml0KC4uLmFyZ3VtZW50cylcblxuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGBbJHt0aGlzLk5TOmluaXR9XWApXG5cbiAgICAvLyBNYXJrIHRoZSBlbGVtZW50XG4gICAgdGhpcy5tYXJrRWxlbSgpXG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2ggQ29tcG9uZW50J3MgcHVibGljIG1ldGhvZHMgdG8gdGFyZ2V0c1xuICAgICAqIFB1YmxpYyBtZXRob2RzIGNhbiBiZSB0cmlnZ2VyZWQgb24gdGhlIHRhcmdldHMgdmlhIGAkKHRhcmdldCkudHJpZ2dlcignTkFNRVNQQUNFOnB1YmxpY01ldGhvZE5hbWUnKWBcbiAgICAgKi9cbiAgICBsZXQgcHVibGljTWV0aG9kcyA9IHRoaXMuZ2V0UHJvcCgncHVibGljTWV0aG9kcycpXG4gICAgaWYgKHB1YmxpY01ldGhvZHMgJiYgcHVibGljTWV0aG9kcy5sZW5ndGgpIHtcbiAgICAgIHB1YmxpY01ldGhvZHMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgICBsZXQgdHJpZ2dlckRldGFpbHMgPSB7fVxuXG4gICAgICAgIC8vIEFscmVhZHkgb2JqZWN0XG4gICAgICAgIGlmICh0eXBlb2YgdHJpZ2dlciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0cmlnZ2VyRGV0YWlscyA9IHRyaWdnZXJcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0cmlnZ2VyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICgvXnsvLnRlc3QodHJpZ2dlcikgfHwgL1s6O10vLnRlc3QodHJpZ2dlcikpIHtcbiAgICAgICAgICAgIHRyaWdnZXJEZXRhaWxzID0gZXh0cmFjdFRyaWdnZXJEZXRhaWxzKHRyaWdnZXIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyaWdnZXJEZXRhaWxzLmRvID0gdHJpZ2dlclxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGVtcHR5LCBzZXQgYG9uYCB0byBgZG9gIHZhbHVlIChjb25zaWRlciBpdCBhIGN1c3RvbSBldmVudCB0byBpbnZva2UsIGUuZy4gJ2luaXQnIHdvdWxkIGludm9rZSAnaW5pdCcgb24gdGhpcyBDb21wb25lbnQpXG4gICAgICAgIGlmICghb2JqZWN0UGF0aC5oYXModHJpZ2dlckRldGFpbHMsICdvbicpKSB7XG4gICAgICAgICAgdHJpZ2dlckRldGFpbHMub24gPSB0cmlnZ2VyRGV0YWlscy5kb1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29udGV4dCBzaG91bGQgYWx3YXlzIGJlIHRoaXMgQ29tcG9uZW50XG4gICAgICAgIHRyaWdnZXJEZXRhaWxzLmNvbnRleHQgPSB0aGlzXG5cbiAgICAgICAgLy8gR2V0IHRoZSBDb21wb25lbnQncyBtZXRob2RcbiAgICAgICAgbGV0IG1ldGhvZCA9IHVuZGVmaW5lZFxuICAgICAgICB0cnkge1xuICAgICAgICAgIG1ldGhvZCA9IHRyaWdnZXJEZXRhaWxzLmNvbnRleHRbdHJpZ2dlckRldGFpbHMuZG9dXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RoaXMuTlN9XSBpbml0OiBwdWJsaWMgbWV0aG9kICcke3RyaWdnZXJEZXRhaWxzLmRvfScgd2FzIG5vdCBmb3VuZCBvbiB0aGlzIGNvbXBvbmVudGApXG4gICAgICAgIH1cblxuICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlN9XSBpbml0OiBhdHRhY2ggcHVibGljIG1ldGhvZGAsIHtcbiAgICAgICAgLy8gICB0cmlnZ2VyRGV0YWlscyxcbiAgICAgICAgLy8gICBtZXRob2RcbiAgICAgICAgLy8gfSlcblxuICAgICAgICAvLyBBdHRhY2ggdGhlIG1ldGhvZCBhcyBhIGN1c3RvbSBldmVudCB0byB0aGUgdGFyZ2V0XG4gICAgICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgLy8gV3JhcCB0aGUgbWV0aG9kIGludG8gYSBjbG9zdXJlXG4gICAgICAgICAgbGV0IGRvQ29tcG9uZW50TWV0aG9kID0gKGpRdWVyeUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBUcmlnZ2VyZWQgJHt0aGlzLk5TfToke3RyaWdnZXJEZXRhaWxzLmRvfWAsIHtcbiAgICAgICAgICAgIC8vICAgX2NsYXNzOiB0aGlzLFxuICAgICAgICAgICAgLy8gICBfbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAvLyAgIGpRdWVyeUV2ZW50LFxuICAgICAgICAgICAgLy8gICBhcmdzOiBhcmd1bWVudHNcbiAgICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgICAgIG1ldGhvZC5jYWxsKHRoaXMsIGpRdWVyeUV2ZW50KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEF0dGFjaCB0byB0aGUgdGFyZ2V0IGRvY3VtZW50IHdpdGggYSBwYXJ0aWN1bGFyIGVsZW1lbnQgc2VsZWN0b3JcbiAgICAgICAgICBpZiAodHJpZ2dlckRldGFpbHMuc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50VG9UYXJnZXRTZWxlY3Rvcih0cmlnZ2VyRGV0YWlscy5vbiwgdHJpZ2dlckRldGFpbHMuc2VsZWN0b3IsIGRvQ29tcG9uZW50TWV0aG9kLCB0cmlnZ2VyRGV0YWlscy50YXJnZXQpXG5cbiAgICAgICAgICAgIC8vIEF0dGFjaCB0byB0aGUgdGFyZ2V0XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50VG9UYXJnZXQodHJpZ2dlckRldGFpbHMub24sIGRvQ29tcG9uZW50TWV0aG9kLCB0cmlnZ2VyRGV0YWlscy50YXJnZXQpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRXJyb3JcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLCB0cmlnZ2VyLCB0cmlnZ2VyRGV0YWlscylcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RoaXMuTlN9XSBpbml0OiBwdWJsaWMgbWV0aG9kICcke3RyaWdnZXJEZXRhaWxzLmRvfScgaXMgbm90IGEgdmFsaWQgZnVuY3Rpb25gKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgYW55IGF0dHJpYnV0ZXMgdGhhdCB3ZXJlIGF0dGFjaGVkIHRvIHRoZSBET00gZWxlbWVudFxuICAgICAqL1xuICAgIHRoaXMubG9hZEF0dHJzKClcblxuICAgIC8qKlxuICAgICAqIEB0cmlnZ2VyIE5BTUVTUEFDRTppbml0OmVuZFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHRoaXMudHJpZ2dlckV2ZW50KCdpbml0OmVuZCcpXG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBhbmQgdGVhciBkb3duIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGRlc3Ryb3kgKCkge1xuICAgIC8vIEBUT0RPIHRlYXIgZG93biB0aGUgaG91c2UhXG4gICAgLy8gQFRPRE8gcmVtb3ZlIHRoZSBib3VuZCBwdWJsaWMgZXZlbnRzXG4gICAgLy8gQFRPRE8gb3RoZXIgZ2FyYmFnZSBjb2xsZWN0aW9uL21lbW9yeSBtYW5hZ2VtZW50XG5cbiAgICAvKipcbiAgICAgKiBAdHJpZ2dlciBOQU1FU1BBQ0U6ZGVzdHJveTpiZWZvcmVlbmRcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRyaWdnZXJFdmVudCgnZGVzdHJveTpiZWZvcmVlbmQnKVxuXG4gICAgc3VwZXIuZGVzdHJveSguLi5hcmd1bWVudHMpXG4gIH1cblxuICAvKipcbiAgICogQmluZCBtZXRob2QgdG8gY3VzdG9tIGV2ZW50IG9uIHRhcmdldFxuICAgKiBFdmVudCBuYW1lcyBhcmUgYXV0b21hdGljYWxseSBuYW1lc3BhY2VkIHVzaW5nIHRoZSBDb21wb25lbnQncyBfTlMgcHJvcGVydHkuXG4gICAqIFRvIG5vdCB1c2UgbmFtZXNwYWNlZCBldmVudHMsIHByZWZhY2Ugd2l0aCBgZG9tOmBcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBEZWZhdWx0IGlzIGBkb2N1bWVudGAuIFRoaXMgaXMgdGhlIHRhcmdldCBET00gZWxlbWVudCB3aGljaCB0aGUgY3VzdG9tIGV2ZW50IHdpbGwgYnViYmxlIHVwIHRvXG4gICAqL1xuICBiaW5kRXZlbnRUb1RhcmdldCAoZXZlbnROYW1lLCBtZXRob2QsIHRhcmdldCkge1xuICAgIC8vIERlZmF1bHQgdG8gZG9jdW1lbnRcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGFyZ2V0ID0gZG9jdW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3BlY2lhbCBzdHJpbmcgdmFsdWVzIHRvIGdldCB0aGUgYWN0dWFsIG9iamVjdFxuICAgICAgc3dpdGNoICh0YXJnZXQpIHtcbiAgICAgICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50XG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICd3aW5kb3cnOlxuICAgICAgICAgIHRhcmdldCA9IHdpbmRvd1xuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAnc2VsZic6XG4gICAgICAgICAgdGFyZ2V0ID0gdGhpcy5nZXRFbGVtKClbMF1cbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEV4dHJhY3QgdGhlIHRhcmdldCBldmVudCBuYW1lcyBmcm9tIHRoZSBpbnB1dCBnaXZlblxuICAgIGxldCBldmVudE5hbWVzID0gZXh0cmFjdFRhcmdldEV2ZW50TmFtZXMoZXZlbnROYW1lLCB0aGlzLk5TKVxuXG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlN9XSBiaW5kRXZlbnRUb1RhcmdldGAsIHtcbiAgICAvLyAgIGV2ZW50TmFtZSxcbiAgICAvLyAgIG1ldGhvZCxcbiAgICAvLyAgIHRhcmdldCxcbiAgICAvLyAgIHRyaWdnZXJOYW1lOiB0YXJnZXRFdmVudE5hbWVzXG4gICAgLy8gfSlcblxuICAgIC8vIEFzc2lnbiB0aGUgdHJpZ2dlclxuICAgIGlmIChldmVudE5hbWVzKSB7XG4gICAgICAkKHRhcmdldCkub24oZXZlbnROYW1lcy5qb2luKCcgJyksIG1ldGhvZClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBtZXRob2QgdG8gY3VzdG9tIGV2ZW50IG9uIHRhcmdldCB3aXRoIGFuIGVsZW1lbnQgc2VsZWN0b3IuXG4gICAqIEV2ZW50IG5hbWVzIGFyZSBhdXRvbWF0aWNhbGx5IG5hbWVzcGFjZWQgdXNpbmcgdGhlIENvbXBvbmVudCdzIF9OUyBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgVGFyZ2V0IGEgc3BlY2lmaWMgZWxlbWVudCAodmlhIHF1ZXJ5IHNlbGVjdG9yKSB0byB0cmlnZ2VyIHRoZSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBEZWZhdWx0IGlzIGBkb2N1bWVudGAuIFRoaXMgaXMgdGhlIHRhcmdldCBET00gZWxlbWVudCB3aGljaCB0aGUgY3VzdG9tIGV2ZW50IHdpbGwgYnViYmxlIHVwIHRvXG4gICAqL1xuICBiaW5kRXZlbnRUb1RhcmdldFNlbGVjdG9yIChldmVudE5hbWUsIHNlbGVjdG9yLCBtZXRob2QsIHRhcmdldCkge1xuICAgIHRhcmdldCA9IGdldFRhcmdldEJ5U2VsZWN0b3IodGFyZ2V0LCB0aGlzKVxuICAgIHNlbGVjdG9yID0gZ2V0VGFyZ2V0U2VsZWN0b3Ioc2VsZWN0b3IsIHRoaXMpXG4gICAgbGV0IGV2ZW50TmFtZXMgPSBleHRyYWN0VGFyZ2V0RXZlbnROYW1lcyhldmVudE5hbWUsIHRoaXMuTlMpXG5cbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OU31dIGJpbmRFdmVudFRvVGFyZ2V0U2VsZWN0b3JgLCB7XG4gICAgLy8gICBldmVudE5hbWUsXG4gICAgLy8gICBzZWxlY3RvcixcbiAgICAvLyAgIG1ldGhvZCxcbiAgICAvLyAgIHRhcmdldCxcbiAgICAvLyAgIHRyaWdnZXJOYW1lOiBgJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gXG4gICAgLy8gfSlcblxuICAgIGlmIChldmVudE5hbWVzKSB7XG4gICAgICAkKHRhcmdldCkub24oZXZlbnROYW1lcy5qb2luKCcgJyksIHNlbGVjdG9yLCBtZXRob2QpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYSBjdXN0b20gZG9jdW1lbnQgZXZlbnQgb24gdGhlIENvbXBvbmVudC5cbiAgICogVGhlIGV2ZW50IHRyaWdnZXJlZCB3aWxsIGJlIGBOQU1FU1BBQ0U6ZXZlbnROYW1lYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge0FueX0gLi4uYXJnc1xuICAgKi9cbiAgdHJpZ2dlckV2ZW50IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OU31dIHRyaWdnZXJFdmVudDogJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gKVxuXG4gICAgLy8gQWx3YXlzIHBhc3MgdGhlIGNvbXBvbmVudCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgcGFyYW1ldGVyXG4gICAgJGRvYy50cmlnZ2VyKGAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWAsIFt0aGlzLCAuLi5hcmdzXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGEgY3VzdG9tIGRvY3VtZW50IGV2ZW50IG9uIGFuIGVsZW1lbnQgb24gdGhlIENvbXBvbmVudC5cbiAgICogVGhlIGV2ZW50IHRyaWdnZXJlZCB3aWxsIGJlIGBOQU1FU1BBQ0U6ZXZlbnROYW1lYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAgICogQHBhcmFtIHtBbnl9IC4uLmFyZ3NcbiAgICovXG4gIHRyaWdnZXJFdmVudE9uU2VsZWN0b3IgKGV2ZW50TmFtZSwgc2VsZWN0b3IsIC4uLmFyZ3MpIHtcbiAgICBzZWxlY3RvciA9IGdldFRhcmdldFNlbGVjdG9yKHNlbGVjdG9yLCB0aGlzKVxuXG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlN9XSB0cmlnZ2VyRXZlbnRPblNlbGVjdG9yOiAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWApXG5cbiAgICAvLyBBbHdheXMgcGFzcyB0aGUgY29tcG9uZW50IGFzIHRoZSBmaXJzdCBhcmd1bWVudCBwYXJhbWV0ZXJcbiAgICAkKHNlbGVjdG9yKS50cmlnZ2VyKGAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWAsIFt0aGlzLCAuLi5hcmdzXSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudFxuIiwiLyoqXG4gKiBMVkw5OSBFbnRpdHlcbiAqXG4gKiBCYXNlIGNsYXNzIHVzZWQgZm9yIHByb2dyYW1tYWJsZSBlbnRpdGllcyB3aXRoaW4gdGhlIGFwcCwgc3VjaCBhcyBjb21wb25lbnRzIG9yIG90aGVyIHN1Y2ggZW50aXRpZXMgdGhhdCByZWx5IG9uXG4gKiBzdGF0ZSBhbmQgbGlmZWN5Y2xlIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJylcbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoLm1lcmdlJylcbmNvbnN0IG9iamVjdFBhdGggPSByZXF1aXJlKCdvYmplY3QtcGF0aCcpXG5jb25zdCB7XG4gIGV4cG9zZVByaXZhdGVQcm9wZXJ0aWVzXG59ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5oZXJpdGFuY2UnKVxuXG4vKipcbiAqIFRoZSBFbnRpdHkncyBiYXNlIHByb3BlcnRpZXNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBFbnRpdHlQcm9wZXJ0aWVzID0ge1xuICAvKipcbiAgICogTkFNRVNQQUNFXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgY3VzdG9tIGV2ZW50cyBhbmQgZXJyb3IgcmVwb3J0aW5nXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBfTlM6ICdMVkw5OTpFbnRpdHknLFxuXG4gIC8qKlxuICAgKiBuYW1lc3BhY2VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBDU1MgY2xhc3NlcyAob25seSBpZiB0aGUgZW50aXR5IGhhcyBhbiBIVE1MRWxlbWVudClcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIF9uczogJ2x2bDk5LWVudGl0eScsXG5cbiAgLyoqXG4gICAqIFRoZSBwcm9wZXJ0aWVzIHNoYXJlZCBiZXR3ZWVuIGFsbCBpbnN0YW5jZXMgb2YgdGhpcyBFbnRpdHlcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9wcm9wZXJ0aWVzOiB7fSxcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgYXR0cmlidXRlcyB0byBsb2FkIGEgY3JlYXRlZCBFbnRpdHkgaW5zdGFuY2Ugd2l0aC5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9hdHRyaWJ1dGVzOiB7fVxufVxuXG5jbGFzcyBFbnRpdHkge1xuICAvKipcbiAgICogRW50aXR5IGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZygnTFZMOTk6RW50aXR5OmNvbnN0cnVjdG9yJywge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIHRoaXMuZXh0ZW5kKHtcbiAgICAgIF9hdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzXG4gICAgfSlcblxuICAgIC8vIEV4cG9zZSBwcml2YXRlIHZhbHVlc1xuICAgIGV4cG9zZVByaXZhdGVQcm9wZXJ0aWVzKHRoaXMpXG5cbiAgICAvLyBDcmVhdGUgYSB1bmlxdWUgSUQgZm9yIHRoaXMgRW50aXR5XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd1dWlkJywge1xuICAgICAgdmFsdWU6IGAke3RoaXMuTlN9OiR7dXVpZC52NCgpfWAsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBFbnRpdHkgd2l0aCBhbnkgZ2l2ZW4ge09iamVjdH0gYXJndW1lbnRzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAuLi5hcmd1bWVudHNcbiAgICogQHJldHVybnMge1NlbGZ9XG4gICAqL1xuICBleHRlbmQgKCkge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKCdMVkw5OTpFbnRpdHk6ZXh0ZW5kJywge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIC8vIE1lcmdlIHRoZSBwcm9wZXJ0aWVzIHdpdGggdGhlIGluc3RhbnRpYXRlZCBhdHRyaWJ1dGVzIGFuZCBjb25jYXRlbmF0ZWQgcHVibGljIG1ldGhvZHNcbiAgICBtZXJnZSh0aGlzLCBFbnRpdHlQcm9wZXJ0aWVzLCAuLi5hcmd1bWVudHMpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBFbnRpdHkncyBwcm9wZXJ0eSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXG4gICAqIEByZXR1cm4ge01peGVkfVxuICAgKi9cbiAgZ2V0UHJvcCAocHJvcE5hbWUpIHtcbiAgICBpZiAoIXByb3BOYW1lIHx8IHR5cGVvZiBwcm9wTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIGdldDogJ3Byb3BOYW1lJyB2YWx1ZSBpcyBpbnZhbGlkYClcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQodGhpcy5wcm9wZXJ0aWVzLCBwcm9wTmFtZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYW4gRW50aXR5J3MgcHJvcGVydHkgdG8gYSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHByb3BWYWx1ZVxuICAgKi9cbiAgc2V0UHJvcCAocHJvcE5hbWUsIHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcE5hbWUgfHwgdHlwZW9mIHByb3BOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aGlzLk5TfV0gc2V0OiAncHJvcE5hbWUnIHZhbHVlIGlzIGludmFsaWRgKVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RQYXRoLnNldCh0aGlzLnByb3BlcnRpZXMsIHByb3BOYW1lLCBwcm9wVmFsdWUpXG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIEVudGl0eSdzIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGF0dHJOYW1lXG4gICAqIEByZXR1cm4ge01peGVkfVxuICAgKi9cbiAgZ2V0QXR0ciAoYXR0ck5hbWUpIHtcbiAgICBpZiAoIWF0dHJOYW1lIHx8IHR5cGVvZiBhdHRyTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIGdldEF0dHI6ICdhdHRyTmFtZScgdmFsdWUgaXMgaW52YWxpZGApXG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGguZ2V0KHRoaXMuYXR0cmlidXRlcywgYXR0ck5hbWUpXG4gIH1cblxuICAvKipcbiAgICogU2V0IGFuIEVudGl0eSdzIHByb3BlcnR5IHRvIGEgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyTmFtZVxuICAgKiBAcGFyYW0ge01peGVkfSBhdHRyVmFsdWVcbiAgICovXG4gIHNldEF0dHIgKGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBpZiAoIWF0dHJOYW1lIHx8IHR5cGVvZiBhdHRyTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIHNldEF0dHI6ICdhdHRyTmFtZScgdmFsdWUgaXMgaW52YWxpZGApXG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KHRoaXMuYXR0cmlidXRlcywgYXR0ck5hbWUsIGF0dHJWYWx1ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBFbnRpdHlcbiAgICovXG4gIGluaXQgKCkge31cblxuICAvKipcbiAgICogRGVzdHJveSBhbmQgdGVhciBkb3duIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGRlc3Ryb3kgKCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHlcbiIsIi8qKlxuICogTFZMOTkgQ29yZVxuICpcbiAqIENvcmUgY2xhc3NlcyB1c2VkIHRocm91Z2hvdXQgdGhlIGZyYW1ld29ya1xuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKVxuY29uc3QgQXBwID0gcmVxdWlyZSgnLi9hcHAnKVxuY29uc3QgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKVxuXG5jb25zdCBjb3JlID0ge1xuICBFbnRpdHksXG4gIEFwcCxcbiAgQ29tcG9uZW50XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29yZVxuIiwiLyoqXG4gKiBMVkw5OVxuICpcbiAqIFRoZSB3aG9sZSBmcmFtZXdvcmsgaW4gb25lIGRpc2NyZXRlIHBhY2thZ2VcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJylcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpXG5jb25zdCBjb3JlID0gcmVxdWlyZSgnLi9jb3JlJylcbmNvbnN0IHRvb2xzID0gcmVxdWlyZSgnLi90b29scycpXG5cbmNvbnN0IGx2bDk5ID0ge1xuICBjb21tb24sXG4gIGNvcmUsXG4gIHV0aWxzLFxuICB0b29sc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGx2bDk5XG4iLCIvKipcbiAqIExWTDk5IEJyZWFrcG9pbnRzXG4gKiBEZXRlY3QgdmlhIEpTIHdoYXQgdGhlIGJyZWFrcG9pbnQgaXMgYnkga2V5d29yZFxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKVxuXG5mdW5jdGlvbiBCcmVha3BvaW50cyAoc2l6ZXMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmaW5lZCBicmVha3BvaW50IG5hbWVzIHdpdGggbWluL21heCB3aWR0aHMgKGluIDcyZHBpIHBpeGVscylcbiAgICAgKiBTaG91bGQgY29pbmNpZGUgd2l0aCBDU1MgZm9yIG9wdGltdW0gZXhwZWN0ZWQgYmVoYXZpb3VyXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgc2l6ZXNcbiAgICAgKiBAdHlwZSB7T2JqZWN0fSA9PiB7QXJyYXl9IFswID0ge051bWJlcn0gbWluV2lkdGgsIDEgPSB7TnVtYmVyfSBtYXhXaWR0aF1cbiAgICAgKi9cbiAgICBzaXplczogc2l6ZXMgfHwge1xuICAgICAgJ3hzJzogICAgICAgWzAsICAgIDM5OV0sXG4gICAgICAnbW9iaWxlJzogICBbMCwgICAgNzk5XSxcbiAgICAgICdtcyc6ICAgICAgIFs0MDAsICA1OTldLFxuICAgICAgJ3MnOiAgICAgICAgWzYwMCwgIDc5OV0sXG4gICAgICAnbSc6ICAgICAgICBbODAwLCAgOTk5XSxcbiAgICAgICd0YWJsZXQnOiAgIFs4MDAsICAxMTk5XSxcbiAgICAgICdsJzogICAgICAgIFsxMDAwLCAxMTk5XSxcbiAgICAgICdsYXB0b3AnOiAgIFsxMDAwLCAxMzk5XSxcbiAgICAgICdjb21wdXRlcic6IFsxMDAwLCA5OTk5OV0sXG4gICAgICAneGwnOiAgICAgICBbMTIwMCwgMTM5OV0sXG4gICAgICAnZGVza3RvcCc6ICBbMTIwMCwgOTk5OTldLFxuICAgICAgJ3h4bCc6ICAgICAgWzE0MDAsIDk5OTk5XVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzdHJpbmcgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgYnJlYWtwb2ludHNcbiAgICAgKiBAbWV0aG9kIGdldEFjdGl2ZVxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRBY3RpdmUgKCkge1xuICAgICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgIGxldCBicCA9IFtdXG5cbiAgICAgIGZvciAobGV0IHggaW4gdGhpcy5zaXplcykge1xuICAgICAgICBpZiAodGhpcy5zaXplcy5oYXNPd25Qcm9wZXJ0eSh4KSAmJiB3aWR0aCA+PSB0aGlzLnNpemVzW3hdWzBdICYmIHdpZHRoIDw9IHRoaXMuc2l6ZXNbeF1bMV0pIHtcbiAgICAgICAgICBicC5wdXNoKHgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJwXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgYnJlYWtwb2ludCBrZXl3b3JkIGlzIGN1cnJlbnRseSBhY3RpdmVcbiAgICAgKiBAbWV0aG9kIGlzQWN0aXZlXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNBY3RpdmUgKGlucHV0KSB7XG4gICAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpbnB1dCA9IGlucHV0LmpvaW4oJ3wnKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBpbnB1dCA9IG5ldyBSZWdFeHAoJ1xcXFxiKD86JyArIGlucHV0LnJlcGxhY2UoL1tcXHMsXSsvZywgJ3wnKSArICcpXFxcXGInLCAnaScpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbnB1dC50ZXN0KHRoaXMuZ2V0QWN0aXZlKCkrJycpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnJlYWtwb2ludHNcbiIsIi8qKlxuICogTFZMOTkgRGVidWdcbiAqIEEgY29uc29sZS1saWtlIHJlcGxhY2VtZW50IHdoaWNoIGNyZWF0ZXMgYSBub29wIGNvbnNvbGUgb2JqZWN0IGlmIHlvdSBkb24ndCB3YW50IHRvIG91dHB1dCBzdHVmZiB2aWEgdGhlIGNvbnNvbGVcbiAqL1xuXG5mdW5jdGlvbiBub29wICgpIHt9XG5cbi8qKlxuICogRGVidWdcbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNpbGVudCBTZXQgdG8gdHJ1ZSB0byBtYWtlIHRoZSBjb25zb2xlIGJlaGF2aW91cnMgc2lsZW50XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRGVidWcgKHNpbGVudCA9IGZhbHNlKSB7XG4gIGlmIChzaWxlbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xlYXI6IG5vb3AsXG4gICAgICBjb3VudDogbm9vcCxcbiAgICAgIGRlYnVnOiBub29wLFxuICAgICAgZXJyb3I6IG5vb3AsXG4gICAgICBncm91cDogbm9vcCxcbiAgICAgIGluZm86IG5vb3AsXG4gICAgICBsb2c6IG5vb3AsXG4gICAgICB0YWJsZTogbm9vcCxcbiAgICAgIHRpbWU6IG5vb3AsXG4gICAgICB0aW1lRW5kOiBub29wLFxuICAgICAgdHJhY2U6IG5vb3AsXG4gICAgICB3YXJuOiBub29wXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb25zb2xlIHx8IHdpbmRvdy5jb25zb2xlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEZWJ1Z1xuIiwiLyoqXG4gKiBMVkw5OSBUb29sc1xuICpcbiAqIFN0YW5kYWxvbmUgdG9vbHMgdGhhdCBkb24ndCByZXF1aXJlIGFueSBkZXBlbmRlbmNpZXMgd2l0aGluIHRoZSBmcmFtZXdvcmssIGJ1dCB3b3JrIGFsb25nc2lkZVxuICovXG5cbmNvbnN0IEJyZWFrcG9pbnRzID0gcmVxdWlyZSgnLi9icmVha3BvaW50cycpXG5jb25zdCBEZWJ1ZyA9IHJlcXVpcmUoJy4vZGVidWcnKVxuY29uc3QgUXVldWUgPSByZXF1aXJlKCcuL3F1ZXVlJylcbmNvbnN0IFRyYWNrRXZlbnQgPSByZXF1aXJlKCcuL3RyYWNrZXZlbnQnKVxuY29uc3QgU21vb3RoU2Nyb2xsID0gcmVxdWlyZSgnLi9zbW9vdGgtc2Nyb2xsJylcblxuY29uc3QgdXRpbHMgPSB7XG4gIEJyZWFrcG9pbnRzLFxuICBEZWJ1ZyxcbiAgUXVldWUsXG4gIFRyYWNrRXZlbnQsXG4gIFNtb290aFNjcm9sbFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvb2xzXG4iLCIvKipcbiAqIExWTDk5IFF1ZXVlXG4gKlxuICogQmF0Y2ggYWN0aW9ucyBpbnRvIGEgZGVib3VuY2VkIHF1ZXVlXG4gKiBVc2VmdWwgdG8gcmVkdWNlIGFtb3VudCBvZiB3b3JrIGNvbXB1dGVyL2Jyb3dzZXIgZG9lc1xuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKVxuXG4vKipcbiAqIFF1ZXVlIGNsYXNzXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBRdWV1ZSAob3B0aW9ucykge1xuICAvKipcbiAgICogUXVldWUgb3B0aW9uc1xuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbGV0IF9vcHRpb25zID0gbWVyZ2Uoe1xuICAgIHF1ZXVlOiB7fSxcbiAgICB0aW1lcjogMCxcbiAgICB0aW1lckRlbGF5OiAxMDBcbiAgfSwgb3B0aW9ucylcblxuICAvKipcbiAgICogVGhlIGJhdGNoZWQgcXVldWVcbiAgICogUXVldWUgYWN0aW9ucyBhcmUgYmF0Y2hlZCBpbiBhbiB7T2JqZWN0fSB3aXRoIGEgc3BlY2lmaWMgbGFiZWxcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfcXVldWUgPSBfb3B0aW9ucy5xdWV1ZVxuXG4gIC8qKlxuICAgKiBUaGUgcXVldWUgdGltZXJcbiAgICogV2hlbiB0aGUgcXVldWUgaXMgYWRkZWQgdG8sIHRoZSB0aW1lciBpcyB1cGRhdGVkIHdpdGggYSBgc2V0VGltZW91dGAgY2FsbCB0byB0aGUgYHJ1bmAgZnVuY3Rpb25cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfdGltZXIgPSBfb3B0aW9ucy50aW1lclxuXG4gIC8qKlxuICAgKiBUaGUgcXVldWUgdGltZXIgZGVsYXlcbiAgICogVGhlIGRlbGF5IGJldHdlZW4gcXVldWUgdGltZXIgdXBkYXRlcyAoaW4gbWlsbGlzZWNvbmRzKVxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxMDBcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfdGltZXJEZWxheSA9IF9vcHRpb25zLnRpbWVyRGVsYXlcblxuICAvKipcbiAgICogVGhlIHBsYXkgc3RhdHVzXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqIEBkZWZhdWx0IDFcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfc3RhdHVzID0gMVxuXG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogUXVldWUgYW4gYWN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTGFiZWwgQSB1bmlxdWUgbGFiZWwgZm9yIHRoZSBhY3Rpb24gaW4gdGhlIHF1ZXVlLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYW4gYmUgc2V0IHRvIHt1bmRlZmluZWR9ICh3aGljaCBtZWFucyB0aGUgYWN0aW9uIGNhbid0IGJlIHJlbW92ZWQpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIGFjdGlvblxuICAgICAqIEBwYXJhbSB7TWl4ZWR9IC4uLmFyZ3MgVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBhY3Rpb24gaGFuZGxlclxuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHF1ZXVlIChhY3Rpb25MYWJlbCwgYWN0aW9uLCAuLi5hcmdzKSB7XG4gICAgICAvLyBEZWZhdWx0IGFjdGlvbkxhYmVsIGlzIHRpbWUgdmFsdWUgYXMgc3RyaW5nXG4gICAgICBpZiAoIWFjdGlvbkxhYmVsKSB7XG4gICAgICAgIGFjdGlvbkxhYmVsID0gRGF0ZS5ub3coKSArICcnXG4gICAgICB9XG5cbiAgICAgIC8vIEFzc2lnbiB0aGUgZnVuY3Rpb24gdG8gdGhlIHF1ZXVlXG4gICAgICBpZiAoYWN0aW9uTGFiZWwgJiYgYWN0aW9uICYmIHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgX3F1ZXVlW2FjdGlvbkxhYmVsXSA9IHtcbiAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgYXJnczogYXJnc1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEBjaGFpbmFibGVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCBhY3Rpb24gdG8gdGhlIHF1ZXVlLiBBZnRlciBhZGRpbmcgdGhpcyB3aWxsIHN0YXJ0IHRoZSBxdWV1ZSB0aW1lciB0byB0aGVuIHJ1biB0aGUgcXVldWUgYWZ0ZXIgdGhlIGRlbGF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTGFiZWwgQSB1bmlxdWUgbGFiZWwgZm9yIHRoZSBhY3Rpb24gaW4gdGhlIHF1ZXVlLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYW4gYmUgc2V0IHRvIHt1bmRlZmluZWR9ICh3aGljaCBtZWFucyB0aGUgYWN0aW9uIGNhbid0IGJlIHJlbW92ZWQpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIGFjdGlvblxuICAgICAqIEBwYXJhbSB7TWl4ZWR9IC4uLmFyZ3MgVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBhY3Rpb24gaGFuZGxlclxuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIGFkZCAoYWN0aW9uTGFiZWwsIGFjdGlvbiwgLi4uYXJncykge1xuICAgICAgLy8gUXVldWUgdGhlIGFjdGlvblxuICAgICAgdGhpcy5xdWV1ZShhY3Rpb25MYWJlbCwgYWN0aW9uLCAuLi5hcmdzKVxuXG4gICAgICAvLyBQbGF5IHRoZSB0aW1lciB0byBnZXQgdGhlIHF1ZXVlIHRvIHJ1biBhZnRlciBhIGRlbGF5IChvbmx5IHdoZW4gcGxheWluZylcbiAgICAgIGlmIChfc3RhdHVzKSB7XG4gICAgICAgIHRoaXMucGxheSgpXG4gICAgICB9XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICAvLyBAZGVidWdcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ3F1ZXVlIGlzIGN1cnJlbnRseSBwYXVzZWQnKVxuICAgICAgLy8gfVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGQgYWN0aW9uIGFuZCB0aGVuIHJ1biB0aGUgcXVldWUgaW1tZWRpYXRlbHlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25MYWJlbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvblxuICAgICAqIEBwYXJhbSB7TWl4ZWR9IGFjdGlvbkFyZ3NcbiAgICAgKiBAcmV0dXJuIHtTZWxmfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBzeW5jIChhY3Rpb25MYWJlbCwgYWN0aW9uLCAuLi5hcmdzKSB7XG4gICAgICBjbGVhclRpbWVvdXQoX3RpbWVyKVxuXG4gICAgICAvLyBRdWV1ZSBhY3Rpb24uLi5cbiAgICAgIHRoaXMucXVldWUoYWN0aW9uTGFiZWwsIGFjdGlvbiwgLi4uYXJncylcblxuICAgICAgLy8gLi4uIFRoZW4gcnVuIHRoZSBxdWV1ZSBpbW1lZGlhdGVseVxuICAgICAgdGhpcy5ydW4oKVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGFjdGlvbiBieSBpdHMgbGFiZWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25MYWJlbFxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZHxPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QWN0aW9uQnlMYWJlbCAoYWN0aW9uTGFiZWwpIHtcbiAgICAgIGlmIChfcXVldWUuaGFzT3duUHJvcGVydHkoYWN0aW9uTGFiZWwpKSB7XG4gICAgICAgIHJldHVybiBfcXVldWVbYWN0aW9uTGFiZWxdXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFjdGlvbiBmcm9tIHF1ZXVlLiBDYW4gb25seSByZW1vdmUgYWN0aW9ucyBpZiB5b3Uga25vdyB0aGVpciBsYWJlbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbkxhYmVsXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcmVtb3ZlIChhY3Rpb25MYWJlbCkge1xuICAgICAgaWYgKF9xdWV1ZS5oYXNPd25Qcm9wZXJ0eShhY3Rpb25MYWJlbCkpIHtcbiAgICAgICAgX3F1ZXVlW2FjdGlvbkxhYmVsXSA9IHVuZGVmaW5lZFxuICAgICAgICBkZWxldGUgX3F1ZXVlW2FjdGlvbkxhYmVsXVxuICAgICAgfVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQbGF5IHRoZSBxdWV1ZSB0aW1lciAod2lsbCBydW4gcXVldWUgYWZ0ZXIgdGltZXIgZGVsYXkpXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTZWxmfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBwbGF5ICgpIHtcbiAgICAgIC8vIE9ubHkgcGxheSBpZiBhbHJlYWR5IHBhdXNlZFxuICAgICAgY2xlYXJUaW1lb3V0KF90aW1lcilcblxuICAgICAgLy8gU2V0IHRvIHBsYXlpbmdcbiAgICAgIF9zdGF0dXMgPSAxXG5cbiAgICAgIC8vIFJlc2V0IHRpbWVyIHRvIHJ1biB0aGUgcXVldWVcbiAgICAgIF90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gcnVuUXVldWVQcm9jZXNzQWZ0ZXJEZWxheShxdWV1ZUluc3RhbmNlKSB7XG4gICAgICAgIHF1ZXVlSW5zdGFuY2UucnVuKClcbiAgICAgIH0odGhpcyksIF90aW1lckRlbGF5KVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQYXVzZSB0aGUgcXVldWUgdGltZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHBhdXNlICgpIHtcbiAgICAgIC8vIE9ubHkgcGF1c2UgaWYgYWxyZWFkeSBwbGF5aW5nXG4gICAgICBjbGVhclRpbWVvdXQoX3RpbWVyKVxuXG4gICAgICAvLyBTZXQgdG8gcGF1c2VkXG4gICAgICBfc3RhdHVzID0gMFxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzL3J1biBhbGwgdGhlIGFjdGlvbnMgaW4gdGhlIHF1ZXVlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTZWxmfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBydW4gKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KF90aW1lcilcblxuICAgICAgLy8gTm8gaXRlbXMgaW4gdGhlIHF1ZXVlLCBzbyBzZXQgdG8gcGF1c2VcbiAgICAgIGlmICghT2JqZWN0LmtleXMoX3F1ZXVlKS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgIH1cblxuICAgICAgLy8gUHJvY2VzcyB0aGUgcXVldWVcbiAgICAgIGZvciAobGV0IGFjdGlvbkxhYmVsIGluIF9xdWV1ZSkge1xuICAgICAgICBpZiAoX3F1ZXVlLmhhc093blByb3BlcnR5KGFjdGlvbkxhYmVsKSAmJiBfcXVldWVbYWN0aW9uTGFiZWxdKSB7XG4gICAgICAgICAgbGV0IHF1ZXVlZEl0ZW0gPSBfcXVldWVbYWN0aW9uTGFiZWxdXG5cbiAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygncnVubmluZyBxdWV1ZWQgaXRlbScsIHF1ZXVlZEl0ZW0pXG5cbiAgICAgICAgICAvLyBGdW5jdGlvblxuICAgICAgICAgIGlmIChxdWV1ZWRJdGVtICYmIHR5cGVvZiBxdWV1ZWRJdGVtID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBxdWV1ZWRJdGVtKClcblxuICAgICAgICAgIC8vIE9iamVjdFxuICAgICAgICAgIH0gZWxzZSBpZiAocXVldWVkSXRlbS5oYXNPd25Qcm9wZXJ0eSgnYWN0aW9uJykgJiYgdHlwZW9mIHF1ZXVlZEl0ZW0uYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBBcHBseSBhcmd1bWVudHMgdG8gdGhlIGFjdGlvblxuICAgICAgICAgICAgaWYgKHF1ZXVlZEl0ZW0uaGFzT3duUHJvcGVydHkoJ2FyZ3MnKSAmJiBxdWV1ZWRJdGVtLmFyZ3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICBxdWV1ZWRJdGVtLmFjdGlvbiguLi5xdWV1ZWRJdGVtLmFyZ3MpXG5cbiAgICAgICAgICAgIC8vIFJ1biB0aGUgYWN0aW9uIGxpa2Ugbm9ybWFsXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBxdWV1ZWRJdGVtLmFjdGlvbigpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZXRlIHRoZSBxdWV1ZWQgaXRlbVxuICAgICAgICAgIF9xdWV1ZVthY3Rpb25MYWJlbF0gPSB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgX3F1ZXVlW2FjdGlvbkxhYmVsXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvbnRpbnVlIHBsYXlpbmcgaWYgaW4gcGxheSBtb2RlXG4gICAgICAvLyBpZiAoX3N0YXR1cykge1xuICAgICAgLy8gICB0aGlzLnBsYXkoKVxuICAgICAgLy8gfVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHN0YXR1cyBvZiB0aGUgcXVldWU6XG4gICAgICogICAwID0gUGF1c2VkXG4gICAgICogICAxID0gUGxheWluZ1xuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgY2hlY2tTdGF0dXMgKCkge1xuICAgICAgcmV0dXJuIF9zdGF0dXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aW1lciBkZWxheVxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRUaW1lckRlbGF5ICgpIHtcbiAgICAgIHJldHVybiBfdGltZXJEZWxheVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRpbWVyIGRlbGF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGltZXJEZWxheVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKiBAcmV0dXJucyB7U2VsZn1cbiAgICAgKi9cbiAgICBzZXRUaW1lckRlbGF5ICh0aW1lckRlbGF5KSB7XG4gICAgICAvLyBPbmx5IHNldCBpZiB0aW1lckRlbGF5IGlzIGdyZWF0ZXIgdGhhbiAwXG4gICAgICBpZiAodGltZXJEZWxheSAmJiB0aW1lckRlbGF5ID4gMCkge1xuICAgICAgICBfdGltZXJEZWxheSA9IHRpbWVyRGVsYXlcbiAgICAgIH1cblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsZW5ndGggb2YgdGhlIHF1ZXVlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0UXVldWVMZW5ndGggKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKF9xdWV1ZSkubGVuZ3RoXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUXVldWVcbiIsIi8qKlxuICogTFZMOTkgU21vb3RoIFNjcm9sbFxuICpcbiAqIFNtb290aGx5IHNjcm9sbCB0byBpbnRlcm5hbCBhbmNob3IgbGlua3Mgb24gYSBwYWdlLlxuICpcbiAqICMjIFVzYWdlXG4gKlxuICogU21vb3RoIFNjcm9sbCBuZWVkcyB0byBiZSBpbml0aWFsaXNlZCB3aXRoIGpRdWVyeSBhbmQgYW55IGNvbmZpZ3VyZWQgb3B0aW9ucy4gRHVyaW5nIGluaXRpYWxpc2F0aW9uIHRoZSBzY3JpcHQgd2lsbFxuICogYXBwbHkgdGhlIGJlaGF2aW91cnMgdG8gYW55IGFwcGxpY2FibGUgYW5jaG9yIGxpbmtzLlxuICpcbiAqIGBgYFxuICogICBsZXQgU21vb3RoU2Nyb2xsID0gcmVxdWlyZSgnbHZsOTkvZXM2L3Rvb2xzL3Ntb290aC1zY3JvbGwnKShqUXVlcnksIHsgYnVmZmVyVG9wOiAwIH0pXG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGFsc28gaW5pdGlhbGlzZSB0aGUgc21vb3RoU2Nyb2xsIGJlaGF2aW91cnMgYnkgY2FsbGluZyBgc21vb3RoU2Nyb2xsLmluaXQoKWAuIFRoaXMgd2lsbCBhdHRhY2ggdGhlIG5lY2Vzc2FyeVxuICogZXZlbnRzIG9uIHRvIGFuY2hvciBsaW5rcy5cbiAqXG4gKiBZb3UgY2FuIHRyaWdnZXIgdGhlIHNjcm9sbFRvIGV2ZW50IGJ5IHVzaW5nIHRoZSBjdXN0b20gZXZlbnQgYFNtb290aFNjcm9sbC5zY3JvbGxUb2AsIGUuZy46XG4gKlxuICogYGBgXG4gKiAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ1Ntb290aFNjcm9sbC5zY3JvbGxUbycsIFsgc2Nyb2xsVG9PcHRpb25zIF0pXG4gKiBgYGBcbiAqXG4gKiBUaGUgYHNjcm9sbFRvYCBmdW5jdGlvbiBlbWl0cyBhIGN1c3RvbSBldmVudCBgU21vb3RoU2Nyb2xsLnNjcm9sbFRvOnN0YXJ0YCB3aGVuIHRoZSBhY3Rpb24gaXMgaW52b2tlZCBhbmRcbiAqIGBTbW9vdGhTY3JvbGwuc2Nyb2xsVG86ZW5kYCB3aGVuIGl0IGZpbmlzaGVzLlxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgU21vb3RoU2Nyb2xsID0gZnVuY3Rpb24gKCQsIG9wdGlvbnMpIHtcbiAgLyoqXG4gICAqIExvYWQgaW4gdGhlIHNldHRpbmdzXG4gICAqL1xuICBjb25zdCBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcbiAgICAvLyBUaGUgc3BhY2UgYmV0d2VlbiB0aGUgdG9wIG9mIHRoZSB3aW5kb3cgYW5kIHRoZSB0b3Agb2YgdGhlIHRhcmdldFxuICAgIGJ1ZmZlclRvcDogMCxcblxuICAgIC8vIFRoZSBzcGVlZCB0byBzY3JvbGwgdGhlIHdpbmRvd1xuICAgIHNjcm9sbFNwZWVkOiAxMDAwLFxuXG4gICAgLy8gVGhlIGRpc3RhbmNlIGZyb20gdG9wIG9mIHdpbmRvdyB0byB0b3Agb2YgdGFyZ2V0IGVsZW1lbnQgdG8gdHJpZ2dlciBzY3JvbGxpbmdcbiAgICB0cmlnZ2VyRGlzdGFuY2U6IDQwMFxuICB9LCBvcHRpb25zKVxuXG4gIC8qKlxuICAgKiBTbW9vdGhseSBzY3JvbGwgdG8gYSB0YXJnZXRcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8alF1ZXJ5T2JqZWN0fSB0YXJnZXRcbiAgICovXG4gIGZ1bmN0aW9uIHNjcm9sbFRvICh0YXJnZXQsIHNjcm9sbFRvT3B0aW9ucykge1xuICAgIC8vIEZpZ3VyZSBvdXQgZWxlbWVudCB0byBzY3JvbGwgdG9cbiAgICBsZXQgJHRhcmdldCA9ICQodGFyZ2V0KS5ub3QoJ1tkYXRhLWRpc2FibGUtc21vb3RoLXNjcm9sbF0nKVxuXG4gICAgLy8gTW9yZSB0aGFuIG9uZSB0YXJnZXQsIGRlZmF1bHQgdG8gZmlyc3RcbiAgICAkdGFyZ2V0ID0gKCR0YXJnZXQubGVuZ3RoID4gMSA/ICR0YXJnZXQuZXEoMCkgOiAkdGFyZ2V0KVxuXG4gICAgLy8gRG9lcyBhIHNjcm9sbCB0YXJnZXQgZXhpc3Q/XG4gICAgaWYgKCR0YXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBMb2FkIGluIHBlci11c2Ugc2V0dGluZ3NcbiAgICAgIGxldCBzY3JvbGxUb1NldHRpbmdzID0gJC5leHRlbmQoe30sIHNldHRpbmdzLCBzY3JvbGxUb09wdGlvbnMpXG5cbiAgICAgIC8vIEdldCB0aGUgdGFyZ2V0J3MgdG9wIG9mZnNldFxuICAgICAgbGV0IHRhcmdldE9mZnNldFRvcCA9ICR0YXJnZXQub2Zmc2V0KCkudG9wXG5cbiAgICAgIC8vIEdldCBjdXJyZW50IHdpbmRvdyBzY3JvbGxUb3BcbiAgICAgIGxldCB3aW5kb3dTY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKClcblxuICAgICAgLy8gU3VwcG9ydCBkeW5hbWljIGJ1ZmZlclRvcCBpZiBpdCBpcyBhIGZ1bmN0aW9uXG4gICAgICBsZXQgc2Nyb2xsVG9wID0gdGFyZ2V0T2Zmc2V0VG9wIC0gKHR5cGVvZiBzY3JvbGxUb1NldHRpbmdzLmJ1ZmZlclRvcCA9PT0gJ2Z1bmN0aW9uJyA/IHNjcm9sbFRvU2V0dGluZ3MuYnVmZmVyVG9wKCkgOiBzY3JvbGxUb1NldHRpbmdzLmJ1ZmZlclRvcClcblxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciB0aGUgc2Nyb2xsIGlmIHRoZSBkaXN0YW5jZSBpcyB3aXRoaW5cbiAgICAgIGxldCBjaGVja1RyaWdnZXJEaXN0YW5jZSA9IE1hdGguYWJzKHdpbmRvd1Njcm9sbFRvcCAtIHNjcm9sbFRvcClcbiAgICAgIGlmIChjaGVja1RyaWdnZXJEaXN0YW5jZSA8IHNjcm9sbFRvU2V0dGluZ3MudHJpZ2dlckRpc3RhbmNlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEVtaXQgc3RhcnQgZXZlbnRcbiAgICAgICAqXG4gICAgICAgKiBAZXZlbnQgU21vb3RoU2Nyb2xsLnNjcm9sbFRvOnN0YXJ0XG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeU9iamVjdH0gJHRhcmdldFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9XG4gICAgICAgKi9cbiAgICAgICR0YXJnZXQudHJpZ2dlcignU21vb3RoU2Nyb2xsLnNjcm9sbFRvOnN0YXJ0JywgWyBzY3JvbGxUb1NldHRpbmdzIF0pXG5cbiAgICAgIC8vIERvIHRoZSBzY3JvbGwgdGhpbmdcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wXG4gICAgICB9LCBzY3JvbGxUb1NldHRpbmdzLnNjcm9sbFNwZWVkLCAoKSA9PiB7XG4gICAgICAgIC8vIENhbGxiYWNrIGFmdGVyIGFuaW1hdGlvblxuICAgICAgICAvLyBNdXN0IGNoYW5nZSBmb2N1cyFcbiAgICAgICAgJHRhcmdldC5mb2N1cygpXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVtaXQgZW5kIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBTbW9vdGhTY3JvbGwuc2Nyb2xsVG86ZW5kXG4gICAgICAgICAqIEBwYXJhbSB7alF1ZXJ5T2JqZWN0fSAkdGFyZ2V0XG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgJHRhcmdldC50cmlnZ2VyKCdTbW9vdGhTY3JvbGwuc2Nyb2xsVG86ZW5kJywgWyBzY3JvbGxUb1NldHRpbmdzIF0pXG5cbiAgICAgICAgLy8gQ2hlY2tpbmcgaWYgdGhlIHRhcmdldCB3YXMgZm9jdXNlZFxuICAgICAgICBpZiAoJHRhcmdldC5pcygnOmZvY3VzJykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSBhbGwgbGlua3Mgb24gdGhlIHBhZ2Ugd2l0aCB0aGUgc21vb3RoU2Nyb2xsIGZ1bmN0aW9uYWxpdHlcbiAgICovXG4gIGZ1bmN0aW9uIGluaXQgKCkge1xuICAgIC8vIEF0dGFjaCBsaW5rIGJlaGF2aW91cnNcbiAgICAkKCdhW2hyZWYqPVwiI1wiXScpXG4gICAgLy8gUmVtb3ZlIGxpbmtzIHRoYXQgZG9uJ3QgYWN0dWFsbHkgbGluayB0byBhbnl0aGluZ1xuICAgICAgLm5vdCgnW2hyZWY9XCIjXCJdJylcbiAgICAgIC5ub3QoJ1tocmVmPVwiIzBcIl0nKVxuICAgICAgLmNsaWNrKGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgJGEgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnYScpXG4gICAgICAgIGNvbnN0IGhhc2ggPSAkYS5hdHRyKCdocmVmJykucmVwbGFjZSgvLiojKFteP10rKS4qLywgJyMkMScpXG4gICAgICAgIGlmICgkKGhhc2gpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgc2Nyb2xsVG8oaGFzaClcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIC8vIEF0dGFjaCBjdXN0b20gZXZlbnQgdG8gdHJpZ2dlciB0aHJvdWdoIERPTVxuICAgICQoZG9jdW1lbnQpLm9uKCdTbW9vdGhTY3JvbGwuc2Nyb2xsVG8nLCBmdW5jdGlvbiAoZXZlbnQsIHNjcm9sbFRvT3B0aW9ucykge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCkge1xuICAgICAgICBzY3JvbGxUbyhldmVudC50YXJnZXQsIHNjcm9sbFRvT3B0aW9ucylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGEgaGFzaCBpcyBsb2NhdGVkIGluIHRoZSB3aW5kb3cubG9jYXRpb24gYW5kIHNjcm9sbCB0byB0aGUgZWxlbWVudFxuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbFRvKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgc2Nyb2xsVG9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNtb290aFNjcm9sbFxuIiwiLyoqXG4gKiBMVkw5OSBUcmFjayBFdmVudFxuICogQ2FjaGVzIHRyYWNrZWQgZXZlbnRzIHVudGlsIEdvb2dsZSBBbmFseXRpY3MgaXMgbG9hZGVkLCB0aGVuIHVwbG9hZHMgdG8gR0FcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmZ1bmN0aW9uIFRyYWNrRXZlbnQgKGRlYnVnKSB7XG4gIC8qKlxuICAgKiBDb2xsZWN0IHRyYWNrZWQgZXZlbnRzIGJlZm9yZSBHQSBpcyBsb2FkZWRcbiAgICogQHR5cGUge0FycmF5fVxuICAgKi9cbiAgbGV0IHNhdmVkID0gW11cblxuICAvKipcbiAgICogU3RhcnQgY2hlY2tpbmcgdG8gc2VlIGlmIHRoZSBHQSBvYmplY3QgaXMgbG9hZGVkXG4gICAqL1xuICAvKipcbiAgICogRGV0ZWN0IGlmIEdBIGlzIGxvYWRlZCBhbmQgdGhlbiBzZW5kIGFueSBzdG9yZWQgR0EgZXZlbnRzXG4gICAqL1xuICB0aGlzLmdhTG9hZGVkVGltZXIgPSBzZXRJbnRlcnZhbCgoZnVuY3Rpb24gKGx2bDk5VHJhY2tFdmVudCkge1xuICAgIGxldCBpXG5cbiAgICAvLyBXYWl0IHVudGlsIEdBIG9iamVjdCBpcyBhdmFpbGFibGVcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5nYSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwobHZsOTlUcmFja0V2ZW50LmdhTG9hZGVkVGltZXIpXG5cbiAgICAgIC8vIFNlbmQgc2F2ZWQgZXZlbnRzXG4gICAgICBpZiAobHZsOTlUcmFja0V2ZW50LnNhdmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKGRlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBTZW5kaW5nICR7bHZsOTlUcmFja0V2ZW50LnNhdmVkLmxlbmd0aH0gdHJhY2tlZCBldmVudHMgdG8gZ2FgKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpIGluIGx2bDk5VHJhY2tFdmVudC5zYXZlZCkge1xuICAgICAgICAgIHdpbmRvdy5nYSgnc2VuZCcsIGx2bDk5VHJhY2tFdmVudC5zYXZlZFtpXSlcbiAgICAgICAgfVxuICAgICAgICBsdmw5OVRyYWNrRXZlbnQuc2F2ZWQgPSBbXVxuICAgICAgfVxuICAgIH1cbiAgfSh0aGlzKSksIDUwMDApXG5cbiAgLyoqXG4gICAqIFRyYWNrIGV2ZW50IG1hZ2ljXG4gICAqIEBwYXJhbSBldmVudENhdGVnb3J5XG4gICAqIEBwYXJhbSBldmVudEFjdGlvblxuICAgKiBAcGFyYW0gZXZlbnRMYWJlbFxuICAgKiBAcGFyYW0gZXZlbnRWYWx1ZVxuICAgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uIHRyYWNrIChldmVudENhdGVnb3J5LCBldmVudEFjdGlvbiwgZXZlbnRMYWJlbCwgZXZlbnRWYWx1ZSkge1xuICAgIGxldCB0cmFja2VkRXZlbnQgPSB7XG4gICAgICBoaXRUeXBlOiAnZXZlbnQnLFxuICAgICAgZXZlbnRDYXRlZ29yeTogZXZlbnRDYXRlZ29yeSxcbiAgICAgIGV2ZW50QWN0aW9uOiBldmVudEFjdGlvbixcbiAgICAgIGV2ZW50TGFiZWw6IGV2ZW50TGFiZWwsXG4gICAgICBldmVudFZhbHVlOiBldmVudFZhbHVlXG4gICAgfVxuXG4gICAgaWYgKCFldmVudENhdGVnb3J5IHx8ICFldmVudEFjdGlvbikgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgZXZlbnRWYWx1ZSA9PT0gJ3N0cmluZycpIHJldHVybjtcblxuICAgIC8vIEdBIGlzIGxvYWRlZFxuICAgIGlmICh0eXBlb2Ygd2luZG93LmdhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKGRlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZykge1xuICAgICAgICBjb25zb2xlLmxvZygnU2VuZCB0cmFja2VkRXZlbnQgdG8gR0EnLCB0cmFja2VkRXZlbnQpXG4gICAgICB9XG4gICAgICB3aW5kb3cuZ2EoJ3NlbmQnLCB0cmFja2VkRXZlbnQpXG5cbiAgICAgIC8vIHdhaXRpbmcgZm9yIEdBIHRvIGxvYWQsIHVzZSBpbnRlcm5hbCB2YXIgdG8gY29sbGVjdFxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZGVidWcgJiYgd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHQSBub3QgbG9hZGVkIHlldCwgc3RvcmUgdHJhY2tlZEV2ZW50JywgdHJhY2tlZEV2ZW50KVxuICAgICAgfVxuICAgICAgdGhpcy5zYXZlZC5wdXNoKHRyYWNrZWRFdmVudClcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUcmFja0V2ZW50XG4iLCIvKipcbiAqIExWTDk5IFV0aWxzXG4gKlxuICogVXRpbGl0aWVzIHVzZWQgdGhyb3VnaG91dCB0aGUgZnJhbWV3b3JrXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3QgaW5oZXJpdGFuY2UgPSByZXF1aXJlKCcuL2luaGVyaXRhbmNlJylcbi8vIGNvbnN0IHN1cGVyID0gcmVxdWlyZSgnLi9zdXBlcicpXG5cbmNvbnN0IHV0aWxzID0ge1xuICBwYXJzZSxcbiAgaW5oZXJpdGFuY2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsc1xuIiwiLyoqXG4gKiBMVkw5OSBJbmhlcml0YW5jZSB1dGlsaXRpZXNcbiAqL1xuXG5jb25zdCBSRV9QUklWQVRFID0gL15fL1xuXG4vKipcbiAqIEFzc2lnbiBwdWJsaWMgZ2V0dGVyL3NldHRlciBwcm9wZXJ0aWVzIHRvIHRoZSB0YXJnZXQuIFRoaXMgd2lsbCByZWZlcmVuY2UgdGhlIHRhcmdldCBwcm9wZXJ0eSAoaWYgaXQgaXMgc2V0KVxuICogb3RoZXJ3aXNlIHVzZSB0aGUgZGVmYXVsdCBwcm9wZXJ0eSB2YWx1ZS4gWW91IGNhbiBhbHNvIHdoaXRlbGlzdCB0aGUgcHJvcGVydGllcyB5b3Ugd2FudCB0byBzZWxlY3RpdmVseVxuICogZXhwb3NlIGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRQcm9wVmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSB3aGl0ZWxpc3RcbiAqL1xuZnVuY3Rpb24gZXhwb3NlQWxsUHJvcGVydGllcyAodGFyZ2V0LCBkZWZhdWx0UHJvcFZhbHVlcywgd2hpdGVsaXN0KSB7XG4gIGxldCBwcm9wZXJ0aWVzXG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHRhcmdldCB3YXMgZ2l2ZW4nKVxuICB9XG5cbiAgLy8gRmlsdGVyIG5vbi13aGl0ZWxpc3RlZCBwcm9wZXJ0aWVzXG4gIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpLmZpbHRlcihpdGVtID0+IHtcbiAgICByZXR1cm4gKHdoaXRlbGlzdCAmJiB3aGl0ZWxpc3QuaW5jbHVkZXMoaXRlbSkpIHx8ICF3aGl0ZWxpc3RcbiAgfSlcblxuICAvLyBAZGVidWdcbiAgLy8gY29uc29sZS5sb2coJ2ZpbHRlcmVkIHByb3BlcnRpZXMnLCBwcm9wZXJ0aWVzKVxuXG4gIGlmICghcHJvcGVydGllcyB8fCAhcHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHByb3BlcnRpZXMgd2VyZSBnaXZlbicpXG4gIH1cblxuICAvLyBEZWZhdWx0IHByb3AgdmFsdWVzIHRvIHRhcmdldFxuICBpZiAodHlwZW9mIGRlZmF1bHRQcm9wVmFsdWVzID09PSAndW5kZWZpbmVkJykge1xuICAgIGRlZmF1bHRQcm9wVmFsdWVzID0gdGFyZ2V0XG4gIH1cblxuICAvLyBQcm9jZXNzIGFuZCBleHBvc2UgdGhlIHByb3BlcnRpZXMgb24gdGhlIHRhcmdldFxuICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcE5hbWUgPT4ge1xuICAgIGxldCB1c2VQcm9wTmFtZSA9IHByb3BOYW1lXG5cbiAgICAvLyBQcml2YXRlIHZhbHVlcyBjYW4gb25seSBoYXZlIGEgcHVibGljIGdldHRlclxuICAgIGlmIChSRV9QUklWQVRFLnRlc3QocHJvcE5hbWUpKSB7XG4gICAgICB1c2VQcm9wTmFtZSA9IHByb3BOYW1lLnJlcGxhY2UoUkVfUFJJVkFURSwgJycpXG5cbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gY29uc29sZS5sb2coJ0ZvdW5kIHByaXZhdGUgcHJvcGVydHknLCB7XG4gICAgICAvLyAgIHByb3BOYW1lLFxuICAgICAgLy8gICB1c2VQcm9wTmFtZSxcbiAgICAgIC8vICAgcHJvcFZhbHVlOiBkZWZhdWx0UHJvcFZhbHVlc1twcm9wTmFtZV0sXG4gICAgICAvLyAgIHRhcmdldFxuICAgICAgLy8gfSlcblxuICAgICAgLy8gSGlkZSBvcmlnaW5hbCBwcml2YXRlIHZhbHVlXG4gICAgICAvLyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wTmFtZSwge1xuICAgICAgLy8gICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgLy8gfSlcblxuICAgICAgLy8gQ3JlYXRlIHB1YmxpYyBpbnRlcmZhY2VcbiAgICAgIGNyZWF0ZVB1YmxpY0dldFByb3BlcnR5KHRhcmdldCwgcHJvcE5hbWUsIHVzZVByb3BOYW1lLCBkZWZhdWx0UHJvcFZhbHVlc1twcm9wTmFtZV0pXG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZygnRm91bmQgcHVibGljIHByb3BlcnR5Jywge1xuICAgICAgLy8gICBwcm9wTmFtZSxcbiAgICAgIC8vICAgdXNlUHJvcE5hbWUsXG4gICAgICAvLyAgIHByb3BWYWx1ZTogcHJvcGVydGllc1twcm9wTmFtZV0sXG4gICAgICAvLyAgIHRhcmdldFxuICAgICAgLy8gfSlcblxuICAgICAgLy8gQ3JlYXRlIHB1YmxpYyBpbnRlcmZhY2VcbiAgICAgIGNyZWF0ZVB1YmxpY0dldFNldFByb3BlcnR5KHRhcmdldCwgcHJvcE5hbWUsIHVzZVByb3BOYW1lLCBkZWZhdWx0UHJvcFZhbHVlc1twcm9wTmFtZV0pXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIEV4cG9zZSBvbmx5IHRoZSBwcml2YXRlIHByb3BlcnRpZXMgbGlzdGVkIG9uIHRoZSB0YXJnZXQgd2l0aCBwdWJsaWMgZ2V0dGVyIHByb3BlcnR5LiBXaGl0ZWxpc3Qgb25seSB0aG9zZSB5b3Ugd2FudFxuICogYnkgYWRkaW5nIHRoZSBwcm9wZXJ0eSdzIG5hbWUgdG8gdGhlIHdoaXRlbGlzdCB7QXJyYXl9XG4gKlxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGRlZmF1bHRQcm9wVmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSB3aGl0ZWxpc3RcbiAqL1xuZnVuY3Rpb24gZXhwb3NlUHJpdmF0ZVByb3BlcnRpZXModGFyZ2V0LCBkZWZhdWx0UHJvcFZhbHVlcywgd2hpdGVsaXN0KSB7XG4gIGxldCBwcm9wZXJ0aWVzXG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHRhcmdldCB3YXMgZ2l2ZW4nKVxuICB9XG5cbiAgLy8gRmlsdGVyIG5vbi1wcml2YXRlIG9yIG5vbi13aGl0ZWxpc3RlZCBwcm9wZXJ0aWVzXG4gIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpLmZpbHRlcihpdGVtID0+IHtcbiAgICBpZiAoKHdoaXRlbGlzdCAmJiB3aGl0ZWxpc3QuaW5jbHVkZXMoaXRlbSkpIHx8ICF3aGl0ZWxpc3QpIHtcbiAgICAgIHJldHVybiBSRV9QUklWQVRFLnRlc3QoaXRlbSlcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG5cbiAgLy8gQGRlYnVnXG4gIC8vIGNvbnNvbGUubG9nKCdmaWx0ZXJlZCBwcm9wZXJ0aWVzJywgcHJvcGVydGllcylcblxuICAvLyBTaWxlbnQgZGVhdGhcbiAgaWYgKCFwcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gRGVmYXVsdCBwcm9wIHZhbHVlcyB0byB0YXJnZXRcbiAgaWYgKHR5cGVvZiBkZWZhdWx0UHJvcFZhbHVlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkZWZhdWx0UHJvcFZhbHVlcyA9IHRhcmdldFxuICB9XG5cbiAgLy8gUHJvY2VzcyBhbmQgZXhwb3NlIHRoZSBwcm9wZXJ0aWVzIG9uIHRoZSB0YXJnZXRcbiAgcHJvcGVydGllcy5mb3JFYWNoKHByb3BOYW1lID0+IHtcbiAgICBsZXQgdXNlUHJvcE5hbWUgPSBwcm9wTmFtZVxuXG4gICAgLy8gQ3JlYXRlIGEgcHVibGljIGhhbmRsZSBmb3IgdGhlIHByaXZhdGUgcHJvcGVydHkgKHJlbW92ZXMgdGhlIFwiX1wiIGF0IHRoZSBzdGFydClcbiAgICB1c2VQcm9wTmFtZSA9IHByb3BOYW1lLnJlcGxhY2UoUkVfUFJJVkFURSwgJycpXG5cbiAgICAvLyBDcmVhdGUgcHVibGljIGludGVyZmFjZVxuICAgIGNyZWF0ZVB1YmxpY0dldFByb3BlcnR5KHRhcmdldCwgcHJvcE5hbWUsIHVzZVByb3BOYW1lLCBkZWZhdWx0UHJvcFZhbHVlc1twcm9wTmFtZV0pXG4gIH0pXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcHVibGljIGdldHRlciBpbnRlcmZhY2UgZm9yIGEgcHJvcGVydHkgb24gYSB0YXJnZXRcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0UHJvcE5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXdQcm9wTmFtZVxuICogQHBhcmFtIHtNaXhlZH0gZGVmYXVsdFByb3BWYWx1ZSBVc2VkIGlmIHRoZSB0YXJnZXQncyB0YXJnZXRQcm9wTmFtZSBpcyB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUHVibGljR2V0UHJvcGVydHkgKHRhcmdldCwgdGFyZ2V0UHJvcE5hbWUsIG5ld1Byb3BOYW1lLCBkZWZhdWx0UHJvcFZhbHVlKSB7XG4gIGlmICghdGFyZ2V0Lmhhc093blByb3BlcnR5KG5ld1Byb3BOYW1lKSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG5ld1Byb3BOYW1lLCB7XG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiB0YXJnZXRbdGFyZ2V0UHJvcE5hbWVdICE9PSAndW5kZWZpbmVkJyA/IHRhcmdldFt0YXJnZXRQcm9wTmFtZV0gOiBkZWZhdWx0UHJvcFZhbHVlKVxuICAgICAgfSxcbiAgICAgIHNldDogdW5kZWZpbmVkLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwdWJsaWMgZ2V0dGVyL3NldHRlciBpbnRlcmZhY2UgZm9yIGEgcHJvcGVydHkgb24gYSB0YXJnZXRcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0UHJvcE5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXdQcm9wTmFtZVxuICogQHBhcmFtIHtNaXhlZH0gZGVmYXVsdFByb3BWYWx1ZSBVc2VkIGlmIHRoZSB0YXJnZXQncyB0YXJnZXRQcm9wTmFtZSBpcyB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUHVibGljR2V0U2V0UHJvcGVydHkgKHRhcmdldCwgdGFyZ2V0UHJvcE5hbWUsIG5ld1Byb3BOYW1lLCBkZWZhdWx0UHJvcFZhbHVlKSB7XG4gIGlmICghdGFyZ2V0Lmhhc093blByb3BlcnR5KG5ld1Byb3BOYW1lKSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG5ld1Byb3BOYW1lLCB7XG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiB0YXJnZXRbdGFyZ2V0UHJvcE5hbWVdICE9PSAndW5kZWZpbmVkJyA/IHRhcmdldFt0YXJnZXRQcm9wTmFtZV0gOiBkZWZhdWx0UHJvcFZhbHVlKVxuICAgICAgfSxcbiAgICAgIHNldCAobmV3VmFsdWUpIHtcbiAgICAgICAgdGFyZ2V0W3RhcmdldFByb3BOYW1lXSA9IG5ld1ZhbHVlXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgaW5oZXJpdGFuY2UgPSB7XG4gIGV4cG9zZUFsbFByb3BlcnRpZXMsXG4gIGV4cG9zZVByaXZhdGVQcm9wZXJ0aWVzLFxuICBjcmVhdGVQdWJsaWNHZXRQcm9wZXJ0eSxcbiAgY3JlYXRlUHVibGljR2V0U2V0UHJvcGVydHlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbmhlcml0YW5jZVxuIiwiLyoqXG4gKiBMVkw5OSBQYXJzZVxuICpcbiAqIFBhcnNlIHN0cmluZ3Mgb3IgdHJhbnNmb3JtIGZyb20gb25lIGZvcm1hdCB0byBhbm90aGVyXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBfX2xvZ2dlclBhdGggPSAnbHZsOTkvdXRpbHMvcGFyc2UnXG5jb25zdCBvYmplY3RQYXRoID0gcmVxdWlyZSgnb2JqZWN0LXBhdGgnKVxuXG4vKipcbiAqIENvZXJjZSBhIHZhbHVlIHRvIGl0cyBwcmltaXRpdmUgdHlwZVxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGlucHV0XG4gKiBAcmV0dXJucyB7TWl4ZWR9XG4gKi9cbmZ1bmN0aW9uIGNvZXJjZVRvUHJpbWl0aXZlVHlwZSAoaW5wdXQpIHtcbiAgLy8gTm9uLXN0cmluZz8gSnVzdCByZXR1cm4gaXQgc3RyYWlnaHQgYXdheVxuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykgcmV0dXJuIGlucHV0XG5cbiAgLy8gVHJpbSBhbnkgd2hpdGVzcGFjZVxuICBpbnB1dCA9IChpbnB1dCArICcnKS50cmltKClcblxuICAvLyBOdW1iZXJcbiAgaWYgKC9eXFwtPyg/OlxcZCpbXFwuXFwsXSkqXFxkKig/OltlRV0oPzpcXC0/XFxkKyk/KT8kLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KGlucHV0KVxuXG4gICAgLy8gQm9vbGVhbjogdHJ1ZVxuICB9IGVsc2UgaWYgKC9eKHRydWV8MSkkLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiB0cnVlXG5cbiAgICAvLyBOYU5cbiAgfSBlbHNlIGlmICgvXk5hTiQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIE5hTlxuXG4gICAgLy8gdW5kZWZpbmVkXG4gIH0gZWxzZSBpZiAoL151bmRlZmluZWQkLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiB1bmRlZmluZWRcblxuICAgIC8vIG51bGxcbiAgfSBlbHNlIGlmICgvXm51bGwkLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBudWxsXG5cbiAgICAvLyBCb29sZWFuOiBmYWxzZVxuICB9IGVsc2UgaWYgKC9eKGZhbHNlfDApJC8udGVzdChpbnB1dCkgfHwgaW5wdXQgPT09ICcnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgICAvLyBKU09OOiBzdGFydHMgd2l0aCBbIG9yIHsgYW5kIGVuZHMgd2l0aCBdIG9yIH1cbiAgfSBlbHNlIGlmICgvXltcXFtcXHtdLy50ZXN0KGlucHV0KSAmJiAvW1xcXVxcfV0kLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBjb252ZXJ0U3RyaW5nVG9Kc29uKGlucHV0KVxuICB9XG5cbiAgLy8gRGVmYXVsdCB0byBzdHJpbmdcbiAgcmV0dXJuIGlucHV0XG59XG5cbi8qKlxuICogQ29udmVydCB2YWx1ZSB0byBhbiBleHBsaWNpdCBib29sZWFuLiBOYW1lbHkgZm9yIHByb2Nlc3Npbmcgc3RyaW5nIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBpbnB1dFxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRUb0Jvb2xlYW4gKGlucHV0KSB7XG4gIC8vIEFscmVhZHkgYm9vbGVhblxuICBpZiAoaW5wdXQgPT09IHRydWUgfHwgaW5wdXQgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGlucHV0XG4gIH1cblxuICAvLyBDYXNlcyBvZiB0cnV0aHkvZmFsc2V5IHZhbHVlc1xuICBzd2l0Y2ggKGlucHV0KSB7XG4gICAgY2FzZSAxOlxuICAgIGNhc2UgJzEnOlxuICAgIGNhc2UgJ3RydWUnOlxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGNhc2UgMDpcbiAgICBjYXNlICcwJzpcbiAgICBjYXNlICdmYWxzZSc6XG4gICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICBjYXNlIG51bGw6XG4gICAgY2FzZSAnbnVsbCc6XG4gICAgY2FzZSBOYU46XG4gICAgY2FzZSAnTmFOJzpcbiAgICBjYXNlICcnOlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBPdGhlcndpc2UuLi5cbiAgcmV0dXJuICEhaW5wdXRcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIHRvIEpTT04gb3IganVzdCByZXR1cm4gdGhlIHN0cmluZyBpZiBjYW4ndFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dFxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gY29udmVydFN0cmluZ1RvSnNvbiAoaW5wdXQpIHtcbiAgbGV0IG91dHB1dCA9IGlucHV0XG5cbiAgLy8gQ29udmVydCBzdHJpbmcgZGF0YSB0byBKU09OXG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHtcbiAgICAgIG91dHB1dCA9IEpTT04ucGFyc2UoaW5wdXQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgJHtfbG9nZ2VyUGF0aH0uY29udmVydFN0cmluZ1RvSnNvbjogRXJyb3IgcGFyc2luZyBzdHJpbmcgSlNPTiBkYXRhYCwgaW5wdXQpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBmbG9hdC5cbiAqIFRoaXMgYWxzbyBjb252ZXJ0cyBudW1iZXIgY29uc3RhbnRzIGxpa2UgSW5maW5pdHkgYW5kIE5hTiB0byB6ZXJvLlxuICpcbiAqIEBwYXJhbSBpbnB1dFxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRTdHJpbmdUb0Zsb2F0IChpbnB1dCkge1xuICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBpbnB1dFxuICB9XG5cbiAgbGV0IG91dHB1dCA9IHBhcnNlRmxvYXQoKGlucHV0ICsgJycpLnJlcGxhY2UoL1teXFxkXFwtXFwuXSsvZywgJycpKVxuXG4gIC8vIEluZmluaXR5IC8gTmFOXG4gIGlmICghaXNGaW5pdGUoaW5wdXQpIHx8IGlzTmFOKGlucHV0KSB8fCBpc05hTihvdXRwdXQpKSB7XG4gICAgb3V0cHV0ID0gMFxuICB9XG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG4vKipcbiAqIEV4dHJhY3Qga2V5LXZhbHVlcyBmcm9tIGEgc3RyaW5nIHdoaWNoIGlzIGxpa2UgYSBDU1MgY2xhc3MgZGVjbGFyYXRpb24sIGUuZy4gYGtleTogdmFsdWU7IGtleTogdmFsdWVgXG4gKlxuICogVGhpcyBpcyBzbGlnaHRseSBtb3JlIGludGVyZXN0aW5nIGFzIGl0IGNhbiB0YWtlIGEgbmFtZSB3aXRoIGRvdHNcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdENsYXNzRGV0YWlscyAoaW5wdXQpIHtcbiAgbGV0IG91dHB1dCA9IHt9XG4gIGxldCBpbnB1dFBhcnRzID0gW2lucHV0XVxuXG4gIC8vIENoZWNrIGlmIGl0IGhhcyBzZW1pLWNvbG9uc1xuICBpZiAoLzsvLnRlc3QoaW5wdXQpKSB7XG4gICAgaW5wdXRQYXJ0cyA9IGlucHV0LnNwbGl0KCc7JylcbiAgfVxuXG4gIC8vIFByb2Nlc3MgZWFjaCBpbnB1dCBwYXJ0XG4gIGlucHV0UGFydHMuZm9yRWFjaCgocGFydCkgPT4ge1xuICAgIHBhcnQgPSBwYXJ0LnRyaW0oKVxuICAgIGlmIChwYXJ0KSB7XG4gICAgICBsZXQgcGFydFBhcnRzID0gcGFydC5tYXRjaCgvKFthLXowLTlfLi1dKyk6KFteO10rKTs/L2kpXG4gICAgICBsZXQgcGFydE5hbWUgPSBwYXJ0UGFydHNbMV0udHJpbSgpXG4gICAgICBsZXQgcGFydFZhbHVlID0gY29lcmNlVG9QcmltaXRpdmVUeXBlKHBhcnRQYXJ0c1syXS50cmltKCkpXG5cbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gY29uc29sZS5sb2coJ3BhcnNlZCBwYXJ0Jywge1xuICAgICAgLy8gICBwYXJ0LFxuICAgICAgLy8gICBwYXJ0TmFtZSxcbiAgICAgIC8vICAgcGFydFZhbHVlLFxuICAgICAgLy8gfSlcblxuICAgICAgLy8gRW5zdXJlIG91dHB1dCBvYmplY3QgZXhpc3RzIGlmIHVzaW5nIGRvdCBub3RhdGlvblxuICAgICAgaWYgKC9cXC4vLnRlc3QocGFydE5hbWUpKSB7XG4gICAgICAgIGxldCBvYmpQYXJ0cyA9IHBhcnROYW1lLnNwbGl0KCcuJylcbiAgICAgICAgbGV0IG9ialBhcnRQYXRoID0gJydcblxuICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3BhcnQgaGFzIGRvdCBub3RhdGlvbicsIHtcbiAgICAgICAgLy8gICBvdXRwdXQsXG4gICAgICAgIC8vICAgcGFydE5hbWUsXG4gICAgICAgIC8vICAgcGFydFZhbHVlLFxuICAgICAgICAvLyAgIG9ialBhcnRzLFxuICAgICAgICAvLyAgIG9ialBhcnRQYXRoXG4gICAgICAgIC8vIH0pXG5cbiAgICAgICAgZm9yIChsZXQgb2JqUGFydEluZGV4ID0gMDsgb2JqUGFydEluZGV4IDwgKG9ialBhcnRzLmxlbmd0aCAtIDEpOyBvYmpQYXJ0SW5kZXgrKykge1xuICAgICAgICAgIG9ialBhcnRQYXRoICs9IChvYmpQYXJ0SW5kZXggPiAwID8gJy4nIDogJycpICsgb2JqUGFydHNbb2JqUGFydEluZGV4XVxuXG4gICAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgICAgLy8gY29uc29sZS5sb2cob2JqUGFydFBhdGgpXG5cbiAgICAgICAgICBpZiAoIW9iamVjdFBhdGguaGFzKG91dHB1dCwgb2JqUGFydFBhdGgpKSB7XG4gICAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzZXR0aW5nIG9iamVjdCBwYXJ0IHBhdGgnLCB7XG4gICAgICAgICAgICAvLyAgIG91dHB1dCxcbiAgICAgICAgICAgIC8vICAgcGFydE5hbWUsXG4gICAgICAgICAgICAvLyAgIHBhcnRWYWx1ZSxcbiAgICAgICAgICAgIC8vICAgb2JqUGFydEluZGV4LFxuICAgICAgICAgICAgLy8gICBvYmpQYXJ0UGF0aFxuICAgICAgICAgICAgLy8gfSlcblxuICAgICAgICAgICAgb2JqZWN0UGF0aC5zZXQob3V0cHV0LCBvYmpQYXJ0UGF0aCwge30pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCB2aWEgb2JqZWN0UGF0aFxuICAgICAgb2JqZWN0UGF0aC5zZXQob3V0cHV0LCBwYXJ0TmFtZSwgcGFydFZhbHVlKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gb3V0cHV0XG59XG5cbi8qKlxuICogRXh0cmFjdCB0aGUgdHJpZ2dlcidzIHRhcmdldCBkZXRhaWxzXG4gKlxuICogVGhpcyBhbGxvd3MgeW91IHRvIGV4dHJhY3QgdGhlIG5lY2Vzc2FyeSBkYXRhIGZyb20gdGhlIHN0cmluZyBhbmQgdGhlIGdsb2JhbCB3aW5kb3cvZG9jdW1lbnQgYXZhaWxhYmxlLCB0byBjcmVhdGVcbiAqIGR5bmFtaWMgZXZlbnQgYmluZGluZ3MuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBpbnB1dFxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGNvbnRleHQgRGVmYXVsdHMgdG8gYHdpbmRvd2AuIFdoZXJlIHRvIGZpbmQgdGhlIGBkb2AgYWN0aW9uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSA9PiB7IGV2ZW50TmFtZToge1N0cmluZ30sIG1ldGhvZDoge0Z1bmN0aW9ufSwgc2VsZWN0b3I6IHtTdHJpbmd9LCB0YXJnZXQ6IHtPYmplY3R9IH1cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFRyaWdnZXJEZXRhaWxzKGlucHV0LCBjb250ZXh0KSB7XG4gIGxldCB0cmlnZ2VyID0gaW5wdXRcblxuICBpZiAoIWNvbnRleHQpIHtcbiAgICBjb250ZXh0ID0gd2luZG93XG4gIH1cblxuICAvLyBTdHJpbmcgaW5wdXQgZ2l2ZW5cbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBUcnkgSlNPTiBmaXJzdFxuICAgIGlmICgvXnsvLnRlc3QoaW5wdXQpKSB7XG4gICAgICB0cmlnZ2VyID0gY29udmVydFN0cmluZ1RvSnNvbihpbnB1dClcblxuICAgICAgLy8gVHJ5IGNsYXNzIGRldGFpbHNcbiAgICB9IGVsc2UgaWYgKC9eW2EtejAtOV8tXSs6Ly50ZXN0KGlucHV0KSkge1xuICAgICAgdHJpZ2dlciA9IGV4dHJhY3RDbGFzc0RldGFpbHMoaW5wdXQpXG5cbiAgICAgIC8vIFN0cmluZyB3aXRoIG5vIHNwYWNlc1xuICAgIH0gZWxzZSBpZiAoIS8gLy50ZXN0KGlucHV0KSkge1xuICAgICAgdHJpZ2dlciA9IHtcbiAgICAgICAgZG86IGlucHV0XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTm8gb2JqZWN0IGZvdW5kIVxuICBpZiAodHlwZW9mIHRyaWdnZXIgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke19sb2dnZXJQYXRofS5leHRyYWN0VHJpZ2dlckRldGFpbHM6IGlucHV0IHdhcyBub3QgdmFsaWQgSlNPTiBvciBDU1Mtc3R5bGUgZGVmaW5pdGlvbmApXG4gIH1cblxuICAvLyBFbnN1cmUgaXQgaGFzIGBvbmAgYW5kIGBkb2AgcHJvcGVydGllc1xuICAvLyBpZiAoIW9iamVjdFBhdGguaGFzKHRyaWdnZXIsICdvbicpKSB7XG4gIC8vICAgdGhyb3cgbmV3IEVycm9yKGAke19sb2dnZXJQYXRofS5leHRyYWN0VHJpZ2dlckRldGFpbHM6IHRyaWdnZXIgaXMgbWlzc2luZyByZXF1aXJlZCAnb24nIHByb3BlcnR5YClcbiAgLy8gfVxuICBpZiAoIW9iamVjdFBhdGguaGFzKHRyaWdnZXIsICdkbycpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke19sb2dnZXJQYXRofS5leHRyYWN0VHJpZ2dlckRldGFpbHM6IHRyaWdnZXIgaXMgbWlzc2luZyByZXF1aXJlZCAnZG8nIHByb3BlcnR5YClcbiAgfVxuXG4gIC8vIElmIHRhcmdldCBpcyBzZXQsIHVzZSByZWFsIHZhbHVlcyBmb3Igd2luZG93IGFuZCBkb2N1bWVudFxuICBpZiAob2JqZWN0UGF0aC5oYXModHJpZ2dlciwgJ3RhcmdldCcpKSB7XG4gICAgc3dpdGNoICh0cmlnZ2VyLnRhcmdldCkge1xuICAgICAgY2FzZSAnc2VsZic6XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdUYXJnZXRpbmcgc2VsZicsIGNvbnRleHQpXG4gICAgICAgIHRyaWdnZXIudGFyZ2V0ID0gY29udGV4dFxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgIHRyaWdnZXIudGFyZ2V0ID0gZG9jdW1lbnRcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAnd2luZG93JzpcbiAgICAgICAgdHJpZ2dlci50YXJnZXQgPSB3aW5kb3dcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvLyBEbyBzYW1lIGFzIGFib3ZlIGlmIGEgY29udGV4dCB3YXMgc2V0IVxuICBpZiAob2JqZWN0UGF0aC5oYXModHJpZ2dlciwgJ2NvbnRleHQnKSkge1xuICAgIHN3aXRjaCAodHJpZ2dlci5jb250ZXh0KSB7XG4gICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgIHRyaWdnZXIuY29udGV4dCA9IGRvY3VtZW50XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ3dpbmRvdyc6XG4gICAgICAgIHRyaWdnZXIuY29udGV4dCA9IHdpbmRvd1xuICAgICAgICBicmVha1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0cmlnZ2VyLmNvbnRleHQgPSBjb250ZXh0XG4gIH1cblxuICByZXR1cm4gdHJpZ2dlclxufVxuXG4vKipcbiAqIEVuY29kZSBzdHJpbmcgdG8gVVJMLCB3aXRoIHNwYWNlcyB0aGF0IGFyZSByZXByZXNlbnRlZCBhcyBgK2BcbiAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvZW5jb2RlVVJJQ29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0XG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBmaXhlZEVuY29kZVVSSUNvbXBvbmVudCAoaW5wdXQpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChpbnB1dCkucmVwbGFjZSgvWyEnKCkqXS9nLCBmdW5jdGlvbihjKSB7XG4gICAgcmV0dXJuICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNik7XG4gIH0pXG59XG5cbi8qKlxuICogR2V0IHRoZSB0YXJnZXQgb2JqZWN0IGJ5IGEgc3RyaW5nIHNlbGVjdG9yXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0QnlTZWxlY3RvciAodGFyZ2V0LCBjb250ZXh0KSB7XG4gIC8vIERlZmF1bHQgdG8gZG9jdW1lbnRcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0YXJnZXQgPSBkb2N1bWVudFxuICB9XG5cbiAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gU3BlY2lhbCBzdHJpbmcgdmFsdWVzIHRvIGdldCB0aGUgYWN0dWFsIG9iamVjdFxuICAgIHN3aXRjaCAodGFyZ2V0KSB7XG4gICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgIHRhcmdldCA9IGRvY3VtZW50XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ3dpbmRvdyc6XG4gICAgICAgIHRhcmdldCA9IHdpbmRvd1xuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICdzZWxmJzpcbiAgICAgICAgdGFyZ2V0ID0gY29udGV4dFxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXRcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRhcmdldCBvYmplY3QncyBzdHJpbmcgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybiB7dW5kZWZpbmVkfFN0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0U2VsZWN0b3IgKHRhcmdldCwgY29udGV4dCkge1xuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdGFyZ2V0XG4gIH1cblxuICAvLyBXaW5kb3dcbiAgaWYgKCQuaXNXaW5kb3codGFyZ2V0KSkge1xuICAgIHJldHVybiAnd2luZG93J1xuXG4gICAgLy8gRG9jdW1lbnRcbiAgfSBlbHNlIGlmICh0YXJnZXQgPT09IGRvY3VtZW50KSB7XG4gICAgcmV0dXJuICdkb2N1bWVudCdcblxuICAgIC8vIFNlbGZcbiAgfSBlbHNlIGlmICh0YXJnZXQuaGFzT3duUHJvcGVydHkoJ3V1aWQnKSkge1xuICAgIHJldHVybiBgW2RhdGEtY29tcG9uZW50LWlkPVwiJHt0YXJnZXQudXVpZH1cIl1gXG5cbiAgICAvLyBIVE1MIEVsZW1cbiAgfSBlbHNlIGlmICgkKHRhcmdldCkubGVuZ3RoKSB7XG4gICAgaWYgKCQodGFyZ2V0KS5hdHRyKCdkYXRhLWNvbXBvbmVudC1pZCcpKSB7XG4gICAgICByZXR1cm4gYFtkYXRhLWNvbXBvbmVudC1pZD1cIiR7JCh0YXJnZXQpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWlkJyl9XCJdYFxuICAgIH0gZWxzZSBpZiAoJCh0YXJnZXQpLmF0dHIoJ2lkJykpIHtcbiAgICAgIHJldHVybiBgIyR7JCh0YXJnZXQpLmF0dHIoJ2lkJyl9YFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7dGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKX1gXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIFBhcnNlIHRoZSB0YXJnZXQgZXZlbnQgbmFtZXNcbiAqXG4gKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gZXZlbnROYW1lcyBlLmcuIGBDb21wb25lbnQ6Y3VzdG9tRXZlbnQgZG9tOm1vdXNlb3ZlcmBcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgT3B0aW9uYWwgbmFtZXNwYWNlIHRvIGFzc2lnbiBlYWNoIGV4dHJhY3RlZCBjdXN0b20gKG5vbi1ET00pIGV2ZW50IG5hbWVcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFRhcmdldEV2ZW50TmFtZXMgKGlucHV0RXZlbnROYW1lcywgbmFtZXNwYWNlKSB7XG4gIGxldCB0YXJnZXRFdmVudE5hbWVzID0gW11cbiAgbGV0IGV2ZW50TmFtZXMgPSBpbnB1dEV2ZW50TmFtZXNcblxuICBpZiAodHlwZW9mIGlucHV0RXZlbnROYW1lcyA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBTcGxpdCBldmVudE5hbWVzIGJ5IHNwYWNlc1xuICAgIGlmICgvXFxzLy50ZXN0KGlucHV0RXZlbnROYW1lcykpIHtcbiAgICAgIGV2ZW50TmFtZXMgPSBpbnB1dEV2ZW50TmFtZXMuc3BsaXQoL1xccysvKVxuICAgIH0gZWxzZSB7XG4gICAgICBldmVudE5hbWVzID0gWyBpbnB1dEV2ZW50TmFtZXMgXVxuICAgIH1cbiAgfVxuXG4gIGlmIChldmVudE5hbWVzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAvLyBQcm9jZXNzIGVhY2ggZXZlbnQgbmFtZVxuICAgIGV2ZW50TmFtZXMuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgLy8gRGVmYXVsdCB0byBuYW1lc3BhY2VkIGV2ZW50IG5hbWVcbiAgICAgIGxldCB0YXJnZXRFdmVudE5hbWUgPSAodHlwZW9mIG5hbWVzcGFjZSA9PT0gJ3N0cmluZycgJiYgbmFtZXNwYWNlICE9PSAnJyA/IGAke25hbWVzcGFjZX06JHtldmVudE5hbWV9YCA6IGV2ZW50TmFtZSlcblxuICAgICAgLy8gUmVtb3ZlIGFueSByZWZlcmVuY2UgdG8gdGhlIG5hdGl2ZSBET00gZXZlbnQgbmFtZXNwYWNlXG4gICAgICBpZiAoL15kb206L2kudGVzdChldmVudE5hbWUpKSB7XG4gICAgICAgIHRhcmdldEV2ZW50TmFtZSA9IGV2ZW50TmFtZS5yZXBsYWNlKC9eZG9tXFw6L2dpLCAnJywgZXZlbnROYW1lKVxuICAgICAgfVxuXG4gICAgICAvLyBBZGQgdG8gdGhlIGxpc3RcbiAgICAgIHRhcmdldEV2ZW50TmFtZXMucHVzaCh0YXJnZXRFdmVudE5hbWUpXG4gICAgfSlcblxuICAgIHJldHVybiB0YXJnZXRFdmVudE5hbWVzXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuY29uc3QgcGFyc2UgPSB7XG4gIGNvZXJjZVRvUHJpbWl0aXZlVHlwZSxcbiAgY29udmVydFRvQm9vbGVhbixcbiAgY29udmVydFN0cmluZ1RvSnNvbixcbiAgY29udmVydFN0cmluZ1RvRmxvYXQsXG4gIGV4dHJhY3RDbGFzc0RldGFpbHMsXG4gIGV4dHJhY3RUcmlnZ2VyRGV0YWlscyxcbiAgZml4ZWRFbmNvZGVVUklDb21wb25lbnQsXG4gIGdldFRhcmdldEJ5U2VsZWN0b3IsXG4gIGdldFRhcmdldFNlbGVjdG9yLFxuICBleHRyYWN0VGFyZ2V0RXZlbnROYW1lc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcnNlXG4iLCIvKipcbiAqIExWTDk5XG4gKi9cblxuY29uc3QgbHZsOTkgPSByZXF1aXJlKCcuL2VzNicpXG5cbm1vZHVsZS5leHBvcnRzID0gbHZsOTlcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgZmxhZ3MgZnJvbSB0aGVpciBjb2VyY2VkIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVGbGFncyA9IC9cXHcqJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgc3VwcG9ydGVkIGJ5IGBfLmNsb25lYC4gKi9cbnZhciBjbG9uZWFibGVUYWdzID0ge307XG5jbG9uZWFibGVUYWdzW2FyZ3NUYWddID0gY2xvbmVhYmxlVGFnc1thcnJheVRhZ10gPVxuY2xvbmVhYmxlVGFnc1thcnJheUJ1ZmZlclRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGFWaWV3VGFnXSA9XG5jbG9uZWFibGVUYWdzW2Jvb2xUYWddID0gY2xvbmVhYmxlVGFnc1tkYXRlVGFnXSA9XG5jbG9uZWFibGVUYWdzW2Zsb2F0MzJUYWddID0gY2xvbmVhYmxlVGFnc1tmbG9hdDY0VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDhUYWddID0gY2xvbmVhYmxlVGFnc1tpbnQxNlRhZ10gPVxuY2xvbmVhYmxlVGFnc1tpbnQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW21hcFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tudW1iZXJUYWddID0gY2xvbmVhYmxlVGFnc1tvYmplY3RUYWddID1cbmNsb25lYWJsZVRhZ3NbcmVnZXhwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc2V0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3N0cmluZ1RhZ10gPSBjbG9uZWFibGVUYWdzW3N5bWJvbFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50MTZUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbmNsb25lYWJsZVRhZ3NbZXJyb3JUYWddID0gY2xvbmVhYmxlVGFnc1tmdW5jVGFnXSA9XG5jbG9uZWFibGVUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIEFkZHMgdGhlIGtleS12YWx1ZSBgcGFpcmAgdG8gYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyIFRoZSBrZXktdmFsdWUgcGFpciB0byBhZGQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBtYXBgLlxuICovXG5mdW5jdGlvbiBhZGRNYXBFbnRyeShtYXAsIHBhaXIpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBtYXAuc2V0YCBiZWNhdXNlIGl0J3Mgbm90IGNoYWluYWJsZSBpbiBJRSAxMS5cbiAgbWFwLnNldChwYWlyWzBdLCBwYWlyWzFdKTtcbiAgcmV0dXJuIG1hcDtcbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gYHNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBtb2RpZnkuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhZGQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBzZXRgLlxuICovXG5mdW5jdGlvbiBhZGRTZXRFbnRyeShzZXQsIHZhbHVlKSB7XG4gIC8vIERvbid0IHJldHVybiBgc2V0LmFkZGAgYmVjYXVzZSBpdCdzIG5vdCBjaGFpbmFibGUgaW4gSUUgMTEuXG4gIHNldC5hZGQodmFsdWUpO1xuICByZXR1cm4gc2V0O1xufVxuXG4vKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucmVkdWNlYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFthY2N1bXVsYXRvcl0gVGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbml0QWNjdW1dIFNwZWNpZnkgdXNpbmcgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYGFycmF5YCBhc1xuICogIHRoZSBpbml0aWFsIHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBhcnJheVJlZHVjZShhcnJheSwgaXRlcmF0ZWUsIGFjY3VtdWxhdG9yLCBpbml0QWNjdW0pIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgaWYgKGluaXRBY2N1bSAmJiBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGFycmF5WysraW5kZXhdO1xuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBpdGVyYXRlZShhY2N1bXVsYXRvciwgYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXksXG4gICAgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCksXG4gICAgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZSxcbiAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gICAgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCksXG4gICAgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKSxcbiAgICBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKSxcbiAgICBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpLFxuICAgIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGNhY2hlID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGNhY2hlIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gY2FjaGUuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhY2hlID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhc3NpZ25WYWx1ZWAgZXhjZXB0IHRoYXQgaXQgZG9lc24ndCBhc3NpZ25cbiAqIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgIWVxKG9iamVjdFtrZXldLCB2YWx1ZSkpIHx8XG4gICAgICAodHlwZW9mIGtleSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uYXNzaWduYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXNcbiAqIG9yIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduKG9iamVjdCwgc291cmNlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgY29weU9iamVjdChzb3VyY2UsIGtleXMoc291cmNlKSwgb2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jbG9uZWAgYW5kIGBfLmNsb25lRGVlcGAgd2hpY2ggdHJhY2tzXG4gKiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNGdWxsXSBTcGVjaWZ5IGEgY2xvbmUgaW5jbHVkaW5nIHN5bWJvbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjbG9uaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXldIFRoZSBrZXkgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgcGFyZW50IG9iamVjdCBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGFuZCB0aGVpciBjbG9uZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgY2xvbmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlQ2xvbmUodmFsdWUsIGlzRGVlcCwgaXNGdWxsLCBjdXN0b21pemVyLCBrZXksIG9iamVjdCwgc3RhY2spIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICByZXN1bHQgPSBvYmplY3QgPyBjdXN0b21pemVyKHZhbHVlLCBrZXksIG9iamVjdCwgc3RhY2spIDogY3VzdG9taXplcih2YWx1ZSk7XG4gIH1cbiAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKTtcbiAgaWYgKGlzQXJyKSB7XG4gICAgcmVzdWx0ID0gaW5pdENsb25lQXJyYXkodmFsdWUpO1xuICAgIGlmICghaXNEZWVwKSB7XG4gICAgICByZXR1cm4gY29weUFycmF5KHZhbHVlLCByZXN1bHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFnID0gZ2V0VGFnKHZhbHVlKSxcbiAgICAgICAgaXNGdW5jID0gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcblxuICAgIGlmIChpc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjbG9uZUJ1ZmZlcih2YWx1ZSwgaXNEZWVwKTtcbiAgICB9XG4gICAgaWYgKHRhZyA9PSBvYmplY3RUYWcgfHwgdGFnID09IGFyZ3NUYWcgfHwgKGlzRnVuYyAmJiAhb2JqZWN0KSkge1xuICAgICAgaWYgKGlzSG9zdE9iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA/IHZhbHVlIDoge307XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBpbml0Q2xvbmVPYmplY3QoaXNGdW5jID8ge30gOiB2YWx1ZSk7XG4gICAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgICByZXR1cm4gY29weVN5bWJvbHModmFsdWUsIGJhc2VBc3NpZ24ocmVzdWx0LCB2YWx1ZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWNsb25lYWJsZVRhZ3NbdGFnXSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZUJ5VGFnKHZhbHVlLCB0YWcsIGJhc2VDbG9uZSwgaXNEZWVwKTtcbiAgICB9XG4gIH1cbiAgLy8gQ2hlY2sgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMgYW5kIHJldHVybiBpdHMgY29ycmVzcG9uZGluZyBjbG9uZS5cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQodmFsdWUpO1xuICBpZiAoc3RhY2tlZCkge1xuICAgIHJldHVybiBzdGFja2VkO1xuICB9XG4gIHN0YWNrLnNldCh2YWx1ZSwgcmVzdWx0KTtcblxuICBpZiAoIWlzQXJyKSB7XG4gICAgdmFyIHByb3BzID0gaXNGdWxsID8gZ2V0QWxsS2V5cyh2YWx1ZSkgOiBrZXlzKHZhbHVlKTtcbiAgfVxuICBhcnJheUVhY2gocHJvcHMgfHwgdmFsdWUsIGZ1bmN0aW9uKHN1YlZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHN1YlZhbHVlO1xuICAgICAgc3ViVmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBwb3B1bGF0ZSBjbG9uZSAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGFzc2lnblZhbHVlKHJlc3VsdCwga2V5LCBiYXNlQ2xvbmUoc3ViVmFsdWUsIGlzRGVlcCwgaXNGdWxsLCBjdXN0b21pemVyLCBrZXksIHZhbHVlLCBzdGFjaykpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvdHlwZSBUaGUgb2JqZWN0IHRvIGluaGVyaXQgZnJvbS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDcmVhdGUocHJvdG8pIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHByb3RvKSA/IG9iamVjdENyZWF0ZShwcm90bykgOiB7fTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0QWxsS2V5c2AgYW5kIGBnZXRBbGxLZXlzSW5gIHdoaWNoIHVzZXNcbiAqIGBrZXlzRnVuY2AgYW5kIGBzeW1ib2xzRnVuY2AgdG8gZ2V0IHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN5bWJvbHNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNGdW5jLCBzeW1ib2xzRnVuYykge1xuICB2YXIgcmVzdWx0ID0ga2V5c0Z1bmMob2JqZWN0KTtcbiAgcmV0dXJuIGlzQXJyYXkob2JqZWN0KSA/IHJlc3VsdCA6IGFycmF5UHVzaChyZXN1bHQsIHN5bWJvbHNGdW5jKG9iamVjdCkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzSW4ob2JqZWN0KTtcbiAgfVxuICB2YXIgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmIChvYmplY3QgPT09IHNvdXJjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIShpc0FycmF5KHNvdXJjZSkgfHwgaXNUeXBlZEFycmF5KHNvdXJjZSkpKSB7XG4gICAgdmFyIHByb3BzID0gYmFzZUtleXNJbihzb3VyY2UpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCBzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHNyY1ZhbHVlO1xuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHNyY1ZhbHVlKSkge1xuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIG1lcmdlRnVuYywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldLFxuICAgICAgc3RhY2tlZCA9IHN0YWNrLmdldChzcmNWYWx1ZSk7XG5cbiAgaWYgKHN0YWNrZWQpIHtcbiAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBzdGFja2VkKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICA6IHVuZGVmaW5lZDtcblxuICB2YXIgaXNDb21tb24gPSBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpIHtcbiAgICAgIGlmIChpc0FycmF5KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNBcnJheUxpa2VPYmplY3Qob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gY29weUFycmF5KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGJhc2VDbG9uZShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJndW1lbnRzKG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRvUGxhaW5PYmplY3Qob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWlzT2JqZWN0KG9ialZhbHVlKSB8fCAoc3JjSW5kZXggJiYgaXNGdW5jdGlvbihvYmpWYWx1ZSkpKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHN0YWNrLnNldChzcmNWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIG1lcmdlRnVuYyhuZXdWYWx1ZSwgc3JjVmFsdWUsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgc3RhY2tbJ2RlbGV0ZSddKHNyY1ZhbHVlKTtcbiAgfVxuICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiAgYGJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgVGhlIGJ1ZmZlciB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUJ1ZmZlcihidWZmZXIsIGlzRGVlcCkge1xuICBpZiAoaXNEZWVwKSB7XG4gICAgcmV0dXJuIGJ1ZmZlci5zbGljZSgpO1xuICB9XG4gIHZhciByZXN1bHQgPSBuZXcgYnVmZmVyLmNvbnN0cnVjdG9yKGJ1ZmZlci5sZW5ndGgpO1xuICBidWZmZXIuY29weShyZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgYXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgYXJyYXlCdWZmZXIuY29uc3RydWN0b3IoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuc2V0KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBkYXRhVmlld2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhVmlldyBUaGUgZGF0YSB2aWV3IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBkYXRhIHZpZXcuXG4gKi9cbmZ1bmN0aW9uIGNsb25lRGF0YVZpZXcoZGF0YVZpZXcsIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcihkYXRhVmlldy5idWZmZXIpIDogZGF0YVZpZXcuYnVmZmVyO1xuICByZXR1cm4gbmV3IGRhdGFWaWV3LmNvbnN0cnVjdG9yKGJ1ZmZlciwgZGF0YVZpZXcuYnl0ZU9mZnNldCwgZGF0YVZpZXcuYnl0ZUxlbmd0aCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgbWFwLlxuICovXG5mdW5jdGlvbiBjbG9uZU1hcChtYXAsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhtYXBUb0FycmF5KG1hcCksIHRydWUpIDogbWFwVG9BcnJheShtYXApO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZE1hcEVudHJ5LCBuZXcgbWFwLmNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHJlZ2V4cGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdleHAgVGhlIHJlZ2V4cCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCByZWdleHAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lUmVnRXhwKHJlZ2V4cCkge1xuICB2YXIgcmVzdWx0ID0gbmV3IHJlZ2V4cC5jb25zdHJ1Y3RvcihyZWdleHAuc291cmNlLCByZUZsYWdzLmV4ZWMocmVnZXhwKSk7XG4gIHJlc3VsdC5sYXN0SW5kZXggPSByZWdleHAubGFzdEluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHNldC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTZXQoc2V0LCBpc0RlZXAsIGNsb25lRnVuYykge1xuICB2YXIgYXJyYXkgPSBpc0RlZXAgPyBjbG9uZUZ1bmMoc2V0VG9BcnJheShzZXQpLCB0cnVlKSA6IHNldFRvQXJyYXkoc2V0KTtcbiAgcmV0dXJuIGFycmF5UmVkdWNlKGFycmF5LCBhZGRTZXRFbnRyeSwgbmV3IHNldC5jb25zdHJ1Y3Rvcik7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIHRoZSBgc3ltYm9sYCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzeW1ib2wgVGhlIHN5bWJvbCBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc3ltYm9sIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTeW1ib2woc3ltYm9sKSB7XG4gIHJldHVybiBzeW1ib2xWYWx1ZU9mID8gT2JqZWN0KHN5bWJvbFZhbHVlT2YuY2FsbChzeW1ib2wpKSA6IHt9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdHlwZWRBcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlZEFycmF5IFRoZSB0eXBlZCBhcnJheSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgdHlwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNsb25lVHlwZWRBcnJheSh0eXBlZEFycmF5LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIodHlwZWRBcnJheS5idWZmZXIpIDogdHlwZWRBcnJheS5idWZmZXI7XG4gIHJldHVybiBuZXcgdHlwZWRBcnJheS5jb25zdHJ1Y3RvcihidWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5sZW5ndGgpO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb3BpZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weU9iamVjdChzb3VyY2UsIHByb3BzLCBvYmplY3QsIGN1c3RvbWl6ZXIpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlID09PSB1bmRlZmluZWQgPyBzb3VyY2Vba2V5XSA6IG5ld1ZhbHVlKTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKipcbiAqIENvcGllcyBvd24gc3ltYm9sIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHN5bWJvbHMgZnJvbS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyB0by5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlTeW1ib2xzKHNvdXJjZSwgb2JqZWN0KSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHNvdXJjZSwgZ2V0U3ltYm9scyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmFzc2lnbmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBiYXNlUmVzdChmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZDtcblxuICAgIGN1c3RvbWl6ZXIgPSAoYXNzaWduZXIubGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKVxuICAgICAgPyAobGVuZ3RoLS0sIGN1c3RvbWl6ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBpbmRleCwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXMsIGdldFN5bWJvbHMpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3ltYm9sIHByb3BlcnRpZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3ltYm9scy5cbiAqL1xudmFyIGdldFN5bWJvbHMgPSBuYXRpdmVHZXRTeW1ib2xzID8gb3ZlckFyZyhuYXRpdmVHZXRTeW1ib2xzLCBPYmplY3QpIDogc3R1YkFycmF5O1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEsXG4vLyBmb3IgZGF0YSB2aWV3cyBpbiBFZGdlIDwgMTQsIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzLlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBhcnJheS5jb25zdHJ1Y3RvcihsZW5ndGgpO1xuXG4gIC8vIEFkZCBwcm9wZXJ0aWVzIGFzc2lnbmVkIGJ5IGBSZWdFeHAjZXhlY2AuXG4gIGlmIChsZW5ndGggJiYgdHlwZW9mIGFycmF5WzBdID09ICdzdHJpbmcnICYmIGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksICdpbmRleCcpKSB7XG4gICAgcmVzdWx0LmluZGV4ID0gYXJyYXkuaW5kZXg7XG4gICAgcmVzdWx0LmlucHV0ID0gYXJyYXkuaW5wdXQ7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmICFpc1Byb3RvdHlwZShvYmplY3QpKVxuICAgID8gYmFzZUNyZWF0ZShnZXRQcm90b3R5cGUob2JqZWN0KSlcbiAgICA6IHt9O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZSBiYXNlZCBvbiBpdHMgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNsb25pbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVCeVRhZyhvYmplY3QsIHRhZywgY2xvbmVGdW5jLCBpc0RlZXApIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3I7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIHJldHVybiBjbG9uZUFycmF5QnVmZmVyKG9iamVjdCk7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKCtvYmplY3QpO1xuXG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIHJldHVybiBjbG9uZURhdGFWaWV3KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgZmxvYXQzMlRhZzogY2FzZSBmbG9hdDY0VGFnOlxuICAgIGNhc2UgaW50OFRhZzogY2FzZSBpbnQxNlRhZzogY2FzZSBpbnQzMlRhZzpcbiAgICBjYXNlIHVpbnQ4VGFnOiBjYXNlIHVpbnQ4Q2xhbXBlZFRhZzogY2FzZSB1aW50MTZUYWc6IGNhc2UgdWludDMyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lVHlwZWRBcnJheShvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHJldHVybiBjbG9uZU1hcChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKG9iamVjdCk7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVJlZ0V4cChvYmplY3QpO1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTZXQob2JqZWN0LCBpc0RlZXAsIGNsb25lRnVuYyk7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVN5bWJvbChvYmplY3QpO1xuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZVxuICogW2BPYmplY3Qua2V5c2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZXhjZXB0IHRoYXQgaXQgaW5jbHVkZXMgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gbmF0aXZlS2V5c0luKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fFxuICAgICAgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgIT0gb2JqZWN0VGFnIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmXG4gICAgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nXG4gKiBrZXllZCBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3QodmFsdWUsIGtleXNJbih2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25gIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gYW5kXG4gKiBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0cyBpbnRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2UgcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgYXJlXG4gKiBza2lwcGVkIGlmIGEgZGVzdGluYXRpb24gdmFsdWUgZXhpc3RzLiBBcnJheSBhbmQgcGxhaW4gb2JqZWN0IHByb3BlcnRpZXNcbiAqIGFyZSBtZXJnZWQgcmVjdXJzaXZlbHkuIE90aGVyIG9iamVjdHMgYW5kIHZhbHVlIHR5cGVzIGFyZSBvdmVycmlkZGVuIGJ5XG4gKiBhc3NpZ25tZW50LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuIFN1YnNlcXVlbnRcbiAqIHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjUuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnYSc6IFt7ICdiJzogMiB9LCB7ICdkJzogNCB9XVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdhJzogW3sgJ2MnOiAzIH0sIHsgJ2UnOiA1IH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB7ICdhJzogW3sgJ2InOiAyLCAnYyc6IDMgfSwgeyAnZCc6IDQsICdlJzogNSB9XSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCkge1xuICBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KTtcbn0pO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgZW1wdHkgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBlbXB0eSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5cyA9IF8udGltZXMoMiwgXy5zdHViQXJyYXkpO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5cyk7XG4gKiAvLyA9PiBbW10sIFtdXVxuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5c1swXSA9PT0gYXJyYXlzWzFdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIHN0dWJBcnJheSgpIHtcbiAgcmV0dXJuIFtdO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7XG4iLCIoZnVuY3Rpb24gKHJvb3QsIGZhY3Rvcnkpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgLyppc3RhbmJ1bCBpZ25vcmUgbmV4dDpjYW50IHRlc3QqL1xuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZS5leHBvcnRzID09PSAnb2JqZWN0Jykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICB9IGVsc2Uge1xuICAgIC8vIEJyb3dzZXIgZ2xvYmFsc1xuICAgIHJvb3Qub2JqZWN0UGF0aCA9IGZhY3RvcnkoKTtcbiAgfVxufSkodGhpcywgZnVuY3Rpb24oKXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIHZhciB0b1N0ciA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG4gIGZ1bmN0aW9uIGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgIGlmKG9iaiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgLy90byBoYW5kbGUgb2JqZWN0cyB3aXRoIG51bGwgcHJvdG90eXBlcyAodG9vIGVkZ2UgY2FzZT8pXG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApXG4gIH1cblxuICBmdW5jdGlvbiBpc0VtcHR5KHZhbHVlKXtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGlzQXJyYXkodmFsdWUpICYmIHZhbHVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgZm9yICh2YXIgaSBpbiB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGhhc093blByb3BlcnR5KHZhbHVlLCBpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZnVuY3Rpb24gdG9TdHJpbmcodHlwZSl7XG4gICAgcmV0dXJuIHRvU3RyLmNhbGwodHlwZSk7XG4gIH1cblxuICBmdW5jdGlvbiBpc09iamVjdChvYmope1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiB0b1N0cmluZyhvYmopID09PSBcIltvYmplY3QgT2JqZWN0XVwiO1xuICB9XG5cbiAgdmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uKG9iail7XG4gICAgLyppc3RhbmJ1bCBpZ25vcmUgbmV4dDpjYW50IHRlc3QqL1xuICAgIHJldHVybiB0b1N0ci5jYWxsKG9iaikgPT09ICdbb2JqZWN0IEFycmF5XSc7XG4gIH1cblxuICBmdW5jdGlvbiBpc0Jvb2xlYW4ob2JqKXtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHRvU3RyaW5nKG9iaikgPT09ICdbb2JqZWN0IEJvb2xlYW5dJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEtleShrZXkpe1xuICAgIHZhciBpbnRLZXkgPSBwYXJzZUludChrZXkpO1xuICAgIGlmIChpbnRLZXkudG9TdHJpbmcoKSA9PT0ga2V5KSB7XG4gICAgICByZXR1cm4gaW50S2V5O1xuICAgIH1cbiAgICByZXR1cm4ga2V5O1xuICB9XG5cbiAgZnVuY3Rpb24gZmFjdG9yeShvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cblxuICAgIHZhciBvYmplY3RQYXRoID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqZWN0UGF0aCkucmVkdWNlKGZ1bmN0aW9uKHByb3h5LCBwcm9wKSB7XG4gICAgICAgIGlmKHByb3AgPT09ICdjcmVhdGUnKSB7XG4gICAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyppc3RhbmJ1bCBpZ25vcmUgZWxzZSovXG4gICAgICAgIGlmICh0eXBlb2Ygb2JqZWN0UGF0aFtwcm9wXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHByb3h5W3Byb3BdID0gb2JqZWN0UGF0aFtwcm9wXS5iaW5kKG9iamVjdFBhdGgsIG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgICB9LCB7fSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgICAgIHJldHVybiAob3B0aW9ucy5pbmNsdWRlSW5oZXJpdGVkUHJvcHMgfHwgKHR5cGVvZiBwcm9wID09PSAnbnVtYmVyJyAmJiBBcnJheS5pc0FycmF5KG9iaikpIHx8IGhhc093blByb3BlcnR5KG9iaiwgcHJvcCkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2hhbGxvd1Byb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgICAgaWYgKGhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApKSB7XG4gICAgICAgIHJldHVybiBvYmpbcHJvcF07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSl7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG4gICAgICBpZiAoIXBhdGggfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIHNldChvYmosIHBhdGguc3BsaXQoJy4nKS5tYXAoZ2V0S2V5KSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgICB9XG4gICAgICB2YXIgY3VycmVudFBhdGggPSBwYXRoWzBdO1xuICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IGdldFNoYWxsb3dQcm9wZXJ0eShvYmosIGN1cnJlbnRQYXRoKTtcbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoY3VycmVudFZhbHVlID09PSB2b2lkIDAgfHwgIWRvTm90UmVwbGFjZSkge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3VycmVudFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAoY3VycmVudFZhbHVlID09PSB2b2lkIDApIHtcbiAgICAgICAgLy9jaGVjayBpZiB3ZSBhc3N1bWUgYW4gYXJyYXlcbiAgICAgICAgaWYodHlwZW9mIHBhdGhbMV0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2V0KG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSksIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgIH1cblxuICAgIG9iamVjdFBhdGguaGFzID0gZnVuY3Rpb24gKG9iaiwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcGF0aCA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXRoIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAhIW9iajtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBqID0gZ2V0S2V5KHBhdGhbaV0pO1xuXG4gICAgICAgIGlmKCh0eXBlb2YgaiA9PT0gJ251bWJlcicgJiYgaXNBcnJheShvYmopICYmIGogPCBvYmoubGVuZ3RoKSB8fFxuICAgICAgICAgIChvcHRpb25zLmluY2x1ZGVJbmhlcml0ZWRQcm9wcyA/IChqIGluIE9iamVjdChvYmopKSA6IGhhc093blByb3BlcnR5KG9iaiwgaikpKSB7XG4gICAgICAgICAgb2JqID0gb2JqW2pdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5lbnN1cmVFeGlzdHMgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWx1ZSl7XG4gICAgICByZXR1cm4gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIHRydWUpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLnNldCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2Upe1xuICAgICAgcmV0dXJuIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmluc2VydCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlLCBhdCl7XG4gICAgICB2YXIgYXJyID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKTtcbiAgICAgIGF0ID0gfn5hdDtcbiAgICAgIGlmICghaXNBcnJheShhcnIpKSB7XG4gICAgICAgIGFyciA9IFtdO1xuICAgICAgICBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGFycik7XG4gICAgICB9XG4gICAgICBhcnIuc3BsaWNlKGF0LCAwLCB2YWx1ZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZW1wdHkgPSBmdW5jdGlvbihvYmosIHBhdGgpIHtcbiAgICAgIGlmIChpc0VtcHR5KHBhdGgpKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG4gICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgdmFyIHZhbHVlLCBpO1xuICAgICAgaWYgKCEodmFsdWUgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGgpKSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCAnJyk7XG4gICAgICB9IGVsc2UgaWYgKGlzQm9vbGVhbih2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIDApO1xuICAgICAgfSBlbHNlIGlmIChpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICB2YWx1ZS5sZW5ndGggPSAwO1xuICAgICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgZm9yIChpIGluIHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGhhc1NoYWxsb3dQcm9wZXJ0eSh2YWx1ZSwgaSkpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB2YWx1ZVtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIG51bGwpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLnB1c2ggPSBmdW5jdGlvbiAob2JqLCBwYXRoIC8qLCB2YWx1ZXMgKi8pe1xuICAgICAgdmFyIGFyciA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCk7XG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkge1xuICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgICAgfVxuXG4gICAgICBhcnIucHVzaC5hcHBseShhcnIsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMikpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmNvYWxlc2NlID0gZnVuY3Rpb24gKG9iaiwgcGF0aHMsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgdmFyIHZhbHVlO1xuXG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gcGF0aHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCh2YWx1ZSA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aHNbaV0pKSAhPT0gdm9pZCAwKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZ2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgZGVmYXVsdFZhbHVlKXtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH1cbiAgICAgIGlmICghcGF0aCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmdldChvYmosIHBhdGguc3BsaXQoJy4nKSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJlbnRQYXRoID0gZ2V0S2V5KHBhdGhbMF0pO1xuICAgICAgdmFyIG5leHRPYmogPSBnZXRTaGFsbG93UHJvcGVydHkob2JqLCBjdXJyZW50UGF0aClcbiAgICAgIGlmIChuZXh0T2JqID09PSB2b2lkIDApIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXh0T2JqO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgZGVmYXVsdFZhbHVlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5kZWwgPSBmdW5jdGlvbiBkZWwob2JqLCBwYXRoKSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG5cbiAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNFbXB0eShwYXRoKSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmRlbChvYmosIHBhdGguc3BsaXQoJy4nKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyZW50UGF0aCA9IGdldEtleShwYXRoWzBdKTtcbiAgICAgIGlmICghaGFzU2hhbGxvd1Byb3BlcnR5KG9iaiwgY3VycmVudFBhdGgpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG5cbiAgICAgIGlmKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICBvYmouc3BsaWNlKGN1cnJlbnRQYXRoLCAxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkZWxldGUgb2JqW2N1cnJlbnRQYXRoXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguZGVsKG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSkpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RQYXRoO1xuICB9XG5cbiAgdmFyIG1vZCA9IGZhY3RvcnkoKTtcbiAgbW9kLmNyZWF0ZSA9IGZhY3Rvcnk7XG4gIG1vZC53aXRoSW5oZXJpdGVkUHJvcHMgPSBmYWN0b3J5KHtpbmNsdWRlSW5oZXJpdGVkUHJvcHM6IHRydWV9KVxuICByZXR1cm4gbW9kO1xufSk7XG4iLCJ2YXIgdjEgPSByZXF1aXJlKCcuL3YxJyk7XG52YXIgdjQgPSByZXF1aXJlKCcuL3Y0Jyk7XG5cbnZhciB1dWlkID0gdjQ7XG51dWlkLnYxID0gdjE7XG51dWlkLnY0ID0gdjQ7XG5cbm1vZHVsZS5leHBvcnRzID0gdXVpZDtcbiIsIi8qKlxuICogQ29udmVydCBhcnJheSBvZiAxNiBieXRlIHZhbHVlcyB0byBVVUlEIHN0cmluZyBmb3JtYXQgb2YgdGhlIGZvcm06XG4gKiBYWFhYWFhYWC1YWFhYLVhYWFgtWFhYWC1YWFhYWFhYWFhYWFhcbiAqL1xudmFyIGJ5dGVUb0hleCA9IFtdO1xuZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICBieXRlVG9IZXhbaV0gPSAoaSArIDB4MTAwKS50b1N0cmluZygxNikuc3Vic3RyKDEpO1xufVxuXG5mdW5jdGlvbiBieXRlc1RvVXVpZChidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IG9mZnNldCB8fCAwO1xuICB2YXIgYnRoID0gYnl0ZVRvSGV4O1xuICByZXR1cm4gYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJ5dGVzVG9VdWlkO1xuIiwiLy8gVW5pcXVlIElEIGNyZWF0aW9uIHJlcXVpcmVzIGEgaGlnaCBxdWFsaXR5IHJhbmRvbSAjIGdlbmVyYXRvci4gIEluIHRoZVxuLy8gYnJvd3NlciB0aGlzIGlzIGEgbGl0dGxlIGNvbXBsaWNhdGVkIGR1ZSB0byB1bmtub3duIHF1YWxpdHkgb2YgTWF0aC5yYW5kb20oKVxuLy8gYW5kIGluY29uc2lzdGVudCBzdXBwb3J0IGZvciB0aGUgYGNyeXB0b2AgQVBJLiAgV2UgZG8gdGhlIGJlc3Qgd2UgY2FuIHZpYVxuLy8gZmVhdHVyZS1kZXRlY3Rpb25cbnZhciBybmc7XG5cbnZhciBjcnlwdG8gPSBnbG9iYWwuY3J5cHRvIHx8IGdsb2JhbC5tc0NyeXB0bzsgLy8gZm9yIElFIDExXG5pZiAoY3J5cHRvICYmIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMpIHtcbiAgLy8gV0hBVFdHIGNyeXB0byBSTkcgLSBodHRwOi8vd2lraS53aGF0d2cub3JnL3dpa2kvQ3J5cHRvXG4gIHZhciBybmRzOCA9IG5ldyBVaW50OEFycmF5KDE2KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZlxuICBybmcgPSBmdW5jdGlvbiB3aGF0d2dSTkcoKSB7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyhybmRzOCk7XG4gICAgcmV0dXJuIHJuZHM4O1xuICB9O1xufVxuXG5pZiAoIXJuZykge1xuICAvLyBNYXRoLnJhbmRvbSgpLWJhc2VkIChSTkcpXG4gIC8vXG4gIC8vIElmIGFsbCBlbHNlIGZhaWxzLCB1c2UgTWF0aC5yYW5kb20oKS4gIEl0J3MgZmFzdCwgYnV0IGlzIG9mIHVuc3BlY2lmaWVkXG4gIC8vIHF1YWxpdHkuXG4gIHZhciBybmRzID0gbmV3IEFycmF5KDE2KTtcbiAgcm5nID0gZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIHI7IGkgPCAxNjsgaSsrKSB7XG4gICAgICBpZiAoKGkgJiAweDAzKSA9PT0gMCkgciA9IE1hdGgucmFuZG9tKCkgKiAweDEwMDAwMDAwMDtcbiAgICAgIHJuZHNbaV0gPSByID4+PiAoKGkgJiAweDAzKSA8PCAzKSAmIDB4ZmY7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJuZHM7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcm5nO1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuLy8gKipgdjEoKWAgLSBHZW5lcmF0ZSB0aW1lLWJhc2VkIFVVSUQqKlxuLy9cbi8vIEluc3BpcmVkIGJ5IGh0dHBzOi8vZ2l0aHViLmNvbS9MaW9zSy9VVUlELmpzXG4vLyBhbmQgaHR0cDovL2RvY3MucHl0aG9uLm9yZy9saWJyYXJ5L3V1aWQuaHRtbFxuXG4vLyByYW5kb20gIydzIHdlIG5lZWQgdG8gaW5pdCBub2RlIGFuZCBjbG9ja3NlcVxudmFyIF9zZWVkQnl0ZXMgPSBybmcoKTtcblxuLy8gUGVyIDQuNSwgY3JlYXRlIGFuZCA0OC1iaXQgbm9kZSBpZCwgKDQ3IHJhbmRvbSBiaXRzICsgbXVsdGljYXN0IGJpdCA9IDEpXG52YXIgX25vZGVJZCA9IFtcbiAgX3NlZWRCeXRlc1swXSB8IDB4MDEsXG4gIF9zZWVkQnl0ZXNbMV0sIF9zZWVkQnl0ZXNbMl0sIF9zZWVkQnl0ZXNbM10sIF9zZWVkQnl0ZXNbNF0sIF9zZWVkQnl0ZXNbNV1cbl07XG5cbi8vIFBlciA0LjIuMiwgcmFuZG9taXplICgxNCBiaXQpIGNsb2Nrc2VxXG52YXIgX2Nsb2Nrc2VxID0gKF9zZWVkQnl0ZXNbNl0gPDwgOCB8IF9zZWVkQnl0ZXNbN10pICYgMHgzZmZmO1xuXG4vLyBQcmV2aW91cyB1dWlkIGNyZWF0aW9uIHRpbWVcbnZhciBfbGFzdE1TZWNzID0gMCwgX2xhc3ROU2VjcyA9IDA7XG5cbi8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vYnJvb2ZhL25vZGUtdXVpZCBmb3IgQVBJIGRldGFpbHNcbmZ1bmN0aW9uIHYxKG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuICB2YXIgYiA9IGJ1ZiB8fCBbXTtcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgY2xvY2tzZXEgPSBvcHRpb25zLmNsb2Nrc2VxICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLmNsb2Nrc2VxIDogX2Nsb2Nrc2VxO1xuXG4gIC8vIFVVSUQgdGltZXN0YW1wcyBhcmUgMTAwIG5hbm8tc2Vjb25kIHVuaXRzIHNpbmNlIHRoZSBHcmVnb3JpYW4gZXBvY2gsXG4gIC8vICgxNTgyLTEwLTE1IDAwOjAwKS4gIEpTTnVtYmVycyBhcmVuJ3QgcHJlY2lzZSBlbm91Z2ggZm9yIHRoaXMsIHNvXG4gIC8vIHRpbWUgaXMgaGFuZGxlZCBpbnRlcm5hbGx5IGFzICdtc2VjcycgKGludGVnZXIgbWlsbGlzZWNvbmRzKSBhbmQgJ25zZWNzJ1xuICAvLyAoMTAwLW5hbm9zZWNvbmRzIG9mZnNldCBmcm9tIG1zZWNzKSBzaW5jZSB1bml4IGVwb2NoLCAxOTcwLTAxLTAxIDAwOjAwLlxuICB2YXIgbXNlY3MgPSBvcHRpb25zLm1zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm1zZWNzIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIHVzZSBjb3VudCBvZiB1dWlkJ3MgZ2VuZXJhdGVkIGR1cmluZyB0aGUgY3VycmVudCBjbG9ja1xuICAvLyBjeWNsZSB0byBzaW11bGF0ZSBoaWdoZXIgcmVzb2x1dGlvbiBjbG9ja1xuICB2YXIgbnNlY3MgPSBvcHRpb25zLm5zZWNzICE9PSB1bmRlZmluZWQgPyBvcHRpb25zLm5zZWNzIDogX2xhc3ROU2VjcyArIDE7XG5cbiAgLy8gVGltZSBzaW5jZSBsYXN0IHV1aWQgY3JlYXRpb24gKGluIG1zZWNzKVxuICB2YXIgZHQgPSAobXNlY3MgLSBfbGFzdE1TZWNzKSArIChuc2VjcyAtIF9sYXN0TlNlY3MpLzEwMDAwO1xuXG4gIC8vIFBlciA0LjIuMS4yLCBCdW1wIGNsb2Nrc2VxIG9uIGNsb2NrIHJlZ3Jlc3Npb25cbiAgaWYgKGR0IDwgMCAmJiBvcHRpb25zLmNsb2Nrc2VxID09PSB1bmRlZmluZWQpIHtcbiAgICBjbG9ja3NlcSA9IGNsb2Nrc2VxICsgMSAmIDB4M2ZmZjtcbiAgfVxuXG4gIC8vIFJlc2V0IG5zZWNzIGlmIGNsb2NrIHJlZ3Jlc3NlcyAobmV3IGNsb2Nrc2VxKSBvciB3ZSd2ZSBtb3ZlZCBvbnRvIGEgbmV3XG4gIC8vIHRpbWUgaW50ZXJ2YWxcbiAgaWYgKChkdCA8IDAgfHwgbXNlY3MgPiBfbGFzdE1TZWNzKSAmJiBvcHRpb25zLm5zZWNzID09PSB1bmRlZmluZWQpIHtcbiAgICBuc2VjcyA9IDA7XG4gIH1cblxuICAvLyBQZXIgNC4yLjEuMiBUaHJvdyBlcnJvciBpZiB0b28gbWFueSB1dWlkcyBhcmUgcmVxdWVzdGVkXG4gIGlmIChuc2VjcyA+PSAxMDAwMCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXVpZC52MSgpOiBDYW5cXCd0IGNyZWF0ZSBtb3JlIHRoYW4gMTBNIHV1aWRzL3NlYycpO1xuICB9XG5cbiAgX2xhc3RNU2VjcyA9IG1zZWNzO1xuICBfbGFzdE5TZWNzID0gbnNlY3M7XG4gIF9jbG9ja3NlcSA9IGNsb2Nrc2VxO1xuXG4gIC8vIFBlciA0LjEuNCAtIENvbnZlcnQgZnJvbSB1bml4IGVwb2NoIHRvIEdyZWdvcmlhbiBlcG9jaFxuICBtc2VjcyArPSAxMjIxOTI5MjgwMDAwMDtcblxuICAvLyBgdGltZV9sb3dgXG4gIHZhciB0bCA9ICgobXNlY3MgJiAweGZmZmZmZmYpICogMTAwMDAgKyBuc2VjcykgJSAweDEwMDAwMDAwMDtcbiAgYltpKytdID0gdGwgPj4+IDI0ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDE2ICYgMHhmZjtcbiAgYltpKytdID0gdGwgPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfbWlkYFxuICB2YXIgdG1oID0gKG1zZWNzIC8gMHgxMDAwMDAwMDAgKiAxMDAwMCkgJiAweGZmZmZmZmY7XG4gIGJbaSsrXSA9IHRtaCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRtaCAmIDB4ZmY7XG5cbiAgLy8gYHRpbWVfaGlnaF9hbmRfdmVyc2lvbmBcbiAgYltpKytdID0gdG1oID4+PiAyNCAmIDB4ZiB8IDB4MTA7IC8vIGluY2x1ZGUgdmVyc2lvblxuICBiW2krK10gPSB0bWggPj4+IDE2ICYgMHhmZjtcblxuICAvLyBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGAgKFBlciA0LjIuMiAtIGluY2x1ZGUgdmFyaWFudClcbiAgYltpKytdID0gY2xvY2tzZXEgPj4+IDggfCAweDgwO1xuXG4gIC8vIGBjbG9ja19zZXFfbG93YFxuICBiW2krK10gPSBjbG9ja3NlcSAmIDB4ZmY7XG5cbiAgLy8gYG5vZGVgXG4gIHZhciBub2RlID0gb3B0aW9ucy5ub2RlIHx8IF9ub2RlSWQ7XG4gIGZvciAodmFyIG4gPSAwOyBuIDwgNjsgKytuKSB7XG4gICAgYltpICsgbl0gPSBub2RlW25dO1xuICB9XG5cbiAgcmV0dXJuIGJ1ZiA/IGJ1ZiA6IGJ5dGVzVG9VdWlkKGIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxO1xuIiwidmFyIHJuZyA9IHJlcXVpcmUoJy4vbGliL3JuZycpO1xudmFyIGJ5dGVzVG9VdWlkID0gcmVxdWlyZSgnLi9saWIvYnl0ZXNUb1V1aWQnKTtcblxuZnVuY3Rpb24gdjQob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG5cbiAgaWYgKHR5cGVvZihvcHRpb25zKSA9PSAnc3RyaW5nJykge1xuICAgIGJ1ZiA9IG9wdGlvbnMgPT0gJ2JpbmFyeScgPyBuZXcgQXJyYXkoMTYpIDogbnVsbDtcbiAgICBvcHRpb25zID0gbnVsbDtcbiAgfVxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICB2YXIgcm5kcyA9IG9wdGlvbnMucmFuZG9tIHx8IChvcHRpb25zLnJuZyB8fCBybmcpKCk7XG5cbiAgLy8gUGVyIDQuNCwgc2V0IGJpdHMgZm9yIHZlcnNpb24gYW5kIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYFxuICBybmRzWzZdID0gKHJuZHNbNl0gJiAweDBmKSB8IDB4NDA7XG4gIHJuZHNbOF0gPSAocm5kc1s4XSAmIDB4M2YpIHwgMHg4MDtcblxuICAvLyBDb3B5IGJ5dGVzIHRvIGJ1ZmZlciwgaWYgcHJvdmlkZWRcbiAgaWYgKGJ1Zikge1xuICAgIGZvciAodmFyIGlpID0gMDsgaWkgPCAxNjsgKytpaSkge1xuICAgICAgYnVmW2kgKyBpaV0gPSBybmRzW2lpXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVmIHx8IGJ5dGVzVG9VdWlkKHJuZHMpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHY0O1xuIl19
