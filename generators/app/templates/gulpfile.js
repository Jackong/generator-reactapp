const gulp = require('gulp')
const webpack = require('webpack-stream')
const del = require('del')

const config = require('./webpack.config')

const buildDir = './public/build'

gulp.task('clean', () => del([
  `${buildDir}/**/*`
]))

gulp.task('webpack', ['clean'], () => {
    return gulp.src('./public/js/index.jsx')
        .pipe(webpack(config))
        .pipe(gulp.dest(buildDir))
})

gulp.task('asset', ['clean'], () => {
  return gulp.src(['./public/images/**/*', {base: 'public'}])
  .pipe(gulp.dest('./public/build/'))
})

gulp.task('build', ['webpack', 'asset'])
