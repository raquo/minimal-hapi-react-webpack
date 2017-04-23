/* eslint no-console: ["off"] */

const chalk = require('chalk');

const logPrefix = '[WebpackSlowPlugin]: ';


function SlowWebpackPlugin(options) {
  const delay = parseInt(options.delay, 10);
  const cleanOptions = Object.assign(
    {},
    options,
    { delay: !isNaN(delay) ? delay : 1000 }
  );

  this.options = cleanOptions;
}


SlowWebpackPlugin.prototype.apply = function apply(compiler) {
  const delay = this.options.delay;

  compiler.plugin('done', () => {
    const beginTime = Date.now();
    let curTime = beginTime;
    let secondsElapsed = 0;
    console.log('');
    console.log(chalk.yellow(`${logPrefix}Begin`));
    while (curTime - beginTime < delay) {
      curTime = Date.now();
      if (Math.floor((curTime - beginTime) / 1000) > secondsElapsed) {
        secondsElapsed += 1;
        console.log(chalk.yellow(`${logPrefix + secondsElapsed}/${Math.ceil(delay / 1000)}`));
      }
    }
    console.log(chalk.yellow(`${logPrefix}End`));
    console.log('');
  });
};


module.exports = SlowWebpackPlugin;
