/**
 * LVL99
 *
 * The whole framework in one discrete package
 *
 * @package lvl99
 */

const common = require('./common')
const utils = require('./utils')
const core = require('./core')
const tools = require('./tools')

const lvl99 = {
  common,
  core,
  utils,
  tools
}

module.exports = lvl99
