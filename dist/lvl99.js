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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvY29tbW9uLmVzNiIsImVzNi9jb3JlL2FwcC5lczYiLCJlczYvY29yZS9jb21wb25lbnQuZXM2IiwiZXM2L2NvcmUvZW50aXR5LmVzNiIsImVzNi9jb3JlL2luZGV4LmVzNiIsImVzNi9pbmRleC5lczYiLCJlczYvdG9vbHMvYnJlYWtwb2ludHMuZXM2IiwiZXM2L3Rvb2xzL2RlYnVnLmVzNiIsImVzNi90b29scy9pbmRleC5lczYiLCJlczYvdG9vbHMvcXVldWUuZXM2IiwiZXM2L3Rvb2xzL3Ntb290aC1zY3JvbGwuZXM2IiwiZXM2L3Rvb2xzL3RyYWNrZXZlbnQuZXM2IiwiZXM2L3V0aWxzL2luZGV4LmVzNiIsImVzNi91dGlscy9pbmhlcml0YW5jZS5lczYiLCJlczYvdXRpbHMvcGFyc2UuZXM2IiwiaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm1lcmdlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1wYXRoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDUUEsSUFBTSxJQUFLLE9BQU8sTUFBUCxLQUFrQixXQUFsQixHQUFnQyxPQUFPLFFBQVAsQ0FBaEMsR0FBbUQsT0FBTyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDLE9BQU8sUUFBUCxDQUFoQyxHQUFtRCxJQUFqSDs7QUFLQSxJQUFNLE9BQU8sRUFBRSxRQUFGLENBQWI7QUFDQSxJQUFNLE9BQU8sRUFBRSxNQUFGLENBQWI7QUFDQSxJQUFNLFFBQVEsRUFBRSxNQUFGLENBQWQ7QUFDQSxJ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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUMvcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBMVkw5OSBDb21tb25cbiAqXG4gKiBDb21tb24gZGVwZW5kZW5jaWVzIGFuZCBvdGhlciB1c2VmdWwgdGhpbmdzXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2pRdWVyeSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnalF1ZXJ5J10gOiBudWxsKVxuXG4vKipcbiAqIEJhc2ljIHNob3J0aGFuZCBwcm9wcyB0byBjYWNoZS9yZWZlcmVuY2UgY29tbW9uIGpRdWVyeSBvYmplY3RzXG4gKi9cbmNvbnN0ICRkb2MgPSAkKGRvY3VtZW50KVxuY29uc3QgJHdpbiA9ICQod2luZG93KVxuY29uc3QgJGh0bWwgPSAkKCdodG1sJylcbmNvbnN0ICRib2R5ID0gJCgnYm9keScpXG5cbi8qKlxuICogRXZlbnQgbmFtZSBzaG9ydGhhbmRzXG4gKi9cbmNvbnN0IGV2ZW50cyA9IHtcbiAgY2xpY2s6ICdjbGljayB0b3VjaGVuZCcsXG4gIGlucHV0c3RhcnQ6ICdtb3VzZWRvd24gdG91Y2hzdGFydCBrZXlkb3duJyxcbiAgaW5wdXRlbmQ6ICdtb3VzZXVwIHRvdWNoZW5kIGtleXVwJyxcbiAgYW5pbWF0aW9ucnVuOiAnYW5pbWF0aW9ucnVuIHdlYmtpdEFuaW1hdGlvblJ1biB3ZWJraXRhbmltYXRpb25ydW4gbW96QW5pbWF0aW9uUnVuIE1TQW5pbWF0aW9uUnVuIG9BbmltYXRpb25SdW4gb2FuaW1hdGlvbnJ1bicsXG4gIGFuaW1hdGlvbnN0YXJ0OiAnYW5pbWF0aW9uc3RhcnQgd2Via2l0QW5pbWF0aW9uU3RhcnQgd2Via2l0YW5pbWF0aW9uc3RhcnQgbW96QW5pbWF0aW9uU3RhcnQgTVNBbmltYXRpb25TdGFydCBvQW5pbWF0aW9uU3RhcnQgb2FuaW1hdGlvbnN0YXJ0JyxcbiAgYW5pbWF0aW9uZW5kOiAnYW5pbWF0aW9uZW5kIHdlYmtpdEFuaW1hdGlvbkVuZCB3ZWJraXRhbmltYXRpb25lbmQgbW96QW5pbWF0aW9uRW5kIE1TQW5pbWF0aW9uRW5kIG9BbmltYXRpb25FbmQgb2FuaW1hdGlvbmVuZCcsXG4gIHRyYW5zaXRpb25ydW46ICd0cmFuc2l0aW9ucnVuIHdlYmtpdFRyYW5zaXRpb25SdW4gd2Via2l0dHJhbnNpdGlvbnJ1biBtb3pUcmFuc2l0aW9uUnVuIE1TVHJhbnNpdGlvblJ1biBvVHJhbnNpdGlvblJ1biBvdHJhbnNpdGlvbnJ1bicsXG4gIHRyYW5zaXRpb25zdGFydDogJ3RyYW5zaXRpb25zdGFydCB3ZWJraXRUcmFuc2l0aW9uU3RhcnQgd2Via2l0dHJhbnNpdGlvbnN0YXJ0IG1velRyYW5zaXRpb25TdGFydCBNU1RyYW5zaXRpb25TdGFydCBvVHJhbnNpdGlvblN0YXJ0IG90cmFuc2l0aW9uc3RhcnQnLFxuICB0cmFuc2l0aW9uZW5kOiAndHJhbnNpdGlvbmVuZCB3ZWJraXRUcmFuc2l0aW9uRW5kIHdlYmtpdHRyYW5zaXRpb25lbmQgbW96VHJhbnNpdGlvbkVuZCBNU1RyYW5zaXRpb25FbmQgb1RyYW5zaXRpb25FbmQgb3RyYW5zaXRpb25lbmQnXG59XG5cbmNvbnN0IHV0aWxzID0ge1xuICAkLFxuICAkZG9jLFxuICAkd2luLFxuICAkaHRtbCxcbiAgJGJvZHksXG4gIGV2ZW50c1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHV0aWxzXG4iLCIvKipcbiAqIExWTDk5IEFwcFxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuLy8gY29uc3QgUHJvbWlzZSA9IHJlcXVpcmUoJ2JsdWViaXJkJylcbmNvbnN0ICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snalF1ZXJ5J10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydqUXVlcnknXSA6IG51bGwpXG5jb25zdCB1dWlkID0gcmVxdWlyZSgndXVpZCcpXG5jb25zdCBFbnRpdHkgPSByZXF1aXJlKCcuL2VudGl0eScpXG5jb25zdCB7XG4gIGNvbnZlcnRTdHJpbmdUb0pzb24sXG4gIGV4dHJhY3RDbGFzc0RldGFpbHNcbn0gPSByZXF1aXJlKCcuLi91dGlscy9wYXJzZScpXG5cbi8qKlxuICogR2V0IGEgY29tcG9uZW50J3MgbmFtZXNwYWNlXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRcbiAqIEByZXR1cm5zIHt1bmRlZmluZWR8U3RyaW5nfENvbXBvbmVudH1cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50TmFtZXNwYWNlIChjb21wb25lbnQpIHtcbiAgbGV0IGNvbXBvbmVudE5TID0gY29tcG9uZW50XG5cbiAgLy8gRnVuY3Rpb24vY2xhc3MgZ2l2ZW5cbiAgaWYgKHR5cGVvZiBjb21wb25lbnQgPT09ICdmdW5jdGlvbicpIHtcbiAgICBpZiAoY29tcG9uZW50Lk5TKSB7XG4gICAgICBjb21wb25lbnROUyA9IGNvbXBvbmVudC5OU1xuICAgIH0gZWxzZSB7XG4gICAgICBjb21wb25lbnROUyA9IGNvbXBvbmVudC5wcm90b3R5cGUuY29uc3RydWN0b3IubmFtZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjb21wb25lbnROU1xufVxuXG4vKipcbiAqIFRoZSBBcHAncyBiYXNlIHByb3BlcnRpZXNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBBcHBQcm9wZXJ0aWVzID0ge1xuICAvKipcbiAgICogTkFNRVNQQUNFXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgY3VzdG9tIGV2ZW50cyBhbmQgZXJyb3IgcmVwb3J0aW5nXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBfTlM6ICdMVkw5OTpBcHAnLFxuXG4gIC8qKlxuICAgKiBuYW1lc3BhY2VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBDU1MgY2xhc3Nlc1xuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgX25zOiAnbHZsOTktYXBwJyxcblxuICAvKipcbiAgICogVGhlIHByb3BlcnRpZXMgc2hhcmVkIGJldHdlZW4gYWxsIGluc3RhbmNlcyBvZiB0aGlzIEFwcFxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX3Byb3BlcnRpZXM6IHt9LFxuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBhdHRyaWJ1dGVzIHRvIGxvYWQgYSBjcmVhdGVkIEFwcCBpbnN0YW5jZSB3aXRoLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX2F0dHJpYnV0ZXM6IHt9LFxuXG4gIC8qKlxuICAgKiBUaGUgbGlicmFyeSBvZiBjb21wb25lbnRzIHRoYXQgdGhlIGFwcCBoYXMgYWNjZXNzIHRvXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfY29tcG9uZW50czoge30sXG5cbiAgLyoqXG4gICAqIFRoZSBjb2xsZWN0aW9uIG9mIGNvbXBvbmVudHMgd2hpY2ggaGF2ZSBiZWVuIGluc3RhbnRpYXRlZCB3aXRoaW4gdGhlIGFwcFxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX2NvbXBvbmVudEluc3RhbmNlczoge31cbn1cblxuLyoqXG4gKiBBcHBcbiAqXG4gKiBAY2xhc3NcbiAqIEBleHRlbmRzIEVudGl0eVxuICovXG5jbGFzcyBBcHAgZXh0ZW5kcyBFbnRpdHkge1xuICAvKipcbiAgICogQXBwIGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgTFZMOTk6QXBwOmNvbnN0cnVjdG9yYClcblxuICAgIHN1cGVyKGF0dHJpYnV0ZXMpXG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBBcHAgd2l0aCBhbnkgZ2l2ZW4ge09iamVjdH0gYXJndW1lbnRzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAuLi5hcmd1bWVudHNcbiAgICovXG4gIGV4dGVuZCAoKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYExWTDk5OkFwcDpleHRlbmRgLCB7XG4gICAgLy8gICBhcmd1bWVudHNcbiAgICAvLyB9KVxuXG4gICAgLy8gTWVyZ2UgdGhlIHByb3BlcnRpZXMgd2l0aCB0aGUgaW5zdGFudGlhdGVkIGF0dHJpYnV0ZXNcbiAgICBzdXBlci5leHRlbmQoQXBwUHJvcGVydGllcywgLi4uYXJndW1lbnRzKVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyIGEgY29tcG9uZW50IGNsYXNzIGluIHRoZSBhcHAuIFlvdSBjYW4gYWxzbyBzcGVjaWZ5IGEgc2VwYXJhdGUgbmFtZXNwYWNlIHRvIHJlZ2lzdGVyIGl0IHVuZGVyLlxuICAgKlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50Q2xhc3NcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudENsYXNzTmFtZXNwYWNlXG4gICAqL1xuICByZWdpc3RlckNvbXBvbmVudENsYXNzIChjb21wb25lbnRDbGFzcywgY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpIHtcbiAgICBsZXQgY29tcG9uZW50Q2xhc3NOU1xuXG4gICAgLy8gTm8gdmFsaWQgY29tcG9uZW50Q2xhc3MgZ2l2ZW5cbiAgICBpZiAoIWNvbXBvbmVudENsYXNzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbXBvbmVudCBjbGFzcyB3YXMgZ2l2ZW4nKVxuICAgIH1cblxuICAgIC8vIEdldCB0aGUgbmFtZXNwYWNlIGZyb20gdGhlIGNvbXBvbmVudCBjbGFzcyAob3Igb3RoZXJ3aXNlIHNwZWNpZmllZClcbiAgICBjb21wb25lbnRDbGFzc05TID0gZ2V0Q29tcG9uZW50TmFtZXNwYWNlKGNvbXBvbmVudENsYXNzTmFtZXNwYWNlIHx8IGNvbXBvbmVudENsYXNzKVxuXG4gICAgLy8gUmVnaXN0ZXIgdGhlIGNvbXBvbmVudCBjbGFzc1xuICAgIGlmIChjb21wb25lbnRDbGFzc05TKSB7XG4gICAgICB0aGlzLl9jb21wb25lbnRzW2NvbXBvbmVudENsYXNzTlNdID0gY29tcG9uZW50Q2xhc3NcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRGVyZWdpc3RlciBhIGNvbXBvbmVudCBjbGFzcyBieSBuYW1lc3BhY2VcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8Q29tcG9uZW50fSBjb21wb25lbnRDbGFzc05hbWVzcGFjZVxuICAgKi9cbiAgZGVyZWdpc3RlckNvbXBvbmVudENsYXNzIChjb21wb25lbnRDbGFzc05hbWVzcGFjZSkge1xuICAgIGxldCBjb21wb25lbnRDbGFzc05TXG5cbiAgICAvLyBObyB2YWxpZCBjb21wb25lbnRDbGFzcyBnaXZlblxuICAgIGlmICghY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY29tcG9uZW50IGNsYXNzIG5hbWVzcGFjZSB3YXMgZ2l2ZW4nKVxuICAgIH1cblxuICAgIC8vIEdldCB0aGUgbmFtZXNwYWNlXG4gICAgY29tcG9uZW50Q2xhc3NOUyA9IGdldENvbXBvbmVudE5hbWVzcGFjZShjb21wb25lbnRDbGFzc05hbWVzcGFjZSlcblxuICAgIC8vIFJlbW92ZSB0aGUgY29tcG9uZW50IGNsYXNzXG4gICAgaWYgKGNvbXBvbmVudENsYXNzTlMgJiYgdGhpcy5fY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShjb21wb25lbnRDbGFzc05TKSkge1xuICAgICAgdGhpcy5fY29tcG9uZW50c1tjb21wb25lbnRDbGFzc05TXSA9IHVuZGVmaW5lZFxuICAgICAgZGVsZXRlIHRoaXMuX2NvbXBvbmVudHNbY29tcG9uZW50Q2xhc3NOU11cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgY29tcG9uZW50IGNsYXNzIGJ5IG5hbWVzcGFjZVxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50Q2xhc3NOYW1lc3BhY2VcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfENvbXBvbmVudH1cbiAgICovXG4gIGdldENvbXBvbmVudENsYXNzIChjb21wb25lbnRDbGFzc05hbWVzcGFjZSkge1xuICAgIGxldCBjb21wb25lbnRDbGFzc05TID0gY29tcG9uZW50Q2xhc3NOYW1lc3BhY2VcblxuICAgIGlmICghY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY29tcG9uZW50IGNsYXNzIG5hbWVzcGFjZSB3YXMgZ2l2ZW4nKVxuICAgIH1cblxuICAgIC8vIEdldCB0aGUgY29tcG9uZW50IGNsYXNzXG4gICAgaWYgKGNvbXBvbmVudENsYXNzTlMgJiYgdGhpcy5fY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShjb21wb25lbnRDbGFzc05TKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudHNbY29tcG9uZW50Q2xhc3NOU11cbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICAvKipcbiAgICogQWRkIGNvbXBvbmVudCBpbnN0YW5jZSB0byBhcHAgYW5kIGluaXRpYWxpc2UgdGhlIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50SW5zdGFuY2VcbiAgICovXG4gIGFkZENvbXBvbmVudEluc3RhbmNlIChjb21wb25lbnRJbnN0YW5jZSkge1xuICAgIGNvbXBvbmVudEluc3RhbmNlLl9hcHAgPSB0aGlzXG5cbiAgICAvLyBBZGQgY29tcG9uZW50IGluc3RhbmNlIHRvIGNvbGxlY3Rpb25cbiAgICB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbY29tcG9uZW50SW5zdGFuY2UudXVpZF0gPSBjb21wb25lbnRJbnN0YW5jZVxuXG4gICAgLy8gSW5pdGlhbGlzZSB0aGUgY29tcG9uZW50XG4gICAgY29tcG9uZW50SW5zdGFuY2UuaW5pdCgpXG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGNvbXBvbmVudCBpbnN0YW5jZVxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50Q2xhc3NOYW1lc3BhY2VcbiAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcbiAgICogQHJldHVybnMge0NvbXBvbmVudH1cbiAgICovXG4gIGNyZWF0ZUNvbXBvbmVudEluc3RhbmNlIChjb21wb25lbnRDbGFzc05hbWVzcGFjZSwgYXR0cmlidXRlcykge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGAke3RoaXMuTlN9LmNyZWF0ZUNvbXBvbmVudEluc3RhbmNlOiAke2NvbXBvbmVudENsYXNzTmFtZXNwYWNlfWApXG5cbiAgICAvLyBDcmVhdGUgYW5kIGluaXRpYWxpc2UgdGhlIGNvbXBvbmVudFxuICAgIGlmICh0aGlzLl9jb21wb25lbnRzLmhhc093blByb3BlcnR5KGNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSkge1xuICAgICAgbGV0IG5ld0NvbXBvbmVudCA9IG5ldyB0aGlzLl9jb21wb25lbnRzW2NvbXBvbmVudENsYXNzTmFtZXNwYWNlXShhdHRyaWJ1dGVzKVxuXG4gICAgICAvLyBAZGVidWdcbiAgICAgIC8vIGNvbnNvbGUubG9nKGAke3RoaXMuTlN9LmNyZWF0ZUNvbXBvbmVudEluc3RhbmNlYCwge1xuICAgICAgLy8gICBjb21wb25lbnRDbGFzc05hbWVzcGFjZSxcbiAgICAgIC8vICAgbmV3Q29tcG9uZW50LFxuICAgICAgLy8gICBhdHRyaWJ1dGVzXG4gICAgICAvLyB9KVxuXG4gICAgICAvLyBBZGQgaW5zdGFuY2UgdG8gYXBwXG4gICAgICB0aGlzLmFkZENvbXBvbmVudEluc3RhbmNlKG5ld0NvbXBvbmVudClcblxuICAgICAgcmV0dXJuIG5ld0NvbXBvbmVudFxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYSBjb21wb25lbnQgaW5zdGFuY2UgYnkgVVVJRFxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gY29tcG9uZW50VVVJRFxuICAgKiBAcmV0dXJucyB7dW5kZWZpbmVkfENvbXBvbmVudH1cbiAgICovXG4gIGdldENvbXBvbmVudEluc3RhbmNlIChjb21wb25lbnRVVUlEKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5OU30uZ2V0Q29tcG9uZW50SW5zdGFuY2U6ICR7Y29tcG9uZW50VVVJRH1gKVxuXG4gICAgaWYgKHRoaXMuX2NvbXBvbmVudEluc3RhbmNlcy5oYXNPd25Qcm9wZXJ0eShjb21wb25lbnRVVUlEKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tjb21wb25lbnRVVUlEXVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmUgY29tcG9uZW50IGluc3RhbmNlIGJ5IFVVSURcbiAgICpcbiAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudFVVSURcbiAgICovXG4gIHJlbW92ZUNvbXBvbmVudEluc3RhbmNlIChjb21wb25lbnRVVUlEKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5OU30ucmVtb3ZlQ29tcG9uZW50SW5zdGFuY2U6ICR7Y29tcG9uZW50VVVJRH1gKVxuXG4gICAgbGV0IHJlbW92ZUNvbXBvbmVudEluc3RhbmNlID0gdGhpcy5nZXRDb21wb25lbnRJbnN0YW5jZShjb21wb25lbnRVVUlEKVxuICAgIGlmICh0eXBlb2YgcmVtb3ZlQ29tcG9uZW50SW5zdGFuY2UgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAvLyBAZGVidWdcbiAgICAgIC8vIGNvbnNvbGUubG9nKGAke3RoaXMuTlN9LnJlbW92ZUNvbXBvbmVudEluc3RhbmNlOiBmb3VuZCBjb21wb25lbnQgaW5zdGFuY2UgdG8gcmVtb3ZlYCwgcmVtb3ZlQ29tcG9uZW50SW5zdGFuY2UpXG5cbiAgICAgIHJlbW92ZUNvbXBvbmVudEluc3RhbmNlLmRlc3Ryb3koKVxuXG4gICAgICAvLyBAVE9ETyB0aGUgZm9sbG93aW5nIHNob3VsZCBwcm9iYWJseSBvbmx5IGhhcHBlbiBhZnRlciBhIFByb21pc2UgaXMgcmVzb2x2ZWRcbiAgICAgIC8vIFJlbW92ZSBlbnRyeSBpbiB0aGUgY29tcG9uZW50SW5zdGFuY2VzIG9iamVjdFxuICAgICAgdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzW2NvbXBvbmVudFVVSURdID0gdW5kZWZpbmVkXG4gICAgICBkZWxldGUgdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzW2NvbXBvbmVudFVVSURdXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2UgYW55IGNvbXBvbmVudCB3aGljaCBpcyBtYXJrZWQgaW4gdGhlIERPTVxuICAgKi9cbiAgaW5pdGlhbGlzZUNvbXBvbmVudHMgKCkge1xuICAgIC8vIEZpbmQgYW55IGVsZW1lbnQgbWFya2VkIHdpdGggdGhlIGBbZGF0YS1jb21wb25lbnRdYCBhdHRyaWJ1dGVcbiAgICAkKCdbZGF0YS1jb21wb25lbnRdJylcbiAgICAgIC8vIElnbm9yZSBjb21wb25lbnRzIHdoaWNoIGFscmVhZHkgaGF2ZSBhbiBJRCBhc3NpZ25lZFxuICAgICAgLm5vdCgnW2RhdGEtY29tcG9uZW50LWlkXScpXG4gICAgICAvLyBJbml0aWFsaXNlIGVhY2ggY29tcG9uZW50XG4gICAgICAuZWFjaCgoaW5kZXgsIGVsZW0pID0+IHtcbiAgICAgICAgbGV0ICRlbGVtID0gJChlbGVtKVxuICAgICAgICBsZXQgZWxlbUNvbXBvbmVudENsYXNzID0gJGVsZW0uYXR0cignZGF0YS1jb21wb25lbnQnKVxuICAgICAgICBsZXQgZWxlbUNvbXBvbmVudE9wdGlvbnMgPSAkZWxlbS5hdHRyKCdkYXRhLWNvbXBvbmVudC1vcHRpb25zJykgfHwge31cblxuICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgLy8gY29uc29sZS5sb2coYCR7dGhpcy5fTlN9LmluaXRpYWxpc2VDb21wb25lbnRzOiBmb3VuZCBlbGVtZW50IHRvIGluaXRpYWxpc2Ugd2l0aCBjb21wb25lbnRgLCB7XG4gICAgICAgIC8vICAgaW5kZXgsXG4gICAgICAgIC8vICAgZWxlbSxcbiAgICAgICAgLy8gICBlbGVtQ29tcG9uZW50Q2xhc3MsXG4gICAgICAgIC8vICAgZWxlbUNvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgLy8gfSlcblxuICAgICAgICAvLyBFbnN1cmUgY29tcG9uZW50IGNsYXNzIGlzIHJlZ2lzdGVyZWRcbiAgICAgICAgaWYgKCF0aGlzLmdldENvbXBvbmVudENsYXNzKGVsZW1Db21wb25lbnRDbGFzcykpIHtcbiAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGAke3RoaXMuX05TfS5pbml0aWFsaXNlQ29tcG9uZW50czogZWxlbWVudCdzIGNvbXBvbmVudCBjbGFzcyBub3QgcmVnaXN0ZXJlZGAsIHtcbiAgICAgICAgICAvLyAgIGFwcDogdGhpcyxcbiAgICAgICAgICAvLyAgIGluZGV4LFxuICAgICAgICAgIC8vICAgZWxlbSxcbiAgICAgICAgICAvLyAgIGVsZW1Db21wb25lbnRDbGFzcyxcbiAgICAgICAgICAvLyAgIGVsZW1Db21wb25lbnRPcHRpb25zXG4gICAgICAgICAgLy8gfSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEV4dHJhY3QvY29udmVydCB0aGUgb3B0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIGVsZW1Db21wb25lbnRPcHRpb25zID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIC8vIFNldCBhcyBKU09OLCBlLmcuICd7XCJuYW1lXCI6XCJ2YWx1ZVwifWBcbiAgICAgICAgICBpZiAoL15cXHsvLnRlc3QoZWxlbUNvbXBvbmVudE9wdGlvbnMpKSB7XG4gICAgICAgICAgICBlbGVtQ29tcG9uZW50T3B0aW9ucyA9IGNvbnZlcnRTdHJpbmdUb0pzb24oZWxlbUNvbXBvbmVudE9wdGlvbnMpXG5cbiAgICAgICAgICAgIC8vIFNldCBhcyBzdHlsZS1saWtlIGF0dHJpYnV0ZXMsIGUuZy4gYG5hbWU6IHZhbHVlOyBuYW1lOiB2YWx1ZWBcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbUNvbXBvbmVudE9wdGlvbnMgPSBleHRyYWN0Q2xhc3NEZXRhaWxzKGVsZW1Db21wb25lbnRPcHRpb25zKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCB0aGUgJGVsZW0gaWYgaXQgaXMgbm90IGFscmVhZHkgc2V0XG4gICAgICAgIGlmICghZWxlbUNvbXBvbmVudE9wdGlvbnMuaGFzT3duUHJvcGVydHkoJyRlbGVtJykpIHtcbiAgICAgICAgICBlbGVtQ29tcG9uZW50T3B0aW9ucy4kZWxlbSA9ICRlbGVtXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDcmVhdGUgdGhlIGNvbXBvbmVudFxuICAgICAgICBsZXQgZWxlbUNvbXBvbmVudEluc3RhbmNlID0gdGhpcy5jcmVhdGVDb21wb25lbnRJbnN0YW5jZShlbGVtQ29tcG9uZW50Q2xhc3MsIGVsZW1Db21wb25lbnRPcHRpb25zKVxuXG4gICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnSW5pdGlhbGlzZWQgY29tcG9uZW50IGluc3RhbmNlJywge1xuICAgICAgICAvLyAgIGluZGV4LFxuICAgICAgICAvLyAgIGVsZW0sXG4gICAgICAgIC8vICAgZWxlbUNvbXBvbmVudE9wdGlvbnMsXG4gICAgICAgIC8vICAgZWxlbUNvbXBvbmVudEluc3RhbmNlXG4gICAgICAgIC8vIH0pXG4gICAgICB9KVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQXBwXG4iLCIvKipcbiAqIExWTDk5IENvbXBvbmVudFxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3Qgb2JqZWN0UGF0aCA9IHJlcXVpcmUoJ29iamVjdC1wYXRoJylcbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoLm1lcmdlJylcbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJylcbmNvbnN0IEVudGl0eSA9IHJlcXVpcmUoJy4vZW50aXR5JylcbmNvbnN0IHsgJCwgJGRvYyB9ID0gcmVxdWlyZSgnLi4vY29tbW9uJylcbi8vIGNvbnN0IHsgd3JhcCB9ID0gcmVxdWlyZSgnLi4vdXRpbHMvc3VwZXInKVxuY29uc3Qge1xuICBleHRyYWN0VHJpZ2dlckRldGFpbHMsXG4gIGV4dHJhY3RUYXJnZXRFdmVudE5hbWVzLFxuICBnZXRUYXJnZXRCeVNlbGVjdG9yLFxuICBnZXRUYXJnZXRTZWxlY3RvclxufSA9IHJlcXVpcmUoJy4uL3V0aWxzL3BhcnNlJylcblxuLyoqXG4gKiBUaGUgQ29tcG9uZW50J3MgYmFzZSBwcm9wZXJ0aWVzXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgQ29tcG9uZW50UHJvcGVydGllcyA9IHtcbiAgLyoqXG4gICAqIE5BTUVTUEFDRVxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIGN1c3RvbSBldmVudHMgYW5kIGVycm9yIHJlcG9ydGluZ1xuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKiBAZGVmYXVsdCBMVkw5OVxuICAgKi9cbiAgX05TOiAnTFZMOTk6Q29tcG9uZW50JyxcblxuICAvKipcbiAgICogbmFtZXNwYWNlXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgQ1NTIGNsYXNzZXNcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICogQGRlZmF1bHQgbHZsOTlcbiAgICovXG4gIF9uczogJ2x2bDk5LWNvbXBvbmVudCcsXG5cbiAgLyoqXG4gICAqIFRoZSBwcm9wZXJ0aWVzIHNoYXJlZCBiZXR3ZWVuIGFsbCBpbnN0YW5jZXMgb2YgdGhpcyBDb21wb25lbnRcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9wcm9wZXJ0aWVzOiB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWVzIG9mIENvbXBvbmVudCBtZXRob2RzIHRvIHB1YmxpY2x5IGV4cG9zZSBpbiB0aGUgRE9NIHZpYSBjdXN0b20gZXZlbnRzIChhdHRhY2hlZCBkdXJpbmcgYGluaXRgKS5cbiAgICAgKlxuICAgICAqIEVhY2ggZW50cnkgY2FuIGJlIGEgc3RyaW5nICh3aGljaCB3aWxsIHRoZW4gYmUgYSBnbG9iYWwgZXZlbnQ7IGJlIGNhcmVmdWwgd2l0aCBnbG9iYWwgZXZlbnRzIGJlaW5nIGF0dGFjaGVkIHR3aWNlKSxcbiAgICAgKiBvciBjYW4gYmUgYW4gb2JqZWN0IHdoZXJlIHlvdSBzcGVjaWZ5IHRoZSB0YXJnZXQgKG9mdGVuICdzZWxmJykgYW5kIHNldCB3aGF0IG1ldGhvZCB0byBkbyBvbiB3aGF0ZXZlciBldmVudCwgZS5nLjpcbiAgICAgKlxuICAgICAqIGBgYFxuICAgICAqICAgLy8gVGhpcyB3aWxsIHRyaWdnZXIgdGhlIENvbXBvbmVudCdzIGBleGFtcGxlTWV0aG9kYCB3aGVuIHRoZSBDb21wb25lbnQncyAkZWxlbSBpcyB0YXJnZXRlZC90cmlnZ2VyZWRcbiAgICAgKiAgIC8vIHVzaW5nIHRoZSBhdXRvbWF0aWNhbGx5IGdlbmVyYXRlZCBjdXN0b20gZXZlbnQgbmFtZTpcbiAgICAgKiAgIC8vIGAkZWxlbS50cmlnZ2VyKCdDb21wb25lbnQ6ZXhhbXBsZU1ldGhvZCcpYFxuICAgICAqICAge1xuICAgICAqICAgICB0YXJnZXQ6ICdzZWxmJyxcbiAgICAgKiAgICAgZG86ICdleGFtcGxlTWV0aG9kJ1xuICAgICAqICAgfVxuICAgICAqXG4gICAgICogICAvLyBUaGlzIHdpbGwgdHJpZ2dlciB0aGUgQ29tcG9uZW50J3MgYGV4YW1wbGVNZXRob2RgIHdoZW4gdGhlIGRvY3VtZW50IGlzIHRhcmdldGVkL3RyaWdnZXJlZCB1c2luZyBhIGN1c3RvbVxuICAgICAqICAgLy8gZXZlbnQgbmFtZTpcbiAgICAgKiAgIC8vIGAkKGRvY3VtZW50KS50cmlnZ2VyKCdjdXN0b21FdmVudE5hbWUnKWBcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgdGFyZ2V0OiAnZG9jdW1lbnQnLFxuICAgICAqICAgICBkbzogJ2V4YW1wbGVNZXRob2QnLFxuICAgICAqICAgICBvbjogJ2N1c3RvbUV2ZW50TmFtZSdcbiAgICAgKiAgIH1cbiAgICAgKlxuICAgICAqICAgLy8gVGhpcyB3aWxsIHRyaWdnZXIgdGhlIENvbXBvbmVudCdzIGBleGFtcGxlTWV0aG9kYCB3aGVuIHRoZSB3aW5kb3cgaXMgc2Nyb2xsZWQ6XG4gICAgICogICAvLyBgJCh3aW5kb3cpLnNjcm9sbCgpYFxuICAgICAqICAge1xuICAgICAqICAgICB0YXJnZXQ6ICd3aW5kb3cnLFxuICAgICAqICAgICBkbzogJ2V4YW1wbGVNZXRob2QnLFxuICAgICAqICAgICBvbjogJ3Njcm9sbCdcbiAgICAgKiAgIH1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEB0eXBlIHtBcnJheX1cbiAgICAgKi9cbiAgICBwdWJsaWNNZXRob2RzOiBbXSxcblxuICAgIC8qKlxuICAgICAqIFRoZSB0YXJnZXQgdG8gYXBwbHkgYW55IENTUyBjbGFzc2VzIHRvXG4gICAgICpcbiAgICAgKiBAdHlwZSB7alF1ZXJ5T2JqZWN0fVxuICAgICAqL1xuICAgICRjbGFzc1RhcmdldDogdW5kZWZpbmVkXG4gIH0sXG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGF0dHJpYnV0ZXMgdG8gbG9hZCBhIGNyZWF0ZWQgQ29tcG9uZW50IGluc3RhbmNlIHdpdGguXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfYXR0cmlidXRlczoge1xuICAgIC8qKlxuICAgICAqIFRoZSBtYWluIGVsZW1lbnQgdGhhdCByZXByZXNlbnRzIHRoZSBDb21wb25lbnQgaW4gdGhlIERPTS4gQ29tcG9uZW50IGV2ZW50cyB3aWxsIGJlIG1hbmFnZWQgdGhyb3VnaCB0aGlzIGVsZW1lbnQuXG4gICAgICovXG4gICAgJGVsZW06IHVuZGVmaW5lZFxuICB9XG59XG5cbi8qKlxuICogQ29tcG9uZW50XG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBFbnRpdHlcbiAqL1xuY2xhc3MgQ29tcG9uZW50IGV4dGVuZHMgRW50aXR5IHtcbiAgLyoqXG4gICAqIENvbXBvbmVudCBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coJ0xWTDk5OkNvbXBvbmVudDpjb25zdHJ1Y3RvcicsIHtcbiAgICAvLyAgIGFyZ3VtZW50c1xuICAgIC8vIH0pXG5cbiAgICBzdXBlcihhdHRyaWJ1dGVzKVxuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVuZCB0aGUgQ29tcG9uZW50J3MgcHJvcGVydGllc1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gLi4uYXJndW1lbnRzXG4gICAqL1xuICBleHRlbmQgKCkge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKCdMVkw5OTpDb21wb25lbnQ6ZXh0ZW5kJywge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIC8vIENvbmNhdCBhbGwgdGhlIHB1YmxpY01ldGhvZHMgaW50byBvbmUgYXJyYXkgKHNpbmNlIG1lcmdlIGRvZXNuJ3QgZG8gdGhhdCB3aXRoIHBsYWluIGFycmF5cylcbiAgICBsZXQgYXJncyA9IFsuLi5hcmd1bWVudHNdXG4gICAgbGV0IGFsbFB1YmxpY01ldGhvZHMgPSBDb21wb25lbnRQcm9wZXJ0aWVzLl9wcm9wZXJ0aWVzLnB1YmxpY01ldGhvZHMuc2xpY2UoMClcbiAgICBhcmdzLmZvckVhY2goKGFyZykgPT4ge1xuICAgICAgbGV0IGhhc1B1YmxpY01ldGhvZHMgPSBvYmplY3RQYXRoLmdldChhcmcsICdfcHJvcGVydGllcy5wdWJsaWNNZXRob2RzJylcbiAgICAgIGlmIChoYXNQdWJsaWNNZXRob2RzICYmIGhhc1B1YmxpY01ldGhvZHMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBhbGxQdWJsaWNNZXRob2RzID0gYWxsUHVibGljTWV0aG9kcy5jb25jYXQoaGFzUHVibGljTWV0aG9kcylcbiAgICAgIH1cbiAgICB9KVxuICAgIGFsbFB1YmxpY01ldGhvZHMgPSBBcnJheS5mcm9tKG5ldyBTZXQoYWxsUHVibGljTWV0aG9kcykpXG5cbiAgICAvLyBFeHRlbmQgdGhlIGNvbXBvbmVudCdzIHByb3BlcnRpZXMgd2l0aCB0aGUgaW5zdGFudGlhdGVkIGF0dHJpYnV0ZXMgYW5kIGNvbmNhdGVuYXRlZCBwdWJsaWMgbWV0aG9kc1xuICAgIHN1cGVyLmV4dGVuZChDb21wb25lbnRQcm9wZXJ0aWVzLCAuLi5hcmd1bWVudHMsIHtcbiAgICAgIF9wcm9wZXJ0aWVzOiB7XG4gICAgICAgIHB1YmxpY01ldGhvZHM6IGFsbFB1YmxpY01ldGhvZHNcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgY29tcG9uZW50J3MgZWxlbWVudFxuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR8alF1ZXJ5T2JqZWN0fVxuICAgKi9cbiAgZ2V0RWxlbSAoKSB7XG4gICAgLy8gU29mdCByZXR1cm5cbiAgICBpZiAoIXRoaXMuZ2V0QXR0cignZWxlbScpICYmICghdGhpcy5nZXRBdHRyKCckZWxlbScpIHx8ICF0aGlzLmdldEF0dHIoJyRlbGVtJykubGVuZ3RoKSkge1xuICAgICAgY29uc29sZS53YXJuKGAke3RoaXMuTlN9LmdldEVsZW06IG5vIGVsZW0gd2FzIGZvdW5kIGZvciB0aGlzIGNvbXBvbmVudC4gVGhpcyBtYXkgY2F1c2UgcHJvYmxlbXMgd2l0aCBjb21wb25lbnRzIHdoaWNoIHJlbHkgb24gdGhlIGVsZW0gYXR0cmlidXRlLmApXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfVxuXG4gICAgLy8gRWxlbSAob3IgJGVsZW0pIGlzIHNldCB0byBzdHJpbmdcbiAgICBpZiAodHlwZW9mIHRoaXMuZ2V0QXR0cignZWxlbScpID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdGhpcy5nZXRBdHRyKCckZWxlbScpID09PSAnc3RyaW5nJykge1xuICAgICAgbGV0ICRlbGVtID0gJCh0aGlzLmdldEF0dHIoJ2VsZW0nKSlcbiAgICAgIGlmICgkZWxlbS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5zZXRBdHRyKCdlbGVtJywgJGVsZW1bMF0pXG4gICAgICAgIHRoaXMuc2V0QXR0cignJGVsZW0nLCAkZWxlbSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHZXQgJiBzZXQgdGhlIGVsZW1lbnRcbiAgICBpZiAodGhpcy5nZXRBdHRyKCdlbGVtJykgJiYgIXRoaXMuZ2V0QXR0cignJGVsZW0nKSkge1xuICAgICAgdGhpcy5zZXRBdHRyKCQodGhpcy5nZXRBdHRyKCdlbGVtJykpKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmdldEF0dHIoJyRlbGVtJylcbiAgfVxuXG4gIC8qKlxuICAgKiBNYXJrIHRoZSBDb21wb25lbnQncyBlbGVtZW50IHdpdGggbmVjZXNzYXJ5IGF0dHJpYnV0ZXNcbiAgICovXG4gIG1hcmtFbGVtICgpIHtcbiAgICAvLyBNYXJrIHRoZSBlbGVtZW50XG4gICAgaWYgKHRoaXMuZ2V0RWxlbSgpICYmIHRoaXMuZ2V0RWxlbSgpLmxlbmd0aCkge1xuICAgICAgaWYgKCF0aGlzLmdldEVsZW0oKS5hdHRyKCdkYXRhLWNvbXBvbmVudCcpKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbSgpLmF0dHIoJ2RhdGEtY29tcG9uZW50JywgdGhpcy5OUylcbiAgICAgIH1cblxuICAgICAgaWYgKCF0aGlzLmdldEVsZW0oKS5hdHRyKCdkYXRhLWNvbXBvbmVudC1pZCcpKSB7XG4gICAgICAgIHRoaXMuZ2V0RWxlbSgpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWlkJywgdGhpcy51dWlkKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnbWFya0VsZW06ZW5kJylcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB0YXJnZXQgdG8gYXBwbHkgdGhlIENTUyBzdGF0ZSBjbGFzc2VzIHRvXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZHxqUXVlcnlPYmplY3R9XG4gICAqL1xuICBnZXRDbGFzc1RhcmdldCAoKSB7XG4gICAgLy8gUHJpb3JpdGlzZSBhdHRyXG4gICAgbGV0ICRjbGFzc1RhcmdldCA9IHRoaXMuZ2V0QXR0cignJGNsYXNzVGFyZ2V0JylcblxuICAgIC8vIE5vdCBmb3VuZCBpbiBhdHRyPyBVc2UgcHJvcFxuICAgIGlmICghJGNsYXNzVGFyZ2V0IHx8ICEkY2xhc3NUYXJnZXQubGVuZ3RoKSB7XG4gICAgICAkY2xhc3NUYXJnZXQgPSB0aGlzLmdldFByb3AoJyRjbGFzc1RhcmdldCcpXG4gICAgfVxuXG4gICAgLy8gTm90IGZvdW5kIGluIHByb3A/IFVzZSBlbGVtXG4gICAgaWYgKCEkY2xhc3NUYXJnZXQgfHwgISRjbGFzc1RhcmdldC5sZW5ndGgpIHtcbiAgICAgICRjbGFzc1RhcmdldCA9IHRoaXMuZ2V0RWxlbSgpXG5cbiAgICAgIC8vIEVuc3VyZSBzZXQgYXMgYXR0clxuICAgICAgdGhpcy5zZXRBdHRyKCckY2xhc3NUYXJnZXQnLCAkY2xhc3NUYXJnZXQpXG4gICAgfVxuXG4gICAgcmV0dXJuICRjbGFzc1RhcmdldFxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgYXR0cmlidXRlcyBmcm9tIHRoZSBET00gZWxlbWVudCBhbmQgcGxhY2UgaW50byB0aGUgQ29tcG9uZW50IGluc3RhbmNlXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH1cbiAgICovXG4gIGxvYWRBdHRycyAoKSB7XG4gICAgaWYgKHRoaXMuZ2V0RWxlbSgpICYmIHRoaXMuZ2V0RWxlbSgpLmlzKCdbZGF0YS1jb21wb25lbnQtYXR0cmlidXRlc10nKSkge1xuICAgICAgbGV0IGF0dHJzID0ge31cblxuICAgICAgLy8gQXR0ZW1wdCB0byBnZXQgdGhlIGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NIGVsZW1lbnRcbiAgICAgIHRyeSB7XG4gICAgICAgIGF0dHJzID0gSlNPTi5wYXJzZSh0aGlzLmdldEVsZW0oKS5hdHRyKCdkYXRhLWNvbXBvbmVudC1hdHRyaWJ1dGVzJykpXG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoYFske3RoaXMuTlN9XSBsb2FkQXR0cnM6IEVycm9yIGxvYWRpbmcgYXR0cmlidXRlcyBmcm9tIERPTSBlbGVtZW50YClcbiAgICAgIH1cblxuICAgICAgdGhpcy5fYXR0cmlidXRlcyA9IG1lcmdlKHRoaXMuX2F0dHJpYnV0ZXMsIGF0dHJzKVxuXG4gICAgICAvLyBPbmNlIGxvYWRlZCwgcmVtb3ZlIHRoZSBjb21wb25lbnQgYXR0cmlidXRlcyBmcm9tIHRoZSBET01cbiAgICAgIHRoaXMuZ2V0RWxlbSgpLnJlbW92ZUF0dHIoJ2RhdGEtY29tcG9uZW50LWF0dHJpYnV0ZXMnKVxuXG4gICAgICByZXR1cm4gdGhpcy5fYXR0cmlidXRlc1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIENvbXBvbmVudFxuICAgKi9cbiAgaW5pdCAoKSB7XG4gICAgc3VwZXIuaW5pdCguLi5hcmd1bWVudHMpXG5cbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OUzppbml0fV1gKVxuXG4gICAgLy8gTWFyayB0aGUgZWxlbWVudFxuICAgIHRoaXMubWFya0VsZW0oKVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoIENvbXBvbmVudCdzIHB1YmxpYyBtZXRob2RzIHRvIHRhcmdldHNcbiAgICAgKiBQdWJsaWMgbWV0aG9kcyBjYW4gYmUgdHJpZ2dlcmVkIG9uIHRoZSB0YXJnZXRzIHZpYSBgJCh0YXJnZXQpLnRyaWdnZXIoJ05BTUVTUEFDRTpwdWJsaWNNZXRob2ROYW1lJylgXG4gICAgICovXG4gICAgbGV0IHB1YmxpY01ldGhvZHMgPSB0aGlzLmdldFByb3AoJ3B1YmxpY01ldGhvZHMnKVxuICAgIGlmIChwdWJsaWNNZXRob2RzICYmIHB1YmxpY01ldGhvZHMubGVuZ3RoKSB7XG4gICAgICBwdWJsaWNNZXRob2RzLmZvckVhY2goKHRyaWdnZXIpID0+IHtcbiAgICAgICAgbGV0IHRyaWdnZXJEZXRhaWxzID0ge31cblxuICAgICAgICAvLyBBbHJlYWR5IG9iamVjdFxuICAgICAgICBpZiAodHlwZW9mIHRyaWdnZXIgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdHJpZ2dlckRldGFpbHMgPSB0cmlnZ2VyXG5cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdHJpZ2dlciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBpZiAoL157Ly50ZXN0KHRyaWdnZXIpIHx8IC9bOjtdLy50ZXN0KHRyaWdnZXIpKSB7XG4gICAgICAgICAgICB0cmlnZ2VyRGV0YWlscyA9IGV4dHJhY3RUcmlnZ2VyRGV0YWlscyh0cmlnZ2VyKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmlnZ2VyRGV0YWlscy5kbyA9IHRyaWdnZXJcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBlbXB0eSwgc2V0IGBvbmAgdG8gYGRvYCB2YWx1ZSAoY29uc2lkZXIgaXQgYSBjdXN0b20gZXZlbnQgdG8gaW52b2tlLCBlLmcuICdpbml0JyB3b3VsZCBpbnZva2UgJ2luaXQnIG9uIHRoaXMgQ29tcG9uZW50KVxuICAgICAgICBpZiAoIW9iamVjdFBhdGguaGFzKHRyaWdnZXJEZXRhaWxzLCAnb24nKSkge1xuICAgICAgICAgIHRyaWdnZXJEZXRhaWxzLm9uID0gdHJpZ2dlckRldGFpbHMuZG9cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIENvbnRleHQgc2hvdWxkIGFsd2F5cyBiZSB0aGlzIENvbXBvbmVudFxuICAgICAgICB0cmlnZ2VyRGV0YWlscy5jb250ZXh0ID0gdGhpc1xuXG4gICAgICAgIC8vIEdldCB0aGUgQ29tcG9uZW50J3MgbWV0aG9kXG4gICAgICAgIGxldCBtZXRob2QgPSB1bmRlZmluZWRcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBtZXRob2QgPSB0cmlnZ2VyRGV0YWlscy5jb250ZXh0W3RyaWdnZXJEZXRhaWxzLmRvXVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aGlzLk5TfV0gaW5pdDogcHVibGljIG1ldGhvZCAnJHt0cmlnZ2VyRGV0YWlscy5kb30nIHdhcyBub3QgZm91bmQgb24gdGhpcyBjb21wb25lbnRgKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGBbJHt0aGlzLk5TfV0gaW5pdDogYXR0YWNoIHB1YmxpYyBtZXRob2RgLCB7XG4gICAgICAgIC8vICAgdHJpZ2dlckRldGFpbHMsXG4gICAgICAgIC8vICAgbWV0aG9kXG4gICAgICAgIC8vIH0pXG5cbiAgICAgICAgLy8gQXR0YWNoIHRoZSBtZXRob2QgYXMgYSBjdXN0b20gZXZlbnQgdG8gdGhlIHRhcmdldFxuICAgICAgICBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIC8vIFdyYXAgdGhlIG1ldGhvZCBpbnRvIGEgY2xvc3VyZVxuICAgICAgICAgIGxldCBkb0NvbXBvbmVudE1ldGhvZCA9IChqUXVlcnlFdmVudCkgPT4ge1xuICAgICAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhgVHJpZ2dlcmVkICR7dGhpcy5OU306JHt0cmlnZ2VyRGV0YWlscy5kb31gLCB7XG4gICAgICAgICAgICAvLyAgIF9jbGFzczogdGhpcyxcbiAgICAgICAgICAgIC8vICAgX21ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgLy8gICBqUXVlcnlFdmVudCxcbiAgICAgICAgICAgIC8vICAgYXJnczogYXJndW1lbnRzXG4gICAgICAgICAgICAvLyB9KVxuXG4gICAgICAgICAgICBtZXRob2QuY2FsbCh0aGlzLCBqUXVlcnlFdmVudClcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBBdHRhY2ggdG8gdGhlIHRhcmdldCBkb2N1bWVudCB3aXRoIGEgcGFydGljdWxhciBlbGVtZW50IHNlbGVjdG9yXG4gICAgICAgICAgaWYgKHRyaWdnZXJEZXRhaWxzLnNlbGVjdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudFRvVGFyZ2V0U2VsZWN0b3IodHJpZ2dlckRldGFpbHMub24sIHRyaWdnZXJEZXRhaWxzLnNlbGVjdG9yLCBkb0NvbXBvbmVudE1ldGhvZCwgdHJpZ2dlckRldGFpbHMudGFyZ2V0KVxuXG4gICAgICAgICAgICAvLyBBdHRhY2ggdG8gdGhlIHRhcmdldFxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudFRvVGFyZ2V0KHRyaWdnZXJEZXRhaWxzLm9uLCBkb0NvbXBvbmVudE1ldGhvZCwgdHJpZ2dlckRldGFpbHMudGFyZ2V0KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIEVycm9yXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcywgdHJpZ2dlciwgdHJpZ2dlckRldGFpbHMpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aGlzLk5TfV0gaW5pdDogcHVibGljIG1ldGhvZCAnJHt0cmlnZ2VyRGV0YWlscy5kb30nIGlzIG5vdCBhIHZhbGlkIGZ1bmN0aW9uYClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIGFueSBhdHRyaWJ1dGVzIHRoYXQgd2VyZSBhdHRhY2hlZCB0byB0aGUgRE9NIGVsZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmxvYWRBdHRycygpXG5cbiAgICAvKipcbiAgICAgKiBAdHJpZ2dlciBOQU1FU1BBQ0U6aW5pdDplbmRcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRyaWdnZXJFdmVudCgnaW5pdDplbmQnKVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYW5kIHRlYXIgZG93biB0aGUgY29tcG9uZW50XG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICAvLyBAVE9ETyB0ZWFyIGRvd24gdGhlIGhvdXNlIVxuICAgIC8vIEBUT0RPIHJlbW92ZSB0aGUgYm91bmQgcHVibGljIGV2ZW50c1xuICAgIC8vIEBUT0RPIG90aGVyIGdhcmJhZ2UgY29sbGVjdGlvbi9tZW1vcnkgbWFuYWdlbWVudFxuXG4gICAgLyoqXG4gICAgICogQHRyaWdnZXIgTkFNRVNQQUNFOmRlc3Ryb3k6YmVmb3JlZW5kXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2Rlc3Ryb3k6YmVmb3JlZW5kJylcblxuICAgIHN1cGVyLmRlc3Ryb3koLi4uYXJndW1lbnRzKVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgbWV0aG9kIHRvIGN1c3RvbSBldmVudCBvbiB0YXJnZXRcbiAgICogRXZlbnQgbmFtZXMgYXJlIGF1dG9tYXRpY2FsbHkgbmFtZXNwYWNlZCB1c2luZyB0aGUgQ29tcG9uZW50J3MgX05TIHByb3BlcnR5LlxuICAgKiBUbyBub3QgdXNlIG5hbWVzcGFjZWQgZXZlbnRzLCBwcmVmYWNlIHdpdGggYGRvbTpgXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgRGVmYXVsdCBpcyBgZG9jdW1lbnRgLiBUaGlzIGlzIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQgd2hpY2ggdGhlIGN1c3RvbSBldmVudCB3aWxsIGJ1YmJsZSB1cCB0b1xuICAgKi9cbiAgYmluZEV2ZW50VG9UYXJnZXQgKGV2ZW50TmFtZSwgbWV0aG9kLCB0YXJnZXQpIHtcbiAgICAvLyBEZWZhdWx0IHRvIGRvY3VtZW50XG4gICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgIHRhcmdldCA9IGRvY3VtZW50XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNwZWNpYWwgc3RyaW5nIHZhbHVlcyB0byBnZXQgdGhlIGFjdHVhbCBvYmplY3RcbiAgICAgIHN3aXRjaCAodGFyZ2V0KSB7XG4gICAgICAgIGNhc2UgJ2RvY3VtZW50JzpcbiAgICAgICAgICB0YXJnZXQgPSBkb2N1bWVudFxuICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgY2FzZSAnd2luZG93JzpcbiAgICAgICAgICB0YXJnZXQgPSB3aW5kb3dcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJ3NlbGYnOlxuICAgICAgICAgIHRhcmdldCA9IHRoaXMuZ2V0RWxlbSgpWzBdXG4gICAgICAgICAgYnJlYWtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFeHRyYWN0IHRoZSB0YXJnZXQgZXZlbnQgbmFtZXMgZnJvbSB0aGUgaW5wdXQgZ2l2ZW5cbiAgICBsZXQgZXZlbnROYW1lcyA9IGV4dHJhY3RUYXJnZXRFdmVudE5hbWVzKGV2ZW50TmFtZSwgdGhpcy5OUylcblxuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGBbJHt0aGlzLk5TfV0gYmluZEV2ZW50VG9UYXJnZXRgLCB7XG4gICAgLy8gICBldmVudE5hbWUsXG4gICAgLy8gICBtZXRob2QsXG4gICAgLy8gICB0YXJnZXQsXG4gICAgLy8gICB0cmlnZ2VyTmFtZTogdGFyZ2V0RXZlbnROYW1lc1xuICAgIC8vIH0pXG5cbiAgICAvLyBBc3NpZ24gdGhlIHRyaWdnZXJcbiAgICBpZiAoZXZlbnROYW1lcykge1xuICAgICAgJCh0YXJnZXQpLm9uKGV2ZW50TmFtZXMuam9pbignICcpLCBtZXRob2QpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgbWV0aG9kIHRvIGN1c3RvbSBldmVudCBvbiB0YXJnZXQgd2l0aCBhbiBlbGVtZW50IHNlbGVjdG9yLlxuICAgKiBFdmVudCBuYW1lcyBhcmUgYXV0b21hdGljYWxseSBuYW1lc3BhY2VkIHVzaW5nIHRoZSBDb21wb25lbnQncyBfTlMgcHJvcGVydHkuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yIFRhcmdldCBhIHNwZWNpZmljIGVsZW1lbnQgKHZpYSBxdWVyeSBzZWxlY3RvcikgdG8gdHJpZ2dlciB0aGUgZXZlbnRcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbWV0aG9kXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXQgRGVmYXVsdCBpcyBgZG9jdW1lbnRgLiBUaGlzIGlzIHRoZSB0YXJnZXQgRE9NIGVsZW1lbnQgd2hpY2ggdGhlIGN1c3RvbSBldmVudCB3aWxsIGJ1YmJsZSB1cCB0b1xuICAgKi9cbiAgYmluZEV2ZW50VG9UYXJnZXRTZWxlY3RvciAoZXZlbnROYW1lLCBzZWxlY3RvciwgbWV0aG9kLCB0YXJnZXQpIHtcbiAgICB0YXJnZXQgPSBnZXRUYXJnZXRCeVNlbGVjdG9yKHRhcmdldCwgdGhpcylcbiAgICBzZWxlY3RvciA9IGdldFRhcmdldFNlbGVjdG9yKHNlbGVjdG9yLCB0aGlzKVxuICAgIGxldCBldmVudE5hbWVzID0gZXh0cmFjdFRhcmdldEV2ZW50TmFtZXMoZXZlbnROYW1lLCB0aGlzLk5TKVxuXG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlN9XSBiaW5kRXZlbnRUb1RhcmdldFNlbGVjdG9yYCwge1xuICAgIC8vICAgZXZlbnROYW1lLFxuICAgIC8vICAgc2VsZWN0b3IsXG4gICAgLy8gICBtZXRob2QsXG4gICAgLy8gICB0YXJnZXQsXG4gICAgLy8gICB0cmlnZ2VyTmFtZTogYCR7dGhpcy5OU306JHtldmVudE5hbWV9YFxuICAgIC8vIH0pXG5cbiAgICBpZiAoZXZlbnROYW1lcykge1xuICAgICAgJCh0YXJnZXQpLm9uKGV2ZW50TmFtZXMuam9pbignICcpLCBzZWxlY3RvciwgbWV0aG9kKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGEgY3VzdG9tIGRvY3VtZW50IGV2ZW50IG9uIHRoZSBDb21wb25lbnQuXG4gICAqIFRoZSBldmVudCB0cmlnZ2VyZWQgd2lsbCBiZSBgTkFNRVNQQUNFOmV2ZW50TmFtZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAgICogQHBhcmFtIHtBbnl9IC4uLmFyZ3NcbiAgICovXG4gIHRyaWdnZXJFdmVudCAoZXZlbnROYW1lLCAuLi5hcmdzKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlN9XSB0cmlnZ2VyRXZlbnQ6ICR7dGhpcy5OU306JHtldmVudE5hbWV9YClcblxuICAgIC8vIEFsd2F5cyBwYXNzIHRoZSBjb21wb25lbnQgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IHBhcmFtZXRlclxuICAgICRkb2MudHJpZ2dlcihgJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gLCBbdGhpcywgLi4uYXJnc10pXG4gIH1cblxuICAvKipcbiAgICogVHJpZ2dlciBhIGN1c3RvbSBkb2N1bWVudCBldmVudCBvbiBhbiBlbGVtZW50IG9uIHRoZSBDb21wb25lbnQuXG4gICAqIFRoZSBldmVudCB0cmlnZ2VyZWQgd2lsbCBiZSBgTkFNRVNQQUNFOmV2ZW50TmFtZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBldmVudE5hbWVcbiAgICogQHBhcmFtIHtTdHJpbmd9IHNlbGVjdG9yXG4gICAqIEBwYXJhbSB7QW55fSAuLi5hcmdzXG4gICAqL1xuICB0cmlnZ2VyRXZlbnRPblNlbGVjdG9yIChldmVudE5hbWUsIHNlbGVjdG9yLCAuLi5hcmdzKSB7XG4gICAgc2VsZWN0b3IgPSBnZXRUYXJnZXRTZWxlY3RvcihzZWxlY3RvciwgdGhpcylcblxuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGBbJHt0aGlzLk5TfV0gdHJpZ2dlckV2ZW50T25TZWxlY3RvcjogJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gKVxuXG4gICAgLy8gQWx3YXlzIHBhc3MgdGhlIGNvbXBvbmVudCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgcGFyYW1ldGVyXG4gICAgJChzZWxlY3RvcikudHJpZ2dlcihgJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gLCBbdGhpcywgLi4uYXJnc10pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBDb21wb25lbnRcbiIsIi8qKlxuICogTFZMOTkgRW50aXR5XG4gKlxuICogQmFzZSBjbGFzcyB1c2VkIGZvciBwcm9ncmFtbWFibGUgZW50aXRpZXMgd2l0aGluIHRoZSBhcHAsIHN1Y2ggYXMgY29tcG9uZW50cyBvciBvdGhlciBzdWNoIGVudGl0aWVzIHRoYXQgcmVseSBvblxuICogc3RhdGUgYW5kIGxpZmVjeWNsZSBmdW5jdGlvbnMuXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCB1dWlkID0gcmVxdWlyZSgndXVpZCcpXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC5tZXJnZScpXG5jb25zdCBvYmplY3RQYXRoID0gcmVxdWlyZSgnb2JqZWN0LXBhdGgnKVxuY29uc3Qge1xuICBleHBvc2VQcml2YXRlUHJvcGVydGllc1xufSA9IHJlcXVpcmUoJy4uL3V0aWxzL2luaGVyaXRhbmNlJylcblxuLyoqXG4gKiBUaGUgRW50aXR5J3MgYmFzZSBwcm9wZXJ0aWVzXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgRW50aXR5UHJvcGVydGllcyA9IHtcbiAgLyoqXG4gICAqIE5BTUVTUEFDRVxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIGN1c3RvbSBldmVudHMgYW5kIGVycm9yIHJlcG9ydGluZ1xuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgX05TOiAnTFZMOTk6RW50aXR5JyxcblxuICAvKipcbiAgICogbmFtZXNwYWNlXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgQ1NTIGNsYXNzZXMgKG9ubHkgaWYgdGhlIGVudGl0eSBoYXMgYW4gSFRNTEVsZW1lbnQpXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBfbnM6ICdsdmw5OS1lbnRpdHknLFxuXG4gIC8qKlxuICAgKiBUaGUgcHJvcGVydGllcyBzaGFyZWQgYmV0d2VlbiBhbGwgaW5zdGFuY2VzIG9mIHRoaXMgRW50aXR5XG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfcHJvcGVydGllczoge30sXG5cbiAgLyoqXG4gICAqIFRoZSBkZWZhdWx0IGF0dHJpYnV0ZXMgdG8gbG9hZCBhIGNyZWF0ZWQgRW50aXR5IGluc3RhbmNlIHdpdGguXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfYXR0cmlidXRlczoge31cbn1cblxuY2xhc3MgRW50aXR5IHtcbiAgLyoqXG4gICAqIEVudGl0eSBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coJ0xWTDk5OkVudGl0eTpjb25zdHJ1Y3RvcicsIHtcbiAgICAvLyAgIGFyZ3VtZW50c1xuICAgIC8vIH0pXG5cbiAgICB0aGlzLmV4dGVuZCh7XG4gICAgICBfYXR0cmlidXRlczogYXR0cmlidXRlc1xuICAgIH0pXG5cbiAgICAvLyBFeHBvc2UgcHJpdmF0ZSB2YWx1ZXNcbiAgICBleHBvc2VQcml2YXRlUHJvcGVydGllcyh0aGlzKVxuXG4gICAgLy8gQ3JlYXRlIGEgdW5pcXVlIElEIGZvciB0aGlzIEVudGl0eVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndXVpZCcsIHtcbiAgICAgIHZhbHVlOiBgJHt0aGlzLk5TfToke3V1aWQudjQoKX1gLFxuICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVuZCB0aGUgRW50aXR5IHdpdGggYW55IGdpdmVuIHtPYmplY3R9IGFyZ3VtZW50c1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gLi4uYXJndW1lbnRzXG4gICAqIEByZXR1cm5zIHtTZWxmfVxuICAgKi9cbiAgZXh0ZW5kICgpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZygnTFZMOTk6RW50aXR5OmV4dGVuZCcsIHtcbiAgICAvLyAgIGFyZ3VtZW50c1xuICAgIC8vIH0pXG5cbiAgICAvLyBNZXJnZSB0aGUgcHJvcGVydGllcyB3aXRoIHRoZSBpbnN0YW50aWF0ZWQgYXR0cmlidXRlcyBhbmQgY29uY2F0ZW5hdGVkIHB1YmxpYyBtZXRob2RzXG4gICAgbWVyZ2UodGhpcywgRW50aXR5UHJvcGVydGllcywgLi4uYXJndW1lbnRzKVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYW4gRW50aXR5J3MgcHJvcGVydHkgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wTmFtZVxuICAgKiBAcmV0dXJuIHtNaXhlZH1cbiAgICovXG4gIGdldFByb3AgKHByb3BOYW1lKSB7XG4gICAgaWYgKCFwcm9wTmFtZSB8fCB0eXBlb2YgcHJvcE5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RoaXMuTlN9XSBnZXQ6ICdwcm9wTmFtZScgdmFsdWUgaXMgaW52YWxpZGApXG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGguZ2V0KHRoaXMucHJvcGVydGllcywgcHJvcE5hbWUpXG4gIH1cblxuICAvKipcbiAgICogU2V0IGFuIEVudGl0eSdzIHByb3BlcnR5IHRvIGEgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBwcm9wTmFtZVxuICAgKiBAcGFyYW0ge01peGVkfSBwcm9wVmFsdWVcbiAgICovXG4gIHNldFByb3AgKHByb3BOYW1lLCBwcm9wVmFsdWUpIHtcbiAgICBpZiAoIXByb3BOYW1lIHx8IHR5cGVvZiBwcm9wTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIHNldDogJ3Byb3BOYW1lJyB2YWx1ZSBpcyBpbnZhbGlkYClcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQodGhpcy5wcm9wZXJ0aWVzLCBwcm9wTmFtZSwgcHJvcFZhbHVlKVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBFbnRpdHkncyBhdHRyaWJ1dGUgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyTmFtZVxuICAgKiBAcmV0dXJuIHtNaXhlZH1cbiAgICovXG4gIGdldEF0dHIgKGF0dHJOYW1lKSB7XG4gICAgaWYgKCFhdHRyTmFtZSB8fCB0eXBlb2YgYXR0ck5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RoaXMuTlN9XSBnZXRBdHRyOiAnYXR0ck5hbWUnIHZhbHVlIGlzIGludmFsaWRgKVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RQYXRoLmdldCh0aGlzLmF0dHJpYnV0ZXMsIGF0dHJOYW1lKVxuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhbiBFbnRpdHkncyBwcm9wZXJ0eSB0byBhIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gYXR0ck5hbWVcbiAgICogQHBhcmFtIHtNaXhlZH0gYXR0clZhbHVlXG4gICAqL1xuICBzZXRBdHRyIChhdHRyTmFtZSwgYXR0clZhbHVlKSB7XG4gICAgaWYgKCFhdHRyTmFtZSB8fCB0eXBlb2YgYXR0ck5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFske3RoaXMuTlN9XSBzZXRBdHRyOiAnYXR0ck5hbWUnIHZhbHVlIGlzIGludmFsaWRgKVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RQYXRoLnNldCh0aGlzLmF0dHJpYnV0ZXMsIGF0dHJOYW1lLCBhdHRyVmFsdWUpXG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSB0aGUgRW50aXR5XG4gICAqL1xuICBpbml0ICgpIHt9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYW5kIHRlYXIgZG93biB0aGUgY29tcG9uZW50XG4gICAqL1xuICBkZXN0cm95ICgpIHt9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRW50aXR5XG4iLCIvKipcbiAqIExWTDk5IENvcmVcbiAqXG4gKiBDb3JlIGNsYXNzZXMgdXNlZCB0aHJvdWdob3V0IHRoZSBmcmFtZXdvcmtcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IEVudGl0eSA9IHJlcXVpcmUoJy4vZW50aXR5JylcbmNvbnN0IEFwcCA9IHJlcXVpcmUoJy4vYXBwJylcbmNvbnN0IENvbXBvbmVudCA9IHJlcXVpcmUoJy4vY29tcG9uZW50JylcblxuY29uc3QgY29yZSA9IHtcbiAgRW50aXR5LFxuICBBcHAsXG4gIENvbXBvbmVudFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVcbiIsIi8qKlxuICogTFZMOTlcbiAqXG4gKiBUaGUgd2hvbGUgZnJhbWV3b3JrIGluIG9uZSBkaXNjcmV0ZSBwYWNrYWdlXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBjb21tb24gPSByZXF1aXJlKCcuL2NvbW1vbicpXG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKVxuY29uc3QgY29yZSA9IHJlcXVpcmUoJy4vY29yZScpXG5jb25zdCB0b29scyA9IHJlcXVpcmUoJy4vdG9vbHMnKVxuXG5jb25zdCBsdmw5OSA9IHtcbiAgY29tbW9uLFxuICBjb3JlLFxuICB1dGlscyxcbiAgdG9vbHNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsdmw5OVxuIiwiLyoqXG4gKiBMVkw5OSBCcmVha3BvaW50c1xuICogRGV0ZWN0IHZpYSBKUyB3aGF0IHRoZSBicmVha3BvaW50IGlzIGJ5IGtleXdvcmRcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoLm1lcmdlJylcblxuZnVuY3Rpb24gQnJlYWtwb2ludHMgKHNpemVzKSB7XG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogVGhlIGRlZmluZWQgYnJlYWtwb2ludCBuYW1lcyB3aXRoIG1pbi9tYXggd2lkdGhzIChpbiA3MmRwaSBwaXhlbHMpXG4gICAgICogU2hvdWxkIGNvaW5jaWRlIHdpdGggQ1NTIGZvciBvcHRpbXVtIGV4cGVjdGVkIGJlaGF2aW91clxuICAgICAqXG4gICAgICogQHByb3BlcnR5IHNpemVzXG4gICAgICogQHR5cGUge09iamVjdH0gPT4ge0FycmF5fSBbMCA9IHtOdW1iZXJ9IG1pbldpZHRoLCAxID0ge051bWJlcn0gbWF4V2lkdGhdXG4gICAgICovXG4gICAgc2l6ZXM6IHNpemVzIHx8IHtcbiAgICAgICd4cyc6ICAgICAgIFswLCAgICAzOTldLFxuICAgICAgJ21vYmlsZSc6ICAgWzAsICAgIDc5OV0sXG4gICAgICAnbXMnOiAgICAgICBbNDAwLCAgNTk5XSxcbiAgICAgICdzJzogICAgICAgIFs2MDAsICA3OTldLFxuICAgICAgJ20nOiAgICAgICAgWzgwMCwgIDk5OV0sXG4gICAgICAndGFibGV0JzogICBbODAwLCAgMTE5OV0sXG4gICAgICAnbCc6ICAgICAgICBbMTAwMCwgMTE5OV0sXG4gICAgICAnbGFwdG9wJzogICBbMTAwMCwgMTM5OV0sXG4gICAgICAnY29tcHV0ZXInOiBbMTAwMCwgOTk5OTldLFxuICAgICAgJ3hsJzogICAgICAgWzEyMDAsIDEzOTldLFxuICAgICAgJ2Rlc2t0b3AnOiAgWzEyMDAsIDk5OTk5XSxcbiAgICAgICd4eGwnOiAgICAgIFsxNDAwLCA5OTk5OV1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IGEgc3RyaW5nIG9mIHRoZSBjdXJyZW50bHkgYWN0aXZlIGJyZWFrcG9pbnRzXG4gICAgICogQG1ldGhvZCBnZXRBY3RpdmVcbiAgICAgKiBAcmV0dXJucyB7QXJyYXl9XG4gICAgICovXG4gICAgZ2V0QWN0aXZlICgpIHtcbiAgICAgIGxldCB3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoXG4gICAgICBsZXQgYnAgPSBbXVxuXG4gICAgICBmb3IgKGxldCB4IGluIHRoaXMuc2l6ZXMpIHtcbiAgICAgICAgaWYgKHRoaXMuc2l6ZXMuaGFzT3duUHJvcGVydHkoeCkgJiYgd2lkdGggPj0gdGhpcy5zaXplc1t4XVswXSAmJiB3aWR0aCA8PSB0aGlzLnNpemVzW3hdWzFdKSB7XG4gICAgICAgICAgYnAucHVzaCh4KVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBicFxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiBhIGJyZWFrcG9pbnQga2V5d29yZCBpcyBjdXJyZW50bHkgYWN0aXZlXG4gICAgICogQG1ldGhvZCBpc0FjdGl2ZVxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufVxuICAgICAqL1xuICAgIGlzQWN0aXZlIChpbnB1dCkge1xuICAgICAgaWYgKGlucHV0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgaW5wdXQgPSBpbnB1dC5qb2luKCd8JylcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaW5wdXQgPSBuZXcgUmVnRXhwKCdcXFxcYig/OicgKyBpbnB1dC5yZXBsYWNlKC9bXFxzLF0rL2csICd8JykgKyAnKVxcXFxiJywgJ2knKVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gaW5wdXQudGVzdCh0aGlzLmdldEFjdGl2ZSgpKycnKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJyZWFrcG9pbnRzXG4iLCIvKipcbiAqIExWTDk5IERlYnVnXG4gKiBBIGNvbnNvbGUtbGlrZSByZXBsYWNlbWVudCB3aGljaCBjcmVhdGVzIGEgbm9vcCBjb25zb2xlIG9iamVjdCBpZiB5b3UgZG9uJ3Qgd2FudCB0byBvdXRwdXQgc3R1ZmYgdmlhIHRoZSBjb25zb2xlXG4gKi9cblxuZnVuY3Rpb24gbm9vcCAoKSB7fVxuXG4vKipcbiAqIERlYnVnXG4gKlxuICogQHBhcmFtIHtCb29sZWFufSBzaWxlbnQgU2V0IHRvIHRydWUgdG8gbWFrZSB0aGUgY29uc29sZSBiZWhhdmlvdXJzIHNpbGVudFxuICogQGNvbnN0cnVjdG9yXG4gKi9cbmZ1bmN0aW9uIERlYnVnIChzaWxlbnQgPSBmYWxzZSkge1xuICBpZiAoc2lsZW50KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNsZWFyOiBub29wLFxuICAgICAgY291bnQ6IG5vb3AsXG4gICAgICBkZWJ1Zzogbm9vcCxcbiAgICAgIGVycm9yOiBub29wLFxuICAgICAgZ3JvdXA6IG5vb3AsXG4gICAgICBpbmZvOiBub29wLFxuICAgICAgbG9nOiBub29wLFxuICAgICAgdGFibGU6IG5vb3AsXG4gICAgICB0aW1lOiBub29wLFxuICAgICAgdGltZUVuZDogbm9vcCxcbiAgICAgIHRyYWNlOiBub29wLFxuICAgICAgd2Fybjogbm9vcFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29uc29sZSB8fCB3aW5kb3cuY29uc29sZVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRGVidWdcbiIsIi8qKlxuICogTFZMOTkgVG9vbHNcbiAqXG4gKiBTdGFuZGFsb25lIHRvb2xzIHRoYXQgZG9uJ3QgcmVxdWlyZSBhbnkgZGVwZW5kZW5jaWVzIHdpdGhpbiB0aGUgZnJhbWV3b3JrLCBidXQgd29yayBhbG9uZ3NpZGVcbiAqL1xuXG5jb25zdCBCcmVha3BvaW50cyA9IHJlcXVpcmUoJy4vYnJlYWtwb2ludHMnKVxuY29uc3QgRGVidWcgPSByZXF1aXJlKCcuL2RlYnVnJylcbmNvbnN0IFF1ZXVlID0gcmVxdWlyZSgnLi9xdWV1ZScpXG5jb25zdCBUcmFja0V2ZW50ID0gcmVxdWlyZSgnLi90cmFja2V2ZW50JylcbmNvbnN0IFNtb290aFNjcm9sbCA9IHJlcXVpcmUoJy4vc21vb3RoLXNjcm9sbCcpXG5cbmNvbnN0IHV0aWxzID0ge1xuICBCcmVha3BvaW50cyxcbiAgRGVidWcsXG4gIFF1ZXVlLFxuICBUcmFja0V2ZW50LFxuICBTbW9vdGhTY3JvbGxcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b29sc1xuIiwiLyoqXG4gKiBMVkw5OSBRdWV1ZVxuICpcbiAqIEJhdGNoIGFjdGlvbnMgaW50byBhIGRlYm91bmNlZCBxdWV1ZVxuICogVXNlZnVsIHRvIHJlZHVjZSBhbW91bnQgb2Ygd29yayBjb21wdXRlci9icm93c2VyIGRvZXNcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoLm1lcmdlJylcblxuLyoqXG4gKiBRdWV1ZSBjbGFzc1xuICpcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gUXVldWUgKG9wdGlvbnMpIHtcbiAgLyoqXG4gICAqIFF1ZXVlIG9wdGlvbnNcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfb3B0aW9ucyA9IG1lcmdlKHtcbiAgICBxdWV1ZToge30sXG4gICAgdGltZXI6IDAsXG4gICAgdGltZXJEZWxheTogMTAwXG4gIH0sIG9wdGlvbnMpXG5cbiAgLyoqXG4gICAqIFRoZSBiYXRjaGVkIHF1ZXVlXG4gICAqIFF1ZXVlIGFjdGlvbnMgYXJlIGJhdGNoZWQgaW4gYW4ge09iamVjdH0gd2l0aCBhIHNwZWNpZmljIGxhYmVsXG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBsZXQgX3F1ZXVlID0gX29wdGlvbnMucXVldWVcblxuICAvKipcbiAgICogVGhlIHF1ZXVlIHRpbWVyXG4gICAqIFdoZW4gdGhlIHF1ZXVlIGlzIGFkZGVkIHRvLCB0aGUgdGltZXIgaXMgdXBkYXRlZCB3aXRoIGEgYHNldFRpbWVvdXRgIGNhbGwgdG8gdGhlIGBydW5gIGZ1bmN0aW9uXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBsZXQgX3RpbWVyID0gX29wdGlvbnMudGltZXJcblxuICAvKipcbiAgICogVGhlIHF1ZXVlIHRpbWVyIGRlbGF5XG4gICAqIFRoZSBkZWxheSBiZXR3ZWVuIHF1ZXVlIHRpbWVyIHVwZGF0ZXMgKGluIG1pbGxpc2Vjb25kcylcbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICogQGRlZmF1bHQgMTAwXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBsZXQgX3RpbWVyRGVsYXkgPSBfb3B0aW9ucy50aW1lckRlbGF5XG5cbiAgLyoqXG4gICAqIFRoZSBwbGF5IHN0YXR1c1xuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBsZXQgX3N0YXR1cyA9IDFcblxuICByZXR1cm4ge1xuICAgIC8qKlxuICAgICAqIFF1ZXVlIGFuIGFjdGlvblxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbkxhYmVsIEEgdW5pcXVlIGxhYmVsIGZvciB0aGUgYWN0aW9uIGluIHRoZSBxdWV1ZS5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FuIGJlIHNldCB0byB7dW5kZWZpbmVkfSAod2hpY2ggbWVhbnMgdGhlIGFjdGlvbiBjYW4ndCBiZSByZW1vdmVkKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIHRoZSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge01peGVkfSAuLi5hcmdzIFRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgYWN0aW9uIGhhbmRsZXJcbiAgICAgKiBAcmV0dXJuIHtTZWxmfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBxdWV1ZSAoYWN0aW9uTGFiZWwsIGFjdGlvbiwgLi4uYXJncykge1xuICAgICAgLy8gRGVmYXVsdCBhY3Rpb25MYWJlbCBpcyB0aW1lIHZhbHVlIGFzIHN0cmluZ1xuICAgICAgaWYgKCFhY3Rpb25MYWJlbCkge1xuICAgICAgICBhY3Rpb25MYWJlbCA9IERhdGUubm93KCkgKyAnJ1xuICAgICAgfVxuXG4gICAgICAvLyBBc3NpZ24gdGhlIGZ1bmN0aW9uIHRvIHRoZSBxdWV1ZVxuICAgICAgaWYgKGFjdGlvbkxhYmVsICYmIGFjdGlvbiAmJiB0eXBlb2YgYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIF9xdWV1ZVthY3Rpb25MYWJlbF0gPSB7XG4gICAgICAgICAgYWN0aW9uLFxuICAgICAgICAgIGFyZ3M6IGFyZ3NcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGQgYWN0aW9uIHRvIHRoZSBxdWV1ZS4gQWZ0ZXIgYWRkaW5nIHRoaXMgd2lsbCBzdGFydCB0aGUgcXVldWUgdGltZXIgdG8gdGhlbiBydW4gdGhlIHF1ZXVlIGFmdGVyIHRoZSBkZWxheVxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbkxhYmVsIEEgdW5pcXVlIGxhYmVsIGZvciB0aGUgYWN0aW9uIGluIHRoZSBxdWV1ZS5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ2FuIGJlIHNldCB0byB7dW5kZWZpbmVkfSAod2hpY2ggbWVhbnMgdGhlIGFjdGlvbiBjYW4ndCBiZSByZW1vdmVkKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvbiBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIHRoZSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge01peGVkfSAuLi5hcmdzIFRoZSBhcmd1bWVudHMgdG8gcGFzcyB0byB0aGUgYWN0aW9uIGhhbmRsZXJcbiAgICAgKiBAcmV0dXJuIHtTZWxmfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBhZGQgKGFjdGlvbkxhYmVsLCBhY3Rpb24sIC4uLmFyZ3MpIHtcbiAgICAgIC8vIFF1ZXVlIHRoZSBhY3Rpb25cbiAgICAgIHRoaXMucXVldWUoYWN0aW9uTGFiZWwsIGFjdGlvbiwgLi4uYXJncylcblxuICAgICAgLy8gUGxheSB0aGUgdGltZXIgdG8gZ2V0IHRoZSBxdWV1ZSB0byBydW4gYWZ0ZXIgYSBkZWxheSAob25seSB3aGVuIHBsYXlpbmcpXG4gICAgICBpZiAoX3N0YXR1cykge1xuICAgICAgICB0aGlzLnBsYXkoKVxuICAgICAgfVxuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgLy8gQGRlYnVnXG4gICAgICAvLyAgIGNvbnNvbGUubG9nKCdxdWV1ZSBpcyBjdXJyZW50bHkgcGF1c2VkJylcbiAgICAgIC8vIH1cblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQWRkIGFjdGlvbiBhbmQgdGhlbiBydW4gdGhlIHF1ZXVlIGltbWVkaWF0ZWx5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTGFiZWxcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhY3Rpb25cbiAgICAgKiBAcGFyYW0ge01peGVkfSBhY3Rpb25BcmdzXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgc3luYyAoYWN0aW9uTGFiZWwsIGFjdGlvbiwgLi4uYXJncykge1xuICAgICAgY2xlYXJUaW1lb3V0KF90aW1lcilcblxuICAgICAgLy8gUXVldWUgYWN0aW9uLi4uXG4gICAgICB0aGlzLnF1ZXVlKGFjdGlvbkxhYmVsLCBhY3Rpb24sIC4uLmFyZ3MpXG5cbiAgICAgIC8vIC4uLiBUaGVuIHJ1biB0aGUgcXVldWUgaW1tZWRpYXRlbHlcbiAgICAgIHRoaXMucnVuKClcblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBhY3Rpb24gYnkgaXRzIGxhYmVsXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTGFiZWxcbiAgICAgKiBAcmV0dXJuIHt1bmRlZmluZWR8T2JqZWN0fVxuICAgICAqL1xuICAgIGdldEFjdGlvbkJ5TGFiZWwgKGFjdGlvbkxhYmVsKSB7XG4gICAgICBpZiAoX3F1ZXVlLmhhc093blByb3BlcnR5KGFjdGlvbkxhYmVsKSkge1xuICAgICAgICByZXR1cm4gX3F1ZXVlW2FjdGlvbkxhYmVsXVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSBhY3Rpb24gZnJvbSBxdWV1ZS4gQ2FuIG9ubHkgcmVtb3ZlIGFjdGlvbnMgaWYgeW91IGtub3cgdGhlaXIgbGFiZWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25MYWJlbFxuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHJlbW92ZSAoYWN0aW9uTGFiZWwpIHtcbiAgICAgIGlmIChfcXVldWUuaGFzT3duUHJvcGVydHkoYWN0aW9uTGFiZWwpKSB7XG4gICAgICAgIF9xdWV1ZVthY3Rpb25MYWJlbF0gPSB1bmRlZmluZWRcbiAgICAgICAgZGVsZXRlIF9xdWV1ZVthY3Rpb25MYWJlbF1cbiAgICAgIH1cblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUGxheSB0aGUgcXVldWUgdGltZXIgKHdpbGwgcnVuIHF1ZXVlIGFmdGVyIHRpbWVyIGRlbGF5KVxuICAgICAqXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcGxheSAoKSB7XG4gICAgICAvLyBPbmx5IHBsYXkgaWYgYWxyZWFkeSBwYXVzZWRcbiAgICAgIGNsZWFyVGltZW91dChfdGltZXIpXG5cbiAgICAgIC8vIFNldCB0byBwbGF5aW5nXG4gICAgICBfc3RhdHVzID0gMVxuXG4gICAgICAvLyBSZXNldCB0aW1lciB0byBydW4gdGhlIHF1ZXVlXG4gICAgICBfdGltZXIgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIHJ1blF1ZXVlUHJvY2Vzc0FmdGVyRGVsYXkocXVldWVJbnN0YW5jZSkge1xuICAgICAgICBxdWV1ZUluc3RhbmNlLnJ1bigpXG4gICAgICB9KHRoaXMpLCBfdGltZXJEZWxheSlcblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUGF1c2UgdGhlIHF1ZXVlIHRpbWVyXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTZWxmfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBwYXVzZSAoKSB7XG4gICAgICAvLyBPbmx5IHBhdXNlIGlmIGFscmVhZHkgcGxheWluZ1xuICAgICAgY2xlYXJUaW1lb3V0KF90aW1lcilcblxuICAgICAgLy8gU2V0IHRvIHBhdXNlZFxuICAgICAgX3N0YXR1cyA9IDBcblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzcy9ydW4gYWxsIHRoZSBhY3Rpb25zIGluIHRoZSBxdWV1ZVxuICAgICAqXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcnVuICgpIHtcbiAgICAgIGNsZWFyVGltZW91dChfdGltZXIpXG5cbiAgICAgIC8vIE5vIGl0ZW1zIGluIHRoZSBxdWV1ZSwgc28gc2V0IHRvIHBhdXNlXG4gICAgICBpZiAoIU9iamVjdC5rZXlzKF9xdWV1ZSkubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMucGF1c2UoKVxuXG4gICAgICAgIHJldHVybiB0aGlzXG4gICAgICB9XG5cbiAgICAgIC8vIFByb2Nlc3MgdGhlIHF1ZXVlXG4gICAgICBmb3IgKGxldCBhY3Rpb25MYWJlbCBpbiBfcXVldWUpIHtcbiAgICAgICAgaWYgKF9xdWV1ZS5oYXNPd25Qcm9wZXJ0eShhY3Rpb25MYWJlbCkgJiYgX3F1ZXVlW2FjdGlvbkxhYmVsXSkge1xuICAgICAgICAgIGxldCBxdWV1ZWRJdGVtID0gX3F1ZXVlW2FjdGlvbkxhYmVsXVxuXG4gICAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgICAgLy8gY29uc29sZS5sb2coJ3J1bm5pbmcgcXVldWVkIGl0ZW0nLCBxdWV1ZWRJdGVtKVxuXG4gICAgICAgICAgLy8gRnVuY3Rpb25cbiAgICAgICAgICBpZiAocXVldWVkSXRlbSAmJiB0eXBlb2YgcXVldWVkSXRlbSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcXVldWVkSXRlbSgpXG5cbiAgICAgICAgICAvLyBPYmplY3RcbiAgICAgICAgICB9IGVsc2UgaWYgKHF1ZXVlZEl0ZW0uaGFzT3duUHJvcGVydHkoJ2FjdGlvbicpICYmIHR5cGVvZiBxdWV1ZWRJdGVtLmFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgLy8gQXBwbHkgYXJndW1lbnRzIHRvIHRoZSBhY3Rpb25cbiAgICAgICAgICAgIGlmIChxdWV1ZWRJdGVtLmhhc093blByb3BlcnR5KCdhcmdzJykgJiYgcXVldWVkSXRlbS5hcmdzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgcXVldWVkSXRlbS5hY3Rpb24oLi4ucXVldWVkSXRlbS5hcmdzKVxuXG4gICAgICAgICAgICAvLyBSdW4gdGhlIGFjdGlvbiBsaWtlIG5vcm1hbFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcXVldWVkSXRlbS5hY3Rpb24oKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIERlbGV0ZSB0aGUgcXVldWVkIGl0ZW1cbiAgICAgICAgICBfcXVldWVbYWN0aW9uTGFiZWxdID0gdW5kZWZpbmVkXG4gICAgICAgICAgZGVsZXRlIF9xdWV1ZVthY3Rpb25MYWJlbF1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDb250aW51ZSBwbGF5aW5nIGlmIGluIHBsYXkgbW9kZVxuICAgICAgLy8gaWYgKF9zdGF0dXMpIHtcbiAgICAgIC8vICAgdGhpcy5wbGF5KClcbiAgICAgIC8vIH1cblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzdGF0dXMgb2YgdGhlIHF1ZXVlOlxuICAgICAqICAgMCA9IFBhdXNlZFxuICAgICAqICAgMSA9IFBsYXlpbmdcbiAgICAgKiBAcmV0dXJucyB7TnVtYmVyfVxuICAgICAqL1xuICAgIGNoZWNrU3RhdHVzICgpIHtcbiAgICAgIHJldHVybiBfc3RhdHVzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgdGltZXIgZGVsYXlcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0VGltZXJEZWxheSAoKSB7XG4gICAgICByZXR1cm4gX3RpbWVyRGVsYXlcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2V0IHRoZSB0aW1lciBkZWxheVxuICAgICAqXG4gICAgICogQHBhcmFtIHRpbWVyRGVsYXlcbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICogQHJldHVybnMge1NlbGZ9XG4gICAgICovXG4gICAgc2V0VGltZXJEZWxheSAodGltZXJEZWxheSkge1xuICAgICAgLy8gT25seSBzZXQgaWYgdGltZXJEZWxheSBpcyBncmVhdGVyIHRoYW4gMFxuICAgICAgaWYgKHRpbWVyRGVsYXkgJiYgdGltZXJEZWxheSA+IDApIHtcbiAgICAgICAgX3RpbWVyRGVsYXkgPSB0aW1lckRlbGF5XG4gICAgICB9XG5cbiAgICAgIC8vIEBjaGFpbmFibGVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgbGVuZ3RoIG9mIHRoZSBxdWV1ZVxuICAgICAqXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqL1xuICAgIGdldFF1ZXVlTGVuZ3RoICgpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhfcXVldWUpLmxlbmd0aFxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFF1ZXVlXG4iLCIvKipcbiAqIExWTDk5IFNtb290aCBTY3JvbGxcbiAqXG4gKiBTbW9vdGhseSBzY3JvbGwgdG8gaW50ZXJuYWwgYW5jaG9yIGxpbmtzIG9uIGEgcGFnZS5cbiAqXG4gKiAjIyBVc2FnZVxuICpcbiAqIFNtb290aCBTY3JvbGwgbmVlZHMgdG8gYmUgaW5pdGlhbGlzZWQgd2l0aCBqUXVlcnkgYW5kIGFueSBjb25maWd1cmVkIG9wdGlvbnMuIER1cmluZyBpbml0aWFsaXNhdGlvbiB0aGUgc2NyaXB0IHdpbGxcbiAqIGFwcGx5IHRoZSBiZWhhdmlvdXJzIHRvIGFueSBhcHBsaWNhYmxlIGFuY2hvciBsaW5rcy5cbiAqXG4gKiBgYGBcbiAqICAgbGV0IFNtb290aFNjcm9sbCA9IHJlcXVpcmUoJ2x2bDk5L2VzNi90b29scy9zbW9vdGgtc2Nyb2xsJykoalF1ZXJ5LCB7IGJ1ZmZlclRvcDogMCB9KVxuICogYGBgXG4gKlxuICogWW91IGNhbiBhbHNvIGluaXRpYWxpc2UgdGhlIHNtb290aFNjcm9sbCBiZWhhdmlvdXJzIGJ5IGNhbGxpbmcgYHNtb290aFNjcm9sbC5pbml0KClgLiBUaGlzIHdpbGwgYXR0YWNoIHRoZSBuZWNlc3NhcnlcbiAqIGV2ZW50cyBvbiB0byBhbmNob3IgbGlua3MuXG4gKlxuICogWW91IGNhbiB0cmlnZ2VyIHRoZSBzY3JvbGxUbyBldmVudCBieSB1c2luZyB0aGUgY3VzdG9tIGV2ZW50IGBTbW9vdGhTY3JvbGwuc2Nyb2xsVG9gLCBlLmcuOlxuICpcbiAqIGBgYFxuICogICAkKGRvY3VtZW50KS50cmlnZ2VyKCdTbW9vdGhTY3JvbGwuc2Nyb2xsVG8nLCBbIHNjcm9sbFRvT3B0aW9ucyBdKVxuICogYGBgXG4gKlxuICogVGhlIGBzY3JvbGxUb2AgZnVuY3Rpb24gZW1pdHMgYSBjdXN0b20gZXZlbnQgYFNtb290aFNjcm9sbC5zY3JvbGxUbzpzdGFydGAgd2hlbiB0aGUgYWN0aW9uIGlzIGludm9rZWQgYW5kXG4gKiBgU21vb3RoU2Nyb2xsLnNjcm9sbFRvOmVuZGAgd2hlbiBpdCBmaW5pc2hlcy5cbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IFNtb290aFNjcm9sbCA9IGZ1bmN0aW9uICgkLCBvcHRpb25zKSB7XG4gIC8qKlxuICAgKiBMb2FkIGluIHRoZSBzZXR0aW5nc1xuICAgKi9cbiAgY29uc3Qgc2V0dGluZ3MgPSAkLmV4dGVuZCh7XG4gICAgLy8gVGhlIHNwYWNlIGJldHdlZW4gdGhlIHRvcCBvZiB0aGUgd2luZG93IGFuZCB0aGUgdG9wIG9mIHRoZSB0YXJnZXRcbiAgICBidWZmZXJUb3A6IDAsXG5cbiAgICAvLyBUaGUgc3BlZWQgdG8gc2Nyb2xsIHRoZSB3aW5kb3dcbiAgICBzY3JvbGxTcGVlZDogMTAwMCxcblxuICAgIC8vIFRoZSBkaXN0YW5jZSBmcm9tIHRvcCBvZiB3aW5kb3cgdG8gdG9wIG9mIHRhcmdldCBlbGVtZW50IHRvIHRyaWdnZXIgc2Nyb2xsaW5nXG4gICAgdHJpZ2dlckRpc3RhbmNlOiA0MDBcbiAgfSwgb3B0aW9ucylcblxuICAvKipcbiAgICogU21vb3RobHkgc2Nyb2xsIHRvIGEgdGFyZ2V0XG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfEhUTUxFbGVtZW50fGpRdWVyeU9iamVjdH0gdGFyZ2V0XG4gICAqL1xuICBmdW5jdGlvbiBzY3JvbGxUbyAodGFyZ2V0LCBzY3JvbGxUb09wdGlvbnMpIHtcbiAgICAvLyBGaWd1cmUgb3V0IGVsZW1lbnQgdG8gc2Nyb2xsIHRvXG4gICAgbGV0ICR0YXJnZXQgPSAkKHRhcmdldCkubm90KCdbZGF0YS1kaXNhYmxlLXNtb290aC1zY3JvbGxdJylcblxuICAgIC8vIE1vcmUgdGhhbiBvbmUgdGFyZ2V0LCBkZWZhdWx0IHRvIGZpcnN0XG4gICAgJHRhcmdldCA9ICgkdGFyZ2V0Lmxlbmd0aCA+IDEgPyAkdGFyZ2V0LmVxKDApIDogJHRhcmdldClcblxuICAgIC8vIERvZXMgYSBzY3JvbGwgdGFyZ2V0IGV4aXN0P1xuICAgIGlmICgkdGFyZ2V0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgLy8gTG9hZCBpbiBwZXItdXNlIHNldHRpbmdzXG4gICAgICBsZXQgc2Nyb2xsVG9TZXR0aW5ncyA9ICQuZXh0ZW5kKHt9LCBzZXR0aW5ncywgc2Nyb2xsVG9PcHRpb25zKVxuXG4gICAgICAvLyBHZXQgdGhlIHRhcmdldCdzIHRvcCBvZmZzZXRcbiAgICAgIGxldCB0YXJnZXRPZmZzZXRUb3AgPSAkdGFyZ2V0Lm9mZnNldCgpLnRvcFxuXG4gICAgICAvLyBHZXQgY3VycmVudCB3aW5kb3cgc2Nyb2xsVG9wXG4gICAgICBsZXQgd2luZG93U2Nyb2xsVG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpXG5cbiAgICAgIC8vIFN1cHBvcnQgZHluYW1pYyBidWZmZXJUb3AgaWYgaXQgaXMgYSBmdW5jdGlvblxuICAgICAgbGV0IHNjcm9sbFRvcCA9IHRhcmdldE9mZnNldFRvcCAtICh0eXBlb2Ygc2Nyb2xsVG9TZXR0aW5ncy5idWZmZXJUb3AgPT09ICdmdW5jdGlvbicgPyBzY3JvbGxUb1NldHRpbmdzLmJ1ZmZlclRvcCgpIDogc2Nyb2xsVG9TZXR0aW5ncy5idWZmZXJUb3ApXG5cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgdGhlIHNjcm9sbCBpZiB0aGUgZGlzdGFuY2UgaXMgd2l0aGluXG4gICAgICBsZXQgY2hlY2tUcmlnZ2VyRGlzdGFuY2UgPSBNYXRoLmFicyh3aW5kb3dTY3JvbGxUb3AgLSBzY3JvbGxUb3ApXG4gICAgICBpZiAoY2hlY2tUcmlnZ2VyRGlzdGFuY2UgPCBzY3JvbGxUb1NldHRpbmdzLnRyaWdnZXJEaXN0YW5jZSkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLyoqXG4gICAgICAgKiBFbWl0IHN0YXJ0IGV2ZW50XG4gICAgICAgKlxuICAgICAgICogQGV2ZW50IFNtb290aFNjcm9sbC5zY3JvbGxUbzpzdGFydFxuICAgICAgICogQHBhcmFtIHtqUXVlcnlPYmplY3R9ICR0YXJnZXRcbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fVxuICAgICAgICovXG4gICAgICAkdGFyZ2V0LnRyaWdnZXIoJ1Ntb290aFNjcm9sbC5zY3JvbGxUbzpzdGFydCcsIFsgc2Nyb2xsVG9TZXR0aW5ncyBdKVxuXG4gICAgICAvLyBEbyB0aGUgc2Nyb2xsIHRoaW5nXG4gICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgIHNjcm9sbFRvcFxuICAgICAgfSwgc2Nyb2xsVG9TZXR0aW5ncy5zY3JvbGxTcGVlZCwgKCkgPT4ge1xuICAgICAgICAvLyBDYWxsYmFjayBhZnRlciBhbmltYXRpb25cbiAgICAgICAgLy8gTXVzdCBjaGFuZ2UgZm9jdXMhXG4gICAgICAgICR0YXJnZXQuZm9jdXMoKVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBFbWl0IGVuZCBldmVudFxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXZlbnQgU21vb3RoU2Nyb2xsLnNjcm9sbFRvOmVuZFxuICAgICAgICAgKiBAcGFyYW0ge2pRdWVyeU9iamVjdH0gJHRhcmdldFxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH1cbiAgICAgICAgICovXG4gICAgICAgICR0YXJnZXQudHJpZ2dlcignU21vb3RoU2Nyb2xsLnNjcm9sbFRvOmVuZCcsIFsgc2Nyb2xsVG9TZXR0aW5ncyBdKVxuXG4gICAgICAgIC8vIENoZWNraW5nIGlmIHRoZSB0YXJnZXQgd2FzIGZvY3VzZWRcbiAgICAgICAgaWYgKCR0YXJnZXQuaXMoJzpmb2N1cycpKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpc2UgYWxsIGxpbmtzIG9uIHRoZSBwYWdlIHdpdGggdGhlIHNtb290aFNjcm9sbCBmdW5jdGlvbmFsaXR5XG4gICAqL1xuICBmdW5jdGlvbiBpbml0ICgpIHtcbiAgICAvLyBBdHRhY2ggbGluayBiZWhhdmlvdXJzXG4gICAgJCgnYVtocmVmKj1cIiNcIl0nKVxuICAgIC8vIFJlbW92ZSBsaW5rcyB0aGF0IGRvbid0IGFjdHVhbGx5IGxpbmsgdG8gYW55dGhpbmdcbiAgICAgIC5ub3QoJ1tocmVmPVwiI1wiXScpXG4gICAgICAubm90KCdbaHJlZj1cIiMwXCJdJylcbiAgICAgIC5jbGljayhldmVudCA9PiB7XG4gICAgICAgIGNvbnN0ICRhID0gJChldmVudC50YXJnZXQpLmNsb3Nlc3QoJ2EnKVxuICAgICAgICBjb25zdCBoYXNoID0gJGEuYXR0cignaHJlZicpLnJlcGxhY2UoLy4qIyhbXj9dKykuKi8sICcjJDEnKVxuICAgICAgICBpZiAoJChoYXNoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgIHNjcm9sbFRvKGhhc2gpXG4gICAgICAgIH1cbiAgICAgIH0pXG5cbiAgICAvLyBBdHRhY2ggY3VzdG9tIGV2ZW50IHRvIHRyaWdnZXIgdGhyb3VnaCBET01cbiAgICAkKGRvY3VtZW50KS5vbignU21vb3RoU2Nyb2xsLnNjcm9sbFRvJywgZnVuY3Rpb24gKGV2ZW50LCBzY3JvbGxUb09wdGlvbnMpIHtcbiAgICAgIGlmIChldmVudC50YXJnZXQpIHtcbiAgICAgICAgc2Nyb2xsVG8oZXZlbnQudGFyZ2V0LCBzY3JvbGxUb09wdGlvbnMpXG4gICAgICB9XG4gICAgfSlcblxuICAgIC8vIENoZWNrIHRvIHNlZSBpZiBhIGhhc2ggaXMgbG9jYXRlZCBpbiB0aGUgd2luZG93LmxvY2F0aW9uIGFuZCBzY3JvbGwgdG8gdGhlIGVsZW1lbnRcbiAgICBpZiAod2luZG93LmxvY2F0aW9uLmhhc2gpIHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzY3JvbGxUbyh3aW5kb3cubG9jYXRpb24uaGFzaClcbiAgICAgIH0sIDEwMDApXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBpbml0LFxuICAgIHNjcm9sbFRvXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTbW9vdGhTY3JvbGxcbiIsIi8qKlxuICogTFZMOTkgVHJhY2sgRXZlbnRcbiAqIENhY2hlcyB0cmFja2VkIGV2ZW50cyB1bnRpbCBHb29nbGUgQW5hbHl0aWNzIGlzIGxvYWRlZCwgdGhlbiB1cGxvYWRzIHRvIEdBXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5mdW5jdGlvbiBUcmFja0V2ZW50IChkZWJ1Zykge1xuICAvKipcbiAgICogQ29sbGVjdCB0cmFja2VkIGV2ZW50cyBiZWZvcmUgR0EgaXMgbG9hZGVkXG4gICAqIEB0eXBlIHtBcnJheX1cbiAgICovXG4gIGxldCBzYXZlZCA9IFtdXG5cbiAgLyoqXG4gICAqIFN0YXJ0IGNoZWNraW5nIHRvIHNlZSBpZiB0aGUgR0Egb2JqZWN0IGlzIGxvYWRlZFxuICAgKi9cbiAgLyoqXG4gICAqIERldGVjdCBpZiBHQSBpcyBsb2FkZWQgYW5kIHRoZW4gc2VuZCBhbnkgc3RvcmVkIEdBIGV2ZW50c1xuICAgKi9cbiAgdGhpcy5nYUxvYWRlZFRpbWVyID0gc2V0SW50ZXJ2YWwoKGZ1bmN0aW9uIChsdmw5OVRyYWNrRXZlbnQpIHtcbiAgICBsZXQgaVxuXG4gICAgLy8gV2FpdCB1bnRpbCBHQSBvYmplY3QgaXMgYXZhaWxhYmxlXG4gICAgaWYgKHR5cGVvZiB3aW5kb3cuZ2EgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjbGVhckludGVydmFsKGx2bDk5VHJhY2tFdmVudC5nYUxvYWRlZFRpbWVyKVxuXG4gICAgICAvLyBTZW5kIHNhdmVkIGV2ZW50c1xuICAgICAgaWYgKGx2bDk5VHJhY2tFdmVudC5zYXZlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmIChkZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS5sb2cpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhgU2VuZGluZyAke2x2bDk5VHJhY2tFdmVudC5zYXZlZC5sZW5ndGh9IHRyYWNrZWQgZXZlbnRzIHRvIGdhYClcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoaSBpbiBsdmw5OVRyYWNrRXZlbnQuc2F2ZWQpIHtcbiAgICAgICAgICB3aW5kb3cuZ2EoJ3NlbmQnLCBsdmw5OVRyYWNrRXZlbnQuc2F2ZWRbaV0pXG4gICAgICAgIH1cbiAgICAgICAgbHZsOTlUcmFja0V2ZW50LnNhdmVkID0gW11cbiAgICAgIH1cbiAgICB9XG4gIH0odGhpcykpLCA1MDAwKVxuXG4gIC8qKlxuICAgKiBUcmFjayBldmVudCBtYWdpY1xuICAgKiBAcGFyYW0gZXZlbnRDYXRlZ29yeVxuICAgKiBAcGFyYW0gZXZlbnRBY3Rpb25cbiAgICogQHBhcmFtIGV2ZW50TGFiZWxcbiAgICogQHBhcmFtIGV2ZW50VmFsdWVcbiAgICovXG4gIHJldHVybiBmdW5jdGlvbiB0cmFjayAoZXZlbnRDYXRlZ29yeSwgZXZlbnRBY3Rpb24sIGV2ZW50TGFiZWwsIGV2ZW50VmFsdWUpIHtcbiAgICBsZXQgdHJhY2tlZEV2ZW50ID0ge1xuICAgICAgaGl0VHlwZTogJ2V2ZW50JyxcbiAgICAgIGV2ZW50Q2F0ZWdvcnk6IGV2ZW50Q2F0ZWdvcnksXG4gICAgICBldmVudEFjdGlvbjogZXZlbnRBY3Rpb24sXG4gICAgICBldmVudExhYmVsOiBldmVudExhYmVsLFxuICAgICAgZXZlbnRWYWx1ZTogZXZlbnRWYWx1ZVxuICAgIH1cblxuICAgIGlmICghZXZlbnRDYXRlZ29yeSB8fCAhZXZlbnRBY3Rpb24pIHJldHVybjtcbiAgICBpZiAodHlwZW9mIGV2ZW50VmFsdWUgPT09ICdzdHJpbmcnKSByZXR1cm47XG5cbiAgICAvLyBHQSBpcyBsb2FkZWRcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5nYSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChkZWJ1ZyAmJiB3aW5kb3cuY29uc29sZSAmJiB3aW5kb3cuY29uc29sZS5sb2cpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1NlbmQgdHJhY2tlZEV2ZW50IHRvIEdBJywgdHJhY2tlZEV2ZW50KVxuICAgICAgfVxuICAgICAgd2luZG93LmdhKCdzZW5kJywgdHJhY2tlZEV2ZW50KVxuXG4gICAgICAvLyB3YWl0aW5nIGZvciBHQSB0byBsb2FkLCB1c2UgaW50ZXJuYWwgdmFyIHRvIGNvbGxlY3RcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZykge1xuICAgICAgICBjb25zb2xlLmxvZygnR0Egbm90IGxvYWRlZCB5ZXQsIHN0b3JlIHRyYWNrZWRFdmVudCcsIHRyYWNrZWRFdmVudClcbiAgICAgIH1cbiAgICAgIHRoaXMuc2F2ZWQucHVzaCh0cmFja2VkRXZlbnQpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gVHJhY2tFdmVudFxuIiwiLyoqXG4gKiBMVkw5OSBVdGlsc1xuICpcbiAqIFV0aWxpdGllcyB1c2VkIHRocm91Z2hvdXQgdGhlIGZyYW1ld29ya1xuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJylcbmNvbnN0IGluaGVyaXRhbmNlID0gcmVxdWlyZSgnLi9pbmhlcml0YW5jZScpXG4vLyBjb25zdCBzdXBlciA9IHJlcXVpcmUoJy4vc3VwZXInKVxuXG5jb25zdCB1dGlscyA9IHtcbiAgcGFyc2UsXG4gIGluaGVyaXRhbmNlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHNcbiIsIi8qKlxuICogTFZMOTkgSW5oZXJpdGFuY2UgdXRpbGl0aWVzXG4gKi9cblxuY29uc3QgUkVfUFJJVkFURSA9IC9eXy9cblxuLyoqXG4gKiBBc3NpZ24gcHVibGljIGdldHRlci9zZXR0ZXIgcHJvcGVydGllcyB0byB0aGUgdGFyZ2V0LiBUaGlzIHdpbGwgcmVmZXJlbmNlIHRoZSB0YXJnZXQgcHJvcGVydHkgKGlmIGl0IGlzIHNldClcbiAqIG90aGVyd2lzZSB1c2UgdGhlIGRlZmF1bHQgcHJvcGVydHkgdmFsdWUuIFlvdSBjYW4gYWxzbyB3aGl0ZWxpc3QgdGhlIHByb3BlcnRpZXMgeW91IHdhbnQgdG8gc2VsZWN0aXZlbHlcbiAqIGV4cG9zZSBieSBuYW1lLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0UHJvcFZhbHVlc1xuICogQHBhcmFtIHtBcnJheX0gd2hpdGVsaXN0XG4gKi9cbmZ1bmN0aW9uIGV4cG9zZUFsbFByb3BlcnRpZXMgKHRhcmdldCwgZGVmYXVsdFByb3BWYWx1ZXMsIHdoaXRlbGlzdCkge1xuICBsZXQgcHJvcGVydGllc1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyB0YXJnZXQgd2FzIGdpdmVuJylcbiAgfVxuXG4gIC8vIEZpbHRlciBub24td2hpdGVsaXN0ZWQgcHJvcGVydGllc1xuICBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXModGFyZ2V0KS5maWx0ZXIoaXRlbSA9PiB7XG4gICAgcmV0dXJuICh3aGl0ZWxpc3QgJiYgd2hpdGVsaXN0LmluY2x1ZGVzKGl0ZW0pKSB8fCAhd2hpdGVsaXN0XG4gIH0pXG5cbiAgLy8gQGRlYnVnXG4gIC8vIGNvbnNvbGUubG9nKCdmaWx0ZXJlZCBwcm9wZXJ0aWVzJywgcHJvcGVydGllcylcblxuICBpZiAoIXByb3BlcnRpZXMgfHwgIXByb3BlcnRpZXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyBwcm9wZXJ0aWVzIHdlcmUgZ2l2ZW4nKVxuICB9XG5cbiAgLy8gRGVmYXVsdCBwcm9wIHZhbHVlcyB0byB0YXJnZXRcbiAgaWYgKHR5cGVvZiBkZWZhdWx0UHJvcFZhbHVlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkZWZhdWx0UHJvcFZhbHVlcyA9IHRhcmdldFxuICB9XG5cbiAgLy8gUHJvY2VzcyBhbmQgZXhwb3NlIHRoZSBwcm9wZXJ0aWVzIG9uIHRoZSB0YXJnZXRcbiAgcHJvcGVydGllcy5mb3JFYWNoKHByb3BOYW1lID0+IHtcbiAgICBsZXQgdXNlUHJvcE5hbWUgPSBwcm9wTmFtZVxuXG4gICAgLy8gUHJpdmF0ZSB2YWx1ZXMgY2FuIG9ubHkgaGF2ZSBhIHB1YmxpYyBnZXR0ZXJcbiAgICBpZiAoUkVfUFJJVkFURS50ZXN0KHByb3BOYW1lKSkge1xuICAgICAgdXNlUHJvcE5hbWUgPSBwcm9wTmFtZS5yZXBsYWNlKFJFX1BSSVZBVEUsICcnKVxuXG4gICAgICAvLyBAZGVidWdcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdGb3VuZCBwcml2YXRlIHByb3BlcnR5Jywge1xuICAgICAgLy8gICBwcm9wTmFtZSxcbiAgICAgIC8vICAgdXNlUHJvcE5hbWUsXG4gICAgICAvLyAgIHByb3BWYWx1ZTogZGVmYXVsdFByb3BWYWx1ZXNbcHJvcE5hbWVdLFxuICAgICAgLy8gICB0YXJnZXRcbiAgICAgIC8vIH0pXG5cbiAgICAgIC8vIEhpZGUgb3JpZ2luYWwgcHJpdmF0ZSB2YWx1ZVxuICAgICAgLy8gT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgcHJvcE5hbWUsIHtcbiAgICAgIC8vICAgZW51bWVyYWJsZTogZmFsc2VcbiAgICAgIC8vIH0pXG5cbiAgICAgIC8vIENyZWF0ZSBwdWJsaWMgaW50ZXJmYWNlXG4gICAgICBjcmVhdGVQdWJsaWNHZXRQcm9wZXJ0eSh0YXJnZXQsIHByb3BOYW1lLCB1c2VQcm9wTmFtZSwgZGVmYXVsdFByb3BWYWx1ZXNbcHJvcE5hbWVdKVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gY29uc29sZS5sb2coJ0ZvdW5kIHB1YmxpYyBwcm9wZXJ0eScsIHtcbiAgICAgIC8vICAgcHJvcE5hbWUsXG4gICAgICAvLyAgIHVzZVByb3BOYW1lLFxuICAgICAgLy8gICBwcm9wVmFsdWU6IHByb3BlcnRpZXNbcHJvcE5hbWVdLFxuICAgICAgLy8gICB0YXJnZXRcbiAgICAgIC8vIH0pXG5cbiAgICAgIC8vIENyZWF0ZSBwdWJsaWMgaW50ZXJmYWNlXG4gICAgICBjcmVhdGVQdWJsaWNHZXRTZXRQcm9wZXJ0eSh0YXJnZXQsIHByb3BOYW1lLCB1c2VQcm9wTmFtZSwgZGVmYXVsdFByb3BWYWx1ZXNbcHJvcE5hbWVdKVxuICAgIH1cbiAgfSlcbn1cblxuLyoqXG4gKiBFeHBvc2Ugb25seSB0aGUgcHJpdmF0ZSBwcm9wZXJ0aWVzIGxpc3RlZCBvbiB0aGUgdGFyZ2V0IHdpdGggcHVibGljIGdldHRlciBwcm9wZXJ0eS4gV2hpdGVsaXN0IG9ubHkgdGhvc2UgeW91IHdhbnRcbiAqIGJ5IGFkZGluZyB0aGUgcHJvcGVydHkncyBuYW1lIHRvIHRoZSB3aGl0ZWxpc3Qge0FycmF5fVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSBkZWZhdWx0UHJvcFZhbHVlc1xuICogQHBhcmFtIHtBcnJheX0gd2hpdGVsaXN0XG4gKi9cbmZ1bmN0aW9uIGV4cG9zZVByaXZhdGVQcm9wZXJ0aWVzKHRhcmdldCwgZGVmYXVsdFByb3BWYWx1ZXMsIHdoaXRlbGlzdCkge1xuICBsZXQgcHJvcGVydGllc1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdObyB0YXJnZXQgd2FzIGdpdmVuJylcbiAgfVxuXG4gIC8vIEZpbHRlciBub24tcHJpdmF0ZSBvciBub24td2hpdGVsaXN0ZWQgcHJvcGVydGllc1xuICBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXModGFyZ2V0KS5maWx0ZXIoaXRlbSA9PiB7XG4gICAgaWYgKCh3aGl0ZWxpc3QgJiYgd2hpdGVsaXN0LmluY2x1ZGVzKGl0ZW0pKSB8fCAhd2hpdGVsaXN0KSB7XG4gICAgICByZXR1cm4gUkVfUFJJVkFURS50ZXN0KGl0ZW0pXG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9KVxuXG4gIC8vIEBkZWJ1Z1xuICAvLyBjb25zb2xlLmxvZygnZmlsdGVyZWQgcHJvcGVydGllcycsIHByb3BlcnRpZXMpXG5cbiAgLy8gU2lsZW50IGRlYXRoXG4gIGlmICghcHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIC8vIERlZmF1bHQgcHJvcCB2YWx1ZXMgdG8gdGFyZ2V0XG4gIGlmICh0eXBlb2YgZGVmYXVsdFByb3BWYWx1ZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZGVmYXVsdFByb3BWYWx1ZXMgPSB0YXJnZXRcbiAgfVxuXG4gIC8vIFByb2Nlc3MgYW5kIGV4cG9zZSB0aGUgcHJvcGVydGllcyBvbiB0aGUgdGFyZ2V0XG4gIHByb3BlcnRpZXMuZm9yRWFjaChwcm9wTmFtZSA9PiB7XG4gICAgbGV0IHVzZVByb3BOYW1lID0gcHJvcE5hbWVcblxuICAgIC8vIENyZWF0ZSBhIHB1YmxpYyBoYW5kbGUgZm9yIHRoZSBwcml2YXRlIHByb3BlcnR5IChyZW1vdmVzIHRoZSBcIl9cIiBhdCB0aGUgc3RhcnQpXG4gICAgdXNlUHJvcE5hbWUgPSBwcm9wTmFtZS5yZXBsYWNlKFJFX1BSSVZBVEUsICcnKVxuXG4gICAgLy8gQ3JlYXRlIHB1YmxpYyBpbnRlcmZhY2VcbiAgICBjcmVhdGVQdWJsaWNHZXRQcm9wZXJ0eSh0YXJnZXQsIHByb3BOYW1lLCB1c2VQcm9wTmFtZSwgZGVmYXVsdFByb3BWYWx1ZXNbcHJvcE5hbWVdKVxuICB9KVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIHB1YmxpYyBnZXR0ZXIgaW50ZXJmYWNlIGZvciBhIHByb3BlcnR5IG9uIGEgdGFyZ2V0XG4gKlxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldFByb3BOYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV3UHJvcE5hbWVcbiAqIEBwYXJhbSB7TWl4ZWR9IGRlZmF1bHRQcm9wVmFsdWUgVXNlZCBpZiB0aGUgdGFyZ2V0J3MgdGFyZ2V0UHJvcE5hbWUgaXMgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVB1YmxpY0dldFByb3BlcnR5ICh0YXJnZXQsIHRhcmdldFByb3BOYW1lLCBuZXdQcm9wTmFtZSwgZGVmYXVsdFByb3BWYWx1ZSkge1xuICBpZiAoIXRhcmdldC5oYXNPd25Qcm9wZXJ0eShuZXdQcm9wTmFtZSkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBuZXdQcm9wTmFtZSwge1xuICAgICAgZ2V0ICgpIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdGFyZ2V0W3RhcmdldFByb3BOYW1lXSAhPT0gJ3VuZGVmaW5lZCcgPyB0YXJnZXRbdGFyZ2V0UHJvcE5hbWVdIDogZGVmYXVsdFByb3BWYWx1ZSlcbiAgICAgIH0sXG4gICAgICBzZXQ6IHVuZGVmaW5lZCxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcHVibGljIGdldHRlci9zZXR0ZXIgaW50ZXJmYWNlIGZvciBhIHByb3BlcnR5IG9uIGEgdGFyZ2V0XG4gKlxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldFxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldFByb3BOYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gbmV3UHJvcE5hbWVcbiAqIEBwYXJhbSB7TWl4ZWR9IGRlZmF1bHRQcm9wVmFsdWUgVXNlZCBpZiB0aGUgdGFyZ2V0J3MgdGFyZ2V0UHJvcE5hbWUgaXMgdW5kZWZpbmVkXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVB1YmxpY0dldFNldFByb3BlcnR5ICh0YXJnZXQsIHRhcmdldFByb3BOYW1lLCBuZXdQcm9wTmFtZSwgZGVmYXVsdFByb3BWYWx1ZSkge1xuICBpZiAoIXRhcmdldC5oYXNPd25Qcm9wZXJ0eShuZXdQcm9wTmFtZSkpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBuZXdQcm9wTmFtZSwge1xuICAgICAgZ2V0ICgpIHtcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdGFyZ2V0W3RhcmdldFByb3BOYW1lXSAhPT0gJ3VuZGVmaW5lZCcgPyB0YXJnZXRbdGFyZ2V0UHJvcE5hbWVdIDogZGVmYXVsdFByb3BWYWx1ZSlcbiAgICAgIH0sXG4gICAgICBzZXQgKG5ld1ZhbHVlKSB7XG4gICAgICAgIHRhcmdldFt0YXJnZXRQcm9wTmFtZV0gPSBuZXdWYWx1ZVxuICAgICAgfSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmNvbnN0IGluaGVyaXRhbmNlID0ge1xuICBleHBvc2VBbGxQcm9wZXJ0aWVzLFxuICBleHBvc2VQcml2YXRlUHJvcGVydGllcyxcbiAgY3JlYXRlUHVibGljR2V0UHJvcGVydHksXG4gIGNyZWF0ZVB1YmxpY0dldFNldFByb3BlcnR5XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5oZXJpdGFuY2VcbiIsIi8qKlxuICogTFZMOTkgUGFyc2VcbiAqXG4gKiBQYXJzZSBzdHJpbmdzIG9yIHRyYW5zZm9ybSBmcm9tIG9uZSBmb3JtYXQgdG8gYW5vdGhlclxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgX19sb2dnZXJQYXRoID0gJ2x2bDk5L3V0aWxzL3BhcnNlJ1xuY29uc3Qgb2JqZWN0UGF0aCA9IHJlcXVpcmUoJ29iamVjdC1wYXRoJylcblxuLyoqXG4gKiBDb2VyY2UgYSB2YWx1ZSB0byBpdHMgcHJpbWl0aXZlIHR5cGVcbiAqXG4gKiBAcGFyYW0ge01peGVkfSBpbnB1dFxuICogQHJldHVybnMge01peGVkfVxuICovXG5mdW5jdGlvbiBjb2VyY2VUb1ByaW1pdGl2ZVR5cGUgKGlucHV0KSB7XG4gIC8vIE5vbi1zdHJpbmc/IEp1c3QgcmV0dXJuIGl0IHN0cmFpZ2h0IGF3YXlcbiAgaWYgKHR5cGVvZiBpbnB1dCAhPT0gJ3N0cmluZycpIHJldHVybiBpbnB1dFxuXG4gIC8vIFRyaW0gYW55IHdoaXRlc3BhY2VcbiAgaW5wdXQgPSAoaW5wdXQgKyAnJykudHJpbSgpXG5cbiAgLy8gTnVtYmVyXG4gIGlmICgvXlxcLT8oPzpcXGQqW1xcLlxcLF0pKlxcZCooPzpbZUVdKD86XFwtP1xcZCspPyk/JC8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChpbnB1dClcblxuICAvLyBCb29sZWFuOiB0cnVlXG4gIH0gZWxzZSBpZiAoL14odHJ1ZXwxKSQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIHRydWVcblxuICAvLyBOYU5cbiAgfSBlbHNlIGlmICgvXk5hTiQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIE5hTlxuXG4gIC8vIHVuZGVmaW5lZFxuICB9IGVsc2UgaWYgKC9edW5kZWZpbmVkJC8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkXG5cbiAgLy8gbnVsbFxuICB9IGVsc2UgaWYgKC9ebnVsbCQvLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIG51bGxcblxuICAvLyBCb29sZWFuOiBmYWxzZVxuICB9IGVsc2UgaWYgKC9eKGZhbHNlfDApJC8udGVzdChpbnB1dCkgfHwgaW5wdXQgPT09ICcnKSB7XG4gICAgcmV0dXJuIGZhbHNlXG5cbiAgLy8gSlNPTjogc3RhcnRzIHdpdGggWyBvciB7IGFuZCBlbmRzIHdpdGggXSBvciB9XG4gIH0gZWxzZSBpZiAoL15bXFxbXFx7XS8udGVzdChpbnB1dCkgJiYgL1tcXF1cXH1dJC8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gY29udmVydFN0cmluZ1RvSnNvbihpbnB1dClcblxuICAvLyBTdHJpbmcgbWFya2VkIHdpdGggc2luZ2xlL2RvdWJsZSBxdW90YXRpb24gbWFya3NcbiAgfSBlbHNlIGlmICgvXlsnXCJdfFtcIiddJC8pIHtcbiAgICByZXR1cm4gaW5wdXQucmVwbGFjZSgvXlsnXCJdfFsnXCJdJC9nLCAnJylcbiAgfVxuXG4gIC8vIERlZmF1bHQgdG8gc3RyaW5nXG4gIHJldHVybiBpbnB1dFxufVxuXG4vKipcbiAqIENvbnZlcnQgdmFsdWUgdG8gYW4gZXhwbGljaXQgYm9vbGVhbi4gTmFtZWx5IGZvciBwcm9jZXNzaW5nIHN0cmluZyB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtNaXhlZH0gaW5wdXRcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5mdW5jdGlvbiBjb252ZXJ0VG9Cb29sZWFuIChpbnB1dCkge1xuICAvLyBBbHJlYWR5IGJvb2xlYW5cbiAgaWYgKGlucHV0ID09PSB0cnVlIHx8IGlucHV0ID09PSBmYWxzZSkge1xuICAgIHJldHVybiBpbnB1dFxuICB9XG5cbiAgLy8gQ2FzZXMgb2YgdHJ1dGh5L2ZhbHNleSB2YWx1ZXNcbiAgc3dpdGNoIChpbnB1dCkge1xuICAgIGNhc2UgMTpcbiAgICBjYXNlICcxJzpcbiAgICBjYXNlICd0cnVlJzpcbiAgICAgIHJldHVybiB0cnVlXG5cbiAgICBjYXNlIDA6XG4gICAgY2FzZSAnMCc6XG4gICAgY2FzZSAnZmFsc2UnOlxuICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgY2FzZSBudWxsOlxuICAgIGNhc2UgJ251bGwnOlxuICAgIGNhc2UgTmFOOlxuICAgIGNhc2UgJ05hTic6XG4gICAgY2FzZSAnJzpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG5cbiAgLy8gT3RoZXJ3aXNlLi4uXG4gIHJldHVybiAhIWlucHV0XG59XG5cbi8qKlxuICogQ29udmVydCBhIHN0cmluZyB0byBKU09OIG9yIGp1c3QgcmV0dXJuIHRoZSBzdHJpbmcgaWYgY2FuJ3RcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gaW5wdXRcbiAqIEByZXR1cm5zIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRTdHJpbmdUb0pzb24gKGlucHV0KSB7XG4gIGxldCBvdXRwdXQgPSBpbnB1dFxuXG4gIC8vIENvbnZlcnQgc3RyaW5nIGRhdGEgdG8gSlNPTlxuICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgIHRyeSB7XG4gICAgICBvdXRwdXQgPSBKU09OLnBhcnNlKGlucHV0KVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoYCR7X2xvZ2dlclBhdGh9LmNvbnZlcnRTdHJpbmdUb0pzb246IEVycm9yIHBhcnNpbmcgc3RyaW5nIEpTT04gZGF0YWAsIGlucHV0KVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIHRvIGEgZmxvYXQuXG4gKiBUaGlzIGFsc28gY29udmVydHMgbnVtYmVyIGNvbnN0YW50cyBsaWtlIEluZmluaXR5IGFuZCBOYU4gdG8gemVyby5cbiAqXG4gKiBAcGFyYW0gaW5wdXRcbiAqIEByZXR1cm5zIHsqfVxuICovXG5mdW5jdGlvbiBjb252ZXJ0U3RyaW5nVG9GbG9hdCAoaW5wdXQpIHtcbiAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gaW5wdXRcbiAgfVxuXG4gIGxldCBvdXRwdXQgPSBwYXJzZUZsb2F0KChpbnB1dCArICcnKS5yZXBsYWNlKC9bXlxcZFxcLVxcLl0rL2csICcnKSlcblxuICAvLyBJbmZpbml0eSAvIE5hTlxuICBpZiAoIWlzRmluaXRlKGlucHV0KSB8fCBpc05hTihpbnB1dCkgfHwgaXNOYU4ob3V0cHV0KSkge1xuICAgIG91dHB1dCA9IDBcbiAgfVxuXG4gIHJldHVybiBvdXRwdXRcbn1cblxuLyoqXG4gKiBFeHRyYWN0IGtleS12YWx1ZXMgZnJvbSBhIHN0cmluZyB3aGljaCBpcyBsaWtlIGEgQ1NTIGNsYXNzIGRlY2xhcmF0aW9uLCBlLmcuIGBrZXk6IHZhbHVlOyBrZXk6IHZhbHVlYFxuICpcbiAqIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBpbnRlcmVzdGluZyBhcyBpdCBjYW4gdGFrZSBhIG5hbWUgd2l0aCBkb3RzXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RDbGFzc0RldGFpbHMgKGlucHV0KSB7XG4gIGxldCBvdXRwdXQgPSB7fVxuICBsZXQgaW5wdXRQYXJ0cyA9IFtpbnB1dF1cblxuICAvLyBDaGVjayBpZiBpdCBoYXMgc2VtaS1jb2xvbnNcbiAgaWYgKC87Ly50ZXN0KGlucHV0KSkge1xuICAgIGlucHV0UGFydHMgPSBpbnB1dC5zcGxpdCgnOycpXG4gIH1cblxuICAvLyBQcm9jZXNzIGVhY2ggaW5wdXQgcGFydFxuICBpbnB1dFBhcnRzLmZvckVhY2goKHBhcnQpID0+IHtcbiAgICBwYXJ0ID0gcGFydC50cmltKClcbiAgICBpZiAocGFydCkge1xuICAgICAgbGV0IHBhcnRQYXJ0cyA9IHBhcnQubWF0Y2goLyhbYS16MC05Xy4tXSspOihbXjtdKyk7Py9pKVxuICAgICAgbGV0IHBhcnROYW1lID0gcGFydFBhcnRzWzFdLnRyaW0oKVxuICAgICAgbGV0IHBhcnRWYWx1ZSA9IGNvZXJjZVRvUHJpbWl0aXZlVHlwZShwYXJ0UGFydHNbMl0udHJpbSgpKVxuXG4gICAgICAvLyBAZGVidWdcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdwYXJzZWQgcGFydCcsIHtcbiAgICAgIC8vICAgcGFydCxcbiAgICAgIC8vICAgcGFydE5hbWUsXG4gICAgICAvLyAgIHBhcnRWYWx1ZSxcbiAgICAgIC8vIH0pXG5cbiAgICAgIC8vIEVuc3VyZSBvdXRwdXQgb2JqZWN0IGV4aXN0cyBpZiB1c2luZyBkb3Qgbm90YXRpb25cbiAgICAgIGlmICgvXFwuLy50ZXN0KHBhcnROYW1lKSkge1xuICAgICAgICBsZXQgb2JqUGFydHMgPSBwYXJ0TmFtZS5zcGxpdCgnLicpXG4gICAgICAgIGxldCBvYmpQYXJ0UGF0aCA9ICcnXG5cbiAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwYXJ0IGhhcyBkb3Qgbm90YXRpb24nLCB7XG4gICAgICAgIC8vICAgb3V0cHV0LFxuICAgICAgICAvLyAgIHBhcnROYW1lLFxuICAgICAgICAvLyAgIHBhcnRWYWx1ZSxcbiAgICAgICAgLy8gICBvYmpQYXJ0cyxcbiAgICAgICAgLy8gICBvYmpQYXJ0UGF0aFxuICAgICAgICAvLyB9KVxuXG4gICAgICAgIGZvciAobGV0IG9ialBhcnRJbmRleCA9IDA7IG9ialBhcnRJbmRleCA8IChvYmpQYXJ0cy5sZW5ndGggLSAxKTsgb2JqUGFydEluZGV4KyspIHtcbiAgICAgICAgICBvYmpQYXJ0UGF0aCArPSAob2JqUGFydEluZGV4ID4gMCA/ICcuJyA6ICcnKSArIG9ialBhcnRzW29ialBhcnRJbmRleF1cblxuICAgICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKG9ialBhcnRQYXRoKVxuXG4gICAgICAgICAgaWYgKCFvYmplY3RQYXRoLmhhcyhvdXRwdXQsIG9ialBhcnRQYXRoKSkge1xuICAgICAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2V0dGluZyBvYmplY3QgcGFydCBwYXRoJywge1xuICAgICAgICAgICAgLy8gICBvdXRwdXQsXG4gICAgICAgICAgICAvLyAgIHBhcnROYW1lLFxuICAgICAgICAgICAgLy8gICBwYXJ0VmFsdWUsXG4gICAgICAgICAgICAvLyAgIG9ialBhcnRJbmRleCxcbiAgICAgICAgICAgIC8vICAgb2JqUGFydFBhdGhcbiAgICAgICAgICAgIC8vIH0pXG5cbiAgICAgICAgICAgIG9iamVjdFBhdGguc2V0KG91dHB1dCwgb2JqUGFydFBhdGgsIHt9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTZXQgdmlhIG9iamVjdFBhdGhcbiAgICAgIG9iamVjdFBhdGguc2V0KG91dHB1dCwgcGFydE5hbWUsIHBhcnRWYWx1ZSlcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG4vKipcbiAqIEV4dHJhY3QgdGhlIHRyaWdnZXIncyB0YXJnZXQgZGV0YWlsc1xuICpcbiAqIFRoaXMgYWxsb3dzIHlvdSB0byBleHRyYWN0IHRoZSBuZWNlc3NhcnkgZGF0YSBmcm9tIHRoZSBzdHJpbmcgYW5kIHRoZSBnbG9iYWwgd2luZG93L2RvY3VtZW50IGF2YWlsYWJsZSwgdG8gY3JlYXRlXG4gKiBkeW5hbWljIGV2ZW50IGJpbmRpbmdzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gaW5wdXRcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSBjb250ZXh0IERlZmF1bHRzIHRvIGB3aW5kb3dgLiBXaGVyZSB0byBmaW5kIHRoZSBgZG9gIGFjdGlvblxuICogQHJldHVybnMge09iamVjdH0gPT4geyBldmVudE5hbWU6IHtTdHJpbmd9LCBtZXRob2Q6IHtGdW5jdGlvbn0sIHNlbGVjdG9yOiB7U3RyaW5nfSwgdGFyZ2V0OiB7T2JqZWN0fSB9XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RUcmlnZ2VyRGV0YWlscyhpbnB1dCwgY29udGV4dCkge1xuICBsZXQgdHJpZ2dlciA9IGlucHV0XG5cbiAgaWYgKCFjb250ZXh0KSB7XG4gICAgY29udGV4dCA9IHdpbmRvd1xuICB9XG5cbiAgLy8gU3RyaW5nIGlucHV0IGdpdmVuXG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gVHJ5IEpTT04gZmlyc3RcbiAgICBpZiAoL157Ly50ZXN0KGlucHV0KSkge1xuICAgICAgdHJpZ2dlciA9IGNvbnZlcnRTdHJpbmdUb0pzb24oaW5wdXQpXG5cbiAgICAgIC8vIFRyeSBjbGFzcyBkZXRhaWxzXG4gICAgfSBlbHNlIGlmICgvXlthLXowLTlfLV0rOi8udGVzdChpbnB1dCkpIHtcbiAgICAgIHRyaWdnZXIgPSBleHRyYWN0Q2xhc3NEZXRhaWxzKGlucHV0KVxuXG4gICAgICAvLyBTdHJpbmcgd2l0aCBubyBzcGFjZXNcbiAgICB9IGVsc2UgaWYgKCEvIC8udGVzdChpbnB1dCkpIHtcbiAgICAgIHRyaWdnZXIgPSB7XG4gICAgICAgIGRvOiBpbnB1dFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIE5vIG9iamVjdCBmb3VuZCFcbiAgaWYgKHR5cGVvZiB0cmlnZ2VyICE9PSAnb2JqZWN0Jykge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtfbG9nZ2VyUGF0aH0uZXh0cmFjdFRyaWdnZXJEZXRhaWxzOiBpbnB1dCB3YXMgbm90IHZhbGlkIEpTT04gb3IgQ1NTLXN0eWxlIGRlZmluaXRpb25gKVxuICB9XG5cbiAgLy8gRW5zdXJlIGl0IGhhcyBgb25gIGFuZCBgZG9gIHByb3BlcnRpZXNcbiAgLy8gaWYgKCFvYmplY3RQYXRoLmhhcyh0cmlnZ2VyLCAnb24nKSkge1xuICAvLyAgIHRocm93IG5ldyBFcnJvcihgJHtfbG9nZ2VyUGF0aH0uZXh0cmFjdFRyaWdnZXJEZXRhaWxzOiB0cmlnZ2VyIGlzIG1pc3NpbmcgcmVxdWlyZWQgJ29uJyBwcm9wZXJ0eWApXG4gIC8vIH1cbiAgaWYgKCFvYmplY3RQYXRoLmhhcyh0cmlnZ2VyLCAnZG8nKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJHtfbG9nZ2VyUGF0aH0uZXh0cmFjdFRyaWdnZXJEZXRhaWxzOiB0cmlnZ2VyIGlzIG1pc3NpbmcgcmVxdWlyZWQgJ2RvJyBwcm9wZXJ0eWApXG4gIH1cblxuICAvLyBJZiB0YXJnZXQgaXMgc2V0LCB1c2UgcmVhbCB2YWx1ZXMgZm9yIHdpbmRvdyBhbmQgZG9jdW1lbnRcbiAgaWYgKG9iamVjdFBhdGguaGFzKHRyaWdnZXIsICd0YXJnZXQnKSkge1xuICAgIHN3aXRjaCAodHJpZ2dlci50YXJnZXQpIHtcbiAgICAgIGNhc2UgJ3NlbGYnOlxuICAgICAgICAvLyBjb25zb2xlLmxvZygnVGFyZ2V0aW5nIHNlbGYnLCBjb250ZXh0KVxuICAgICAgICB0cmlnZ2VyLnRhcmdldCA9IGNvbnRleHRcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgICB0cmlnZ2VyLnRhcmdldCA9IGRvY3VtZW50XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ3dpbmRvdyc6XG4gICAgICAgIHRyaWdnZXIudGFyZ2V0ID0gd2luZG93XG4gICAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgLy8gRG8gc2FtZSBhcyBhYm92ZSBpZiBhIGNvbnRleHQgd2FzIHNldCFcbiAgaWYgKG9iamVjdFBhdGguaGFzKHRyaWdnZXIsICdjb250ZXh0JykpIHtcbiAgICBzd2l0Y2ggKHRyaWdnZXIuY29udGV4dCkge1xuICAgICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgICB0cmlnZ2VyLmNvbnRleHQgPSBkb2N1bWVudFxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICd3aW5kb3cnOlxuICAgICAgICB0cmlnZ2VyLmNvbnRleHQgPSB3aW5kb3dcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdHJpZ2dlci5jb250ZXh0ID0gY29udGV4dFxuICB9XG5cbiAgcmV0dXJuIHRyaWdnZXJcbn1cblxuLyoqXG4gKiBFbmNvZGUgc3RyaW5nIHRvIFVSTCwgd2l0aCBzcGFjZXMgdGhhdCBhcmUgcmVwcmVzZW50ZWQgYXMgYCtgXG4gKiBTZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL2VuY29kZVVSSUNvbXBvbmVudFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dFxuICogQHJldHVybnMge1N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZml4ZWRFbmNvZGVVUklDb21wb25lbnQgKGlucHV0KSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQoaW5wdXQpLnJlcGxhY2UoL1shJygpKl0vZywgZnVuY3Rpb24oYykge1xuICAgIHJldHVybiAnJScgKyBjLmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMTYpO1xuICB9KVxufVxuXG4vKipcbiAqIEdldCB0aGUgdGFyZ2V0IG9iamVjdCBieSBhIHN0cmluZyBzZWxlY3RvclxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0YXJnZXRcbiAqIEBwYXJhbSB7T2JqZWN0fSBjb250ZXh0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGdldFRhcmdldEJ5U2VsZWN0b3IgKHRhcmdldCwgY29udGV4dCkge1xuICAvLyBEZWZhdWx0IHRvIGRvY3VtZW50XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGFyZ2V0ID0gZG9jdW1lbnRcbiAgfVxuXG4gIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgIC8vIFNwZWNpYWwgc3RyaW5nIHZhbHVlcyB0byBnZXQgdGhlIGFjdHVhbCBvYmplY3RcbiAgICBzd2l0Y2ggKHRhcmdldCkge1xuICAgICAgY2FzZSAnZG9jdW1lbnQnOlxuICAgICAgICB0YXJnZXQgPSBkb2N1bWVudFxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICd3aW5kb3cnOlxuICAgICAgICB0YXJnZXQgPSB3aW5kb3dcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAnc2VsZic6XG4gICAgICAgIHRhcmdldCA9IGNvbnRleHRcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0XG59XG5cbi8qKlxuICogR2V0IHRoZSB0YXJnZXQgb2JqZWN0J3Mgc3RyaW5nIHNlbGVjdG9yXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm4ge3VuZGVmaW5lZHxTdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldFRhcmdldFNlbGVjdG9yICh0YXJnZXQsIGNvbnRleHQpIHtcbiAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHRhcmdldFxuICB9XG5cbiAgLy8gV2luZG93XG4gIGlmICgkLmlzV2luZG93KHRhcmdldCkpIHtcbiAgICByZXR1cm4gJ3dpbmRvdydcblxuICAgIC8vIERvY3VtZW50XG4gIH0gZWxzZSBpZiAodGFyZ2V0ID09PSBkb2N1bWVudCkge1xuICAgIHJldHVybiAnZG9jdW1lbnQnXG5cbiAgICAvLyBTZWxmXG4gIH0gZWxzZSBpZiAodGFyZ2V0Lmhhc093blByb3BlcnR5KCd1dWlkJykpIHtcbiAgICByZXR1cm4gYFtkYXRhLWNvbXBvbmVudC1pZD1cIiR7dGFyZ2V0LnV1aWR9XCJdYFxuXG4gICAgLy8gSFRNTCBFbGVtXG4gIH0gZWxzZSBpZiAoJCh0YXJnZXQpLmxlbmd0aCkge1xuICAgIGlmICgkKHRhcmdldCkuYXR0cignZGF0YS1jb21wb25lbnQtaWQnKSkge1xuICAgICAgcmV0dXJuIGBbZGF0YS1jb21wb25lbnQtaWQ9XCIkeyQodGFyZ2V0KS5hdHRyKCdkYXRhLWNvbXBvbmVudC1pZCcpfVwiXWBcbiAgICB9IGVsc2UgaWYgKCQodGFyZ2V0KS5hdHRyKCdpZCcpKSB7XG4gICAgICByZXR1cm4gYCMkeyQodGFyZ2V0KS5hdHRyKCdpZCcpfWBcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGAke3RhcmdldC50YWdOYW1lLnRvTG93ZXJDYXNlKCl9YFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXRcbn1cblxuLyoqXG4gKiBQYXJzZSB0aGUgdGFyZ2V0IGV2ZW50IG5hbWVzXG4gKlxuICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGV2ZW50TmFtZXMgZS5nLiBgQ29tcG9uZW50OmN1c3RvbUV2ZW50IGRvbTptb3VzZW92ZXJgXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIE9wdGlvbmFsIG5hbWVzcGFjZSB0byBhc3NpZ24gZWFjaCBleHRyYWN0ZWQgY3VzdG9tIChub24tRE9NKSBldmVudCBuYW1lXG4gKiBAcmV0dXJucyB7QXJyYXl9XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RUYXJnZXRFdmVudE5hbWVzIChpbnB1dEV2ZW50TmFtZXMsIG5hbWVzcGFjZSkge1xuICBsZXQgdGFyZ2V0RXZlbnROYW1lcyA9IFtdXG4gIGxldCBldmVudE5hbWVzID0gaW5wdXRFdmVudE5hbWVzXG5cbiAgaWYgKHR5cGVvZiBpbnB1dEV2ZW50TmFtZXMgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gU3BsaXQgZXZlbnROYW1lcyBieSBzcGFjZXNcbiAgICBpZiAoL1xccy8udGVzdChpbnB1dEV2ZW50TmFtZXMpKSB7XG4gICAgICBldmVudE5hbWVzID0gaW5wdXRFdmVudE5hbWVzLnNwbGl0KC9cXHMrLylcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnROYW1lcyA9IFsgaW5wdXRFdmVudE5hbWVzIF1cbiAgICB9XG4gIH1cblxuICBpZiAoZXZlbnROYW1lcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgLy8gUHJvY2VzcyBlYWNoIGV2ZW50IG5hbWVcbiAgICBldmVudE5hbWVzLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgIC8vIERlZmF1bHQgdG8gbmFtZXNwYWNlZCBldmVudCBuYW1lXG4gICAgICBsZXQgdGFyZ2V0RXZlbnROYW1lID0gKHR5cGVvZiBuYW1lc3BhY2UgPT09ICdzdHJpbmcnICYmIG5hbWVzcGFjZSAhPT0gJycgPyBgJHtuYW1lc3BhY2V9OiR7ZXZlbnROYW1lfWAgOiBldmVudE5hbWUpXG5cbiAgICAgIC8vIFJlbW92ZSBhbnkgcmVmZXJlbmNlIHRvIHRoZSBuYXRpdmUgRE9NIGV2ZW50IG5hbWVzcGFjZVxuICAgICAgaWYgKC9eZG9tOi9pLnRlc3QoZXZlbnROYW1lKSkge1xuICAgICAgICB0YXJnZXRFdmVudE5hbWUgPSBldmVudE5hbWUucmVwbGFjZSgvXmRvbVxcOi9naSwgJycsIGV2ZW50TmFtZSlcbiAgICAgIH1cblxuICAgICAgLy8gQWRkIHRvIHRoZSBsaXN0XG4gICAgICB0YXJnZXRFdmVudE5hbWVzLnB1c2godGFyZ2V0RXZlbnROYW1lKVxuICAgIH0pXG5cbiAgICByZXR1cm4gdGFyZ2V0RXZlbnROYW1lc1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlXG59XG5cbmNvbnN0IHBhcnNlID0ge1xuICBjb2VyY2VUb1ByaW1pdGl2ZVR5cGUsXG4gIGNvbnZlcnRUb0Jvb2xlYW4sXG4gIGNvbnZlcnRTdHJpbmdUb0pzb24sXG4gIGNvbnZlcnRTdHJpbmdUb0Zsb2F0LFxuICBleHRyYWN0Q2xhc3NEZXRhaWxzLFxuICBleHRyYWN0VHJpZ2dlckRldGFpbHMsXG4gIGZpeGVkRW5jb2RlVVJJQ29tcG9uZW50LFxuICBnZXRUYXJnZXRCeVNlbGVjdG9yLFxuICBnZXRUYXJnZXRTZWxlY3RvcixcbiAgZXh0cmFjdFRhcmdldEV2ZW50TmFtZXNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxuIiwiLyoqXG4gKiBMVkw5OVxuICovXG5cbmNvbnN0IGx2bDk5ID0gcmVxdWlyZSgnLi9lczYnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGx2bDk5XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIGZsYWdzIGZyb20gdGhlaXIgY29lcmNlZCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlRmxhZ3MgPSAvXFx3KiQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIHN1cHBvcnRlZCBieSBgXy5jbG9uZWAuICovXG52YXIgY2xvbmVhYmxlVGFncyA9IHt9O1xuY2xvbmVhYmxlVGFnc1thcmdzVGFnXSA9IGNsb25lYWJsZVRhZ3NbYXJyYXlUYWddID1cbmNsb25lYWJsZVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gY2xvbmVhYmxlVGFnc1tkYXRhVmlld1RhZ10gPVxuY2xvbmVhYmxlVGFnc1tib29sVGFnXSA9IGNsb25lYWJsZVRhZ3NbZGF0ZVRhZ10gPVxuY2xvbmVhYmxlVGFnc1tmbG9hdDMyVGFnXSA9IGNsb25lYWJsZVRhZ3NbZmxvYXQ2NFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbaW50MTZUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50MzJUYWddID0gY2xvbmVhYmxlVGFnc1ttYXBUYWddID1cbmNsb25lYWJsZVRhZ3NbbnVtYmVyVGFnXSA9IGNsb25lYWJsZVRhZ3Nbb2JqZWN0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3JlZ2V4cFRhZ10gPSBjbG9uZWFibGVUYWdzW3NldFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tzdHJpbmdUYWddID0gY2xvbmVhYmxlVGFnc1tzeW1ib2xUYWddID1cbmNsb25lYWJsZVRhZ3NbdWludDhUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50OENsYW1wZWRUYWddID1cbmNsb25lYWJsZVRhZ3NbdWludDE2VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG5jbG9uZWFibGVUYWdzW2Vycm9yVGFnXSA9IGNsb25lYWJsZVRhZ3NbZnVuY1RhZ10gPVxuY2xvbmVhYmxlVGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBBZGRzIHRoZSBrZXktdmFsdWUgYHBhaXJgIHRvIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gcGFpciBUaGUga2V5LXZhbHVlIHBhaXIgdG8gYWRkLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgbWFwYC5cbiAqL1xuZnVuY3Rpb24gYWRkTWFwRW50cnkobWFwLCBwYWlyKSB7XG4gIC8vIERvbid0IHJldHVybiBgbWFwLnNldGAgYmVjYXVzZSBpdCdzIG5vdCBjaGFpbmFibGUgaW4gSUUgMTEuXG4gIG1hcC5zZXQocGFpclswXSwgcGFpclsxXSk7XG4gIHJldHVybiBtYXA7XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIGBzZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYWRkLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgc2V0YC5cbiAqL1xuZnVuY3Rpb24gYWRkU2V0RW50cnkoc2V0LCB2YWx1ZSkge1xuICAvLyBEb24ndCByZXR1cm4gYHNldC5hZGRgIGJlY2F1c2UgaXQncyBub3QgY2hhaW5hYmxlIGluIElFIDExLlxuICBzZXQuYWRkKHZhbHVlKTtcbiAgcmV0dXJuIHNldDtcbn1cblxuLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnJlZHVjZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5pdEFjY3VtXSBTcGVjaWZ5IHVzaW5nIHRoZSBmaXJzdCBlbGVtZW50IG9mIGBhcnJheWAgYXNcbiAqICB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlSZWR1Y2UoYXJyYXksIGl0ZXJhdGVlLCBhY2N1bXVsYXRvciwgaW5pdEFjY3VtKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIGlmIChpbml0QWNjdW0gJiYgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBhcnJheVsrK2luZGV4XTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gaXRzIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAqL1xuZnVuY3Rpb24gbWFwVG9BcnJheShtYXApIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShtYXAuc2l6ZSk7XG5cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5LFxuICAgIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpLFxuICAgIG9iamVjdENyZWF0ZSA9IE9iamVjdC5jcmVhdGUsXG4gICAgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgICBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUdldFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICAgIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpLFxuICAgIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3JyksXG4gICAgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyksXG4gICAgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKSxcbiAgICBXZWFrTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdXZWFrTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGUoZW50cmllcyk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfX1snZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBjYWNoZSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChjYWNoZSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGNhY2hlLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYWNoZSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGNhY2hlLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXNzaWduVmFsdWVgIGV4Y2VwdCB0aGF0IGl0IGRvZXNuJ3QgYXNzaWduXG4gKiBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICFlcShvYmplY3Rba2V5XSwgdmFsdWUpKSB8fFxuICAgICAgKHR5cGVvZiBrZXkgPT0gJ251bWJlcicgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBBc3NpZ25zIGB2YWx1ZWAgdG8gYGtleWAgb2YgYG9iamVjdGAgaWYgdGhlIGV4aXN0aW5nIHZhbHVlIGlzIG5vdCBlcXVpdmFsZW50XG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgaWYgKCEoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYgZXEob2JqVmFsdWUsIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmFzc2lnbmAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzXG4gKiBvciBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnbihvYmplY3QsIHNvdXJjZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2xvbmVgIGFuZCBgXy5jbG9uZURlZXBgIHdoaWNoIHRyYWNrc1xuICogdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRnVsbF0gU3BlY2lmeSBhIGNsb25lIGluY2x1ZGluZyBzeW1ib2xzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XSBUaGUga2V5IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIHBhcmVudCBvYmplY3Qgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgdGhlaXIgY2xvbmUgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGNsb25lZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUNsb25lKHZhbHVlLCBpc0RlZXAsIGlzRnVsbCwgY3VzdG9taXplciwga2V5LCBvYmplY3QsIHN0YWNrKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChjdXN0b21pemVyKSB7XG4gICAgcmVzdWx0ID0gb2JqZWN0ID8gY3VzdG9taXplcih2YWx1ZSwga2V5LCBvYmplY3QsIHN0YWNrKSA6IGN1c3RvbWl6ZXIodmFsdWUpO1xuICB9XG4gIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSk7XG4gIGlmIChpc0Fycikge1xuICAgIHJlc3VsdCA9IGluaXRDbG9uZUFycmF5KHZhbHVlKTtcbiAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgcmV0dXJuIGNvcHlBcnJheSh2YWx1ZSwgcmVzdWx0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhZyA9IGdldFRhZyh2YWx1ZSksXG4gICAgICAgIGlzRnVuYyA9IHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG5cbiAgICBpZiAoaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY2xvbmVCdWZmZXIodmFsdWUsIGlzRGVlcCk7XG4gICAgfVxuICAgIGlmICh0YWcgPT0gb2JqZWN0VGFnIHx8IHRhZyA9PSBhcmdzVGFnIHx8IChpc0Z1bmMgJiYgIW9iamVjdCkpIHtcbiAgICAgIGlmIChpc0hvc3RPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lT2JqZWN0KGlzRnVuYyA/IHt9IDogdmFsdWUpO1xuICAgICAgaWYgKCFpc0RlZXApIHtcbiAgICAgICAgcmV0dXJuIGNvcHlTeW1ib2xzKHZhbHVlLCBiYXNlQXNzaWduKHJlc3VsdCwgdmFsdWUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFjbG9uZWFibGVUYWdzW3RhZ10pIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA/IHZhbHVlIDoge307XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBpbml0Q2xvbmVCeVRhZyh2YWx1ZSwgdGFnLCBiYXNlQ2xvbmUsIGlzRGVlcCk7XG4gICAgfVxuICB9XG4gIC8vIENoZWNrIGZvciBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCByZXR1cm4gaXRzIGNvcnJlc3BvbmRpbmcgY2xvbmUuXG4gIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KHZhbHVlKTtcbiAgaWYgKHN0YWNrZWQpIHtcbiAgICByZXR1cm4gc3RhY2tlZDtcbiAgfVxuICBzdGFjay5zZXQodmFsdWUsIHJlc3VsdCk7XG5cbiAgaWYgKCFpc0Fycikge1xuICAgIHZhciBwcm9wcyA9IGlzRnVsbCA/IGdldEFsbEtleXModmFsdWUpIDoga2V5cyh2YWx1ZSk7XG4gIH1cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHZhbHVlLCBmdW5jdGlvbihzdWJWYWx1ZSwga2V5KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBrZXkgPSBzdWJWYWx1ZTtcbiAgICAgIHN1YlZhbHVlID0gdmFsdWVba2V5XTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgcG9wdWxhdGUgY2xvbmUgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBhc3NpZ25WYWx1ZShyZXN1bHQsIGtleSwgYmFzZUNsb25lKHN1YlZhbHVlLCBpc0RlZXAsIGlzRnVsbCwgY3VzdG9taXplciwga2V5LCB2YWx1ZSwgc3RhY2spKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY3JlYXRlYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFzc2lnbmluZ1xuICogcHJvcGVydGllcyB0byB0aGUgY3JlYXRlZCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGUgVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQ3JlYXRlKHByb3RvKSB7XG4gIHJldHVybiBpc09iamVjdChwcm90bykgPyBvYmplY3RDcmVhdGUocHJvdG8pIDoge307XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldEFsbEtleXNgIGFuZCBgZ2V0QWxsS2V5c0luYCB3aGljaCB1c2VzXG4gKiBga2V5c0Z1bmNgIGFuZCBgc3ltYm9sc0Z1bmNgIHRvIGdldCB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzeW1ib2xzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzRnVuYywgc3ltYm9sc0Z1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXNGdW5jKG9iamVjdCk7XG4gIHJldHVybiBpc0FycmF5KG9iamVjdCkgPyByZXN1bHQgOiBhcnJheVB1c2gocmVzdWx0LCBzeW1ib2xzRnVuYyhvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAob2JqZWN0ID09PSBzb3VyY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCEoaXNBcnJheShzb3VyY2UpIHx8IGlzVHlwZWRBcnJheShzb3VyY2UpKSkge1xuICAgIHZhciBwcm9wcyA9IGJhc2VLZXlzSW4oc291cmNlKTtcbiAgfVxuICBhcnJheUVhY2gocHJvcHMgfHwgc291cmNlLCBmdW5jdGlvbihzcmNWYWx1ZSwga2V5KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBrZXkgPSBzcmNWYWx1ZTtcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIGlmIChpc09iamVjdChzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBiYXNlTWVyZ2UsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgICB9XG4gICAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XSxcbiAgICAgIHN0YWNrZWQgPSBzdGFjay5nZXQoc3JjVmFsdWUpO1xuXG4gIGlmIChzdGFja2VkKSB7XG4gICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgc3RhY2tlZCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIGlzQ29tbW9uID0gbmV3VmFsdWUgPT09IHVuZGVmaW5lZDtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FycmF5KHNyY1ZhbHVlKSB8fCBpc1R5cGVkQXJyYXkoc3JjVmFsdWUpKSB7XG4gICAgICBpZiAoaXNBcnJheShvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQXJyYXlMaWtlT2JqZWN0KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IGNvcHlBcnJheShvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBiYXNlQ2xvbmUoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHNyY1ZhbHVlKSB8fCBpc0FyZ3VtZW50cyhzcmNWYWx1ZSkpIHtcbiAgICAgIGlmIChpc0FyZ3VtZW50cyhvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0b1BsYWluT2JqZWN0KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFpc09iamVjdChvYmpWYWx1ZSkgfHwgKHNyY0luZGV4ICYmIGlzRnVuY3Rpb24ob2JqVmFsdWUpKSkge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGJhc2VDbG9uZShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBzdGFjay5zZXQoc3JjVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICBtZXJnZUZ1bmMobmV3VmFsdWUsIHNyY1ZhbHVlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIHN0YWNrWydkZWxldGUnXShzcmNWYWx1ZSk7XG4gIH1cbiAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlc3RgIHdoaWNoIGRvZXNuJ3QgdmFsaWRhdGUgb3IgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiBzdGFydCwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgaW5kZXggPSAtMTtcbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSBhcnJheTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgIGBidWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIFRoZSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge0J1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVCdWZmZXIoYnVmZmVyLCBpc0RlZXApIHtcbiAgaWYgKGlzRGVlcCkge1xuICAgIHJldHVybiBidWZmZXIuc2xpY2UoKTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gbmV3IGJ1ZmZlci5jb25zdHJ1Y3RvcihidWZmZXIubGVuZ3RoKTtcbiAgYnVmZmVyLmNvcHkocmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGFycmF5QnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgVGhlIGFycmF5IGJ1ZmZlciB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5IGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVBcnJheUJ1ZmZlcihhcnJheUJ1ZmZlcikge1xuICB2YXIgcmVzdWx0ID0gbmV3IGFycmF5QnVmZmVyLmNvbnN0cnVjdG9yKGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuICBuZXcgVWludDhBcnJheShyZXN1bHQpLnNldChuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgZGF0YVZpZXdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVZpZXcgVGhlIGRhdGEgdmlldyB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgZGF0YSB2aWV3LlxuICovXG5mdW5jdGlvbiBjbG9uZURhdGFWaWV3KGRhdGFWaWV3LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIoZGF0YVZpZXcuYnVmZmVyKSA6IGRhdGFWaWV3LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyBkYXRhVmlldy5jb25zdHJ1Y3RvcihidWZmZXIsIGRhdGFWaWV3LmJ5dGVPZmZzZXQsIGRhdGFWaWV3LmJ5dGVMZW5ndGgpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIG1hcC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVNYXAobWFwLCBpc0RlZXAsIGNsb25lRnVuYykge1xuICB2YXIgYXJyYXkgPSBpc0RlZXAgPyBjbG9uZUZ1bmMobWFwVG9BcnJheShtYXApLCB0cnVlKSA6IG1hcFRvQXJyYXkobWFwKTtcbiAgcmV0dXJuIGFycmF5UmVkdWNlKGFycmF5LCBhZGRNYXBFbnRyeSwgbmV3IG1hcC5jb25zdHJ1Y3Rvcik7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGByZWdleHBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVnZXhwIFRoZSByZWdleHAgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgcmVnZXhwLlxuICovXG5mdW5jdGlvbiBjbG9uZVJlZ0V4cChyZWdleHApIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyByZWdleHAuY29uc3RydWN0b3IocmVnZXhwLnNvdXJjZSwgcmVGbGFncy5leGVjKHJlZ2V4cCkpO1xuICByZXN1bHQubGFzdEluZGV4ID0gcmVnZXhwLmxhc3RJbmRleDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzZXQuXG4gKi9cbmZ1bmN0aW9uIGNsb25lU2V0KHNldCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKHNldFRvQXJyYXkoc2V0KSwgdHJ1ZSkgOiBzZXRUb0FycmF5KHNldCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkU2V0RW50cnksIG5ldyBzZXQuY29uc3RydWN0b3IpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGUgYHN5bWJvbGAgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc3ltYm9sIFRoZSBzeW1ib2wgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHN5bWJvbCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGNsb25lU3ltYm9sKHN5bWJvbCkge1xuICByZXR1cm4gc3ltYm9sVmFsdWVPZiA/IE9iamVjdChzeW1ib2xWYWx1ZU9mLmNhbGwoc3ltYm9sKSkgOiB7fTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHR5cGVkQXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZWRBcnJheSBUaGUgdHlwZWQgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHR5cGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZVR5cGVkQXJyYXkodHlwZWRBcnJheSwgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKHR5cGVkQXJyYXkuYnVmZmVyKSA6IHR5cGVkQXJyYXkuYnVmZmVyO1xuICByZXR1cm4gbmV3IHR5cGVkQXJyYXkuY29uc3RydWN0b3IoYnVmZmVyLCB0eXBlZEFycmF5LmJ5dGVPZmZzZXQsIHR5cGVkQXJyYXkubGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29waWVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPYmplY3Qoc291cmNlLCBwcm9wcywgb2JqZWN0LCBjdXN0b21pemVyKSB7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcblxuICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkID8gc291cmNlW2tleV0gOiBuZXdWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLyoqXG4gKiBDb3BpZXMgb3duIHN5bWJvbCBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHN5bWJvbHMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5U3ltYm9scyhzb3VyY2UsIG9iamVjdCkge1xuICByZXR1cm4gY29weU9iamVjdChzb3VyY2UsIGdldFN5bWJvbHMoc291cmNlKSwgb2JqZWN0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5hc3NpZ25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQsXG4gICAgICAgIGd1YXJkID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbMl0gOiB1bmRlZmluZWQ7XG5cbiAgICBjdXN0b21pemVyID0gKGFzc2lnbmVyLmxlbmd0aCA+IDMgJiYgdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJylcbiAgICAgID8gKGxlbmd0aC0tLCBjdXN0b21pemVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgaW5kZXgsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRBbGxLZXlzKG9iamVjdCkge1xuICByZXR1cm4gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzLCBnZXRTeW1ib2xzKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN5bWJvbCBwcm9wZXJ0aWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzID0gbmF0aXZlR2V0U3ltYm9scyA/IG92ZXJBcmcobmF0aXZlR2V0U3ltYm9scywgT2JqZWN0KSA6IHN0dWJBcnJheTtcblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xudmFyIGdldFRhZyA9IGJhc2VHZXRUYWc7XG5cbi8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExLFxuLy8gZm9yIGRhdGEgdmlld3MgaW4gRWRnZSA8IDE0LCBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcy5cbmlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZykgfHxcbiAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWcpIHx8XG4gICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZykgfHxcbiAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gIGdldFRhZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpLFxuICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyA/IHZhbHVlLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLFxuICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIGFycmF5IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVBcnJheShhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gYXJyYXkuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICAvLyBBZGQgcHJvcGVydGllcyBhc3NpZ25lZCBieSBgUmVnRXhwI2V4ZWNgLlxuICBpZiAobGVuZ3RoICYmIHR5cGVvZiBhcnJheVswXSA9PSAnc3RyaW5nJyAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCAnaW5kZXgnKSkge1xuICAgIHJlc3VsdC5pbmRleCA9IGFycmF5LmluZGV4O1xuICAgIHJlc3VsdC5pbnB1dCA9IGFycmF5LmlucHV0O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lT2JqZWN0KG9iamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNQcm90b3R5cGUob2JqZWN0KSlcbiAgICA/IGJhc2VDcmVhdGUoZ2V0UHJvdG90eXBlKG9iamVjdCkpXG4gICAgOiB7fTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUgYmFzZWQgb24gaXRzIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjbG9uaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQnlUYWcob2JqZWN0LCB0YWcsIGNsb25lRnVuYywgaXNEZWVwKSB7XG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVBcnJheUJ1ZmZlcihvYmplY3QpO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIHJldHVybiBuZXcgQ3Rvcigrb2JqZWN0KTtcblxuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICByZXR1cm4gY2xvbmVEYXRhVmlldyhvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIGZsb2F0MzJUYWc6IGNhc2UgZmxvYXQ2NFRhZzpcbiAgICBjYXNlIGludDhUYWc6IGNhc2UgaW50MTZUYWc6IGNhc2UgaW50MzJUYWc6XG4gICAgY2FzZSB1aW50OFRhZzogY2FzZSB1aW50OENsYW1wZWRUYWc6IGNhc2UgdWludDE2VGFnOiBjYXNlIHVpbnQzMlRhZzpcbiAgICAgIHJldHVybiBjbG9uZVR5cGVkQXJyYXkob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICByZXR1cm4gY2xvbmVNYXAob2JqZWN0LCBpc0RlZXAsIGNsb25lRnVuYyk7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIHJldHVybiBuZXcgQ3RvcihvYmplY3QpO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgICByZXR1cm4gY2xvbmVSZWdFeHAob2JqZWN0KTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgcmV0dXJuIGNsb25lU2V0KG9iamVjdCwgaXNEZWVwLCBjbG9uZUZ1bmMpO1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTeW1ib2wob2JqZWN0KTtcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KVxuICAgICAgKSB7XG4gICAgcmV0dXJuIGVxKG9iamVjdFtpbmRleF0sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAqIFtgT2JqZWN0LmtleXNgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGV4Y2VwdCB0aGF0IGl0IGluY2x1ZGVzIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZUtleXNJbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHxcbiAgICAgIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpICE9IG9iamVjdFRhZyB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZ1xuICoga2V5ZWQgcHJvcGVydGllcyBvZiBgdmFsdWVgIHRvIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBwbGFpbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QsIHRydWUpIDogYmFzZUtleXNJbihvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYXNzaWduYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBtZXJnZXMgb3duIGFuZFxuICogaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdHMgaW50byB0aGVcbiAqIGRlc3RpbmF0aW9uIG9iamVjdC4gU291cmNlIHByb3BlcnRpZXMgdGhhdCByZXNvbHZlIHRvIGB1bmRlZmluZWRgIGFyZVxuICogc2tpcHBlZCBpZiBhIGRlc3RpbmF0aW9uIHZhbHVlIGV4aXN0cy4gQXJyYXkgYW5kIHBsYWluIG9iamVjdCBwcm9wZXJ0aWVzXG4gKiBhcmUgbWVyZ2VkIHJlY3Vyc2l2ZWx5LiBPdGhlciBvYmplY3RzIGFuZCB2YWx1ZSB0eXBlcyBhcmUgb3ZlcnJpZGRlbiBieVxuICogYXNzaWdubWVudC4gU291cmNlIG9iamVjdHMgYXJlIGFwcGxpZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LiBTdWJzZXF1ZW50XG4gKiBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC41LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ2EnOiBbeyAnYic6IDIgfSwgeyAnZCc6IDQgfV1cbiAqIH07XG4gKlxuICogdmFyIG90aGVyID0ge1xuICogICAnYSc6IFt7ICdjJzogMyB9LCB7ICdlJzogNSB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4geyAnYSc6IFt7ICdiJzogMiwgJ2MnOiAzIH0sIHsgJ2QnOiA0LCAnZSc6IDUgfV0gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihmdW5jdGlvbihvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpIHtcbiAgYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCk7XG59KTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGVtcHR5IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZW1wdHkgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheXMgPSBfLnRpbWVzKDIsIF8uc3R1YkFycmF5KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXMpO1xuICogLy8gPT4gW1tdLCBbXV1cbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXNbMF0gPT09IGFycmF5c1sxXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBzdHViQXJyYXkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlO1xuIiwiKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qaXN0YW5idWwgaWdub3JlIG5leHQ6Y2FudCB0ZXN0Ki9cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICByb290Lm9iamVjdFBhdGggPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICBmdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgICBpZihvYmogPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIC8vdG8gaGFuZGxlIG9iamVjdHMgd2l0aCBudWxsIHByb3RvdHlwZXMgKHRvbyBlZGdlIGNhc2U/KVxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSl7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgaSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvU3RyaW5nKHR5cGUpe1xuICAgIHJldHVybiB0b1N0ci5jYWxsKHR5cGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKXtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmcob2JqKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIjtcbiAgfVxuXG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmope1xuICAgIC8qaXN0YW5idWwgaWdub3JlIG5leHQ6Y2FudCB0ZXN0Ki9cbiAgICByZXR1cm4gdG9TdHIuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNCb29sZWFuKG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB0b1N0cmluZyhvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRLZXkoa2V5KXtcbiAgICB2YXIgaW50S2V5ID0gcGFyc2VJbnQoa2V5KTtcbiAgICBpZiAoaW50S2V5LnRvU3RyaW5nKCkgPT09IGtleSkge1xuICAgICAgcmV0dXJuIGludEtleTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhY3Rvcnkob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgICB2YXIgb2JqZWN0UGF0aCA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdFBhdGgpLnJlZHVjZShmdW5jdGlvbihwcm94eSwgcHJvcCkge1xuICAgICAgICBpZihwcm9wID09PSAnY3JlYXRlJykge1xuICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qaXN0YW5idWwgaWdub3JlIGVsc2UqL1xuICAgICAgICBpZiAodHlwZW9mIG9iamVjdFBhdGhbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBwcm94eVtwcm9wXSA9IG9iamVjdFBhdGhbcHJvcF0uYmluZChvYmplY3RQYXRoLCBvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgfSwge30pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoYXNTaGFsbG93UHJvcGVydHkob2JqLCBwcm9wKSB7XG4gICAgICByZXR1cm4gKG9wdGlvbnMuaW5jbHVkZUluaGVyaXRlZFByb3BzIHx8ICh0eXBlb2YgcHJvcCA9PT0gJ251bWJlcicgJiYgQXJyYXkuaXNBcnJheShvYmopKSB8fCBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgICAgIGlmIChoYXNTaGFsbG93UHJvcGVydHkob2JqLCBwcm9wKSkge1xuICAgICAgICByZXR1cm4gb2JqW3Byb3BdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2Upe1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfVxuICAgICAgaWYgKCFwYXRoIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBzZXQob2JqLCBwYXRoLnNwbGl0KCcuJykubWFwKGdldEtleSksIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgICAgfVxuICAgICAgdmFyIGN1cnJlbnRQYXRoID0gcGF0aFswXTtcbiAgICAgIHZhciBjdXJyZW50VmFsdWUgPSBnZXRTaGFsbG93UHJvcGVydHkob2JqLCBjdXJyZW50UGF0aCk7XG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gdm9pZCAwIHx8ICFkb05vdFJlcGxhY2UpIHtcbiAgICAgICAgICBvYmpbY3VycmVudFBhdGhdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIC8vY2hlY2sgaWYgd2UgYXNzdW1lIGFuIGFycmF5XG4gICAgICAgIGlmKHR5cGVvZiBwYXRoWzFdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmpbY3VycmVudFBhdGhdID0ge307XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldChvYmpbY3VycmVudFBhdGhdLCBwYXRoLnNsaWNlKDEpLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKTtcbiAgICB9XG5cbiAgICBvYmplY3RQYXRoLmhhcyA9IGZ1bmN0aW9uIChvYmosIHBhdGgpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGF0aCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gISFvYmo7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaiA9IGdldEtleShwYXRoW2ldKTtcblxuICAgICAgICBpZigodHlwZW9mIGogPT09ICdudW1iZXInICYmIGlzQXJyYXkob2JqKSAmJiBqIDwgb2JqLmxlbmd0aCkgfHxcbiAgICAgICAgICAob3B0aW9ucy5pbmNsdWRlSW5oZXJpdGVkUHJvcHMgPyAoaiBpbiBPYmplY3Qob2JqKSkgOiBoYXNPd25Qcm9wZXJ0eShvYmosIGopKSkge1xuICAgICAgICAgIG9iaiA9IG9ialtqXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZW5zdXJlRXhpc3RzID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUpe1xuICAgICAgcmV0dXJuIHNldChvYmosIHBhdGgsIHZhbHVlLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5zZXQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKXtcbiAgICAgIHJldHVybiBzZXQob2JqLCBwYXRoLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5pbnNlcnQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWx1ZSwgYXQpe1xuICAgICAgdmFyIGFyciA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCk7XG4gICAgICBhdCA9IH5+YXQ7XG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkge1xuICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgICAgfVxuICAgICAgYXJyLnNwbGljZShhdCwgMCwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmVtcHR5ID0gZnVuY3Rpb24ob2JqLCBwYXRoKSB7XG4gICAgICBpZiAoaXNFbXB0eShwYXRoKSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSwgaTtcbiAgICAgIGlmICghKHZhbHVlID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKSkpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgJycpO1xuICAgICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCAwKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUubGVuZ3RoID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIGZvciAoaSBpbiB2YWx1ZSkge1xuICAgICAgICAgIGlmIChoYXNTaGFsbG93UHJvcGVydHkodmFsdWUsIGkpKSB7XG4gICAgICAgICAgICBkZWxldGUgdmFsdWVbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBudWxsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5wdXNoID0gZnVuY3Rpb24gKG9iaiwgcGF0aCAvKiwgdmFsdWVzICovKXtcbiAgICAgIHZhciBhcnIgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGgpO1xuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgICAgYXJyID0gW107XG4gICAgICAgIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgYXJyKTtcbiAgICAgIH1cblxuICAgICAgYXJyLnB1c2guYXBwbHkoYXJyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5jb2FsZXNjZSA9IGZ1bmN0aW9uIChvYmosIHBhdGhzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdGhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICgodmFsdWUgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGhzW2ldKSkgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmdldCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIGRlZmF1bHRWYWx1ZSl7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG4gICAgICBpZiAoIXBhdGggfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoLnNwbGl0KCcuJyksIGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyZW50UGF0aCA9IGdldEtleShwYXRoWzBdKTtcbiAgICAgIHZhciBuZXh0T2JqID0gZ2V0U2hhbGxvd1Byb3BlcnR5KG9iaiwgY3VycmVudFBhdGgpXG4gICAgICBpZiAobmV4dE9iaiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gbmV4dE9iajtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iamVjdFBhdGguZ2V0KG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSksIGRlZmF1bHRWYWx1ZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZGVsID0gZnVuY3Rpb24gZGVsKG9iaiwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRW1wdHkocGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIGlmKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5kZWwob2JqLCBwYXRoLnNwbGl0KCcuJykpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudFBhdGggPSBnZXRLZXkocGF0aFswXSk7XG4gICAgICBpZiAoIWhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIGN1cnJlbnRQYXRoKSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuXG4gICAgICBpZihwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgb2JqLnNwbGljZShjdXJyZW50UGF0aCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIG9ialtjdXJyZW50UGF0aF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmRlbChvYmpbY3VycmVudFBhdGhdLCBwYXRoLnNsaWNlKDEpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aDtcbiAgfVxuXG4gIHZhciBtb2QgPSBmYWN0b3J5KCk7XG4gIG1vZC5jcmVhdGUgPSBmYWN0b3J5O1xuICBtb2Qud2l0aEluaGVyaXRlZFByb3BzID0gZmFjdG9yeSh7aW5jbHVkZUluaGVyaXRlZFByb3BzOiB0cnVlfSlcbiAgcmV0dXJuIG1vZDtcbn0pO1xuIiwidmFyIHYxID0gcmVxdWlyZSgnLi92MScpO1xudmFyIHY0ID0gcmVxdWlyZSgnLi92NCcpO1xuXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgcmV0dXJuIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG52YXIgcm5nO1xuXG52YXIgY3J5cHRvID0gZ2xvYmFsLmNyeXB0byB8fCBnbG9iYWwubXNDcnlwdG87IC8vIGZvciBJRSAxMVxuaWYgKGNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn1cblxuaWYgKCFybmcpIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJuZztcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuLy8gcmFuZG9tICMncyB3ZSBuZWVkIHRvIGluaXQgbm9kZSBhbmQgY2xvY2tzZXFcbnZhciBfc2VlZEJ5dGVzID0gcm5nKCk7XG5cbi8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxudmFyIF9ub2RlSWQgPSBbXG4gIF9zZWVkQnl0ZXNbMF0gfCAweDAxLFxuICBfc2VlZEJ5dGVzWzFdLCBfc2VlZEJ5dGVzWzJdLCBfc2VlZEJ5dGVzWzNdLCBfc2VlZEJ5dGVzWzRdLCBfc2VlZEJ5dGVzWzVdXG5dO1xuXG4vLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxudmFyIF9jbG9ja3NlcSA9IChfc2VlZEJ5dGVzWzZdIDw8IDggfCBfc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDAsIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiBieXRlc1RvVXVpZChiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2MTtcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiJdfQ==
