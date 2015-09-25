'use strict';

var deepExtend = require('deep-extend');
var path = require('path');

var NODE_ENV = process.env.NODE_ENV;
var ROOT_PATH = path.resolve(__dirname, '..');

var PUBLIC_DIRNAME = 'public';
var STATIC_DIRNAME = 'static';
var BUILD_DIRNAME = 'static/build';



var config = {
    env: {
        isProduction: false,
        isDevelopment: false
    },
    publicPaths: {
        static: '/' + STATIC_DIRNAME + '/',
        build: '/' + BUILD_DIRNAME + '/'
    },
    paths: {
        root: ROOT_PATH,
        app: path.resolve(ROOT_PATH, 'app'),
        public: path.resolve(ROOT_PATH, PUBLIC_DIRNAME),
        static: path.resolve(ROOT_PATH, PUBLIC_DIRNAME, STATIC_DIRNAME),
        build: path.resolve(ROOT_PATH, PUBLIC_DIRNAME, BUILD_DIRNAME),
        views: path.resolve(ROOT_PATH, 'views')
    },
    server: {
        publicFiles: [
            'robots.txt',
            'favicon.ico'
        ],
        // rootUrl is overridden at bottom of file using data
        // in config.server (example format: http://example.com/)
        rootUrl: null
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


if (NODE_ENV === 'development') {
    deepExtend(config, {
        env: {
            isDevelopment: true
        },
        server: {
            host: 'localhost',
            port: 3000,
            protocol: 'http'
        },
        webpack: {
            port: 3001
        }
    });

} else if (NODE_ENV === 'production') {
    deepExtend(config, {
        env: {
            isProduction: true
        },
        server: {
            host: 'localhost',
            port: 2000,
            protocol: 'http'
        }
    });

} else {
    throw new Error('ERROR: NODE_ENV is not specified: ' + NODE_ENV);
}


config.server.rootUrl = [
    config.server.protocol,
    '://',
    config.server.host,
    ':',
    config.server.port
].join();


Object.freeze(config); // On a separate line because IntelliJ's JS code assistance is not very smart :(


module.exports = config;
