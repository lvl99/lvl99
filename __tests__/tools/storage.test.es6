/**
 * LVL99 Storage
 *
 * Tests rely on `jest-localstorage-mock` to be setup for this file
 */

let _loggerPath = 'lvl99/tools/storage'
import Storage from '../../es6/tools/storage'

// default storageType is local
const storage = new Storage()

test(`${_loggerPath} exists`, () => {
  expect(Storage).toBeTruthy()
})

test(`${_loggerPath} successfully instantiated`, () => {
  expect(storage).toBeInstanceOf(Storage)
})

//
// Local
//

test(`${_loggerPath} check localStorage is supported`, () => {
  expect(supported.localStorage).toBe(true)
})

test(`${_loggerPath} set/get item from local storage`, () => {
  storage.setItem('testA', 123)
  let test = storage.getItem('testA')
  expect(test).toBe(123)
})

test(`${_loggerPath} remove item from local storage`, () => {
  storage.removeItem('testA')
  let test = storage.getItem('testA')
  expect(test).toBe(null)
})

test(`${_loggerPath} clear local storage`, () => {
  storage.setItem('testA', 123)
  let test = storage.getItem('testA')
  expect(test).toBe(123)
  storage.clearLocal()
  test = storage.getItem('testA')
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
