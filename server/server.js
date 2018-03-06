'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var loopbackConsole = require('loopback-console');

var bodyParser = require('body-parser');
var multer = require('multer');

var app = module.exports = loopback();
app.NODE_ENV = process.env.NODE_ENV || 'development';
app.APP_TYPE = process.env.APP_TYPE || 'main';

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer({dest:__dirname+'/.tmp/'}).any()); // for parsing multipart/form-data

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (loopbackConsole.activated()) {
    loopbackConsole.start(app, {
        prompt: "LOOPBACKBASEAPP # ",
        // Other REPL or loopback-console config
      }, function (err, ctx) {
        // Perform post-boot operations here.
        // The 'ctx' handle contains the console context, including the following
        // properties: app, lbContext, handles, models
      });
  } else if (require.main === module) {
    app.start();
  }
});
