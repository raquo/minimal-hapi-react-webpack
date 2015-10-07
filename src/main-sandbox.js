'use strict';

var React = require('react');
var Counter = require('./components/counter');

if (process.env.NODE_ENV !== 'development') {
    var chalk = require('chalk');
    console.log(chalk.red('ERROR: Sandbox is only intended for dev environment'));
    return;
}

require('./main-sandbox.css');

function mainSandbox () {
    React.render(
        React.createElement(Counter),
        document.getElementById('counterContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainSandbox);
