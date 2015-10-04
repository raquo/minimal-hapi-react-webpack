'use strict';

var React = require('react');
var Counter = require('./components/counter');

require('./main-sandbox.css');

function mainSandbox () {
    React.render(
        React.createElement(Counter),
        document.getElementById('counterContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainSandbox);
