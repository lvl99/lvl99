'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _accordion = require('./accordion');

var _accordion2 = _interopRequireDefault(_accordion);

var _modal = require('./modal');

var _modal2 = _interopRequireDefault(_modal);

var _spinner = require('./spinner');

var _spinner2 = _interopRequireDefault(_spinner);

var _toggleable = require('./toggleable');

var _toggleable2 = _interopRequireDefault(_toggleable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * LVL99 Components
 *
 * @package lvl99
 */

var components = {
  Accordion: _accordion2.default,
  Modal: _modal2.default,
  Spinner: _spinner2.default,
  Toggleable: _toggleable2.default
};

exports.default = components;