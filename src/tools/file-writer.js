'use strict';

var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var chalk = require('chalk');
var config = require('../../config/variables');


var logPrefix = '[' + path.basename(__filename) + '] ';


/**
 * @TODO convert to ES6 class when switching to node.js 4.0
 *
 * @class FileWriter
 */
var FileWriter = {

    /**
     * @param {string} filename
     * @param {string} content
     */
    write: (filename, content) => {
        try {
            // @TODO this doesn't look very safe.
            // @TODO make async, clean up this mess
            fs.writeFileSync(path.join(config.paths.root, filename), content);
        } catch (err) {
            console.log(chalk.red(logPrefix + 'ERROR: Unable to write to ' + filename + ' - ' + err));
            throw err;
        }

        console.log(chalk.green('[' + path.basename(__filename) + '] OK: write ' + filename));
    },

    /**
     * @param {string} filename   file, folder name or pattern
     */
    remove: (filename) => {
        // @TODO this looks dangerous. Make sure that filename is legit (not higher than root, not .git, etc.)
        // @TODO make async
        try {
            var filePath = path.join(config.paths.root, filename);
            rimraf.sync(filePath);
        } catch (err) {
            console.log(chalk.red(logPrefix + 'ERROR: Unable to delete ' + filename + ' - ' + err));
            throw err;
        }
        console.log(chalk.green(logPrefix + 'OK: remove ' + filename));
    }
};


module.exports = FileWriter;
