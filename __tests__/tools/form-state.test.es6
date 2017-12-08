/**
 * LVL99 Form State
 */

let _loggerPath = 'lvl99/tools/form-state'
import FormState from '../../es6/tools/form-state'
import jQuery from 'jquery'
const $ = window.$ = jQuery(window)

document.body.innerHTML = '<form id="my-form">' +
    '<input type="text" name="test_a" value="">' +
    '<input type="password" name="test_b" value="">' +
    '<input type="checkbox" name="test_c" value="true" checked>' +
    '<input type="radio" name="test_d" value="2" checked>' +
    '<input type="radio" name="test_d" value="3">' +
    '<select name="test_e"><option value="a">A</option><option value="b">B</option><option value="c">C</option></select>' +
    '<textarea name="test_f">b</textarea>' +
  '</form>'

// default storageType is local
const formState = new FormState('#my-form')
let savedState
let currentState

test(`${_loggerPath} exists`, () => {
  expect(FormState).toBeTruthy()
})

test(`${_loggerPath} successfully instantiated`, () => {
  expect(formState).toBeInstanceOf(FormState)
})

test(`${_loggerPath} save the form state`, () => {
  savedState = formState.getSavedState()
  jQuery('[name="test_a"]').val(1).trigger('change')
  currentState = formState.getSavedState()
  expect(savedState).toBe(null)
  expect(currentState).toHaveProperty('snapshot')
  expect(currentState).toHaveProperty('targetId', 'my-form')
  expect(currentState).toHaveProperty('fields')
  expect(currentState.fields[0].value).toBe(1)
  expect(currentState.fields[1].value).toBe(true)
  expect(currentState.fields[2].value).toBe(2)
  expect(currentState.fields[3].value).toBe('a')
  expect(currentState.fields[4].value).toBe('b')
})

test(`${_loggerPath} change an ignored input to resave state which hasn't changed`, () => {
  savedState = currentState
  jQuery('[name="test_b"]').val(2).trigger('change')
  currentState = formState.getSavedState()
  expect(currentState).toHaveProperty('snapshot')
  expect(currentState).toHaveProperty('targetId', 'my-form')
  expect(currentState).toHaveProperty('fields')
  expect(currentState.fields).toHaveLength(5)
  expect(currentState.fields[0].value).toBe(1)
  expect(currentState.fields[1].value).toBe(true)
  expect(currentState.fields[2].value).toBe(2)
  expect(currentState.fields[3].value).toBe('a')
  expect(currentState.fields[4].value).toBe('b')
})

test(`${_loggerPath} uncheck the checkbox`, () => {
  savedState = currentState
  jQuery('[name="test_c"]').removeAttr('checked').trigger('change')
  currentState = formState.getSavedState()
  expect(currentState).toHaveProperty('snapshot')
  expect(currentState).toHaveProperty('targetId', 'my-form')
  expect(currentState).toHaveProperty('fields')
  expect(currentState.fields).toHaveLength(5)
  expect(currentState.fields[0].value).toBe(1)
  expect(currentState.fields[1].value).toBe('')
  expect(currentState.fields[2].value).toBe(2)
  expect(currentState.fields[3].value).toBe('a')
  expect(currentState.fields[4].value).toBe('b')
})

test(`${_loggerPath} select the other radio button`, () => {
  savedState = currentState
  jQuery('[name="test_d"]:eq(1)').attr('checked', 'checked').trigger('change')
  currentState = formState.getSavedState()
  expect(currentState).toHaveProperty('snapshot')
  expect(currentState).toHaveProperty('targetId', 'my-form')
  expect(currentState).toHaveProperty('fields')
  expect(currentState.fields).toHaveLength(5)
  expect(currentState.fields[0].value).toBe(1)
  expect(currentState.fields[1].value).toBe('')
  expect(currentState.fields[2].value).toBe(3)
  expect(currentState.fields[3].value).toBe('a')
  expect(currentState.fields[4].value).toBe('b')
})

test(`${_loggerPath} change the selected option`, () => {
  savedState = currentState
  jQuery('[name="test_e"] option:eq(2)').attr('selected', 'selected').trigger('change')
  currentState = formState.getSavedState()
  expect(currentState).toHaveProperty('snapshot')
  expect(currentState).toHaveProperty('targetId', 'my-form')
  expect(currentState).toHaveProperty('fields')
  expect(currentState.fields).toHaveLength(5)
  expect(currentState.fields[0].value).toBe(1)
  expect(currentState.fields[1].value).toBe('')
  expect(currentState.fields[2].value).toBe(3)
  expect(currentState.fields[3].value).toBe('c')
  expect(currentState.fields[4].value).toBe('b')
})

test(`${_loggerPath} change the textarea`, () => {
  savedState = currentState
  jQuery('[name="test_f"]').val('lorem ipsum').trigger('change')
  currentState = formState.getSavedState()
  expect(currentState).toHaveProperty('snapshot')
  expect(currentState).toHaveProperty('targetId', 'my-form')
  expect(currentState).toHaveProperty('fields')
  expect(currentState.fields).toHaveLength(5)
  expect(currentState.fields[0].value).toBe(1)
  expect(currentState.fields[1].value).toBe('')
  expect(currentState.fields[2].value).toBe(3)
  expect(currentState.fields[3].value).toBe('c')
  expect(currentState.fields[4].value).toBe('lorem ipsum')
})
