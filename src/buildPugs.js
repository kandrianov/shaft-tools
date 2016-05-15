import log from './helpers/logger';

import {src, dest} from 'vinyl-fs';
import plumber from 'gulp-plumber';
import cached from 'gulp-cached';
import gulpIf from 'gulp-if';
import inheritance from 'gulp-pug-inheritance';
import filter from 'gulp-filter';
import pug from 'gulp-pug';
import prettify from 'gulp-jsbeautifier';
import rename from 'gulp-rename';
import getData from 'jade-get-data';
import through from 'through2';

const {NODE_ENV} = process.env;
const TMPLS = 'templates';
const PRETTIFY = true;

/**
 * Compile pug templates
 *
 * @param      {Function}  done   resolve fn
 */
export default function compile(done) {
  const data = {
    getData: getData(`${TMPLS}/data`),
    timestamp: Date.now(),
    development: NODE_ENV !== 'production',
    production: NODE_ENV === 'production'
  };

  src(`${TMPLS}/pages/*.pug`)
    .pipe(plumber(err => log.error(err)))

    .pipe(through.obj(function(file, enc, cb) {
      log.info(`Pug process: ${file.relative}`);
      this.push(file);
      cb();
    }))

    .pipe(cached('pug'))

    .pipe(gulpIf(global.watch, inheritance({basedir: TMPLS})))

    .pipe(filter(file => {
      const exp = new RegExp(`${TMPLS}[\\\/]pages`);
      return exp.test(file.path);
    }))

    .pipe(pug({basedir: TMPLS, data}))

    .pipe(gulpIf(PRETTIFY !== false, prettify({
      braceStyle: 'expand',
      indentWithTabs: true,
      indentInnerHtml: true,
      preserveNewlines: true,
      endWithNewline: true,
      wrapLineLength: 120,
      maxPreserveNewlines: 50,
      wrapAttributesIndentSize: 1,
      unformatted: ['use', 'code']
    })))
    .pipe(rename({dirname: '.'}))
    .pipe(dest('dist'))
    .on('end', () => done());
}
