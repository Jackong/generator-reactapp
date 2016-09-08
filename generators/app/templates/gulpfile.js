const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
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

gulp.task('assets', ['webpack'], () => {
  return gulp.src(['./src/assets/**/*'], { base: 'src' })
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
gulp.task('build', ['clean', 'lint', 'webpack']);
