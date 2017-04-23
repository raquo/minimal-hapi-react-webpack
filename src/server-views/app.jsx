const getWebpackAssets = require('../tools/get-webpack-assets');
const React = require('react');

const App = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Main App</title>
      <script src={getWebpackAssets().app.js} />
    </head>
    <body>
      <p>Hello world, this layout is rendered by a <strong>server-side</strong> react view (views/app.jsx)</p>
      <p>{`UTC time from server: ${Date.now()}`}</p>
      <div id="appContainer">This text will be replaced by Counter component</div>
    </body>
  </html>
);

module.exports = App;
