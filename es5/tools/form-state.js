'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LVL99 Form State
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Use local or session storage to save a form's state. This means if a user navigates away that their data can be
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * stored and they can choose to resume or reset the form's state.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * @package lvl99
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

exports.getFieldState = getFieldState;

var _lodash = require('lodash.merge');

var _lodash2 = _interopRequireDefault(_lodash);

var _common = require('../common');

var _parse = require('../utils/parse');

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Use the Storage tool to save the form's state
var storage = new _storage2.default();

/**
 * Get a field's current state.
 *
 * @param {String|HTMLElement|jQueryObject} targetField
 * @returns {undefined|Object}
 */
function getFieldState(targetField) {
  var $field = (0, _common.$)(targetField);
  var tagName = $field[0].tagName.toLowerCase();
  var id = $field.attr('id');
  var type = $field.attr('type');
  var name = $field.attr('name');
  var $relatedFields = $field.parents('form').find('[name="' + name + '"]');
  var nameIndex = $relatedFields.index($field);
  var value = $field.val();
  var fieldState = {
    snapshot: Date.now(),
    tagName: tagName,
    id: id,
    type: type,
    name: name,
    nameIndex: nameIndex,
    value: value

    // Extra transforms on the value depending on the type of field and its state
  };switch (type) {
    // If a checkbox is not checked, it's state value should be ''
    case 'checkbox':
      if (!$field.is(':checked')) {
        fieldState.value = '';
      }
      break;

    // Ignore checkboxes which haven't been checked
    case 'radio':
      if (!$field.is(':checked')) {
        return undefined;
      }
  }

  /**
   * Trigger a custom event on the field to allow other things to manipulate the field's returned state.
   *
   * @trigger FormState.getFieldState:after
   * @param {Object} fieldState The generated field's state
   * @param {Object} options Extra data used to generate the state
   */
  $field.trigger('FormState.getFieldState:after', [fieldState, {
    $field: $field,
    $relatedFields: $relatedFields
  }]);

  return fieldState;
}

/**
 * FormState class
 */

