# Minimal Hapi + React + Webpack + HMR Sandbox

This starter kit connects a hapi.js server with webpack dev server with react hot module reloading all set up.

Very basic production config is also in place.

You can use this starter kit to efficiently develop react components and applications that might or might not talk to a Hapi.js backend.

## Features

* React (client) hot module reloading is configured with babel-plugin-react-transform
* ESLint error & warnings are logged to browser console
* Application server (Hapi.js) is separate from webpack dev server (Express.js)
* Hapi.js proxies webpack requests to webpack dev server
* Hapi.js is configured to server static files, and a couple example routes
* A separate sandbox entry point is set up for white room component development
* Sample client-side React view with a counter to easily test hot module reloading (any time the page does a full reload, the counter resets).
* Server-side React views instead of index.html (see /server-views). Isomorphism is easy to configure if needed using the same dependency.
* Automatic application server reloading using nodemon
* Babel transpilation of ES6 into browser-compatible ES5. Use all the fancy stuff today!
* Webpack assets are generated with content hashes in filenames for easy cache busting
* Webpack assets are optimized with Uglify.js on production, removing dead code (TODO: and server-only code)
* Webpack asset URLs are saved into a file, and a helper method is provided to extract them for usage in HTML files.

## Configuration

* Raw configuration parameters are stored in src/config/variables.js – this is the source of truth compiled for easy understanding of what goes where.
* Webpack configuration is compiled using the parameters above in src/config/webpack-config.js
* A couple tooling config files (e.g. .eslintignore) are generated from the config parameters as well, again, to make it clear what exactly is affected by the configs.

## Usage

### Global dependencies

You need nodemon 1.6+ and node.js 0.12 installed on your machine. If using OS X, best to install node using [Homebrew](http://brew.sh/). Node 4.x should work too, but I didn't test it yet.

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

## TODO

* Move to Node.js 4.x
* Use my common .eslintrc

## Resources

[SurviveJS](https://survivejs.com/) is a good introduction to React and Webpack.

Follow [Dan Abramov](https://medium.com/@dan_abramov/) and check out his projects, he knows a thing or two about react and hot module reloading.

This project uses a bit of ES6 syntax. If you're not into that yet, check out [Understanding ES6](https://leanpub.com/understandinges6/read).

If something's not working in my setup, please [file an issue](https://github.com/raquo/minimal-hapi-react-webpack/issues) on Github.

## License

[MIT](https://github.com/raquo/minimal-hapi-react-webpack/blob/master/LICENSE.md). Go nuts.

## Author

Nikita Gazarov

[nikita@raquo.com](mailto:nikita@raquo.com)

[@raquo](https://twitter.com/raquo)
