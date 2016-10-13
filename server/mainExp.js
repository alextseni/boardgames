import express from 'express'
import webpack from 'webpack'
import webpackConfig from '../build/webpack.config'
import historyApiFallback from 'koa-connect-history-api-fallback'
import _debug from 'debug'
import config from '../config'
import webpackDevMiddleware from './middleware/webpack-dev'
import webpackHMRMiddleware from './middleware/webpack-hmr'

const debug = _debug('app:server')
const paths = config.utils_paths

const app = express();
const serv = require('http').Server(app);

app.get('/Randix-Game/', function(req, res) {
  res.sendFile(config.path_base + '/src/index.html')
});
app.use('/src',express.static(config.path_base + '/src'));
console.log('serve start');

let io = require('socket.io')(serv,{});
io.sockets.on('connection', function(socket){
  console.log('socket conn');
});
// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  app.use(webpackDevMiddleware(compiler, publicPath))
  app.use(webpackHMRMiddleware(compiler))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/docs
  // when the application is compiled.
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/docs. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/docs by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
}

export default app
