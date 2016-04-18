const gulp = require('gulp')
const webpack = require('webpack-stream')
const run = require('run-sequence')
const config = require('./webpack.config')

gulp.task('webpack', () => {
    return gulp.src('./public/js/index.jsx')
        .pipe(webpack(config))
        .pipe(gulp.dest('./public/build/'))
})

gulp.task('watch', ['webpack'], () => {
     gulp.watch('./public/js/**/*.jsx', ['webpack'])
})
