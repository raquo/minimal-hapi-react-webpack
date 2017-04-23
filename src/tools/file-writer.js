/* eslint no-console: ["off"] */

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');
const chalk = require('chalk');
const config = require('../config/variables');


const logPrefix = `[${path.basename(__filename)}] `;


const FileWriter = {

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
      console.log(chalk.red(`${logPrefix}ERROR: Unable to write to ${filename} - ${err}`));
      throw err;
    }

    console.log(chalk.green(`[${path.basename(__filename)}] OK: write ${filename}`));
  },

  /**
   * @param {string} filename   file, folder name or pattern
   */
  remove: (filename) => {
    // @TODO this looks dangerous. Make sure that filename is legit (not higher than root, not .git, etc.)
    // @TODO make async
    try {
      const filePath = path.join(config.paths.root, filename);
      rimraf.sync(filePath);
    } catch (err) {
      console.log(chalk.red(`${logPrefix}ERROR: Unable to delete ${filename} - ${err}`));
      throw err;
    }
    console.log(chalk.green(`${logPrefix}OK: remove ${filename}`));
  }
};


module.exports = FileWriter;
