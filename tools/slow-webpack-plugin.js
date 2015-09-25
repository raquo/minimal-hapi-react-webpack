'use strict';

var chalk = require('chalk');

var logPrefix = '[WebpackSlowPlugin]: ';


function SlowWebpackPlugin (options) {
    options = options || {};
    options.delay = parseInt(options.delay);
    options.delay = !isNaN(options.delay) ? options.delay : 1000;

    this.options = options;
}


SlowWebpackPlugin.prototype.apply = function (compiler) {
    var delay = this.options.delay;

    compiler.plugin('done', function (compiler) {
        var beginTime = Date.now();
        var curTime = beginTime;
        var secondsElapsed = 0;
        console.log('');
        console.log(chalk.yellow(logPrefix + 'Begin'));
        while (curTime - beginTime < delay) {
            curTime = Date.now();
            if (Math.floor((curTime - beginTime) / 1000) > secondsElapsed) {
                secondsElapsed++;
                console.log(chalk.yellow(logPrefix + secondsElapsed + '/' + Math.ceil(delay / 1000)));
            }
        }
        console.log(chalk.yellow(logPrefix + 'End'));
        console.log('');
    });
};


module.exports = SlowWebpackPlugin;