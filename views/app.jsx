'use strict';

//import webpackAssets from '../config/webpack-assets';

var webpackAssets = require('../config/webpack-assets');
var React = require('react');

var App = React.createClass({

    render: function () {
        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <title>Main App</title>
                    <script src={webpackAssets().app.js}></script>
                </head>
                <body>
                    <p>Hello world, this layout is rendered by a <strong>server-side</strong> react view (views/app.jsx)</p>
                    <p>{'UTC time from server: '+ Date.now()}</p>
                    <p id='counterContainer'>This text will be replaced by Counter component</p>
                </body>
            </html>
        );
    }
});

module.exports = App;