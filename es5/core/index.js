'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _entity = require('./entity');

var _entity2 = _interopRequireDefault(_entity);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

var _component = require('./component');

var _component2 = _interopRequireDefault(_component);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var core = {
  Entity: _entity2.default,
  App: _app2.default,
  Component: _component2.default
}; /**
    * LVL99 Core
    *
    * Core classes used throughout the framework
    *
    * @package lvl99
    */

exports.default = core;