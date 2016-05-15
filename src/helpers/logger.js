import bunyan from 'bunyan';
import path from 'path';

const parent = module.parent;
const filepath = parent.id === '.' ? parent.filename : parent.id;
const name = path.parse(filepath).name;

const log = bunyan.createLogger({name});

export default log;
delete require.cache[__filename];
