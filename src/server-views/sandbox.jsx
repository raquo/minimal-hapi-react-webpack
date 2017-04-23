const getWebpackAssets = require('../tools/get-webpack-assets');
const React = require('react');

const Sandbox = () => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <title>Sandbox</title>
      <script src={getWebpackAssets().sandbox.js} />
    </head>
    <body>
      <p>
        This is views/sandbox.jsx, a sandbox view. Use it to develop components in a
        fast, clean environment, without loading the rest of your application.
      </p>
      <p>{`UTC time from server: ${Date.now()}`}</p>
      <div id="appContainer">This text will be replaced by Counter component</div>
    </body>
  </html>
);

module.exports = Sandbox;
