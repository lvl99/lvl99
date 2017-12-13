'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _inheritance = require('./inheritance');

var _inheritance2 = _interopRequireDefault(_inheritance);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import super from './super'

/**
 * LVL99 Utils
 *
 * Utilities used throughout the framework
 *
 * @package lvl99
 */

var utils = {
  parse: _parse2.default,
  inheritance: _inheritance2.default
};

exports.default = utils;