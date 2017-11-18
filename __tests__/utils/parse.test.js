/**
 * LVL99 Parse
 */

let _loggerPath = 'lvl99/utils/parse'
let Parse = require('../../es5/utils/parse')

/**
 * Parse.coerceToPrimitiveType
 */

test(`${_loggerPath} exists`, () => {
  expect(Parse).toBeTruthy()
})

test(`${_loggerPath}.coerceToPrimitiveType: 0`, () => {
  expect(Parse.coerceToPrimitiveType('0')).toBe(0)
})

test(`${_loggerPath}.coerceToPrimitiveType: 1`, () => {
  expect(Parse.coerceToPrimitiveType('1')).toBe(1)
})

test(`${_loggerPath}.coerceToPrimitiveType: true`, () => {
  expect(Parse.coerceToPrimitiveType('true')).toBe(true)
})

test(`${_loggerPath}.coerceToPrimitiveType: false`, () => {
  expect(Parse.coerceToPrimitiveType('false')).toBe(false)
})

test(`${_loggerPath}.coerceToPrimitiveType: NaN`, () => {
  expect(isNaN(Parse.coerceToPrimitiveType('NaN'))).toBe(true)
})

test(`${_loggerPath}.coerceToPrimitiveType: Infinity`, () => {
  expect(isFinite(Parse.coerceToPrimitiveType('Infinity'))).not.toBe(true)
})

test(`${_loggerPath}.coerceToPrimitiveType: undefined`, () => {
  expect(Parse.coerceToPrimitiveType('undefined')).toBeUndefined()
})

test(`${_loggerPath}.coerceToPrimitiveType: null`, () => {
  expect(Parse.coerceToPrimitiveType('null')).toBeNull()
})

test(`${_loggerPath}.coerceToPrimitiveType: Object`, () => {
  expect(Parse.coerceToPrimitiveType('{}')).toBeInstanceOf(Object)
})

test(`${_loggerPath}.coerceToPrimitiveType: Array`, () => {
  expect(Parse.coerceToPrimitiveType('[]')).toBeInstanceOf(Array)
})

test(`${_loggerPath}.coerceToPrimitiveType: Simple Float`, () => {
  expect(Parse.coerceToPrimitiveType('0.1')).toBe(0.1)
})

test(`${_loggerPath}.coerceToPrimitiveType: Complex Float`, () => {
  expect(Parse.coerceToPrimitiveType('-0.005e-10')).toBe(-0.005e-10)
})

let testJson = {test: 123, test2: 'abc', test3: true, test4: [1, 2, 3]}
let testJsonString = JSON.stringify(testJson)
let testJsonParse = Parse.coerceToPrimitiveType(testJsonString)

test(`${_loggerPath}.coerceToPrimitiveType: JSON Object`, () => {
  expect(testJsonParse).toBeInstanceOf(Object)
  expect(JSON.stringify(testJsonParse)).toBe(JSON.stringify(testJson))
})

test(`${_loggerPath}.coerceToPrimitiveType: JSON Object properties all match`, () => {
  expect(testJsonParse).toHaveProperty('test', 123)
  expect(testJsonParse).toHaveProperty('test2', 'abc')
  expect(testJsonParse).toHaveProperty('test3', true)
  expect(testJsonParse).toHaveProperty('test4', [1, 2, 3])
})

/**
 * Parse.extractClassDetails
 */

let testClassDetails = 'test: 123; test2: abc; test3: true; test4: [1, 2, 3]; test5: parent:Component'
let testClassObject = Parse.extractClassDetails(testClassDetails)

test(`${_loggerPath}.extractClassDetails works`, () => {
  expect(testClassObject).toBeInstanceOf(Object)
})

test(`${_loggerPath}.extractClassDetails: Object property values all match`, () => {
  expect(testClassObject).toHaveProperty('test', 123)
  expect(testClassObject).toHaveProperty('test2', 'abc')
  expect(testClassObject).toHaveProperty('test3', true)
  expect(testClassObject).toHaveProperty('test4', [1, 2, 3])
  expect(testClassObject).toHaveProperty('test5', 'parent:Component')
})
