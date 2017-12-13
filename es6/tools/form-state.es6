/**
 * LVL99 Form State
 *
 * Use local or session storage to save a form's state. This means if a user navigates away that their data can be
 * stored and they can choose to resume or reset the form's state.
 *
 * @module lvl99/tools/FormState
 * @requires module:jquery
 * @requires module:lodash.merge
 * @requires module:lvl99/utils/parse
 * @requires module:lvl99/tools/Storage
 * @namespace lvl99.tools.FormState
 */

import merge from 'lodash.merge'
import { $ } from '../common'
import { coerceToPrimitiveType } from '../utils/parse'
import Storage, { LOCAL_STORAGE } from './storage'

/**
 * The various work states of the FormState instance.
 *
 * @typedef {Number} FormStateStatus
 * @readonly
 * @enum {FormStateStatus}
 */
const FORMSTATE_STATUS = {
  /** Instance is currently idle. */
  IDLE: 0,
  /** Instance is processing. */
  PROCESSING: 1
}

// Use the Storage tool to save the form's state
const STORAGE = new Storage()

/**
 * Get a field's current state.
 *
 * @static
 * @param {String|HTMLElement|jQueryObject} targetField
 * @returns {undefined|FieldStateSnapshot}
 */
export function getFieldState (targetField) {
  let $field = $(targetField)
  let tagName = $field[0].tagName.toLowerCase()
  let id = $field.attr('id')
  let type = $field.attr('type')
  let name = $field.attr('name')
  let $relatedFields = $field.parents('form').find(`[name="${name}"]`)
  let nameIndex = $relatedFields.index($field)
  let value = $field.val()

  /**
   * A field's state describing how to locate the field and its value at the time of saving.
   *
   * @typedef {Object} FieldStateSnapshot
   * @prop {Number} snapshot - Unix time in milliseconds of when the snapshot was taken
   * @prop {String} tagName - The field's HTML tag name
   * @prop {undefined|String} [id=undefined] - The field's `id` attribute value
   * @prop {undefined|String} [type=undefined] - The field's `type` attribute value
   * @prop {undefined|String} [name=undefined] - The field's `name` attribute value
   * @prop {Number} nameIndex - The field's numbered index for other fields that share the same name (e.g. radio buttons)
   * @prop {*} value - The field's computed value
   */
  let fieldState = {
    snapshot: Date.now(),
    tagName,
    id,
    type,
    name,
    nameIndex,
    value
  }

  // Extra transforms on the value depending on the type of field and its state
  switch (type) {
    // If a checkbox is not checked, it's state value should be ''
    case 'checkbox':
      if (!$field.is(':checked')) {
        fieldState.value = ''
      }
      break

    // Ignore checkboxes which haven't been checked
    case 'radio':
      if (!$field.is(':checked')) {
        return undefined
      }
  }

  /**
   * Trigger a custom event on the field to allow other things to manipulate the field's returned state.
   *
   * @trigger FormState.getFieldState:after
   * @param {FieldStateSnapshot} fieldState The generated field's state
   * @param {Object} options Extra data used to generate the state
   */
  $field.trigger('FormState.getFieldState:after', [fieldState, {
    $field,
    $relatedFields
  }])

  return fieldState
}

/**
 * FormState class.
 *
 * @namespace FormState
 * @class
 */
export default class FormState {
  /**
   * FormState constructor.
   *
   * @constructor
   * @param {String|HTMLElement|jQueryObject} target
   * @param {Object} options
   * @throws Error
   */
  constructor (target, options) {
    /**
     * The options for the FormState instance.
     *
     * @typedef {Object} FormStateOptions
     * @prop {String|HTMLElement|jQueryObject} target - The target form element.
     * @prop {String} storageType - The default storage type to use
     * @prop {Boolean} clearOnSubmit=true - Clear the form's state when submitted
     * @prop {String} includeFields - Selector of fields to save state values of.
     *
     * Defaults to HTML elements `input`, `select` and `textarea` which have a name attribute set, and any element
     * that returns a `jQuery.fn.val()` result with the attribute `data-form-state-include`.
     *
     * @prop {String} ignoreFields - Selector of fields to ignore values of when saving state.
     *
     * Defaults to ignoring input elements with type of button, submit, reset and image; any elements with the
     * attribute `data-form-state-ignore`; and any hidden input elements which have a name that starts with an
     * underscore (like WP nonce hidden inputs).
     *
     * Please note that password and file input elements will always be ignored.
     */
    this.settings = merge({
      target: target,
      storageType: LOCAL_STORAGE,
      clearOnSubmit: true,
      includeFields: 'input[name], select[name], textarea[name], [data-form-state-include]',
      ignoreFields: 'input[type="submit"], input[type="reset"], input[type="button"], input[type="image"], input[type="hidden"][name^="_"], [data-form-state-ignore]'
    }, options)

    // Error if falsey target given
    if (!this.settings.target) {
      throw new Error('Invalid target form element given')
    }

    /**
     * The element which represents the target form.
     *
     * @memberof FormState
     * @prop {jQueryObject} $target
     */
    this.$target = $(this.settings.target).first()

    // Error if no target element found in DOM
    if (!this.$target.length) {
      throw new Error('Target form element is not found')
    }

    // Error if invalid element or no ID set
    if (!this.$target.is('form') || !this.$target.attr('id')) {
      throw new Error('Target form element must be a form and have an ID set')
    }

    /**
     * @memberof FormState
     * @prop {FormStateStatus} status - The current working status of the FormState instance.
     */
    this.status = 0

    //
    // Attach event listeners to the target form
    //

    // Change = save
    this.$target.on('change', () => {
      this.save()
    })

    // Reset = restore
    this.$target.on('reset', () => {
      this.restore()
    })

    // Submit = clear (if settings are configured)
    this.$target.on('submit', () => {
      if (this.settings.clearOnSubmit) {
        this.clear()
      }
    })

    // After instantiation, restore the form state
    this.restore()
  }

