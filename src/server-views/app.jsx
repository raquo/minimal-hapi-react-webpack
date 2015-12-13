'use strict';

var getWebpackAssets = require('../tools/get-webpack-assets');
var React = require('react');

var App = React.createClass({

    render: function () {
        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <title>Main App</title>
                    <script src={getWebpackAssets().app.js}></script>
                </head>
                <body>
                    <p>Hello world, this layout is rendered by a <strong>server-side</strong> react view (views/app.jsx)</p>
                    <p>{'UTC time from server: ' + Date.now()}</p>
                    <div id='counterContainer'>This text will be replaced by Counter component</div>
                </body>
            </html>
        );
    }
});

module.exports = App;
