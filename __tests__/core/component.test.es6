/**
 * LVL99 Component
 */

let _loggerPath = 'lvl99/core/component'
import Component from '../../es6/core/component'

let testComponent = new Component({
  testAttrA: 1,
  testAttrB: 2,
  testAttrC: 3
})

test(`${_loggerPath} exists`, () => {
  expect(Component).toBeTruthy()
})

test(`${_loggerPath} instantiates correctly`, () => {
  expect(testComponent.NS).toBe('LVL99:Component')
  expect(testComponent.ns).toBe('lvl99-component')
  expect(testComponent.attributes).toHaveProperty('testAttrA', 1)
  expect(testComponent.getAttr('testAttrA')).toBe(1)
})
