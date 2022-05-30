const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('src/js/app.js', 'dist/js');
mix.sass('src/scss/app.scss', 'dist/css')
    .options({
        processCssUrls: false
    });;
mix.copy( 'src/images', 'dist/images', false);

// mix.browserSync();