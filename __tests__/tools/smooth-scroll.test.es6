/**
 * LVL99 SmoothScroll
 *
 * @jest-environment jsdom
 */

let _loggerPath = 'lvl99/tools/smooth-scroll'
import SmoothScroll from '../../es6/tools/smooth-scroll'
import jQuery from 'jquery'
const $ = window.$ = jQuery(window)

// Setup the HTML for testing smooth scroll
document.body.innerHTML = '<p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p><p id="scroll-to">Hello world</p><p>Hello world</p><p>Hello world</p><p>Hello world</p>'

// Instantiated smoothScroll
const smoothScroll = SmoothScroll(jQuery)

test(`${_loggerPath} exists`, () => {
  expect(SmoothScroll).toBeTruthy()
})

test(`${_loggerPath} successfully instantiated`, () => {
  expect(smoothScroll).toBeInstanceOf(Object)
  expect(smoothScroll).toHaveProperty('init')
  expect(smoothScroll).toHaveProperty('scrollTo')
  smoothScroll.init()
})

// @TODO need to figure out how to get Virtual DOM tests to work
// test(`${_loggerPath} scroll to #scroll-to`, () => {
//   smoothScroll.scrollTo('#scroll-to', {
//     scrollSpeed: 1
//   })
//   expect(window.scrollTop).not.toBe(0)
// })
