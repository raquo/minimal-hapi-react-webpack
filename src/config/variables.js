const path = require('path');
const chalk = require('chalk');

// This and anything in config.paths must be absolute.
const ROOT_PATH = path.resolve(__dirname, '../..');

const SOURCE_DIRNAME = 'src';
const WEB_ROOT_DIRNAME = 'public';
const ASSETS_DIRNAME = 'static';
const BUILD_DIRNAME = 'static/build';

let SERVER_HOST;
let SERVER_PORT;
const SERVER_PROTOCOL = 'http'; // Note: I did not test https yet, so you might need more adjustments to make it work
const WEBPACK_DEV_SERVER_PORT = 3001;

// process.env object contains environment variables passed to the node.js process.
// For example, you can see NODE_ENV passed to node in the "scripts" section of package.json
if (process.env.NODE_ENV === 'development') {
  SERVER_HOST = '0.0.0.0';
  SERVER_PORT = process.env.PORT || 3000;
} else if (process.env.NODE_ENV === 'production') {
  SERVER_HOST = '0.0.0.0';
  SERVER_PORT = process.env.PORT || 2000;
} else {
  const errorText = `[${path.basename(__filename)}] ERROR: NODE_ENV is not set: ${process.env.NODE_ENV}`;
  console.log(chalk.red(errorText)); // eslint-disable-line no-console
  throw new Error(errorText);
}

const config = {
  publicPaths: {
    assets: `/${ASSETS_DIRNAME}/`,
    build: `/${BUILD_DIRNAME}/`
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
    rootUrl: `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}`
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
    devServerUrl: `${SERVER_PROTOCOL}://${SERVER_HOST}:${WEBPACK_DEV_SERVER_PORT}`
  });
}


module.exports = Object.freeze(config);
