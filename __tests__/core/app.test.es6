/**
 * LVL99 Entity
 */

let _loggerPath = 'lvl99/core/app'
import App from '../../es6/core/app'
import Component from '../../es6/core/component'

const testApp = new App({
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
    _components: {}
  })

  expect(testApp.NS).toBe('LVL99:App')
  expect(testApp.components).toBeDefined()
})

test(`${_loggerPath} getProp works`, () => {
  expect(testApp.getProp('testPropA')).toBe(true)
  expect(testApp.getProp('testPropB')).toBe(undefined)
})

test(`${_loggerPath} setProp works`, () => {
  testApp.setProp('testPropB', 123)
  expect(testApp.getProp('testPropB')).toBe(123)
})

test(`${_loggerPath} getAttr works`, () => {
  console.log(testApp)
  console.log(testApp.getAttr('config'))

  expect(testApp.getAttr('config')).toHaveProperty('debug', true)
  expect(testApp.getAttr('config')).toHaveProperty('homepage', undefined)
})

test(`${_loggerPath} setAttr works`, () => {
  testApp.setAttr('config.homepage', 'https://www.example.com')
  expect(testApp.getAttr('config.homepage')).toBe('https://www.example.com')
})

test(`${_loggerPath} register a component class with default constructor name`, () => {
  testApp.registerComponentClass(Component)
  expect(testApp.components).toHaveProperty('Component')
})

test(`${_loggerPath} register a component class by specified namespace`, () => {
  testApp.registerComponentClass(Component, 'Test:Component')
  expect(testApp.components).toHaveProperty('Test:Component')
})

test(`${_loggerPath} get registered component class`, () => {
  let getComponentA = testApp.getComponentClass('Component')
  let getComponentB = testApp.getComponentClass('Test:Component')
  expect(getComponentA).toBeDefined()
  expect(getComponentB).toBeDefined()
})

test(`${_loggerPath} deregister component class`, () => {
  testApp.deregisterComponentClass('Component')
  testApp.deregisterComponentClass('Test:Component')
  let getComponentA = testApp.getComponentClass('Component')
  let getComponentB = testApp.getComponentClass('Test:Component')
  expect(testApp.components).not.toHaveProperty('Component')
  expect(getComponentA).not.toBeDefined()
  expect(testApp.components).not.toHaveProperty('Test:Component')
  expect(getComponentB).not.toBeDefined()
})

test(`${_loggerPath} can create component instances`, () => {
  testApp.registerComponentClass(Component, 'Component')
  newComponent = testApp.createComponentInstance('Component', {
    _testAttr: 'success'
  })
  expect(newComponent).toBeInstanceOf(Component)
  expect(newComponent.getAttr('_testAttr')).toBe('success')
})

test(`${_loggerPath} added component instance`, () => {
  let getComponent = testApp.getComponentInstance(newComponent.uuid)
  expect(getComponent).toBeInstanceOf(Component)
  expect(getComponent).toBe(newComponent)
  expect(getComponent.uuid).toBe(newComponent.uuid)
})

test(`${_loggerPath} remove component instance`, () => {
  testApp.removeComponentInstance(newComponent.uuid)
  let getComponent = testApp.getComponentInstance(newComponent.uuid)
  expect(getComponent).not.toBeInstanceOf(Component)
  expect(getComponent).not.toBeTruthy()
  expect(getComponent).toBeUndefined()
})

test(`${_loggerPath} instantiates components on DOM elements`, () => {
  // @TODO figure this out...
})
