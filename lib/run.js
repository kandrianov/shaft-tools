'use strict';

var _logger = require('./helpers/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (process.argv.length > 2) {
  // node6: Reflect.deleteProperty(require.cache, '__filename');
  delete require.cache[__filename];

  const fn = process.argv[2].split('.')[1] || 'default';
  const module = require(`./${ process.argv[2].split('.')[0] }`)[fn];
  const task = typeof module.default === 'undefined' ? module : module.default;

  const start = new Date();
  _logger2.default.info(`Starting '${ task.name }'...`);

  new Promise((resolve, reject) => {
    task(resolve, reject);
  }).then(() => {
    const end = new Date();
    const time = end.getTime() - start.getTime();
    _logger2.default.info(`Finished '${ task.name }' after ${ time } ms`);
  }).catch(err => _logger2.default.warn(err.stack));
}