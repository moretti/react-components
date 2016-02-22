import gulp from 'gulp';
import fs from 'fs';
import path from 'path';
import rename from 'gulp-rename';
import svgmin from 'gulp-svgmin';
import tap from 'gulp-tap';
import through2 from 'through2';
import File from 'vinyl';
import template from 'lodash/string/template';
import { removeFill, removeStyle } from '../utils/svgoPlugins';

const iconTemplate = template(fs.readFileSync('gulp/utils/icon.template', 'utf8'));
const iconIndexTemplate = template(fs.readFileSync('gulp/utils/iconIndex.template', 'utf8'));

// Generate react components from SVGs
gulp.task('icon', ['clean:icons'], () => {
  return gulp.src('icons/assets/*.svg')
    .pipe(svgmin({
      plugins: [
        { removeHiddenElems: false },
        { removeFill },
        { removeStyle },
      ],
    }))
    .pipe(tap((file, t) => {
      file.contents = new Buffer(iconTemplate({
        name: getFileNameWithoutExtension(file.path),
        svg: file.contents.toString(),
      }));
    }))
    .pipe(rename({extname: '.js'}))
    .pipe(gulp.dest('icons/components'))
    .pipe(iconIndex())
    .pipe(gulp.dest('icons'));
});

function getFileNameWithoutExtension(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

function iconIndex() {
  const iconNames = [];
  return through2.obj(
    function(file, enc, cb) {
      const name = getFileNameWithoutExtension(file.path);
      iconNames.push(name);
      cb();
    }, function(cb) {
    const file = new File({
      path: 'index.js',
      contents: new Buffer(iconIndexTemplate({names: iconNames})),
    });
    this.push(file);
    cb();
  }
  );
}
