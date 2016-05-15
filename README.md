# Minimal Hapi + React + Webpack + HMR Sandbox

This starter kit connects a hapi.js server with webpack dev server with react hot module reloading all set up.

Very basic production config is also in place.

You can use this starter kit to efficiently develop react components and applications that might talk to a Hapi.js backend.

The primary purpose of this repo however is to demonstrate how to wire together these technologies. The config files are organized to have an obvious single source of truth. I've added plenty of comments to explain which config does what.

## Features

* React (client) hot module reloading is configured with react-transform-hmr
* ESLint error & warnings are logged to browser console
* Application server (Hapi.js) is separate from webpack dev server (Express.js)
* Hapi.js proxies requests for webpack assets to webpack dev server
* Hapi.js is configured to serve static files, and a couple example routes
* A separate sandbox entry point is set up for white room component development
* Sample client-side React view with a counter to easily test hot module reloading (any time the page does a full reload, the counter resets).
* Server-side React views instead of index.html (see /server-views). Isomorphism is easy to configure if needed using the same dependency.
* Automatic application server reloading using nodemon
* Babel transpilation of ES6 and JSX into browser-compatible ES5, both for server and client code. Use all the fancy stuff today!
* Webpack assets are generated with content hashes in filenames for easy cache busting
* Webpack assets are optimized with Uglify.js on production, removing dead code (TODO: add server-only code)
* Webpack asset URLs are recorded in a file, and a helper method is provided to extract them for usage in HTML / JSX.
* Basic testing setup with Mocha, Chai and jsdom

## Configuration

* Raw configuration parameters are stored in src/config/variables.js – this is the source of truth compiled for easy understanding of what goes where.
* Webpack configuration is compiled using the parameters above in src/config/webpack-config.js
* A couple tooling config files (e.g. .eslintignore) are generated from the config parameters as well, again, to make it clear what exactly is affected by the configs.

## Usage

### Dependencies

* You need node.js v4+ installed globally on your machine. If using OS X, best to install node using [Homebrew](http://brew.sh/). Node v0.12 might work too, but I don't test it anymore.
* npm `dependencies` are required to build and run the app in production.
* npm `devDependencies` are additionally required to build and run the app in development.
* Core dependencies: Hapi, Webpack, Babel 6, React, react-transform-hmr.


### Development

* `git clone` this repo to your local machine
* `cd` into project folder
* `npm install` to install dependencies
* `npm run dev` to start Hapi application server
* `npm run webpack` in another terminal session to start webpack dev server with hot module reloading
* Visit [http://localhost:3000](http://localhost:3000) and open your browser's web development console
* Try changing and saving src/components/counter.css – you'll see the changes applied to the page without the page itself reloading. How cool is that, eh?
* ESLint errors are printed into webpack dev server output and also into the browser's console. To run ESLint separately from that, do `npm run lint`.

### Production

* `git clone` and `npm install`
* `npm run build` to generate config files and webpack assets. This means we don't need to run webpack dev server in production.
* `npm start` to start up node
* Visit [http://localhost:2000](http://localhost:2000) (note the port is different from dev)
* Build something people want, acquire paying customers, retire to New Zealand.

## Caveats

* Hot module reloading only works for react components and CSS files.
* If you change files that cause nodemon to reload, HMR will temporarily break and you'll need to reload the page manually (or make another change to another file that is covered by HMR but does not trigger a server reload).
* If you edit webpack-config.js or change the contents of node_modules (e.g. by installing a new dependency), you'll need to restart webpack dev server.
* (TODO) Reloading while webpack is compiling loads a broken page. Ideally it should wait for webpack to finish compiling, and only then load the page.
* (TODO) I didn't test webpack dev server https support. Might need a couple tweaks.

## Resources

[SurviveJS](https://survivejs.com/) is a good introduction to React and Webpack.

Follow [Dan Abramov](https://medium.com/@dan_abramov/) and check out his projects, he knows a thing or two about react and hot module reloading.

This project uses a bit of ES6 syntax. If you're not into that yet, check out [Understanding ES6](https://leanpub.com/understandinges6/read).

If something's not working in my setup, please [file an issue](https://github.com/raquo/minimal-hapi-react-webpack/issues) on Github.

## License

[MIT](https://github.com/raquo/minimal-hapi-react-webpack/blob/master/LICENSE.md). Go nuts.

## Author

Nikita Gazarov + [Contributors](https://github.com/raquo/minimal-hapi-react-webpack/graphs/contributors)

[nikita@raquo.com](mailto:nikita@raquo.com)

[@raquo](https://twitter.com/raquo)
