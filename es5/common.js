/**
 * LVL99 Common
 *
 * Common dependencies and other useful things
 *
 * @package lvl99
 */

import jQuery from 'jquery';
export var $ = jQuery;

/**
 * Basic shorthand props to cache/reference common jQuery objects
 */
export var $doc = $(document);
export var $win = $(window);
export var $html = $('html');
export var $body = $('body');

/**
 * Event name shorthands
 */
export var events = {
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

export default utils;