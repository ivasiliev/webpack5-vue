const express = require('express');
const webpack = require('webpack');
const open = require('open');
const path = require('path');

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: config.output.publicPath
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: false,
    noInfo: true,
    quiet: true
});

// force page reload when html-webpack-plugin template changes
compiler.hooks.afterEmit.tap('webpack-hot-middleware', () => {
    hotMiddleware.publish({
        action: 'reload'
    });
    //console.log('>>> reload');
    // return true to emit the output, otherwise false
    return true;
});

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// serve pure static assets
const staticPath = path.posix.join('/', 'static');
app.use(staticPath, express.static('./static'));

// config dev server port
const port = config.devServer.port;
const uri = 'http://localhost:' + port;

let _resolve;
const readyPromise = new Promise(resolve => {
    _resolve = resolve
});

console.log('> Starting dev server...');
devMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n');
    open(uri);
    _resolve();
});

const server = app.listen(port);

module.exports = {
    ready: readyPromise,
    close: () => {
        server.close()
    }
};