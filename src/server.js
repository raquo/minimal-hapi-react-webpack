/* eslint no-console: ["off"] */

// Perform babel transforms defined in .babelrc (ES6, JSX, etc.) on server-side code
// Note: the options in .babelrc are also used for client-side code
// because we use a babel loader in webpack config
require('babel-register');

const config = require('./config/variables');
const path = require('path');
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const HapiReactViews = require('hapi-react-views');


const server = new Hapi.Server();

const connectionConfig = {
  host: config.server.host,
  port: config.server.port
};

server.connection(connectionConfig);


const plugins = [
  { register: Inert }, // enables serving static files (file and directory handlers)
  { register: Vision } // enables rendering views with custom engines (view handler)
];
// Enable proxying requests to webpack dev server (proxy handler)
if (process.env.NODE_ENV === 'development') {
  const H2o2 = require('h2o2'); // eslint-disable-line import/no-extraneous-dependencies, global-require
  // ^^^ RE: eslint exception – This code branch is DEV only, so dev dependencies are ok here.
  plugins.push({ register: H2o2 });
}


server.register(plugins, (err) => {
  if (err) {
    console.error(err);
    return;
  }

  // Set up server side react views using Vision
  server.views({
    engines: { jsx: HapiReactViews },
    path: config.paths.serverViews
  });

  // Note: only one route per will be used to fulfill a request.
  // In case of multiple routes matching the URL, the most "specific" route wins.
  // See http://hapijs.com/api#path-matching-order

  // Serve all files from the assets directory
  // Note: in production this also serves webpack bundles
  server.route({
    method: 'GET',
    path: `${config.publicPaths.assets}{path*}`,
    handler: {
      directory: {
        path: config.paths.assets,
        index: false,
        listing: false,
        showHidden: false
      }
    }
  });

  // Serve white-listed files from the webRoot directory
  config.server.publicFiles.forEach((filename) => {
    server.route({
      method: 'GET',
      path: `/${filename}`,
      handler: {
        file: {
          path: path.join(config.paths.webRoot, filename)
        }
      }
    });
  });

  // Catch-all
  server.route({
    method: 'GET',
    path: '/{path*}',
    handler: (request, reply) => {
      reply(`Hapi catch-all view for /${encodeURIComponent(request.params.path)}`);
    }
  });

  // App
  server.route({
    method: 'GET',
    path: '/',
    handler: {
      view: 'app' // app.jsx in /views
    }
  });


  // DEV SETUP
  if (process.env.NODE_ENV === 'development') {
    // Proxy webpack assets requests to webpack-dev-server
    // Note: in development webpack bundles are served from memory, not filesystem
    server.route({
      method: 'GET',
      path: `${config.publicPaths.build}{path*}`, // this includes HMR patches, not just webpack bundle files
      handler: {
        proxy: {
          host: config.server.host,
          port: config.webpack.port,
          passThrough: true
        }
      }
    });

    // Note: We also make requests to Webpack Dev Server EventSource endpoint (typically /__webpack_hmr).
    // We don't need to proxy these requests because we configured webpack-hot-middleware
    // to request them directly from a webpack dev server URL in webpack-config.js

    // Enable a separate sandbox.
    // Use it to work on individual components outside of your application context.
    server.route({
      method: 'GET',
      path: '/sandbox',
      handler: {
        view: 'sandbox' // sandbox.jsx in /views
      }
    });
  }

  server.start(() => {
    console.log(`Hapi server started! Listening at ${connectionConfig.host}:${connectionConfig.port}`);
  });
});