var FormState = function () {
  /**
   * Create the FormState instance.
   *
   * @param {String|HTMLElement|jQueryObject} target
   * @param {Object} options
   */
  function FormState(target, options) {
    var _this = this;

    _classCallCheck(this, FormState);

    this.settings = (0, _lodash2.default)({
      /**
       * The target form element.
       *
       * @type {String|HTMLElement|jQueryObject}
       */
      target: target,

      /**
       * The default storage type to use
       *
       * @type {String}
       */
      storageType: _storage.LOCAL_STORAGE,

      /**
       * Clear the form's state when submitted
       *
       * @type {Boolean}
       */
      clearOnSubmit: true,

      /**
       * Selector of fields to save state values of.
       *
       * Defaults to HTML elements `input`, `select` and `textarea` which have a name attribute set, and any element
       * that returns a `jQuery.fn.val()` result with the attribute `data-form-state-include`.
       *
       * @type {String}
       */
      includeFields: 'input[name], select[name], textarea[name], [data-form-state-include]',

      /**
       * Selector of fields to ignore values of when saving state.
       *
       * Defaults to ignoring input elements with type of button, submit, reset and image; any elements with the
       * attribute `data-form-state-ignore`; and any hidden input elements which have a name that starts with an
       * underscore (like WP nonce hidden inputs).
       *
       * Please note that password and file input elements will always be ignored.
       *
       * @type {String}
       */
      ignoreFields: 'input[type="submit"], input[type="reset"], input[type="button"], input[type="image"], input[type="hidden"][name^="_"], [data-form-state-ignore]'
    }, options);

    // Error if falsey target given
    if (!this.settings.target) {
      throw new Error('Invalid target form element given');
    }

    /**
     * The target element as a jQueryObject.
     *
     * @type {jQueryObject}
     */
    this.$target = (0, _common.$)(this.settings.target).first();

    // Error if no target element found in DOM
    if (!this.$target.length) {
      throw new Error('Target form element is not found');
    }

    // Error if invalid element or no ID set
    if (!this.$target.is('form') || !this.$target.attr('id')) {
      throw new Error('Target form element must be a form and have an ID set');
    }

    /**
     * The status of the FormState instance:
     *
     *  - 0: idle
     *  - 1: doing something
     *
     * @type {number}
     */
    this.status = 0;

    //
    // Attach event listeners to the target form
    //

    // Change = save
    this.$target.on('change', function () {
      _this.save();
    });

    // Reset = restore
    this.$target.on('reset', function () {
      _this.restore();
    });

    // Submit = clear (if settings are configured)
    this.$target.on('submit', function () {
      if (_this.settings.clearOnSubmit) {
        _this.clear();
      }
    });

    // After instantiation, restore the form state
    this.restore();
  }

  /**
   * Get the target's supported fields as a jQuery object.
   *
   * @returns {jQuery}
   */


  _createClass(FormState, [{
    key: 'getFields',
    value: function getFields() {
      return this.$target
      // Get only the included fields
      .find(this.settings.includeFields)
      // Remove any ignored fields
      .not(this.settings.ignoreFields)
      // Remove fields which are security issue or incompatible with local storage
      .not('[type="password"], [type="file"]');
    }

    /**
     * Get a field's current state.
     *
     * @param {String|HTMLElement|jQueryObject} targetField
     * @returns {undefined|Object}
     */

  }, {
    key: 'getField',
    value: function getField(targetField) {
      return getFieldState(targetField);
    }

    /**
     * Get a snapshot of the form's current state.
     *
     * @returns {Object}
     */

  }, {
    key: 'getCurrentState',
    value: function getCurrentState() {
      var _this2 = this;

      var formState = {
        snapshot: Date.now(),
        targetId: this.$target.attr('id'),
        fields: []

        // Process all the form fields to extract the data
      };var $fields = this.getFields();
      $fields.each(function (index, elem) {
        var fieldState = _this2.getField(elem);
        if (fieldState) {
          formState.fields.push(fieldState);
        }
      });

      return formState;
    }

    /**
     * Get a previously saved snapshot of the form's state.
     *
     * @param {String} version
     * @returns {Object}
     */

  }, {
    key: 'getSavedState',
    value: function getSavedState() {
      var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      // Set a version in the name that will be stored
      if (version) {
        version = ':' + version;
      }

      // Check for the saved form state
      var targetId = this.$target.attr('id');
      var savedFormState = storage.getItem('FormState:' + targetId + version);

      // If version set and formState is falsey, try without the version
      if (version && !savedFormState) {
        savedFormState = storage.getItem('FormState:' + targetId);
      }

      // Process the field values to ensure we have coerced types
      if (savedFormState && savedFormState.hasOwnProperty('fields') && savedFormState.fields.length) {
        savedFormState.fields.forEach(function (fieldState, index) {
          savedFormState.fields[index].value = (0, _parse.coerceToPrimitiveType)(savedFormState.fields[index].value);
        });
      }

      return savedFormState;
    }

    /**
     * Save form state.
     *
     * @param {String} version Set a specific version value to save under
     */

  }, {
    key: 'save',
    value: function save() {
      var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      // Ensure not saving while already saving
      if (this.status) {
        return;
      }

      // Track the status of the saving process
      this.status = 1;

      // Set a version in the name that will be stored
      if (version) {
        version = ':' + version;
      }

      // Get the form state
      var formState = this.getCurrentState();

      storage.setItem('FormState:' + formState.targetId + version, formState, this.settings.storageType);

      // Turn off the status to allow other operations to work
      this.status = 0;
    }

    /**
     * Restore form state.
     *
     * @param {String} version A specific version of the form's state to restore (only if it is available within the storage type)
     */

  }, {
    key: 'restore',
    value: function restore() {
      var _this3 = this;

      var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      // Ensure not restoring while already working
      if (this.status) {
        return;
      }

      // Track the status of the restoring process
      this.status = 1;

      // Set a version in the name that will be stored
      var formState = this.getSavedState(version);

      // Silently fade out into the night...
      if (!formState) {
        this.status = 0;
        return;
      }

      /**
       * Trigger a custom event before restoring the form's state
       *
       * @trigger FormState.restore:before
       * @param {Object} formState The form's state
       * @param {Object} options Extra data used when restoring the state
       */
      this.$target.trigger('FormState.restore:before', [formState, {
        FormState: this,
        version: version
      }]);

      // Restore the fields within the form
      if (formState && formState.hasOwnProperty('fields')) {
        formState.fields.forEach(function (fieldState) {
          return _this3.restoreField(fieldState);
        });
      }

      /**
       * Trigger a custom event after restoring the form's state
       *
       * @trigger FormState.restore:after
       * @param {Object} formState The form's state
       * @param {Object} options Extra data used when restoring the state
       */
      this.$target.trigger('FormState.restore:after', [formState, {
        FormState: this,
        version: version
      }]);

      // Turn off the status to allow other operations to work
      this.status = 0;
    }

    /**
     * Restore a single field's state.
     *
     * @param {Object} fieldState
     */

  }, {
    key: 'restoreField',
    value: function restoreField(fieldState) {
      var $field = void 0;

      // Prioritise getting by ID
      if (fieldState.id) {
        $field = this.$target.find('[id="' + fieldState.id + '"]');
      } else {
        // Add in the type check if the tagName is input
        if (fieldState.tagName === 'input') {
          $field = this.$target.find(fieldState.tagName + '[type="' + fieldState.type + '"][name="' + fieldState.name + '"]');

          // Otherwise do what ya gotta do
        } else {
          $field = this.$target.find(fieldState.tagName + '[name="' + fieldState.name + '"]');
        }

        // Ensure only doing it for one field
        if ($field.length > 1) {
          $field = $field.filter(':eq(' + (fieldState.nameIndex || 0) + ')');
        }
      }

      // Warn if can't find the field
      if (!$field.length) {
        console.warn('[LVL99 FormState] Field was not found in DOM to restore');
      }

      /**
       * Trigger a custom event before restoring the field's state
       *
       * @trigger FormState.restoreField:before
       * @param {Object} fieldState
       */
      $field.trigger('FormState.restoreField:before', [fieldState]);

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
                $field.prop('checked', true);
              } else {
                $field.prop('checked', false);
              }
              break;

            // This should work for most of them
            default:
              $field.val(fieldState.value);
              break;
          }
          break;

        // Textarea fields
        case 'textarea':
          $field.val(fieldState.value);
          break;

        // Select fields
        case 'select':
          $field.find('option').each(function (index, option) {
            var $option = (0, _common.$)(option);

            // Yes linter, I do want to use ==
            if ($option.val() == fieldState.value) {
              $option.prop('selected', true);
            } else {
              $option.prop('selected', false);
            }
          });
          break;
      }

      /**
       * Trigger a custom event after restoring the field's state
       *
       * @trigger FormState.restoreField:after
       * @param {Object} fieldState
       */
      $field.trigger('FormState.restoreField:after', [fieldState]);

      // Trigger the field has changed
      $field.trigger('change');
    }

    /**
     * Clear form state from storage.
     *
     * @param {String} version A specific version of the form's state to clear
     */

  }, {
    key: 'clear',
    value: function clear() {
      var version = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

      // Ensure not clearing while something is happening
      if (this.status) {
        return;
      }

      // Track the status of the process
      this.status = 1;

      // Set a version in the name that will be cleared
      if (version) {
        version = ':' + version;
      }

      // Check for the saved form state
      var targetId = this.$target.attr('id');
      storage.removeItem('FormState:' + targetId + version);

      /**
       * Trigger a custom event after clearing the form's state
       *
       * @trigger FormState.clear:after
       * @param {Object} formState The form's state
       * @param {Object} options Extra data used when clearing the state
       */
      this.$target.trigger('FormState.clear:after', [formState, {
        FormState: this,
        version: version
      }]);

      // Turn off the status to allow other operations to work
      this.status = 0;
    }
  }]);

  return FormState;
}();

exports.default = FormState;