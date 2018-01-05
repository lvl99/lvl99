'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _common = require('./common');

var _common2 = _interopRequireDefault(_common);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

var _core = require('./core');

var _core2 = _interopRequireDefault(_core);

var _tools = require('./tools');

var _tools2 = _interopRequireDefault(_tools);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * LVL99
 *
 * The whole framework in one discrete package
 *
 * @package lvl99
 */

var lvl99 = {
  common: _common2.default,
  core: _core2.default,
  utils: _utils2.default,
  tools: _tools2.default
};

exports.default = lvl99;