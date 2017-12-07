/**
 * LVL99 Breakpoints
 */

let _loggerPath = 'lvl99/tools/breakpoints'
import Breakpoints from '../../es6/tools/breakpoints'
let breakpoints = Breakpoints({
  'desktop': [1024, 99999],
  'tablet-l': [800, 1024],
  'tablet': [768, 1024],
  'mobile': [0, 768]
})

test(`${_loggerPath} exists`, () => {
  expect(breakpoints).toBeTruthy()
})

test(`${_loggerPath}.sizes exists`, () => {
  expect(breakpoints).toHaveProperty('sizes')
})

test(`${_loggerPath}.sizes.desktop is Array`, () => {
  expect(breakpoints.sizes.desktop).toBeInstanceOf(Array)
})

test(`${_loggerPath}.getActive() should have desktop`, () => {
  global.innerWidth = 1440
  global.innerHeight = 900
  expect(breakpoints.getActive()).toContain('desktop')
})

test(`${_loggerPath}.getActive() should have tablet`, () => {
  global.innerWidth = 768
  global.innerHeight = 1024
  expect(breakpoints.getActive()).toContain('tablet')
})

test(`${_loggerPath}.getActive() should have tablet-l`, () => {
  global.innerWidth = 800
  global.innerHeight = 600
  expect(breakpoints.getActive()).toContain('tablet-l')
})

test(`${_loggerPath}.getActive() should have mobile`, () => {
  global.innerWidth = 400
  global.innerHeight = 600
  expect(breakpoints.getActive()).toContain('mobile')
})

test(`${_loggerPath}.isActive('mobile') should be true`, () => {
  global.innerWidth = 400
  global.innerHeight = 600
  expect(breakpoints.isActive('mobile')).toBeTruthy()
})
