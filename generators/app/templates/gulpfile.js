const gulp = require('gulp')
const rev = require('gulp-rev')
const replace = require('gulp-rev-replace')
const uglify = require('gulp-uglify')
const webpack = require('webpack-stream')
const run = require('run-sequence')
const config = require('./webpack.config')

const options = {
    dist: 'public/dist'
}

gulp.task('rev', () => {
    return gulp.src(['public/js/**/*.js'], {base: 'public'})
    .pipe(rev())
    .pipe(gulp.dest(options.dist))
    .pipe(rev.manifest())
    .pipe(gulp.dest(options.dist))
})

gulp.task('replace', ['rev'], () => {
    const manifest = gulp.src(options.dist + '/rev-manifest.json')
    return gulp.src('public/index.html')
        .pipe(replace({manifest: manifest}))
        .pipe(gulp.dest(options.dist))
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
    return run('webpack', 'uglify', 'replace', cb)
})

gulp.task('watch', ['webpack'], () => {
     gulp.watch('./public/js/**/*.jsx', ['webpack'])
})
