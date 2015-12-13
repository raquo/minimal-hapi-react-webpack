'use strict';

var path = require('path');
var chalk = require('chalk');

// This and anything in config.paths must be absolute.
var ROOT_PATH = path.resolve(__dirname, '../..');

var SOURCE_DIRNAME = 'src';
var WEB_ROOT_DIRNAME = 'public';
var ASSETS_DIRNAME = 'static';
var BUILD_DIRNAME = 'static/build';

var SERVER_HOST;
var SERVER_PORT;
var SERVER_PROTOCOL = 'http'; // Note: I did not test https yet, so you might need more adjustments to make it work
var WEBPACK_DEV_SERVER_PORT = 3001;

if (process.env.NODE_ENV === 'development') {
    SERVER_HOST = '0.0.0.0';
    SERVER_PORT = 3000;

} else if (process.env.NODE_ENV === 'production') {
    SERVER_HOST = 'localhost';
    SERVER_PORT = 2000;

} else {
    var errorText = '[' + path.basename(__filename) + '] ERROR: NODE_ENV is not set: ' + process.env.NODE_ENV;
    console.log(chalk.red(errorText));
    throw new Error(errorText);
}

var config = {
    publicPaths: {
        assets: '/' + ASSETS_DIRNAME + '/',
        build: '/' + BUILD_DIRNAME + '/'
    },
    paths: {
        root: ROOT_PATH,
        webRoot: path.join(ROOT_PATH, WEB_ROOT_DIRNAME),
        assets: path.join(ROOT_PATH, WEB_ROOT_DIRNAME, ASSETS_DIRNAME),
        build: path.join(ROOT_PATH, WEB_ROOT_DIRNAME, BUILD_DIRNAME), // Do not keep any non-generated files here.
        source: path.join(ROOT_PATH, SOURCE_DIRNAME),
        components: path.join(ROOT_PATH, SOURCE_DIRNAME, 'components'),
        serverViews: path.join(ROOT_PATH, SOURCE_DIRNAME, 'server-views')
    },
    server: {
        publicFiles: [
            'robots.txt',
            'favicon.ico'
        ],
        host: SERVER_HOST,
        port: SERVER_PORT,
        protocol: SERVER_PROTOCOL,
        rootUrl: SERVER_PROTOCOL + '://' + SERVER_HOST + ':' + SERVER_PORT
    },
    webpack: {
        // Webpack bundle filename
        outputFilename: '[name]-bundle-[hash].js',
        // Assets-webpack-plugin generates a JSON file containing actual
        // webpack bundle filenames on every webpack emit event.
        // To get the actual bundle filenames, use config/webpack-assets.js
        assetsFilename: 'webpack-assets.json',
        assetsPath: ROOT_PATH
    },
    vision: {
        viewsPath: 'views'
    }
};


if (process.env.NODE_ENV === 'development') {
    Object.assign(config.webpack, {
        port: WEBPACK_DEV_SERVER_PORT,
        devServerUrl: SERVER_PROTOCOL + '://' + SERVER_HOST + ':' + WEBPACK_DEV_SERVER_PORT
    });
}


Object.freeze(config); // On a separate line because IntelliJ's JS code assistance is not very smart :(


module.exports = config;
