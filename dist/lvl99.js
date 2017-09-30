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

      $('[data-component]').each(function (index, elem) {
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

      $(target).on(this.NS + ':' + eventName, method);
    }
  }, {
    key: 'bindEventToTargetSelector',
    value: function bindEventToTargetSelector(eventName, selector, method, target) {
      target = getTargetBySelector(target, this);
      selector = getTargetSelector(selector, this);

      $(target).on(this.NS + ':' + eventName, selector, method);
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
      var partParts = part.match(/([a-z0-9_-]+):([^;]+);?/i);
      output[partParts[1].trim()] = coerceToPrimitiveType(partParts[2].trim());
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

var parse = {
  coerceToPrimitiveType: coerceToPrimitiveType,
  convertToBoolean: convertToBoolean,
  convertStringToJson: convertStringToJson,
  convertStringToFloat: convertStringToFloat,
  extractClassDetails: extractClassDetails,
  extractTriggerDetails: extractTriggerDetails,
  fixedEncodeURIComponent: fixedEncodeURIComponent,
  getTargetBySelector: getTargetBySelector,
  getTargetSelector: getTargetSelector
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczYvY29tbW9uLmVzNiIsImVzNi9jb3JlL2FwcC5lczYiLCJlczYvY29yZS9jb21wb25lbnQuZXM2IiwiZXM2L2NvcmUvZW50aXR5LmVzNiIsImVzNi9jb3JlL2luZGV4LmVzNiIsImVzNi9pbmRleC5lczYiLCJlczYvdG9vbHMvYnJlYWtwb2ludHMuZXM2IiwiZXM2L3Rvb2xzL2RlYnVnLmVzNiIsImVzNi90b29scy9pbmRleC5lczYiLCJlczYvdG9vbHMvcXVldWUuZXM2IiwiZXM2L3Rvb2xzL3Ntb290aC1zY3JvbGwuZXM2IiwiZXM2L3Rvb2xzL3RyYWNrZXZlbnQuZXM2IiwiZXM2L3V0aWxzL2luZGV4LmVzNiIsImVzNi91dGlscy9pbmhlcml0YW5jZS5lczYiLCJlczYvdXRpbHMvcGFyc2UuZXM2IiwiaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm1lcmdlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL29iamVjdC1wYXRoL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3V1aWQvaW5kZXguanMiLCJub2RlX21vZHVsZXMvdXVpZC9saWIvYnl0ZXNUb1V1aWQuanMiLCJub2RlX21vZHVsZXMvdXVpZC9saWIvcm5nLWJyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvdXVpZC92MS5qcyIsIm5vZGVfbW9kdWxlcy91dWlkL3Y0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDUUEsSUFBTSxJQUFLLE9BQU8sTUFBUCxLQUFrQixXQUFsQixHQUFnQyxPQUFPLFFBQVAsQ0FBaEMsR0FBbUQsT0FBTyxNQUFQLEtBQWtCLFdBQWxCLEdBQWdDLE9BQU8sUUFBUCxDQUFoQyxHQUFtRCxJQUFqSDs7QUFLQSxJQUFNLE9BQU8sRUFBRSxRQUFGLENBQWI7QUFDQSxJQUFNLE9BQU8sRUFBRSxNQUFGLENBQWI7QUFDQSxJQUFNLFFBQVEsRUFBRSxNQUFGLENBQWQ7QUFDQSxJ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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogTFZMOTkgQ29tbW9uXG4gKlxuICogQ29tbW9uIGRlcGVuZGVuY2llcyBhbmQgb3RoZXIgdXNlZnVsIHRoaW5nc1xuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydqUXVlcnknXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ2pRdWVyeSddIDogbnVsbClcblxuLyoqXG4gKiBCYXNpYyBzaG9ydGhhbmQgcHJvcHMgdG8gY2FjaGUvcmVmZXJlbmNlIGNvbW1vbiBqUXVlcnkgb2JqZWN0c1xuICovXG5jb25zdCAkZG9jID0gJChkb2N1bWVudClcbmNvbnN0ICR3aW4gPSAkKHdpbmRvdylcbmNvbnN0ICRodG1sID0gJCgnaHRtbCcpXG5jb25zdCAkYm9keSA9ICQoJ2JvZHknKVxuXG4vKipcbiAqIEV2ZW50IG5hbWUgc2hvcnRoYW5kc1xuICovXG5jb25zdCBldmVudHMgPSB7XG4gIGNsaWNrOiAnY2xpY2sgdG91Y2hlbmQnLFxuICBpbnB1dHN0YXJ0OiAnbW91c2Vkb3duIHRvdWNoc3RhcnQga2V5ZG93bicsXG4gIGlucHV0ZW5kOiAnbW91c2V1cCB0b3VjaGVuZCBrZXl1cCcsXG4gIGFuaW1hdGlvbnJ1bjogJ2FuaW1hdGlvbnJ1biB3ZWJraXRBbmltYXRpb25SdW4gd2Via2l0YW5pbWF0aW9ucnVuIG1vekFuaW1hdGlvblJ1biBNU0FuaW1hdGlvblJ1biBvQW5pbWF0aW9uUnVuIG9hbmltYXRpb25ydW4nLFxuICBhbmltYXRpb25zdGFydDogJ2FuaW1hdGlvbnN0YXJ0IHdlYmtpdEFuaW1hdGlvblN0YXJ0IHdlYmtpdGFuaW1hdGlvbnN0YXJ0IG1vekFuaW1hdGlvblN0YXJ0IE1TQW5pbWF0aW9uU3RhcnQgb0FuaW1hdGlvblN0YXJ0IG9hbmltYXRpb25zdGFydCcsXG4gIGFuaW1hdGlvbmVuZDogJ2FuaW1hdGlvbmVuZCB3ZWJraXRBbmltYXRpb25FbmQgd2Via2l0YW5pbWF0aW9uZW5kIG1vekFuaW1hdGlvbkVuZCBNU0FuaW1hdGlvbkVuZCBvQW5pbWF0aW9uRW5kIG9hbmltYXRpb25lbmQnLFxuICB0cmFuc2l0aW9ucnVuOiAndHJhbnNpdGlvbnJ1biB3ZWJraXRUcmFuc2l0aW9uUnVuIHdlYmtpdHRyYW5zaXRpb25ydW4gbW96VHJhbnNpdGlvblJ1biBNU1RyYW5zaXRpb25SdW4gb1RyYW5zaXRpb25SdW4gb3RyYW5zaXRpb25ydW4nLFxuICB0cmFuc2l0aW9uc3RhcnQ6ICd0cmFuc2l0aW9uc3RhcnQgd2Via2l0VHJhbnNpdGlvblN0YXJ0IHdlYmtpdHRyYW5zaXRpb25zdGFydCBtb3pUcmFuc2l0aW9uU3RhcnQgTVNUcmFuc2l0aW9uU3RhcnQgb1RyYW5zaXRpb25TdGFydCBvdHJhbnNpdGlvbnN0YXJ0JyxcbiAgdHJhbnNpdGlvbmVuZDogJ3RyYW5zaXRpb25lbmQgd2Via2l0VHJhbnNpdGlvbkVuZCB3ZWJraXR0cmFuc2l0aW9uZW5kIG1velRyYW5zaXRpb25FbmQgTVNUcmFuc2l0aW9uRW5kIG9UcmFuc2l0aW9uRW5kIG90cmFuc2l0aW9uZW5kJ1xufVxuXG5jb25zdCB1dGlscyA9IHtcbiAgJCxcbiAgJGRvYyxcbiAgJHdpbixcbiAgJGh0bWwsXG4gICRib2R5LFxuICBldmVudHNcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsc1xuIiwiLyoqXG4gKiBMVkw5OSBBcHBcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbi8vIGNvbnN0IFByb21pc2UgPSByZXF1aXJlKCdibHVlYmlyZCcpXG5jb25zdCAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ2pRdWVyeSddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnalF1ZXJ5J10gOiBudWxsKVxuY29uc3QgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKVxuY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKVxuY29uc3Qge1xuICBjb252ZXJ0U3RyaW5nVG9Kc29uLFxuICBleHRyYWN0Q2xhc3NEZXRhaWxzXG59ID0gcmVxdWlyZSgnLi4vdXRpbHMvcGFyc2UnKVxuXG4vKipcbiAqIEdldCBhIGNvbXBvbmVudCdzIG5hbWVzcGFjZVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0NvbXBvbmVudH0gY29tcG9uZW50XG4gKiBAcmV0dXJucyB7dW5kZWZpbmVkfFN0cmluZ3xDb21wb25lbnR9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudE5hbWVzcGFjZSAoY29tcG9uZW50KSB7XG4gIGxldCBjb21wb25lbnROUyA9IGNvbXBvbmVudFxuXG4gIC8vIEZ1bmN0aW9uL2NsYXNzIGdpdmVuXG4gIGlmICh0eXBlb2YgY29tcG9uZW50ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgaWYgKGNvbXBvbmVudC5OUykge1xuICAgICAgY29tcG9uZW50TlMgPSBjb21wb25lbnQuTlNcbiAgICB9IGVsc2Uge1xuICAgICAgY29tcG9uZW50TlMgPSBjb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yLm5hbWVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gY29tcG9uZW50TlNcbn1cblxuLyoqXG4gKiBUaGUgQXBwJ3MgYmFzZSBwcm9wZXJ0aWVzXG4gKlxuICogQHR5cGUge09iamVjdH1cbiAqL1xuY29uc3QgQXBwUHJvcGVydGllcyA9IHtcbiAgLyoqXG4gICAqIE5BTUVTUEFDRVxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIGN1c3RvbSBldmVudHMgYW5kIGVycm9yIHJlcG9ydGluZ1xuICAgKlxuICAgKiBAdHlwZSB7U3RyaW5nfVxuICAgKi9cbiAgX05TOiAnTFZMOTk6QXBwJyxcblxuICAvKipcbiAgICogbmFtZXNwYWNlXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgQ1NTIGNsYXNzZXNcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIF9uczogJ2x2bDk5LWFwcCcsXG5cbiAgLyoqXG4gICAqIFRoZSBwcm9wZXJ0aWVzIHNoYXJlZCBiZXR3ZWVuIGFsbCBpbnN0YW5jZXMgb2YgdGhpcyBBcHBcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9wcm9wZXJ0aWVzOiB7fSxcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgYXR0cmlidXRlcyB0byBsb2FkIGEgY3JlYXRlZCBBcHAgaW5zdGFuY2Ugd2l0aC5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9hdHRyaWJ1dGVzOiB7fSxcblxuICAvKipcbiAgICogVGhlIGxpYnJhcnkgb2YgY29tcG9uZW50cyB0aGF0IHRoZSBhcHAgaGFzIGFjY2VzcyB0b1xuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX2NvbXBvbmVudHM6IHt9LFxuXG4gIC8qKlxuICAgKiBUaGUgY29sbGVjdGlvbiBvZiBjb21wb25lbnRzIHdoaWNoIGhhdmUgYmVlbiBpbnN0YW50aWF0ZWQgd2l0aGluIHRoZSBhcHBcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9jb21wb25lbnRJbnN0YW5jZXM6IHt9XG59XG5cbi8qKlxuICogQXBwXG4gKlxuICogQGNsYXNzXG4gKiBAZXh0ZW5kcyBFbnRpdHlcbiAqL1xuY2xhc3MgQXBwIGV4dGVuZHMgRW50aXR5IHtcbiAgLyoqXG4gICAqIEFwcCBjb25zdHJ1Y3RvclxuICAgKlxuICAgKiBAY29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtPYmplY3R9IGF0dHJpYnV0ZXNcbiAgICovXG4gIGNvbnN0cnVjdG9yIChhdHRyaWJ1dGVzKSB7XG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYExWTDk5OkFwcDpjb25zdHJ1Y3RvcmApXG5cbiAgICBzdXBlcihhdHRyaWJ1dGVzKVxuICB9XG5cbiAgLyoqXG4gICAqIEV4dGVuZCB0aGUgQXBwIHdpdGggYW55IGdpdmVuIHtPYmplY3R9IGFyZ3VtZW50c1xuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gLi4uYXJndW1lbnRzXG4gICAqL1xuICBleHRlbmQgKCkge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGBMVkw5OTpBcHA6ZXh0ZW5kYCwge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIC8vIE1lcmdlIHRoZSBwcm9wZXJ0aWVzIHdpdGggdGhlIGluc3RhbnRpYXRlZCBhdHRyaWJ1dGVzXG4gICAgc3VwZXIuZXh0ZW5kKEFwcFByb3BlcnRpZXMsIC4uLmFyZ3VtZW50cylcbiAgfVxuXG4gIC8qKlxuICAgKiBSZWdpc3RlciBhIGNvbXBvbmVudCBjbGFzcyBpbiB0aGUgYXBwLiBZb3UgY2FuIGFsc28gc3BlY2lmeSBhIHNlcGFyYXRlIG5hbWVzcGFjZSB0byByZWdpc3RlciBpdCB1bmRlci5cbiAgICpcbiAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudENsYXNzXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBjb21wb25lbnRDbGFzc05hbWVzcGFjZVxuICAgKi9cbiAgcmVnaXN0ZXJDb21wb25lbnRDbGFzcyAoY29tcG9uZW50Q2xhc3MsIGNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSB7XG4gICAgbGV0IGNvbXBvbmVudENsYXNzTlNcblxuICAgIC8vIE5vIHZhbGlkIGNvbXBvbmVudENsYXNzIGdpdmVuXG4gICAgaWYgKCFjb21wb25lbnRDbGFzcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb21wb25lbnQgY2xhc3Mgd2FzIGdpdmVuJylcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIG5hbWVzcGFjZSBmcm9tIHRoZSBjb21wb25lbnQgY2xhc3MgKG9yIG90aGVyd2lzZSBzcGVjaWZpZWQpXG4gICAgY29tcG9uZW50Q2xhc3NOUyA9IGdldENvbXBvbmVudE5hbWVzcGFjZShjb21wb25lbnRDbGFzc05hbWVzcGFjZSB8fCBjb21wb25lbnRDbGFzcylcblxuICAgIC8vIFJlZ2lzdGVyIHRoZSBjb21wb25lbnQgY2xhc3NcbiAgICBpZiAoY29tcG9uZW50Q2xhc3NOUykge1xuICAgICAgdGhpcy5fY29tcG9uZW50c1tjb21wb25lbnRDbGFzc05TXSA9IGNvbXBvbmVudENsYXNzXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIERlcmVnaXN0ZXIgYSBjb21wb25lbnQgY2xhc3MgYnkgbmFtZXNwYWNlXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfENvbXBvbmVudH0gY29tcG9uZW50Q2xhc3NOYW1lc3BhY2VcbiAgICovXG4gIGRlcmVnaXN0ZXJDb21wb25lbnRDbGFzcyAoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpIHtcbiAgICBsZXQgY29tcG9uZW50Q2xhc3NOU1xuXG4gICAgLy8gTm8gdmFsaWQgY29tcG9uZW50Q2xhc3MgZ2l2ZW5cbiAgICBpZiAoIWNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbXBvbmVudCBjbGFzcyBuYW1lc3BhY2Ugd2FzIGdpdmVuJylcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIG5hbWVzcGFjZVxuICAgIGNvbXBvbmVudENsYXNzTlMgPSBnZXRDb21wb25lbnROYW1lc3BhY2UoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpXG5cbiAgICAvLyBSZW1vdmUgdGhlIGNvbXBvbmVudCBjbGFzc1xuICAgIGlmIChjb21wb25lbnRDbGFzc05TICYmIHRoaXMuX2NvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoY29tcG9uZW50Q2xhc3NOUykpIHtcbiAgICAgIHRoaXMuX2NvbXBvbmVudHNbY29tcG9uZW50Q2xhc3NOU10gPSB1bmRlZmluZWRcbiAgICAgIGRlbGV0ZSB0aGlzLl9jb21wb25lbnRzW2NvbXBvbmVudENsYXNzTlNdXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhIGNvbXBvbmVudCBjbGFzcyBieSBuYW1lc3BhY2VcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudENsYXNzTmFtZXNwYWNlXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZHxDb21wb25lbnR9XG4gICAqL1xuICBnZXRDb21wb25lbnRDbGFzcyAoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UpIHtcbiAgICBsZXQgY29tcG9uZW50Q2xhc3NOUyA9IGNvbXBvbmVudENsYXNzTmFtZXNwYWNlXG5cbiAgICBpZiAoIWNvbXBvbmVudENsYXNzTmFtZXNwYWNlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbXBvbmVudCBjbGFzcyBuYW1lc3BhY2Ugd2FzIGdpdmVuJylcbiAgICB9XG5cbiAgICAvLyBHZXQgdGhlIGNvbXBvbmVudCBjbGFzc1xuICAgIGlmIChjb21wb25lbnRDbGFzc05TICYmIHRoaXMuX2NvbXBvbmVudHMuaGFzT3duUHJvcGVydHkoY29tcG9uZW50Q2xhc3NOUykpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRzW2NvbXBvbmVudENsYXNzTlNdXG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBjb21wb25lbnQgaW5zdGFuY2UgdG8gYXBwIGFuZCBpbml0aWFsaXNlIHRoZSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtDb21wb25lbnR9IGNvbXBvbmVudEluc3RhbmNlXG4gICAqL1xuICBhZGRDb21wb25lbnRJbnN0YW5jZSAoY29tcG9uZW50SW5zdGFuY2UpIHtcbiAgICBjb21wb25lbnRJbnN0YW5jZS5fYXBwID0gdGhpc1xuXG4gICAgLy8gQWRkIGNvbXBvbmVudCBpbnN0YW5jZSB0byBjb2xsZWN0aW9uXG4gICAgdGhpcy5fY29tcG9uZW50SW5zdGFuY2VzW2NvbXBvbmVudEluc3RhbmNlLnV1aWRdID0gY29tcG9uZW50SW5zdGFuY2VcblxuICAgIC8vIEluaXRpYWxpc2UgdGhlIGNvbXBvbmVudFxuICAgIGNvbXBvbmVudEluc3RhbmNlLmluaXQoKVxuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBjb21wb25lbnQgaW5zdGFuY2VcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudENsYXNzTmFtZXNwYWNlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzXG4gICAqIEByZXR1cm5zIHtDb21wb25lbnR9XG4gICAqL1xuICBjcmVhdGVDb21wb25lbnRJbnN0YW5jZSAoY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UsIGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLk5TfS5jcmVhdGVDb21wb25lbnRJbnN0YW5jZTogJHtjb21wb25lbnRDbGFzc05hbWVzcGFjZX1gKVxuXG4gICAgLy8gQ3JlYXRlIGFuZCBpbml0aWFsaXNlIHRoZSBjb21wb25lbnRcbiAgICBpZiAodGhpcy5fY29tcG9uZW50cy5oYXNPd25Qcm9wZXJ0eShjb21wb25lbnRDbGFzc05hbWVzcGFjZSkpIHtcbiAgICAgIGxldCBuZXdDb21wb25lbnQgPSBuZXcgdGhpcy5fY29tcG9uZW50c1tjb21wb25lbnRDbGFzc05hbWVzcGFjZV0oYXR0cmlidXRlcylcblxuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLk5TfS5jcmVhdGVDb21wb25lbnRJbnN0YW5jZWAsIHtcbiAgICAgIC8vICAgY29tcG9uZW50Q2xhc3NOYW1lc3BhY2UsXG4gICAgICAvLyAgIG5ld0NvbXBvbmVudCxcbiAgICAgIC8vICAgYXR0cmlidXRlc1xuICAgICAgLy8gfSlcblxuICAgICAgLy8gQWRkIGluc3RhbmNlIHRvIGFwcFxuICAgICAgdGhpcy5hZGRDb21wb25lbnRJbnN0YW5jZShuZXdDb21wb25lbnQpXG5cbiAgICAgIHJldHVybiBuZXdDb21wb25lbnRcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogR2V0IGEgY29tcG9uZW50IGluc3RhbmNlIGJ5IFVVSURcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGNvbXBvbmVudFVVSURcbiAgICogQHJldHVybnMge3VuZGVmaW5lZHxDb21wb25lbnR9XG4gICAqL1xuICBnZXRDb21wb25lbnRJbnN0YW5jZSAoY29tcG9uZW50VVVJRCkge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGAke3RoaXMuTlN9LmdldENvbXBvbmVudEluc3RhbmNlOiAke2NvbXBvbmVudFVVSUR9YClcblxuICAgIGlmICh0aGlzLl9jb21wb25lbnRJbnN0YW5jZXMuaGFzT3duUHJvcGVydHkoY29tcG9uZW50VVVJRCkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9jb21wb25lbnRJbnN0YW5jZXNbY29tcG9uZW50VVVJRF1cbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkXG4gIH1cblxuICAvKipcbiAgICogUmVtb3ZlIGNvbXBvbmVudCBpbnN0YW5jZSBieSBVVUlEXG4gICAqXG4gICAqIEBwYXJhbSB7Q29tcG9uZW50fSBjb21wb25lbnRVVUlEXG4gICAqL1xuICByZW1vdmVDb21wb25lbnRJbnN0YW5jZSAoY29tcG9uZW50VVVJRCkge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKGAke3RoaXMuTlN9LnJlbW92ZUNvbXBvbmVudEluc3RhbmNlOiAke2NvbXBvbmVudFVVSUR9YClcblxuICAgIGxldCByZW1vdmVDb21wb25lbnRJbnN0YW5jZSA9IHRoaXMuZ2V0Q29tcG9uZW50SW5zdGFuY2UoY29tcG9uZW50VVVJRClcbiAgICBpZiAodHlwZW9mIHJlbW92ZUNvbXBvbmVudEluc3RhbmNlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZyhgJHt0aGlzLk5TfS5yZW1vdmVDb21wb25lbnRJbnN0YW5jZTogZm91bmQgY29tcG9uZW50IGluc3RhbmNlIHRvIHJlbW92ZWAsIHJlbW92ZUNvbXBvbmVudEluc3RhbmNlKVxuXG4gICAgICByZW1vdmVDb21wb25lbnRJbnN0YW5jZS5kZXN0cm95KClcblxuICAgICAgLy8gQFRPRE8gdGhlIGZvbGxvd2luZyBzaG91bGQgcHJvYmFibHkgb25seSBoYXBwZW4gYWZ0ZXIgYSBQcm9taXNlIGlzIHJlc29sdmVkXG4gICAgICAvLyBSZW1vdmUgZW50cnkgaW4gdGhlIGNvbXBvbmVudEluc3RhbmNlcyBvYmplY3RcbiAgICAgIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tjb21wb25lbnRVVUlEXSA9IHVuZGVmaW5lZFxuICAgICAgZGVsZXRlIHRoaXMuX2NvbXBvbmVudEluc3RhbmNlc1tjb21wb25lbnRVVUlEXVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIGFueSBjb21wb25lbnQgd2hpY2ggaXMgbWFya2VkIGluIHRoZSBET01cbiAgICovXG4gIGluaXRpYWxpc2VDb21wb25lbnRzICgpIHtcbiAgICAvLyBGaW5kIGFueSBlbGVtZW50IG1hcmtlZCB3aXRoIHRoZSBgW2RhdGEtY29tcG9uZW50XWAgYXR0cmlidXRlXG4gICAgJCgnW2RhdGEtY29tcG9uZW50XScpLmVhY2goKGluZGV4LCBlbGVtKSA9PiB7XG4gICAgICBsZXQgJGVsZW0gPSAkKGVsZW0pXG4gICAgICBsZXQgZWxlbUNvbXBvbmVudENsYXNzID0gJGVsZW0uYXR0cignZGF0YS1jb21wb25lbnQnKVxuICAgICAgbGV0IGVsZW1Db21wb25lbnRPcHRpb25zID0gJGVsZW0uYXR0cignZGF0YS1jb21wb25lbnQtb3B0aW9ucycpIHx8IHt9XG5cbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgY29uc29sZS5sb2coYCR7dGhpcy5fTlN9LmluaXRpYWxpc2VDb21wb25lbnRzOiBmb3VuZCBlbGVtZW50IHRvIGluaXRpYWxpc2Ugd2l0aCBjb21wb25lbnRgLCB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICBlbGVtLFxuICAgICAgICBlbGVtQ29tcG9uZW50Q2xhc3MsXG4gICAgICAgIGVsZW1Db21wb25lbnRPcHRpb25zXG4gICAgICB9KVxuXG4gICAgICAvLyBFbnN1cmUgY29tcG9uZW50IGNsYXNzIGlzIHJlZ2lzdGVyZWRcbiAgICAgIGlmICghdGhpcy5nZXRDb21wb25lbnRDbGFzcyhlbGVtQ29tcG9uZW50Q2xhc3MpKSB7XG4gICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICBjb25zb2xlLmVycm9yKGAke3RoaXMuX05TfS5pbml0aWFsaXNlQ29tcG9uZW50czogZWxlbWVudCdzIGNvbXBvbmVudCBjbGFzcyBub3QgcmVnaXN0ZXJlZGAsIHtcbiAgICAgICAgICBhcHA6IHRoaXMsXG4gICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgZWxlbSxcbiAgICAgICAgICBlbGVtQ29tcG9uZW50Q2xhc3MsXG4gICAgICAgICAgZWxlbUNvbXBvbmVudE9wdGlvbnNcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIEV4dHJhY3QvY29udmVydCB0aGUgb3B0aW9uc1xuICAgICAgaWYgKHR5cGVvZiBlbGVtQ29tcG9uZW50T3B0aW9ucyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgLy8gU2V0IGFzIEpTT04sIGUuZy4gJ3tcIm5hbWVcIjpcInZhbHVlXCJ9YFxuICAgICAgICBpZiAoL15cXHsvLnRlc3QoZWxlbUNvbXBvbmVudE9wdGlvbnMpKSB7XG4gICAgICAgICAgZWxlbUNvbXBvbmVudE9wdGlvbnMgPSBjb252ZXJ0U3RyaW5nVG9Kc29uKGVsZW1Db21wb25lbnRPcHRpb25zKVxuXG4gICAgICAgICAgLy8gU2V0IGFzIHN0eWxlLWxpa2UgYXR0cmlidXRlcywgZS5nLiBgbmFtZTogdmFsdWU7IG5hbWU6IHZhbHVlYFxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGVsZW1Db21wb25lbnRPcHRpb25zID0gZXh0cmFjdENsYXNzRGV0YWlscyhlbGVtQ29tcG9uZW50T3B0aW9ucylcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBZGQgdGhlICRlbGVtIGlmIGl0IGlzIG5vdCBhbHJlYWR5IHNldFxuICAgICAgaWYgKCFlbGVtQ29tcG9uZW50T3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnJGVsZW0nKSkge1xuICAgICAgICBlbGVtQ29tcG9uZW50T3B0aW9ucy4kZWxlbSA9ICRlbGVtXG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSB0aGUgY29tcG9uZW50XG4gICAgICBsZXQgZWxlbUNvbXBvbmVudEluc3RhbmNlID0gdGhpcy5jcmVhdGVDb21wb25lbnRJbnN0YW5jZShlbGVtQ29tcG9uZW50Q2xhc3MsIGVsZW1Db21wb25lbnRPcHRpb25zKVxuXG4gICAgICAvLyBAZGVidWdcbiAgICAgIGNvbnNvbGUubG9nKCdJbml0aWFsaXNlZCBjb21wb25lbnQgaW5zdGFuY2UnLCB7XG4gICAgICAgIGluZGV4LFxuICAgICAgICBlbGVtLFxuICAgICAgICBlbGVtQ29tcG9uZW50T3B0aW9ucyxcbiAgICAgICAgZWxlbUNvbXBvbmVudEluc3RhbmNlXG4gICAgICB9KVxuICAgIH0pXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBBcHBcbiIsIi8qKlxuICogTFZMOTkgQ29tcG9uZW50XG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBvYmplY3RQYXRoID0gcmVxdWlyZSgnb2JqZWN0LXBhdGgnKVxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKVxuY29uc3QgdXVpZCA9IHJlcXVpcmUoJ3V1aWQnKVxuY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKVxuY29uc3QgeyAkLCAkZG9jIH0gPSByZXF1aXJlKCcuLi9jb21tb24nKVxuLy8gY29uc3QgeyB3cmFwIH0gPSByZXF1aXJlKCcuLi91dGlscy9zdXBlcicpXG5jb25zdCB7XG4gIGV4dHJhY3RUcmlnZ2VyRGV0YWlscyxcbiAgZ2V0VGFyZ2V0QnlTZWxlY3RvcixcbiAgZ2V0VGFyZ2V0U2VsZWN0b3Jcbn0gPSByZXF1aXJlKCcuLi91dGlscy9wYXJzZScpXG5cbi8qKlxuICogVGhlIENvbXBvbmVudCdzIGJhc2UgcHJvcGVydGllc1xuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbmNvbnN0IENvbXBvbmVudFByb3BlcnRpZXMgPSB7XG4gIC8qKlxuICAgKiBOQU1FU1BBQ0VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBjdXN0b20gZXZlbnRzIGFuZCBlcnJvciByZXBvcnRpbmdcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICogQGRlZmF1bHQgTFZMOTlcbiAgICovXG4gIF9OUzogJ0xWTDk5OkNvbXBvbmVudCcsXG5cbiAgLyoqXG4gICAqIG5hbWVzcGFjZVxuICAgKiBUaGlzIGlzIHVzZWQgZm9yIENTUyBjbGFzc2VzXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqIEBkZWZhdWx0IGx2bDk5XG4gICAqL1xuICBfbnM6ICdsdmw5OS1jb21wb25lbnQnLFxuXG4gIC8qKlxuICAgKiBUaGUgcHJvcGVydGllcyBzaGFyZWQgYmV0d2VlbiBhbGwgaW5zdGFuY2VzIG9mIHRoaXMgQ29tcG9uZW50XG4gICAqXG4gICAqIEB0eXBlIHtPYmplY3R9XG4gICAqL1xuICBfcHJvcGVydGllczoge1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lcyBvZiBDb21wb25lbnQgbWV0aG9kcyB0byBwdWJsaWNseSBleHBvc2UgaW4gdGhlIERPTSB2aWEgY3VzdG9tIGV2ZW50cyAoYXR0YWNoZWQgZHVyaW5nIGBpbml0YCkuXG4gICAgICpcbiAgICAgKiBFYWNoIGVudHJ5IGNhbiBiZSBhIHN0cmluZyAod2hpY2ggd2lsbCB0aGVuIGJlIGEgZ2xvYmFsIGV2ZW50OyBiZSBjYXJlZnVsIHdpdGggZ2xvYmFsIGV2ZW50cyBiZWluZyBhdHRhY2hlZCB0d2ljZSksXG4gICAgICogb3IgY2FuIGJlIGFuIG9iamVjdCB3aGVyZSB5b3Ugc3BlY2lmeSB0aGUgdGFyZ2V0IChvZnRlbiAnc2VsZicpIGFuZCBzZXQgd2hhdCBtZXRob2QgdG8gZG8gb24gd2hhdGV2ZXIgZXZlbnQsIGUuZy46XG4gICAgICpcbiAgICAgKiBgYGBcbiAgICAgKiAgIC8vIFRoaXMgd2lsbCB0cmlnZ2VyIHRoZSBDb21wb25lbnQncyBgZXhhbXBsZU1ldGhvZGAgd2hlbiB0aGUgQ29tcG9uZW50J3MgJGVsZW0gaXMgdGFyZ2V0ZWQvdHJpZ2dlcmVkXG4gICAgICogICAvLyB1c2luZyB0aGUgYXV0b21hdGljYWxseSBnZW5lcmF0ZWQgY3VzdG9tIGV2ZW50IG5hbWU6XG4gICAgICogICAvLyBgJGVsZW0udHJpZ2dlcignQ29tcG9uZW50OmV4YW1wbGVNZXRob2QnKWBcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgdGFyZ2V0OiAnc2VsZicsXG4gICAgICogICAgIGRvOiAnZXhhbXBsZU1ldGhvZCdcbiAgICAgKiAgIH1cbiAgICAgKlxuICAgICAqICAgLy8gVGhpcyB3aWxsIHRyaWdnZXIgdGhlIENvbXBvbmVudCdzIGBleGFtcGxlTWV0aG9kYCB3aGVuIHRoZSBkb2N1bWVudCBpcyB0YXJnZXRlZC90cmlnZ2VyZWQgdXNpbmcgYSBjdXN0b21cbiAgICAgKiAgIC8vIGV2ZW50IG5hbWU6XG4gICAgICogICAvLyBgJChkb2N1bWVudCkudHJpZ2dlcignY3VzdG9tRXZlbnROYW1lJylgXG4gICAgICogICB7XG4gICAgICogICAgIHRhcmdldDogJ2RvY3VtZW50JyxcbiAgICAgKiAgICAgZG86ICdleGFtcGxlTWV0aG9kJyxcbiAgICAgKiAgICAgb246ICdjdXN0b21FdmVudE5hbWUnXG4gICAgICogICB9XG4gICAgICpcbiAgICAgKiAgIC8vIFRoaXMgd2lsbCB0cmlnZ2VyIHRoZSBDb21wb25lbnQncyBgZXhhbXBsZU1ldGhvZGAgd2hlbiB0aGUgd2luZG93IGlzIHNjcm9sbGVkOlxuICAgICAqICAgLy8gYCQod2luZG93KS5zY3JvbGwoKWBcbiAgICAgKiAgIHtcbiAgICAgKiAgICAgdGFyZ2V0OiAnd2luZG93JyxcbiAgICAgKiAgICAgZG86ICdleGFtcGxlTWV0aG9kJyxcbiAgICAgKiAgICAgb246ICdzY3JvbGwnXG4gICAgICogICB9XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBAdHlwZSB7QXJyYXl9XG4gICAgICovXG4gICAgcHVibGljTWV0aG9kczogW10sXG5cbiAgICAvKipcbiAgICAgKiBUaGUgdGFyZ2V0IHRvIGFwcGx5IGFueSBDU1MgY2xhc3NlcyB0b1xuICAgICAqXG4gICAgICogQHR5cGUge2pRdWVyeU9iamVjdH1cbiAgICAgKi9cbiAgICAkY2xhc3NUYXJnZXQ6IHVuZGVmaW5lZFxuICB9LFxuXG4gIC8qKlxuICAgKiBUaGUgZGVmYXVsdCBhdHRyaWJ1dGVzIHRvIGxvYWQgYSBjcmVhdGVkIENvbXBvbmVudCBpbnN0YW5jZSB3aXRoLlxuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKi9cbiAgX2F0dHJpYnV0ZXM6IHtcbiAgICAvKipcbiAgICAgKiBUaGUgbWFpbiBlbGVtZW50IHRoYXQgcmVwcmVzZW50cyB0aGUgQ29tcG9uZW50IGluIHRoZSBET00uIENvbXBvbmVudCBldmVudHMgd2lsbCBiZSBtYW5hZ2VkIHRocm91Z2ggdGhpcyBlbGVtZW50LlxuICAgICAqL1xuICAgICRlbGVtOiB1bmRlZmluZWRcbiAgfVxufVxuXG4vKipcbiAqIENvbXBvbmVudFxuICpcbiAqIEBjbGFzc1xuICogQGV4dGVuZHMgRW50aXR5XG4gKi9cbmNsYXNzIENvbXBvbmVudCBleHRlbmRzIEVudGl0eSB7XG4gIC8qKlxuICAgKiBDb21wb25lbnQgY29uc3RydWN0b3JcbiAgICpcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhdHRyaWJ1dGVzXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoYXR0cmlidXRlcykge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKCdMVkw5OTpDb21wb25lbnQ6Y29uc3RydWN0b3InLCB7XG4gICAgLy8gICBhcmd1bWVudHNcbiAgICAvLyB9KVxuXG4gICAgc3VwZXIoYXR0cmlidXRlcylcbiAgfVxuXG4gIC8qKlxuICAgKiBFeHRlbmQgdGhlIENvbXBvbmVudCdzIHByb3BlcnRpZXNcbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IC4uLmFyZ3VtZW50c1xuICAgKi9cbiAgZXh0ZW5kICgpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZygnTFZMOTk6Q29tcG9uZW50OmV4dGVuZCcsIHtcbiAgICAvLyAgIGFyZ3VtZW50c1xuICAgIC8vIH0pXG5cbiAgICAvLyBDb25jYXQgYWxsIHRoZSBwdWJsaWNNZXRob2RzIGludG8gb25lIGFycmF5IChzaW5jZSBtZXJnZSBkb2Vzbid0IGRvIHRoYXQgd2l0aCBwbGFpbiBhcnJheXMpXG4gICAgbGV0IGFyZ3MgPSBbLi4uYXJndW1lbnRzXVxuICAgIGxldCBhbGxQdWJsaWNNZXRob2RzID0gQ29tcG9uZW50UHJvcGVydGllcy5fcHJvcGVydGllcy5wdWJsaWNNZXRob2RzLnNsaWNlKDApXG4gICAgYXJncy5mb3JFYWNoKChhcmcpID0+IHtcbiAgICAgIGxldCBoYXNQdWJsaWNNZXRob2RzID0gb2JqZWN0UGF0aC5nZXQoYXJnLCAnX3Byb3BlcnRpZXMucHVibGljTWV0aG9kcycpXG4gICAgICBpZiAoaGFzUHVibGljTWV0aG9kcyAmJiBoYXNQdWJsaWNNZXRob2RzIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgYWxsUHVibGljTWV0aG9kcyA9IGFsbFB1YmxpY01ldGhvZHMuY29uY2F0KGhhc1B1YmxpY01ldGhvZHMpXG4gICAgICB9XG4gICAgfSlcbiAgICBhbGxQdWJsaWNNZXRob2RzID0gQXJyYXkuZnJvbShuZXcgU2V0KGFsbFB1YmxpY01ldGhvZHMpKVxuXG4gICAgLy8gRXh0ZW5kIHRoZSBjb21wb25lbnQncyBwcm9wZXJ0aWVzIHdpdGggdGhlIGluc3RhbnRpYXRlZCBhdHRyaWJ1dGVzIGFuZCBjb25jYXRlbmF0ZWQgcHVibGljIG1ldGhvZHNcbiAgICBzdXBlci5leHRlbmQoQ29tcG9uZW50UHJvcGVydGllcywgLi4uYXJndW1lbnRzLCB7XG4gICAgICBfcHJvcGVydGllczoge1xuICAgICAgICBwdWJsaWNNZXRob2RzOiBhbGxQdWJsaWNNZXRob2RzXG4gICAgICB9XG4gICAgfSlcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGNvbXBvbmVudCdzIGVsZW1lbnRcbiAgICpcbiAgICogQHJldHVybiB7dW5kZWZpbmVkfGpRdWVyeU9iamVjdH1cbiAgICovXG4gIGdldEVsZW0gKCkge1xuICAgIC8vIFNvZnQgcmV0dXJuXG4gICAgaWYgKCF0aGlzLmdldEF0dHIoJ2VsZW0nKSAmJiAoIXRoaXMuZ2V0QXR0cignJGVsZW0nKSB8fCAhdGhpcy5nZXRBdHRyKCckZWxlbScpLmxlbmd0aCkpIHtcbiAgICAgIGNvbnNvbGUud2FybihgJHt0aGlzLk5TfS5nZXRFbGVtOiBubyBlbGVtIHdhcyBmb3VuZCBmb3IgdGhpcyBjb21wb25lbnQuIFRoaXMgbWF5IGNhdXNlIHByb2JsZW1zIHdpdGggY29tcG9uZW50cyB3aGljaCByZWx5IG9uIHRoZSBlbGVtIGF0dHJpYnV0ZS5gKVxuICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cblxuICAgIC8vIEVsZW0gKG9yICRlbGVtKSBpcyBzZXQgdG8gc3RyaW5nXG4gICAgaWYgKHR5cGVvZiB0aGlzLmdldEF0dHIoJ2VsZW0nKSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHRoaXMuZ2V0QXR0cignJGVsZW0nKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGxldCAkZWxlbSA9ICQodGhpcy5nZXRBdHRyKCdlbGVtJykpXG4gICAgICBpZiAoJGVsZW0ubGVuZ3RoKSB7XG4gICAgICAgIHRoaXMuc2V0QXR0cignZWxlbScsICRlbGVtWzBdKVxuICAgICAgICB0aGlzLnNldEF0dHIoJyRlbGVtJywgJGVsZW0pXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2V0ICYgc2V0IHRoZSBlbGVtZW50XG4gICAgaWYgKHRoaXMuZ2V0QXR0cignZWxlbScpICYmICF0aGlzLmdldEF0dHIoJyRlbGVtJykpIHtcbiAgICAgIHRoaXMuc2V0QXR0cigkKHRoaXMuZ2V0QXR0cignZWxlbScpKSlcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5nZXRBdHRyKCckZWxlbScpXG4gIH1cblxuICAvKipcbiAgICogTWFyayB0aGUgQ29tcG9uZW50J3MgZWxlbWVudCB3aXRoIG5lY2Vzc2FyeSBhdHRyaWJ1dGVzXG4gICAqL1xuICBtYXJrRWxlbSAoKSB7XG4gICAgLy8gTWFyayB0aGUgZWxlbWVudFxuICAgIGlmICh0aGlzLmdldEVsZW0oKSAmJiB0aGlzLmdldEVsZW0oKS5sZW5ndGgpIHtcbiAgICAgIGlmICghdGhpcy5nZXRFbGVtKCkuYXR0cignZGF0YS1jb21wb25lbnQnKSkge1xuICAgICAgICB0aGlzLmdldEVsZW0oKS5hdHRyKCdkYXRhLWNvbXBvbmVudCcsIHRoaXMuTlMpXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5nZXRFbGVtKCkuYXR0cignZGF0YS1jb21wb25lbnQtaWQnKSkge1xuICAgICAgICB0aGlzLmdldEVsZW0oKS5hdHRyKCdkYXRhLWNvbXBvbmVudC1pZCcsIHRoaXMudXVpZClcbiAgICAgIH1cblxuICAgICAgdGhpcy50cmlnZ2VyRXZlbnQoJ21hcmtFbGVtOmVuZCcpXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdGFyZ2V0IHRvIGFwcGx5IHRoZSBDU1Mgc3RhdGUgY2xhc3NlcyB0b1xuICAgKlxuICAgKiBAcmV0dXJuIHt1bmRlZmluZWR8alF1ZXJ5T2JqZWN0fVxuICAgKi9cbiAgZ2V0Q2xhc3NUYXJnZXQgKCkge1xuICAgIC8vIFByaW9yaXRpc2UgYXR0clxuICAgIGxldCAkY2xhc3NUYXJnZXQgPSB0aGlzLmdldEF0dHIoJyRjbGFzc1RhcmdldCcpXG5cbiAgICAvLyBOb3QgZm91bmQgaW4gYXR0cj8gVXNlIHByb3BcbiAgICBpZiAoISRjbGFzc1RhcmdldCB8fCAhJGNsYXNzVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgJGNsYXNzVGFyZ2V0ID0gdGhpcy5nZXRQcm9wKCckY2xhc3NUYXJnZXQnKVxuICAgIH1cblxuICAgIC8vIE5vdCBmb3VuZCBpbiBwcm9wPyBVc2UgZWxlbVxuICAgIGlmICghJGNsYXNzVGFyZ2V0IHx8ICEkY2xhc3NUYXJnZXQubGVuZ3RoKSB7XG4gICAgICAkY2xhc3NUYXJnZXQgPSB0aGlzLmdldEVsZW0oKVxuXG4gICAgICAvLyBFbnN1cmUgc2V0IGFzIGF0dHJcbiAgICAgIHRoaXMuc2V0QXR0cignJGNsYXNzVGFyZ2V0JywgJGNsYXNzVGFyZ2V0KVxuICAgIH1cblxuICAgIHJldHVybiAkY2xhc3NUYXJnZXRcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NIGVsZW1lbnQgYW5kIHBsYWNlIGludG8gdGhlIENvbXBvbmVudCBpbnN0YW5jZVxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAqL1xuICBsb2FkQXR0cnMgKCkge1xuICAgIGlmICh0aGlzLmdldEVsZW0oKSAmJiB0aGlzLmdldEVsZW0oKS5pcygnW2RhdGEtY29tcG9uZW50LWF0dHJpYnV0ZXNdJykpIHtcbiAgICAgIGxldCBhdHRycyA9IHt9XG5cbiAgICAgIC8vIEF0dGVtcHQgdG8gZ2V0IHRoZSBhdHRyaWJ1dGVzIGZyb20gdGhlIERPTSBlbGVtZW50XG4gICAgICB0cnkge1xuICAgICAgICBhdHRycyA9IEpTT04ucGFyc2UodGhpcy5nZXRFbGVtKCkuYXR0cignZGF0YS1jb21wb25lbnQtYXR0cmlidXRlcycpKVxuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjb25zb2xlLmVycm9yKGBbJHt0aGlzLk5TfV0gbG9hZEF0dHJzOiBFcnJvciBsb2FkaW5nIGF0dHJpYnV0ZXMgZnJvbSBET00gZWxlbWVudGApXG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2F0dHJpYnV0ZXMgPSBtZXJnZSh0aGlzLl9hdHRyaWJ1dGVzLCBhdHRycylcblxuICAgICAgLy8gT25jZSBsb2FkZWQsIHJlbW92ZSB0aGUgY29tcG9uZW50IGF0dHJpYnV0ZXMgZnJvbSB0aGUgRE9NXG4gICAgICB0aGlzLmdldEVsZW0oKS5yZW1vdmVBdHRyKCdkYXRhLWNvbXBvbmVudC1hdHRyaWJ1dGVzJylcblxuICAgICAgcmV0dXJuIHRoaXMuX2F0dHJpYnV0ZXNcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSBDb21wb25lbnRcbiAgICovXG4gIGluaXQgKCkge1xuICAgIHN1cGVyLmluaXQoLi4uYXJndW1lbnRzKVxuXG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlM6aW5pdH1dYClcblxuICAgIC8vIE1hcmsgdGhlIGVsZW1lbnRcbiAgICB0aGlzLm1hcmtFbGVtKClcblxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBDb21wb25lbnQncyBwdWJsaWMgbWV0aG9kcyB0byB0YXJnZXRzXG4gICAgICogUHVibGljIG1ldGhvZHMgY2FuIGJlIHRyaWdnZXJlZCBvbiB0aGUgdGFyZ2V0cyB2aWEgYCQodGFyZ2V0KS50cmlnZ2VyKCdOQU1FU1BBQ0U6cHVibGljTWV0aG9kTmFtZScpYFxuICAgICAqL1xuICAgIGxldCBwdWJsaWNNZXRob2RzID0gdGhpcy5nZXRQcm9wKCdwdWJsaWNNZXRob2RzJylcbiAgICBpZiAocHVibGljTWV0aG9kcyAmJiBwdWJsaWNNZXRob2RzLmxlbmd0aCkge1xuICAgICAgcHVibGljTWV0aG9kcy5mb3JFYWNoKCh0cmlnZ2VyKSA9PiB7XG4gICAgICAgIGxldCB0cmlnZ2VyRGV0YWlscyA9IHt9XG5cbiAgICAgICAgLy8gQWxyZWFkeSBvYmplY3RcbiAgICAgICAgaWYgKHR5cGVvZiB0cmlnZ2VyID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIHRyaWdnZXJEZXRhaWxzID0gdHJpZ2dlclxuXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRyaWdnZXIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgaWYgKC9eey8udGVzdCh0cmlnZ2VyKSB8fCAvWzo7XS8udGVzdCh0cmlnZ2VyKSkge1xuICAgICAgICAgICAgdHJpZ2dlckRldGFpbHMgPSBleHRyYWN0VHJpZ2dlckRldGFpbHModHJpZ2dlcilcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJpZ2dlckRldGFpbHMuZG8gPSB0cmlnZ2VyXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgZW1wdHksIHNldCBgb25gIHRvIGBkb2AgdmFsdWUgKGNvbnNpZGVyIGl0IGEgY3VzdG9tIGV2ZW50IHRvIGludm9rZSwgZS5nLiAnaW5pdCcgd291bGQgaW52b2tlICdpbml0JyBvbiB0aGlzIENvbXBvbmVudClcbiAgICAgICAgaWYgKCFvYmplY3RQYXRoLmhhcyh0cmlnZ2VyRGV0YWlscywgJ29uJykpIHtcbiAgICAgICAgICB0cmlnZ2VyRGV0YWlscy5vbiA9IHRyaWdnZXJEZXRhaWxzLmRvXG4gICAgICAgIH1cblxuICAgICAgICAvLyBDb250ZXh0IHNob3VsZCBhbHdheXMgYmUgdGhpcyBDb21wb25lbnRcbiAgICAgICAgdHJpZ2dlckRldGFpbHMuY29udGV4dCA9IHRoaXNcblxuICAgICAgICAvLyBHZXQgdGhlIENvbXBvbmVudCdzIG1ldGhvZFxuICAgICAgICBsZXQgbWV0aG9kID0gdW5kZWZpbmVkXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgbWV0aG9kID0gdHJpZ2dlckRldGFpbHMuY29udGV4dFt0cmlnZ2VyRGV0YWlscy5kb11cbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIGluaXQ6IHB1YmxpYyBtZXRob2QgJyR7dHJpZ2dlckRldGFpbHMuZG99JyB3YXMgbm90IGZvdW5kIG9uIHRoaXMgY29tcG9uZW50YClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OU31dIGluaXQ6IGF0dGFjaCBwdWJsaWMgbWV0aG9kYCwge1xuICAgICAgICAvLyAgIHRyaWdnZXJEZXRhaWxzLFxuICAgICAgICAvLyAgIG1ldGhvZFxuICAgICAgICAvLyB9KVxuXG4gICAgICAgIC8vIEF0dGFjaCB0aGUgbWV0aG9kIGFzIGEgY3VzdG9tIGV2ZW50IHRvIHRoZSB0YXJnZXRcbiAgICAgICAgaWYgKHR5cGVvZiBtZXRob2QgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAvLyBXcmFwIHRoZSBtZXRob2QgaW50byBhIGNsb3N1cmVcbiAgICAgICAgICBsZXQgZG9Db21wb25lbnRNZXRob2QgPSAoalF1ZXJ5RXZlbnQpID0+IHtcbiAgICAgICAgICAgIC8vIEBkZWJ1Z1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coYFRyaWdnZXJlZCAke3RoaXMuTlN9OiR7dHJpZ2dlckRldGFpbHMuZG99YCwge1xuICAgICAgICAgICAgLy8gICBfY2xhc3M6IHRoaXMsXG4gICAgICAgICAgICAvLyAgIF9tZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgIC8vICAgalF1ZXJ5RXZlbnQsXG4gICAgICAgICAgICAvLyAgIGFyZ3VtZW50c1xuICAgICAgICAgICAgLy8gfSlcblxuICAgICAgICAgICAgbWV0aG9kLmNhbGwodGhpcywgalF1ZXJ5RXZlbnQpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQXR0YWNoIHRvIHRoZSB0YXJnZXQgZG9jdW1lbnQgd2l0aCBhIHBhcnRpY3VsYXIgZWxlbWVudCBzZWxlY3RvclxuICAgICAgICAgIGlmICh0cmlnZ2VyRGV0YWlscy5zZWxlY3Rvcikge1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRUb1RhcmdldFNlbGVjdG9yKHRyaWdnZXJEZXRhaWxzLm9uLCB0cmlnZ2VyRGV0YWlscy5zZWxlY3RvciwgZG9Db21wb25lbnRNZXRob2QsIHRyaWdnZXJEZXRhaWxzLnRhcmdldClcblxuICAgICAgICAgIC8vIEF0dGFjaCB0byB0aGUgdGFyZ2V0XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYmluZEV2ZW50VG9UYXJnZXQodHJpZ2dlckRldGFpbHMub24sIGRvQ29tcG9uZW50TWV0aG9kLCB0cmlnZ2VyRGV0YWlscy50YXJnZXQpXG4gICAgICAgICAgfVxuXG4gICAgICAgIC8vIEVycm9yXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQGRlYnVnXG4gICAgICAgICAgLy8gY29uc29sZS5sb2codGhpcywgdHJpZ2dlciwgdHJpZ2dlckRldGFpbHMpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aGlzLk5TfV0gaW5pdDogcHVibGljIG1ldGhvZCAnJHt0cmlnZ2VyRGV0YWlscy5kb30nIGlzIG5vdCBhIHZhbGlkIGZ1bmN0aW9uYClcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMb2FkIGFueSBhdHRyaWJ1dGVzIHRoYXQgd2VyZSBhdHRhY2hlZCB0byB0aGUgRE9NIGVsZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmxvYWRBdHRycygpXG5cbiAgICAvKipcbiAgICAgKiBAdHJpZ2dlciBOQU1FU1BBQ0U6aW5pdDplbmRcbiAgICAgKiBAcGFyYW0ge0NvbXBvbmVudH1cbiAgICAgKi9cbiAgICB0aGlzLnRyaWdnZXJFdmVudCgnaW5pdDplbmQnKVxuICB9XG5cbiAgLyoqXG4gICAqIERlc3Ryb3kgYW5kIHRlYXIgZG93biB0aGUgY29tcG9uZW50XG4gICAqL1xuICBkZXN0cm95ICgpIHtcbiAgICAvLyBAVE9ETyB0ZWFyIGRvd24gdGhlIGhvdXNlIVxuICAgIC8vIEBUT0RPIHJlbW92ZSB0aGUgYm91bmQgcHVibGljIGV2ZW50c1xuICAgIC8vIEBUT0RPIG90aGVyIGdhcmJhZ2UgY29sbGVjdGlvbi9tZW1vcnkgbWFuYWdlbWVudFxuXG4gICAgLyoqXG4gICAgICogQHRyaWdnZXIgTkFNRVNQQUNFOmRlc3Ryb3k6YmVmb3JlZW5kXG4gICAgICogQHBhcmFtIHtDb21wb25lbnR9XG4gICAgICovXG4gICAgdGhpcy50cmlnZ2VyRXZlbnQoJ2Rlc3Ryb3k6YmVmb3JlZW5kJylcblxuICAgIHN1cGVyLmRlc3Ryb3koLi4uYXJndW1lbnRzKVxuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgbWV0aG9kIHRvIGN1c3RvbSBldmVudCBvbiB0YXJnZXRcbiAgICogRXZlbnQgbmFtZXMgYXJlIGF1dG9tYXRpY2FsbHkgbmFtZXNwYWNlZCB1c2luZyB0aGUgQ29tcG9uZW50J3MgX05TIHByb3BlcnR5LlxuICAgKlxuICAgKiBAcGFyYW0ge1N0cmluZ30gZXZlbnROYW1lXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZFxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0IERlZmF1bHQgaXMgYGRvY3VtZW50YC4gVGhpcyBpcyB0aGUgdGFyZ2V0IERPTSBlbGVtZW50IHdoaWNoIHRoZSBjdXN0b20gZXZlbnQgd2lsbCBidWJibGUgdXAgdG9cbiAgICovXG4gIGJpbmRFdmVudFRvVGFyZ2V0IChldmVudE5hbWUsIG1ldGhvZCwgdGFyZ2V0KSB7XG4gICAgLy8gRGVmYXVsdCB0byBkb2N1bWVudFxuICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICB0YXJnZXQgPSBkb2N1bWVudFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTcGVjaWFsIHN0cmluZyB2YWx1ZXMgdG8gZ2V0IHRoZSBhY3R1YWwgb2JqZWN0XG4gICAgICBzd2l0Y2ggKHRhcmdldCkge1xuICAgICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgICAgdGFyZ2V0ID0gZG9jdW1lbnRcbiAgICAgICAgICBicmVha1xuXG4gICAgICAgIGNhc2UgJ3dpbmRvdyc6XG4gICAgICAgICAgdGFyZ2V0ID0gd2luZG93XG4gICAgICAgICAgYnJlYWtcblxuICAgICAgICBjYXNlICdzZWxmJzpcbiAgICAgICAgICB0YXJnZXQgPSB0aGlzLmdldEVsZW0oKVswXVxuICAgICAgICAgIGJyZWFrXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlN9XSBiaW5kRXZlbnRUb1RhcmdldGAsIHtcbiAgICAvLyAgIGV2ZW50TmFtZSxcbiAgICAvLyAgIG1ldGhvZCxcbiAgICAvLyAgIHRhcmdldCxcbiAgICAvLyAgIHRyaWdnZXJOYW1lOiBgJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gXG4gICAgLy8gfSlcblxuICAgICQodGFyZ2V0KS5vbihgJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gLCBtZXRob2QpXG4gIH1cblxuICAvKipcbiAgICogQmluZCBtZXRob2QgdG8gY3VzdG9tIGV2ZW50IG9uIHRhcmdldCB3aXRoIGFuIGVsZW1lbnQgc2VsZWN0b3IuXG4gICAqIEV2ZW50IG5hbWVzIGFyZSBhdXRvbWF0aWNhbGx5IG5hbWVzcGFjZWQgdXNpbmcgdGhlIENvbXBvbmVudCdzIF9OUyBwcm9wZXJ0eS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3IgVGFyZ2V0IGEgc3BlY2lmaWMgZWxlbWVudCAodmlhIHF1ZXJ5IHNlbGVjdG9yKSB0byB0cmlnZ2VyIHRoZSBldmVudFxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXRob2RcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBEZWZhdWx0IGlzIGBkb2N1bWVudGAuIFRoaXMgaXMgdGhlIHRhcmdldCBET00gZWxlbWVudCB3aGljaCB0aGUgY3VzdG9tIGV2ZW50IHdpbGwgYnViYmxlIHVwIHRvXG4gICAqL1xuICBiaW5kRXZlbnRUb1RhcmdldFNlbGVjdG9yIChldmVudE5hbWUsIHNlbGVjdG9yLCBtZXRob2QsIHRhcmdldCkge1xuICAgIHRhcmdldCA9IGdldFRhcmdldEJ5U2VsZWN0b3IodGFyZ2V0LCB0aGlzKVxuICAgIHNlbGVjdG9yID0gZ2V0VGFyZ2V0U2VsZWN0b3Ioc2VsZWN0b3IsIHRoaXMpXG5cbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OU31dIGJpbmRFdmVudFRvVGFyZ2V0U2VsZWN0b3JgLCB7XG4gICAgLy8gICBldmVudE5hbWUsXG4gICAgLy8gICBzZWxlY3RvcixcbiAgICAvLyAgIG1ldGhvZCxcbiAgICAvLyAgIHRhcmdldCxcbiAgICAvLyAgIHRyaWdnZXJOYW1lOiBgJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gXG4gICAgLy8gfSlcblxuICAgICQodGFyZ2V0KS5vbihgJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gLCBzZWxlY3RvciwgbWV0aG9kKVxuICB9XG5cbiAgLyoqXG4gICAqIFRyaWdnZXIgYSBjdXN0b20gZG9jdW1lbnQgZXZlbnQgb24gdGhlIENvbXBvbmVudC5cbiAgICogVGhlIGV2ZW50IHRyaWdnZXJlZCB3aWxsIGJlIGBOQU1FU1BBQ0U6ZXZlbnROYW1lYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge0FueX0gLi4uYXJnc1xuICAgKi9cbiAgdHJpZ2dlckV2ZW50IChldmVudE5hbWUsIC4uLmFyZ3MpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZyhgWyR7dGhpcy5OU31dIHRyaWdnZXJFdmVudDogJHt0aGlzLk5TfToke2V2ZW50TmFtZX1gKVxuXG4gICAgLy8gQWx3YXlzIHBhc3MgdGhlIGNvbXBvbmVudCBhcyB0aGUgZmlyc3QgYXJndW1lbnQgcGFyYW1ldGVyXG4gICAgJGRvYy50cmlnZ2VyKGAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWAsIFt0aGlzLCAuLi5hcmdzXSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUcmlnZ2VyIGEgY3VzdG9tIGRvY3VtZW50IGV2ZW50IG9uIGFuIGVsZW1lbnQgb24gdGhlIENvbXBvbmVudC5cbiAgICogVGhlIGV2ZW50IHRyaWdnZXJlZCB3aWxsIGJlIGBOQU1FU1BBQ0U6ZXZlbnROYW1lYC5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50TmFtZVxuICAgKiBAcGFyYW0ge1N0cmluZ30gc2VsZWN0b3JcbiAgICogQHBhcmFtIHtBbnl9IC4uLmFyZ3NcbiAgICovXG4gIHRyaWdnZXJFdmVudE9uU2VsZWN0b3IgKGV2ZW50TmFtZSwgc2VsZWN0b3IsIC4uLmFyZ3MpIHtcbiAgICBzZWxlY3RvciA9IGdldFRhcmdldFNlbGVjdG9yKHNlbGVjdG9yLCB0aGlzKVxuXG4gICAgLy8gQGRlYnVnXG4gICAgLy8gY29uc29sZS5sb2coYFske3RoaXMuTlN9XSB0cmlnZ2VyRXZlbnRPblNlbGVjdG9yOiAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWApXG5cbiAgICAvLyBBbHdheXMgcGFzcyB0aGUgY29tcG9uZW50IGFzIHRoZSBmaXJzdCBhcmd1bWVudCBwYXJhbWV0ZXJcbiAgICAkKHNlbGVjdG9yKS50cmlnZ2VyKGAke3RoaXMuTlN9OiR7ZXZlbnROYW1lfWAsIFt0aGlzLCAuLi5hcmdzXSlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IENvbXBvbmVudFxuIiwiLyoqXG4gKiBMVkw5OSBFbnRpdHlcbiAqXG4gKiBCYXNlIGNsYXNzIHVzZWQgZm9yIHByb2dyYW1tYWJsZSBlbnRpdGllcyB3aXRoaW4gdGhlIGFwcCwgc3VjaCBhcyBjb21wb25lbnRzIG9yIG90aGVyIHN1Y2ggZW50aXRpZXMgdGhhdCByZWx5IG9uXG4gKiBzdGF0ZSBhbmQgbGlmZWN5Y2xlIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IHV1aWQgPSByZXF1aXJlKCd1dWlkJylcbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoLm1lcmdlJylcbmNvbnN0IG9iamVjdFBhdGggPSByZXF1aXJlKCdvYmplY3QtcGF0aCcpXG5jb25zdCB7XG4gIGV4cG9zZVByaXZhdGVQcm9wZXJ0aWVzXG59ID0gcmVxdWlyZSgnLi4vdXRpbHMvaW5oZXJpdGFuY2UnKVxuXG4vKipcbiAqIFRoZSBFbnRpdHkncyBiYXNlIHByb3BlcnRpZXNcbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5jb25zdCBFbnRpdHlQcm9wZXJ0aWVzID0ge1xuICAvKipcbiAgICogTkFNRVNQQUNFXG4gICAqIFRoaXMgaXMgdXNlZCBmb3IgY3VzdG9tIGV2ZW50cyBhbmQgZXJyb3IgcmVwb3J0aW5nXG4gICAqXG4gICAqIEB0eXBlIHtTdHJpbmd9XG4gICAqL1xuICBfTlM6ICdMVkw5OTpFbnRpdHknLFxuXG4gIC8qKlxuICAgKiBuYW1lc3BhY2VcbiAgICogVGhpcyBpcyB1c2VkIGZvciBDU1MgY2xhc3NlcyAob25seSBpZiB0aGUgZW50aXR5IGhhcyBhbiBIVE1MRWxlbWVudClcbiAgICpcbiAgICogQHR5cGUge1N0cmluZ31cbiAgICovXG4gIF9uczogJ2x2bDk5LWVudGl0eScsXG5cbiAgLyoqXG4gICAqIFRoZSBwcm9wZXJ0aWVzIHNoYXJlZCBiZXR3ZWVuIGFsbCBpbnN0YW5jZXMgb2YgdGhpcyBFbnRpdHlcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9wcm9wZXJ0aWVzOiB7fSxcblxuICAvKipcbiAgICogVGhlIGRlZmF1bHQgYXR0cmlidXRlcyB0byBsb2FkIGEgY3JlYXRlZCBFbnRpdHkgaW5zdGFuY2Ugd2l0aC5cbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICovXG4gIF9hdHRyaWJ1dGVzOiB7fVxufVxuXG5jbGFzcyBFbnRpdHkge1xuICAvKipcbiAgICogRW50aXR5IGNvbnN0cnVjdG9yXG4gICAqXG4gICAqIEBjb25zdHJ1Y3RvclxuICAgKiBAcGFyYW0ge09iamVjdH0gYXR0cmlidXRlc1xuICAgKi9cbiAgY29uc3RydWN0b3IgKGF0dHJpYnV0ZXMpIHtcbiAgICAvLyBAZGVidWdcbiAgICAvLyBjb25zb2xlLmxvZygnTFZMOTk6RW50aXR5OmNvbnN0cnVjdG9yJywge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIHRoaXMuZXh0ZW5kKHtcbiAgICAgIF9hdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzXG4gICAgfSlcblxuICAgIC8vIEV4cG9zZSBwcml2YXRlIHZhbHVlc1xuICAgIGV4cG9zZVByaXZhdGVQcm9wZXJ0aWVzKHRoaXMpXG5cbiAgICAvLyBDcmVhdGUgYSB1bmlxdWUgSUQgZm9yIHRoaXMgRW50aXR5XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd1dWlkJywge1xuICAgICAgdmFsdWU6IGAke3RoaXMuTlN9OiR7dXVpZC52NCgpfWAsXG4gICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgIH0pXG4gIH1cblxuICAvKipcbiAgICogRXh0ZW5kIHRoZSBFbnRpdHkgd2l0aCBhbnkgZ2l2ZW4ge09iamVjdH0gYXJndW1lbnRzXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSAuLi5hcmd1bWVudHNcbiAgICogQHJldHVybnMge1NlbGZ9XG4gICAqL1xuICBleHRlbmQgKCkge1xuICAgIC8vIEBkZWJ1Z1xuICAgIC8vIGNvbnNvbGUubG9nKCdMVkw5OTpFbnRpdHk6ZXh0ZW5kJywge1xuICAgIC8vICAgYXJndW1lbnRzXG4gICAgLy8gfSlcblxuICAgIC8vIE1lcmdlIHRoZSBwcm9wZXJ0aWVzIHdpdGggdGhlIGluc3RhbnRpYXRlZCBhdHRyaWJ1dGVzIGFuZCBjb25jYXRlbmF0ZWQgcHVibGljIG1ldGhvZHNcbiAgICBtZXJnZSh0aGlzLCBFbnRpdHlQcm9wZXJ0aWVzLCAuLi5hcmd1bWVudHMpXG5cbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBhbiBFbnRpdHkncyBwcm9wZXJ0eSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXG4gICAqIEByZXR1cm4ge01peGVkfVxuICAgKi9cbiAgZ2V0UHJvcCAocHJvcE5hbWUpIHtcbiAgICBpZiAoIXByb3BOYW1lIHx8IHR5cGVvZiBwcm9wTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIGdldDogJ3Byb3BOYW1lJyB2YWx1ZSBpcyBpbnZhbGlkYClcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQodGhpcy5wcm9wZXJ0aWVzLCBwcm9wTmFtZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYW4gRW50aXR5J3MgcHJvcGVydHkgdG8gYSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IHByb3BOYW1lXG4gICAqIEBwYXJhbSB7TWl4ZWR9IHByb3BWYWx1ZVxuICAgKi9cbiAgc2V0UHJvcCAocHJvcE5hbWUsIHByb3BWYWx1ZSkge1xuICAgIGlmICghcHJvcE5hbWUgfHwgdHlwZW9mIHByb3BOYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbJHt0aGlzLk5TfV0gc2V0OiAncHJvcE5hbWUnIHZhbHVlIGlzIGludmFsaWRgKVxuICAgIH1cblxuICAgIHJldHVybiBvYmplY3RQYXRoLnNldCh0aGlzLnByb3BlcnRpZXMsIHByb3BOYW1lLCBwcm9wVmFsdWUpXG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIEVudGl0eSdzIGF0dHJpYnV0ZSB2YWx1ZS5cbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd9IGF0dHJOYW1lXG4gICAqIEByZXR1cm4ge01peGVkfVxuICAgKi9cbiAgZ2V0QXR0ciAoYXR0ck5hbWUpIHtcbiAgICBpZiAoIWF0dHJOYW1lIHx8IHR5cGVvZiBhdHRyTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIGdldEF0dHI6ICdhdHRyTmFtZScgdmFsdWUgaXMgaW52YWxpZGApXG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGguZ2V0KHRoaXMuYXR0cmlidXRlcywgYXR0ck5hbWUpXG4gIH1cblxuICAvKipcbiAgICogU2V0IGFuIEVudGl0eSdzIHByb3BlcnR5IHRvIGEgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBhdHRyTmFtZVxuICAgKiBAcGFyYW0ge01peGVkfSBhdHRyVmFsdWVcbiAgICovXG4gIHNldEF0dHIgKGF0dHJOYW1lLCBhdHRyVmFsdWUpIHtcbiAgICBpZiAoIWF0dHJOYW1lIHx8IHR5cGVvZiBhdHRyTmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgWyR7dGhpcy5OU31dIHNldEF0dHI6ICdhdHRyTmFtZScgdmFsdWUgaXMgaW52YWxpZGApXG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KHRoaXMuYXR0cmlidXRlcywgYXR0ck5hbWUsIGF0dHJWYWx1ZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBJbml0aWFsaXNlIHRoZSBFbnRpdHlcbiAgICovXG4gIGluaXQgKCkge31cblxuICAvKipcbiAgICogRGVzdHJveSBhbmQgdGVhciBkb3duIHRoZSBjb21wb25lbnRcbiAgICovXG4gIGRlc3Ryb3kgKCkge31cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBFbnRpdHlcbiIsIi8qKlxuICogTFZMOTkgQ29yZVxuICpcbiAqIENvcmUgY2xhc3NlcyB1c2VkIHRocm91Z2hvdXQgdGhlIGZyYW1ld29ya1xuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgRW50aXR5ID0gcmVxdWlyZSgnLi9lbnRpdHknKVxuY29uc3QgQXBwID0gcmVxdWlyZSgnLi9hcHAnKVxuY29uc3QgQ29tcG9uZW50ID0gcmVxdWlyZSgnLi9jb21wb25lbnQnKVxuXG5jb25zdCBjb3JlID0ge1xuICBFbnRpdHksXG4gIEFwcCxcbiAgQ29tcG9uZW50XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29yZVxuIiwiLyoqXG4gKiBMVkw5OVxuICpcbiAqIFRoZSB3aG9sZSBmcmFtZXdvcmsgaW4gb25lIGRpc2NyZXRlIHBhY2thZ2VcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmNvbnN0IGNvbW1vbiA9IHJlcXVpcmUoJy4vY29tbW9uJylcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpXG5jb25zdCBjb3JlID0gcmVxdWlyZSgnLi9jb3JlJylcbmNvbnN0IHRvb2xzID0gcmVxdWlyZSgnLi90b29scycpXG5cbmNvbnN0IGx2bDk5ID0ge1xuICBjb21tb24sXG4gIGNvcmUsXG4gIHV0aWxzLFxuICB0b29sc1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGx2bDk5XG4iLCIvKipcbiAqIExWTDk5IEJyZWFrcG9pbnRzXG4gKiBEZXRlY3QgdmlhIEpTIHdoYXQgdGhlIGJyZWFrcG9pbnQgaXMgYnkga2V5d29yZFxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKVxuXG5mdW5jdGlvbiBCcmVha3BvaW50cyAoc2l6ZXMpIHtcbiAgcmV0dXJuIHtcbiAgICAvKipcbiAgICAgKiBUaGUgZGVmaW5lZCBicmVha3BvaW50IG5hbWVzIHdpdGggbWluL21heCB3aWR0aHMgKGluIDcyZHBpIHBpeGVscylcbiAgICAgKiBTaG91bGQgY29pbmNpZGUgd2l0aCBDU1MgZm9yIG9wdGltdW0gZXhwZWN0ZWQgYmVoYXZpb3VyXG4gICAgICpcbiAgICAgKiBAcHJvcGVydHkgc2l6ZXNcbiAgICAgKiBAdHlwZSB7T2JqZWN0fSA9PiB7QXJyYXl9IFswID0ge051bWJlcn0gbWluV2lkdGgsIDEgPSB7TnVtYmVyfSBtYXhXaWR0aF1cbiAgICAgKi9cbiAgICBzaXplczogc2l6ZXMgfHwge1xuICAgICAgJ3hzJzogICAgICAgWzAsICAgIDM5OV0sXG4gICAgICAnbW9iaWxlJzogICBbMCwgICAgNzk5XSxcbiAgICAgICdtcyc6ICAgICAgIFs0MDAsICA1OTldLFxuICAgICAgJ3MnOiAgICAgICAgWzYwMCwgIDc5OV0sXG4gICAgICAnbSc6ICAgICAgICBbODAwLCAgOTk5XSxcbiAgICAgICd0YWJsZXQnOiAgIFs4MDAsICAxMTk5XSxcbiAgICAgICdsJzogICAgICAgIFsxMDAwLCAxMTk5XSxcbiAgICAgICdsYXB0b3AnOiAgIFsxMDAwLCAxMzk5XSxcbiAgICAgICdjb21wdXRlcic6IFsxMDAwLCA5OTk5OV0sXG4gICAgICAneGwnOiAgICAgICBbMTIwMCwgMTM5OV0sXG4gICAgICAnZGVza3RvcCc6ICBbMTIwMCwgOTk5OTldLFxuICAgICAgJ3h4bCc6ICAgICAgWzE0MDAsIDk5OTk5XVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgYSBzdHJpbmcgb2YgdGhlIGN1cnJlbnRseSBhY3RpdmUgYnJlYWtwb2ludHNcbiAgICAgKiBAbWV0aG9kIGdldEFjdGl2ZVxuICAgICAqIEByZXR1cm5zIHtBcnJheX1cbiAgICAgKi9cbiAgICBnZXRBY3RpdmUgKCkge1xuICAgICAgbGV0IHdpZHRoID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgIGxldCBicCA9IFtdXG5cbiAgICAgIGZvciAobGV0IHggaW4gdGhpcy5zaXplcykge1xuICAgICAgICBpZiAodGhpcy5zaXplcy5oYXNPd25Qcm9wZXJ0eSh4KSAmJiB3aWR0aCA+PSB0aGlzLnNpemVzW3hdWzBdICYmIHdpZHRoIDw9IHRoaXMuc2l6ZXNbeF1bMV0pIHtcbiAgICAgICAgICBicC5wdXNoKHgpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJwXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIGEgYnJlYWtwb2ludCBrZXl3b3JkIGlzIGN1cnJlbnRseSBhY3RpdmVcbiAgICAgKiBAbWV0aG9kIGlzQWN0aXZlXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59XG4gICAgICovXG4gICAgaXNBY3RpdmUgKGlucHV0KSB7XG4gICAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBpbnB1dCA9IGlucHV0LmpvaW4oJ3wnKVxuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGlucHV0ID09PSAnc3RyaW5nJykge1xuICAgICAgICBpbnB1dCA9IG5ldyBSZWdFeHAoJ1xcXFxiKD86JyArIGlucHV0LnJlcGxhY2UoL1tcXHMsXSsvZywgJ3wnKSArICcpXFxcXGInLCAnaScpXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpbnB1dC50ZXN0KHRoaXMuZ2V0QWN0aXZlKCkrJycpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gQnJlYWtwb2ludHNcbiIsIi8qKlxuICogTFZMOTkgRGVidWdcbiAqIEEgY29uc29sZS1saWtlIHJlcGxhY2VtZW50IHdoaWNoIGNyZWF0ZXMgYSBub29wIGNvbnNvbGUgb2JqZWN0IGlmIHlvdSBkb24ndCB3YW50IHRvIG91dHB1dCBzdHVmZiB2aWEgdGhlIGNvbnNvbGVcbiAqL1xuXG5mdW5jdGlvbiBub29wICgpIHt9XG5cbi8qKlxuICogRGVidWdcbiAqXG4gKiBAcGFyYW0ge0Jvb2xlYW59IHNpbGVudCBTZXQgdG8gdHJ1ZSB0byBtYWtlIHRoZSBjb25zb2xlIGJlaGF2aW91cnMgc2lsZW50XG4gKiBAY29uc3RydWN0b3JcbiAqL1xuZnVuY3Rpb24gRGVidWcgKHNpbGVudCA9IGZhbHNlKSB7XG4gIGlmIChzaWxlbnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2xlYXI6IG5vb3AsXG4gICAgICBjb3VudDogbm9vcCxcbiAgICAgIGRlYnVnOiBub29wLFxuICAgICAgZXJyb3I6IG5vb3AsXG4gICAgICBncm91cDogbm9vcCxcbiAgICAgIGluZm86IG5vb3AsXG4gICAgICBsb2c6IG5vb3AsXG4gICAgICB0YWJsZTogbm9vcCxcbiAgICAgIHRpbWU6IG5vb3AsXG4gICAgICB0aW1lRW5kOiBub29wLFxuICAgICAgdHJhY2U6IG5vb3AsXG4gICAgICB3YXJuOiBub29wXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb25zb2xlIHx8IHdpbmRvdy5jb25zb2xlXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBEZWJ1Z1xuIiwiLyoqXG4gKiBMVkw5OSBUb29sc1xuICpcbiAqIFN0YW5kYWxvbmUgdG9vbHMgdGhhdCBkb24ndCByZXF1aXJlIGFueSBkZXBlbmRlbmNpZXMgd2l0aGluIHRoZSBmcmFtZXdvcmssIGJ1dCB3b3JrIGFsb25nc2lkZVxuICovXG5cbmNvbnN0IEJyZWFrcG9pbnRzID0gcmVxdWlyZSgnLi9icmVha3BvaW50cycpXG5jb25zdCBEZWJ1ZyA9IHJlcXVpcmUoJy4vZGVidWcnKVxuY29uc3QgUXVldWUgPSByZXF1aXJlKCcuL3F1ZXVlJylcbmNvbnN0IFRyYWNrRXZlbnQgPSByZXF1aXJlKCcuL3RyYWNrZXZlbnQnKVxuY29uc3QgU21vb3RoU2Nyb2xsID0gcmVxdWlyZSgnLi9zbW9vdGgtc2Nyb2xsJylcblxuY29uc3QgdXRpbHMgPSB7XG4gIEJyZWFrcG9pbnRzLFxuICBEZWJ1ZyxcbiAgUXVldWUsXG4gIFRyYWNrRXZlbnQsXG4gIFNtb290aFNjcm9sbFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvb2xzXG4iLCIvKipcbiAqIExWTDk5IFF1ZXVlXG4gKlxuICogQmF0Y2ggYWN0aW9ucyBpbnRvIGEgZGVib3VuY2VkIHF1ZXVlXG4gKiBVc2VmdWwgdG8gcmVkdWNlIGFtb3VudCBvZiB3b3JrIGNvbXB1dGVyL2Jyb3dzZXIgZG9lc1xuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKVxuXG4vKipcbiAqIFF1ZXVlIGNsYXNzXG4gKlxuICogQHJldHVybnMge09iamVjdH1cbiAqIEBjb25zdHJ1Y3RvclxuICovXG5mdW5jdGlvbiBRdWV1ZSAob3B0aW9ucykge1xuICAvKipcbiAgICogUXVldWUgb3B0aW9uc1xuICAgKlxuICAgKiBAdHlwZSB7T2JqZWN0fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgbGV0IF9vcHRpb25zID0gbWVyZ2Uoe1xuICAgIHF1ZXVlOiB7fSxcbiAgICB0aW1lcjogMCxcbiAgICB0aW1lckRlbGF5OiAxMDBcbiAgfSwgb3B0aW9ucylcblxuICAvKipcbiAgICogVGhlIGJhdGNoZWQgcXVldWVcbiAgICogUXVldWUgYWN0aW9ucyBhcmUgYmF0Y2hlZCBpbiBhbiB7T2JqZWN0fSB3aXRoIGEgc3BlY2lmaWMgbGFiZWxcbiAgICpcbiAgICogQHR5cGUge09iamVjdH1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfcXVldWUgPSBfb3B0aW9ucy5xdWV1ZVxuXG4gIC8qKlxuICAgKiBUaGUgcXVldWUgdGltZXJcbiAgICogV2hlbiB0aGUgcXVldWUgaXMgYWRkZWQgdG8sIHRoZSB0aW1lciBpcyB1cGRhdGVkIHdpdGggYSBgc2V0VGltZW91dGAgY2FsbCB0byB0aGUgYHJ1bmAgZnVuY3Rpb25cbiAgICpcbiAgICogQHR5cGUge051bWJlcn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfdGltZXIgPSBfb3B0aW9ucy50aW1lclxuXG4gIC8qKlxuICAgKiBUaGUgcXVldWUgdGltZXIgZGVsYXlcbiAgICogVGhlIGRlbGF5IGJldHdlZW4gcXVldWUgdGltZXIgdXBkYXRlcyAoaW4gbWlsbGlzZWNvbmRzKVxuICAgKlxuICAgKiBAdHlwZSB7TnVtYmVyfVxuICAgKiBAZGVmYXVsdCAxMDBcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfdGltZXJEZWxheSA9IF9vcHRpb25zLnRpbWVyRGVsYXlcblxuICAvKipcbiAgICogVGhlIHBsYXkgc3RhdHVzXG4gICAqXG4gICAqIEB0eXBlIHtOdW1iZXJ9XG4gICAqIEBkZWZhdWx0IDFcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGxldCBfc3RhdHVzID0gMVxuXG4gIHJldHVybiB7XG4gICAgLyoqXG4gICAgICogUXVldWUgYW4gYWN0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTGFiZWwgQSB1bmlxdWUgbGFiZWwgZm9yIHRoZSBhY3Rpb24gaW4gdGhlIHF1ZXVlLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYW4gYmUgc2V0IHRvIHt1bmRlZmluZWR9ICh3aGljaCBtZWFucyB0aGUgYWN0aW9uIGNhbid0IGJlIHJlbW92ZWQpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIGFjdGlvblxuICAgICAqIEBwYXJhbSB7TWl4ZWR9IC4uLmFyZ3MgVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBhY3Rpb24gaGFuZGxlclxuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHF1ZXVlIChhY3Rpb25MYWJlbCwgYWN0aW9uLCAuLi5hcmdzKSB7XG4gICAgICAvLyBEZWZhdWx0IGFjdGlvbkxhYmVsIGlzIHRpbWUgdmFsdWUgYXMgc3RyaW5nXG4gICAgICBpZiAoIWFjdGlvbkxhYmVsKSB7XG4gICAgICAgIGFjdGlvbkxhYmVsID0gRGF0ZS5ub3coKSArICcnXG4gICAgICB9XG5cbiAgICAgIC8vIEFzc2lnbiB0aGUgZnVuY3Rpb24gdG8gdGhlIHF1ZXVlXG4gICAgICBpZiAoYWN0aW9uTGFiZWwgJiYgYWN0aW9uICYmIHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgX3F1ZXVlW2FjdGlvbkxhYmVsXSA9IHtcbiAgICAgICAgICBhY3Rpb24sXG4gICAgICAgICAgYXJnczogYXJnc1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEBjaGFpbmFibGVcbiAgICAgIHJldHVybiB0aGlzXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEFkZCBhY3Rpb24gdG8gdGhlIHF1ZXVlLiBBZnRlciBhZGRpbmcgdGhpcyB3aWxsIHN0YXJ0IHRoZSBxdWV1ZSB0aW1lciB0byB0aGVuIHJ1biB0aGUgcXVldWUgYWZ0ZXIgdGhlIGRlbGF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gYWN0aW9uTGFiZWwgQSB1bmlxdWUgbGFiZWwgZm9yIHRoZSBhY3Rpb24gaW4gdGhlIHF1ZXVlLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYW4gYmUgc2V0IHRvIHt1bmRlZmluZWR9ICh3aGljaCBtZWFucyB0aGUgYWN0aW9uIGNhbid0IGJlIHJlbW92ZWQpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gYWN0aW9uIFRoZSBmdW5jdGlvbiB0byBoYW5kbGUgdGhlIGFjdGlvblxuICAgICAqIEBwYXJhbSB7TWl4ZWR9IC4uLmFyZ3MgVGhlIGFyZ3VtZW50cyB0byBwYXNzIHRvIHRoZSBhY3Rpb24gaGFuZGxlclxuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIGFkZCAoYWN0aW9uTGFiZWwsIGFjdGlvbiwgLi4uYXJncykge1xuICAgICAgLy8gUXVldWUgdGhlIGFjdGlvblxuICAgICAgdGhpcy5xdWV1ZShhY3Rpb25MYWJlbCwgYWN0aW9uLCAuLi5hcmdzKVxuXG4gICAgICAvLyBQbGF5IHRoZSB0aW1lciB0byBnZXQgdGhlIHF1ZXVlIHRvIHJ1biBhZnRlciBhIGRlbGF5IChvbmx5IHdoZW4gcGxheWluZylcbiAgICAgIGlmIChfc3RhdHVzKSB7XG4gICAgICAgIHRoaXMucGxheSgpXG4gICAgICB9XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICAvLyBAZGVidWdcbiAgICAgIC8vICAgY29uc29sZS5sb2coJ3F1ZXVlIGlzIGN1cnJlbnRseSBwYXVzZWQnKVxuICAgICAgLy8gfVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBZGQgYWN0aW9uIGFuZCB0aGVuIHJ1biB0aGUgcXVldWUgaW1tZWRpYXRlbHlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25MYWJlbFxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGFjdGlvblxuICAgICAqIEBwYXJhbSB7TWl4ZWR9IGFjdGlvbkFyZ3NcbiAgICAgKiBAcmV0dXJuIHtTZWxmfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBzeW5jIChhY3Rpb25MYWJlbCwgYWN0aW9uLCAuLi5hcmdzKSB7XG4gICAgICBjbGVhclRpbWVvdXQoX3RpbWVyKVxuXG4gICAgICAvLyBRdWV1ZSBhY3Rpb24uLi5cbiAgICAgIHRoaXMucXVldWUoYWN0aW9uTGFiZWwsIGFjdGlvbiwgLi4uYXJncylcblxuICAgICAgLy8gLi4uIFRoZW4gcnVuIHRoZSBxdWV1ZSBpbW1lZGlhdGVseVxuICAgICAgdGhpcy5ydW4oKVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGFjdGlvbiBieSBpdHMgbGFiZWxcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBhY3Rpb25MYWJlbFxuICAgICAqIEByZXR1cm4ge3VuZGVmaW5lZHxPYmplY3R9XG4gICAgICovXG4gICAgZ2V0QWN0aW9uQnlMYWJlbCAoYWN0aW9uTGFiZWwpIHtcbiAgICAgIGlmIChfcXVldWUuaGFzT3duUHJvcGVydHkoYWN0aW9uTGFiZWwpKSB7XG4gICAgICAgIHJldHVybiBfcXVldWVbYWN0aW9uTGFiZWxdXG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1bmRlZmluZWRcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFjdGlvbiBmcm9tIHF1ZXVlLiBDYW4gb25seSByZW1vdmUgYWN0aW9ucyBpZiB5b3Uga25vdyB0aGVpciBsYWJlbFxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGFjdGlvbkxhYmVsXG4gICAgICogQHJldHVybiB7U2VsZn1cbiAgICAgKiBAY2hhaW5hYmxlXG4gICAgICovXG4gICAgcmVtb3ZlIChhY3Rpb25MYWJlbCkge1xuICAgICAgaWYgKF9xdWV1ZS5oYXNPd25Qcm9wZXJ0eShhY3Rpb25MYWJlbCkpIHtcbiAgICAgICAgX3F1ZXVlW2FjdGlvbkxhYmVsXSA9IHVuZGVmaW5lZFxuICAgICAgICBkZWxldGUgX3F1ZXVlW2FjdGlvbkxhYmVsXVxuICAgICAgfVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQbGF5IHRoZSBxdWV1ZSB0aW1lciAod2lsbCBydW4gcXVldWUgYWZ0ZXIgdGltZXIgZGVsYXkpXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTZWxmfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBwbGF5ICgpIHtcbiAgICAgIC8vIE9ubHkgcGxheSBpZiBhbHJlYWR5IHBhdXNlZFxuICAgICAgY2xlYXJUaW1lb3V0KF90aW1lcilcblxuICAgICAgLy8gU2V0IHRvIHBsYXlpbmdcbiAgICAgIF9zdGF0dXMgPSAxXG5cbiAgICAgIC8vIFJlc2V0IHRpbWVyIHRvIHJ1biB0aGUgcXVldWVcbiAgICAgIF90aW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24gcnVuUXVldWVQcm9jZXNzQWZ0ZXJEZWxheShxdWV1ZUluc3RhbmNlKSB7XG4gICAgICAgIHF1ZXVlSW5zdGFuY2UucnVuKClcbiAgICAgIH0odGhpcyksIF90aW1lckRlbGF5KVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQYXVzZSB0aGUgcXVldWUgdGltZXJcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1NlbGZ9XG4gICAgICogQGNoYWluYWJsZVxuICAgICAqL1xuICAgIHBhdXNlICgpIHtcbiAgICAgIC8vIE9ubHkgcGF1c2UgaWYgYWxyZWFkeSBwbGF5aW5nXG4gICAgICBjbGVhclRpbWVvdXQoX3RpbWVyKVxuXG4gICAgICAvLyBTZXQgdG8gcGF1c2VkXG4gICAgICBfc3RhdHVzID0gMFxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzL3J1biBhbGwgdGhlIGFjdGlvbnMgaW4gdGhlIHF1ZXVlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTZWxmfVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKi9cbiAgICBydW4gKCkge1xuICAgICAgY2xlYXJUaW1lb3V0KF90aW1lcilcblxuICAgICAgLy8gTm8gaXRlbXMgaW4gdGhlIHF1ZXVlLCBzbyBzZXQgdG8gcGF1c2VcbiAgICAgIGlmICghT2JqZWN0LmtleXMoX3F1ZXVlKS5sZW5ndGgpIHtcbiAgICAgICAgdGhpcy5wYXVzZSgpXG5cbiAgICAgICAgcmV0dXJuIHRoaXNcbiAgICAgIH1cblxuICAgICAgLy8gUHJvY2VzcyB0aGUgcXVldWVcbiAgICAgIGZvciAobGV0IGFjdGlvbkxhYmVsIGluIF9xdWV1ZSkge1xuICAgICAgICBpZiAoX3F1ZXVlLmhhc093blByb3BlcnR5KGFjdGlvbkxhYmVsKSAmJiBfcXVldWVbYWN0aW9uTGFiZWxdKSB7XG4gICAgICAgICAgbGV0IHF1ZXVlZEl0ZW0gPSBfcXVldWVbYWN0aW9uTGFiZWxdXG5cbiAgICAgICAgICAvLyBAZGVidWdcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZygncnVubmluZyBxdWV1ZWQgaXRlbScsIHF1ZXVlZEl0ZW0pXG5cbiAgICAgICAgICAvLyBGdW5jdGlvblxuICAgICAgICAgIGlmIChxdWV1ZWRJdGVtICYmIHR5cGVvZiBxdWV1ZWRJdGVtID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBxdWV1ZWRJdGVtKClcblxuICAgICAgICAgIC8vIE9iamVjdFxuICAgICAgICAgIH0gZWxzZSBpZiAocXVldWVkSXRlbS5oYXNPd25Qcm9wZXJ0eSgnYWN0aW9uJykgJiYgdHlwZW9mIHF1ZXVlZEl0ZW0uYWN0aW9uID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBBcHBseSBhcmd1bWVudHMgdG8gdGhlIGFjdGlvblxuICAgICAgICAgICAgaWYgKHF1ZXVlZEl0ZW0uaGFzT3duUHJvcGVydHkoJ2FyZ3MnKSAmJiBxdWV1ZWRJdGVtLmFyZ3MgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICBxdWV1ZWRJdGVtLmFjdGlvbiguLi5xdWV1ZWRJdGVtLmFyZ3MpXG5cbiAgICAgICAgICAgIC8vIFJ1biB0aGUgYWN0aW9uIGxpa2Ugbm9ybWFsXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBxdWV1ZWRJdGVtLmFjdGlvbigpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRGVsZXRlIHRoZSBxdWV1ZWQgaXRlbVxuICAgICAgICAgIF9xdWV1ZVthY3Rpb25MYWJlbF0gPSB1bmRlZmluZWRcbiAgICAgICAgICBkZWxldGUgX3F1ZXVlW2FjdGlvbkxhYmVsXVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIENvbnRpbnVlIHBsYXlpbmcgaWYgaW4gcGxheSBtb2RlXG4gICAgICAvLyBpZiAoX3N0YXR1cykge1xuICAgICAgLy8gICB0aGlzLnBsYXkoKVxuICAgICAgLy8gfVxuXG4gICAgICAvLyBAY2hhaW5hYmxlXG4gICAgICByZXR1cm4gdGhpc1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHN0YXR1cyBvZiB0aGUgcXVldWU6XG4gICAgICogICAwID0gUGF1c2VkXG4gICAgICogICAxID0gUGxheWluZ1xuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgY2hlY2tTdGF0dXMgKCkge1xuICAgICAgcmV0dXJuIF9zdGF0dXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSB0aW1lciBkZWxheVxuICAgICAqXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRUaW1lckRlbGF5ICgpIHtcbiAgICAgIHJldHVybiBfdGltZXJEZWxheVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIHRpbWVyIGRlbGF5XG4gICAgICpcbiAgICAgKiBAcGFyYW0gdGltZXJEZWxheVxuICAgICAqIEBjaGFpbmFibGVcbiAgICAgKiBAcmV0dXJucyB7U2VsZn1cbiAgICAgKi9cbiAgICBzZXRUaW1lckRlbGF5ICh0aW1lckRlbGF5KSB7XG4gICAgICAvLyBPbmx5IHNldCBpZiB0aW1lckRlbGF5IGlzIGdyZWF0ZXIgdGhhbiAwXG4gICAgICBpZiAodGltZXJEZWxheSAmJiB0aW1lckRlbGF5ID4gMCkge1xuICAgICAgICBfdGltZXJEZWxheSA9IHRpbWVyRGVsYXlcbiAgICAgIH1cblxuICAgICAgLy8gQGNoYWluYWJsZVxuICAgICAgcmV0dXJuIHRoaXNcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBsZW5ndGggb2YgdGhlIHF1ZXVlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0UXVldWVMZW5ndGggKCkge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKF9xdWV1ZSkubGVuZ3RoXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUXVldWVcbiIsIi8qKlxuICogTFZMOTkgU21vb3RoIFNjcm9sbFxuICpcbiAqIFNtb290aGx5IHNjcm9sbCB0byBpbnRlcm5hbCBhbmNob3IgbGlua3Mgb24gYSBwYWdlLlxuICpcbiAqICMjIFVzYWdlXG4gKlxuICogU21vb3RoIFNjcm9sbCBuZWVkcyB0byBiZSBpbml0aWFsaXNlZCB3aXRoIGpRdWVyeSBhbmQgYW55IGNvbmZpZ3VyZWQgb3B0aW9ucy4gRHVyaW5nIGluaXRpYWxpc2F0aW9uIHRoZSBzY3JpcHQgd2lsbFxuICogYXBwbHkgdGhlIGJlaGF2aW91cnMgdG8gYW55IGFwcGxpY2FibGUgYW5jaG9yIGxpbmtzLlxuICpcbiAqIGBgYFxuICogICBsZXQgU21vb3RoU2Nyb2xsID0gcmVxdWlyZSgnbHZsOTkvZXM2L3Rvb2xzL3Ntb290aC1zY3JvbGwnKShqUXVlcnksIHsgYnVmZmVyVG9wOiAwIH0pXG4gKiBgYGBcbiAqXG4gKiBZb3UgY2FuIGFsc28gaW5pdGlhbGlzZSB0aGUgc21vb3RoU2Nyb2xsIGJlaGF2aW91cnMgYnkgY2FsbGluZyBgc21vb3RoU2Nyb2xsLmluaXQoKWAuIFRoaXMgd2lsbCBhdHRhY2ggdGhlIG5lY2Vzc2FyeVxuICogZXZlbnRzIG9uIHRvIGFuY2hvciBsaW5rcy5cbiAqXG4gKiBZb3UgY2FuIHRyaWdnZXIgdGhlIHNjcm9sbFRvIGV2ZW50IGJ5IHVzaW5nIHRoZSBjdXN0b20gZXZlbnQgYFNtb290aFNjcm9sbC5zY3JvbGxUb2AsIGUuZy46XG4gKlxuICogYGBgXG4gKiAgICQoZG9jdW1lbnQpLnRyaWdnZXIoJ1Ntb290aFNjcm9sbC5zY3JvbGxUbycsIFsgc2Nyb2xsVG9PcHRpb25zIF0pXG4gKiBgYGBcbiAqXG4gKiBUaGUgYHNjcm9sbFRvYCBmdW5jdGlvbiBlbWl0cyBhIGN1c3RvbSBldmVudCBgU21vb3RoU2Nyb2xsLnNjcm9sbFRvOnN0YXJ0YCB3aGVuIHRoZSBhY3Rpb24gaXMgaW52b2tlZCBhbmRcbiAqIGBTbW9vdGhTY3JvbGwuc2Nyb2xsVG86ZW5kYCB3aGVuIGl0IGZpbmlzaGVzLlxuICpcbiAqIEBwYWNrYWdlIGx2bDk5XG4gKi9cblxuY29uc3QgU21vb3RoU2Nyb2xsID0gZnVuY3Rpb24gKCQsIG9wdGlvbnMpIHtcbiAgLyoqXG4gICAqIExvYWQgaW4gdGhlIHNldHRpbmdzXG4gICAqL1xuICBjb25zdCBzZXR0aW5ncyA9ICQuZXh0ZW5kKHtcbiAgICAvLyBUaGUgc3BhY2UgYmV0d2VlbiB0aGUgdG9wIG9mIHRoZSB3aW5kb3cgYW5kIHRoZSB0b3Agb2YgdGhlIHRhcmdldFxuICAgIGJ1ZmZlclRvcDogMCxcblxuICAgIC8vIFRoZSBzcGVlZCB0byBzY3JvbGwgdGhlIHdpbmRvd1xuICAgIHNjcm9sbFNwZWVkOiAxMDAwLFxuXG4gICAgLy8gVGhlIGRpc3RhbmNlIGZyb20gdG9wIG9mIHdpbmRvdyB0byB0b3Agb2YgdGFyZ2V0IGVsZW1lbnQgdG8gdHJpZ2dlciBzY3JvbGxpbmdcbiAgICB0cmlnZ2VyRGlzdGFuY2U6IDQwMFxuICB9LCBvcHRpb25zKVxuXG4gIC8qKlxuICAgKiBTbW9vdGhseSBzY3JvbGwgdG8gYSB0YXJnZXRcbiAgICpcbiAgICogQHBhcmFtIHtTdHJpbmd8SFRNTEVsZW1lbnR8alF1ZXJ5T2JqZWN0fSB0YXJnZXRcbiAgICovXG4gIGZ1bmN0aW9uIHNjcm9sbFRvICh0YXJnZXQsIHNjcm9sbFRvT3B0aW9ucykge1xuICAgIC8vIEZpZ3VyZSBvdXQgZWxlbWVudCB0byBzY3JvbGwgdG9cbiAgICBsZXQgJHRhcmdldCA9ICQodGFyZ2V0KS5ub3QoJ1tkYXRhLWRpc2FibGUtc21vb3RoLXNjcm9sbF0nKVxuXG4gICAgLy8gTW9yZSB0aGFuIG9uZSB0YXJnZXQsIGRlZmF1bHQgdG8gZmlyc3RcbiAgICAkdGFyZ2V0ID0gKCR0YXJnZXQubGVuZ3RoID4gMSA/ICR0YXJnZXQuZXEoMCkgOiAkdGFyZ2V0KVxuXG4gICAgLy8gRG9lcyBhIHNjcm9sbCB0YXJnZXQgZXhpc3Q/XG4gICAgaWYgKCR0YXJnZXQubGVuZ3RoID09PSAxKSB7XG4gICAgICAvLyBMb2FkIGluIHBlci11c2Ugc2V0dGluZ3NcbiAgICAgIGxldCBzY3JvbGxUb1NldHRpbmdzID0gJC5leHRlbmQoe30sIHNldHRpbmdzLCBzY3JvbGxUb09wdGlvbnMpXG5cbiAgICAgIC8vIEdldCB0aGUgdGFyZ2V0J3MgdG9wIG9mZnNldFxuICAgICAgbGV0IHRhcmdldE9mZnNldFRvcCA9ICR0YXJnZXQub2Zmc2V0KCkudG9wXG5cbiAgICAgIC8vIEdldCBjdXJyZW50IHdpbmRvdyBzY3JvbGxUb3BcbiAgICAgIGxldCB3aW5kb3dTY3JvbGxUb3AgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKClcblxuICAgICAgLy8gU3VwcG9ydCBkeW5hbWljIGJ1ZmZlclRvcCBpZiBpdCBpcyBhIGZ1bmN0aW9uXG4gICAgICBsZXQgc2Nyb2xsVG9wID0gdGFyZ2V0T2Zmc2V0VG9wIC0gKHR5cGVvZiBzY3JvbGxUb1NldHRpbmdzLmJ1ZmZlclRvcCA9PT0gJ2Z1bmN0aW9uJyA/IHNjcm9sbFRvU2V0dGluZ3MuYnVmZmVyVG9wKCkgOiBzY3JvbGxUb1NldHRpbmdzLmJ1ZmZlclRvcClcblxuICAgICAgLy8gRG9uJ3QgdHJpZ2dlciB0aGUgc2Nyb2xsIGlmIHRoZSBkaXN0YW5jZSBpcyB3aXRoaW5cbiAgICAgIGxldCBjaGVja1RyaWdnZXJEaXN0YW5jZSA9IE1hdGguYWJzKHdpbmRvd1Njcm9sbFRvcCAtIHNjcm9sbFRvcClcbiAgICAgIGlmIChjaGVja1RyaWdnZXJEaXN0YW5jZSA8IHNjcm9sbFRvU2V0dGluZ3MudHJpZ2dlckRpc3RhbmNlKSB7XG4gICAgICAgIHJldHVyblxuICAgICAgfVxuXG4gICAgICAvKipcbiAgICAgICAqIEVtaXQgc3RhcnQgZXZlbnRcbiAgICAgICAqXG4gICAgICAgKiBAZXZlbnQgU21vb3RoU2Nyb2xsLnNjcm9sbFRvOnN0YXJ0XG4gICAgICAgKiBAcGFyYW0ge2pRdWVyeU9iamVjdH0gJHRhcmdldFxuICAgICAgICogQHBhcmFtIHtPYmplY3R9XG4gICAgICAgKi9cbiAgICAgICR0YXJnZXQudHJpZ2dlcignU21vb3RoU2Nyb2xsLnNjcm9sbFRvOnN0YXJ0JywgWyBzY3JvbGxUb1NldHRpbmdzIF0pXG5cbiAgICAgIC8vIERvIHRoZSBzY3JvbGwgdGhpbmdcbiAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgc2Nyb2xsVG9wXG4gICAgICB9LCBzY3JvbGxUb1NldHRpbmdzLnNjcm9sbFNwZWVkLCAoKSA9PiB7XG4gICAgICAgIC8vIENhbGxiYWNrIGFmdGVyIGFuaW1hdGlvblxuICAgICAgICAvLyBNdXN0IGNoYW5nZSBmb2N1cyFcbiAgICAgICAgJHRhcmdldC5mb2N1cygpXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEVtaXQgZW5kIGV2ZW50XG4gICAgICAgICAqXG4gICAgICAgICAqIEBldmVudCBTbW9vdGhTY3JvbGwuc2Nyb2xsVG86ZW5kXG4gICAgICAgICAqIEBwYXJhbSB7alF1ZXJ5T2JqZWN0fSAkdGFyZ2V0XG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fVxuICAgICAgICAgKi9cbiAgICAgICAgJHRhcmdldC50cmlnZ2VyKCdTbW9vdGhTY3JvbGwuc2Nyb2xsVG86ZW5kJywgWyBzY3JvbGxUb1NldHRpbmdzIF0pXG5cbiAgICAgICAgLy8gQ2hlY2tpbmcgaWYgdGhlIHRhcmdldCB3YXMgZm9jdXNlZFxuICAgICAgICBpZiAoJHRhcmdldC5pcygnOmZvY3VzJykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSW5pdGlhbGlzZSBhbGwgbGlua3Mgb24gdGhlIHBhZ2Ugd2l0aCB0aGUgc21vb3RoU2Nyb2xsIGZ1bmN0aW9uYWxpdHlcbiAgICovXG4gIGZ1bmN0aW9uIGluaXQgKCkge1xuICAgIC8vIEF0dGFjaCBsaW5rIGJlaGF2aW91cnNcbiAgICAkKCdhW2hyZWYqPVwiI1wiXScpXG4gICAgLy8gUmVtb3ZlIGxpbmtzIHRoYXQgZG9uJ3QgYWN0dWFsbHkgbGluayB0byBhbnl0aGluZ1xuICAgICAgLm5vdCgnW2hyZWY9XCIjXCJdJylcbiAgICAgIC5ub3QoJ1tocmVmPVwiIzBcIl0nKVxuICAgICAgLmNsaWNrKGV2ZW50ID0+IHtcbiAgICAgICAgY29uc3QgJGEgPSAkKGV2ZW50LnRhcmdldCkuY2xvc2VzdCgnYScpXG4gICAgICAgIGNvbnN0IGhhc2ggPSAkYS5hdHRyKCdocmVmJykucmVwbGFjZSgvLiojKFteP10rKS4qLywgJyMkMScpXG4gICAgICAgIGlmICgkKGhhc2gpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgc2Nyb2xsVG8oaGFzaClcbiAgICAgICAgfVxuICAgICAgfSlcblxuICAgIC8vIEF0dGFjaCBjdXN0b20gZXZlbnQgdG8gdHJpZ2dlciB0aHJvdWdoIERPTVxuICAgICQoZG9jdW1lbnQpLm9uKCdTbW9vdGhTY3JvbGwuc2Nyb2xsVG8nLCBmdW5jdGlvbiAoZXZlbnQsIHNjcm9sbFRvT3B0aW9ucykge1xuICAgICAgaWYgKGV2ZW50LnRhcmdldCkge1xuICAgICAgICBzY3JvbGxUbyhldmVudC50YXJnZXQsIHNjcm9sbFRvT3B0aW9ucylcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgLy8gQ2hlY2sgdG8gc2VlIGlmIGEgaGFzaCBpcyBsb2NhdGVkIGluIHRoZSB3aW5kb3cubG9jYXRpb24gYW5kIHNjcm9sbCB0byB0aGUgZWxlbWVudFxuICAgIGlmICh3aW5kb3cubG9jYXRpb24uaGFzaCkge1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNjcm9sbFRvKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuICAgICAgfSwgMTAwMClcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGluaXQsXG4gICAgc2Nyb2xsVG9cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNtb290aFNjcm9sbFxuIiwiLyoqXG4gKiBMVkw5OSBUcmFjayBFdmVudFxuICogQ2FjaGVzIHRyYWNrZWQgZXZlbnRzIHVudGlsIEdvb2dsZSBBbmFseXRpY3MgaXMgbG9hZGVkLCB0aGVuIHVwbG9hZHMgdG8gR0FcbiAqXG4gKiBAcGFja2FnZSBsdmw5OVxuICovXG5cbmZ1bmN0aW9uIFRyYWNrRXZlbnQgKGRlYnVnKSB7XG4gIC8qKlxuICAgKiBDb2xsZWN0IHRyYWNrZWQgZXZlbnRzIGJlZm9yZSBHQSBpcyBsb2FkZWRcbiAgICogQHR5cGUge0FycmF5fVxuICAgKi9cbiAgbGV0IHNhdmVkID0gW11cblxuICAvKipcbiAgICogU3RhcnQgY2hlY2tpbmcgdG8gc2VlIGlmIHRoZSBHQSBvYmplY3QgaXMgbG9hZGVkXG4gICAqL1xuICAvKipcbiAgICogRGV0ZWN0IGlmIEdBIGlzIGxvYWRlZCBhbmQgdGhlbiBzZW5kIGFueSBzdG9yZWQgR0EgZXZlbnRzXG4gICAqL1xuICB0aGlzLmdhTG9hZGVkVGltZXIgPSBzZXRJbnRlcnZhbCgoZnVuY3Rpb24gKGx2bDk5VHJhY2tFdmVudCkge1xuICAgIGxldCBpXG5cbiAgICAvLyBXYWl0IHVudGlsIEdBIG9iamVjdCBpcyBhdmFpbGFibGVcbiAgICBpZiAodHlwZW9mIHdpbmRvdy5nYSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwobHZsOTlUcmFja0V2ZW50LmdhTG9hZGVkVGltZXIpXG5cbiAgICAgIC8vIFNlbmQgc2F2ZWQgZXZlbnRzXG4gICAgICBpZiAobHZsOTlUcmFja0V2ZW50LnNhdmVkLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKGRlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGBTZW5kaW5nICR7bHZsOTlUcmFja0V2ZW50LnNhdmVkLmxlbmd0aH0gdHJhY2tlZCBldmVudHMgdG8gZ2FgKVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChpIGluIGx2bDk5VHJhY2tFdmVudC5zYXZlZCkge1xuICAgICAgICAgIHdpbmRvdy5nYSgnc2VuZCcsIGx2bDk5VHJhY2tFdmVudC5zYXZlZFtpXSlcbiAgICAgICAgfVxuICAgICAgICBsdmw5OVRyYWNrRXZlbnQuc2F2ZWQgPSBbXVxuICAgICAgfVxuICAgIH1cbiAgfSh0aGlzKSksIDUwMDApXG5cbiAgLyoqXG4gICAqIFRyYWNrIGV2ZW50IG1hZ2ljXG4gICAqIEBwYXJhbSBldmVudENhdGVnb3J5XG4gICAqIEBwYXJhbSBldmVudEFjdGlvblxuICAgKiBAcGFyYW0gZXZlbnRMYWJlbFxuICAgKiBAcGFyYW0gZXZlbnRWYWx1ZVxuICAgKi9cbiAgcmV0dXJuIGZ1bmN0aW9uIHRyYWNrIChldmVudENhdGVnb3J5LCBldmVudEFjdGlvbiwgZXZlbnRMYWJlbCwgZXZlbnRWYWx1ZSkge1xuICAgIGxldCB0cmFja2VkRXZlbnQgPSB7XG4gICAgICBoaXRUeXBlOiAnZXZlbnQnLFxuICAgICAgZXZlbnRDYXRlZ29yeTogZXZlbnRDYXRlZ29yeSxcbiAgICAgIGV2ZW50QWN0aW9uOiBldmVudEFjdGlvbixcbiAgICAgIGV2ZW50TGFiZWw6IGV2ZW50TGFiZWwsXG4gICAgICBldmVudFZhbHVlOiBldmVudFZhbHVlXG4gICAgfVxuXG4gICAgaWYgKCFldmVudENhdGVnb3J5IHx8ICFldmVudEFjdGlvbikgcmV0dXJuO1xuICAgIGlmICh0eXBlb2YgZXZlbnRWYWx1ZSA9PT0gJ3N0cmluZycpIHJldHVybjtcblxuICAgIC8vIEdBIGlzIGxvYWRlZFxuICAgIGlmICh0eXBlb2Ygd2luZG93LmdhICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKGRlYnVnICYmIHdpbmRvdy5jb25zb2xlICYmIHdpbmRvdy5jb25zb2xlLmxvZykge1xuICAgICAgICBjb25zb2xlLmxvZygnU2VuZCB0cmFja2VkRXZlbnQgdG8gR0EnLCB0cmFja2VkRXZlbnQpXG4gICAgICB9XG4gICAgICB3aW5kb3cuZ2EoJ3NlbmQnLCB0cmFja2VkRXZlbnQpXG5cbiAgICAgIC8vIHdhaXRpbmcgZm9yIEdBIHRvIGxvYWQsIHVzZSBpbnRlcm5hbCB2YXIgdG8gY29sbGVjdFxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZGVidWcgJiYgd2luZG93LmNvbnNvbGUgJiYgd2luZG93LmNvbnNvbGUubG9nKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdHQSBub3QgbG9hZGVkIHlldCwgc3RvcmUgdHJhY2tlZEV2ZW50JywgdHJhY2tlZEV2ZW50KVxuICAgICAgfVxuICAgICAgdGhpcy5zYXZlZC5wdXNoKHRyYWNrZWRFdmVudClcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBUcmFja0V2ZW50XG4iLCIvKipcbiAqIExWTDk5IFV0aWxzXG4gKlxuICogVXRpbGl0aWVzIHVzZWQgdGhyb3VnaG91dCB0aGUgZnJhbWV3b3JrXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBwYXJzZSA9IHJlcXVpcmUoJy4vcGFyc2UnKVxuY29uc3QgaW5oZXJpdGFuY2UgPSByZXF1aXJlKCcuL2luaGVyaXRhbmNlJylcbi8vIGNvbnN0IHN1cGVyID0gcmVxdWlyZSgnLi9zdXBlcicpXG5cbmNvbnN0IHV0aWxzID0ge1xuICBwYXJzZSxcbiAgaW5oZXJpdGFuY2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsc1xuIiwiLyoqXG4gKiBMVkw5OSBJbmhlcml0YW5jZSB1dGlsaXRpZXNcbiAqL1xuXG5jb25zdCBSRV9QUklWQVRFID0gL15fL1xuXG4vKipcbiAqIEFzc2lnbiBwdWJsaWMgZ2V0dGVyL3NldHRlciBwcm9wZXJ0aWVzIHRvIHRoZSB0YXJnZXQuIFRoaXMgd2lsbCByZWZlcmVuY2UgdGhlIHRhcmdldCBwcm9wZXJ0eSAoaWYgaXQgaXMgc2V0KVxuICogb3RoZXJ3aXNlIHVzZSB0aGUgZGVmYXVsdCBwcm9wZXJ0eSB2YWx1ZS4gWW91IGNhbiBhbHNvIHdoaXRlbGlzdCB0aGUgcHJvcGVydGllcyB5b3Ugd2FudCB0byBzZWxlY3RpdmVseVxuICogZXhwb3NlIGJ5IG5hbWUuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IGRlZmF1bHRQcm9wVmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSB3aGl0ZWxpc3RcbiAqL1xuZnVuY3Rpb24gZXhwb3NlQWxsUHJvcGVydGllcyAodGFyZ2V0LCBkZWZhdWx0UHJvcFZhbHVlcywgd2hpdGVsaXN0KSB7XG4gIGxldCBwcm9wZXJ0aWVzXG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHRhcmdldCB3YXMgZ2l2ZW4nKVxuICB9XG5cbiAgLy8gRmlsdGVyIG5vbi13aGl0ZWxpc3RlZCBwcm9wZXJ0aWVzXG4gIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpLmZpbHRlcihpdGVtID0+IHtcbiAgICByZXR1cm4gKHdoaXRlbGlzdCAmJiB3aGl0ZWxpc3QuaW5jbHVkZXMoaXRlbSkpIHx8ICF3aGl0ZWxpc3RcbiAgfSlcblxuICAvLyBAZGVidWdcbiAgLy8gY29uc29sZS5sb2coJ2ZpbHRlcmVkIHByb3BlcnRpZXMnLCBwcm9wZXJ0aWVzKVxuXG4gIGlmICghcHJvcGVydGllcyB8fCAhcHJvcGVydGllcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHByb3BlcnRpZXMgd2VyZSBnaXZlbicpXG4gIH1cblxuICAvLyBEZWZhdWx0IHByb3AgdmFsdWVzIHRvIHRhcmdldFxuICBpZiAodHlwZW9mIGRlZmF1bHRQcm9wVmFsdWVzID09PSAndW5kZWZpbmVkJykge1xuICAgIGRlZmF1bHRQcm9wVmFsdWVzID0gdGFyZ2V0XG4gIH1cblxuICAvLyBQcm9jZXNzIGFuZCBleHBvc2UgdGhlIHByb3BlcnRpZXMgb24gdGhlIHRhcmdldFxuICBwcm9wZXJ0aWVzLmZvckVhY2gocHJvcE5hbWUgPT4ge1xuICAgIGxldCB1c2VQcm9wTmFtZSA9IHByb3BOYW1lXG5cbiAgICAvLyBQcml2YXRlIHZhbHVlcyBjYW4gb25seSBoYXZlIGEgcHVibGljIGdldHRlclxuICAgIGlmIChSRV9QUklWQVRFLnRlc3QocHJvcE5hbWUpKSB7XG4gICAgICB1c2VQcm9wTmFtZSA9IHByb3BOYW1lLnJlcGxhY2UoUkVfUFJJVkFURSwgJycpXG5cbiAgICAgIC8vIEBkZWJ1Z1xuICAgICAgLy8gY29uc29sZS5sb2coJ0ZvdW5kIHByaXZhdGUgcHJvcGVydHknLCB7XG4gICAgICAvLyAgIHByb3BOYW1lLFxuICAgICAgLy8gICB1c2VQcm9wTmFtZSxcbiAgICAgIC8vICAgcHJvcFZhbHVlOiBkZWZhdWx0UHJvcFZhbHVlc1twcm9wTmFtZV0sXG4gICAgICAvLyAgIHRhcmdldFxuICAgICAgLy8gfSlcblxuICAgICAgLy8gSGlkZSBvcmlnaW5hbCBwcml2YXRlIHZhbHVlXG4gICAgICAvLyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBwcm9wTmFtZSwge1xuICAgICAgLy8gICBlbnVtZXJhYmxlOiBmYWxzZVxuICAgICAgLy8gfSlcblxuICAgICAgLy8gQ3JlYXRlIHB1YmxpYyBpbnRlcmZhY2VcbiAgICAgIGNyZWF0ZVB1YmxpY0dldFByb3BlcnR5KHRhcmdldCwgcHJvcE5hbWUsIHVzZVByb3BOYW1lLCBkZWZhdWx0UHJvcFZhbHVlc1twcm9wTmFtZV0pXG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQGRlYnVnXG4gICAgICAvLyBjb25zb2xlLmxvZygnRm91bmQgcHVibGljIHByb3BlcnR5Jywge1xuICAgICAgLy8gICBwcm9wTmFtZSxcbiAgICAgIC8vICAgdXNlUHJvcE5hbWUsXG4gICAgICAvLyAgIHByb3BWYWx1ZTogcHJvcGVydGllc1twcm9wTmFtZV0sXG4gICAgICAvLyAgIHRhcmdldFxuICAgICAgLy8gfSlcblxuICAgICAgLy8gQ3JlYXRlIHB1YmxpYyBpbnRlcmZhY2VcbiAgICAgIGNyZWF0ZVB1YmxpY0dldFNldFByb3BlcnR5KHRhcmdldCwgcHJvcE5hbWUsIHVzZVByb3BOYW1lLCBkZWZhdWx0UHJvcFZhbHVlc1twcm9wTmFtZV0pXG4gICAgfVxuICB9KVxufVxuXG4vKipcbiAqIEV4cG9zZSBvbmx5IHRoZSBwcml2YXRlIHByb3BlcnRpZXMgbGlzdGVkIG9uIHRoZSB0YXJnZXQgd2l0aCBwdWJsaWMgZ2V0dGVyIHByb3BlcnR5LiBXaGl0ZWxpc3Qgb25seSB0aG9zZSB5b3Ugd2FudFxuICogYnkgYWRkaW5nIHRoZSBwcm9wZXJ0eSdzIG5hbWUgdG8gdGhlIHdoaXRlbGlzdCB7QXJyYXl9XG4gKlxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R8RnVuY3Rpb259IGRlZmF1bHRQcm9wVmFsdWVzXG4gKiBAcGFyYW0ge0FycmF5fSB3aGl0ZWxpc3RcbiAqL1xuZnVuY3Rpb24gZXhwb3NlUHJpdmF0ZVByb3BlcnRpZXModGFyZ2V0LCBkZWZhdWx0UHJvcFZhbHVlcywgd2hpdGVsaXN0KSB7XG4gIGxldCBwcm9wZXJ0aWVzXG5cbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHRhcmdldCB3YXMgZ2l2ZW4nKVxuICB9XG5cbiAgLy8gRmlsdGVyIG5vbi1wcml2YXRlIG9yIG5vbi13aGl0ZWxpc3RlZCBwcm9wZXJ0aWVzXG4gIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyh0YXJnZXQpLmZpbHRlcihpdGVtID0+IHtcbiAgICBpZiAoKHdoaXRlbGlzdCAmJiB3aGl0ZWxpc3QuaW5jbHVkZXMoaXRlbSkpIHx8ICF3aGl0ZWxpc3QpIHtcbiAgICAgIHJldHVybiBSRV9QUklWQVRFLnRlc3QoaXRlbSlcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH0pXG5cbiAgLy8gQGRlYnVnXG4gIC8vIGNvbnNvbGUubG9nKCdmaWx0ZXJlZCBwcm9wZXJ0aWVzJywgcHJvcGVydGllcylcblxuICAvLyBTaWxlbnQgZGVhdGhcbiAgaWYgKCFwcm9wZXJ0aWVzLmxlbmd0aCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgLy8gRGVmYXVsdCBwcm9wIHZhbHVlcyB0byB0YXJnZXRcbiAgaWYgKHR5cGVvZiBkZWZhdWx0UHJvcFZhbHVlcyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkZWZhdWx0UHJvcFZhbHVlcyA9IHRhcmdldFxuICB9XG5cbiAgLy8gUHJvY2VzcyBhbmQgZXhwb3NlIHRoZSBwcm9wZXJ0aWVzIG9uIHRoZSB0YXJnZXRcbiAgcHJvcGVydGllcy5mb3JFYWNoKHByb3BOYW1lID0+IHtcbiAgICBsZXQgdXNlUHJvcE5hbWUgPSBwcm9wTmFtZVxuXG4gICAgLy8gQ3JlYXRlIGEgcHVibGljIGhhbmRsZSBmb3IgdGhlIHByaXZhdGUgcHJvcGVydHkgKHJlbW92ZXMgdGhlIFwiX1wiIGF0IHRoZSBzdGFydClcbiAgICB1c2VQcm9wTmFtZSA9IHByb3BOYW1lLnJlcGxhY2UoUkVfUFJJVkFURSwgJycpXG5cbiAgICAvLyBDcmVhdGUgcHVibGljIGludGVyZmFjZVxuICAgIGNyZWF0ZVB1YmxpY0dldFByb3BlcnR5KHRhcmdldCwgcHJvcE5hbWUsIHVzZVByb3BOYW1lLCBkZWZhdWx0UHJvcFZhbHVlc1twcm9wTmFtZV0pXG4gIH0pXG59XG5cbi8qKlxuICogQ3JlYXRlIGEgcHVibGljIGdldHRlciBpbnRlcmZhY2UgZm9yIGEgcHJvcGVydHkgb24gYSB0YXJnZXRcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0UHJvcE5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXdQcm9wTmFtZVxuICogQHBhcmFtIHtNaXhlZH0gZGVmYXVsdFByb3BWYWx1ZSBVc2VkIGlmIHRoZSB0YXJnZXQncyB0YXJnZXRQcm9wTmFtZSBpcyB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUHVibGljR2V0UHJvcGVydHkgKHRhcmdldCwgdGFyZ2V0UHJvcE5hbWUsIG5ld1Byb3BOYW1lLCBkZWZhdWx0UHJvcFZhbHVlKSB7XG4gIGlmICghdGFyZ2V0Lmhhc093blByb3BlcnR5KG5ld1Byb3BOYW1lKSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG5ld1Byb3BOYW1lLCB7XG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiB0YXJnZXRbdGFyZ2V0UHJvcE5hbWVdICE9PSAndW5kZWZpbmVkJyA/IHRhcmdldFt0YXJnZXRQcm9wTmFtZV0gOiBkZWZhdWx0UHJvcFZhbHVlKVxuICAgICAgfSxcbiAgICAgIHNldDogdW5kZWZpbmVkLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwdWJsaWMgZ2V0dGVyL3NldHRlciBpbnRlcmZhY2UgZm9yIGEgcHJvcGVydHkgb24gYSB0YXJnZXRcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxGdW5jdGlvbn0gdGFyZ2V0XG4gKiBAcGFyYW0ge1N0cmluZ30gdGFyZ2V0UHJvcE5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuZXdQcm9wTmFtZVxuICogQHBhcmFtIHtNaXhlZH0gZGVmYXVsdFByb3BWYWx1ZSBVc2VkIGlmIHRoZSB0YXJnZXQncyB0YXJnZXRQcm9wTmFtZSBpcyB1bmRlZmluZWRcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUHVibGljR2V0U2V0UHJvcGVydHkgKHRhcmdldCwgdGFyZ2V0UHJvcE5hbWUsIG5ld1Byb3BOYW1lLCBkZWZhdWx0UHJvcFZhbHVlKSB7XG4gIGlmICghdGFyZ2V0Lmhhc093blByb3BlcnR5KG5ld1Byb3BOYW1lKSkge1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIG5ld1Byb3BOYW1lLCB7XG4gICAgICBnZXQgKCkge1xuICAgICAgICByZXR1cm4gKHR5cGVvZiB0YXJnZXRbdGFyZ2V0UHJvcE5hbWVdICE9PSAndW5kZWZpbmVkJyA/IHRhcmdldFt0YXJnZXRQcm9wTmFtZV0gOiBkZWZhdWx0UHJvcFZhbHVlKVxuICAgICAgfSxcbiAgICAgIHNldCAobmV3VmFsdWUpIHtcbiAgICAgICAgdGFyZ2V0W3RhcmdldFByb3BOYW1lXSA9IG5ld1ZhbHVlXG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuY29uc3QgaW5oZXJpdGFuY2UgPSB7XG4gIGV4cG9zZUFsbFByb3BlcnRpZXMsXG4gIGV4cG9zZVByaXZhdGVQcm9wZXJ0aWVzLFxuICBjcmVhdGVQdWJsaWNHZXRQcm9wZXJ0eSxcbiAgY3JlYXRlUHVibGljR2V0U2V0UHJvcGVydHlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbmhlcml0YW5jZVxuIiwiLyoqXG4gKiBMVkw5OSBQYXJzZVxuICpcbiAqIFBhcnNlIHN0cmluZ3Mgb3IgdHJhbnNmb3JtIGZyb20gb25lIGZvcm1hdCB0byBhbm90aGVyXG4gKlxuICogQHBhY2thZ2UgbHZsOTlcbiAqL1xuXG5jb25zdCBfX2xvZ2dlclBhdGggPSAnbHZsOTkvdXRpbHMvcGFyc2UnXG5jb25zdCBvYmplY3RQYXRoID0gcmVxdWlyZSgnb2JqZWN0LXBhdGgnKVxuXG4vKipcbiAqIENvZXJjZSBhIHZhbHVlIHRvIGl0cyBwcmltaXRpdmUgdHlwZVxuICpcbiAqIEBwYXJhbSB7TWl4ZWR9IGlucHV0XG4gKiBAcmV0dXJucyB7TWl4ZWR9XG4gKi9cbmZ1bmN0aW9uIGNvZXJjZVRvUHJpbWl0aXZlVHlwZSAoaW5wdXQpIHtcbiAgLy8gTm9uLXN0cmluZz8gSnVzdCByZXR1cm4gaXQgc3RyYWlnaHQgYXdheVxuICBpZiAodHlwZW9mIGlucHV0ICE9PSAnc3RyaW5nJykgcmV0dXJuIGlucHV0XG5cbiAgLy8gVHJpbSBhbnkgd2hpdGVzcGFjZVxuICBpbnB1dCA9IChpbnB1dCArICcnKS50cmltKClcblxuICAvLyBOdW1iZXJcbiAgaWYgKC9eXFwtPyg/OlxcZCpbXFwuXFwsXSkqXFxkKig/OltlRV0oPzpcXC0/XFxkKyk/KT8kLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KGlucHV0KVxuXG4gIC8vIEJvb2xlYW46IHRydWVcbiAgfSBlbHNlIGlmICgvXih0cnVlfDEpJC8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gdHJ1ZVxuXG4gIC8vIE5hTlxuICB9IGVsc2UgaWYgKC9eTmFOJC8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gTmFOXG5cbiAgLy8gdW5kZWZpbmVkXG4gIH0gZWxzZSBpZiAoL151bmRlZmluZWQkLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiB1bmRlZmluZWRcblxuICAvLyBudWxsXG4gIH0gZWxzZSBpZiAoL15udWxsJC8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gbnVsbFxuXG4gIC8vIEJvb2xlYW46IGZhbHNlXG4gIH0gZWxzZSBpZiAoL14oZmFsc2V8MCkkLy50ZXN0KGlucHV0KSB8fCBpbnB1dCA9PT0gJycpIHtcbiAgICByZXR1cm4gZmFsc2VcblxuICAvLyBKU09OOiBzdGFydHMgd2l0aCBbIG9yIHsgYW5kIGVuZHMgd2l0aCBdIG9yIH1cbiAgfSBlbHNlIGlmICgvXltcXFtcXHtdLy50ZXN0KGlucHV0KSAmJiAvW1xcXVxcfV0kLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBjb252ZXJ0U3RyaW5nVG9Kc29uKGlucHV0KVxuICB9XG5cbiAgLy8gRGVmYXVsdCB0byBzdHJpbmdcbiAgcmV0dXJuIGlucHV0XG59XG5cbi8qKlxuICogQ29udmVydCB2YWx1ZSB0byBhbiBleHBsaWNpdCBib29sZWFuLiBOYW1lbHkgZm9yIHByb2Nlc3Npbmcgc3RyaW5nIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge01peGVkfSBpbnB1dFxuICogQHJldHVybnMge0Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRUb0Jvb2xlYW4gKGlucHV0KSB7XG4gIC8vIEFscmVhZHkgYm9vbGVhblxuICBpZiAoaW5wdXQgPT09IHRydWUgfHwgaW5wdXQgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIGlucHV0XG4gIH1cblxuICAvLyBDYXNlcyBvZiB0cnV0aHkvZmFsc2V5IHZhbHVlc1xuICBzd2l0Y2ggKGlucHV0KSB7XG4gICAgY2FzZSAxOlxuICAgIGNhc2UgJzEnOlxuICAgIGNhc2UgJ3RydWUnOlxuICAgICAgcmV0dXJuIHRydWVcblxuICAgIGNhc2UgMDpcbiAgICBjYXNlICcwJzpcbiAgICBjYXNlICdmYWxzZSc6XG4gICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICBjYXNlIG51bGw6XG4gICAgY2FzZSAnbnVsbCc6XG4gICAgY2FzZSBOYU46XG4gICAgY2FzZSAnTmFOJzpcbiAgICBjYXNlICcnOlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cblxuICAvLyBPdGhlcndpc2UuLi5cbiAgcmV0dXJuICEhaW5wdXRcbn1cblxuLyoqXG4gKiBDb252ZXJ0IGEgc3RyaW5nIHRvIEpTT04gb3IganVzdCByZXR1cm4gdGhlIHN0cmluZyBpZiBjYW4ndFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBpbnB1dFxuICogQHJldHVybnMge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gY29udmVydFN0cmluZ1RvSnNvbiAoaW5wdXQpIHtcbiAgbGV0IG91dHB1dCA9IGlucHV0XG5cbiAgLy8gQ29udmVydCBzdHJpbmcgZGF0YSB0byBKU09OXG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgdHJ5IHtcbiAgICAgIG91dHB1dCA9IEpTT04ucGFyc2UoaW5wdXQpXG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgY29uc29sZS5lcnJvcihgJHtfbG9nZ2VyUGF0aH0uY29udmVydFN0cmluZ1RvSnNvbjogRXJyb3IgcGFyc2luZyBzdHJpbmcgSlNPTiBkYXRhYCwgaW5wdXQpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG4vKipcbiAqIENvbnZlcnQgYSBzdHJpbmcgdG8gYSBmbG9hdC5cbiAqIFRoaXMgYWxzbyBjb252ZXJ0cyBudW1iZXIgY29uc3RhbnRzIGxpa2UgSW5maW5pdHkgYW5kIE5hTiB0byB6ZXJvLlxuICpcbiAqIEBwYXJhbSBpbnB1dFxuICogQHJldHVybnMgeyp9XG4gKi9cbmZ1bmN0aW9uIGNvbnZlcnRTdHJpbmdUb0Zsb2F0IChpbnB1dCkge1xuICBpZiAodHlwZW9mIGlucHV0ID09PSAnbnVtYmVyJykge1xuICAgIHJldHVybiBpbnB1dFxuICB9XG5cbiAgbGV0IG91dHB1dCA9IHBhcnNlRmxvYXQoKGlucHV0ICsgJycpLnJlcGxhY2UoL1teXFxkXFwtXFwuXSsvZywgJycpKVxuXG4gIC8vIEluZmluaXR5IC8gTmFOXG4gIGlmICghaXNGaW5pdGUoaW5wdXQpIHx8IGlzTmFOKGlucHV0KSB8fCBpc05hTihvdXRwdXQpKSB7XG4gICAgb3V0cHV0ID0gMFxuICB9XG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG4vKipcbiAqIEV4dHJhY3Qga2V5LXZhbHVlcyBmcm9tIGEgc3RyaW5nIHdoaWNoIGlzIGxpa2UgYSBDU1MgY2xhc3MgZGVjbGFyYXRpb24sIGUuZy4gYGtleTogdmFsdWU7IGtleTogdmFsdWVgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0XG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RDbGFzc0RldGFpbHMgKGlucHV0KSB7XG4gIGxldCBvdXRwdXQgPSB7fVxuICBsZXQgaW5wdXRQYXJ0cyA9IFtpbnB1dF1cblxuICAvLyBDaGVjayBpZiBpdCBoYXMgc2VtaS1jb2xvbnNcbiAgaWYgKC87Ly50ZXN0KGlucHV0KSkge1xuICAgIGlucHV0UGFydHMgPSBpbnB1dC5zcGxpdCgnOycpXG4gIH1cblxuICAvLyBQcm9jZXNzIGVhY2ggaW5wdXQgcGFydFxuICBpbnB1dFBhcnRzLmZvckVhY2goKHBhcnQpID0+IHtcbiAgICBwYXJ0ID0gcGFydC50cmltKClcbiAgICBpZiAocGFydCkge1xuICAgICAgbGV0IHBhcnRQYXJ0cyA9IHBhcnQubWF0Y2goLyhbYS16MC05Xy1dKyk6KFteO10rKTs/L2kpXG4gICAgICBvdXRwdXRbcGFydFBhcnRzWzFdLnRyaW0oKV0gPSBjb2VyY2VUb1ByaW1pdGl2ZVR5cGUocGFydFBhcnRzWzJdLnRyaW0oKSlcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIG91dHB1dFxufVxuXG4vKipcbiAqIEV4dHJhY3QgdGhlIHRyaWdnZXIncyB0YXJnZXQgZGV0YWlsc1xuICpcbiAqIFRoaXMgYWxsb3dzIHlvdSB0byBleHRyYWN0IHRoZSBuZWNlc3NhcnkgZGF0YSBmcm9tIHRoZSBzdHJpbmcgYW5kIHRoZSBnbG9iYWwgd2luZG93L2RvY3VtZW50IGF2YWlsYWJsZSwgdG8gY3JlYXRlXG4gKiBkeW5hbWljIGV2ZW50IGJpbmRpbmdzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gaW5wdXRcbiAqIEBwYXJhbSB7T2JqZWN0fEZ1bmN0aW9ufSBjb250ZXh0IERlZmF1bHRzIHRvIGB3aW5kb3dgLiBXaGVyZSB0byBmaW5kIHRoZSBgZG9gIGFjdGlvblxuICogQHJldHVybnMge09iamVjdH0gPT4geyBldmVudE5hbWU6IHtTdHJpbmd9LCBtZXRob2Q6IHtGdW5jdGlvbn0sIHNlbGVjdG9yOiB7U3RyaW5nfSwgdGFyZ2V0OiB7T2JqZWN0fSB9XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RUcmlnZ2VyRGV0YWlscyhpbnB1dCwgY29udGV4dCkge1xuICBsZXQgdHJpZ2dlciA9IGlucHV0XG5cbiAgaWYgKCFjb250ZXh0KSB7XG4gICAgY29udGV4dCA9IHdpbmRvd1xuICB9XG5cbiAgLy8gU3RyaW5nIGlucHV0IGdpdmVuXG4gIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gVHJ5IEpTT04gZmlyc3RcbiAgICBpZiAoL157Ly50ZXN0KGlucHV0KSkge1xuICAgICAgdHJpZ2dlciA9IGNvbnZlcnRTdHJpbmdUb0pzb24oaW5wdXQpXG5cbiAgICAvLyBUcnkgY2xhc3MgZGV0YWlsc1xuICAgIH0gZWxzZSBpZiAoL15bYS16MC05Xy1dKzovLnRlc3QoaW5wdXQpKSB7XG4gICAgICB0cmlnZ2VyID0gZXh0cmFjdENsYXNzRGV0YWlscyhpbnB1dClcblxuICAgIC8vIFN0cmluZyB3aXRoIG5vIHNwYWNlc1xuICAgIH0gZWxzZSBpZiAoIS8gLy50ZXN0KGlucHV0KSkge1xuICAgICAgdHJpZ2dlciA9IHtcbiAgICAgICAgZG86IGlucHV0XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTm8gb2JqZWN0IGZvdW5kIVxuICBpZiAodHlwZW9mIHRyaWdnZXIgIT09ICdvYmplY3QnKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke19sb2dnZXJQYXRofS5leHRyYWN0VHJpZ2dlckRldGFpbHM6IGlucHV0IHdhcyBub3QgdmFsaWQgSlNPTiBvciBDU1Mtc3R5bGUgZGVmaW5pdGlvbmApXG4gIH1cblxuICAvLyBFbnN1cmUgaXQgaGFzIGBvbmAgYW5kIGBkb2AgcHJvcGVydGllc1xuICAvLyBpZiAoIW9iamVjdFBhdGguaGFzKHRyaWdnZXIsICdvbicpKSB7XG4gIC8vICAgdGhyb3cgbmV3IEVycm9yKGAke19sb2dnZXJQYXRofS5leHRyYWN0VHJpZ2dlckRldGFpbHM6IHRyaWdnZXIgaXMgbWlzc2luZyByZXF1aXJlZCAnb24nIHByb3BlcnR5YClcbiAgLy8gfVxuICBpZiAoIW9iamVjdFBhdGguaGFzKHRyaWdnZXIsICdkbycpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke19sb2dnZXJQYXRofS5leHRyYWN0VHJpZ2dlckRldGFpbHM6IHRyaWdnZXIgaXMgbWlzc2luZyByZXF1aXJlZCAnZG8nIHByb3BlcnR5YClcbiAgfVxuXG4gIC8vIElmIHRhcmdldCBpcyBzZXQsIHVzZSByZWFsIHZhbHVlcyBmb3Igd2luZG93IGFuZCBkb2N1bWVudFxuICBpZiAob2JqZWN0UGF0aC5oYXModHJpZ2dlciwgJ3RhcmdldCcpKSB7XG4gICAgc3dpdGNoICh0cmlnZ2VyLnRhcmdldCkge1xuICAgICAgY2FzZSAnc2VsZic6XG4gICAgICAgIGNvbnNvbGUubG9nKCdUYXJnZXRpbmcgc2VsZicsIGNvbnRleHQpXG4gICAgICAgIHRyaWdnZXIudGFyZ2V0ID0gY29udGV4dFxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgIHRyaWdnZXIudGFyZ2V0ID0gZG9jdW1lbnRcbiAgICAgICAgYnJlYWtcblxuICAgICAgY2FzZSAnd2luZG93JzpcbiAgICAgICAgdHJpZ2dlci50YXJnZXQgPSB3aW5kb3dcbiAgICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICAvLyBEbyBzYW1lIGFzIGFib3ZlIGlmIGEgY29udGV4dCB3YXMgc2V0IVxuICBpZiAob2JqZWN0UGF0aC5oYXModHJpZ2dlciwgJ2NvbnRleHQnKSkge1xuICAgIHN3aXRjaCAodHJpZ2dlci5jb250ZXh0KSB7XG4gICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgIHRyaWdnZXIuY29udGV4dCA9IGRvY3VtZW50XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ3dpbmRvdyc6XG4gICAgICAgIHRyaWdnZXIuY29udGV4dCA9IHdpbmRvd1xuICAgICAgICBicmVha1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0cmlnZ2VyLmNvbnRleHQgPSBjb250ZXh0XG4gIH1cblxuICByZXR1cm4gdHJpZ2dlclxufVxuXG4vKipcbiAqIEVuY29kZSBzdHJpbmcgdG8gVVJMLCB3aXRoIHNwYWNlcyB0aGF0IGFyZSByZXByZXNlbnRlZCBhcyBgK2BcbiAqIFNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvZW5jb2RlVVJJQ29tcG9uZW50XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGlucHV0XG4gKiBAcmV0dXJucyB7U3RyaW5nfVxuICovXG5mdW5jdGlvbiBmaXhlZEVuY29kZVVSSUNvbXBvbmVudCAoaW5wdXQpIHtcbiAgcmV0dXJuIGVuY29kZVVSSUNvbXBvbmVudChpbnB1dCkucmVwbGFjZSgvWyEnKCkqXS9nLCBmdW5jdGlvbihjKSB7XG4gICAgcmV0dXJuICclJyArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNik7XG4gIH0pXG59XG5cbi8qKlxuICogR2V0IHRoZSB0YXJnZXQgb2JqZWN0IGJ5IGEgc3RyaW5nIHNlbGVjdG9yXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHRhcmdldFxuICogQHBhcmFtIHtPYmplY3R9IGNvbnRleHRcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0QnlTZWxlY3RvciAodGFyZ2V0LCBjb250ZXh0KSB7XG4gIC8vIERlZmF1bHQgdG8gZG9jdW1lbnRcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0YXJnZXQgPSBkb2N1bWVudFxuICB9XG5cbiAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgLy8gU3BlY2lhbCBzdHJpbmcgdmFsdWVzIHRvIGdldCB0aGUgYWN0dWFsIG9iamVjdFxuICAgIHN3aXRjaCAodGFyZ2V0KSB7XG4gICAgICBjYXNlICdkb2N1bWVudCc6XG4gICAgICAgIHRhcmdldCA9IGRvY3VtZW50XG4gICAgICAgIGJyZWFrXG5cbiAgICAgIGNhc2UgJ3dpbmRvdyc6XG4gICAgICAgIHRhcmdldCA9IHdpbmRvd1xuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICdzZWxmJzpcbiAgICAgICAgdGFyZ2V0ID0gY29udGV4dFxuICAgICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXRcbn1cblxuLyoqXG4gKiBHZXQgdGhlIHRhcmdldCBvYmplY3QncyBzdHJpbmcgc2VsZWN0b3JcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0XG4gKiBAcGFyYW0ge09iamVjdH0gY29udGV4dFxuICogQHJldHVybiB7dW5kZWZpbmVkfFN0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0U2VsZWN0b3IgKHRhcmdldCwgY29udGV4dCkge1xuICBpZiAodHlwZW9mIHRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdGFyZ2V0XG4gIH1cblxuICAvLyBXaW5kb3dcbiAgaWYgKCQuaXNXaW5kb3codGFyZ2V0KSkge1xuICAgIHJldHVybiAnd2luZG93J1xuXG4gIC8vIERvY3VtZW50XG4gIH0gZWxzZSBpZiAodGFyZ2V0ID09PSBkb2N1bWVudCkge1xuICAgIHJldHVybiAnZG9jdW1lbnQnXG5cbiAgLy8gU2VsZlxuICB9IGVsc2UgaWYgKHRhcmdldC5oYXNPd25Qcm9wZXJ0eSgndXVpZCcpKSB7XG4gICAgcmV0dXJuIGBbZGF0YS1jb21wb25lbnQtaWQ9XCIke3RhcmdldC51dWlkfVwiXWBcblxuICAvLyBIVE1MIEVsZW1cbiAgfSBlbHNlIGlmICgkKHRhcmdldCkubGVuZ3RoKSB7XG4gICAgaWYgKCQodGFyZ2V0KS5hdHRyKCdkYXRhLWNvbXBvbmVudC1pZCcpKSB7XG4gICAgICByZXR1cm4gYFtkYXRhLWNvbXBvbmVudC1pZD1cIiR7JCh0YXJnZXQpLmF0dHIoJ2RhdGEtY29tcG9uZW50LWlkJyl9XCJdYFxuICAgIH0gZWxzZSBpZiAoJCh0YXJnZXQpLmF0dHIoJ2lkJykpIHtcbiAgICAgIHJldHVybiBgIyR7JCh0YXJnZXQpLmF0dHIoJ2lkJyl9YFxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYCR7dGFyZ2V0LnRhZ05hbWUudG9Mb3dlckNhc2UoKX1gXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldFxufVxuXG5jb25zdCBwYXJzZSA9IHtcbiAgY29lcmNlVG9QcmltaXRpdmVUeXBlLFxuICBjb252ZXJ0VG9Cb29sZWFuLFxuICBjb252ZXJ0U3RyaW5nVG9Kc29uLFxuICBjb252ZXJ0U3RyaW5nVG9GbG9hdCxcbiAgZXh0cmFjdENsYXNzRGV0YWlscyxcbiAgZXh0cmFjdFRyaWdnZXJEZXRhaWxzLFxuICBmaXhlZEVuY29kZVVSSUNvbXBvbmVudCxcbiAgZ2V0VGFyZ2V0QnlTZWxlY3RvcixcbiAgZ2V0VGFyZ2V0U2VsZWN0b3Jcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwYXJzZVxuIiwiLyoqXG4gKiBMVkw5OVxuICovXG5cbmNvbnN0IGx2bDk5ID0gcmVxdWlyZSgnLi9lczYnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGx2bDk5XG4iLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIGZsYWdzIGZyb20gdGhlaXIgY29lcmNlZCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlRmxhZ3MgPSAvXFx3KiQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIHN1cHBvcnRlZCBieSBgXy5jbG9uZWAuICovXG52YXIgY2xvbmVhYmxlVGFncyA9IHt9O1xuY2xvbmVhYmxlVGFnc1thcmdzVGFnXSA9IGNsb25lYWJsZVRhZ3NbYXJyYXlUYWddID1cbmNsb25lYWJsZVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gY2xvbmVhYmxlVGFnc1tkYXRhVmlld1RhZ10gPVxuY2xvbmVhYmxlVGFnc1tib29sVGFnXSA9IGNsb25lYWJsZVRhZ3NbZGF0ZVRhZ10gPVxuY2xvbmVhYmxlVGFnc1tmbG9hdDMyVGFnXSA9IGNsb25lYWJsZVRhZ3NbZmxvYXQ2NFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbaW50MTZUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50MzJUYWddID0gY2xvbmVhYmxlVGFnc1ttYXBUYWddID1cbmNsb25lYWJsZVRhZ3NbbnVtYmVyVGFnXSA9IGNsb25lYWJsZVRhZ3Nbb2JqZWN0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3JlZ2V4cFRhZ10gPSBjbG9uZWFibGVUYWdzW3NldFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tzdHJpbmdUYWddID0gY2xvbmVhYmxlVGFnc1tzeW1ib2xUYWddID1cbmNsb25lYWJsZVRhZ3NbdWludDhUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50OENsYW1wZWRUYWddID1cbmNsb25lYWJsZVRhZ3NbdWludDE2VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG5jbG9uZWFibGVUYWdzW2Vycm9yVGFnXSA9IGNsb25lYWJsZVRhZ3NbZnVuY1RhZ10gPVxuY2xvbmVhYmxlVGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBBZGRzIHRoZSBrZXktdmFsdWUgYHBhaXJgIHRvIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gcGFpciBUaGUga2V5LXZhbHVlIHBhaXIgdG8gYWRkLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgbWFwYC5cbiAqL1xuZnVuY3Rpb24gYWRkTWFwRW50cnkobWFwLCBwYWlyKSB7XG4gIC8vIERvbid0IHJldHVybiBgbWFwLnNldGAgYmVjYXVzZSBpdCdzIG5vdCBjaGFpbmFibGUgaW4gSUUgMTEuXG4gIG1hcC5zZXQocGFpclswXSwgcGFpclsxXSk7XG4gIHJldHVybiBtYXA7XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIGBzZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYWRkLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgc2V0YC5cbiAqL1xuZnVuY3Rpb24gYWRkU2V0RW50cnkoc2V0LCB2YWx1ZSkge1xuICAvLyBEb24ndCByZXR1cm4gYHNldC5hZGRgIGJlY2F1c2UgaXQncyBub3QgY2hhaW5hYmxlIGluIElFIDExLlxuICBzZXQuYWRkKHZhbHVlKTtcbiAgcmV0dXJuIHNldDtcbn1cblxuLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnJlZHVjZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5pdEFjY3VtXSBTcGVjaWZ5IHVzaW5nIHRoZSBmaXJzdCBlbGVtZW50IG9mIGBhcnJheWAgYXNcbiAqICB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlSZWR1Y2UoYXJyYXksIGl0ZXJhdGVlLCBhY2N1bXVsYXRvciwgaW5pdEFjY3VtKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIGlmIChpbml0QWNjdW0gJiYgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBhcnJheVsrK2luZGV4XTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gaXRzIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAqL1xuZnVuY3Rpb24gbWFwVG9BcnJheShtYXApIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShtYXAuc2l6ZSk7XG5cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5LFxuICAgIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpLFxuICAgIG9iamVjdENyZWF0ZSA9IE9iamVjdC5jcmVhdGUsXG4gICAgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgICBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUdldFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICAgIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpLFxuICAgIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3JyksXG4gICAgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyksXG4gICAgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKSxcbiAgICBXZWFrTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdXZWFrTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGUoZW50cmllcyk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfX1snZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBjYWNoZSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChjYWNoZSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGNhY2hlLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYWNoZSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGNhY2hlLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXNzaWduVmFsdWVgIGV4Y2VwdCB0aGF0IGl0IGRvZXNuJ3QgYXNzaWduXG4gKiBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICFlcShvYmplY3Rba2V5XSwgdmFsdWUpKSB8fFxuICAgICAgKHR5cGVvZiBrZXkgPT0gJ251bWJlcicgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBBc3NpZ25zIGB2YWx1ZWAgdG8gYGtleWAgb2YgYG9iamVjdGAgaWYgdGhlIGV4aXN0aW5nIHZhbHVlIGlzIG5vdCBlcXVpdmFsZW50XG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgaWYgKCEoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYgZXEob2JqVmFsdWUsIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmFzc2lnbmAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzXG4gKiBvciBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnbihvYmplY3QsIHNvdXJjZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2xvbmVgIGFuZCBgXy5jbG9uZURlZXBgIHdoaWNoIHRyYWNrc1xuICogdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRnVsbF0gU3BlY2lmeSBhIGNsb25lIGluY2x1ZGluZyBzeW1ib2xzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XSBUaGUga2V5IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIHBhcmVudCBvYmplY3Qgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgdGhlaXIgY2xvbmUgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGNsb25lZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUNsb25lKHZhbHVlLCBpc0RlZXAsIGlzRnVsbCwgY3VzdG9taXplciwga2V5LCBvYmplY3QsIHN0YWNrKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChjdXN0b21pemVyKSB7XG4gICAgcmVzdWx0ID0gb2JqZWN0ID8gY3VzdG9taXplcih2YWx1ZSwga2V5LCBvYmplY3QsIHN0YWNrKSA6IGN1c3RvbWl6ZXIodmFsdWUpO1xuICB9XG4gIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSk7XG4gIGlmIChpc0Fycikge1xuICAgIHJlc3VsdCA9IGluaXRDbG9uZUFycmF5KHZhbHVlKTtcbiAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgcmV0dXJuIGNvcHlBcnJheSh2YWx1ZSwgcmVzdWx0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhZyA9IGdldFRhZyh2YWx1ZSksXG4gICAgICAgIGlzRnVuYyA9IHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG5cbiAgICBpZiAoaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY2xvbmVCdWZmZXIodmFsdWUsIGlzRGVlcCk7XG4gICAgfVxuICAgIGlmICh0YWcgPT0gb2JqZWN0VGFnIHx8IHRhZyA9PSBhcmdzVGFnIHx8IChpc0Z1bmMgJiYgIW9iamVjdCkpIHtcbiAgICAgIGlmIChpc0hvc3RPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lT2JqZWN0KGlzRnVuYyA/IHt9IDogdmFsdWUpO1xuICAgICAgaWYgKCFpc0RlZXApIHtcbiAgICAgICAgcmV0dXJuIGNvcHlTeW1ib2xzKHZhbHVlLCBiYXNlQXNzaWduKHJlc3VsdCwgdmFsdWUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFjbG9uZWFibGVUYWdzW3RhZ10pIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA/IHZhbHVlIDoge307XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBpbml0Q2xvbmVCeVRhZyh2YWx1ZSwgdGFnLCBiYXNlQ2xvbmUsIGlzRGVlcCk7XG4gICAgfVxuICB9XG4gIC8vIENoZWNrIGZvciBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCByZXR1cm4gaXRzIGNvcnJlc3BvbmRpbmcgY2xvbmUuXG4gIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KHZhbHVlKTtcbiAgaWYgKHN0YWNrZWQpIHtcbiAgICByZXR1cm4gc3RhY2tlZDtcbiAgfVxuICBzdGFjay5zZXQodmFsdWUsIHJlc3VsdCk7XG5cbiAgaWYgKCFpc0Fycikge1xuICAgIHZhciBwcm9wcyA9IGlzRnVsbCA/IGdldEFsbEtleXModmFsdWUpIDoga2V5cyh2YWx1ZSk7XG4gIH1cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHZhbHVlLCBmdW5jdGlvbihzdWJWYWx1ZSwga2V5KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBrZXkgPSBzdWJWYWx1ZTtcbiAgICAgIHN1YlZhbHVlID0gdmFsdWVba2V5XTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgcG9wdWxhdGUgY2xvbmUgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBhc3NpZ25WYWx1ZShyZXN1bHQsIGtleSwgYmFzZUNsb25lKHN1YlZhbHVlLCBpc0RlZXAsIGlzRnVsbCwgY3VzdG9taXplciwga2V5LCB2YWx1ZSwgc3RhY2spKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY3JlYXRlYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFzc2lnbmluZ1xuICogcHJvcGVydGllcyB0byB0aGUgY3JlYXRlZCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGUgVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQ3JlYXRlKHByb3RvKSB7XG4gIHJldHVybiBpc09iamVjdChwcm90bykgPyBvYmplY3RDcmVhdGUocHJvdG8pIDoge307XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldEFsbEtleXNgIGFuZCBgZ2V0QWxsS2V5c0luYCB3aGljaCB1c2VzXG4gKiBga2V5c0Z1bmNgIGFuZCBgc3ltYm9sc0Z1bmNgIHRvIGdldCB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzeW1ib2xzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzRnVuYywgc3ltYm9sc0Z1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXNGdW5jKG9iamVjdCk7XG4gIHJldHVybiBpc0FycmF5KG9iamVjdCkgPyByZXN1bHQgOiBhcnJheVB1c2gocmVzdWx0LCBzeW1ib2xzRnVuYyhvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAob2JqZWN0ID09PSBzb3VyY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCEoaXNBcnJheShzb3VyY2UpIHx8IGlzVHlwZWRBcnJheShzb3VyY2UpKSkge1xuICAgIHZhciBwcm9wcyA9IGJhc2VLZXlzSW4oc291cmNlKTtcbiAgfVxuICBhcnJheUVhY2gocHJvcHMgfHwgc291cmNlLCBmdW5jdGlvbihzcmNWYWx1ZSwga2V5KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBrZXkgPSBzcmNWYWx1ZTtcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIGlmIChpc09iamVjdChzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBiYXNlTWVyZ2UsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgICB9XG4gICAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XSxcbiAgICAgIHN0YWNrZWQgPSBzdGFjay5nZXQoc3JjVmFsdWUpO1xuXG4gIGlmIChzdGFja2VkKSB7XG4gICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgc3RhY2tlZCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIGlzQ29tbW9uID0gbmV3VmFsdWUgPT09IHVuZGVmaW5lZDtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FycmF5KHNyY1ZhbHVlKSB8fCBpc1R5cGVkQXJyYXkoc3JjVmFsdWUpKSB7XG4gICAgICBpZiAoaXNBcnJheShvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQXJyYXlMaWtlT2JqZWN0KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IGNvcHlBcnJheShvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBiYXNlQ2xvbmUoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHNyY1ZhbHVlKSB8fCBpc0FyZ3VtZW50cyhzcmNWYWx1ZSkpIHtcbiAgICAgIGlmIChpc0FyZ3VtZW50cyhvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0b1BsYWluT2JqZWN0KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFpc09iamVjdChvYmpWYWx1ZSkgfHwgKHNyY0luZGV4ICYmIGlzRnVuY3Rpb24ob2JqVmFsdWUpKSkge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGJhc2VDbG9uZShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBzdGFjay5zZXQoc3JjVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICBtZXJnZUZ1bmMobmV3VmFsdWUsIHNyY1ZhbHVlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIHN0YWNrWydkZWxldGUnXShzcmNWYWx1ZSk7XG4gIH1cbiAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlc3RgIHdoaWNoIGRvZXNuJ3QgdmFsaWRhdGUgb3IgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiBzdGFydCwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgaW5kZXggPSAtMTtcbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSBhcnJheTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgIGBidWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIFRoZSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge0J1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVCdWZmZXIoYnVmZmVyLCBpc0RlZXApIHtcbiAgaWYgKGlzRGVlcCkge1xuICAgIHJldHVybiBidWZmZXIuc2xpY2UoKTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gbmV3IGJ1ZmZlci5jb25zdHJ1Y3RvcihidWZmZXIubGVuZ3RoKTtcbiAgYnVmZmVyLmNvcHkocmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGFycmF5QnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgVGhlIGFycmF5IGJ1ZmZlciB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5IGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVBcnJheUJ1ZmZlcihhcnJheUJ1ZmZlcikge1xuICB2YXIgcmVzdWx0ID0gbmV3IGFycmF5QnVmZmVyLmNvbnN0cnVjdG9yKGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuICBuZXcgVWludDhBcnJheShyZXN1bHQpLnNldChuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgZGF0YVZpZXdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVZpZXcgVGhlIGRhdGEgdmlldyB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgZGF0YSB2aWV3LlxuICovXG5mdW5jdGlvbiBjbG9uZURhdGFWaWV3KGRhdGFWaWV3LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIoZGF0YVZpZXcuYnVmZmVyKSA6IGRhdGFWaWV3LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyBkYXRhVmlldy5jb25zdHJ1Y3RvcihidWZmZXIsIGRhdGFWaWV3LmJ5dGVPZmZzZXQsIGRhdGFWaWV3LmJ5dGVMZW5ndGgpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIG1hcC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVNYXAobWFwLCBpc0RlZXAsIGNsb25lRnVuYykge1xuICB2YXIgYXJyYXkgPSBpc0RlZXAgPyBjbG9uZUZ1bmMobWFwVG9BcnJheShtYXApLCB0cnVlKSA6IG1hcFRvQXJyYXkobWFwKTtcbiAgcmV0dXJuIGFycmF5UmVkdWNlKGFycmF5LCBhZGRNYXBFbnRyeSwgbmV3IG1hcC5jb25zdHJ1Y3Rvcik7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGByZWdleHBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVnZXhwIFRoZSByZWdleHAgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgcmVnZXhwLlxuICovXG5mdW5jdGlvbiBjbG9uZVJlZ0V4cChyZWdleHApIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyByZWdleHAuY29uc3RydWN0b3IocmVnZXhwLnNvdXJjZSwgcmVGbGFncy5leGVjKHJlZ2V4cCkpO1xuICByZXN1bHQubGFzdEluZGV4ID0gcmVnZXhwLmxhc3RJbmRleDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzZXQuXG4gKi9cbmZ1bmN0aW9uIGNsb25lU2V0KHNldCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKHNldFRvQXJyYXkoc2V0KSwgdHJ1ZSkgOiBzZXRUb0FycmF5KHNldCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkU2V0RW50cnksIG5ldyBzZXQuY29uc3RydWN0b3IpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGUgYHN5bWJvbGAgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc3ltYm9sIFRoZSBzeW1ib2wgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHN5bWJvbCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGNsb25lU3ltYm9sKHN5bWJvbCkge1xuICByZXR1cm4gc3ltYm9sVmFsdWVPZiA/IE9iamVjdChzeW1ib2xWYWx1ZU9mLmNhbGwoc3ltYm9sKSkgOiB7fTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHR5cGVkQXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZWRBcnJheSBUaGUgdHlwZWQgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHR5cGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZVR5cGVkQXJyYXkodHlwZWRBcnJheSwgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKHR5cGVkQXJyYXkuYnVmZmVyKSA6IHR5cGVkQXJyYXkuYnVmZmVyO1xuICByZXR1cm4gbmV3IHR5cGVkQXJyYXkuY29uc3RydWN0b3IoYnVmZmVyLCB0eXBlZEFycmF5LmJ5dGVPZmZzZXQsIHR5cGVkQXJyYXkubGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29waWVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPYmplY3Qoc291cmNlLCBwcm9wcywgb2JqZWN0LCBjdXN0b21pemVyKSB7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcblxuICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkID8gc291cmNlW2tleV0gOiBuZXdWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLyoqXG4gKiBDb3BpZXMgb3duIHN5bWJvbCBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHN5bWJvbHMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5U3ltYm9scyhzb3VyY2UsIG9iamVjdCkge1xuICByZXR1cm4gY29weU9iamVjdChzb3VyY2UsIGdldFN5bWJvbHMoc291cmNlKSwgb2JqZWN0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5hc3NpZ25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQsXG4gICAgICAgIGd1YXJkID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbMl0gOiB1bmRlZmluZWQ7XG5cbiAgICBjdXN0b21pemVyID0gKGFzc2lnbmVyLmxlbmd0aCA+IDMgJiYgdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJylcbiAgICAgID8gKGxlbmd0aC0tLCBjdXN0b21pemVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgaW5kZXgsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRBbGxLZXlzKG9iamVjdCkge1xuICByZXR1cm4gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzLCBnZXRTeW1ib2xzKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN5bWJvbCBwcm9wZXJ0aWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzID0gbmF0aXZlR2V0U3ltYm9scyA/IG92ZXJBcmcobmF0aXZlR2V0U3ltYm9scywgT2JqZWN0KSA6IHN0dWJBcnJheTtcblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xudmFyIGdldFRhZyA9IGJhc2VHZXRUYWc7XG5cbi8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExLFxuLy8gZm9yIGRhdGEgdmlld3MgaW4gRWRnZSA8IDE0LCBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcy5cbmlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZykgfHxcbiAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWcpIHx8XG4gICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZykgfHxcbiAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gIGdldFRhZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpLFxuICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyA/IHZhbHVlLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLFxuICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIGFycmF5IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVBcnJheShhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gYXJyYXkuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICAvLyBBZGQgcHJvcGVydGllcyBhc3NpZ25lZCBieSBgUmVnRXhwI2V4ZWNgLlxuICBpZiAobGVuZ3RoICYmIHR5cGVvZiBhcnJheVswXSA9PSAnc3RyaW5nJyAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCAnaW5kZXgnKSkge1xuICAgIHJlc3VsdC5pbmRleCA9IGFycmF5LmluZGV4O1xuICAgIHJlc3VsdC5pbnB1dCA9IGFycmF5LmlucHV0O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lT2JqZWN0KG9iamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNQcm90b3R5cGUob2JqZWN0KSlcbiAgICA/IGJhc2VDcmVhdGUoZ2V0UHJvdG90eXBlKG9iamVjdCkpXG4gICAgOiB7fTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUgYmFzZWQgb24gaXRzIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjbG9uaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQnlUYWcob2JqZWN0LCB0YWcsIGNsb25lRnVuYywgaXNEZWVwKSB7XG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVBcnJheUJ1ZmZlcihvYmplY3QpO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIHJldHVybiBuZXcgQ3Rvcigrb2JqZWN0KTtcblxuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICByZXR1cm4gY2xvbmVEYXRhVmlldyhvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIGZsb2F0MzJUYWc6IGNhc2UgZmxvYXQ2NFRhZzpcbiAgICBjYXNlIGludDhUYWc6IGNhc2UgaW50MTZUYWc6IGNhc2UgaW50MzJUYWc6XG4gICAgY2FzZSB1aW50OFRhZzogY2FzZSB1aW50OENsYW1wZWRUYWc6IGNhc2UgdWludDE2VGFnOiBjYXNlIHVpbnQzMlRhZzpcbiAgICAgIHJldHVybiBjbG9uZVR5cGVkQXJyYXkob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICByZXR1cm4gY2xvbmVNYXAob2JqZWN0LCBpc0RlZXAsIGNsb25lRnVuYyk7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIHJldHVybiBuZXcgQ3RvcihvYmplY3QpO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgICByZXR1cm4gY2xvbmVSZWdFeHAob2JqZWN0KTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgcmV0dXJuIGNsb25lU2V0KG9iamVjdCwgaXNEZWVwLCBjbG9uZUZ1bmMpO1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTeW1ib2wob2JqZWN0KTtcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KVxuICAgICAgKSB7XG4gICAgcmV0dXJuIGVxKG9iamVjdFtpbmRleF0sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAqIFtgT2JqZWN0LmtleXNgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGV4Y2VwdCB0aGF0IGl0IGluY2x1ZGVzIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZUtleXNJbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHxcbiAgICAgIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpICE9IG9iamVjdFRhZyB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZ1xuICoga2V5ZWQgcHJvcGVydGllcyBvZiBgdmFsdWVgIHRvIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBwbGFpbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QsIHRydWUpIDogYmFzZUtleXNJbihvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYXNzaWduYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBtZXJnZXMgb3duIGFuZFxuICogaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdHMgaW50byB0aGVcbiAqIGRlc3RpbmF0aW9uIG9iamVjdC4gU291cmNlIHByb3BlcnRpZXMgdGhhdCByZXNvbHZlIHRvIGB1bmRlZmluZWRgIGFyZVxuICogc2tpcHBlZCBpZiBhIGRlc3RpbmF0aW9uIHZhbHVlIGV4aXN0cy4gQXJyYXkgYW5kIHBsYWluIG9iamVjdCBwcm9wZXJ0aWVzXG4gKiBhcmUgbWVyZ2VkIHJlY3Vyc2l2ZWx5LiBPdGhlciBvYmplY3RzIGFuZCB2YWx1ZSB0eXBlcyBhcmUgb3ZlcnJpZGRlbiBieVxuICogYXNzaWdubWVudC4gU291cmNlIG9iamVjdHMgYXJlIGFwcGxpZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LiBTdWJzZXF1ZW50XG4gKiBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC41LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ2EnOiBbeyAnYic6IDIgfSwgeyAnZCc6IDQgfV1cbiAqIH07XG4gKlxuICogdmFyIG90aGVyID0ge1xuICogICAnYSc6IFt7ICdjJzogMyB9LCB7ICdlJzogNSB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4geyAnYSc6IFt7ICdiJzogMiwgJ2MnOiAzIH0sIHsgJ2QnOiA0LCAnZSc6IDUgfV0gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihmdW5jdGlvbihvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpIHtcbiAgYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCk7XG59KTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGVtcHR5IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZW1wdHkgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheXMgPSBfLnRpbWVzKDIsIF8uc3R1YkFycmF5KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXMpO1xuICogLy8gPT4gW1tdLCBbXV1cbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXNbMF0gPT09IGFycmF5c1sxXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBzdHViQXJyYXkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlO1xuIiwiKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KXtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qaXN0YW5idWwgaWdub3JlIG5leHQ6Y2FudCB0ZXN0Ki9cbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUuZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTUQuIFJlZ2lzdGVyIGFzIGFuIGFub255bW91cyBtb2R1bGUuXG4gICAgZGVmaW5lKFtdLCBmYWN0b3J5KTtcbiAgfSBlbHNlIHtcbiAgICAvLyBCcm93c2VyIGdsb2JhbHNcbiAgICByb290Lm9iamVjdFBhdGggPSBmYWN0b3J5KCk7XG4gIH1cbn0pKHRoaXMsIGZ1bmN0aW9uKCl7XG4gICd1c2Ugc3RyaWN0JztcblxuICB2YXIgdG9TdHIgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuICBmdW5jdGlvbiBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgICBpZihvYmogPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIC8vdG8gaGFuZGxlIG9iamVjdHMgd2l0aCBudWxsIHByb3RvdHlwZXMgKHRvbyBlZGdlIGNhc2U/KVxuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKVxuICB9XG5cbiAgZnVuY3Rpb24gaXNFbXB0eSh2YWx1ZSl7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGZvciAodmFyIGkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eSh2YWx1ZSwgaSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRvU3RyaW5nKHR5cGUpe1xuICAgIHJldHVybiB0b1N0ci5jYWxsKHR5cGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNPYmplY3Qob2JqKXtcbiAgICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgdG9TdHJpbmcob2JqKSA9PT0gXCJbb2JqZWN0IE9iamVjdF1cIjtcbiAgfVxuXG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbihvYmope1xuICAgIC8qaXN0YW5idWwgaWdub3JlIG5leHQ6Y2FudCB0ZXN0Ki9cbiAgICByZXR1cm4gdG9TdHIuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNCb29sZWFuKG9iail7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdib29sZWFuJyB8fCB0b1N0cmluZyhvYmopID09PSAnW29iamVjdCBCb29sZWFuXSc7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRLZXkoa2V5KXtcbiAgICB2YXIgaW50S2V5ID0gcGFyc2VJbnQoa2V5KTtcbiAgICBpZiAoaW50S2V5LnRvU3RyaW5nKCkgPT09IGtleSkge1xuICAgICAgcmV0dXJuIGludEtleTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZhY3Rvcnkob3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgICB2YXIgb2JqZWN0UGF0aCA9IGZ1bmN0aW9uKG9iaikge1xuICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKG9iamVjdFBhdGgpLnJlZHVjZShmdW5jdGlvbihwcm94eSwgcHJvcCkge1xuICAgICAgICBpZihwcm9wID09PSAnY3JlYXRlJykge1xuICAgICAgICAgIHJldHVybiBwcm94eTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qaXN0YW5idWwgaWdub3JlIGVsc2UqL1xuICAgICAgICBpZiAodHlwZW9mIG9iamVjdFBhdGhbcHJvcF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBwcm94eVtwcm9wXSA9IG9iamVjdFBhdGhbcHJvcF0uYmluZChvYmplY3RQYXRoLCBvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByb3h5O1xuICAgICAgfSwge30pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoYXNTaGFsbG93UHJvcGVydHkob2JqLCBwcm9wKSB7XG4gICAgICByZXR1cm4gKG9wdGlvbnMuaW5jbHVkZUluaGVyaXRlZFByb3BzIHx8ICh0eXBlb2YgcHJvcCA9PT0gJ251bWJlcicgJiYgQXJyYXkuaXNBcnJheShvYmopKSB8fCBoYXNPd25Qcm9wZXJ0eShvYmosIHByb3ApKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNoYWxsb3dQcm9wZXJ0eShvYmosIHByb3ApIHtcbiAgICAgIGlmIChoYXNTaGFsbG93UHJvcGVydHkob2JqLCBwcm9wKSkge1xuICAgICAgICByZXR1cm4gb2JqW3Byb3BdO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldChvYmosIHBhdGgsIHZhbHVlLCBkb05vdFJlcGxhY2Upe1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfVxuICAgICAgaWYgKCFwYXRoIHx8IHBhdGgubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBzZXQob2JqLCBwYXRoLnNwbGl0KCcuJykubWFwKGdldEtleSksIHZhbHVlLCBkb05vdFJlcGxhY2UpO1xuICAgICAgfVxuICAgICAgdmFyIGN1cnJlbnRQYXRoID0gcGF0aFswXTtcbiAgICAgIHZhciBjdXJyZW50VmFsdWUgPSBnZXRTaGFsbG93UHJvcGVydHkob2JqLCBjdXJyZW50UGF0aCk7XG4gICAgICBpZiAocGF0aC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gdm9pZCAwIHx8ICFkb05vdFJlcGxhY2UpIHtcbiAgICAgICAgICBvYmpbY3VycmVudFBhdGhdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJlbnRWYWx1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGN1cnJlbnRWYWx1ZSA9PT0gdm9pZCAwKSB7XG4gICAgICAgIC8vY2hlY2sgaWYgd2UgYXNzdW1lIGFuIGFycmF5XG4gICAgICAgIGlmKHR5cGVvZiBwYXRoWzFdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIG9ialtjdXJyZW50UGF0aF0gPSBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvYmpbY3VycmVudFBhdGhdID0ge307XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHNldChvYmpbY3VycmVudFBhdGhdLCBwYXRoLnNsaWNlKDEpLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKTtcbiAgICB9XG5cbiAgICBvYmplY3RQYXRoLmhhcyA9IGZ1bmN0aW9uIChvYmosIHBhdGgpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHBhdGggPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHBhdGggPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcGF0aCB8fCBwYXRoLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gISFvYmo7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaiA9IGdldEtleShwYXRoW2ldKTtcblxuICAgICAgICBpZigodHlwZW9mIGogPT09ICdudW1iZXInICYmIGlzQXJyYXkob2JqKSAmJiBqIDwgb2JqLmxlbmd0aCkgfHxcbiAgICAgICAgICAob3B0aW9ucy5pbmNsdWRlSW5oZXJpdGVkUHJvcHMgPyAoaiBpbiBPYmplY3Qob2JqKSkgOiBoYXNPd25Qcm9wZXJ0eShvYmosIGopKSkge1xuICAgICAgICAgIG9iaiA9IG9ialtqXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZW5zdXJlRXhpc3RzID0gZnVuY3Rpb24gKG9iaiwgcGF0aCwgdmFsdWUpe1xuICAgICAgcmV0dXJuIHNldChvYmosIHBhdGgsIHZhbHVlLCB0cnVlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5zZXQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKXtcbiAgICAgIHJldHVybiBzZXQob2JqLCBwYXRoLCB2YWx1ZSwgZG9Ob3RSZXBsYWNlKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5pbnNlcnQgPSBmdW5jdGlvbiAob2JqLCBwYXRoLCB2YWx1ZSwgYXQpe1xuICAgICAgdmFyIGFyciA9IG9iamVjdFBhdGguZ2V0KG9iaiwgcGF0aCk7XG4gICAgICBhdCA9IH5+YXQ7XG4gICAgICBpZiAoIWlzQXJyYXkoYXJyKSkge1xuICAgICAgICBhcnIgPSBbXTtcbiAgICAgICAgb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBhcnIpO1xuICAgICAgfVxuICAgICAgYXJyLnNwbGljZShhdCwgMCwgdmFsdWUpO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmVtcHR5ID0gZnVuY3Rpb24ob2JqLCBwYXRoKSB7XG4gICAgICBpZiAoaXNFbXB0eShwYXRoKSkge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgICAgaWYgKG9iaiA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICB9XG5cbiAgICAgIHZhciB2YWx1ZSwgaTtcbiAgICAgIGlmICghKHZhbHVlID0gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoKSkpIHtcbiAgICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgJycpO1xuICAgICAgfSBlbHNlIGlmIChpc0Jvb2xlYW4odmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLnNldChvYmosIHBhdGgsIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCAwKTtcbiAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgdmFsdWUubGVuZ3RoID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIGZvciAoaSBpbiB2YWx1ZSkge1xuICAgICAgICAgIGlmIChoYXNTaGFsbG93UHJvcGVydHkodmFsdWUsIGkpKSB7XG4gICAgICAgICAgICBkZWxldGUgdmFsdWVbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5zZXQob2JqLCBwYXRoLCBudWxsKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5wdXNoID0gZnVuY3Rpb24gKG9iaiwgcGF0aCAvKiwgdmFsdWVzICovKXtcbiAgICAgIHZhciBhcnIgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGgpO1xuICAgICAgaWYgKCFpc0FycmF5KGFycikpIHtcbiAgICAgICAgYXJyID0gW107XG4gICAgICAgIG9iamVjdFBhdGguc2V0KG9iaiwgcGF0aCwgYXJyKTtcbiAgICAgIH1cblxuICAgICAgYXJyLnB1c2guYXBwbHkoYXJyLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpKTtcbiAgICB9O1xuXG4gICAgb2JqZWN0UGF0aC5jb2FsZXNjZSA9IGZ1bmN0aW9uIChvYmosIHBhdGhzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgIHZhciB2YWx1ZTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHBhdGhzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICgodmFsdWUgPSBvYmplY3RQYXRoLmdldChvYmosIHBhdGhzW2ldKSkgIT09IHZvaWQgMCkge1xuICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgIH07XG5cbiAgICBvYmplY3RQYXRoLmdldCA9IGZ1bmN0aW9uIChvYmosIHBhdGgsIGRlZmF1bHRWYWx1ZSl7XG4gICAgICBpZiAodHlwZW9mIHBhdGggPT09ICdudW1iZXInKSB7XG4gICAgICAgIHBhdGggPSBbcGF0aF07XG4gICAgICB9XG4gICAgICBpZiAoIXBhdGggfHwgcGF0aC5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIGlmIChvYmogPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5nZXQob2JqLCBwYXRoLnNwbGl0KCcuJyksIGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyZW50UGF0aCA9IGdldEtleShwYXRoWzBdKTtcbiAgICAgIHZhciBuZXh0T2JqID0gZ2V0U2hhbGxvd1Byb3BlcnR5KG9iaiwgY3VycmVudFBhdGgpXG4gICAgICBpZiAobmV4dE9iaiA9PT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICB9XG5cbiAgICAgIGlmIChwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXR1cm4gbmV4dE9iajtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iamVjdFBhdGguZ2V0KG9ialtjdXJyZW50UGF0aF0sIHBhdGguc2xpY2UoMSksIGRlZmF1bHRWYWx1ZSk7XG4gICAgfTtcblxuICAgIG9iamVjdFBhdGguZGVsID0gZnVuY3Rpb24gZGVsKG9iaiwgcGF0aCkge1xuICAgICAgaWYgKHR5cGVvZiBwYXRoID09PSAnbnVtYmVyJykge1xuICAgICAgICBwYXRoID0gW3BhdGhdO1xuICAgICAgfVxuXG4gICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzRW1wdHkocGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgIH1cbiAgICAgIGlmKHR5cGVvZiBwYXRoID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gb2JqZWN0UGF0aC5kZWwob2JqLCBwYXRoLnNwbGl0KCcuJykpO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3VycmVudFBhdGggPSBnZXRLZXkocGF0aFswXSk7XG4gICAgICBpZiAoIWhhc1NoYWxsb3dQcm9wZXJ0eShvYmosIGN1cnJlbnRQYXRoKSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgfVxuXG4gICAgICBpZihwYXRoLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgb2JqLnNwbGljZShjdXJyZW50UGF0aCwgMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGVsZXRlIG9ialtjdXJyZW50UGF0aF07XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvYmplY3RQYXRoLmRlbChvYmpbY3VycmVudFBhdGhdLCBwYXRoLnNsaWNlKDEpKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gb2JqZWN0UGF0aDtcbiAgfVxuXG4gIHZhciBtb2QgPSBmYWN0b3J5KCk7XG4gIG1vZC5jcmVhdGUgPSBmYWN0b3J5O1xuICBtb2Qud2l0aEluaGVyaXRlZFByb3BzID0gZmFjdG9yeSh7aW5jbHVkZUluaGVyaXRlZFByb3BzOiB0cnVlfSlcbiAgcmV0dXJuIG1vZDtcbn0pO1xuIiwidmFyIHYxID0gcmVxdWlyZSgnLi92MScpO1xudmFyIHY0ID0gcmVxdWlyZSgnLi92NCcpO1xuXG52YXIgdXVpZCA9IHY0O1xudXVpZC52MSA9IHYxO1xudXVpZC52NCA9IHY0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHV1aWQ7XG4iLCIvKipcbiAqIENvbnZlcnQgYXJyYXkgb2YgMTYgYnl0ZSB2YWx1ZXMgdG8gVVVJRCBzdHJpbmcgZm9ybWF0IG9mIHRoZSBmb3JtOlxuICogWFhYWFhYWFgtWFhYWC1YWFhYLVhYWFgtWFhYWFhYWFhYWFhYXG4gKi9cbnZhciBieXRlVG9IZXggPSBbXTtcbmZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgYnl0ZVRvSGV4W2ldID0gKGkgKyAweDEwMCkudG9TdHJpbmcoMTYpLnN1YnN0cigxKTtcbn1cblxuZnVuY3Rpb24gYnl0ZXNUb1V1aWQoYnVmLCBvZmZzZXQpIHtcbiAgdmFyIGkgPSBvZmZzZXQgfHwgMDtcbiAgdmFyIGJ0aCA9IGJ5dGVUb0hleDtcbiAgcmV0dXJuIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gKyAnLScgK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICsgJy0nICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXSArICctJyArXG4gICAgICAgICAgYnRoW2J1ZltpKytdXSArIGJ0aFtidWZbaSsrXV0gK1xuICAgICAgICAgIGJ0aFtidWZbaSsrXV0gKyBidGhbYnVmW2krK11dICtcbiAgICAgICAgICBidGhbYnVmW2krK11dICsgYnRoW2J1ZltpKytdXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBieXRlc1RvVXVpZDtcbiIsIi8vIFVuaXF1ZSBJRCBjcmVhdGlvbiByZXF1aXJlcyBhIGhpZ2ggcXVhbGl0eSByYW5kb20gIyBnZW5lcmF0b3IuICBJbiB0aGVcbi8vIGJyb3dzZXIgdGhpcyBpcyBhIGxpdHRsZSBjb21wbGljYXRlZCBkdWUgdG8gdW5rbm93biBxdWFsaXR5IG9mIE1hdGgucmFuZG9tKClcbi8vIGFuZCBpbmNvbnNpc3RlbnQgc3VwcG9ydCBmb3IgdGhlIGBjcnlwdG9gIEFQSS4gIFdlIGRvIHRoZSBiZXN0IHdlIGNhbiB2aWFcbi8vIGZlYXR1cmUtZGV0ZWN0aW9uXG52YXIgcm5nO1xuXG52YXIgY3J5cHRvID0gZ2xvYmFsLmNyeXB0byB8fCBnbG9iYWwubXNDcnlwdG87IC8vIGZvciBJRSAxMVxuaWYgKGNyeXB0byAmJiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKSB7XG4gIC8vIFdIQVRXRyBjcnlwdG8gUk5HIC0gaHR0cDovL3dpa2kud2hhdHdnLm9yZy93aWtpL0NyeXB0b1xuICB2YXIgcm5kczggPSBuZXcgVWludDhBcnJheSgxNik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWZcbiAgcm5nID0gZnVuY3Rpb24gd2hhdHdnUk5HKCkge1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMocm5kczgpO1xuICAgIHJldHVybiBybmRzODtcbiAgfTtcbn1cblxuaWYgKCFybmcpIHtcbiAgLy8gTWF0aC5yYW5kb20oKS1iYXNlZCAoUk5HKVxuICAvL1xuICAvLyBJZiBhbGwgZWxzZSBmYWlscywgdXNlIE1hdGgucmFuZG9tKCkuICBJdCdzIGZhc3QsIGJ1dCBpcyBvZiB1bnNwZWNpZmllZFxuICAvLyBxdWFsaXR5LlxuICB2YXIgcm5kcyA9IG5ldyBBcnJheSgxNik7XG4gIHJuZyA9IGZ1bmN0aW9uKCkge1xuICAgIGZvciAodmFyIGkgPSAwLCByOyBpIDwgMTY7IGkrKykge1xuICAgICAgaWYgKChpICYgMHgwMykgPT09IDApIHIgPSBNYXRoLnJhbmRvbSgpICogMHgxMDAwMDAwMDA7XG4gICAgICBybmRzW2ldID0gciA+Pj4gKChpICYgMHgwMykgPDwgMykgJiAweGZmO1xuICAgIH1cblxuICAgIHJldHVybiBybmRzO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJuZztcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbi8vICoqYHYxKClgIC0gR2VuZXJhdGUgdGltZS1iYXNlZCBVVUlEKipcbi8vXG4vLyBJbnNwaXJlZCBieSBodHRwczovL2dpdGh1Yi5jb20vTGlvc0svVVVJRC5qc1xuLy8gYW5kIGh0dHA6Ly9kb2NzLnB5dGhvbi5vcmcvbGlicmFyeS91dWlkLmh0bWxcblxuLy8gcmFuZG9tICMncyB3ZSBuZWVkIHRvIGluaXQgbm9kZSBhbmQgY2xvY2tzZXFcbnZhciBfc2VlZEJ5dGVzID0gcm5nKCk7XG5cbi8vIFBlciA0LjUsIGNyZWF0ZSBhbmQgNDgtYml0IG5vZGUgaWQsICg0NyByYW5kb20gYml0cyArIG11bHRpY2FzdCBiaXQgPSAxKVxudmFyIF9ub2RlSWQgPSBbXG4gIF9zZWVkQnl0ZXNbMF0gfCAweDAxLFxuICBfc2VlZEJ5dGVzWzFdLCBfc2VlZEJ5dGVzWzJdLCBfc2VlZEJ5dGVzWzNdLCBfc2VlZEJ5dGVzWzRdLCBfc2VlZEJ5dGVzWzVdXG5dO1xuXG4vLyBQZXIgNC4yLjIsIHJhbmRvbWl6ZSAoMTQgYml0KSBjbG9ja3NlcVxudmFyIF9jbG9ja3NlcSA9IChfc2VlZEJ5dGVzWzZdIDw8IDggfCBfc2VlZEJ5dGVzWzddKSAmIDB4M2ZmZjtcblxuLy8gUHJldmlvdXMgdXVpZCBjcmVhdGlvbiB0aW1lXG52YXIgX2xhc3RNU2VjcyA9IDAsIF9sYXN0TlNlY3MgPSAwO1xuXG4vLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2Jyb29mYS9ub2RlLXV1aWQgZm9yIEFQSSBkZXRhaWxzXG5mdW5jdGlvbiB2MShvcHRpb25zLCBidWYsIG9mZnNldCkge1xuICB2YXIgaSA9IGJ1ZiAmJiBvZmZzZXQgfHwgMDtcbiAgdmFyIGIgPSBidWYgfHwgW107XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIGNsb2Nrc2VxID0gb3B0aW9ucy5jbG9ja3NlcSAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5jbG9ja3NlcSA6IF9jbG9ja3NlcTtcblxuICAvLyBVVUlEIHRpbWVzdGFtcHMgYXJlIDEwMCBuYW5vLXNlY29uZCB1bml0cyBzaW5jZSB0aGUgR3JlZ29yaWFuIGVwb2NoLFxuICAvLyAoMTU4Mi0xMC0xNSAwMDowMCkuICBKU051bWJlcnMgYXJlbid0IHByZWNpc2UgZW5vdWdoIGZvciB0aGlzLCBzb1xuICAvLyB0aW1lIGlzIGhhbmRsZWQgaW50ZXJuYWxseSBhcyAnbXNlY3MnIChpbnRlZ2VyIG1pbGxpc2Vjb25kcykgYW5kICduc2VjcydcbiAgLy8gKDEwMC1uYW5vc2Vjb25kcyBvZmZzZXQgZnJvbSBtc2Vjcykgc2luY2UgdW5peCBlcG9jaCwgMTk3MC0wMS0wMSAwMDowMC5cbiAgdmFyIG1zZWNzID0gb3B0aW9ucy5tc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5tc2VjcyA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gIC8vIFBlciA0LjIuMS4yLCB1c2UgY291bnQgb2YgdXVpZCdzIGdlbmVyYXRlZCBkdXJpbmcgdGhlIGN1cnJlbnQgY2xvY2tcbiAgLy8gY3ljbGUgdG8gc2ltdWxhdGUgaGlnaGVyIHJlc29sdXRpb24gY2xvY2tcbiAgdmFyIG5zZWNzID0gb3B0aW9ucy5uc2VjcyAhPT0gdW5kZWZpbmVkID8gb3B0aW9ucy5uc2VjcyA6IF9sYXN0TlNlY3MgKyAxO1xuXG4gIC8vIFRpbWUgc2luY2UgbGFzdCB1dWlkIGNyZWF0aW9uIChpbiBtc2VjcylcbiAgdmFyIGR0ID0gKG1zZWNzIC0gX2xhc3RNU2VjcykgKyAobnNlY3MgLSBfbGFzdE5TZWNzKS8xMDAwMDtcblxuICAvLyBQZXIgNC4yLjEuMiwgQnVtcCBjbG9ja3NlcSBvbiBjbG9jayByZWdyZXNzaW9uXG4gIGlmIChkdCA8IDAgJiYgb3B0aW9ucy5jbG9ja3NlcSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgY2xvY2tzZXEgPSBjbG9ja3NlcSArIDEgJiAweDNmZmY7XG4gIH1cblxuICAvLyBSZXNldCBuc2VjcyBpZiBjbG9jayByZWdyZXNzZXMgKG5ldyBjbG9ja3NlcSkgb3Igd2UndmUgbW92ZWQgb250byBhIG5ld1xuICAvLyB0aW1lIGludGVydmFsXG4gIGlmICgoZHQgPCAwIHx8IG1zZWNzID4gX2xhc3RNU2VjcykgJiYgb3B0aW9ucy5uc2VjcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbnNlY3MgPSAwO1xuICB9XG5cbiAgLy8gUGVyIDQuMi4xLjIgVGhyb3cgZXJyb3IgaWYgdG9vIG1hbnkgdXVpZHMgYXJlIHJlcXVlc3RlZFxuICBpZiAobnNlY3MgPj0gMTAwMDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3V1aWQudjEoKTogQ2FuXFwndCBjcmVhdGUgbW9yZSB0aGFuIDEwTSB1dWlkcy9zZWMnKTtcbiAgfVxuXG4gIF9sYXN0TVNlY3MgPSBtc2VjcztcbiAgX2xhc3ROU2VjcyA9IG5zZWNzO1xuICBfY2xvY2tzZXEgPSBjbG9ja3NlcTtcblxuICAvLyBQZXIgNC4xLjQgLSBDb252ZXJ0IGZyb20gdW5peCBlcG9jaCB0byBHcmVnb3JpYW4gZXBvY2hcbiAgbXNlY3MgKz0gMTIyMTkyOTI4MDAwMDA7XG5cbiAgLy8gYHRpbWVfbG93YFxuICB2YXIgdGwgPSAoKG1zZWNzICYgMHhmZmZmZmZmKSAqIDEwMDAwICsgbnNlY3MpICUgMHgxMDAwMDAwMDA7XG4gIGJbaSsrXSA9IHRsID4+PiAyNCAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiAxNiAmIDB4ZmY7XG4gIGJbaSsrXSA9IHRsID4+PiA4ICYgMHhmZjtcbiAgYltpKytdID0gdGwgJiAweGZmO1xuXG4gIC8vIGB0aW1lX21pZGBcbiAgdmFyIHRtaCA9IChtc2VjcyAvIDB4MTAwMDAwMDAwICogMTAwMDApICYgMHhmZmZmZmZmO1xuICBiW2krK10gPSB0bWggPj4+IDggJiAweGZmO1xuICBiW2krK10gPSB0bWggJiAweGZmO1xuXG4gIC8vIGB0aW1lX2hpZ2hfYW5kX3ZlcnNpb25gXG4gIGJbaSsrXSA9IHRtaCA+Pj4gMjQgJiAweGYgfCAweDEwOyAvLyBpbmNsdWRlIHZlcnNpb25cbiAgYltpKytdID0gdG1oID4+PiAxNiAmIDB4ZmY7XG5cbiAgLy8gYGNsb2NrX3NlcV9oaV9hbmRfcmVzZXJ2ZWRgIChQZXIgNC4yLjIgLSBpbmNsdWRlIHZhcmlhbnQpXG4gIGJbaSsrXSA9IGNsb2Nrc2VxID4+PiA4IHwgMHg4MDtcblxuICAvLyBgY2xvY2tfc2VxX2xvd2BcbiAgYltpKytdID0gY2xvY2tzZXEgJiAweGZmO1xuXG4gIC8vIGBub2RlYFxuICB2YXIgbm9kZSA9IG9wdGlvbnMubm9kZSB8fCBfbm9kZUlkO1xuICBmb3IgKHZhciBuID0gMDsgbiA8IDY7ICsrbikge1xuICAgIGJbaSArIG5dID0gbm9kZVtuXTtcbiAgfVxuXG4gIHJldHVybiBidWYgPyBidWYgOiBieXRlc1RvVXVpZChiKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2MTtcbiIsInZhciBybmcgPSByZXF1aXJlKCcuL2xpYi9ybmcnKTtcbnZhciBieXRlc1RvVXVpZCA9IHJlcXVpcmUoJy4vbGliL2J5dGVzVG9VdWlkJyk7XG5cbmZ1bmN0aW9uIHY0KG9wdGlvbnMsIGJ1Ziwgb2Zmc2V0KSB7XG4gIHZhciBpID0gYnVmICYmIG9mZnNldCB8fCAwO1xuXG4gIGlmICh0eXBlb2Yob3B0aW9ucykgPT0gJ3N0cmluZycpIHtcbiAgICBidWYgPSBvcHRpb25zID09ICdiaW5hcnknID8gbmV3IEFycmF5KDE2KSA6IG51bGw7XG4gICAgb3B0aW9ucyA9IG51bGw7XG4gIH1cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgdmFyIHJuZHMgPSBvcHRpb25zLnJhbmRvbSB8fCAob3B0aW9ucy5ybmcgfHwgcm5nKSgpO1xuXG4gIC8vIFBlciA0LjQsIHNldCBiaXRzIGZvciB2ZXJzaW9uIGFuZCBgY2xvY2tfc2VxX2hpX2FuZF9yZXNlcnZlZGBcbiAgcm5kc1s2XSA9IChybmRzWzZdICYgMHgwZikgfCAweDQwO1xuICBybmRzWzhdID0gKHJuZHNbOF0gJiAweDNmKSB8IDB4ODA7XG5cbiAgLy8gQ29weSBieXRlcyB0byBidWZmZXIsIGlmIHByb3ZpZGVkXG4gIGlmIChidWYpIHtcbiAgICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgMTY7ICsraWkpIHtcbiAgICAgIGJ1ZltpICsgaWldID0gcm5kc1tpaV07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1ZiB8fCBieXRlc1RvVXVpZChybmRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB2NDtcbiJdfQ==
