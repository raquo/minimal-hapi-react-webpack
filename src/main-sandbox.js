'use strict';

var React = require('react');
var Counter = require('./components/counter');

if (process.env.NODE_ENV !== 'development') {
    throw new Error('ERROR: Sandbox is only intended for dev environment');
}

require('./main-sandbox.css');

function mainSandbox () {
    React.render(
        React.createElement(Counter),
        document.getElementById('counterContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainSandbox);
