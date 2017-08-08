/**
 * LVL99 Common
 *
 * Common dependencies and other useful things
 *
 * @package lvl99
 */

const $ = require('jquery')

/**
 * Basic shorthand props to cache/reference common jQuery objects
 */
const $doc = $(document)
const $win = $(window)
const $html = $('html')
const $body = $('body')

/**
 * Event name shorthands
 */
const events = {
  click: 'click touchend',
  inputstart: 'mousedown touchstart keydown',
  inputend: 'mouseup touchend keyup',
  animationrun: 'animationrun webkitAnimationRun webkitanimationrun mozAnimationRun MSAnimationRun oAnimationRun oanimationrun',
  animationstart: 'animationstart webkitAnimationStart webkitanimationstart mozAnimationStart MSAnimationStart oAnimationStart oanimationstart',
  animationend: 'animationend webkitAnimationEnd webkitanimationend mozAnimationEnd MSAnimationEnd oAnimationEnd oanimationend',
  transitionrun: 'transitionrun webkitTransitionRun webkittransitionrun mozTransitionRun MSTransitionRun oTransitionRun otransitionrun',
  transitionstart: 'transitionstart webkitTransitionStart webkittransitionstart mozTransitionStart MSTransitionStart oTransitionStart otransitionstart',
  transitionend: 'transitionend webkitTransitionEnd webkittransitionend mozTransitionEnd MSTransitionEnd oTransitionEnd otransitionend'
}

const utils = {
  $,
  $doc,
  $win,
  $html,
  $body,
  events
}

module.exports = utils
