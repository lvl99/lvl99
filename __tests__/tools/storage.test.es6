/**
 * LVL99 Storage
 *
 * Tests rely on `jest-localstorage-mock` to be setup for this file
 */

let _loggerPath = 'lvl99/tools/storage'
import Storage, { ObjectStorage, getSupportedStorageTypes } from '../../es6/tools/storage'

// default storageType is local
const supported = getSupportedStorageTypes()
const storage = new Storage()
const objStorage = new ObjectStorage()

test(`${_loggerPath} exists`, () => {
  expect(Storage).toBeTruthy()
})

test(`${_loggerPath} successfully instantiated`, () => {
  expect(storage).toBeInstanceOf(Storage)
})

//
// Object
//
test(`${_loggerPath} check objectStorage exists`, () => {
  expect(ObjectStorage).toBeTruthy()
})

test(`${_loggerPath} check objectStorage instantiates`, () => {
  expect(objStorage).toBeInstanceOf(ObjectStorage)
})

test(`${_loggerPath} objectStorage getItem/setItem`, () => {
  objStorage.setItem('test1', 123)
  objStorage.setItem('test2', 'abc')
  objStorage.setItem('test3', { a:1, b:2, c:3 })
  objStorage.setItem('test4', true)
  let testSetItem1 = objStorage.getItem('test1')
  let testSetItem2 = objStorage.getItem('test2')
  let testSetItem3 = objStorage.getItem('test3')
  let testSetItem4 = objStorage.getItem('test4')
  expect(testSetItem1).toBe(123)
  expect(testSetItem2).toBe('abc')
  expect(testSetItem3).toBeInstanceOf(Object)
  expect(testSetItem3).toHaveProperty('a', 1)
  expect(testSetItem3).toHaveProperty('b', 2)
  expect(testSetItem3).toHaveProperty('c', 3)
  expect(testSetItem4).toBe(true)
})

test(`${_loggerPath} objectStorage clear`, () => {
  objStorage.clear()
  let testSetItem1 = objStorage.getItem('test1')
  expect(testSetItem1).toBe(null)
})

//
// Local
//

test(`${_loggerPath} check localStorage is supported`, () => {
  expect(supported.localStorage).toBe(true)
})

test(`${_loggerPath} set/get item from local storage`, () => {
  storage.setItemLocal('testA', 123)
  let test = storage.getItemLocal('testA')
  expect(test).toBe(123)
})

test(`${_loggerPath} remove item from local storage`, () => {
  storage.removeItemLocal('testA')
  let test = storage.getItemLocal('testA')
  expect(test).toBe(null)
})

test(`${_loggerPath} clear local storage`, () => {
  storage.setItemLocal('testA', 123)
  let test = storage.getItemLocal('testA')
  expect(test).toBe(123)
  storage.clearLocal()
  test = storage.getItemLocal('testA')
  expect(test).toBe(null)
})

//
// Session
//

test(`${_loggerPath} check sessionStorage is supported`, () => {
  expect(supported.sessionStorage).toBe(true)
})

test(`${_loggerPath} set/get item in session storage`, () => {
  storage.setItemSession('testB', 'abc')
  let test = storage.getItemSession('testB')
  expect(test).toBe('abc')
})

test(`${_loggerPath} remove item from session storage`, () => {
  storage.removeItemSession('testB')
  let test = storage.getItemSession('testB')
  expect(test).toBe(null)
})

test(`${_loggerPath} clear session storage`, () => {
  storage.setItemSession('testB', 'abc')
  let test = storage.getItemSession('testB')
  expect(test).toBe('abc')
  storage.clearSession()
  test = storage.getItemSession('testB')
  expect(test).toBe(null)
})
