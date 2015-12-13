'use strict';

if (process.env.NODE_ENV !== 'development') {
    throw new Error('ERROR: Sandbox is only intended for dev environment');
}

var React = require('react');
var ReactDOM = require('react-dom');
var Counter = require('./components/counter');

require('./main-sandbox.css');

function mainSandbox () {
    ReactDOM.render(
        React.createElement(Counter),
        document.getElementById('appContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainSandbox);