  /**
   * Get the target's supported fields as a jQuery object.
   *
   * @returns {jQueryObject}
   */
  getFields () {
    return this.$target
      // Get only the included fields
      .find(this.settings.includeFields)
      // Remove any ignored fields
      .not(this.settings.ignoreFields)
      // Remove fields which are security issue or incompatible with local storage
      .not('[type="password"], [type="file"]')
  }

  /**
   * Get a field's current state.
   *
   * @param {String|HTMLElement|jQueryObject} targetField
   * @returns {undefined|FieldStateSnapshot}
   */
  getFieldState (targetField) {
    return getFieldState(targetField)
  }

  /**
   * Restore a single field's state.
   *
   * @param {FormFieldState} fieldState
   */
  restoreFieldState (fieldState) {
    let $field

    // Prioritise getting by ID
    if (fieldState.id) {
      $field = this.$target.find(`[id="${fieldState.id}"]`)
    } else {
      // Add in the type check if the tagName is input
      if (fieldState.tagName === 'input') {
        $field = this.$target.find(`${fieldState.tagName}[type="${fieldState.type}"][name="${fieldState.name}"]`)

        // Otherwise do what ya gotta do
      } else {
        $field = this.$target.find(`${fieldState.tagName}[name="${fieldState.name}"]`)
      }

      // Ensure only doing it for one field
      if ($field.length > 1) {
        $field = $field.filter(`:eq(${fieldState.nameIndex || 0})`)
      }
    }

    // Warn if can't find the field
    if (!$field.length) {
      console.warn('[FormState] Field was not found in DOM to restore')
    }

    /**
     * Trigger a custom event before restoring the field's state
     *
     * @trigger FormState.restoreField:before
     * @param {FieldStateSnapshot} fieldState
     */
    $field.trigger('FormState.restoreField:before', [fieldState])

    // Set the field's value and any other information about its state
    switch (fieldState.tagName) {
      //
      // Input fields
      //
      case 'input':
        switch (fieldState.type) {
          // Radio and checkbox fields need to be checked if the value is not empty, or unchecked if it is
          case 'checkbox':
          case 'radio':
            if (fieldState.value !== '' && fieldState.value !== undefined && fieldState.value !== null) {
              $field.prop('checked', true)
            } else {
              $field.prop('checked', false)
            }
            break

          // This should work for most of them
          default:
            $field.val(fieldState.value)
            break
        }
        break

      // Textarea fields
      case 'textarea':
        $field.val(fieldState.value)
        break

      // Select fields
      case 'select':
        $field.find('option').each((index, option) => {
          let $option = $(option)

          // Yes linter, I do want to use ==
          if ($option.val() == fieldState.value) {
            $option.prop('selected', true)
          } else {
            $option.prop('selected', false)
          }
        })
        break
    }

    /**
     * Trigger a custom event after restoring the field's state
     *
     * @trigger FormState.restoreField:after
     * @param {FieldStateSnapshot} fieldState
     */
    $field.trigger('FormState.restoreField:after', [fieldState])

    // Trigger the field has changed
    $field.trigger('change')
  }

  /**
   * Get a snapshot of the form's current state.
   *
   * @returns {FormStateSnapshot}
   */
  getCurrentState () {
    /**
     * The saved state of a form and its related fields.
     *
     * @typedef {Object} FormStateSnapshot
     * @prop {Number} snapshot - The milliseconds representing the time the snapshot was taken.
     * @prop {String} targetId - The form's ID attribute value.
     * @prop {FieldStateSnapshot[]} fields - An array of the form's field snapshots.
     */
    let formState = {
      snapshot: Date.now(),
      targetId: this.$target.attr('id'),
      fields: []
    }

    // Process all the form fields to extract the data
    let $fields = this.getFields()
    $fields.each((index, elem) => {
      let fieldState = this.getField(elem)
      if (fieldState) {
        formState.fields.push(fieldState)
      }
    })

    return formState
  }

