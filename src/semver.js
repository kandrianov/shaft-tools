import {src, dest} from 'vinyl-fs';
import bump from 'gulp-bump';

const input = 'package.json';
const output = dest('./');

/**
 * Patch update
 *
 * @param      {Function}  done    resolve cb
 */
export function patch(done) {
  src(input)
    .pipe(bump())
    .pipe(output)
    .on('end', () => done());
}

/**
 * Minor update
 *
 * @param      {Function}  done    resolve cb
 */
export function minor(done) {
  src(input)
    .pipe(bump({type: 'minor'}))
    .pipe(output)
    .on('end', () => done());
}

/**
 * Major update
 *
 * @param      {Function}  done    resolve cb
 */
export function major(done) {
  src(input)
    .pipe(bump({type: 'major'}))
    .pipe(output)
    .on('end', () => done());
}
