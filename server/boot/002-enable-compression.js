'use strict';

var compression = require('compression')

module.exports = function(app) {
  // compress responses
  app.use(compression());
};
