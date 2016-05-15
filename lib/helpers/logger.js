'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const parent = module.parent;
const filepath = parent.id === '.' ? parent.filename : parent.id;
const name = _path2.default.parse(filepath).name;

const log = _bunyan2.default.createLogger({ name });

exports.default = log;

delete require.cache[__filename];