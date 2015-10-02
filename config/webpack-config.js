'use strict';

var config = require('./variables');
var path = require('path');
var webpack = require('webpack');
var webpackMerge = require('webpack-merge'); // concatenates arrays for the same key instead of replacing the first array
var AssetsWebpackPlugin = require('assets-webpack-plugin');
//var SlowWebpackPlugin = require('../tools/slow-webpack-plugin');



var JS_JSX = /\.(js|jsx)$/;
var BABEL = 'babel?stage=1'; // Transpile ES6/JSX into ES5. For stages see: http://babeljs.io/docs/usage/experimental/



var baseConfig = {
    entry: {
        app: path.resolve(config.paths.source, 'main-app'),
        sandbox: path.resolve(config.paths.source, 'main-sandbox')
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

    // Dev config is merged with common config
    module.exports = webpackMerge(baseConfig, {
        devtool: 'cheap-module-eval-source-map', // Generate source maps (more or less efficiently)
        devServer: {
            // Config for webpack-dev-server. See https://github.com/webpack/docs/wiki/webpack-dev-server#api
            port: config.webpack.port,
            contentBase: config.paths.public, // serve content from here (e.g. index.html)
            hot: true, // Enable HMR (hot module reloading) on the server
            inline: true, // Add webpack dev server entry point (ember WDS runtime into the bundle)
            colors: true,
            https: config.server.protocol === 'https',
            historyApiFallback: false
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
        ]
    });

} else if (process.env.NODE_ENV === 'production') {

    // Production config is merged with common config
    module.exports = webpackMerge(baseConfig, {
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
    })
}
