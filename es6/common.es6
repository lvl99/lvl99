/**
 * # Common
 *
 * Common dependencies and other useful things.
 */

import jQuery from 'jquery'

/**
 * jQuery
 *
 * @type {jQueryObject}
 */
export const $ = jQuery

/**
 * Basic shorthand props to cache/reference common jQuery objects
 */

/**
 * The window as a jQuery object.
 *
 * @type {jQueryObject}
 */
export const $win = $(window)

/**
 * The document as a jQuery object.
 *
 * @type {jQueryObject}
 */
export const $doc = $(document)

/**
 * The HTML DOM element as a jQuery object.
 *
 * @type {jQueryObject}
 */
export const $html = $('html')

/**
 * The body DOM element node as a jQuery object.
 *
 * @type {jQueryObject}
 */
export const $body = $('body')

/**
 * Common browser event names and their cross-browser versions
 *
 * @type {Object}
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

/**
 * @namespace lvl99.common
 */
const common = {
  $,
  $doc,
  $win,
  $html,
  $body,
  events
}

export default common
