const path = require('path');
const webpack = require('webpack');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
// const SlowWebpackPlugin = require('../tools/slow-webpack-plugin');
const config = require('./variables');


const APP_ENTRY = path.join(config.paths.source, 'main-app');
const WEBPACK_HOT_ENTRY = `webpack-hot-middleware/client?path=${config.webpack.devServerUrl}/__webpack_hmr`;
const JS_JSX = /\.(js|jsx)$/; // We allow both .js or .jsx extensions for JS code – choose what you like more.
const BABEL = 'babel'; // We use Babel to transpile ES6/JSX into ES5. See .babelrc file for additional rules.
const CSS_LOADER = {
  test: /\.css$/,
  loaders: ['style', 'css'], // Loaders are processed last-to-first
  include: config.paths.source
};


const webpackConfig = {
  resolve: {
    // Webpack tries to append these extensions when you require(moduleName)
    // The empty extension allows specifying the extension in a require call, e.g. require('./main-app.css')
    extensions: ['', '.js', '.jsx']
  },
  output: {
    publicPath: config.publicPaths.build, // Expose bundles in this web directory (only dev server uses this option)
    filename: config.webpack.outputFilename, // Bundle filename pattern
    path: config.paths.build  // Put bundle files in this directory (Note: dev server does not generate bundle files)
  },
  plugins: [
    // new SlowWebpackPlugin({delay: 2000}),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new AssetsWebpackPlugin({
      filename: config.webpack.assetsFilename,
      path: config.webpack.assetsPath,
      prettyPrint: true
    })
  ]
};


if (process.env.NODE_ENV === 'development') {
  Object.assign(webpackConfig, {
    entry: {
      app: [APP_ENTRY, WEBPACK_HOT_ENTRY],
      sandbox: [path.join(config.paths.source, 'main-sandbox'), WEBPACK_HOT_ENTRY]
    },
    devtool: 'cheap-module-eval-source-map', // Generate source maps (more or less efficiently)
    module: {
      preLoaders: [
        {
          test: JS_JSX,
          loader: 'eslint-loader', // Lint all JS files before compiling the bundles (see .eslintrc for rules)
          include: config.paths.source
        }
      ],
      loaders: [
        CSS_LOADER,
        {
          test: JS_JSX,
          loader: BABEL,
          include: config.paths.source,
          query: {
            plugins: [
              ['react-transform', {
                transforms: [{
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                }]
              }]
            ]
          }
        }
      ]
    },
    eslint: {
      // failOnWarning: true,
      failOnError: true
    }
  });

  Array.prototype.push.apply(webpackConfig.plugins, [
    new webpack.HotModuleReplacementPlugin(), // Enables HMR. Adds webpack/hot/dev-server entry point if hot=true
    new webpack.NoErrorsPlugin() // @TODO do we really want / need this? On dev or on production too?
  ]);
} else { // production
  /** @lends webpackConfig */  // this comment is not critical, it just helps some IDEs with autocompletion
  Object.assign(webpackConfig, {
    entry: {
      app: APP_ENTRY
    },
    devtool: 'source-map', // generate full source maps
    module: {
      loaders: [
        CSS_LOADER,
        {
          test: JS_JSX,
          loader: BABEL,
          include: config.paths.source
        }
      ]
    }
  });

  Array.prototype.push.apply(webpackConfig.plugins, [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false // Don't complain about things like removing unreachable code
      }
    })
  ]);
}


module.exports = webpackConfig;
