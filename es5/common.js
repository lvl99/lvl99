(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.jquery);
    global.common = mod.exports;
  }
})(this, function (exports, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.events = exports.$body = exports.$html = exports.$win = exports.$doc = exports.$ = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var $ = exports.$ = _jquery2.default;

  /**
   * Basic shorthand props to cache/reference common jQuery objects
   */
  /**
   * LVL99 Common
   *
   * Common dependencies and other useful things
   *
   * @package lvl99
   */

  var $doc = exports.$doc = $(document);
  var $win = exports.$win = $(window);
  var $html = exports.$html = $('html');
  var $body = exports.$body = $('body');

  /**
   * Event name shorthands
   */
  var events = exports.events = {
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

  exports.default = utils;
});