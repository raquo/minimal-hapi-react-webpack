'use strict';

var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge'); // concatenates arrays for the same key instead of replacing the first array
var AssetsWebpackPlugin = require('assets-webpack-plugin');
//var SlowWebpackPlugin = require('../tools/slow-webpack-plugin');
var config = require('./variables');



var APP_ENTRY = path.resolve(config.paths.source, 'main-app');
var WEBPACK_HOT_ENTRY = 'webpack-hot-middleware/client';
var JS_JSX = /\.(js|jsx)$/;
var BABEL = 'babel?stage=1'; // Transpile ES6/JSX into ES5. For stages see: http://babeljs.io/docs/usage/experimental/



var webpackConfig = {
    entry: {
        app: [APP_ENTRY, WEBPACK_HOT_ENTRY]
    },
    resolve: {
        // Webpack tries appending these extensions when you require(moduleName)
        // The empty extension allows specifying the extension in a require call, e.g. require('./main-app.css')
        extensions: ['', '.js', '.jsx']
    },
    output: {
        publicPath: config.publicPaths.build, // Expose bundles in this web directory (Note: only dev server uses this option)
        filename: config.webpack.outputFilename, // Bundle filename pattern
        path: config.paths.build  // Put bundle files in this directory (Note: dev server does not generate bundle files)
    },
    devtool: 'cheap-module-eval-source-map', // Generate source maps (more or less efficiently)
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'], // Loaders are processed last-to-first
                include: config.paths.source
            }
        ]
    },
    plugins: [
        //new SlowWebpackPlugin({delay: 2000}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new AssetsWebpackPlugin({
            filename: config.webpack.assetsFilename,
            path: config.webpack.assetsPath
        })
    ]
};



if (process.env.NODE_ENV === 'development') {

    webpackConfig = webpackMerge(webpackConfig, {
        entry: {
            app: [APP_ENTRY, WEBPACK_HOT_ENTRY],
            sandbox: [path.resolve(config.paths.source, 'main-sandbox'), WEBPACK_HOT_ENTRY]
        },
        module: {
            preLoaders: [
                {
                    test: JS_JSX,
                    loader: 'eslint-loader', // Lint all JS files before compiling the bundles (see .eslintrc for rules)
                    include: config.paths.source
                }
            ],
            loaders: [
                {
                    test: JS_JSX,
                    loaders: ['react-hot', BABEL], // Enable hot module replacement for react components (as opposed to full page reloads)
                    include: config.paths.source
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(), // Enables HMR. Adds webpack/hot/dev-server entry point if hot=true
            new webpack.NoErrorsPlugin() // @TODO do we really want / need this? On dev or on production too?
        ],
        eslint: {
            //failOnWarning: true,
            failOnError: true
        }
    });

} else if (process.env.NODE_ENV === 'production') {

    /** @lends webpackConfig */
    webpackConfig = webpackMerge(webpackConfig, {
        devtool: 'source-map', // generate full source maps
        module: {
            loaders: [
                {
                    test: JS_JSX,
                    loader: BABEL,
                    include: config.paths.source
                }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compressor: {
                    warnings: false // Don't complain about things like removing unreachable code
                }
            })
        ]
    });
}


module.exports = webpackConfig;
