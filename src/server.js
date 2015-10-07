'use strict';

var config = require('./config/variables');
var path = require('path');
var Hapi = require('hapi');
var Inert = require('inert');
var Vision = require('vision');
var HapiReactViews = require('hapi-react-views');



var server = new Hapi.Server();

server.connection({
    host: config.server.host,
    port: config.server.port
});



var plugins = [
    {register: Inert}, // enables serving static files (file and directory handlers)
    {register: Vision} // enables rendering views with custom engines (view handler)
];
// Enable proxying requests to webpack dev server (proxy handler)
if (process.env.NODE_ENV === 'development') {
    var H2o2 = require('h2o2');
    plugins.push({register: H2o2});
}



server.register(plugins, (err) => {

    if (err) {
        console.error(err);
        return;
    }

    // Set up server side react views using Vision
    server.views({
        engines: {jsx: HapiReactViews},
        path: config.paths.serverViews
    });

    // Note: only one route per will be used to fulfill a request.
    // In case of multiple routes matching the URL, the most "specific" route wins.
    // See http://hapijs.com/api#path-matching-order

    // Serve all files from the static directory
    // Note: in production this also serves webpack bundles
    server.route({
        method: 'GET',
        path: config.publicPaths.static + '{path*}',
        handler: {
            directory: {
                path: config.paths.static,
                index: false,
                listing: false,
                showHidden: false
            }
        }
    });

    // Serve white-listed files from the public directory
    config.server.publicFiles.forEach(
        (filename) => {
            server.route({
                method: 'GET',
                path: '/' + filename,
                handler: {
                    file: {
                        path: path.join(config.paths.public, filename)
                    }
                }
            });
        }
    );

    // Catch-all
    server.route({
        method: 'GET',
        path: '/{path*}',
        handler: (request, reply) => {
            reply('Hapi catch-all view for /' + encodeURIComponent(request.params.path));
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
            path: config.publicPaths.build + '{path*}', // this includes HMR patches, not just webpack bundle files
            handler: {
                proxy: {
                    host: config.server.host,
                    port: config.webpack.port,
                    passThrough: true
                }
            }
        });

        // Proxy webpack HMR requests to webpack-dev-server
        server.route({
            method: 'GET',
            path: '/__webpack_hmr', // this includes HMR patches, not just webpack bundle files
            handler: {
                proxy: {
                    host: config.server.host,
                    port: config.webpack.port,
                    passThrough: true
                }
            }
        });

        // Enable a separate sandbox
        server.route({
            method: 'GET',
            path: '/sandbox',
            handler: {
                view: 'sandbox' // sandbox.jsx in /views
            }
        });
    }

    server.start(() => {
        console.log('Hapi server started!');
    });
});
