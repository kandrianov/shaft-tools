'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = patch;
exports.minor = minor;
exports.major = major;

var _vinylFs = require('vinyl-fs');

var _gulpBump = require('gulp-bump');

var _gulpBump2 = _interopRequireDefault(_gulpBump);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const input = 'package.json';
const output = (0, _vinylFs.dest)('./');

/**
 * Patch update
 *
 * @param      {Function}  done    resolve cb
 */
function patch(done) {
  (0, _vinylFs.src)(input).pipe((0, _gulpBump2.default)()).pipe(output).on('finish', () => done());
}

/**
 * Minor update
 *
 * @param      {Function}  done    resolve cb
 */
function minor(done) {
  (0, _vinylFs.src)(input).pipe((0, _gulpBump2.default)({ type: 'minor' })).pipe(output).on('finish', () => done());
}

/**
 * Major update
 *
 * @param      {Function}  done    resolve cb
 */
function major(done) {
  (0, _vinylFs.src)(input).pipe((0, _gulpBump2.default)({ type: 'major' })).pipe(output).on('finish', () => done());
}