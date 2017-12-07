/**
 * LVL99 Entity
 */

let _loggerPath = 'lvl99/core/entity'
import Debug from '../../es6/tools/debug'
import Entity from '../../es6/core/entity'

const TestEntityProperties = {
  _NS: "Test:Entity",
  _ns: "test-entity",
  _properties: {
    debug: Debug()
  },
  _attributes: {}
}

class TestEntity extends Entity {
  constructor (attributes) {
    super(attributes)
  }

  extend () {
    super.extend(TestEntityProperties, ...arguments)
  }
}

let testEntity = new TestEntity({
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
  expect(TestEntity).toBeTruthy()
})

test(`${_loggerPath} instantiates correctly`, () => {
  expect(testEntity).toBeInstanceOf(TestEntity)
})

test(`${_loggerPath} setProp works`, () => {
  testEntity.setProp('testPropA', true)
  expect(testEntity.getProp('testPropA')).toBeTruthy()
})

test(`${_loggerPath} getProp works`, () => {
  expect(testEntity.getProp('testPropA')).toBe(true)
  expect(testEntity.getProp('debug')).toBeTruthy()
})

test(`${_loggerPath} ensure properties are shared between instances`, () => {
  expect(testEntity.getProp('debug')).toBe(TestEntityProperties._properties.debug)
})

test(`${_loggerPath} setAttr works`, () => {
  testEntity.setAttr('_testA', 1)
  expect(testEntity.getAttr('_testA')).toBe(1)
})

test(`${_loggerPath} getAttr works`, () => {
  expect(testEntity.getAttr('_testB')).toBeInstanceOf(Array)
})

test(`${_loggerPath} ensure attributes aren't shared`, () => {
  expect(testEntity.attributes).not.toBe(TestEntityProperties._attributes)
})
