const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp'); 
const avif = require('gulp-avif');


function css( done )  {
    src('src/scss/app.scss')
        .pipe( sass({ outputStyle: 'compressed' }) )
        .pipe(postcss([ autoprefixer() ]))
        .pipe( dest('build/css') )

    done();
}

function imagenes( done ) {
    src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3 }) )
        .pipe( dest('build/img') )

    done();
}

function versionWebp() {

    const opciones = {
        quality: 50
    }

    return src('src/img/**/*.{jpg,png}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
}

function versionAvif() {

    const opciones = {
        quality: 50
    }

    return src('src/img/**/*.{jpg,png}')
        .pipe( avif( opciones ) )
        .pipe( dest('build/img') )
}

function dev( ) {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', imagenes);
}

exports.css = css; 
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev );