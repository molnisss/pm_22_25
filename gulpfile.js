const { src, dest, parallel, watch } = require('gulp');
const concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass')(require('sass')),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer');
    imagemin = require('gulp-imagemin');

function html () {
    return src('src / *. html')
        .pipe(dest('dist'))
}

function sass_task() {
    return src('src / sass / *. sass')
        .pipe(concat('styles.sass'))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest("dist / css"));
}

function scripts () {
    return src("src / js / *. js") 
        .pipe(concat('scripts.js'))         
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(dest("dist / js"));
}

function imgs () {
    return src("src / images /*.+ (jpg | jpeg | png | gif)")
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(dest("dist / images"))
}

function watch_task () {
    watch(["src/*.html"], html)
    watch(["src/js/*.js"], scripts)
    watch(["src/sass/*.sass"], sass)
    watch(["src/images/*.+(jpg | jpeg | png | gif)"], imgs)
}

exports.default = parallel(html, sass_task, scripts, imgs, watch_task)