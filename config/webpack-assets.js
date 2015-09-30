'use strict';

var config = require('./variables');
var path = require('path');

var assetsJsonPath = path.resolve(config.webpack.assetsPath, config.webpack.assetsFilename);
var webpackAssets;
var assets;

if (config.env.isProduction) {
    // Require the file only once for efficiency
    // Note: like with any other require, you need to restart the server when that file changes
    assets = require(assetsJsonPath);

    webpackAssets = function () {
        return assets;
    }

} else {
    var fs = require('fs');
    var chalk = require('chalk');

    webpackAssets = function () {
        // On dev we read the file every time we need it. Not efficient, but easy to work with.
        var fileContents = fs.readFileSync(assetsJsonPath).toString();
        try {
            assets = JSON.parse(fileContents);
            return assets;

        } catch (err) {
            console.log(chalk.red('ERROR: Could not parse ' + config.webpack.assetsFilename + ' - maybe webpack is still processing?'));
            throw err;
        }
    };
}

module.exports = webpackAssets;