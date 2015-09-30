'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var config = require('../config/variables');


function writeConfigFile (filename, content) {
    try {
        // @TODO this doesn't look very safe.
        fs.writeFileSync(path.resolve(config.paths.root, filename), content);
    } catch (err) {
        console.log(chalk.red(
            '[' + path.basename(__filename) + '] ERROR: Unable to write to ' + filename + ' - ' + err.getErrorMessage()
        ));
        throw err;
    }

    console.log(chalk.green('[' + path.basename(__filename) + '] OK: make ' + filename));
}


module.exports = writeConfigFile;