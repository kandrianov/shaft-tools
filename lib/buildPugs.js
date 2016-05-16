'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = compile;

var _logger = require('./helpers/logger');

var _logger2 = _interopRequireDefault(_logger);

var _vinylFs = require('vinyl-fs');

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpCached = require('gulp-cached');

var _gulpCached2 = _interopRequireDefault(_gulpCached);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpPugInheritance = require('gulp-pug-inheritance');

var _gulpPugInheritance2 = _interopRequireDefault(_gulpPugInheritance);

var _gulpFilter = require('gulp-filter');

var _gulpFilter2 = _interopRequireDefault(_gulpFilter);

var _gulpPug = require('gulp-pug');

var _gulpPug2 = _interopRequireDefault(_gulpPug);

var _gulpJsbeautifier = require('gulp-jsbeautifier');

var _gulpJsbeautifier2 = _interopRequireDefault(_gulpJsbeautifier);

var _gulpRename = require('gulp-rename');

var _gulpRename2 = _interopRequireDefault(_gulpRename);

var _jadeGetData = require('jade-get-data');

var _jadeGetData2 = _interopRequireDefault(_jadeGetData);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { NODE_ENV } = process.env;
const TMPLS = `${ process.cwd() }/templates`;
const PRETTIFY = true;

/**
 * Compile pug templates
 *
 * @param      {Function}  done   resolve fn
 */
function compile(done) {
  const data = {
    getData: (0, _jadeGetData2.default)(`${ TMPLS }/data`),
    timestamp: Date.now(),
    development: NODE_ENV !== 'production',
    production: NODE_ENV === 'production'
  };

  (0, _vinylFs.src)(`${ TMPLS }/pages/*.pug`).pipe((0, _gulpPlumber2.default)(err => _logger2.default.error(err))).pipe(_through2.default.obj(function (file, enc, cb) {
    _logger2.default.info(`Pug process: ${ file.relative }`);
    this.push(file);
    cb();
  })).pipe((0, _gulpCached2.default)('pug')).pipe((0, _gulpIf2.default)(global.watch, (0, _gulpPugInheritance2.default)({ basedir: TMPLS }))).pipe((0, _gulpFilter2.default)(file => {
    const exp = new RegExp(`${ TMPLS }[\\\/]pages`);
    return exp.test(file.path);
  })).pipe((0, _gulpPug2.default)({ basedir: TMPLS, data })).pipe((0, _gulpIf2.default)(PRETTIFY !== false, (0, _gulpJsbeautifier2.default)({
    braceStyle: 'expand',
    indentWithTabs: true,
    indentInnerHtml: true,
    preserveNewlines: true,
    endWithNewline: true,
    wrapLineLength: 120,
    maxPreserveNewlines: 50,
    wrapAttributesIndentSize: 1,
    unformatted: ['use', 'code']
  }))).pipe((0, _gulpRename2.default)({ dirname: '.' })).pipe((0, _vinylFs.dest)('dist')).on('end', () => done());
}