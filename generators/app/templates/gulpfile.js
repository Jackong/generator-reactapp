const gulp = require('gulp')
const hash = require('gulp-static-hash')
const uglify = require('gulp-uglify')
const webpack = require('webpack-stream')
const run = require('run-sequence')
const config = require('./webpack.config')

gulp.task('hash', () => {
    return gulp.src(['public/*.html'])
        .pipe(hash({asset: 'public/js'}))
        .pipe(gulp.dest('public'))
})

gulp.task('uglify', () => {
    return gulp.src(['public/js/**/*.js'])
        .pipe(uglify({
        compress: {
            global_defs: {
                DEBUG: false
            }
        }
    }))
    .pipe(gulp.dest('public/js'))
})

gulp.task('webpack', () => {
    return gulp.src('./public/js/index.jsx')
        .pipe(webpack(config))
        .pipe(gulp.dest('./public/js/'))
})

gulp.task('build', cb => {
    return run('webpack', 'uglify', 'hash', cb)
})

gulp.task('watch', ['webpack', 'hash'], () => {
     gulp.watch('./public/js/**/*.jsx', ['webpack', 'hash'])
})
