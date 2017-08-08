/**
 * LVL99 Entity
 */

let _loggerPath = 'lvl99/es6/core/app'
const Entity = require('../../es6/core/entity')
const App = require('../../es6/core/app')
const Component = require('../../es6/core/component')

let testApp = new App({
  config: {
    debug: true,
    homepage: undefined
  }
})
let newComponent

test(`${_loggerPath} exists`, () => {
  expect(App).toBeTruthy()
})

test(`${_loggerPath} instantiates correctly`, () => {
  expect(testApp).toBeInstanceOf(App)
})

test(`${_loggerPath} can be extended`, () => {
  testApp.extend({
    _properties: {
      testPropA: true,
      testPropB: undefined
    },
    _components: {
      Component
    }
  })
  expect(testApp._NS).toBe('LVL99:App')
  expect(testApp).toHaveProperty('_components.Component')
  expect(testApp._components.Component).toBe(Component)
})

test(`${_loggerPath} getProp works`, () => {
  expect(testApp.getProp('testPropA')).toBe(true)
})

test(`${_loggerPath} setProp works`, () => {
  testApp.setProp('testPropB', 123)
  expect(testApp.getProp('testPropB')).toBe(123)
})

test(`${_loggerPath} getAttr works`, () => {
  expect(testApp.getAttr('config')).toBeTruthy()
})

test(`${_loggerPath} setAttr works`, () => {
  testApp.setAttr('config.homepage', 'http://www.example.com')
  expect(testApp.getAttr('config.homepage')).toBe('http://www.example.com')
})

test(`${_loggerPath} can create component instances`, () => {
  newComponent = testApp.createComponentInstance('Component', {
    _testAttr: 'success'
  })
  expect(newComponent).toBeInstanceOf(Component)
})

test(`${_loggerPath} added component instance`, () => {
  let getComponent = testApp.getComponentInstance(newComponent._uuid)
  expect(getComponent).toBeInstanceOf(Component)
  expect(getComponent).toBe(newComponent)
  expect(getComponent._uuid).toBe(newComponent._uuid)
})

test(`${_loggerPath} remove component instance`, () => {
  testApp.removeComponentInstance(newComponent._uuid)
  let getComponent = testApp.getComponentInstance(newComponent._uuid)
  expect(getComponent).not.toBeInstanceOf(Component)
  expect(getComponent).not.toBeTruthy()
  expect(getComponent).toBeUndefined()
})
