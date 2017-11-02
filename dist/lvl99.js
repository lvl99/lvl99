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
      var _this = this;

      if (_status === 2) {
        var playQueueAfterRunning = function playQueueAfterRunning() {
          _this.play();
        };
        return this.queue('__Queue:playQueueAfterRunning', playQueueAfterRunning);
      }

      clearTimeout(_timer);

      _status = 1;

      _timer = setTimeout(function runQueueProcessAfterDelay(queueInstance) {
        queueInstance.run();
      }(this), _timerDelay);

      return this;
    },
    pause: function pause() {
      var _this2 = this;

      if (_status === 2) {
        var pauseQueueAfterRunning = function pauseQueueAfterRunning() {
          _this2.pause();
        };
        return this.queue('__Queue:pauseQueueAfterRunning', pauseQueueAfterRunning);
      }

      clearTimeout(_timer);

      _status = 0;

      return this;
    },
    run: function run() {
      var _this3 = this;

      if (_status === 2) {
        var runQueueAgainAfterRunning = function runQueueAgainAfterRunning() {
          _this3.run();
        };
        return this.queue('__Queue:runQueueAgainAfterRunning', runQueueAgainAfterRunning);
      }

      clearTimeout(_timer);

      if (!Object.keys(_queue).length) {
        _status = 0;
        return this;
      }

      var _previousStatus = _status;

      _status = 2;

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

      _status = _previousStatus;

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
  } else if (/^['"]|["']$/) {
    return input.replace(/^['"]|['"]$/g, '');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvY29tbW9uLmVzNiIsImVzNi9jb3JlL2FwcC5lczYiLCJlczYvY29yZS9jb21wb25lbnQuZXM2IiwiZXM2L2NvcmUvZW50aXR5LmVzNiIsImVzNi9jb3JlL2luZGV4LmVzNiIsImVzNi9pbmRleC5lczYiLCJlczYvdG9vbHMvYnJlYWtwb2ludHMuZXM2IiwiZXM2L3Rvb2xzL2RlYnVnLmVzNiIsImVzNi90b29scy9pbmRleC5lczYiLCJlczYvdG9vbHMvcXVldWUuZXM2IiwiZXM2L3Rvb2xzL3Ntb290aC1zY3JvbGwuZXM2IiwiZXM2L3Rvb2xzL3RyYWNrZXZlbnQuZXM2IiwiZXM2L3V0aWxzL2luZGV4LmVzNiIsImVzNi91dGlscy9pbmhlcml0YW5jZS5lczYiLCJlczYvdXRpbHMvcGFyc2UuZXM2IiwiaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm1lcmdlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1wYXRoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDUUEsSUFBTSxJQUFLLE9BQU8sTUFBUCxLQUFrQixXQUFsQixHQUFnQyxPQUFPLFFBQVAsQ0FBaEMsR0FBbUQsT0FBTyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDLE9BQU8sUUFBUCxDQUFoQyxHQUFtRCxJQUFqSDs7QUFLQSxJQUFNLE9BQU8sRUFBRSxRQUFGLENBQWI7QUFDQSxJQUFNLE9BQU8sRUFBRSxNQUFGLENBQWI7QUFDQSxJQUFNLFFBQVEsRUFBRSxNQUFGLENBQWQ7QUFDQSxJ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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQy9wRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwU0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKipcbiAqIExWTDk5IENvbW1vblxuICpcbiAqIENvbW1vbiBkZXBlbmRlbmNpZXMgYW5kIG90aGVyIHVzZWZ1bCB0aGluZ3NcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0ICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snalF1ZXJ5J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydqUXVlcnknXSA6IG51bGwpXG5cbi8qKlxuICogQmFzaWMgc2hvcnRoYW5kIHByb3BzIHRvIGNhY2hlL3JlZmVyZW5jZSBjb21tb24galF1ZXJ5IG9iamVjdHNcbiAqL1xuY29uc3QgJGRvYyA9ICQoZG9jdW1lbnQpXG5jb25zdCAkd2luID0gJCh3aW5kb3cpXG5jb25zdCAkaHRtbCA9ICQoJ2h0bWwnKVxuY29uc3QgJGJvZHkgPSAkKCdib2R5JylcblxuLyoqXG4gKiBFdmVudCBuYW1lIHNob3J0aGFuZHNcbiAqL1xuY29uc3QgZXZlbnRzID0ge1xuICBjbGljazogJ2NsaWNrIHRvdWNoZW5kJyxcbiAgaW5wdXRzdGFydDogJ21vdXNlZG93biB0b3VjaHN0YXJ0IGtleWRvd24nLFxuICBpbnB1dGVuZDogJ21vdXNldXAgdG91Y2hlbmQga2V5dXAnLFxuICBhbmltYXRpb25ydW46ICdhbmltYXRpb25ydW4gd2Via2l0QW5pbWF0aW9uUnVuIHdlYmtpdGFuaW1hdGlvbnJ1biBtb3pBbmltYXRpb25SdW4gTVNBbmltYXRpb25SdW4gb0FuaW1hdGlvblJ1biBvYW5pbWF0aW9ucnVuJyxcbiAgYW5pbWF0aW9uc3RhcnQ6ICdhbmltYXRpb25zdGFydCB3ZWJraXRBbmltYXRpb25TdGFydCB3ZWJraXRhbmltYXRpb25zdGFydCBtb3pBbmltYXRpb25TdGFydCBNU0FuaW1hdGlvblN0YXJ0IG9BbmltYXRpb25TdGFydCBvYW5pbWF0aW9uc3RhcnQnLFxuICBhbmltYXRpb25lbmQ6ICdhbmltYXRpb25lbmQgd2Via2l0QW5pbWF0aW9uRW5kIHdlYmtpdGFuaW1hdGlvbmVuZCBtb3pBbmltYXRpb25FbmQgTVNBbmltYXRpb25FbmQgb0FuaW1hdGlvbkVuZCBvYW5pbWF0aW9uZW5kJyxcbiAgdHJhbnNpdGlvbnJ1bjogJ3RyYW5zaXRpb25ydW4gd2Via2l0VHJhbnNpdGlvblJ1biB3ZWJraXR0cmFuc2l0aW9ucnVuIG1velRyYW5zaXRpb25SdW4gTVNUcmFuc2l0aW9uUnVuIG9UcmFuc2l0aW9uUnVuIG90cmFuc2l0aW9ucnVuJyxcbiAgdHJhbnNpdGlvbnN0YXJ0OiAndHJhbnNpdGlvbnN0YXJ0IHdlYmtpdFRyYW5zaXRpb25TdGFydCB3ZWJraXR0cmFuc2l0aW9uc3RhcnQgbW96VHJhbnNpdGlvblN0YXJ0IE1TVHJhbnNpdGlvblN0YXJ0IG9UcmFuc2l0aW9uU3RhcnQgb3RyYW5zaXRpb25zdGFydCcsXG4gIHRyYW5zaXRpb25lbmQ6ICd0cmFuc2l0aW9uZW5kIHdlYmtpdFRyYW5zaXRpb25FbmQgd2Via2l0dHJhbnNpdGlvbmVuZCBtb3pUcmFuc2l0aW9uRW5kIE1TVHJhbnNpdGlvbkVuZCBvVHJhbnNpdGlvbkVuZCBvdHJhbnNpdGlvbmVuZCdcbn1cblxuY29uc3QgdXRpbHMgPSB7XG4gICQsXG4gICRkb2MsXG4gICR3aW4sXG4gICRodG1sLFxuICAkYm9keSxcbiAgZXZlbnRzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHNcbiIsIi8qKlxuICogTFZMOTkgQXBwXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG4vLyBjb25zdCBQcm9taXNlID0gcmVxdWlyZSgnYmx1ZWJpcmQnKVxuY29uc3QgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydqUXVlcnknXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2pRdWVyeSddIDogbnVsbClcbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJylcbmNvbnN0IEVudGl0eSA9IHJlcXVpcmUoJy4vZW50aXR5JylcbmNvbnN0IHtcbiAgY29udmVydFN0cmluZ1RvSnNvbixcbiAgZXh0cmFjdENsYXNzRGV0YWlsc1xufSA9IHJlcXVpcmUoJy4uL3V0aWxzL3BhcnNlJylcblxuLyoqXG4gKiBHZXQgYSBjb21wb25lbnQncyBuYW1lc3BhY2VcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudFxuICogQHJldHVybnMge3VuZGVmaW5lZHxTdHJpbmd8Q29tcG9uZW50fVxuICovXG5mdW5jdGlvbiBnZXRDb21wb25lbnROYW1lc3BhY2UgKGNvbXBvbmVudCkge1xuICBsZXQgY29tcG9uZW50TlMgPSBjb21wb25lbnRcblxuICAvLyBGdW5jdGlvbi9jbGFzcyBnaXZlblxuICBpZiAodHlwZW9mIGNvbXBvbmVudCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGlmIChjb21wb25lbnQuTlMpIHtcbiAgICAgIGNvbXBvbmVudE5TID0gY29tcG9uZW50Lk5TXG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbXBvbmVudE5TID0gY29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci5uYW1lXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNvbXBvbmVudE5TXG59XG5cbi8qKlxuICogVGhlIEFwcCdzIGJhc2UgcHJvcGVydGllc1xuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IEFwcFByb3BlcnRpZXMgPSB7XG4gIC8qKlxuICAgKiBOQU1FU1BBQ0VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBjdXN0b20gZXZlbnRzIGFuZCBlcnJvciByZXBvcnRpbmdcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIF9OUzogJ0xWTDk5OkFwcCcsXG5cbiAgLyoqXG4gICAqIG5hbWVzcGFjZVxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIENTUyBjbGFzc2VzXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBfbnM6ICdsdmw5OS1hcHAnLFxuXG4gIC8qKlxuICAgKiBUaGUgcHJvcGVydGllcyBzaGFyZWQgYmV0d2VlbiBhbGwgaW5zdGFuY2VzIG9mIHRoaXMgQXBwXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfcHJvcGVydGllczoge30sXG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGF0dHJpYnV0ZXMgdG8gbG9hZCBhIGNyZWF0ZWQgQXBwIGluc3RhbmNlIHdpdGguXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfYXR0cmlidXRlczoge30sXG5cbiAgLyoqXG4gICAqIFRoZSBsaWJyYXJ5IG9mIGNvbXBvbmVudHMgdGhhdCB0aGUgYXBwIGhhcyBhY2Nlc3MgdG9cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9jb21wb25lbnRzOiB7fSxcblxuICAvKipcbiAgICogVGhlIGNvbGxlY3Rpb24gb2YgY29tcG9uZW50cyB3aGljaCBoYXZlIGJlZW4gaW5zdGFudGlhdGVkIHdpdGhpbiB0aGUgYXBwXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfY29tcG9uZW50SW5zdGFuY2VzOiB7fVxufVxuXG4vKipcbiAqIEFwcFxuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgRW50aXR5XG4gKi9cbmNsYXNzIEFwcCBleHRlbmRzIEVudGl0eSB7XG4gIC8qKlxuICAgKiBBcHAgY29uc3RydWN0b3JcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoYXR0cmlidXRlcykge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGBMVkw5OTpBcHA6Y29uc3RydWN0b3JgKVxuXG4gICAgc3VwZXIoYXR0cmlidXRlcylcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIEFwcCB3aXRoIGFueSBnaXZlbiB7T2JqZWN0fSBhcmd1bWVudHNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IC4uLmFyZ3VtZW50c1xuICAgKi9cbiAgZXh0ZW5kICgpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgTFZMOTk6QXBwOmV4dGVuZGAsIHtcbiAgICAvLyAgIGFyZ3VtZW50c1xuICAgIC8vIH0pXG5cbiAgICAvLyBNZXJnZSB0aGUgcHJvcGVydGllcyB3aXRoIHRoZSBpbnN0YW50aWF0ZWQgYXR0cmlidXRlc1xuICAgIHN1cGVyLmV4dGVuZChBcHBQcm9wZXJ0aWVzLCAuLi5hcmd1bWVudHMpXG4gIH1cblxuICAvKipcbiAgICogUmVnaXN0ZXIgYSBjb21wb25lbnQgY2xhc3MgaW4gdGhlIGFwcC4gWW91IGNhbiBhbHNvIHNwZWNpZnkgYSBzZXBhcmF0ZSBuYW1lc3BhY2UgdG8gcmVnaXN0ZXIgaXQgdW5kZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRDbGFzc1xuICAgKiBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50Q2xhc3NOYW1lc3BhY2VcbiAgICovXG4gIHJlZ2lzdGVyQ29tcG9uZW50Q2xhc3MgKGNvbXBvbmVudENsYXNzLCBjb21wb25lbnRDbGFzc05hbWVzcGFjZSkge1xuICAgIGxldCBjb21wb25lbnRDbGFzc05TXG5cbiAgICAvLyBObyB2YWxpZCBjb21wb25lbnRDbGFzcyBnaXZlblxuICAgIGlmICghY29tcG9uZW50Q2xhc3MpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY29tcG9uZW50IGNsYXNzIHdhcyBnaXZlbicpXG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBuYW1lc3BhY2UgZnJvbSB0aGUgY29tcG9uZW50IGNsYXNzIChvciBvdGhlcndpc2Ugc3BlY2lmaWVkKVxuICAgIGNvbXBvbmVudENsYXNzTlMgPSBnZXRDb21wb25lbnROYW1lc3BhY2UoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UgfHwgY29tcG9uZW50Q2xhc3MpXG5cbiAgICAvLyBSZWdpc3RlciB0aGUgY29tcG9uZW50IGNsYXNzXG4gICAgaWYgKGNvbXBvbmVudENsYXNzTlMpIHtcbiAgICAgIHRoaXMuX2NvbXBvbmVudHNbY29tcG9uZW50Q2xhc3NOU10gPSBjb21wb25lbnRDbGFzc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBEZXJlZ2lzdGVyIGEgY29tcG9uZW50IGNsYXNzIGJ5IG5hbWVzcGFjZVxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xDb21wb25lbnR9IGNvbXBvbmVudENsYXNzTmFtZXNwYWNlXG4gICAqL1xuICBkZXJlZ2lzdGVyQ29tcG9uZW50Q2xhc3MgKGNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSB7XG4gICAgbGV0IGNvbXBvbmVudENsYXNzTlNcblxuICAgIC8vIE5vIHZhbGlkIGNvbXBvbmVudENsYXNzIGdpdmVuXG4gICAgaWYgKCFjb21wb25lbnRDbGFzc05hbWVzcGFjZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb21wb25lbnQgY2xhc3MgbmFtZXNwYWNlIHdhcyBnaXZlbicpXG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBuYW1lc3BhY2VcbiAgICBjb21wb25lbnRDbGFzc05TID0gZ2V0Q29tcG9uZW50TmFtZXNwYWNlKGNvbXBvbmVudENsYXNzTmFtZXNwYWNlKVxuXG4gICAgLy8gUmVtb3ZlIHRoZSBjb21wb25lbnQgY2xhc3NcbiAgICBpZiAoY29tcG9uZW50Q2xhc3NOUyAmJiB0aGlzLl9jb21wb25lbnRzLmhhc093blByb3BlcnR5KGNvbXBvbmVudENsYXNzTlMpKSB7XG4gICAgICB0aGlzLl9jb21wb25lbnRzW2NvbXBvbmVudENsYXNzTlNdID0gdW5kZWZpbmVkXG4gICAgICBkZWxldGUgdGhpcy5fY29tcG9uZW50c1tjb21wb25lbnRDbGFzc05TXVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBjb21wb25lbnQgY2xhc3MgYnkgbmFtZXNwYWNlXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnRDbGFzc05hbWVzcGFjZVxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR8Q29tcG9uZW50fVxuICAgKi9cbiAgZ2V0Q29tcG9uZW50Q2xhc3MgKGNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSB7XG4gICAgbGV0IGNvbXBvbmVudENsYXNzTlMgPSBjb21wb25lbnRDbGFzc05hbWVzcGFjZVxuXG4gICAgaWYgKCFjb21wb25lbnRDbGFzc05hbWVzcGFjZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb21wb25lbnQgY2xhc3MgbmFtZXNwYWNlIHdhcyBnaXZlbicpXG4gICAgfVxuXG4gICAgLy8gR2V0IHRoZSBjb21wb25lbnQgY2xhc3NcbiAgICBpZiAoY29tcG9uZW50Q2xhc3NOUyAmJiB0aGlzLl9jb21wb25lbnRzLmhhc093blByb3BlcnR5KGNvbXBvbmVudENsYXNzTlMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50c1tjb21wb25lbnRDbGFzc05TXVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGQgY29tcG9uZW50IGluc3RhbmNlIHRvIGFwcCBhbmQgaW5pdGlhbGlzZSB0aGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRJbnN0YW5jZVxuICAgKi9cbiAgYWRkQ29tcG9uZW50SW5zdGFuY2UgKGNvbXBvbmVudEluc3RhbmNlKSB7XG4gICAgY29tcG9uZW50SW5zdGFuY2UuX2FwcCA9IHRoaXNcblxuICAgIC8vIEFkZCBjb21wb25lbnQgaW5zdGFuY2UgdG8gY29sbGVjdGlvblxuICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tjb21wb25lbnRJbnN0YW5jZS51dWlkXSA9IGNvbXBvbmVudEluc3RhbmNlXG5cbiAgICAvLyBJbml0aWFsaXNlIHRoZSBjb21wb25lbnRcbiAgICBjb21wb25lbnRJbnN0YW5jZS5pbml0KClcbiAgfVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgY29tcG9uZW50IGluc3RhbmNlXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnRDbGFzc05hbWVzcGFjZVxuICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICAgKiBAcmV0dXJucyB7Q29tcG9uZW50fVxuICAgKi9cbiAgY3JlYXRlQ29tcG9uZW50SW5zdGFuY2UgKGNvbXBvbmVudENsYXNzTmFtZXNwYWNlLCBhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5OU30uY3JlYXRlQ29tcG9uZW50SW5zdGFuY2U6ICR7Y29tcG9uZW50Q2xhc3NOYW1lc3BhY2V9YClcblxuICAgIC8vIENyZWF0ZSBhbmQgaW5pdGlhbGlzZSB0aGUgY29tcG9uZW50XG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpKSB7XG4gICAgICBsZXQgbmV3Q29tcG9uZW50ID0gbmV3IHRoaXMuX2NvbXBvbmVudHNbY29tcG9uZW50Q2xhc3NOYW1lc3BhY2VdKGF0dHJpYnV0ZXMpXG5cbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5OU30uY3JlYXRlQ29tcG9uZW50SW5zdGFuY2VgLCB7XG4gICAgICAvLyAgIGNvbXBvbmVudENsYXNzTmFtZXNwYWNlLFxuICAgICAgLy8gICBuZXdDb21wb25lbnQsXG4gICAgICAvLyAgIGF0dHJpYnV0ZXNcbiAgICAgIC8vIH0pXG5cbiAgICAgIC8vIEFkZCBpbnN0YW5jZSB0byBhcHBcbiAgICAgIHRoaXMuYWRkQ29tcG9uZW50SW5zdGFuY2UobmV3Q29tcG9uZW50KVxuXG4gICAgICByZXR1cm4gbmV3Q29tcG9uZW50XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGNvbXBvbmVudCBpbnN0YW5jZSBieSBVVUlEXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnRVVUlEXG4gICAqIEByZXR1cm5zIHt1bmRlZmluZWR8Q29tcG9uZW50fVxuICAgKi9cbiAgZ2V0Q29tcG9uZW50SW5zdGFuY2UgKGNvbXBvbmVudFVVSUQpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLk5TfS5nZXRDb21wb25lbnRJbnN0YW5jZTogJHtjb21wb25lbnRVVUlEfWApXG5cbiAgICBpZiAodGhpcy5fY29tcG9uZW50SW5zdGFuY2VzLmhhc093blByb3BlcnR5KGNvbXBvbmVudFVVSUQpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzW2NvbXBvbmVudFVVSURdXG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZSBjb21wb25lbnQgaW5zdGFuY2UgYnkgVVVJRFxuICAgKlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50VVVJRFxuICAgKi9cbiAgcmVtb3ZlQ29tcG9uZW50SW5zdGFuY2UgKGNvbXBvbmVudFVVSUQpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLk5TfS5yZW1vdmVDb21wb25lbnRJbnN0YW5jZTogJHtjb21wb25lbnRVVUlEfWApXG5cbiAgICBsZXQgcmVtb3ZlQ29tcG9uZW50SW5zdGFuY2UgPSB0aGlzLmdldENvbXBvbmVudEluc3RhbmNlKGNvbXBvbmVudFVVSUQpXG4gICAgaWYgKHR5cGVvZiByZW1vdmVDb21wb25lbnRJbnN0YW5jZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5OU30ucmVtb3ZlQ29tcG9uZW50SW5zdGFuY2U6IGZvdW5kIGNvbXBvbmVudCBpbnN0YW5jZSB0byByZW1vdmVgLCByZW1vdmVDb21wb25lbnRJbnN0YW5jZSlcblxuICAgICAgcmVtb3ZlQ29tcG9uZW50SW5zdGFuY2UuZGVzdHJveSgpXG5cbiAgICAgIC8vIEBUT0RPIHRoZSBmb2xsb3dpbmcgc2hvdWxkIHByb2JhYmx5IG9ubHkgaGFwcGVuIGFmdGVyIGEgUHJvbWlzZSBpcyByZXNvbHZlZFxuICAgICAgLy8gUmVtb3ZlIGVudHJ5IGluIHRoZSBjb21wb25lbnRJbnN0YW5jZXMgb2JqZWN0XG4gICAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbY29tcG9uZW50VVVJRF0gPSB1bmRlZmluZWRcbiAgICAgIGRlbGV0ZSB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbY29tcG9uZW50VVVJRF1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSBhbnkgY29tcG9uZW50IHdoaWNoIGlzIG1hcmtlZCBpbiB0aGUgRE9NXG4gICAqL1xuICBpbml0aWFsaXNlQ29tcG9uZW50cyAoKSB7XG4gICAgLy8gRmluZCBhbnkgZWxlbWVudCBtYXJrZWQgd2l0aCB0aGUgYFtkYXRhLWNvbXBvbmVudF1gIGF0dHJpYnV0ZVxuICAgICQoJ1tkYXRhLWNvbXBvbmVudF0nKVxuICAgICAgLy8gSWdub3JlIGNvbXBvbmVudHMgd2hpY2ggYWxyZWFkeSBoYXZlIGFuIElEIGFzc2lnbmVkXG4gICAgICAubm90KCdbZGF0YS1jb21wb25lbnQtaWRdJylcbiAgICAgIC8vIEluaXRpYWxpc2UgZWFjaCBjb21wb25lbnRcbiAgICAgIC5lYWNoKChpbmRleCwgZWxlbSkgPT4ge1xuICAgICAgICBsZXQgJGVsZW0gPSAkKGVsZW0pXG4gICAgICAgIGxldCBlbGVtQ29tcG9uZW50Q2xhc3MgPSAkZWxlbS5hdHRyKCdkYXRhLWNvbXBvbmVudCcpXG4gICAgICAgIGxldCBlbGVtQ29tcG9uZW50T3B0aW9ucyA9ICRlbGVtLmF0dHIoJ2RhdGEtY29tcG9uZW50LW9wdGlvbnMnKSB8fCB7fVxuXG4gICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLl9OU30uaW5pdGlhbGlzZUNvbXBvbmVudHM6IGZvdW5kIGVsZW1lbnQgdG8gaW5pdGlhbGlzZSB3aXRoIGNvbXBvbmVudGAsIHtcbiAgICAgICAgLy8gICBpbmRleCxcbiAgICAgICAgLy8gICBlbGVtLFxuICAgICAgICAvLyAgIGVsZW1Db21wb25lbnRDbGFzcyxcbiAgICAgICAgLy8gICBlbGVtQ29tcG9uZW50T3B0aW9uc1xuICAgICAgICAvLyB9KVxuXG4gICAgICAgIC8vIEVuc3VyZSBjb21wb25lbnQgY2xhc3MgaXMgcmVnaXN0ZXJlZFxuICAgICAgICBpZiAoIXRoaXMuZ2V0Q29tcG9uZW50Q2xhc3MoZWxlbUNvbXBvbmVudENsYXNzKSkge1xuICAgICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoYCR7dGhpcy5fTlN9LmluaXRpYWxpc2VDb21wb25lbnRzOiBlbGVtZW50J3MgY29tcG9uZW50IGNsYXNzIG5vdCByZWdpc3RlcmVkYCwge1xuICAgICAgICAgIC8vICAgYXBwOiB0aGlzLFxuICAgICAgICAgIC8vICAgaW5kZXgsXG4gICAgICAgICAgLy8gICBlbGVtLFxuICAgICAgICAgIC8vICAgZWxlbUNvbXBvbmVudENsYXNzLFxuICAgICAgICAgIC8vICAgZWxlbUNvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgICAvLyB9KVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRXh0cmFjdC9jb252ZXJ0IHRoZSBvcHRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgZWxlbUNvbXBvbmVudE9wdGlvbnMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgLy8gU2V0IGFzIEpTT04sIGUuZy4gJ3tcIm5hbWVcIjpcInZhbHVlXCJ9YFxuICAgICAgICAgIGlmICgvXlxcey8udGVzdChlbGVtQ29tcG9uZW50T3B0aW9ucykpIHtcbiAgICAgICAgICAgIGVsZW1Db21wb25lbnRPcHRpb25zID0gY29udmVydFN0cmluZ1RvSnNvbihlbGVtQ29tcG9uZW50T3B0aW9ucylcblxuICAgICAgICAgICAgLy8gU2V0IGFzIHN0eWxlLWxpa2UgYXR0cmlidXRlcywgZS5nLiBgbmFtZTogdmFsdWU7IG5hbWU6IHZhbHVlYFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtQ29tcG9uZW50T3B0aW9ucyA9IGV4dHJhY3RDbGFzc0RldGFpbHMoZWxlbUNvbXBvbmVudE9wdGlvbnMpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHRoZSAkZWxlbSBpZiBpdCBpcyBub3QgYWxyZWFkeSBzZXRcbiAgICAgICAgaWYgKCFlbGVtQ29tcG9uZW50T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnJGVsZW0nKSkge1xuICAgICAgICAgIGVsZW1Db21wb25lbnRPcHRpb25zLiRlbGVtID0gJGVsZW1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENyZWF0ZSB0aGUgY29tcG9uZW50XG4gICAgICAgIGxldCBlbGVtQ29tcG9uZW50SW5zdGFuY2UgPSB0aGlzLmNyZWF0ZUNvbXBvbmVudEluc3RhbmNlKGVsZW1Db21wb25lbnRDbGFzcywgZWxlbUNvbXBvbmVudE9wdGlvbnMpXG5cbiAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdJbml0aWFsaXNlZCBjb21wb25lbnQgaW5zdGFuY2UnLCB7XG4gICAgICAgIC8vICAgaW5kZXgsXG4gICAgICAgIC8vICAgZWxlbSxcbiAgICAgICAgLy8gICBlbGVtQ29tcG9uZW50T3B0aW9ucyxcbiAgICAgICAgLy8gICBlbGVtQ29tcG9uZW50SW5zdGFuY2VcbiAgICAgICAgLy8gfSlcbiAgICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBcHBcbiIsIi8qKlxuICogTFZMOTkgQ29tcG9uZW50XG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBvYmplY3RQYXRoID0gcmVxdWlyZSgnb2JqZWN0LXBhdGgnKVxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKVxuY29uc3QgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKVxuY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKVxuY29uc3QgeyAkLCAkZG9jIH0gPSByZXF1aXJlKCcuLi9jb21tb24nKVxuLy8gY29uc3QgeyB3cmFwIH0gPSByZXF1aXJlKCcuLi91dGlscy9zdXBlcicpXG5jb25zdCB7XG4gIGV4dHJhY3RUcmlnZ2VyRGV0YWlscyxcbiAgZXh0cmFjdFRhcmdldEV2ZW50TmFtZXMsXG4gIGdldFRhcmdldEJ5U2VsZWN0b3IsXG4gIGdldFRhcmdldFNlbGVjdG9yXG59ID0gcmVxdWlyZSgnLi4vdXRpbHMvcGFyc2UnKVxuXG4vKipcbiAqIFRoZSBDb21wb25lbnQncyBiYXNlIHByb3BlcnRpZXNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBDb21wb25lbnRQcm9wZXJ0aWVzID0ge1xuICAvKipcbiAgICogTkFNRVNQQUNFXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgY3VzdG9tIGV2ZW50cyBhbmQgZXJyb3IgcmVwb3J0aW5nXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqIEBkZWZhdWx0IExWTDk5XG4gICAqL1xuICBfTlM6ICdMVkw5OTpDb21wb25lbnQnLFxuXG4gIC8qKlxuICAgKiBuYW1lc3BhY2VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBDU1MgY2xhc3Nlc1xuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKiBAZGVmYXVsdCBsdmw5OVxuICAgKi9cbiAgX25zOiAnbHZsOTktY29tcG9uZW50JyxcblxuICAvKipcbiAgICogVGhlIHByb3BlcnRpZXMgc2hhcmVkIGJldHdlZW4gYWxsIGluc3RhbmNlcyBvZiB0aGlzIENvbXBvbmVudFxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX3Byb3BlcnRpZXM6IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZXMgb2YgQ29tcG9uZW50IG1ldGhvZHMgdG8gcHVibGljbHkgZXhwb3NlIGluIHRoZSBET00gdmlhIGN1c3RvbSBldmVudHMgKGF0dGFjaGVkIGR1cmluZyBgaW5pdGApLlxuICAgICAqXG4gICAgICogRWFjaCBlbnRyeSBjYW4gYmUgYSBzdHJpbmcgKHdoaWNoIHdpbGwgdGhlbiBiZSBhIGdsb2JhbCBldmVudDsgYmUgY2FyZWZ1bCB3aXRoIGdsb2JhbCBldmVudHMgYmVpbmcgYXR0YWNoZWQgdHdpY2UpLFxuICAgICAqIG9yIGNhbiBiZSBhbiBvYmplY3Qgd2hlcmUgeW91IHNwZWNpZnkgdGhlIHRhcmdldCAob2Z0ZW4gJ3NlbGYnKSBhbmQgc2V0IHdoYXQgbWV0aG9kIHRvIGRvIG9uIHdoYXRldmVyIGV2ZW50LCBlLmcuOlxuICAgICAqXG4gICAgICogYGBgXG4gICAgICogICAvLyBUaGlzIHdpbGwgdHJpZ2dlciB0aGUgQ29tcG9uZW50J3MgYGV4YW1wbGVNZXRob2RgIHdoZW4gdGhlIENvbXBvbmVudCdzICRlbGVtIGlzIHRhcmdldGVkL3RyaWdnZXJlZFxuICAgICAqICAgLy8gdXNpbmcgdGhlIGF1dG9tYXRpY2FsbHkgZ2VuZXJhdGVkIGN1c3RvbSBldmVudCBuYW1lOlxuICAgICAqICAgLy8gYCRlbGVtLnRyaWdnZXIoJ0NvbXBvbmVudDpleGFtcGxlTWV0aG9kJylgXG4gICAgICogICB7XG4gICAgICogICAgIHRhcmdldDogJ3NlbGYnLFxuICAgICAqICAgICBkbzogJ2V4YW1wbGVNZXRob2QnXG4gICAgICogICB9XG4gICAgICpcbiAgICAgKiAgIC8vIFRoaXMgd2lsbCB0cmlnZ2VyIHRoZSBDb21wb25lbnQncyBgZXhhbXBsZU1ldGhvZGAgd2hlbiB0aGUgZG9jdW1lbnQgaXMgdGFyZ2V0ZWQvdHJpZ2dlcmVkIHVzaW5nIGEgY3VzdG9tXG4gICAgICogICAvLyBldmVudCBuYW1lOlxuICAgICAqICAgLy8gYCQoZG9jdW1lbnQpLnRyaWdnZXIoJ2N1c3RvbUV2ZW50TmFtZScpYFxuICAgICAqICAge1xuICAgICAqICAgICB0YXJnZXQ6ICdkb2N1bWVudCcsXG4gICAgICogICAgIGRvOiAnZXhhbXBsZU1ldGhvZCcsXG4gICAgICogICAgIG9uOiAnY3VzdG9tRXZlbnROYW1lJ1xuICAgICAqICAgfVxuICAgICAqXG4gICAgICogICAvLyBUaGlzIHdpbGwgdHJpZ2dlciB0aGUgQ29tcG9uZW50J3MgYGV4YW1wbGVNZXRob2RgIHdoZW4gdGhlIHdpbmRvdyBpcyBzY3JvbGxlZDpcbiAgICAgKiAgIC8vIGAkKHdpbmRvdykuc2Nyb2xsKClgXG4gICAgICogICB7XG4gICAgICogICAgIHRhcmdldDogJ3dpbmRvdycsXG4gICAgICogICAgIGRvOiAnZXhhbXBsZU1ldGhvZCcsXG4gICAgICogICAgIG9uOiAnc2Nyb2xsJ1xuICAgICAqICAgfVxuICAgICAqIGBgYFxuICAgICAqXG4gICAgICogQHR5cGUge0FycmF5fVxuICAgICAqL1xuICAgIHB1YmxpY01ldGhvZHM6IFtdLFxuXG4gICAgLyoqXG4gICAgICogVGhlIHRhcmdldCB0byBhcHBseSBhbnkgQ1NTIGNsYXNzZXMgdG9cbiAgICAgKlxuICAgICAqIEB0eXBlIHtqUXVlcnlPYmplY3R9XG4gICAgICovXG4gICAgJGNsYXNzVGFyZ2V0OiB1bmRlZmluZWRcbiAgfSxcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgYXR0cmlidXRlcyB0byBsb2FkIGEgY3JlYXRlZCBDb21wb25lbnQgaW5zdGFuY2Ugd2l0aC5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9hdHRyaWJ1dGVzOiB7XG4gICAgLyoqXG4gICAgICogVGhlIG1haW4gZWxlbWVudCB0aGF0IHJlcHJlc2VudHMgdGhlIENvbXBvbmVudCBpbiB0aGUgRE9NLiBDb21wb25lbnQgZXZlbnRzIHdpbGwgYmUgbWFuYWdlZCB0aHJvdWdoIHRoaXMgZWxlbWVudC5cbiAgICAgKi9cbiAgICAkZWxlbTogdW5kZWZpbmVkXG4gIH1cbn1cblxuLyoqXG4gKiBDb21wb25lbnRcbiAqXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIEVudGl0eVxuICovXG5jbGFzcyBDb21wb25lbnQgZXh0ZW5kcyBFbnRpdHkge1xuICAvKipcbiAgICogQ29tcG9uZW50IGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZygnTFZMOTk6Q29tcG9uZW50OmNvbnN0cnVjdG9yJywge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIHN1cGVyKGF0dHJpYnV0ZXMpXG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBDb21wb25lbnQncyBwcm9wZXJ0aWVzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAuLi5hcmd1bWVudHNcbiAgICovXG4gIGV4dGVuZCAoKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coJ0xWTDk5OkNvbXBvbmVudDpleHRlbmQnLCB7XG4gICAgLy8gICBhcmd1bWVudHNcbiAgICAvLyB9KVxuXG4gICAgLy8gQ29uY2F0IGFsbCB0aGUgcHVibGljTWV0aG9kcyBpbnRvIG9uZSBhcnJheSAoc2luY2UgbWVyZ2UgZG9lc24ndCBkbyB0aGF0IHdpdGggcGxhaW4gYXJyYXlzKVxuICAgIGxldCBhcmdzID0gWy4uLmFyZ3VtZW50c11cbiAgICBsZXQgYWxsUHVibGljTWV0aG9kcyA9IENvbXBvbmVudFByb3BlcnRpZXMuX3Byb3BlcnRpZXMucHVibGljTWV0aG9kcy5zbGljZSgwKVxuICAgIGFyZ3MuZm9yRWFjaCgoYXJnKSA9PiB7XG4gICAgICBsZXQgaGFzUHVibGljTWV0aG9kcyA9IG9iamVjdFBhdGguZ2V0KGFyZywgJ19wcm9wZXJ0aWVzLnB1YmxpY01ldGhvZHMnKVxuICAgICAgaWYgKGhhc1B1YmxpY01ldGhvZHMgJiYgaGFzUHVibGljTWV0aG9kcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGFsbFB1YmxpY01ldGhvZHMgPSBhbGxQdWJsaWNNZXRob2RzLmNvbmNhdChoYXNQdWJsaWNNZXRob2RzKVxuICAgICAgfVxuICAgIH0pXG4gICAgYWxsUHVibGljTWV0aG9kcyA9IEFycmF5LmZyb20obmV3IFNldChhbGxQdWJsaWNNZXRob2RzKSlcblxuICAgIC8vIEV4dGVuZCB0aGUgY29tcG9uZW50J3MgcHJvcGVydGllcyB3aXRoIHRoZSBpbnN0YW50aWF0ZWQgYXR0cmlidXRlcyBhbmQgY29uY2F0ZW5hdGVkIHB1YmxpYyBtZXRob2RzXG4gICAgc3VwZXIuZXh0ZW5kKENvbXBvbmVudFByb3BlcnRpZXMsIC4uLmFyZ3VtZW50cywge1xuICAgICAgX3Byb3BlcnRpZXM6IHtcbiAgICAgICAgcHVibGljTWV0aG9kczogYWxsUHVibGljTWV0aG9kc1xuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBjb21wb25lbnQncyBlbGVtZW50XG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZHxqUXVlcnlPYmplY3R9XG4gICAqL1xuICBnZXRFbGVtICgpIHtcbiAgICAvLyBTb2Z0IHJldHVyblxuICAgIGlmICghdGhpcy5nZXRBdHRyKCdlbGVtJykgJiYgKCF0aGlzLmdldEF0dHIoJyRlbGVtJykgfHwgIXRoaXMuZ2V0QXR0cignJGVsZW0nKS5sZW5ndGgpKSB7XG4gICAgICBjb25zb2xlLndhcm4oYCR7dGhpcy5OU30uZ2V0RWxlbTogbm8gZWxlbSB3YXMgZm91bmQgZm9yIHRoaXMgY29tcG9uZW50LiBUaGlzIG1heSBjYXVzZSBwcm9ibGVtcyB3aXRoIGNvbXBvbmVudHMgd2hpY2ggcmVseSBvbiB0aGUgZWxlbSBhdHRyaWJ1dGUuYClcbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9XG5cbiAgICAvLyBFbGVtIChvciAkZWxlbSkgaXMgc2V0IHRvIHN0cmluZ1xuICAgIGlmICh0eXBlb2YgdGhpcy5nZXRBdHRyKCdlbGVtJykgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aGlzLmdldEF0dHIoJyRlbGVtJykgPT09ICdzdHJpbmcnKSB7XG4gICAgICBsZXQgJGVsZW0gPSAkKHRoaXMuZ2V0QXR0cignZWxlbScpKVxuICAgICAgaWYgKCRlbGVtLmxlbmd0aCkge1xuICAgICAgICB0aGlzLnNldEF0dHIoJ2VsZW0nLCAkZWxlbVswXSlcbiAgICAgICAgdGhpcy5zZXRBdHRyKCckZWxlbScsICRlbGVtKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdldCAmIHNldCB0aGUgZWxlbWVudFxuICAgIGlmICh0aGlzLmdldEF0dHIoJ2VsZW0nKSAmJiAhdGhpcy5nZXRBdHRyKCckZWxlbScpKSB7XG4gICAgICB0aGlzLnNldEF0dHIoJCh0aGlzLmdldEF0dHIoJ2VsZW0nKSkpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuZ2V0QXR0cignJGVsZW0nKVxuICB9XG5cbiAgLyoqXG4gICAqIE1hcmsgdGhlIENvbXBvbmVudCdzIGVsZW1lbnQgd2l0aCBuZWNlc3NhcnkgYXR0cmlidXRlc1xuICAgKi9cbiAgbWFya0VsZW0gKCkge1xuICAgIC8vIE1hcmsgdGhlIGVsZW1lbnRcbiAgICBpZiAodGhpcy5nZXRFbGVtKCkgJiYgdGhpcy5nZXRFbGVtKCkubGVuZ3RoKSB7XG4gICAgICBpZiAoIXRoaXMuZ2V0RWxlbSgpLmF0dHIoJ2RhdGEtY29tcG9uZW50JykpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtKCkuYXR0cignZGF0YS1jb21wb25lbnQnLCB0aGlzLk5TKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuZ2V0RWxlbSgpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWlkJykpIHtcbiAgICAgICAgdGhpcy5nZXRFbGVtKCkuYXR0cignZGF0YS1jb21wb25lbnQtaWQnLCB0aGlzLnV1aWQpXG4gICAgICB9XG5cbiAgICAgIHRoaXMudHJpZ2dlckV2ZW50KCdtYXJrRWxlbTplbmQnKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHRhcmdldCB0byBhcHBseSB0aGUgQ1NTIHN0YXRlIGNsYXNzZXMgdG9cbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfGpRdWVyeU9iamVjdH1cbiAgICovXG4gIGdldENsYXNzVGFyZ2V0ICgpIHtcbiAgICAvLyBQcmlvcml0aXNlIGF0dHJcbiAgICBsZXQgJGNsYXNzVGFyZ2V0ID0gdGhpcy5nZXRBdHRyKCckY2xhc3NUYXJnZXQnKVxuXG4gICAgLy8gTm90IGZvdW5kIGluIGF0dHI/IFVzZSBwcm9wXG4gICAgaWYgKCEkY2xhc3NUYXJnZXQgfHwgISRjbGFzc1RhcmdldC5sZW5ndGgpIHtcbiAgICAgICRjbGFzc1RhcmdldCA9IHRoaXMuZ2V0UHJvcCgnJGNsYXNzVGFyZ2V0JylcbiAgICB9XG5cbiAgICAvLyBOb3QgZm91bmQgaW4gcHJvcD8gVXNlIGVsZW1cbiAgICBpZiAoISRjbGFzc1RhcmdldCB8fCAhJGNsYXNzVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgJGNsYXNzVGFyZ2V0ID0gdGhpcy5nZXRFbGVtKClcblxuICAgICAgLy8gRW5zdXJlIHNldCBhcyBhdHRyXG4gICAgICB0aGlzLnNldEF0dHIoJyRjbGFzc1RhcmdldCcsICRjbGFzc1RhcmdldClcbiAgICB9XG5cbiAgICByZXR1cm4gJGNsYXNzVGFyZ2V0XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTSBlbGVtZW50IGFuZCBwbGFjZSBpbnRvIHRoZSBDb21wb25lbnQgaW5zdGFuY2VcbiAgICpcbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgbG9hZEF0dHJzICgpIHtcbiAgICBpZiAodGhpcy5nZXRFbGVtKCkgJiYgdGhpcy5nZXRFbGVtKCkuaXMoJ1tkYXRhLWNvbXBvbmVudC1hdHRyaWJ1dGVzXScpKSB7XG4gICAgICBsZXQgYXR0cnMgPSB7fVxuXG4gICAgICAvLyBBdHRlbXB0IHRvIGdldCB0aGUgYXR0cmlidXRlcyBmcm9tIHRoZSBET00gZWxlbWVudFxuICAgICAgdHJ5IHtcbiAgICAgICAgYXR0cnMgPSBKU09OLnBhcnNlKHRoaXMuZ2V0RWxlbSgpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWF0dHJpYnV0ZXMnKSlcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihgWyR7dGhpcy5OU31dIGxvYWRBdHRyczogRXJyb3IgbG9hZGluZyBhdHRyaWJ1dGVzIGZyb20gRE9NIGVsZW1lbnRgKVxuICAgICAgfVxuXG4gICAgICB0aGlzLl9hdHRyaWJ1dGVzID0gbWVyZ2UodGhpcy5fYXR0cmlidXRlcywgYXR0cnMpXG5cbiAgICAgIC8vIE9uY2UgbG9hZGVkLCByZW1vdmUgdGhlIGNvbXBvbmVudCBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTVxuICAgICAgdGhpcy5nZXRFbGVtKCkucmVtb3ZlQXR0cignZGF0YS1jb21wb25lbnQtYXR0cmlidXRlcycpXG5cbiAgICAgIHJldHVybiB0aGlzLl9hdHRyaWJ1dGVzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2UgQ29tcG9uZW50XG4gICAqL1xuICBpbml0ICgpIHtcbiAgICBzdXBlci5pbml0KC4uLmFyZ3VtZW50cylcblxuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGBbJHt0aGlzLk5TOmluaXR9XWApXG5cbiAgICAvLyBNYXJrIHRoZSBlbGVtZW50XG4gICAgdGhpcy5tYXJrRWxlbSgpXG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2ggQ29tcG9uZW50J3MgcHVibGljIG1ldGhvZHMgdG8gdGFyZ2V0c1xuICAgICAqIFB1YmxpYyBtZXRob2RzIGNhbiBiZSB0cmlnZ2VyZWQgb24gdGhlIHRhcmdldHMgdmlhIGAkKHRhcmdldCkudHJpZ2dlcignTkFNRVNQQUNFOnB1YmxpY01ldGhvZE5hbWUnKWBcbiAgICAgKi9cbiAgICBsZXQgcHVibGljTWV0aG9kcyA9IHRoaXMuZ2V0UHJvcCgncHVibGljTWV0aG9kcycpXG4gICAgaWYgKHB1YmxpY01ldGhvZHMgJiYgcHVibGljTWV0aG9kcy5sZW5ndGgpIHtcbiAgICAgIHB1YmxpY01ldGhvZHMuZm9yRWFjaCgodHJpZ2dlcikgPT4ge1xuICAgICAgICBsZXQgdHJpZ2dlckRldGFpbHMgPSB7fVxuXG4gICAgICAgIC8vIEFscmVhZHkgb2JqZWN0XG4gICAgICAgIGlmICh0eXBlb2YgdHJpZ2dlciA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0cmlnZ2VyRGV0YWlscyA9IHRyaWdnZXJcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0cmlnZ2VyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGlmICgvXnsvLnRlc3QodHJpZ2dlcikgfHwgL1s6O10vLnRlc3QodHJpZ2dlcikpIHtcbiAgICAgICAgICAgIHRyaWdnZXJEZXRhaWxzID0gZXh0cmFjdFRyaWdnZXJEZXRhaWxzKHRyaWdnZXIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyaWdnZXJEZXRhaWxzLmRvID0gdHJpZ2dlclxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIGVtcHR5LCBzZXQgYG9uYCB0byBgZG9gIHZhbHVlIChjb25zaWRlciBpdCBhIGN1c3RvbSBldmVudCB0byBpbnZva2UsIGUuZy4gJ2luaXQnIHdvdWxkIGludm9rZSAnaW5pdCcgb24gdGhpcyBDb21wb25lbnQpXG4gICAgICAgIGlmICghb2JqZWN0UGF0aC5oYXModHJpZ2dlckRldGFpbHMsICdvbicpKSB7XG4gICAgICAgICAgdHJpZ2dlckRldGFpbHMub24gPSB0cmlnZ2VyRGV0YWlscy5kb1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ29udGV4dCBzaG91bGQgYWx3YXlzIGJlIHRoaXMgQ29tcG9uZW50XG4gICAgICAgIHRyaWdnZXJEZXRhaWxzLmNvbnRleHQgPSB0aGlzXG5cbiAgICAgICAgLy8gR2V0IHRoZSBDb21wb25lbnQncyBtZXRob2RcbiAgICAgICAgbGV0IG1ldGhvZCA9IHVuZGVmaW5lZFxuICAgICAgICB0cnkge1xuICAgICAgICAgIG1ldGhvZCA9IHRyaWdnZXJEZXRhaWxzLmNvbnRleHRbdHJpZ2dlckRldGFpbHMuZG9dXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RoaXMuTlN9XSBpbml0OiBwdWJsaWMgbWV0aG9kICcke3RyaWdnZXJEZXRhaWxzLmRvfScgd2FzIG5vdCBmb3VuZCBvbiB0aGlzIGNvbXBvbmVudGApXG4gICAgICAgIH1cblxuICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlN9XSBpbml0OiBhdHRhY2ggcHVibGljIG1ldGhvZGAsIHtcbiAgICAgICAgLy8gICB0cmlnZ2VyRGV0YWlscyxcbiAgICAgICAgLy8gICBtZXRob2RcbiAgICAgICAgLy8gfSlcblxuICAgICAgICAvLyBBdHRhY2ggdGhlIG1ldGhvZCBhcyBhIGN1c3RvbSBldmVudCB0byB0aGUgdGFyZ2V0XG4gICAgICAgIGlmICh0eXBlb2YgbWV0aG9kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgLy8gV3JhcCB0aGUgbWV0aG9kIGludG8gYSBjbG9zdXJlXG4gICAgICAgICAgbGV0IGRvQ29tcG9uZW50TWV0aG9kID0gKGpRdWVyeUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGBUcmlnZ2VyZWQgJHt0aGlzLk5TfToke3RyaWdnZXJEZXRhaWxzLmRvfWAsIHtcbiAgICAgICAgICAgIC8vICAgX2NsYXNzOiB0aGlzLFxuICAgICAgICAgICAgLy8gICBfbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICAvLyAgIGpRdWVyeUV2ZW50LFxuICAgICAgICAgICAgLy8gICBhcmdzOiBhcmd1bWVudHNcbiAgICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgICAgIG1ldGhvZC5jYWxsKHRoaXMsIGpRdWVyeUV2ZW50KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEF0dGFjaCB0byB0aGUgdGFyZ2V0IGRvY3VtZW50IHdpdGggYSBwYXJ0aWN1bGFyIGVsZW1lbnQgc2VsZWN0b3JcbiAgICAgICAgICBpZiAodHJpZ2dlckRldGFpbHMuc2VsZWN0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50VG9UYXJnZXRTZWxlY3Rvcih0cmlnZ2VyRGV0YWlscy5vbiwgdHJpZ2dlckRldGFpbHMuc2VsZWN0b3IsIGRvQ29tcG9uZW50TWV0aG9kLCB0cmlnZ2VyRGV0YWlscy50YXJnZXQpXG5cbiAgICAgICAgICAgIC8vIEF0dGFjaCB0byB0aGUgdGFyZ2V0XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50VG9UYXJnZXQodHJpZ2dlckRldGFpbHMub24sIGRvQ29tcG9uZW50TWV0aG9kLCB0cmlnZ2VyRGV0YWlscy50YXJnZXQpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRXJyb3JcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLCB0cmlnZ2VyLCB0cmlnZ2VyRGV0YWlscylcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RoaXMuTlN9XSBpbml0OiBwdWJsaWMgbWV0aG9kICcke3RyaWdnZXJEZXRhaWxzLmRvfScgaXMgbm90IGEgdmFsaWQgZnVuY3Rpb25gKVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExvYWQgYW55IGF0dHJpYnV0ZXMgdGhhdCB3ZXJlIGF0dGFjaGVkIHRvIHRoZSBET00gZWxlbWVudFxuICAgICAqL1xuICAgIHRoaXMubG9hZEF0dHJzKClcblxuICAgIC8qKlxuICAgICAqIEB0cmlnZ2VyIE5BTUVTUEFDRTppbml0OmVuZFxuICAgICAqIEBwYXJhbSB7Q29tcG9uZW50fVxuICAgICAqL1xuICAgIHRoaXMudHJpZ2dlckV2ZW50KCdpbml0OmVuZCcpXG4gIH1cblxuICAvKipcbiAgICogRGVzdHJveSBhbmQgdGVhciBkb3duIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGRlc3Ryb3kgKCkge1xuICAgIC8vIEBUT0RPIHRlYXIgZG93biB0aGUgaG91c2UhXG4gICAgLy8gQFRPRE8gcmVtb3ZlIHRoZSBib3VuZCBwdWJsaWMgZXZlbnRzXG4gICAgLy8gQFRPRE8gb3RoZXIgZ2FyYmFnZSBjb2xsZWN0aW9uL21lbW9yeSBtYW5hZ2VtZW50XG5cbiAgICAvKipcbiAgICAgKiBAdHJpZ2dlciBOQU1FU1BBQ0U6ZGVzdHJveTpiZWZvcmVlbmRcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRyaWdnZXJFdmVudCgnZGVzdHJveTpiZWZvcmVlbmQnKVxuXG4gICAgc3VwZXIuZGVzdHJveSguLi5hcmd1bWVudHMpXG4gIH1cblxuICAvKipcbiAgICogQmluZCBtZXRob2QgdG8gY3VzdG9tIGV2ZW50IG9uIHRhcmdldFxuICAgKiBFdmVudCBuYW1lcyBhcmUgYXV0b21hdGljYWxseSBuYW1lc3BhY2VkIHVzaW5nIHRoZSBDb21wb25lbnQncyBfTlMgcHJvcGVydHkuXG4gICAqIFRvIG5vdCB1c2UgbmFtZXNwYWNlZCBldmVudHMsIHByZWZhY2Ugd2l0aCBgZG9tOmBcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBEZWZhdWx0IGlzIGBkb2N1bWVudGAuIFRoaXMgaXMgdGhlIHRhcmdldCBET00gZWxlbWVudCB3aGljaCB0aGUgY3VzdG9tIGV2ZW50IHdpbGwgYnViYmxlIHVwIHRvXG4gICAqL1xuICBiaW5kRXZlbnRUb1RhcmdldCAoZXZlbnROYW1lLCBtZXRob2QsIHRhcmdldCkge1xuICAgIC8vIERlZmF1bHQgdG8gZG9jdW1lbnRcbiAgICBpZiAoIXRhcmdldCkge1xuICAgICAgdGFyZ2V0ID0gZG9jdW1lbnRcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU3BlY2lhbCBzdHJpbmcgdmFsdWVzIHRvIGdldCB0aGUgYWN0dWFsIG9iamVjdFxuICAgICAgc3dpdGNoICh0YXJnZXQpIHtcbiAgICAgICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgICAgIHRhcmdldCA9IGRvY3VtZW50XG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICd3aW5kb3cnOlxuICAgICAgICAgIHRhcmdldCA9IHdpbmRvd1xuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAnc2VsZic6XG4gICAgICAgICAgdGFyZ2V0ID0gdGhpcy5nZXRFbGVtKClbMF1cbiAgICAgICAgICBicmVha1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEV4dHJhY3QgdGhlIHRhcmdldCBldmVudCBuYW1lcyBmcm9tIHRoZSBpbnB1dCBnaXZlblxuICAgIGxldCBldmVudE5hbWVzID0gZXh0cmFjdFRhcmdldEV2ZW50TmFtZXMoZXZlbnROYW1lLCB0aGlzLk5TKVxuXG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlN9XSBiaW5kRXZlbnRUb1RhcmdldGAsIHtcbiAgICAvLyAgIGV2ZW50TmFtZSxcbiAgICAvLyAgIG1ldGhvZCxcbiAgICAvLyAgIHRhcmdldCxcbiAgICAvLyAgIHRyaWdnZXJOYW1lOiB0YXJnZXRFdmVudE5hbWVzXG4gICAgLy8gfSlcblxuICAgIC8vIEFzc2lnbiB0aGUgdHJpZ2dlclxuICAgIGlmIChldmVudE5hbWVzKSB7XG4gICAgICAkKHRhcmdldCkub24oZXZlbnROYW1lcy5qb2luKCcgJyksIG1ldGhvZClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQmluZCBtZXRob2QgdG8gY3VzdG9tIGV2ZW50IG9uIHRhcmdldCB3aXRoIGFuIGVsZW1lbnQgc2VsZWN0b3IuXG4gICAqIEV2ZW50IG5hbWVzIGFyZSBhdXRvbWF0aWNhbGx5IG5hbWVzcGFjZWQgdXNpbmcgdGhlIENvbXBvbmVudCdzIF9OUyBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgVGFyZ2V0IGEgc3BlY2lmaWMgZWxlbWVudCAodmlhIHF1ZXJ5IHNlbGVjdG9yKSB0byB0cmlnZ2VyIHRoZSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBEZWZhdWx0IGlzIGBkb2N1bWVudGAuIFRoaXMgaXMgdGhlIHRhcmdldCBET00gZWxlbWVudCB3aGljaCB0aGUgY3VzdG9tIGV2ZW50IHdpbGwgYnViYmxlIHVwIHRvXG4gICAqL1xuICBiaW5kRXZlbnRUb1RhcmdldFNlbGVjdG9yIChldmVudE5hbWUsIHNlbGVjdG9yLCBtZXRob2QsIHRhcmdldCkge1xuICAgIHRhcmdldCA9IGdldFRhcmdldEJ5U2VsZWN0b3IodGFyZ2V0LCB0aGlzKVxuICAgIHNlbGVjdG9yID0gZ2V0VGFyZ2V0U2VsZWN0b3Ioc2VsZWN0b3IsIHRoaXMpXG4gICAgbGV0IGV2ZW50TmFtZXMgPSBleHRyYWN0VGFyZ2V0RXZlbnROYW1lcyhldmVudE5hbWUsIHRoaXMuTlMpXG5cbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OU31dIGJpbmRFdmVudFRvVGFyZ2V0U2VsZWN0b3JgLCB7XG4gICAgLy8gICBldmVudE5hbWUsXG4gICAgLy8gICBzZWxlY3RvcixcbiAgICAvLyAgIG1ldGhvZCxcbiAgICAvLyAgIHRhcmdldCxcbiAgICAvLyAgIHRyaWdnZXJOYW1lOiBgJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gXG4gICAgLy8gfSlcblxuICAgIGlmIChldmVudE5hbWVzKSB7XG4gICAgICAkKHRhcmdldCkub24oZXZlbnROYW1lcy5qb2luKCcgJyksIHNlbGVjdG9yLCBtZXRob2QpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYSBjdXN0b20gZG9jdW1lbnQgZXZlbnQgb24gdGhlIENvbXBvbmVudC5cbiAgICogVGhlIGV2ZW50IHRyaWdnZXJlZCB3aWxsIGJlIGBOQU1FU1BBQ0U6ZXZlbnROYW1lYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge0FueX0gLi4uYXJnc1xuICAgKi9cbiAgdHJpZ2dlckV2ZW50IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OU31dIHRyaWdnZXJFdmVudDogJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gKVxuXG4gICAgLy8gQWx3YXlzIHBhc3MgdGhlIGNvbXBvbmVudCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgcGFyYW1ldGVyXG4gICAgJGRvYy50cmlnZ2VyKGAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWAsIFt0aGlzLCAuLi5hcmdzXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGEgY3VzdG9tIGRvY3VtZW50IGV2ZW50IG9uIGFuIGVsZW1lbnQgb24gdGhlIENvbXBvbmVudC5cbiAgICogVGhlIGV2ZW50IHRyaWdnZXJlZCB3aWxsIGJlIGBOQU1FU1BBQ0U6ZXZlbnROYW1lYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAgICogQHBhcmFtIHtBbnl9IC4uLmFyZ3NcbiAgICovXG4gIHRyaWdnZXJFdmVudE9uU2VsZWN0b3IgKGV2ZW50TmFtZSwgc2VsZWN0b3IsIC4uLmFyZ3MpIHtcbiAgICBzZWxlY3RvciA9IGdldFRhcmdldFNlbGVjdG9yKHNlbGVjdG9yLCB0aGlzKVxuXG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlN9XSB0cmlnZ2VyRXZlbnRPblNlbGVjdG9yOiAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWApXG5cbiAgICAvLyBBbHdheXMgcGFzcyB0aGUgY29tcG9uZW50IGFzIHRoZSBmaXJzdCBhcmd1bWVudCBwYXJhbWV0ZXJcbiAgICAkKHNlbGVjdG9yKS50cmlnZ2VyKGAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWAsIFt0aGlzLCAuLi5hcmdzXSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudFxuIiwiLyoqXG4gKiBMVkw5OSBFbnRpdHlcbiAqXG4gKiBCYXNlIGNsYXNzIHVzZWQgZm9yIHByb2dyYW1tYWJsZSBlbnRpdGllcyB3aXRoaW4gdGhlIGFwcCwgc3VjaCBhcyBjb21wb25lbnRzIG9yIG90aGVyIHN1Y2ggZW50aXRpZXMgdGhhdCByZWx5IG9uXG4gKiBzdGF0ZSBhbmQgbGlmZWN5Y2xlIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJylcbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoLm1lcmdlJylcbmNvbnN0IG9iamVjdFBhdGggPSByZXF1aXJlKCdvYmplY3QtcGF0aCcpXG5jb25zdCB7XG4gIGV4cG9zZVByaXZhdGVQcm9wZXJ0aWVzXG59ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5oZXJpdGFuY2UnKVxuXG4vKipcbiAqIFRoZSBFbnRpdHkncyBiYXNlIHByb3BlcnRpZXNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBFbnRpdHlQcm9wZXJ0aWVzID0ge1xuICAvKipcbiAgICogTkFNRVNQQUNFXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgY3VzdG9tIGV2ZW50cyBhbmQgZXJyb3IgcmVwb3J0aW5nXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBfTlM6ICdMVkw5OTpFbnRpdHknLFxuXG4gIC8qKlxuICAgKiBuYW1lc3BhY2VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBDU1MgY2xhc3NlcyAob25seSBpZiB0aGUgZW50aXR5IGhhcyBhbiBIVE1MRWxlbWVudClcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIF9uczogJ2x2bDk5LWVudGl0eScsXG5cbiAgLyoqXG4gICAqIFRoZSBwcm9wZXJ0aWVzIHNoYXJlZCBiZXR3ZWVuIGFsbCBpbnN0YW5jZXMgb2YgdGhpcyBFbnRpdHlcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9wcm9wZXJ0aWVzOiB7fSxcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgYXR0cmlidXRlcyB0byBsb2FkIGEgY3JlYXRlZCBFbnRpdHkgaW5zdGFuY2Ugd2l0aC5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9hdHRyaWJ1dGVzOiB7fVxufVxuXG5jbGFzcyBFbnRpdHkge1xuICAvKipcbiAgICogRW50aXR5IGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZygnTFZMOTk6RW50aXR5OmNvbnN0cnVjdG9yJywge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIHRoaXMuZXh0ZW5kKHtcbiAgICAgIF9hdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzXG4gICAgfSlcblxuICAgIC8vIEV4cG9zZSBwcml2YXRlIHZhbHVlc1xuICAgIGV4cG9zZVByaXZhdGVQcm9wZXJ0aWVzKHRoaXMpXG5cbiAgICAvLyBDcmVhdGUgYSB1bmlxdWUgSUQgZm9yIHRoaXMgRW50aXR5XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd1dWlkJywge1xuICAgICAgdmFsdWU6IGAke3RoaXMuTlN9OiR7dXVpZC52NCgpfWAsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBFbnRpdHkgd2l0aCBhbnkgZ2l2ZW4ge09iamVjdH0gYXJndW1lbnRzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAuLi5hcmd1bWVudHNcbiAgICogQHJldHVybnMge1NlbGZ9XG4gICAqL1xuICBleHRlbmQgKCkge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKCdMVkw5OTpFbnRpdHk6ZXh0ZW5kJywge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIC8vIE1lcmdlIHRoZSBwcm9wZXJ0aWVzIHdpdGggdGhlIGluc3RhbnRpYXRlZCBhdHRyaWJ1dGVzIGFuZCBjb25jYXRlbmF0ZWQgcHVibGljIG1ldGhvZHNcbiAgICBtZXJnZSh0aGlzLCBFbnRpdHlQcm9wZXJ0aWVzLCAuLi5hcmd1bWVudHMpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBFbnRpdHkncyBwcm9wZXJ0eSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXG4gICAqIEByZXR1cm4ge01peGVkfVxuICAgKi9cbiAgZ2V0UHJvcCAocHJvcE5hbWUpIHtcbiAgICBpZiAoIXByb3BOYW1lIHx8IHR5cGVvZiBwcm9wTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIGdldDogJ3Byb3BOYW1lJyB2YWx1ZSBpcyBpbnZhbGlkYClcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQodGhpcy5wcm9wZXJ0aWVzLCBwcm9wTmFtZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYW4gRW50aXR5J3MgcHJvcGVydHkgdG8gYSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHByb3BWYWx1ZVxuICAgKi9cbiAgc2V0UHJvcCAocHJvcE5hbWUsIHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcE5hbWUgfHwgdHlwZW9mIHByb3BOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aGlzLk5TfV0gc2V0OiAncHJvcE5hbWUnIHZhbHVlIGlzIGludmFsaWRgKVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RQYXRoLnNldCh0aGlzLnByb3BlcnRpZXMsIHByb3BOYW1lLCBwcm9wVmFsdWUpXG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIEVudGl0eSdzIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGF0dHJOYW1lXG4gICAqIEByZXR1cm4ge01peGVkfVxuICAgKi9cbiAgZ2V0QXR0ciAoYXR0ck5hbWUpIHtcbiAgICBpZiAoIWF0dHJOYW1lIHx8IHR5cGVvZiBhdHRyTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIGdldEF0dHI6ICdhdHRyTmFtZScgdmFsdWUgaXMgaW52YWxpZGApXG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGguZ2V0KHRoaXMuYXR0cmlidXRlcywgYXR0ck5hbWUpXG4gIH1cblxuICAvKipcbiAgICogU2V0IGFuIEVudGl0eSdzIHByb3BlcnR5IHRvIGEgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyTmFtZVxuICAgKiBAcGFyYW0ge01peGVkfSBhdHRyVmFsdWVcbiAgICovXG4gIHNldEF0dHIgKGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBpZiAoIWF0dHJOYW1lIHx8IHR5cGVvZiBhdHRyTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIHNldEF0dHI6ICdhdHRyTmFtZScgdmFsdWUgaXMgaW52YWxpZGApXG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KHRoaXMuYXR0cmlidXRlcywgYXR0ck5hbWUsIGF0dHJWYWx1ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBFbnRpdHlcbiAgICovXG4gIGluaXQgKCkge31cblxuICAvKipcbiAgICogRGVzdHJveSBhbmQgdGVhciBkb3duIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGRlc3Ryb3kgKCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHlcbiIsIi8qKlxuICogTFZMOTkgQ29yZVxuICpcbiAqIENvcmUgY2xhc3NlcyB1c2VkIHRocm91Z2hvdXQgdGhlIGZyYW1ld29ya1xuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKVxuY29uc3QgQXBwID0gcmVxdWlyZSgnLi9hcHAnKVxuY29uc3QgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKVxuXG5jb25zdCBjb3JlID0ge1xuICBFbnRpdHksXG4gIEFwcCxcbiAgQ29tcG9uZW50XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29yZVxuIiwiLyoqXG4gKiBMVkw5OVxuICpcbiAqIFRoZSB3aG9sZSBmcmFtZXdvcmsgaW4gb25lIGRpc2NyZXRlIHBhY2thZ2VcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJylcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpXG5jb25zdCBjb3JlID0gcmVxdWlyZSgnLi9jb3JlJylcbmNvbnN0IHRvb2xzID0gcmVxdWlyZSgnLi90b29scycpXG5cbmNvbnN0IGx2bDk5ID0ge1xuICBjb21tb24sXG4gIGNvcmUsXG4gIHV0aWxzLFxuICB0b29sc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGx2bDk5XG4iLCIvKipcbiAqIExWTDk5IEJyZWFrcG9pbnRzXG4gKiBEZXRlY3QgdmlhIEpTIHdoYXQgdGhlIGJyZWFrcG9pbnQgaXMgYnkga2V5d29yZFxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKVxuXG5mdW5jdGlvbiBCcmVha3BvaW50cyAoc2l6ZXMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmaW5lZCBicmVha3BvaW50IG5hbWVzIHdpdGggbWluL21heCB3aWR0aHMgKGluIDcyZHBpIHBpeGVscylcbiAgICAgKiBTaG91bGQgY29pbmNpZGUgd2l0aCBDU1MgZm9yIG9wdGltdW0gZXhwZWN0ZWQgYmVoYXZpb3VyXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgc2l6ZXNcbiAgICAgKiBAdHlwZSB7T2JqZWN0fSA9PiB7QXJyYXl9IFswID0ge051bWJlcn0gbWluV2lkdGgsIDEgPSB7TnVtYmVyfSBtYXhXaWR0aF1cbiAgICAgKi9cbiAgICBzaXplczogc2l6ZXMgfHwge1xuICAgICAgJ3hzJzogICAgICAgWzAsICAgIDM5OV0sXG4gICAgICAnbW9iaWxlJzogICBbMCwgICAgNzk5XSxcbiAgICAgICdtcyc6ICAgICAgIFs0MDAsICA1OTldLFxuICAgICAgJ3MnOiAgICAgICAgWzYwMCwgIDc5OV0sXG4gICAgICAnbSc6ICAgICAgICBbODAwLCAgOTk5XSxcbiAgICAgICd0YWJsZXQnOiAgIFs4MDAsICAxMTk5XSxcbiAgICAgICdsJzogICAgICAgIFsxMDAwLCAxMTk5XSxcbiAgICAgICdsYXB0b3AnOiAgIFsxMDAwLCAxMzk5XSxcbiAgICAgICdjb21wdXRlcic6IFsxMDAwLCA5OTk5OV0sXG4gICAgICAneGwnOiAgICAgICBbMTIwMCwgMTM5OV0sXG4gICAgICAnZGVza3RvcCc6ICBbMTIwMCwgOTk5OTldLFxuICAgICAgJ3h4bCc6ICAgICAgWzE0MDAsIDk5OTk5XVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzdHJpbmcgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgYnJlYWtwb2ludHNcbiAgICAgKiBAbWV0aG9kIGdldEFjdGl2ZVxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRBY3RpdmUgKCkge1xuICAgICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgIGxldCBicCA9IFtdXG5cbiAgICAgIGZvciAobGV0IHggaW4gdGhpcy5zaXplcykge1xuICAgICAgICBpZiAodGhpcy5zaXplcy5oYXNPd25Qcm9wZXJ0eSh4KSAmJiB3aWR0aCA+PSB0aGlzLnNpemVzW3hdWzBdICYmIHdpZHRoIDw9IHRoaXMuc2l6ZXNbeF1bMV0pIHtcbiAgICAgICAgICBicC5wdXNoKHgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJwXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgYnJlYWtwb2ludCBrZXl3b3JkIGlzIGN1cnJlbnRseSBhY3RpdmVcbiAgICAgKiBAbWV0aG9kIGlzQWN0aXZlXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNBY3RpdmUgKGlucHV0KSB7XG4gICAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpbnB1dCA9IGlucHV0LmpvaW4oJ3wnKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBpbnB1dCA9IG5ldyBSZWdFeHAoJ1xcXFxiKD86JyArIGlucHV0LnJlcGxhY2UoL1tcXHMsXSsvZywgJ3wnKSArICcpXFxcXGInLCAnaScpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbnB1dC50ZXN0KHRoaXMuZ2V0QWN0aXZlKCkrJycpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnJlYWtwb2ludHNcbiIsIi8qKlxuICogTFZMOTkgRGVidWdcbiAqIEEgY29uc29sZS1saWtlIHJlcGxhY2VtZW50IHdoaWNoIGNyZWF0ZXMgYSBub29wIGNvbnNvbGUgb2JqZWN0IGlmIHlvdSBkb24ndCB3YW50IHRvIG91dHB1dCBzdHVmZiB2aWEgdGhlIGNvbnNvbGVcbiAqL1xuXG5mdW5jdGlvbiBub29wICgpIHt9XG5cbi8qKlxuICogRGVidWdcbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNpbGVudCBTZXQgdG8gdHJ1ZSB0byBtYWtlIHRoZSBjb25zb2xlIGJlaGF2aW91cnMgc2lsZW50XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRGVidWcgKHNpbGVudCA9IGZhbHNlKSB7XG4gIGlmIChzaWxlbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xlYXI6IG5vb3AsXG4gICAgICBjb3VudDogbm9vcCxcbiAgICAgIGRlYnVnOiBub29wLFxuICAgICAgZXJyb3I6IG5vb3AsXG4gICAgICBncm91cDogbm9vcCxcbiAgICAgIGluZm86IG5vb3AsXG4gICAgICBsb2c6IG5vb3AsXG4gICAgICB0YWJsZTogbm9vcCxcbiAgICAgIHRpbWU6IG5vb3AsXG4gICAgICB0aW1lRW5kOiBub29wLFxuICAgICAgdHJhY2U6IG5vb3AsXG4gICAgICB3YXJuOiBub29wXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb25zb2xlIHx8IHdpbmRvdy5jb25zb2xlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEZWJ1Z1xuIiwiLyoqXG4gKiBMVkw5OSBUb29sc1xuICpcbiAqIFN0YW5kYWxvbmUgdG9vbHMgdGhhdCBkb24ndCByZXF1aXJlIGFueSBkZXBlbmRlbmNpZXMgd2l0aGluIHRoZSBmcmFtZXdvcmssIGJ1dCB3b3JrIGFsb25nc2lkZVxuICovXG5cbmNvbnN0IEJyZWFrcG9pbnRzID0gcmVxdWlyZSgnLi9icmVha3BvaW50cycpXG5jb25zdCBEZWJ1ZyA9IHJlcXVpcmUoJy4vZGVidWcnKVxuY29uc3QgUXVldWUgPSByZXF1aXJlKCcuL3F1ZXVlJylcbmNvbnN0IFRyYWNrRXZlbnQgPSByZXF1aXJlKCcuL3RyYWNrZXZlbnQnKVxuY29uc3QgU21vb3RoU2Nyb2xsID0gcmVxdWlyZSgnLi9zbW9vdGgtc2Nyb2xsJylcblxuY29uc3QgdXRpbHMgPSB7XG4gIEJyZWFrcG9pbnRzLFxuICBEZWJ1ZyxcbiAgUXVldWUsXG4gIFRyYWNrRXZlbnQsXG4gIFNtb290aFNjcm9sbFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvb2xzXG4iLCIvKipcbiAqIExWTDk5IFF1ZXVlXG4gKlxuICogQmF0Y2ggYWN0aW9ucyBpbnRvIGEgZGVib3VuY2VkIHF1ZXVlXG4gKiBVc2VmdWwgdG8gcmVkdWNlIGFtb3VudCBvZiB3b3JrIGNvbXB1dGVyL2Jyb3dzZXIgZG9lc1xuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKVxuXG4vKipcbiAqIFF1ZXVlIGNsYXNzXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBRdWV1ZSAob3B0aW9ucykge1xuICAvKipcbiAgICogUXVldWUgb3B0aW9uc1xuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbGV0IF9vcHRpb25zID0gbWVyZ2Uoe1xuICAgIHF1ZXVlOiB7fSxcbiAgICB0aW1lcjogMCxcbiAgICB0aW1lckRlbGF5OiAxMDBcbiAgfSwgb3B0aW9ucylcblxuICAvKipcbiAgICogVGhlIGJhdGNoZWQgcXVldWVcbiAgICogUXVldWUgYWN0aW9ucyBhcmUgYmF0Y2hlZCBpbiBhbiB7T2JqZWN0fSB3aXRoIGEgc3BlY2lmaWMgbGFiZWxcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfcXVldWUgPSBfb3B0aW9ucy5xdWV1ZVxuXG4gIC8qKlxuICAgKiBUaGUgcXVldWUgdGltZXJcbiAgICogV2hlbiB0aGUgcXVldWUgaXMgYWRkZWQgdG8sIHRoZSB0aW1lciBpcyB1cGRhdGVkIHdpdGggYSBgc2V0VGltZW91dGAgY2FsbCB0byB0aGUgYHJ1bmAgZnVuY3Rpb25cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfdGltZXIgPSBfb3B0aW9ucy50aW1lclxuXG4gIC8qKlxuICAgKiBUaGUgcXVldWUgdGltZXIgZGVsYXlcbiAgICogVGhlIGRlbGF5IGJldHdlZW4gcXVldWUgdGltZXIgdXBkYXRlcyAoaW4gbWlsbGlzZWNvbmRzKVxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxMDBcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfdGltZXJEZWxheSA9IF9vcHRpb25zLnRpbWVyRGVsYXlcblxuICAvKipcbiAgICogVGhlIHBsYXkgc3RhdHVzXG4gICAqIDA6IHBhdXNlZFxuICAgKiAxOiBwbGF5XG4gICAqIDI6IHJ1bm5pbmdcbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICogQGRlZmF1bHQgMVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbGV0IF9zdGF0dXMgPSAxXG5cbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBRdWV1ZSBhbiBhY3Rpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25MYWJlbCBBIHVuaXF1ZSBsYWJlbCBmb3IgdGhlIGFjdGlvbiBpbiB0aGUgcXVldWUuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbiBiZSBzZXQgdG8ge3VuZGVmaW5lZH0gKHdoaWNoIG1lYW5zIHRoZSBhY3Rpb24gY2FuJ3QgYmUgcmVtb3ZlZClcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgYWN0aW9uXG4gICAgICogQHBhcmFtIHtNaXhlZH0gLi4uYXJncyBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGFjdGlvbiBoYW5kbGVyXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcXVldWUgKGFjdGlvbkxhYmVsLCBhY3Rpb24sIC4uLmFyZ3MpIHtcbiAgICAgIC8vIERlZmF1bHQgYWN0aW9uTGFiZWwgaXMgdGltZSB2YWx1ZSBhcyBzdHJpbmdcbiAgICAgIGlmICghYWN0aW9uTGFiZWwpIHtcbiAgICAgICAgYWN0aW9uTGFiZWwgPSBEYXRlLm5vdygpICsgJydcbiAgICAgIH1cblxuICAgICAgLy8gQXNzaWduIHRoZSBmdW5jdGlvbiB0byB0aGUgcXVldWVcbiAgICAgIGlmIChhY3Rpb25MYWJlbCAmJiBhY3Rpb24gJiYgdHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBfcXVldWVbYWN0aW9uTGFiZWxdID0ge1xuICAgICAgICAgIGFjdGlvbixcbiAgICAgICAgICBhcmdzOiBhcmdzXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIGFjdGlvbiB0byB0aGUgcXVldWUuIEFmdGVyIGFkZGluZyB0aGlzIHdpbGwgc3RhcnQgdGhlIHF1ZXVlIHRpbWVyIHRvIHRoZW4gcnVuIHRoZSBxdWV1ZSBhZnRlciB0aGUgZGVsYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25MYWJlbCBBIHVuaXF1ZSBsYWJlbCBmb3IgdGhlIGFjdGlvbiBpbiB0aGUgcXVldWUuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbiBiZSBzZXQgdG8ge3VuZGVmaW5lZH0gKHdoaWNoIG1lYW5zIHRoZSBhY3Rpb24gY2FuJ3QgYmUgcmVtb3ZlZClcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSB0aGUgYWN0aW9uXG4gICAgICogQHBhcmFtIHtNaXhlZH0gLi4uYXJncyBUaGUgYXJndW1lbnRzIHRvIHBhc3MgdG8gdGhlIGFjdGlvbiBoYW5kbGVyXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgYWRkIChhY3Rpb25MYWJlbCwgYWN0aW9uLCAuLi5hcmdzKSB7XG4gICAgICAvLyBAZGVidWdcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdRdWV1ZS5hZGQnLCB7XG4gICAgICAvLyAgIGFjdGlvbkxhYmVsLFxuICAgICAgLy8gICBhY3Rpb25cbiAgICAgIC8vIH0pXG5cbiAgICAgIC8vIFF1ZXVlIHRoZSBhY3Rpb25cbiAgICAgIHRoaXMucXVldWUoYWN0aW9uTGFiZWwsIGFjdGlvbiwgLi4uYXJncylcblxuICAgICAgLy8gUGxheSB0aGUgdGltZXIgdG8gZ2V0IHRoZSBxdWV1ZSB0byBydW4gYWZ0ZXIgYSBkZWxheSAob25seSB3aGVuIHBsYXlpbmcpXG4gICAgICBpZiAoX3N0YXR1cykge1xuICAgICAgICB0aGlzLnBsYXkoKVxuICAgICAgfVxuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgLy8gQGRlYnVnXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdxdWV1ZSBpcyBjdXJyZW50bHkgcGF1c2VkJylcbiAgICAgIC8vIH1cblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIGFjdGlvbiBhbmQgdGhlbiBydW4gdGhlIHF1ZXVlIGltbWVkaWF0ZWx5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTGFiZWxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge01peGVkfSBhY3Rpb25BcmdzXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgc3luYyAoYWN0aW9uTGFiZWwsIGFjdGlvbiwgLi4uYXJncykge1xuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZygnUXVldWUuc3luYycsIHtcbiAgICAgIC8vICAgYWN0aW9uTGFiZWwsXG4gICAgICAvLyAgIGFjdGlvblxuICAgICAgLy8gfSlcblxuICAgICAgY2xlYXJUaW1lb3V0KF90aW1lcilcblxuICAgICAgLy8gUXVldWUgYWN0aW9uLi4uXG4gICAgICB0aGlzLnF1ZXVlKGFjdGlvbkxhYmVsLCBhY3Rpb24sIC4uLmFyZ3MpXG5cbiAgICAgIC8vIC4uLiBUaGVuIHJ1biB0aGUgcXVldWUgaW1tZWRpYXRlbHlcbiAgICAgIHRoaXMucnVuKClcblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhY3Rpb24gYnkgaXRzIGxhYmVsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTGFiZWxcbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR8T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEFjdGlvbkJ5TGFiZWwgKGFjdGlvbkxhYmVsKSB7XG4gICAgICBpZiAoX3F1ZXVlLmhhc093blByb3BlcnR5KGFjdGlvbkxhYmVsKSkge1xuICAgICAgICByZXR1cm4gX3F1ZXVlW2FjdGlvbkxhYmVsXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhY3Rpb24gZnJvbSBxdWV1ZS4gQ2FuIG9ubHkgcmVtb3ZlIGFjdGlvbnMgaWYgeW91IGtub3cgdGhlaXIgbGFiZWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25MYWJlbFxuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHJlbW92ZSAoYWN0aW9uTGFiZWwpIHtcbiAgICAgIGlmIChfcXVldWUuaGFzT3duUHJvcGVydHkoYWN0aW9uTGFiZWwpKSB7XG4gICAgICAgIF9xdWV1ZVthY3Rpb25MYWJlbF0gPSB1bmRlZmluZWRcbiAgICAgICAgZGVsZXRlIF9xdWV1ZVthY3Rpb25MYWJlbF1cbiAgICAgIH1cblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUGxheSB0aGUgcXVldWUgdGltZXIgKHdpbGwgcnVuIHF1ZXVlIGFmdGVyIHRpbWVyIGRlbGF5KVxuICAgICAqXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcGxheSAoKSB7XG4gICAgICAvLyBAZGVidWdcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdRdWV1ZS5wbGF5Jywge1xuICAgICAgLy8gICBfc3RhdHVzXG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBDdXJyZW50bHkgYWxyZWFkeSBydW5uaW5nXG4gICAgICBpZiAoX3N0YXR1cyA9PT0gMikge1xuICAgICAgICAvLyBXaGF0IGlmIEkgY29udHJvbCB0aGUgcXVldWUgdmlhIHRoZSBxdWV1ZT9cbiAgICAgICAgbGV0IHBsYXlRdWV1ZUFmdGVyUnVubmluZyA9ICgpID0+IHtcbiAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygnX19RdWV1ZTpwbGF5UXVldWVBZnRlclJ1bm5pbmcnKVxuICAgICAgICAgIHRoaXMucGxheSgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucXVldWUoJ19fUXVldWU6cGxheVF1ZXVlQWZ0ZXJSdW5uaW5nJywgcGxheVF1ZXVlQWZ0ZXJSdW5uaW5nKVxuICAgICAgfVxuXG4gICAgICAvLyBPbmx5IHBsYXkgaWYgYWxyZWFkeSBwYXVzZWRcbiAgICAgIGNsZWFyVGltZW91dChfdGltZXIpXG5cbiAgICAgIC8vIFNldCB0byBwbGF5aW5nXG4gICAgICBfc3RhdHVzID0gMVxuXG4gICAgICAvLyBSZXNldCB0aW1lciB0byBydW4gdGhlIHF1ZXVlXG4gICAgICBfdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIHJ1blF1ZXVlUHJvY2Vzc0FmdGVyRGVsYXkgKHF1ZXVlSW5zdGFuY2UpIHtcbiAgICAgICAgcXVldWVJbnN0YW5jZS5ydW4oKVxuICAgICAgfSh0aGlzKSwgX3RpbWVyRGVsYXkpXG5cbiAgICAgIC8vIEBjaGFpbmFibGVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFBhdXNlIHRoZSBxdWV1ZSB0aW1lclxuICAgICAqXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcGF1c2UgKCkge1xuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZygnUXVldWUucGF1c2UnLCB7XG4gICAgICAvLyAgIF9zdGF0dXNcbiAgICAgIC8vIH0pXG5cbiAgICAgIC8vIFF1ZXVlIGlzIGFscmVhZHkgcnVubmluZ1xuICAgICAgaWYgKF9zdGF0dXMgPT09IDIpIHtcbiAgICAgICAgLy8gV2hhdCBpZiBJIGNvbnRyb2wgdGhlIHF1ZXVlIHZpYSB0aGUgcXVldWU/XG4gICAgICAgIGxldCBwYXVzZVF1ZXVlQWZ0ZXJSdW5uaW5nID0gKCkgPT4ge1xuICAgICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdfX1F1ZXVlOnBhdXNlUXVldWVBZnRlclJ1bm5pbmcnKVxuICAgICAgICAgIHRoaXMucGF1c2UoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlKCdfX1F1ZXVlOnBhdXNlUXVldWVBZnRlclJ1bm5pbmcnLCBwYXVzZVF1ZXVlQWZ0ZXJSdW5uaW5nKVxuICAgICAgfVxuXG4gICAgICAvLyBPbmx5IHBhdXNlIGlmIGFscmVhZHkgcGxheWluZ1xuICAgICAgY2xlYXJUaW1lb3V0KF90aW1lcilcblxuICAgICAgLy8gU2V0IHRvIHBhdXNlZFxuICAgICAgX3N0YXR1cyA9IDBcblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzcy9ydW4gYWxsIHRoZSBhY3Rpb25zIGluIHRoZSBxdWV1ZVxuICAgICAqXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcnVuICgpIHtcbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gY29uc29sZS5sb2coJ1F1ZXVlLnJ1bi4uLicsIHtcbiAgICAgIC8vICAgX3N0YXR1cyxcbiAgICAgIC8vICAgX3F1ZXVlXG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBDdXJyZW50bHkgYWxyZWFkeSBydW5uaW5nXG4gICAgICBpZiAoX3N0YXR1cyA9PT0gMikge1xuICAgICAgICAvLyBXaGF0IGlmIEkgY29udHJvbCB0aGUgcXVldWUgdmlhIHRoZSBxdWV1ZT9cbiAgICAgICAgbGV0IHJ1blF1ZXVlQWdhaW5BZnRlclJ1bm5pbmcgPSAoKSA9PiB7XG4gICAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ19fUXVldWU6cnVuUXVldWVBZ2FpbkFmdGVyUnVubmluZycpXG4gICAgICAgICAgdGhpcy5ydW4oKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnF1ZXVlKCdfX1F1ZXVlOnJ1blF1ZXVlQWdhaW5BZnRlclJ1bm5pbmcnLCBydW5RdWV1ZUFnYWluQWZ0ZXJSdW5uaW5nKVxuICAgICAgfVxuXG4gICAgICBjbGVhclRpbWVvdXQoX3RpbWVyKVxuXG4gICAgICAvLyBObyBpdGVtcyBpbiB0aGUgcXVldWUsIHNvIGZvcmNlIHF1ZXVlIHRvIHBhdXNlXG4gICAgICBpZiAoIU9iamVjdC5rZXlzKF9xdWV1ZSkubGVuZ3RoKSB7XG4gICAgICAgIF9zdGF0dXMgPSAwXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICB9XG5cbiAgICAgIC8vIFNhdmUgdGhlIHF1ZXVlJ3MgY3VycmVudCBzdGF0dXNcbiAgICAgIGxldCBfcHJldmlvdXNTdGF0dXMgPSBfc3RhdHVzXG5cbiAgICAgIC8vIFNldCB0aGUgc3RhdHVzIHRvIHJ1bm5pbmdcbiAgICAgIF9zdGF0dXMgPSAyXG5cbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gY29uc29sZS5sb2coJ1F1ZXVlLnJ1bm5pbmcuLi4nLCB7XG4gICAgICAvLyAgIF9wcmV2aW91c1N0YXR1cyxcbiAgICAgIC8vICAgX3N0YXR1c1xuICAgICAgLy8gfSlcblxuICAgICAgLy8gUHJvY2VzcyB0aGUgcXVldWVcbiAgICAgIGZvciAobGV0IGFjdGlvbkxhYmVsIGluIF9xdWV1ZSkge1xuICAgICAgICBpZiAoX3F1ZXVlLmhhc093blByb3BlcnR5KGFjdGlvbkxhYmVsKSAmJiBfcXVldWVbYWN0aW9uTGFiZWxdKSB7XG4gICAgICAgICAgbGV0IHF1ZXVlZEl0ZW0gPSBfcXVldWVbYWN0aW9uTGFiZWxdXG5cbiAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgIC0tPiAke2FjdGlvbkxhYmVsfWAsIHF1ZXVlZEl0ZW0pXG5cbiAgICAgICAgICAvLyBGdW5jdGlvblxuICAgICAgICAgIGlmIChxdWV1ZWRJdGVtICYmIHR5cGVvZiBxdWV1ZWRJdGVtID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBxdWV1ZWRJdGVtKClcblxuICAgICAgICAgICAgLy8gT2JqZWN0XG4gICAgICAgICAgfSBlbHNlIGlmIChxdWV1ZWRJdGVtLmhhc093blByb3BlcnR5KCdhY3Rpb24nKSAmJiB0eXBlb2YgcXVldWVkSXRlbS5hY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIC8vIEFwcGx5IGFyZ3VtZW50cyB0byB0aGUgYWN0aW9uXG4gICAgICAgICAgICBpZiAocXVldWVkSXRlbS5oYXNPd25Qcm9wZXJ0eSgnYXJncycpICYmIHF1ZXVlZEl0ZW0uYXJncyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgIHF1ZXVlZEl0ZW0uYWN0aW9uKC4uLnF1ZXVlZEl0ZW0uYXJncylcblxuICAgICAgICAgICAgICAvLyBSdW4gdGhlIGFjdGlvbiBsaWtlIG5vcm1hbFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcXVldWVkSXRlbS5hY3Rpb24oKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERlbGV0ZSB0aGUgcXVldWVkIGl0ZW1cbiAgICAgICAgICBfcXVldWVbYWN0aW9uTGFiZWxdID0gdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIF9xdWV1ZVthY3Rpb25MYWJlbF1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBSZXZlcnQgdG8gc3RhdHVzIGJlZm9yZSBydW5cbiAgICAgIF9zdGF0dXMgPSBfcHJldmlvdXNTdGF0dXNcblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzdGF0dXMgb2YgdGhlIHF1ZXVlOlxuICAgICAqICAgMCA9IFBhdXNlZFxuICAgICAqICAgMSA9IFBsYXlpbmdcbiAgICAgKiAgIDIgPSBSdW5uaW5nXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBjaGVja1N0YXR1cyAoKSB7XG4gICAgICByZXR1cm4gX3N0YXR1c1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHRpbWVyIGRlbGF5XG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldFRpbWVyRGVsYXkgKCkge1xuICAgICAgcmV0dXJuIF90aW1lckRlbGF5XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgdGltZXIgZGVsYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB0aW1lckRlbGF5XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqIEByZXR1cm5zIHtTZWxmfVxuICAgICAqL1xuICAgIHNldFRpbWVyRGVsYXkgKHRpbWVyRGVsYXkpIHtcbiAgICAgIC8vIE9ubHkgc2V0IGlmIHRpbWVyRGVsYXkgaXMgZ3JlYXRlciB0aGFuIDBcbiAgICAgIGlmICh0aW1lckRlbGF5ICYmIHRpbWVyRGVsYXkgPiAwKSB7XG4gICAgICAgIF90aW1lckRlbGF5ID0gdGltZXJEZWxheVxuICAgICAgfVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgcXVldWVcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRRdWV1ZUxlbmd0aCAoKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXMoX3F1ZXVlKS5sZW5ndGhcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBRdWV1ZVxuIiwiLyoqXG4gKiBMVkw5OSBTbW9vdGggU2Nyb2xsXG4gKlxuICogU21vb3RobHkgc2Nyb2xsIHRvIGludGVybmFsIGFuY2hvciBsaW5rcyBvbiBhIHBhZ2UuXG4gKlxuICogIyMgVXNhZ2VcbiAqXG4gKiBTbW9vdGggU2Nyb2xsIG5lZWRzIHRvIGJlIGluaXRpYWxpc2VkIHdpdGggalF1ZXJ5IGFuZCBhbnkgY29uZmlndXJlZCBvcHRpb25zLiBEdXJpbmcgaW5pdGlhbGlzYXRpb24gdGhlIHNjcmlwdCB3aWxsXG4gKiBhcHBseSB0aGUgYmVoYXZpb3VycyB0byBhbnkgYXBwbGljYWJsZSBhbmNob3IgbGlua3MuXG4gKlxuICogYGBgXG4gKiAgIGxldCBTbW9vdGhTY3JvbGwgPSByZXF1aXJlKCdsdmw5OS9lczYvdG9vbHMvc21vb3RoLXNjcm9sbCcpKGpRdWVyeSwgeyBidWZmZXJUb3A6IDAgfSlcbiAqIGBgYFxuICpcbiAqIFlvdSBjYW4gYWxzbyBpbml0aWFsaXNlIHRoZSBzbW9vdGhTY3JvbGwgYmVoYXZpb3VycyBieSBjYWxsaW5nIGBzbW9vdGhTY3JvbGwuaW5pdCgpYC4gVGhpcyB3aWxsIGF0dGFjaCB0aGUgbmVjZXNzYXJ5XG4gKiBldmVudHMgb24gdG8gYW5jaG9yIGxpbmtzLlxuICpcbiAqIFlvdSBjYW4gdHJpZ2dlciB0aGUgc2Nyb2xsVG8gZXZlbnQgYnkgdXNpbmcgdGhlIGN1c3RvbSBldmVudCBgU21vb3RoU2Nyb2xsLnNjcm9sbFRvYCwgZS5nLjpcbiAqXG4gKiBgYGBcbiAqICAgJChkb2N1bWVudCkudHJpZ2dlcignU21vb3RoU2Nyb2xsLnNjcm9sbFRvJywgWyBzY3JvbGxUb09wdGlvbnMgXSlcbiAqIGBgYFxuICpcbiAqIFRoZSBgc2Nyb2xsVG9gIGZ1bmN0aW9uIGVtaXRzIGEgY3VzdG9tIGV2ZW50IGBTbW9vdGhTY3JvbGwuc2Nyb2xsVG86c3RhcnRgIHdoZW4gdGhlIGFjdGlvbiBpcyBpbnZva2VkIGFuZFxuICogYFNtb290aFNjcm9sbC5zY3JvbGxUbzplbmRgIHdoZW4gaXQgZmluaXNoZXMuXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBTbW9vdGhTY3JvbGwgPSBmdW5jdGlvbiAoJCwgb3B0aW9ucykge1xuICAvKipcbiAgICogTG9hZCBpbiB0aGUgc2V0dGluZ3NcbiAgICovXG4gIGNvbnN0IHNldHRpbmdzID0gJC5leHRlbmQoe1xuICAgIC8vIFRoZSBzcGFjZSBiZXR3ZWVuIHRoZSB0b3Agb2YgdGhlIHdpbmRvdyBhbmQgdGhlIHRvcCBvZiB0aGUgdGFyZ2V0XG4gICAgYnVmZmVyVG9wOiAwLFxuXG4gICAgLy8gVGhlIHNwZWVkIHRvIHNjcm9sbCB0aGUgd2luZG93XG4gICAgc2Nyb2xsU3BlZWQ6IDEwMDAsXG5cbiAgICAvLyBUaGUgZGlzdGFuY2UgZnJvbSB0b3Agb2Ygd2luZG93IHRvIHRvcCBvZiB0YXJnZXQgZWxlbWVudCB0byB0cmlnZ2VyIHNjcm9sbGluZ1xuICAgIHRyaWdnZXJEaXN0YW5jZTogNDAwXG4gIH0sIG9wdGlvbnMpXG5cbiAgLyoqXG4gICAqIFNtb290aGx5IHNjcm9sbCB0byBhIHRhcmdldFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ3xIVE1MRWxlbWVudHxqUXVlcnlPYmplY3R9IHRhcmdldFxuICAgKi9cbiAgZnVuY3Rpb24gc2Nyb2xsVG8gKHRhcmdldCwgc2Nyb2xsVG9PcHRpb25zKSB7XG4gICAgLy8gRmlndXJlIG91dCBlbGVtZW50IHRvIHNjcm9sbCB0b1xuICAgIGxldCAkdGFyZ2V0ID0gJCh0YXJnZXQpLm5vdCgnW2RhdGEtZGlzYWJsZS1zbW9vdGgtc2Nyb2xsXScpXG5cbiAgICAvLyBNb3JlIHRoYW4gb25lIHRhcmdldCwgZGVmYXVsdCB0byBmaXJzdFxuICAgICR0YXJnZXQgPSAoJHRhcmdldC5sZW5ndGggPiAxID8gJHRhcmdldC5lcSgwKSA6ICR0YXJnZXQpXG5cbiAgICAvLyBEb2VzIGEgc2Nyb2xsIHRhcmdldCBleGlzdD9cbiAgICBpZiAoJHRhcmdldC5sZW5ndGggPT09IDEpIHtcbiAgICAgIC8vIExvYWQgaW4gcGVyLXVzZSBzZXR0aW5nc1xuICAgICAgbGV0IHNjcm9sbFRvU2V0dGluZ3MgPSAkLmV4dGVuZCh7fSwgc2V0dGluZ3MsIHNjcm9sbFRvT3B0aW9ucylcblxuICAgICAgLy8gR2V0IHRoZSB0YXJnZXQncyB0b3Agb2Zmc2V0XG4gICAgICBsZXQgdGFyZ2V0T2Zmc2V0VG9wID0gJHRhcmdldC5vZmZzZXQoKS50b3BcblxuICAgICAgLy8gR2V0IGN1cnJlbnQgd2luZG93IHNjcm9sbFRvcFxuICAgICAgbGV0IHdpbmRvd1Njcm9sbFRvcCA9ICQod2luZG93KS5zY3JvbGxUb3AoKVxuXG4gICAgICAvLyBTdXBwb3J0IGR5bmFtaWMgYnVmZmVyVG9wIGlmIGl0IGlzIGEgZnVuY3Rpb25cbiAgICAgIGxldCBzY3JvbGxUb3AgPSB0YXJnZXRPZmZzZXRUb3AgLSAodHlwZW9mIHNjcm9sbFRvU2V0dGluZ3MuYnVmZmVyVG9wID09PSAnZnVuY3Rpb24nID8gc2Nyb2xsVG9TZXR0aW5ncy5idWZmZXJUb3AoKSA6IHNjcm9sbFRvU2V0dGluZ3MuYnVmZmVyVG9wKVxuXG4gICAgICAvLyBEb24ndCB0cmlnZ2VyIHRoZSBzY3JvbGwgaWYgdGhlIGRpc3RhbmNlIGlzIHdpdGhpblxuICAgICAgbGV0IGNoZWNrVHJpZ2dlckRpc3RhbmNlID0gTWF0aC5hYnMod2luZG93U2Nyb2xsVG9wIC0gc2Nyb2xsVG9wKVxuICAgICAgaWYgKGNoZWNrVHJpZ2dlckRpc3RhbmNlIDwgc2Nyb2xsVG9TZXR0aW5ncy50cmlnZ2VyRGlzdGFuY2UpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8qKlxuICAgICAgICogRW1pdCBzdGFydCBldmVudFxuICAgICAgICpcbiAgICAgICAqIEBldmVudCBTbW9vdGhTY3JvbGwuc2Nyb2xsVG86c3RhcnRcbiAgICAgICAqIEBwYXJhbSB7alF1ZXJ5T2JqZWN0fSAkdGFyZ2V0XG4gICAgICAgKiBAcGFyYW0ge09iamVjdH1cbiAgICAgICAqL1xuICAgICAgJHRhcmdldC50cmlnZ2VyKCdTbW9vdGhTY3JvbGwuc2Nyb2xsVG86c3RhcnQnLCBbIHNjcm9sbFRvU2V0dGluZ3MgXSlcblxuICAgICAgLy8gRG8gdGhlIHNjcm9sbCB0aGluZ1xuICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICBzY3JvbGxUb3BcbiAgICAgIH0sIHNjcm9sbFRvU2V0dGluZ3Muc2Nyb2xsU3BlZWQsICgpID0+IHtcbiAgICAgICAgLy8gQ2FsbGJhY2sgYWZ0ZXIgYW5pbWF0aW9uXG4gICAgICAgIC8vIE11c3QgY2hhbmdlIGZvY3VzIVxuICAgICAgICAkdGFyZ2V0LmZvY3VzKClcblxuICAgICAgICAvKipcbiAgICAgICAgICogRW1pdCBlbmQgZXZlbnRcbiAgICAgICAgICpcbiAgICAgICAgICogQGV2ZW50IFNtb290aFNjcm9sbC5zY3JvbGxUbzplbmRcbiAgICAgICAgICogQHBhcmFtIHtqUXVlcnlPYmplY3R9ICR0YXJnZXRcbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9XG4gICAgICAgICAqL1xuICAgICAgICAkdGFyZ2V0LnRyaWdnZXIoJ1Ntb290aFNjcm9sbC5zY3JvbGxUbzplbmQnLCBbIHNjcm9sbFRvU2V0dGluZ3MgXSlcblxuICAgICAgICAvLyBDaGVja2luZyBpZiB0aGUgdGFyZ2V0IHdhcyBmb2N1c2VkXG4gICAgICAgIGlmICgkdGFyZ2V0LmlzKCc6Zm9jdXMnKSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIGFsbCBsaW5rcyBvbiB0aGUgcGFnZSB3aXRoIHRoZSBzbW9vdGhTY3JvbGwgZnVuY3Rpb25hbGl0eVxuICAgKi9cbiAgZnVuY3Rpb24gaW5pdCAoKSB7XG4gICAgLy8gQXR0YWNoIGxpbmsgYmVoYXZpb3Vyc1xuICAgICQoJ2FbaHJlZio9XCIjXCJdJylcbiAgICAvLyBSZW1vdmUgbGlua3MgdGhhdCBkb24ndCBhY3R1YWxseSBsaW5rIHRvIGFueXRoaW5nXG4gICAgICAubm90KCdbaHJlZj1cIiNcIl0nKVxuICAgICAgLm5vdCgnW2hyZWY9XCIjMFwiXScpXG4gICAgICAuY2xpY2soZXZlbnQgPT4ge1xuICAgICAgICBjb25zdCAkYSA9ICQoZXZlbnQudGFyZ2V0KS5jbG9zZXN0KCdhJylcbiAgICAgICAgY29uc3QgaGFzaCA9ICRhLmF0dHIoJ2hyZWYnKS5yZXBsYWNlKC8uKiMoW14/XSspLiovLCAnIyQxJylcbiAgICAgICAgaWYgKCQoaGFzaCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICBzY3JvbGxUbyhoYXNoKVxuICAgICAgICB9XG4gICAgICB9KVxuXG4gICAgLy8gQXR0YWNoIGN1c3RvbSBldmVudCB0byB0cmlnZ2VyIHRocm91Z2ggRE9NXG4gICAgJChkb2N1bWVudCkub24oJ1Ntb290aFNjcm9sbC5zY3JvbGxUbycsIGZ1bmN0aW9uIChldmVudCwgc2Nyb2xsVG9PcHRpb25zKSB7XG4gICAgICBpZiAoZXZlbnQudGFyZ2V0KSB7XG4gICAgICAgIHNjcm9sbFRvKGV2ZW50LnRhcmdldCwgc2Nyb2xsVG9PcHRpb25zKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICAvLyBDaGVjayB0byBzZWUgaWYgYSBoYXNoIGlzIGxvY2F0ZWQgaW4gdGhlIHdpbmRvdy5sb2NhdGlvbiBhbmQgc2Nyb2xsIHRvIHRoZSBlbGVtZW50XG4gICAgaWYgKHdpbmRvdy5sb2NhdGlvbi5oYXNoKSB7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2Nyb2xsVG8od2luZG93LmxvY2F0aW9uLmhhc2gpXG4gICAgICB9LCAxMDAwKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaW5pdCxcbiAgICBzY3JvbGxUb1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU21vb3RoU2Nyb2xsXG4iLCIvKipcbiAqIExWTDk5IFRyYWNrIEV2ZW50XG4gKiBDYWNoZXMgdHJhY2tlZCBldmVudHMgdW50aWwgR29vZ2xlIEFuYWx5dGljcyBpcyBsb2FkZWQsIHRoZW4gdXBsb2FkcyB0byBHQVxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuZnVuY3Rpb24gVHJhY2tFdmVudCAoZGVidWcpIHtcbiAgLyoqXG4gICAqIENvbGxlY3QgdHJhY2tlZCBldmVudHMgYmVmb3JlIEdBIGlzIGxvYWRlZFxuICAgKiBAdHlwZSB7QXJyYXl9XG4gICAqL1xuICBsZXQgc2F2ZWQgPSBbXVxuXG4gIC8qKlxuICAgKiBTdGFydCBjaGVja2luZyB0byBzZWUgaWYgdGhlIEdBIG9iamVjdCBpcyBsb2FkZWRcbiAgICovXG4gIC8qKlxuICAgKiBEZXRlY3QgaWYgR0EgaXMgbG9hZGVkIGFuZCB0aGVuIHNlbmQgYW55IHN0b3JlZCBHQSBldmVudHNcbiAgICovXG4gIHRoaXMuZ2FMb2FkZWRUaW1lciA9IHNldEludGVydmFsKChmdW5jdGlvbiAobHZsOTlUcmFja0V2ZW50KSB7XG4gICAgbGV0IGlcblxuICAgIC8vIFdhaXQgdW50aWwgR0Egb2JqZWN0IGlzIGF2YWlsYWJsZVxuICAgIGlmICh0eXBlb2Ygd2luZG93LmdhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY2xlYXJJbnRlcnZhbChsdmw5OVRyYWNrRXZlbnQuZ2FMb2FkZWRUaW1lcilcblxuICAgICAgLy8gU2VuZCBzYXZlZCBldmVudHNcbiAgICAgIGlmIChsdmw5OVRyYWNrRXZlbnQuc2F2ZWQubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoZGVidWcgJiYgd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nKSB7XG4gICAgICAgICAgY29uc29sZS5sb2coYFNlbmRpbmcgJHtsdmw5OVRyYWNrRXZlbnQuc2F2ZWQubGVuZ3RofSB0cmFja2VkIGV2ZW50cyB0byBnYWApXG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGkgaW4gbHZsOTlUcmFja0V2ZW50LnNhdmVkKSB7XG4gICAgICAgICAgd2luZG93LmdhKCdzZW5kJywgbHZsOTlUcmFja0V2ZW50LnNhdmVkW2ldKVxuICAgICAgICB9XG4gICAgICAgIGx2bDk5VHJhY2tFdmVudC5zYXZlZCA9IFtdXG4gICAgICB9XG4gICAgfVxuICB9KHRoaXMpKSwgNTAwMClcblxuICAvKipcbiAgICogVHJhY2sgZXZlbnQgbWFnaWNcbiAgICogQHBhcmFtIGV2ZW50Q2F0ZWdvcnlcbiAgICogQHBhcmFtIGV2ZW50QWN0aW9uXG4gICAqIEBwYXJhbSBldmVudExhYmVsXG4gICAqIEBwYXJhbSBldmVudFZhbHVlXG4gICAqL1xuICByZXR1cm4gZnVuY3Rpb24gdHJhY2sgKGV2ZW50Q2F0ZWdvcnksIGV2ZW50QWN0aW9uLCBldmVudExhYmVsLCBldmVudFZhbHVlKSB7XG4gICAgbGV0IHRyYWNrZWRFdmVudCA9IHtcbiAgICAgIGhpdFR5cGU6ICdldmVudCcsXG4gICAgICBldmVudENhdGVnb3J5OiBldmVudENhdGVnb3J5LFxuICAgICAgZXZlbnRBY3Rpb246IGV2ZW50QWN0aW9uLFxuICAgICAgZXZlbnRMYWJlbDogZXZlbnRMYWJlbCxcbiAgICAgIGV2ZW50VmFsdWU6IGV2ZW50VmFsdWVcbiAgICB9XG5cbiAgICBpZiAoIWV2ZW50Q2F0ZWdvcnkgfHwgIWV2ZW50QWN0aW9uKSByZXR1cm47XG4gICAgaWYgKHR5cGVvZiBldmVudFZhbHVlID09PSAnc3RyaW5nJykgcmV0dXJuO1xuXG4gICAgLy8gR0EgaXMgbG9hZGVkXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuZ2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoZGVidWcgJiYgd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdTZW5kIHRyYWNrZWRFdmVudCB0byBHQScsIHRyYWNrZWRFdmVudClcbiAgICAgIH1cbiAgICAgIHdpbmRvdy5nYSgnc2VuZCcsIHRyYWNrZWRFdmVudClcblxuICAgICAgLy8gd2FpdGluZyBmb3IgR0EgdG8gbG9hZCwgdXNlIGludGVybmFsIHZhciB0byBjb2xsZWN0XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS5sb2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ0dBIG5vdCBsb2FkZWQgeWV0LCBzdG9yZSB0cmFja2VkRXZlbnQnLCB0cmFja2VkRXZlbnQpXG4gICAgICB9XG4gICAgICB0aGlzLnNhdmVkLnB1c2godHJhY2tlZEV2ZW50KVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRyYWNrRXZlbnRcbiIsIi8qKlxuICogTFZMOTkgVXRpbHNcbiAqXG4gKiBVdGlsaXRpZXMgdXNlZCB0aHJvdWdob3V0IHRoZSBmcmFtZXdvcmtcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpXG5jb25zdCBpbmhlcml0YW5jZSA9IHJlcXVpcmUoJy4vaW5oZXJpdGFuY2UnKVxuLy8gY29uc3Qgc3VwZXIgPSByZXF1aXJlKCcuL3N1cGVyJylcblxuY29uc3QgdXRpbHMgPSB7XG4gIHBhcnNlLFxuICBpbmhlcml0YW5jZVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzXG4iLCIvKipcbiAqIExWTDk5IEluaGVyaXRhbmNlIHV0aWxpdGllc1xuICovXG5cbmNvbnN0IFJFX1BSSVZBVEUgPSAvXl8vXG5cbi8qKlxuICogQXNzaWduIHB1YmxpYyBnZXR0ZXIvc2V0dGVyIHByb3BlcnRpZXMgdG8gdGhlIHRhcmdldC4gVGhpcyB3aWxsIHJlZmVyZW5jZSB0aGUgdGFyZ2V0IHByb3BlcnR5IChpZiBpdCBpcyBzZXQpXG4gKiBvdGhlcndpc2UgdXNlIHRoZSBkZWZhdWx0IHByb3BlcnR5IHZhbHVlLiBZb3UgY2FuIGFsc28gd2hpdGVsaXN0IHRoZSBwcm9wZXJ0aWVzIHlvdSB3YW50IHRvIHNlbGVjdGl2ZWx5XG4gKiBleHBvc2UgYnkgbmFtZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gZGVmYXVsdFByb3BWYWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IHdoaXRlbGlzdFxuICovXG5mdW5jdGlvbiBleHBvc2VBbGxQcm9wZXJ0aWVzICh0YXJnZXQsIGRlZmF1bHRQcm9wVmFsdWVzLCB3aGl0ZWxpc3QpIHtcbiAgbGV0IHByb3BlcnRpZXNcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gdGFyZ2V0IHdhcyBnaXZlbicpXG4gIH1cblxuICAvLyBGaWx0ZXIgbm9uLXdoaXRlbGlzdGVkIHByb3BlcnRpZXNcbiAgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRhcmdldCkuZmlsdGVyKGl0ZW0gPT4ge1xuICAgIHJldHVybiAod2hpdGVsaXN0ICYmIHdoaXRlbGlzdC5pbmNsdWRlcyhpdGVtKSkgfHwgIXdoaXRlbGlzdFxuICB9KVxuXG4gIC8vIEBkZWJ1Z1xuICAvLyBjb25zb2xlLmxvZygnZmlsdGVyZWQgcHJvcGVydGllcycsIHByb3BlcnRpZXMpXG5cbiAgaWYgKCFwcm9wZXJ0aWVzIHx8ICFwcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gcHJvcGVydGllcyB3ZXJlIGdpdmVuJylcbiAgfVxuXG4gIC8vIERlZmF1bHQgcHJvcCB2YWx1ZXMgdG8gdGFyZ2V0XG4gIGlmICh0eXBlb2YgZGVmYXVsdFByb3BWYWx1ZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZGVmYXVsdFByb3BWYWx1ZXMgPSB0YXJnZXRcbiAgfVxuXG4gIC8vIFByb2Nlc3MgYW5kIGV4cG9zZSB0aGUgcHJvcGVydGllcyBvbiB0aGUgdGFyZ2V0XG4gIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wTmFtZSA9PiB7XG4gICAgbGV0IHVzZVByb3BOYW1lID0gcHJvcE5hbWVcblxuICAgIC8vIFByaXZhdGUgdmFsdWVzIGNhbiBvbmx5IGhhdmUgYSBwdWJsaWMgZ2V0dGVyXG4gICAgaWYgKFJFX1BSSVZBVEUudGVzdChwcm9wTmFtZSkpIHtcbiAgICAgIHVzZVByb3BOYW1lID0gcHJvcE5hbWUucmVwbGFjZShSRV9QUklWQVRFLCAnJylcblxuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZygnRm91bmQgcHJpdmF0ZSBwcm9wZXJ0eScsIHtcbiAgICAgIC8vICAgcHJvcE5hbWUsXG4gICAgICAvLyAgIHVzZVByb3BOYW1lLFxuICAgICAgLy8gICBwcm9wVmFsdWU6IGRlZmF1bHRQcm9wVmFsdWVzW3Byb3BOYW1lXSxcbiAgICAgIC8vICAgdGFyZ2V0XG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBIaWRlIG9yaWdpbmFsIHByaXZhdGUgdmFsdWVcbiAgICAgIC8vIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIHByb3BOYW1lLCB7XG4gICAgICAvLyAgIGVudW1lcmFibGU6IGZhbHNlXG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBDcmVhdGUgcHVibGljIGludGVyZmFjZVxuICAgICAgY3JlYXRlUHVibGljR2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wTmFtZSwgdXNlUHJvcE5hbWUsIGRlZmF1bHRQcm9wVmFsdWVzW3Byb3BOYW1lXSlcblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBAZGVidWdcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdGb3VuZCBwdWJsaWMgcHJvcGVydHknLCB7XG4gICAgICAvLyAgIHByb3BOYW1lLFxuICAgICAgLy8gICB1c2VQcm9wTmFtZSxcbiAgICAgIC8vICAgcHJvcFZhbHVlOiBwcm9wZXJ0aWVzW3Byb3BOYW1lXSxcbiAgICAgIC8vICAgdGFyZ2V0XG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBDcmVhdGUgcHVibGljIGludGVyZmFjZVxuICAgICAgY3JlYXRlUHVibGljR2V0U2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wTmFtZSwgdXNlUHJvcE5hbWUsIGRlZmF1bHRQcm9wVmFsdWVzW3Byb3BOYW1lXSlcbiAgICB9XG4gIH0pXG59XG5cbi8qKlxuICogRXhwb3NlIG9ubHkgdGhlIHByaXZhdGUgcHJvcGVydGllcyBsaXN0ZWQgb24gdGhlIHRhcmdldCB3aXRoIHB1YmxpYyBnZXR0ZXIgcHJvcGVydHkuIFdoaXRlbGlzdCBvbmx5IHRob3NlIHlvdSB3YW50XG4gKiBieSBhZGRpbmcgdGhlIHByb3BlcnR5J3MgbmFtZSB0byB0aGUgd2hpdGVsaXN0IHtBcnJheX1cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gZGVmYXVsdFByb3BWYWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl9IHdoaXRlbGlzdFxuICovXG5mdW5jdGlvbiBleHBvc2VQcml2YXRlUHJvcGVydGllcyh0YXJnZXQsIGRlZmF1bHRQcm9wVmFsdWVzLCB3aGl0ZWxpc3QpIHtcbiAgbGV0IHByb3BlcnRpZXNcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gdGFyZ2V0IHdhcyBnaXZlbicpXG4gIH1cblxuICAvLyBGaWx0ZXIgbm9uLXByaXZhdGUgb3Igbm9uLXdoaXRlbGlzdGVkIHByb3BlcnRpZXNcbiAgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHRhcmdldCkuZmlsdGVyKGl0ZW0gPT4ge1xuICAgIGlmICgod2hpdGVsaXN0ICYmIHdoaXRlbGlzdC5pbmNsdWRlcyhpdGVtKSkgfHwgIXdoaXRlbGlzdCkge1xuICAgICAgcmV0dXJuIFJFX1BSSVZBVEUudGVzdChpdGVtKVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfSlcblxuICAvLyBAZGVidWdcbiAgLy8gY29uc29sZS5sb2coJ2ZpbHRlcmVkIHByb3BlcnRpZXMnLCBwcm9wZXJ0aWVzKVxuXG4gIC8vIFNpbGVudCBkZWF0aFxuICBpZiAoIXByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICAvLyBEZWZhdWx0IHByb3AgdmFsdWVzIHRvIHRhcmdldFxuICBpZiAodHlwZW9mIGRlZmF1bHRQcm9wVmFsdWVzID09PSAndW5kZWZpbmVkJykge1xuICAgIGRlZmF1bHRQcm9wVmFsdWVzID0gdGFyZ2V0XG4gIH1cblxuICAvLyBQcm9jZXNzIGFuZCBleHBvc2UgdGhlIHByb3BlcnRpZXMgb24gdGhlIHRhcmdldFxuICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcE5hbWUgPT4ge1xuICAgIGxldCB1c2VQcm9wTmFtZSA9IHByb3BOYW1lXG5cbiAgICAvLyBDcmVhdGUgYSBwdWJsaWMgaGFuZGxlIGZvciB0aGUgcHJpdmF0ZSBwcm9wZXJ0eSAocmVtb3ZlcyB0aGUgXCJfXCIgYXQgdGhlIHN0YXJ0KVxuICAgIHVzZVByb3BOYW1lID0gcHJvcE5hbWUucmVwbGFjZShSRV9QUklWQVRFLCAnJylcblxuICAgIC8vIENyZWF0ZSBwdWJsaWMgaW50ZXJmYWNlXG4gICAgY3JlYXRlUHVibGljR2V0UHJvcGVydHkodGFyZ2V0LCBwcm9wTmFtZSwgdXNlUHJvcE5hbWUsIGRlZmF1bHRQcm9wVmFsdWVzW3Byb3BOYW1lXSlcbiAgfSlcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwdWJsaWMgZ2V0dGVyIGludGVyZmFjZSBmb3IgYSBwcm9wZXJ0eSBvbiBhIHRhcmdldFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXRQcm9wTmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IG5ld1Byb3BOYW1lXG4gKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0UHJvcFZhbHVlIFVzZWQgaWYgdGhlIHRhcmdldCdzIHRhcmdldFByb3BOYW1lIGlzIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBjcmVhdGVQdWJsaWNHZXRQcm9wZXJ0eSAodGFyZ2V0LCB0YXJnZXRQcm9wTmFtZSwgbmV3UHJvcE5hbWUsIGRlZmF1bHRQcm9wVmFsdWUpIHtcbiAgaWYgKCF0YXJnZXQuaGFzT3duUHJvcGVydHkobmV3UHJvcE5hbWUpKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmV3UHJvcE5hbWUsIHtcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIHRhcmdldFt0YXJnZXRQcm9wTmFtZV0gIT09ICd1bmRlZmluZWQnID8gdGFyZ2V0W3RhcmdldFByb3BOYW1lXSA6IGRlZmF1bHRQcm9wVmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0OiB1bmRlZmluZWQsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHB1YmxpYyBnZXR0ZXIvc2V0dGVyIGludGVyZmFjZSBmb3IgYSBwcm9wZXJ0eSBvbiBhIHRhcmdldFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXRQcm9wTmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IG5ld1Byb3BOYW1lXG4gKiBAcGFyYW0ge01peGVkfSBkZWZhdWx0UHJvcFZhbHVlIFVzZWQgaWYgdGhlIHRhcmdldCdzIHRhcmdldFByb3BOYW1lIGlzIHVuZGVmaW5lZFxuICovXG5mdW5jdGlvbiBjcmVhdGVQdWJsaWNHZXRTZXRQcm9wZXJ0eSAodGFyZ2V0LCB0YXJnZXRQcm9wTmFtZSwgbmV3UHJvcE5hbWUsIGRlZmF1bHRQcm9wVmFsdWUpIHtcbiAgaWYgKCF0YXJnZXQuaGFzT3duUHJvcGVydHkobmV3UHJvcE5hbWUpKSB7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgbmV3UHJvcE5hbWUsIHtcbiAgICAgIGdldCAoKSB7XG4gICAgICAgIHJldHVybiAodHlwZW9mIHRhcmdldFt0YXJnZXRQcm9wTmFtZV0gIT09ICd1bmRlZmluZWQnID8gdGFyZ2V0W3RhcmdldFByb3BOYW1lXSA6IGRlZmF1bHRQcm9wVmFsdWUpXG4gICAgICB9LFxuICAgICAgc2V0IChuZXdWYWx1ZSkge1xuICAgICAgICB0YXJnZXRbdGFyZ2V0UHJvcE5hbWVdID0gbmV3VmFsdWVcbiAgICAgIH0sXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5jb25zdCBpbmhlcml0YW5jZSA9IHtcbiAgZXhwb3NlQWxsUHJvcGVydGllcyxcbiAgZXhwb3NlUHJpdmF0ZVByb3BlcnRpZXMsXG4gIGNyZWF0ZVB1YmxpY0dldFByb3BlcnR5LFxuICBjcmVhdGVQdWJsaWNHZXRTZXRQcm9wZXJ0eVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaGVyaXRhbmNlXG4iLCIvKipcbiAqIExWTDk5IFBhcnNlXG4gKlxuICogUGFyc2Ugc3RyaW5ncyBvciB0cmFuc2Zvcm0gZnJvbSBvbmUgZm9ybWF0IHRvIGFub3RoZXJcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IF9fbG9nZ2VyUGF0aCA9ICdsdmw5OS91dGlscy9wYXJzZSdcbmNvbnN0IG9iamVjdFBhdGggPSByZXF1aXJlKCdvYmplY3QtcGF0aCcpXG5cbi8qKlxuICogQ29lcmNlIGEgdmFsdWUgdG8gaXRzIHByaW1pdGl2ZSB0eXBlXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gaW5wdXRcbiAqIEByZXR1cm5zIHtNaXhlZH1cbiAqL1xuZnVuY3Rpb24gY29lcmNlVG9QcmltaXRpdmVUeXBlIChpbnB1dCkge1xuICAvLyBOb24tc3RyaW5nPyBKdXN0IHJldHVybiBpdCBzdHJhaWdodCBhd2F5XG4gIGlmICh0eXBlb2YgaW5wdXQgIT09ICdzdHJpbmcnKSByZXR1cm4gaW5wdXRcblxuICAvLyBUcmltIGFueSB3aGl0ZXNwYWNlXG4gIGlucHV0ID0gKGlucHV0ICsgJycpLnRyaW0oKVxuXG4gIC8vIE51bWJlclxuICBpZiAoL15cXC0/KD86XFxkKltcXC5cXCxdKSpcXGQqKD86W2VFXSg/OlxcLT9cXGQrKT8pPyQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoaW5wdXQpXG5cbiAgLy8gQm9vbGVhbjogdHJ1ZVxuICB9IGVsc2UgaWYgKC9eKHRydWV8MSkkLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiB0cnVlXG5cbiAgLy8gTmFOXG4gIH0gZWxzZSBpZiAoL15OYU4kLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBOYU5cblxuICAvLyB1bmRlZmluZWRcbiAgfSBlbHNlIGlmICgvXnVuZGVmaW5lZCQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuXG4gIC8vIG51bGxcbiAgfSBlbHNlIGlmICgvXm51bGwkLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBudWxsXG5cbiAgLy8gQm9vbGVhbjogZmFsc2VcbiAgfSBlbHNlIGlmICgvXihmYWxzZXwwKSQvLnRlc3QoaW5wdXQpIHx8IGlucHV0ID09PSAnJykge1xuICAgIHJldHVybiBmYWxzZVxuXG4gIC8vIEpTT046IHN0YXJ0cyB3aXRoIFsgb3IgeyBhbmQgZW5kcyB3aXRoIF0gb3IgfVxuICB9IGVsc2UgaWYgKC9eW1xcW1xce10vLnRlc3QoaW5wdXQpICYmIC9bXFxdXFx9XSQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGNvbnZlcnRTdHJpbmdUb0pzb24oaW5wdXQpXG5cbiAgLy8gU3RyaW5nIG1hcmtlZCB3aXRoIHNpbmdsZS9kb3VibGUgcXVvdGF0aW9uIG1hcmtzXG4gIH0gZWxzZSBpZiAoL15bJ1wiXXxbXCInXSQvKSB7XG4gICAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL15bJ1wiXXxbJ1wiXSQvZywgJycpXG4gIH1cblxuICAvLyBEZWZhdWx0IHRvIHN0cmluZ1xuICByZXR1cm4gaW5wdXRcbn1cblxuLyoqXG4gKiBDb252ZXJ0IHZhbHVlIHRvIGFuIGV4cGxpY2l0IGJvb2xlYW4uIE5hbWVseSBmb3IgcHJvY2Vzc2luZyBzdHJpbmcgdmFsdWVzLlxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGlucHV0XG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gY29udmVydFRvQm9vbGVhbiAoaW5wdXQpIHtcbiAgLy8gQWxyZWFkeSBib29sZWFuXG4gIGlmIChpbnB1dCA9PT0gdHJ1ZSB8fCBpbnB1dCA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gaW5wdXRcbiAgfVxuXG4gIC8vIENhc2VzIG9mIHRydXRoeS9mYWxzZXkgdmFsdWVzXG4gIHN3aXRjaCAoaW5wdXQpIHtcbiAgICBjYXNlIDE6XG4gICAgY2FzZSAnMSc6XG4gICAgY2FzZSAndHJ1ZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuXG4gICAgY2FzZSAwOlxuICAgIGNhc2UgJzAnOlxuICAgIGNhc2UgJ2ZhbHNlJzpcbiAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICBjYXNlICd1bmRlZmluZWQnOlxuICAgIGNhc2UgbnVsbDpcbiAgICBjYXNlICdudWxsJzpcbiAgICBjYXNlIE5hTjpcbiAgICBjYXNlICdOYU4nOlxuICAgIGNhc2UgJyc6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxuXG4gIC8vIE90aGVyd2lzZS4uLlxuICByZXR1cm4gISFpbnB1dFxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHJpbmcgdG8gSlNPTiBvciBqdXN0IHJldHVybiB0aGUgc3RyaW5nIGlmIGNhbid0XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0XG4gKiBAcmV0dXJucyB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBjb252ZXJ0U3RyaW5nVG9Kc29uIChpbnB1dCkge1xuICBsZXQgb3V0cHV0ID0gaW5wdXRcblxuICAvLyBDb252ZXJ0IHN0cmluZyBkYXRhIHRvIEpTT05cbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICB0cnkge1xuICAgICAgb3V0cHV0ID0gSlNPTi5wYXJzZShpbnB1dClcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGAke19sb2dnZXJQYXRofS5jb252ZXJ0U3RyaW5nVG9Kc29uOiBFcnJvciBwYXJzaW5nIHN0cmluZyBKU09OIGRhdGFgLCBpbnB1dClcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbi8qKlxuICogQ29udmVydCBhIHN0cmluZyB0byBhIGZsb2F0LlxuICogVGhpcyBhbHNvIGNvbnZlcnRzIG51bWJlciBjb25zdGFudHMgbGlrZSBJbmZpbml0eSBhbmQgTmFOIHRvIHplcm8uXG4gKlxuICogQHBhcmFtIGlucHV0XG4gKiBAcmV0dXJucyB7Kn1cbiAqL1xuZnVuY3Rpb24gY29udmVydFN0cmluZ1RvRmxvYXQgKGlucHV0KSB7XG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIGlucHV0XG4gIH1cblxuICBsZXQgb3V0cHV0ID0gcGFyc2VGbG9hdCgoaW5wdXQgKyAnJykucmVwbGFjZSgvW15cXGRcXC1cXC5dKy9nLCAnJykpXG5cbiAgLy8gSW5maW5pdHkgLyBOYU5cbiAgaWYgKCFpc0Zpbml0ZShpbnB1dCkgfHwgaXNOYU4oaW5wdXQpIHx8IGlzTmFOKG91dHB1dCkpIHtcbiAgICBvdXRwdXQgPSAwXG4gIH1cblxuICByZXR1cm4gb3V0cHV0XG59XG5cbi8qKlxuICogRXh0cmFjdCBrZXktdmFsdWVzIGZyb20gYSBzdHJpbmcgd2hpY2ggaXMgbGlrZSBhIENTUyBjbGFzcyBkZWNsYXJhdGlvbiwgZS5nLiBga2V5OiB2YWx1ZTsga2V5OiB2YWx1ZWBcbiAqXG4gKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgaW50ZXJlc3RpbmcgYXMgaXQgY2FuIHRha2UgYSBuYW1lIHdpdGggZG90c1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dFxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBleHRyYWN0Q2xhc3NEZXRhaWxzIChpbnB1dCkge1xuICBsZXQgb3V0cHV0ID0ge31cbiAgbGV0IGlucHV0UGFydHMgPSBbaW5wdXRdXG5cbiAgLy8gQ2hlY2sgaWYgaXQgaGFzIHNlbWktY29sb25zXG4gIGlmICgvOy8udGVzdChpbnB1dCkpIHtcbiAgICBpbnB1dFBhcnRzID0gaW5wdXQuc3BsaXQoJzsnKVxuICB9XG5cbiAgLy8gUHJvY2VzcyBlYWNoIGlucHV0IHBhcnRcbiAgaW5wdXRQYXJ0cy5mb3JFYWNoKChwYXJ0KSA9PiB7XG4gICAgcGFydCA9IHBhcnQudHJpbSgpXG4gICAgaWYgKHBhcnQpIHtcbiAgICAgIGxldCBwYXJ0UGFydHMgPSBwYXJ0Lm1hdGNoKC8oW2EtejAtOV8uLV0rKTooW147XSspOz8vaSlcbiAgICAgIGxldCBwYXJ0TmFtZSA9IHBhcnRQYXJ0c1sxXS50cmltKClcbiAgICAgIGxldCBwYXJ0VmFsdWUgPSBjb2VyY2VUb1ByaW1pdGl2ZVR5cGUocGFydFBhcnRzWzJdLnRyaW0oKSlcblxuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZygncGFyc2VkIHBhcnQnLCB7XG4gICAgICAvLyAgIHBhcnQsXG4gICAgICAvLyAgIHBhcnROYW1lLFxuICAgICAgLy8gICBwYXJ0VmFsdWUsXG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBFbnN1cmUgb3V0cHV0IG9iamVjdCBleGlzdHMgaWYgdXNpbmcgZG90IG5vdGF0aW9uXG4gICAgICBpZiAoL1xcLi8udGVzdChwYXJ0TmFtZSkpIHtcbiAgICAgICAgbGV0IG9ialBhcnRzID0gcGFydE5hbWUuc3BsaXQoJy4nKVxuICAgICAgICBsZXQgb2JqUGFydFBhdGggPSAnJ1xuXG4gICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAvLyBjb25zb2xlLmxvZygncGFydCBoYXMgZG90IG5vdGF0aW9uJywge1xuICAgICAgICAvLyAgIG91dHB1dCxcbiAgICAgICAgLy8gICBwYXJ0TmFtZSxcbiAgICAgICAgLy8gICBwYXJ0VmFsdWUsXG4gICAgICAgIC8vICAgb2JqUGFydHMsXG4gICAgICAgIC8vICAgb2JqUGFydFBhdGhcbiAgICAgICAgLy8gfSlcblxuICAgICAgICBmb3IgKGxldCBvYmpQYXJ0SW5kZXggPSAwOyBvYmpQYXJ0SW5kZXggPCAob2JqUGFydHMubGVuZ3RoIC0gMSk7IG9ialBhcnRJbmRleCsrKSB7XG4gICAgICAgICAgb2JqUGFydFBhdGggKz0gKG9ialBhcnRJbmRleCA+IDAgPyAnLicgOiAnJykgKyBvYmpQYXJ0c1tvYmpQYXJ0SW5kZXhdXG5cbiAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhvYmpQYXJ0UGF0aClcblxuICAgICAgICAgIGlmICghb2JqZWN0UGF0aC5oYXMob3V0cHV0LCBvYmpQYXJ0UGF0aCkpIHtcbiAgICAgICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NldHRpbmcgb2JqZWN0IHBhcnQgcGF0aCcsIHtcbiAgICAgICAgICAgIC8vICAgb3V0cHV0LFxuICAgICAgICAgICAgLy8gICBwYXJ0TmFtZSxcbiAgICAgICAgICAgIC8vICAgcGFydFZhbHVlLFxuICAgICAgICAgICAgLy8gICBvYmpQYXJ0SW5kZXgsXG4gICAgICAgICAgICAvLyAgIG9ialBhcnRQYXRoXG4gICAgICAgICAgICAvLyB9KVxuXG4gICAgICAgICAgICBvYmplY3RQYXRoLnNldChvdXRwdXQsIG9ialBhcnRQYXRoLCB7fSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHZpYSBvYmplY3RQYXRoXG4gICAgICBvYmplY3RQYXRoLnNldChvdXRwdXQsIHBhcnROYW1lLCBwYXJ0VmFsdWUpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxuLyoqXG4gKiBFeHRyYWN0IHRoZSB0cmlnZ2VyJ3MgdGFyZ2V0IGRldGFpbHNcbiAqXG4gKiBUaGlzIGFsbG93cyB5b3UgdG8gZXh0cmFjdCB0aGUgbmVjZXNzYXJ5IGRhdGEgZnJvbSB0aGUgc3RyaW5nIGFuZCB0aGUgZ2xvYmFsIHdpbmRvdy9kb2N1bWVudCBhdmFpbGFibGUsIHRvIGNyZWF0ZVxuICogZHluYW1pYyBldmVudCBiaW5kaW5ncy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGlucHV0XG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gY29udGV4dCBEZWZhdWx0cyB0byBgd2luZG93YC4gV2hlcmUgdG8gZmluZCB0aGUgYGRvYCBhY3Rpb25cbiAqIEByZXR1cm5zIHtPYmplY3R9ID0+IHsgZXZlbnROYW1lOiB7U3RyaW5nfSwgbWV0aG9kOiB7RnVuY3Rpb259LCBzZWxlY3Rvcjoge1N0cmluZ30sIHRhcmdldDoge09iamVjdH0gfVxuICovXG5mdW5jdGlvbiBleHRyYWN0VHJpZ2dlckRldGFpbHMoaW5wdXQsIGNvbnRleHQpIHtcbiAgbGV0IHRyaWdnZXIgPSBpbnB1dFxuXG4gIGlmICghY29udGV4dCkge1xuICAgIGNvbnRleHQgPSB3aW5kb3dcbiAgfVxuXG4gIC8vIFN0cmluZyBpbnB1dCBnaXZlblxuICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgIC8vIFRyeSBKU09OIGZpcnN0XG4gICAgaWYgKC9eey8udGVzdChpbnB1dCkpIHtcbiAgICAgIHRyaWdnZXIgPSBjb252ZXJ0U3RyaW5nVG9Kc29uKGlucHV0KVxuXG4gICAgICAvLyBUcnkgY2xhc3MgZGV0YWlsc1xuICAgIH0gZWxzZSBpZiAoL15bYS16MC05Xy1dKzovLnRlc3QoaW5wdXQpKSB7XG4gICAgICB0cmlnZ2VyID0gZXh0cmFjdENsYXNzRGV0YWlscyhpbnB1dClcblxuICAgICAgLy8gU3RyaW5nIHdpdGggbm8gc3BhY2VzXG4gICAgfSBlbHNlIGlmICghLyAvLnRlc3QoaW5wdXQpKSB7XG4gICAgICB0cmlnZ2VyID0ge1xuICAgICAgICBkbzogaW5wdXRcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBObyBvYmplY3QgZm91bmQhXG4gIGlmICh0eXBlb2YgdHJpZ2dlciAhPT0gJ29iamVjdCcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7X2xvZ2dlclBhdGh9LmV4dHJhY3RUcmlnZ2VyRGV0YWlsczogaW5wdXQgd2FzIG5vdCB2YWxpZCBKU09OIG9yIENTUy1zdHlsZSBkZWZpbml0aW9uYClcbiAgfVxuXG4gIC8vIEVuc3VyZSBpdCBoYXMgYG9uYCBhbmQgYGRvYCBwcm9wZXJ0aWVzXG4gIC8vIGlmICghb2JqZWN0UGF0aC5oYXModHJpZ2dlciwgJ29uJykpIHtcbiAgLy8gICB0aHJvdyBuZXcgRXJyb3IoYCR7X2xvZ2dlclBhdGh9LmV4dHJhY3RUcmlnZ2VyRGV0YWlsczogdHJpZ2dlciBpcyBtaXNzaW5nIHJlcXVpcmVkICdvbicgcHJvcGVydHlgKVxuICAvLyB9XG4gIGlmICghb2JqZWN0UGF0aC5oYXModHJpZ2dlciwgJ2RvJykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYCR7X2xvZ2dlclBhdGh9LmV4dHJhY3RUcmlnZ2VyRGV0YWlsczogdHJpZ2dlciBpcyBtaXNzaW5nIHJlcXVpcmVkICdkbycgcHJvcGVydHlgKVxuICB9XG5cbiAgLy8gSWYgdGFyZ2V0IGlzIHNldCwgdXNlIHJlYWwgdmFsdWVzIGZvciB3aW5kb3cgYW5kIGRvY3VtZW50XG4gIGlmIChvYmplY3RQYXRoLmhhcyh0cmlnZ2VyLCAndGFyZ2V0JykpIHtcbiAgICBzd2l0Y2ggKHRyaWdnZXIudGFyZ2V0KSB7XG4gICAgICBjYXNlICdzZWxmJzpcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ1RhcmdldGluZyBzZWxmJywgY29udGV4dClcbiAgICAgICAgdHJpZ2dlci50YXJnZXQgPSBjb250ZXh0XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgdHJpZ2dlci50YXJnZXQgPSBkb2N1bWVudFxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICd3aW5kb3cnOlxuICAgICAgICB0cmlnZ2VyLnRhcmdldCA9IHdpbmRvd1xuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIC8vIERvIHNhbWUgYXMgYWJvdmUgaWYgYSBjb250ZXh0IHdhcyBzZXQhXG4gIGlmIChvYmplY3RQYXRoLmhhcyh0cmlnZ2VyLCAnY29udGV4dCcpKSB7XG4gICAgc3dpdGNoICh0cmlnZ2VyLmNvbnRleHQpIHtcbiAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgdHJpZ2dlci5jb250ZXh0ID0gZG9jdW1lbnRcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAnd2luZG93JzpcbiAgICAgICAgdHJpZ2dlci5jb250ZXh0ID0gd2luZG93XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRyaWdnZXIuY29udGV4dCA9IGNvbnRleHRcbiAgfVxuXG4gIHJldHVybiB0cmlnZ2VyXG59XG5cbi8qKlxuICogRW5jb2RlIHN0cmluZyB0byBVUkwsIHdpdGggc3BhY2VzIHRoYXQgYXJlIHJlcHJlc2VudGVkIGFzIGArYFxuICogU2VlOiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9lbmNvZGVVUklDb21wb25lbnRcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm5zIHtTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGZpeGVkRW5jb2RlVVJJQ29tcG9uZW50IChpbnB1dCkge1xuICByZXR1cm4gZW5jb2RlVVJJQ29tcG9uZW50KGlucHV0KS5yZXBsYWNlKC9bIScoKSpdL2csIGZ1bmN0aW9uKGMpIHtcbiAgICByZXR1cm4gJyUnICsgYy5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDE2KTtcbiAgfSlcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRhcmdldCBvYmplY3QgYnkgYSBzdHJpbmcgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBnZXRUYXJnZXRCeVNlbGVjdG9yICh0YXJnZXQsIGNvbnRleHQpIHtcbiAgLy8gRGVmYXVsdCB0byBkb2N1bWVudFxuICBpZiAoIXRhcmdldCkge1xuICAgIHRhcmdldCA9IGRvY3VtZW50XG4gIH1cblxuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAvLyBTcGVjaWFsIHN0cmluZyB2YWx1ZXMgdG8gZ2V0IHRoZSBhY3R1YWwgb2JqZWN0XG4gICAgc3dpdGNoICh0YXJnZXQpIHtcbiAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnRcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAnd2luZG93JzpcbiAgICAgICAgdGFyZ2V0ID0gd2luZG93XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ3NlbGYnOlxuICAgICAgICB0YXJnZXQgPSBjb250ZXh0XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG4vKipcbiAqIEdldCB0aGUgdGFyZ2V0IG9iamVjdCdzIHN0cmluZyBzZWxlY3RvclxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJuIHt1bmRlZmluZWR8U3RyaW5nfVxuICovXG5mdW5jdGlvbiBnZXRUYXJnZXRTZWxlY3RvciAodGFyZ2V0LCBjb250ZXh0KSB7XG4gIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiB0YXJnZXRcbiAgfVxuXG4gIC8vIFdpbmRvd1xuICBpZiAoJC5pc1dpbmRvdyh0YXJnZXQpKSB7XG4gICAgcmV0dXJuICd3aW5kb3cnXG5cbiAgICAvLyBEb2N1bWVudFxuICB9IGVsc2UgaWYgKHRhcmdldCA9PT0gZG9jdW1lbnQpIHtcbiAgICByZXR1cm4gJ2RvY3VtZW50J1xuXG4gICAgLy8gU2VsZlxuICB9IGVsc2UgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eSgndXVpZCcpKSB7XG4gICAgcmV0dXJuIGBbZGF0YS1jb21wb25lbnQtaWQ9XCIke3RhcmdldC51dWlkfVwiXWBcblxuICAgIC8vIEhUTUwgRWxlbVxuICB9IGVsc2UgaWYgKCQodGFyZ2V0KS5sZW5ndGgpIHtcbiAgICBpZiAoJCh0YXJnZXQpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWlkJykpIHtcbiAgICAgIHJldHVybiBgW2RhdGEtY29tcG9uZW50LWlkPVwiJHskKHRhcmdldCkuYXR0cignZGF0YS1jb21wb25lbnQtaWQnKX1cIl1gXG4gICAgfSBlbHNlIGlmICgkKHRhcmdldCkuYXR0cignaWQnKSkge1xuICAgICAgcmV0dXJuIGAjJHskKHRhcmdldCkuYXR0cignaWQnKX1gXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBgJHt0YXJnZXQudGFnTmFtZS50b0xvd2VyQ2FzZSgpfWBcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogUGFyc2UgdGhlIHRhcmdldCBldmVudCBuYW1lc1xuICpcbiAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBldmVudE5hbWVzIGUuZy4gYENvbXBvbmVudDpjdXN0b21FdmVudCBkb206bW91c2VvdmVyYFxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVzcGFjZSBPcHRpb25hbCBuYW1lc3BhY2UgdG8gYXNzaWduIGVhY2ggZXh0cmFjdGVkIGN1c3RvbSAobm9uLURPTSkgZXZlbnQgbmFtZVxuICogQHJldHVybnMge0FycmF5fVxuICovXG5mdW5jdGlvbiBleHRyYWN0VGFyZ2V0RXZlbnROYW1lcyAoaW5wdXRFdmVudE5hbWVzLCBuYW1lc3BhY2UpIHtcbiAgbGV0IHRhcmdldEV2ZW50TmFtZXMgPSBbXVxuICBsZXQgZXZlbnROYW1lcyA9IGlucHV0RXZlbnROYW1lc1xuXG4gIGlmICh0eXBlb2YgaW5wdXRFdmVudE5hbWVzID09PSAnc3RyaW5nJykge1xuICAgIC8vIFNwbGl0IGV2ZW50TmFtZXMgYnkgc3BhY2VzXG4gICAgaWYgKC9cXHMvLnRlc3QoaW5wdXRFdmVudE5hbWVzKSkge1xuICAgICAgZXZlbnROYW1lcyA9IGlucHV0RXZlbnROYW1lcy5zcGxpdCgvXFxzKy8pXG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50TmFtZXMgPSBbIGlucHV0RXZlbnROYW1lcyBdXG4gICAgfVxuICB9XG5cbiAgaWYgKGV2ZW50TmFtZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIC8vIFByb2Nlc3MgZWFjaCBldmVudCBuYW1lXG4gICAgZXZlbnROYW1lcy5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAvLyBEZWZhdWx0IHRvIG5hbWVzcGFjZWQgZXZlbnQgbmFtZVxuICAgICAgbGV0IHRhcmdldEV2ZW50TmFtZSA9ICh0eXBlb2YgbmFtZXNwYWNlID09PSAnc3RyaW5nJyAmJiBuYW1lc3BhY2UgIT09ICcnID8gYCR7bmFtZXNwYWNlfToke2V2ZW50TmFtZX1gIDogZXZlbnROYW1lKVxuXG4gICAgICAvLyBSZW1vdmUgYW55IHJlZmVyZW5jZSB0byB0aGUgbmF0aXZlIERPTSBldmVudCBuYW1lc3BhY2VcbiAgICAgIGlmICgvXmRvbTovaS50ZXN0KGV2ZW50TmFtZSkpIHtcbiAgICAgICAgdGFyZ2V0RXZlbnROYW1lID0gZXZlbnROYW1lLnJlcGxhY2UoL15kb21cXDovZ2ksICcnLCBldmVudE5hbWUpXG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB0byB0aGUgbGlzdFxuICAgICAgdGFyZ2V0RXZlbnROYW1lcy5wdXNoKHRhcmdldEV2ZW50TmFtZSlcbiAgICB9KVxuXG4gICAgcmV0dXJuIHRhcmdldEV2ZW50TmFtZXNcbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5jb25zdCBwYXJzZSA9IHtcbiAgY29lcmNlVG9QcmltaXRpdmVUeXBlLFxuICBjb252ZXJ0VG9Cb29sZWFuLFxuICBjb252ZXJ0U3RyaW5nVG9Kc29uLFxuICBjb252ZXJ0U3RyaW5nVG9GbG9hdCxcbiAgZXh0cmFjdENsYXNzRGV0YWlscyxcbiAgZXh0cmFjdFRyaWdnZXJEZXRhaWxzLFxuICBmaXhlZEVuY29kZVVSSUNvbXBvbmVudCxcbiAgZ2V0VGFyZ2V0QnlTZWxlY3RvcixcbiAgZ2V0VGFyZ2V0U2VsZWN0b3IsXG4gIGV4dHJhY3RUYXJnZXRFdmVudE5hbWVzXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcGFyc2VcbiIsIi8qKlxuICogTFZMOTlcbiAqL1xuXG5jb25zdCBsdmw5OSA9IHJlcXVpcmUoJy4vZXM2JylcblxubW9kdWxlLmV4cG9ydHMgPSBsdmw5OVxuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBmbGFncyBmcm9tIHRoZWlyIGNvZXJjZWQgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUZsYWdzID0gL1xcdyokLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBzdXBwb3J0ZWQgYnkgYF8uY2xvbmVgLiAqL1xudmFyIGNsb25lYWJsZVRhZ3MgPSB7fTtcbmNsb25lYWJsZVRhZ3NbYXJnc1RhZ10gPSBjbG9uZWFibGVUYWdzW2FycmF5VGFnXSA9XG5jbG9uZWFibGVUYWdzW2FycmF5QnVmZmVyVGFnXSA9IGNsb25lYWJsZVRhZ3NbZGF0YVZpZXdUYWddID1cbmNsb25lYWJsZVRhZ3NbYm9vbFRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGVUYWddID1cbmNsb25lYWJsZVRhZ3NbZmxvYXQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW2Zsb2F0NjRUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW2ludDE2VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDMyVGFnXSA9IGNsb25lYWJsZVRhZ3NbbWFwVGFnXSA9XG5jbG9uZWFibGVUYWdzW251bWJlclRhZ10gPSBjbG9uZWFibGVUYWdzW29iamVjdFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tyZWdleHBUYWddID0gY2xvbmVhYmxlVGFnc1tzZXRUYWddID1cbmNsb25lYWJsZVRhZ3Nbc3RyaW5nVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc3ltYm9sVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQxNlRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xuY2xvbmVhYmxlVGFnc1tlcnJvclRhZ10gPSBjbG9uZWFibGVUYWdzW2Z1bmNUYWddID1cbmNsb25lYWJsZVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQWRkcyB0aGUga2V5LXZhbHVlIGBwYWlyYCB0byBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXIgVGhlIGtleS12YWx1ZSBwYWlyIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG1hcGAuXG4gKi9cbmZ1bmN0aW9uIGFkZE1hcEVudHJ5KG1hcCwgcGFpcikge1xuICAvLyBEb24ndCByZXR1cm4gYG1hcC5zZXRgIGJlY2F1c2UgaXQncyBub3QgY2hhaW5hYmxlIGluIElFIDExLlxuICBtYXAuc2V0KHBhaXJbMF0sIHBhaXJbMV0pO1xuICByZXR1cm4gbWFwO1xufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYHNldGAuXG4gKi9cbmZ1bmN0aW9uIGFkZFNldEVudHJ5KHNldCwgdmFsdWUpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBzZXQuYWRkYCBiZWNhdXNlIGl0J3Mgbm90IGNoYWluYWJsZSBpbiBJRSAxMS5cbiAgc2V0LmFkZCh2YWx1ZSk7XG4gIHJldHVybiBzZXQ7XG59XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheSxcbiAgICBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KSxcbiAgICBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgICBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KSxcbiAgICBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpLFxuICAgIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX19bJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgY2FjaGUgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoY2FjaGUgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBjYWNoZS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2FjaGUgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBjYWNoZS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh0eXBlb2Yga2V5ID09ICdudW1iZXInICYmIHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlc1xuICogb3IgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBjb3B5T2JqZWN0KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNsb25lYCBhbmQgYF8uY2xvbmVEZWVwYCB3aGljaCB0cmFja3NcbiAqIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0Z1bGxdIFNwZWNpZnkgYSBjbG9uZSBpbmNsdWRpbmcgc3ltYm9scy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleV0gVGhlIGtleSBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBwYXJlbnQgb2JqZWN0IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIG9iamVjdHMgYW5kIHRoZWlyIGNsb25lIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDbG9uZSh2YWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgb2JqZWN0LCBzdGFjaykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoY3VzdG9taXplcikge1xuICAgIHJlc3VsdCA9IG9iamVjdCA/IGN1c3RvbWl6ZXIodmFsdWUsIGtleSwgb2JqZWN0LCBzdGFjaykgOiBjdXN0b21pemVyKHZhbHVlKTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBjb3B5QXJyYXkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgICBpc0Z1bmMgPSB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNsb25lQnVmZmVyKHZhbHVlLCBpc0RlZXApO1xuICAgIH1cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICBpZiAoaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZU9iamVjdChpc0Z1bmMgPyB7fSA6IHZhbHVlKTtcbiAgICAgIGlmICghaXNEZWVwKSB7XG4gICAgICAgIHJldHVybiBjb3B5U3ltYm9scyh2YWx1ZSwgYmFzZUFzc2lnbihyZXN1bHQsIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2xvbmVhYmxlVGFnc1t0YWddKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lQnlUYWcodmFsdWUsIHRhZywgYmFzZUNsb25lLCBpc0RlZXApO1xuICAgIH1cbiAgfVxuICAvLyBDaGVjayBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcyBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIGNsb25lLlxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldCh2YWx1ZSk7XG4gIGlmIChzdGFja2VkKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQ7XG4gIH1cbiAgc3RhY2suc2V0KHZhbHVlLCByZXN1bHQpO1xuXG4gIGlmICghaXNBcnIpIHtcbiAgICB2YXIgcHJvcHMgPSBpc0Z1bGwgPyBnZXRBbGxLZXlzKHZhbHVlKSA6IGtleXModmFsdWUpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCB2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3ViVmFsdWU7XG4gICAgICBzdWJWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IHBvcHVsYXRlIGNsb25lIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgYXNzaWduVmFsdWUocmVzdWx0LCBrZXksIGJhc2VDbG9uZShzdWJWYWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNyZWF0ZShwcm90bykge1xuICByZXR1cm4gaXNPYmplY3QocHJvdG8pID8gb2JqZWN0Q3JlYXRlKHByb3RvKSA6IHt9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXNJbihvYmplY3QpO1xuICB9XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKG9iamVjdCA9PT0gc291cmNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSkpIHtcbiAgICB2YXIgcHJvcHMgPSBiYXNlS2V5c0luKHNvdXJjZSk7XG4gIH1cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3JjVmFsdWU7XG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFjaykge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV0sXG4gICAgICBzdGFja2VkID0gc3RhY2suZ2V0KHNyY1ZhbHVlKTtcblxuICBpZiAoc3RhY2tlZCkge1xuICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHN0YWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHZhciBpc0NvbW1vbiA9IG5ld1ZhbHVlID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IChzcmNJbmRleCAmJiBpc0Z1bmN0aW9uKG9ialZhbHVlKSkpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBiYXNlQ2xvbmUoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgc3RhY2suc2V0KHNyY1ZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgbWVyZ2VGdW5jKG5ld1ZhbHVlLCBzcmNWYWx1ZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICB9XG4gIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IG5ldyBidWZmZXIuY29uc3RydWN0b3IoYnVmZmVyLmxlbmd0aCk7XG4gIGJ1ZmZlci5jb3B5KHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGRhdGFWaWV3YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFWaWV3IFRoZSBkYXRhIHZpZXcgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIGRhdGEgdmlldy5cbiAqL1xuZnVuY3Rpb24gY2xvbmVEYXRhVmlldyhkYXRhVmlldywgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKGRhdGFWaWV3LmJ1ZmZlcikgOiBkYXRhVmlldy5idWZmZXI7XG4gIHJldHVybiBuZXcgZGF0YVZpZXcuY29uc3RydWN0b3IoYnVmZmVyLCBkYXRhVmlldy5ieXRlT2Zmc2V0LCBkYXRhVmlldy5ieXRlTGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBtYXAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lTWFwKG1hcCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKG1hcFRvQXJyYXkobWFwKSwgdHJ1ZSkgOiBtYXBUb0FycmF5KG1hcCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkTWFwRW50cnksIG5ldyBtYXAuY29uc3RydWN0b3IpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgcmVnZXhwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHJlZ2V4cCBUaGUgcmVnZXhwIHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHJlZ2V4cC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVSZWdFeHAocmVnZXhwKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgcmVnZXhwLmNvbnN0cnVjdG9yKHJlZ2V4cC5zb3VyY2UsIHJlRmxhZ3MuZXhlYyhyZWdleHApKTtcbiAgcmVzdWx0Lmxhc3RJbmRleCA9IHJlZ2V4cC5sYXN0SW5kZXg7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBzZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc2V0LlxuICovXG5mdW5jdGlvbiBjbG9uZVNldChzZXQsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhzZXRUb0FycmF5KHNldCksIHRydWUpIDogc2V0VG9BcnJheShzZXQpO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZFNldEVudHJ5LCBuZXcgc2V0LmNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIGBzeW1ib2xgIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHN5bWJvbCBUaGUgc3ltYm9sIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzeW1ib2wgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjbG9uZVN5bWJvbChzeW1ib2wpIHtcbiAgcmV0dXJuIHN5bWJvbFZhbHVlT2YgPyBPYmplY3Qoc3ltYm9sVmFsdWVPZi5jYWxsKHN5bWJvbCkpIDoge307XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGB0eXBlZEFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVkQXJyYXkgVGhlIHR5cGVkIGFycmF5IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB0eXBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHR5cGVkQXJyYXksIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcih0eXBlZEFycmF5LmJ1ZmZlcikgOiB0eXBlZEFycmF5LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyB0eXBlZEFycmF5LmNvbnN0cnVjdG9yKGJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5Lmxlbmd0aCk7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVtrZXldIDogbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ29waWVzIG93biBzeW1ib2wgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weVN5bWJvbHMoc291cmNlLCBvYmplY3QpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3Qoc291cmNlLCBnZXRTeW1ib2xzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5cywgZ2V0U3ltYm9scyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2wgcHJvcGVydGllcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9IG5hdGl2ZUdldFN5bWJvbHMgPyBvdmVyQXJnKG5hdGl2ZUdldFN5bWJvbHMsIE9iamVjdCkgOiBzdHViQXJyYXk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSxcbi8vIGZvciBkYXRhIHZpZXdzIGluIEVkZ2UgPCAxNCwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBhcnJheSBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQXJyYXkoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFycmF5LmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgLy8gQWRkIHByb3BlcnRpZXMgYXNzaWduZWQgYnkgYFJlZ0V4cCNleGVjYC5cbiAgaWYgKGxlbmd0aCAmJiB0eXBlb2YgYXJyYXlbMF0gPT0gJ3N0cmluZycgJiYgaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgJ2luZGV4JykpIHtcbiAgICByZXN1bHQuaW5kZXggPSBhcnJheS5pbmRleDtcbiAgICByZXN1bHQuaW5wdXQgPSBhcnJheS5pbnB1dDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lIGJhc2VkIG9uIGl0cyBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY2xvbmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUJ5VGFnKG9iamVjdCwgdGFnLCBjbG9uZUZ1bmMsIGlzRGVlcCkge1xuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lQXJyYXlCdWZmZXIob2JqZWN0KTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3IoK29iamVjdCk7XG5cbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgcmV0dXJuIGNsb25lRGF0YVZpZXcob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBmbG9hdDMyVGFnOiBjYXNlIGZsb2F0NjRUYWc6XG4gICAgY2FzZSBpbnQ4VGFnOiBjYXNlIGludDE2VGFnOiBjYXNlIGludDMyVGFnOlxuICAgIGNhc2UgdWludDhUYWc6IGNhc2UgdWludDhDbGFtcGVkVGFnOiBjYXNlIHVpbnQxNlRhZzogY2FzZSB1aW50MzJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVUeXBlZEFycmF5KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lTWFwKG9iamVjdCwgaXNEZWVwLCBjbG9uZUZ1bmMpO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3Iob2JqZWN0KTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lUmVnRXhwKG9iamVjdCk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVNldChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgcmV0dXJuIGNsb25lU3ltYm9sKG9iamVjdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8XG4gICAgICBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbmAgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgbWVyZ2VzIG93biBhbmRcbiAqIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIGludG8gdGhlXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuIFNvdXJjZSBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBhcmVcbiAqIHNraXBwZWQgaWYgYSBkZXN0aW5hdGlvbiB2YWx1ZSBleGlzdHMuIEFycmF5IGFuZCBwbGFpbiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1lcmdlZCByZWN1cnNpdmVseS4gT3RoZXIgb2JqZWN0cyBhbmQgdmFsdWUgdHlwZXMgYXJlIG92ZXJyaWRkZW4gYnlcbiAqIGFzc2lnbm1lbnQuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC4gU3Vic2VxdWVudFxuICogc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdhJzogW3sgJ2InOiAyIH0sIHsgJ2QnOiA0IH1dXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2EnOiBbeyAnYyc6IDMgfSwgeyAnZSc6IDUgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHsgJ2EnOiBbeyAnYic6IDIsICdjJzogMyB9LCB7ICdkJzogNCwgJ2UnOiA1IH1dIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpO1xufSk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcbiIsIihmdW5jdGlvbiAocm9vdCwgZmFjdG9yeSl7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvKmlzdGFuYnVsIGlnbm9yZSBuZXh0OmNhbnQgdGVzdCovXG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlLmV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgLy8gQU1ELiBSZWdpc3RlciBhcyBhbiBhbm9ueW1vdXMgbW9kdWxlLlxuICAgIGRlZmluZShbXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzXG4gICAgcm9vdC5vYmplY3RQYXRoID0gZmFjdG9yeSgpO1xuICB9XG59KSh0aGlzLCBmdW5jdGlvbigpe1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyIHRvU3RyID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB7XG4gICAgaWYob2JqID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICAvL3RvIGhhbmRsZSBvYmplY3RzIHdpdGggbnVsbCBwcm90b3R5cGVzICh0b28gZWRnZSBjYXNlPylcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcClcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzRW1wdHkodmFsdWUpe1xuICAgIGlmICghdmFsdWUpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAoaXNBcnJheSh2YWx1ZSkgJiYgdmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlICE9PSAnc3RyaW5nJykge1xuICAgICAgICBmb3IgKHZhciBpIGluIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duUHJvcGVydHkodmFsdWUsIGkpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiB0b1N0cmluZyh0eXBlKXtcbiAgICByZXR1cm4gdG9TdHIuY2FsbCh0eXBlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzT2JqZWN0KG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHRvU3RyaW5nKG9iaikgPT09IFwiW29iamVjdCBPYmplY3RdXCI7XG4gIH1cblxuICB2YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24ob2JqKXtcbiAgICAvKmlzdGFuYnVsIGlnbm9yZSBuZXh0OmNhbnQgdGVzdCovXG4gICAgcmV0dXJuIHRvU3RyLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzQm9vbGVhbihvYmope1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdG9TdHJpbmcob2JqKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0S2V5KGtleSl7XG4gICAgdmFyIGludEtleSA9IHBhcnNlSW50KGtleSk7XG4gICAgaWYgKGludEtleS50b1N0cmluZygpID09PSBrZXkpIHtcbiAgICAgIHJldHVybiBpbnRLZXk7XG4gICAgfVxuICAgIHJldHVybiBrZXk7XG4gIH1cblxuICBmdW5jdGlvbiBmYWN0b3J5KG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gICAgdmFyIG9iamVjdFBhdGggPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhvYmplY3RQYXRoKS5yZWR1Y2UoZnVuY3Rpb24ocHJveHksIHByb3ApIHtcbiAgICAgICAgaWYocHJvcCA9PT0gJ2NyZWF0ZScpIHtcbiAgICAgICAgICByZXR1cm4gcHJveHk7XG4gICAgICAgIH1cblxuICAgICAgICAvKmlzdGFuYnVsIGlnbm9yZSBlbHNlKi9cbiAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RQYXRoW3Byb3BdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcHJveHlbcHJvcF0gPSBvYmplY3RQYXRoW3Byb3BdLmJpbmQob2JqZWN0UGF0aCwgb2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgIH0sIHt9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaGFzU2hhbGxvd1Byb3BlcnR5KG9iaiwgcHJvcCkge1xuICAgICAgcmV0dXJuIChvcHRpb25zLmluY2x1ZGVJbmhlcml0ZWRQcm9wcyB8fCAodHlwZW9mIHByb3AgPT09ICdudW1iZXInICYmIEFycmF5LmlzQXJyYXkob2JqKSkgfHwgaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTaGFsbG93UHJvcGVydHkob2JqLCBwcm9wKSB7XG4gICAgICBpZiAoaGFzU2hhbGxvd1Byb3BlcnR5KG9iaiwgcHJvcCkpIHtcbiAgICAgICAgcmV0dXJuIG9ialtwcm9wXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXQob2JqLCBwYXRoLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKXtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH1cbiAgICAgIGlmICghcGF0aCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gc2V0KG9iaiwgcGF0aC5zcGxpdCgnLicpLm1hcChnZXRLZXkpLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKTtcbiAgICAgIH1cbiAgICAgIHZhciBjdXJyZW50UGF0aCA9IHBhdGhbMF07XG4gICAgICB2YXIgY3VycmVudFZhbHVlID0gZ2V0U2hhbGxvd1Byb3BlcnR5KG9iaiwgY3VycmVudFBhdGgpO1xuICAgICAgaWYgKHBhdGgubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09IHZvaWQgMCB8fCAhZG9Ob3RSZXBsYWNlKSB7XG4gICAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJyZW50VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChjdXJyZW50VmFsdWUgPT09IHZvaWQgMCkge1xuICAgICAgICAvL2NoZWNrIGlmIHdlIGFzc3VtZSBhbiBhcnJheVxuICAgICAgICBpZih0eXBlb2YgcGF0aFsxXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBvYmpbY3VycmVudFBhdGhdID0gW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb2JqW2N1cnJlbnRQYXRoXSA9IHt9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZXQob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgfVxuXG4gICAgb2JqZWN0UGF0aC5oYXMgPSBmdW5jdGlvbiAob2JqLCBwYXRoKSB7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICBwYXRoID0gcGF0aC5zcGxpdCgnLicpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXBhdGggfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICEhb2JqO1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGogPSBnZXRLZXkocGF0aFtpXSk7XG5cbiAgICAgICAgaWYoKHR5cGVvZiBqID09PSAnbnVtYmVyJyAmJiBpc0FycmF5KG9iaikgJiYgaiA8IG9iai5sZW5ndGgpIHx8XG4gICAgICAgICAgKG9wdGlvbnMuaW5jbHVkZUluaGVyaXRlZFByb3BzID8gKGogaW4gT2JqZWN0KG9iaikpIDogaGFzT3duUHJvcGVydHkob2JqLCBqKSkpIHtcbiAgICAgICAgICBvYmogPSBvYmpbal07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmVuc3VyZUV4aXN0cyA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIHZhbHVlKXtcbiAgICAgIHJldHVybiBzZXQob2JqLCBwYXRoLCB2YWx1ZSwgdHJ1ZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguc2V0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSl7XG4gICAgICByZXR1cm4gc2V0KG9iaiwgcGF0aCwgdmFsdWUsIGRvTm90UmVwbGFjZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguaW5zZXJ0ID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUsIGF0KXtcbiAgICAgIHZhciBhcnIgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGgpO1xuICAgICAgYXQgPSB+fmF0O1xuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgICAgYXJyID0gW107XG4gICAgICAgIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgYXJyKTtcbiAgICAgIH1cbiAgICAgIGFyci5zcGxpY2UoYXQsIDAsIHZhbHVlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5lbXB0eSA9IGZ1bmN0aW9uKG9iaiwgcGF0aCkge1xuICAgICAgaWYgKGlzRW1wdHkocGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICB2YXIgdmFsdWUsIGk7XG4gICAgICBpZiAoISh2YWx1ZSA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCkpKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsICcnKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNCb29sZWFuKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgMCk7XG4gICAgICB9IGVsc2UgaWYgKGlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHZhbHVlLmxlbmd0aCA9IDA7XG4gICAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBmb3IgKGkgaW4gdmFsdWUpIHtcbiAgICAgICAgICBpZiAoaGFzU2hhbGxvd1Byb3BlcnR5KHZhbHVlLCBpKSkge1xuICAgICAgICAgICAgZGVsZXRlIHZhbHVlW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgbnVsbCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGgucHVzaCA9IGZ1bmN0aW9uIChvYmosIHBhdGggLyosIHZhbHVlcyAqLyl7XG4gICAgICB2YXIgYXJyID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKTtcbiAgICAgIGlmICghaXNBcnJheShhcnIpKSB7XG4gICAgICAgIGFyciA9IFtdO1xuICAgICAgICBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGFycik7XG4gICAgICB9XG5cbiAgICAgIGFyci5wdXNoLmFwcGx5KGFyciwgQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAyKSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguY29hbGVzY2UgPSBmdW5jdGlvbiAob2JqLCBwYXRocywgZGVmYXVsdFZhbHVlKSB7XG4gICAgICB2YXIgdmFsdWU7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBwYXRocy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoKHZhbHVlID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoc1tpXSkpICE9PSB2b2lkIDApIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5nZXQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCBkZWZhdWx0VmFsdWUpe1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfVxuICAgICAgaWYgKCFwYXRoIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG4gICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aC5zcGxpdCgnLicpLCBkZWZhdWx0VmFsdWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudFBhdGggPSBnZXRLZXkocGF0aFswXSk7XG4gICAgICB2YXIgbmV4dE9iaiA9IGdldFNoYWxsb3dQcm9wZXJ0eShvYmosIGN1cnJlbnRQYXRoKVxuICAgICAgaWYgKG5leHRPYmogPT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuXG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIG5leHRPYmo7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmplY3RQYXRoLmdldChvYmpbY3VycmVudFBhdGhdLCBwYXRoLnNsaWNlKDEpLCBkZWZhdWx0VmFsdWUpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmRlbCA9IGZ1bmN0aW9uIGRlbChvYmosIHBhdGgpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG5cbiAgICAgIGlmIChpc0VtcHR5KHBhdGgpKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG4gICAgICBpZih0eXBlb2YgcGF0aCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguZGVsKG9iaiwgcGF0aC5zcGxpdCgnLicpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJlbnRQYXRoID0gZ2V0S2V5KHBhdGhbMF0pO1xuICAgICAgaWYgKCFoYXNTaGFsbG93UHJvcGVydHkob2JqLCBjdXJyZW50UGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cblxuICAgICAgaWYocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgIG9iai5zcGxpY2UoY3VycmVudFBhdGgsIDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBvYmpbY3VycmVudFBhdGhdO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5kZWwob2JqW2N1cnJlbnRQYXRoXSwgcGF0aC5zbGljZSgxKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGg7XG4gIH1cblxuICB2YXIgbW9kID0gZmFjdG9yeSgpO1xuICBtb2QuY3JlYXRlID0gZmFjdG9yeTtcbiAgbW9kLndpdGhJbmhlcml0ZWRQcm9wcyA9IGZhY3Rvcnkoe2luY2x1ZGVJbmhlcml0ZWRQcm9wczogdHJ1ZX0pXG4gIHJldHVybiBtb2Q7XG59KTtcbiIsInZhciB2MSA9IHJlcXVpcmUoJy4vdjEnKTtcbnZhciB2NCA9IHJlcXVpcmUoJy4vdjQnKTtcblxudmFyIHV1aWQgPSB2NDtcbnV1aWQudjEgPSB2MTtcbnV1aWQudjQgPSB2NDtcblxubW9kdWxlLmV4cG9ydHMgPSB1dWlkO1xuIiwiLyoqXG4gKiBDb252ZXJ0IGFycmF5IG9mIDE2IGJ5dGUgdmFsdWVzIHRvIFVVSUQgc3RyaW5nIGZvcm1hdCBvZiB0aGUgZm9ybTpcbiAqIFhYWFhYWFhYLVhYWFgtWFhYWC1YWFhYLVhYWFhYWFhYWFhYWFxuICovXG52YXIgYnl0ZVRvSGV4ID0gW107XG5mb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gIGJ5dGVUb0hleFtpXSA9IChpICsgMHgxMDApLnRvU3RyaW5nKDE2KS5zdWJzdHIoMSk7XG59XG5cbmZ1bmN0aW9uIGJ5dGVzVG9VdWlkKGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gb2Zmc2V0IHx8IDA7XG4gIHZhciBidGggPSBieXRlVG9IZXg7XG4gIHJldHVybiBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnl0ZXNUb1V1aWQ7XG4iLCIvLyBVbmlxdWUgSUQgY3JlYXRpb24gcmVxdWlyZXMgYSBoaWdoIHF1YWxpdHkgcmFuZG9tICMgZ2VuZXJhdG9yLiAgSW4gdGhlXG4vLyBicm93c2VyIHRoaXMgaXMgYSBsaXR0bGUgY29tcGxpY2F0ZWQgZHVlIHRvIHVua25vd24gcXVhbGl0eSBvZiBNYXRoLnJhbmRvbSgpXG4vLyBhbmQgaW5jb25zaXN0ZW50IHN1cHBvcnQgZm9yIHRoZSBgY3J5cHRvYCBBUEkuICBXZSBkbyB0aGUgYmVzdCB3ZSBjYW4gdmlhXG4vLyBmZWF0dXJlLWRldGVjdGlvblxudmFyIHJuZztcblxudmFyIGNyeXB0byA9IGdsb2JhbC5jcnlwdG8gfHwgZ2xvYmFsLm1zQ3J5cHRvOyAvLyBmb3IgSUUgMTFcbmlmIChjcnlwdG8gJiYgY3J5cHRvLmdldFJhbmRvbVZhbHVlcykge1xuICAvLyBXSEFUV0cgY3J5cHRvIFJORyAtIGh0dHA6Ly93aWtpLndoYXR3Zy5vcmcvd2lraS9DcnlwdG9cbiAgdmFyIHJuZHM4ID0gbmV3IFVpbnQ4QXJyYXkoMTYpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmXG4gIHJuZyA9IGZ1bmN0aW9uIHdoYXR3Z1JORygpIHtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHJuZHM4KTtcbiAgICByZXR1cm4gcm5kczg7XG4gIH07XG59XG5cbmlmICghcm5nKSB7XG4gIC8vIE1hdGgucmFuZG9tKCktYmFzZWQgKFJORylcbiAgLy9cbiAgLy8gSWYgYWxsIGVsc2UgZmFpbHMsIHVzZSBNYXRoLnJhbmRvbSgpLiAgSXQncyBmYXN0LCBidXQgaXMgb2YgdW5zcGVjaWZpZWRcbiAgLy8gcXVhbGl0eS5cbiAgdmFyIHJuZHMgPSBuZXcgQXJyYXkoMTYpO1xuICBybmcgPSBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgcjsgaSA8IDE2OyBpKyspIHtcbiAgICAgIGlmICgoaSAmIDB4MDMpID09PSAwKSByID0gTWF0aC5yYW5kb20oKSAqIDB4MTAwMDAwMDAwO1xuICAgICAgcm5kc1tpXSA9IHIgPj4+ICgoaSAmIDB4MDMpIDw8IDMpICYgMHhmZjtcbiAgICB9XG5cbiAgICByZXR1cm4gcm5kcztcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBybmc7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG4vLyAqKmB2MSgpYCAtIEdlbmVyYXRlIHRpbWUtYmFzZWQgVVVJRCoqXG4vL1xuLy8gSW5zcGlyZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL0xpb3NLL1VVSUQuanNcbi8vIGFuZCBodHRwOi8vZG9jcy5weXRob24ub3JnL2xpYnJhcnkvdXVpZC5odG1sXG5cbi8vIHJhbmRvbSAjJ3Mgd2UgbmVlZCB0byBpbml0IG5vZGUgYW5kIGNsb2Nrc2VxXG52YXIgX3NlZWRCeXRlcyA9IHJuZygpO1xuXG4vLyBQZXIgNC41LCBjcmVhdGUgYW5kIDQ4LWJpdCBub2RlIGlkLCAoNDcgcmFuZG9tIGJpdHMgKyBtdWx0aWNhc3QgYml0ID0gMSlcbnZhciBfbm9kZUlkID0gW1xuICBfc2VlZEJ5dGVzWzBdIHwgMHgwMSxcbiAgX3NlZWRCeXRlc1sxXSwgX3NlZWRCeXRlc1syXSwgX3NlZWRCeXRlc1szXSwgX3NlZWRCeXRlc1s0XSwgX3NlZWRCeXRlc1s1XVxuXTtcblxuLy8gUGVyIDQuMi4yLCByYW5kb21pemUgKDE0IGJpdCkgY2xvY2tzZXFcbnZhciBfY2xvY2tzZXEgPSAoX3NlZWRCeXRlc1s2XSA8PCA4IHwgX3NlZWRCeXRlc1s3XSkgJiAweDNmZmY7XG5cbi8vIFByZXZpb3VzIHV1aWQgY3JlYXRpb24gdGltZVxudmFyIF9sYXN0TVNlY3MgPSAwLCBfbGFzdE5TZWNzID0gMDtcblxuLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9icm9vZmEvbm9kZS11dWlkIGZvciBBUEkgZGV0YWlsc1xuZnVuY3Rpb24gdjEob3B0aW9ucywgYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBidWYgJiYgb2Zmc2V0IHx8IDA7XG4gIHZhciBiID0gYnVmIHx8IFtdO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBjbG9ja3NlcSA9IG9wdGlvbnMuY2xvY2tzZXEgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMuY2xvY2tzZXEgOiBfY2xvY2tzZXE7XG5cbiAgLy8gVVVJRCB0aW1lc3RhbXBzIGFyZSAxMDAgbmFuby1zZWNvbmQgdW5pdHMgc2luY2UgdGhlIEdyZWdvcmlhbiBlcG9jaCxcbiAgLy8gKDE1ODItMTAtMTUgMDA6MDApLiAgSlNOdW1iZXJzIGFyZW4ndCBwcmVjaXNlIGVub3VnaCBmb3IgdGhpcywgc29cbiAgLy8gdGltZSBpcyBoYW5kbGVkIGludGVybmFsbHkgYXMgJ21zZWNzJyAoaW50ZWdlciBtaWxsaXNlY29uZHMpIGFuZCAnbnNlY3MnXG4gIC8vICgxMDAtbmFub3NlY29uZHMgb2Zmc2V0IGZyb20gbXNlY3MpIHNpbmNlIHVuaXggZXBvY2gsIDE5NzAtMDEtMDEgMDA6MDAuXG4gIHZhciBtc2VjcyA9IG9wdGlvbnMubXNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubXNlY3MgOiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAvLyBQZXIgNC4yLjEuMiwgdXNlIGNvdW50IG9mIHV1aWQncyBnZW5lcmF0ZWQgZHVyaW5nIHRoZSBjdXJyZW50IGNsb2NrXG4gIC8vIGN5Y2xlIHRvIHNpbXVsYXRlIGhpZ2hlciByZXNvbHV0aW9uIGNsb2NrXG4gIHZhciBuc2VjcyA9IG9wdGlvbnMubnNlY3MgIT09IHVuZGVmaW5lZCA/IG9wdGlvbnMubnNlY3MgOiBfbGFzdE5TZWNzICsgMTtcblxuICAvLyBUaW1lIHNpbmNlIGxhc3QgdXVpZCBjcmVhdGlvbiAoaW4gbXNlY3MpXG4gIHZhciBkdCA9IChtc2VjcyAtIF9sYXN0TVNlY3MpICsgKG5zZWNzIC0gX2xhc3ROU2VjcykvMTAwMDA7XG5cbiAgLy8gUGVyIDQuMi4xLjIsIEJ1bXAgY2xvY2tzZXEgb24gY2xvY2sgcmVncmVzc2lvblxuICBpZiAoZHQgPCAwICYmIG9wdGlvbnMuY2xvY2tzZXEgPT09IHVuZGVmaW5lZCkge1xuICAgIGNsb2Nrc2VxID0gY2xvY2tzZXEgKyAxICYgMHgzZmZmO1xuICB9XG5cbiAgLy8gUmVzZXQgbnNlY3MgaWYgY2xvY2sgcmVncmVzc2VzIChuZXcgY2xvY2tzZXEpIG9yIHdlJ3ZlIG1vdmVkIG9udG8gYSBuZXdcbiAgLy8gdGltZSBpbnRlcnZhbFxuICBpZiAoKGR0IDwgMCB8fCBtc2VjcyA+IF9sYXN0TVNlY3MpICYmIG9wdGlvbnMubnNlY3MgPT09IHVuZGVmaW5lZCkge1xuICAgIG5zZWNzID0gMDtcbiAgfVxuXG4gIC8vIFBlciA0LjIuMS4yIFRocm93IGVycm9yIGlmIHRvbyBtYW55IHV1aWRzIGFyZSByZXF1ZXN0ZWRcbiAgaWYgKG5zZWNzID49IDEwMDAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1dWlkLnYxKCk6IENhblxcJ3QgY3JlYXRlIG1vcmUgdGhhbiAxME0gdXVpZHMvc2VjJyk7XG4gIH1cblxuICBfbGFzdE1TZWNzID0gbXNlY3M7XG4gIF9sYXN0TlNlY3MgPSBuc2VjcztcbiAgX2Nsb2Nrc2VxID0gY2xvY2tzZXE7XG5cbiAgLy8gUGVyIDQuMS40IC0gQ29udmVydCBmcm9tIHVuaXggZXBvY2ggdG8gR3JlZ29yaWFuIGVwb2NoXG4gIG1zZWNzICs9IDEyMjE5MjkyODAwMDAwO1xuXG4gIC8vIGB0aW1lX2xvd2BcbiAgdmFyIHRsID0gKChtc2VjcyAmIDB4ZmZmZmZmZikgKiAxMDAwMCArIG5zZWNzKSAlIDB4MTAwMDAwMDAwO1xuICBiW2krK10gPSB0bCA+Pj4gMjQgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gMTYgJiAweGZmO1xuICBiW2krK10gPSB0bCA+Pj4gOCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsICYgMHhmZjtcblxuICAvLyBgdGltZV9taWRgXG4gIHZhciB0bWggPSAobXNlY3MgLyAweDEwMDAwMDAwMCAqIDEwMDAwKSAmIDB4ZmZmZmZmZjtcbiAgYltpKytdID0gdG1oID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdG1oICYgMHhmZjtcblxuICAvLyBgdGltZV9oaWdoX2FuZF92ZXJzaW9uYFxuICBiW2krK10gPSB0bWggPj4+IDI0ICYgMHhmIHwgMHgxMDsgLy8gaW5jbHVkZSB2ZXJzaW9uXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMTYgJiAweGZmO1xuXG4gIC8vIGBjbG9ja19zZXFfaGlfYW5kX3Jlc2VydmVkYCAoUGVyIDQuMi4yIC0gaW5jbHVkZSB2YXJpYW50KVxuICBiW2krK10gPSBjbG9ja3NlcSA+Pj4gOCB8IDB4ODA7XG5cbiAgLy8gYGNsb2NrX3NlcV9sb3dgXG4gIGJbaSsrXSA9IGNsb2Nrc2VxICYgMHhmZjtcblxuICAvLyBgbm9kZWBcbiAgdmFyIG5vZGUgPSBvcHRpb25zLm5vZGUgfHwgX25vZGVJZDtcbiAgZm9yICh2YXIgbiA9IDA7IG4gPCA2OyArK24pIHtcbiAgICBiW2kgKyBuXSA9IG5vZGVbbl07XG4gIH1cblxuICByZXR1cm4gYnVmID8gYnVmIDogYnl0ZXNUb1V1aWQoYik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjE7XG4iLCJ2YXIgcm5nID0gcmVxdWlyZSgnLi9saWIvcm5nJyk7XG52YXIgYnl0ZXNUb1V1aWQgPSByZXF1aXJlKCcuL2xpYi9ieXRlc1RvVXVpZCcpO1xuXG5mdW5jdGlvbiB2NChvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcblxuICBpZiAodHlwZW9mKG9wdGlvbnMpID09ICdzdHJpbmcnKSB7XG4gICAgYnVmID0gb3B0aW9ucyA9PSAnYmluYXJ5JyA/IG5ldyBBcnJheSgxNikgOiBudWxsO1xuICAgIG9wdGlvbnMgPSBudWxsO1xuICB9XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG4gIHZhciBybmRzID0gb3B0aW9ucy5yYW5kb20gfHwgKG9wdGlvbnMucm5nIHx8IHJuZykoKTtcblxuICAvLyBQZXIgNC40LCBzZXQgYml0cyBmb3IgdmVyc2lvbiBhbmQgYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgXG4gIHJuZHNbNl0gPSAocm5kc1s2XSAmIDB4MGYpIHwgMHg0MDtcbiAgcm5kc1s4XSA9IChybmRzWzhdICYgMHgzZikgfCAweDgwO1xuXG4gIC8vIENvcHkgYnl0ZXMgdG8gYnVmZmVyLCBpZiBwcm92aWRlZFxuICBpZiAoYnVmKSB7XG4gICAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IDE2OyArK2lpKSB7XG4gICAgICBidWZbaSArIGlpXSA9IHJuZHNbaWldO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBidWYgfHwgYnl0ZXNUb1V1aWQocm5kcyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdjQ7XG4iXX0=
