/**
 * LVL99 Common
 *
 * Common dependencies and other useful things
 *
 * @package lvl99
 */

import jQuery from 'jquery'
export const $ = jQuery

/**
 * Basic shorthand props to cache/reference common jQuery objects
 */
export const $doc = $(document)
export const $win = $(window)
export const $html = $('html')
export const $body = $('body')

/**
 * Event name shorthands
 */
export const events = {
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

export default utils
