import log from './helpers/logger';

if (process.argv.length > 2) {
  // node6: Reflect.deleteProperty(require.cache, '__filename');
  delete require.cache[__filename];

  const fn = process.argv[2].split('.')[1] || 'default';
  const module = require(`./${process.argv[2].split('.')[0]}`)[fn];
  const task = typeof module.default === 'undefined' ? module : module.default;

  const start = new Date();
  log.info(`Starting '${task.name}'...`);

  new Promise((resolve, reject) => {
    task(resolve, reject);
  })
    .then(() => {
      const end = new Date();
      const time = end.getTime() - start.getTime();
      log.info(`Finished '${task.name}' after ${time} ms`);
    })
    .catch(err => log.warn(err.stack));
}
