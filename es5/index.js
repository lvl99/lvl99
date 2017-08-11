'use strict';

/**
 * LVL99
 *
 * The whole framework in one discrete package
 *
 * @package lvl99
 */

var common = require('./common');
var utils = require('./utils');
var core = require('./core');
var tools = require('./tools');

var lvl99 = {
  common: common,
  core: core,
  utils: utils,
  tools: tools
};

module.exports = lvl99;