'use strict';

var React = require('react');
var Counter = require('./components/counter');

require('./main-app.css');



function mainApp () {
    React.render(
        React.createElement(Counter),
        document.getElementById('counterContainer')
    );
}



document.addEventListener('DOMContentLoaded', mainApp);
