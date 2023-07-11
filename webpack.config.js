let Encore = require('@symfony/webpack-encore');

const PurgeCssPlugin = require('purgecss-webpack-plugin'),
      glob = require('glob-all'),
      path = require('path');

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')

    // public path used by the web server to access the output path
    .setPublicPath('/build')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if you JavaScript imports CSS.
     */
    .addEntry('patient-portal-vue', './public/assets/js/patient-portal-vue.js')
    .addEntry('patient-portal-symphony', './webpack/configs/patient-portal/patient-portal-symphony.js')

    /*
     * Feature Configuration
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())

    // Enables hashed filenames (e.g. app.abc123.css)
    // .enableVersioning(Encore.isProduction())

    // Enables Sass/SCSS support
    .enableSassLoader(function(options) {
        // https://github.com/sass/node-sass#outputstyle
        options.outputStyle = 'compressed';     // compress the output.
        // https://github.com/sass/node-sass#sourcemap
        options.sourceMap = false;              // turn off sourcemaps.
        // https://github.com/sass/node-sass#omitsourcemapurl
        options.omitSourceMapUrl = true;        // remove sourcemaps url at EOF.
    }, {
        // set optional Encore-specific options
        // resolveUrlLoader: true
    })
    .enableVueLoader()

    // Enable webpack plugin(s)
    .addPlugin(new PurgeCssPlugin({
        paths: glob.sync([
            path.join(__dirname, 'templates/**/*.html.twig'),
            path.join(__dirname, 'assets/js/*.js')
        ], {
            nodir: true
        }),
        // Extract something for a singular or series of documents.
        extractors: [{
            // Generate an extractor function called class
            extractor: class {
                // ... that will pass the file(s) as a string to the function
                static extract(content) {
                    // ... which will return a match for all alphanumeric characters
                    return content.match(/[A-z0-9-:\/]+/g) || [];
                }
            },
            // The above function should only apply to .twig files
            extensions: [
                'twig'
            ]
        }]
    }))

    // Allow usage of shorthand path references.
    .addAliases({
        '~public':       path.resolve(__dirname, 'public'),
        '~webpack':      path.resolve(__dirname, 'webpack'),
        '~node_modules': path.resolve(__dirname, 'node_modules'),
        '~bootstrap4' :  path.resolve(__dirname, 'node_modules/bootstrap')
    })
;

Encore.configureFilenames({
    fonts: 'fonts/[name].[ext]'
});

module.exports = Encore.getWebpackConfig();
