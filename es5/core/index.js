'use strict';

/**
 * LVL99 Core
 *
 * Core classes used throughout the framework
 *
 * @package lvl99
 */

var Entity = require('./entity');
var App = require('./app');
var Component = require('./component');

var core = {
  Entity: Entity,
  App: App,
  Component: Component
};

module.exports = core;