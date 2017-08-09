/**
 * LVL99 Entity
 */

let _loggerPath = 'lvl99/es6/core/entity'
const Entity = require('../../es6/core/entity')

let testEntity = new Entity({
  _testA: undefined,
  _testB: [2, 3],
  _testC: {
    a: 4,
    b: 5,
    c: 6
  }
})

test(`${_loggerPath} exists`, () => {
  expect(Entity).toBeTruthy()
})

test(`${_loggerPath} instantiates correctly`, () => {
  expect(testEntity).toBeInstanceOf(Entity)
})

test(`${_loggerPath} can be extended`, () => {
  expect(testEntity.NS).toBe('LVL99:Entity')
  expect(testEntity.ns).toBe('lvl99-entity')

  testEntity.extend({
    _NS: 'Test:Entity',
    _ns: 'test-entity',
    _properties: {
      testPropA: undefined,
      testPropB: 123
    }
  })

  expect(testEntity.NS).toBe('Test:Entity')
  expect(testEntity.ns).toBe('test-entity')
})

test(`${_loggerPath} setProp works`, () => {
  testEntity.setProp('testPropA', true)
  expect(testEntity.getProp('testPropA')).toBeTruthy()
})

test(`${_loggerPath} getProp works`, () => {
  expect(testEntity.getProp('testPropA')).toBe(true)
  expect(testEntity.getProp('testPropB')).toBe(123)
})

test(`${_loggerPath} setAttr works`, () => {
  testEntity.setAttr('_testA', 1)
  expect(testEntity.getAttr('_testA')).toBe(1)
})

test(`${_loggerPath} getAttr works`, () => {
  expect(testEntity.getAttr('_testB')).toBeInstanceOf(Array)
})
