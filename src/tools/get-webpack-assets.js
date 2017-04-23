/* eslint global-require: ["off"], no-console: ["off"] */

const config = require('./../config/variables');
const path = require('path');

const assetsJsonPath = path.resolve(config.webpack.assetsPath, config.webpack.assetsFilename);

/**
 * @type {function}
 * @returns {object}
 */
let getWebpackAssets;
let assets;

if (process.env.NODE_ENV === 'production') {
  // Require the file only once for efficiency
  // Note: like with any other require, you need to restart the server when that file changes
  assets = require(assetsJsonPath); // eslint-disable-line import/no-dynamic-require

  getWebpackAssets = () => assets;
} else {
  const fs = require('fs');
  const chalk = require('chalk');

  getWebpackAssets = () => {
    // On dev we read the file every time we need it. Not efficient, but easy to work with.
    const fileContents = fs.readFileSync(assetsJsonPath).toString();
    try {
      return JSON.parse(fileContents);
    } catch (err) {
      console.log(chalk.red(
        `ERROR: Could not parse ${config.webpack.assetsFilename} - maybe webpack is still processing?`)
      );
      throw err;
    }
  };
}

module.exports = getWebpackAssets;
