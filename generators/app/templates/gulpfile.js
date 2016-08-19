const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
const RevAll = require('gulp-rev-all');
const revReplace = require('gulp-rev-replace');
const config = require('./webpack.config');
const stylelint = require('gulp-stylelint');
const eslint = require('gulp-eslint');

const buildDir = './dist';

gulp.task('clean', () => del([
  `${buildDir}/**/*`,
]));

gulp.task('webpack', ['clean', 'lint'], () => {
  return gulp.src('./src/index.js')
  .pipe(webpack(config))
  .pipe(gulp.dest(buildDir));
});

gulp.task('asset', ['clean', 'lint'], () => {
  return gulp.src(['./src/images/**/*'], { base: 'src' })
  .pipe(gulp.dest(buildDir));
});

gulp.task('rev', ['asset', 'webpack'], () => {
  const revAll = new RevAll({
    dontRenameFile: ['index.html'],
    dontSearchFile: [/vendor\.js/],
  });
  return gulp.src([`${buildDir}/**`])
  .pipe(revAll.revision())
  .pipe(gulp.dest(buildDir))
  .pipe(revAll.manifestFile())
  .pipe(gulp.dest(buildDir));
});

gulp.task('replace', ['rev'], () => {
  return gulp.src(`${buildDir}/**`)
   .pipe(revReplace({ manifest: gulp.src(`${buildDir}/rev-manifest.json`) }))
   .pipe(gulp.dest(buildDir));
});

gulp.task('eslint', () => {
  return gulp.src('src/**/*.js')
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('stylelint', () => {
  return gulp.src('src/**/*.css')
  .pipe(stylelint({
    failAfterError: true,
    reporters: [
      {
        formatter: 'string',
        console: true,
      },
    ],
  }));
});

gulp.task('lint', ['stylelint', 'eslint']);
gulp.task('dev', ['clean', 'lint', 'webpack', 'asset']);
gulp.task('prod', ['clean', 'lint', 'webpack', 'asset', 'rev', 'replace']);
