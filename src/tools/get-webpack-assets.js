'use strict';

var config = require('./../config/variables');
var path = require('path');

var assetsJsonPath = path.resolve(config.webpack.assetsPath, config.webpack.assetsFilename);

/**
 * @type {function}
 * @returns {object}
 */
var getWebpackAssets;
var assets;

if (process.env.NODE_ENV === 'production') {
    // Require the file only once for efficiency
    // Note: like with any other require, you need to restart the server when that file changes
    assets = require(assetsJsonPath);

    getWebpackAssets = () => {
        return assets;
    };

} else {
    var fs = require('fs');
    var chalk = require('chalk');

    getWebpackAssets = () => {
        // On dev we read the file every time we need it. Not efficient, but easy to work with.
        var fileContents = fs.readFileSync(assetsJsonPath).toString();
        try {
            return JSON.parse(fileContents);

        } catch (err) {
            console.log(chalk.red('ERROR: Could not parse ' + config.webpack.assetsFilename + ' - maybe webpack is still processing?'));
            throw err;
        }
    };
}

module.exports = getWebpackAssets;
