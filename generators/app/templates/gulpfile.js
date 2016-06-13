const gulp = require('gulp');
const webpack = require('webpack-stream');
const del = require('del');
const RevAll = require('gulp-rev-all');
const revReplace = require('gulp-rev-replace');
<% if (usePostCSS) { %>
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const precss = require('precss');
const lost = require('lost');
const cssnano = require('cssnano');
<% } %>
const config = require('./webpack.config');

const buildDir = './dist';

gulp.task('clean', () => del([
  `${buildDir}/**/*`,
]));
<% if (usePostCSS) { %>
gulp.task('postcss', ['clean'], () => {
  return gulp.src('src/**/*.css')
    .pipe(postcss([
      autoprefixer,
      precss,
      lost,
      cssnano,
    ]))
    .pipe(gulp.dest(buildDir));
});
<% } %>
gulp.task('webpack', ['clean'], () => {
  return gulp.src('./src/js/index.js')
  .pipe(webpack(config))
  .pipe(gulp.dest(buildDir));
});

gulp.task('asset', ['clean'], () => {
  return gulp.src(['./public/images/**/*', './public/css/**/*'], { base: 'public' })
  .pipe(gulp.dest(buildDir));
});

gulp.task('rev', [<% if (usePostCSS) {%>'postcss', <%}%>'asset', 'webpack'], () => {
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

gulp.task('build', ['clean', 'webpack', 'asset', 'rev', 'replace']);
