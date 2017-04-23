/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}], no-console: ["off"] */
// ^^^ We're overriding some eslint rules for this file. This is a DEV file so dev dependencies are ok here.

if (process.env.NODE_ENV !== 'development') {
  throw new Error('ERROR: Webpack dev server only works in dev environment');
}

const chalk = require('chalk');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('./config/variables');
const webpackConfig = require('./config/webpack-config');


const app = express();
const compiler = webpack(webpackConfig);


app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));

app.use(webpackHotMiddleware(compiler));

app.listen(config.webpack.port, config.server.host, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(chalk.green(`Webpack dev server listening at ${config.webpack.devServerUrl}`));
});
