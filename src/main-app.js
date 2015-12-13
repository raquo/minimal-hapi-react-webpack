'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Counter = require('./components/counter');

require('./main-app.css');



function mainApp () {
    ReactDOM.render(
        React.createElement(Counter),
        document.getElementById('counterContainer')
    );
}



document.addEventListener('DOMContentLoaded', mainApp);