  /**
   * Get a previously saved snapshot of the form's state.
   *
   * @param {String} version
   * @returns {FormStateSnapshot}
   */
  getSavedState (version = '') {
    // Set a version in the name that will be stored
    if (version) {
      version = `:${version}`
    }

    // Check for the saved form state
    let targetId = this.$target.attr('id')
    let savedFormState = STORAGE.getItem(`FormState:${targetId}${version}`, this.settings.storageType)

    // If version set and formState is falsey, try without the version
    if (version && !savedFormState) {
      savedFormState = STORAGE.getItem(`FormState:${targetId}`, this.settings.storageType)
    }

    // Process the field values to ensure we have coerced types
    if (savedFormState && savedFormState.hasOwnProperty('fields') && savedFormState.fields.length) {
      savedFormState.fields.forEach((fieldState, index) => {
        savedFormState.fields[index].value = coerceToPrimitiveType(savedFormState.fields[index].value)
      })
    }

    return savedFormState
  }

  /**
   * Save form state.
   *
   * @param {String} [version] - Set a specific version to save to.
   */
  save (version = '') {
    // Ensure not saving while already saving
    if (this.status) {
      return
    }

    // Track the status of the saving process
    this.status = FORMSTATE_STATUS.PROCESSING

    // Set a version in the name that will be stored
    if (version) {
      version = `:${version}`
    }

    // Get and save the form state
    let formState = this.getCurrentState()
    STORAGE.setItem(`FormState:${formState.targetId}${version}`, formState, this.settings.storageType)

    // Turn off the status to allow other operations to work
    this.status = FORMSTATE_STATUS.IDLE
  }

  /**
   * Restore form state.
   *
   * @param {String} [version] - A specific version of the form's state to restore (only if it is available within the storage type).
   */
  restore (version = '') {
    // Ensure not restoring while already working
    if (this.status) {
      return
    }

    // Track the status of the restoring process
    this.status = FORMSTATE_STATUS.PROCESSING

    // Set a version in the name that will be stored
    let formState = this.getSavedState(version)

    // Silently fade out into the night...
    if (!formState) {
      this.status = FORMSTATE_STATUS.IDLE
      return
    }

    /**
     * Trigger a custom event before restoring the form's state.
     *
     * @trigger FormState.restore:before
     * @param {FormStateSnapshot} formState - The form's state to restore to.
     * @param {Object} options - Extra data used when restoring the state.
     * @param {FormState} options.FormState - The current FormState instance firing the event.
     * @param {String} options.version - The version of the form's state being restored.
     */
    this.$target.trigger('FormState.restore:before', [formState, {
      FormState: this,
      version
    }])

    // Restore the fields within the form
    if (formState && formState.hasOwnProperty('fields')) {
      formState.fields.forEach((fieldState) => this.restoreField(fieldState))
    }

    /**
     * Trigger a custom event after restoring the form's state.
     *
     * @trigger FormState.restore:after
     * @param {FormStateSnapshot} formState - The form's state to restore to.
     * @param {Object} options - Extra data used when restoring the state.
     * @param {FormState} options.FormState - The current FormState instance firing the event.
     * @param {String} options.version - The version of the form's state being restored.
     */
    this.$target.trigger('FormState.restore:after', [formState, {
      FormState: this,
      version
    }])

    // Turn off the status to allow other operations to work
    this.status = FORMSTATE_STATUS.IDLE
  }

  /**
   * Clear form state from storage.
   *
   * @param {String} [version] - A specific version of the form's state to clear.
   */
  clear (version = '') {
    // Ensure not clearing while something is happening
    if (this.status) {
      return
    }

    // Track the status of the process
    this.status = FORMSTATE_STATUS.PROCESSING

    // Set a version in the name that will be cleared
    if (version) {
      version = `:${version}`
    }

    // Check for the saved form state
    let targetId = this.$target.attr('id')
    storage.removeItem(`FormState:${targetId}${version}`, this.settings.storageType)

    /**
     * Trigger a custom event after clearing the form's state.
     *
     * @trigger FormState.clear:after
     * @param {Object} options - Extra data used when restoring the state.
     * @param {FormState} options.FormState - The current FormState instance firing the event.
     * @param {String} options.version - The version of the form's state being restored.
     */
    this.$target.trigger('FormState.clear:after', [{
      FormState: this,
      version
    }])

    // Turn off the status to allow other operations to work
    this.status = FORMSTATE_STATUS.IDLE
  }
}
