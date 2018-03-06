'use strict';

var app = require('../server.js');

module.exports = function RestError(status, message, extra) {
  this.name = this.constructor.name;
  this.message = message;
  this.status = status;
  this.extra = extra;

  Error.captureStackTrace(this, this.constructor);
  console.error(this);
  //process.emit('error', this);

  if(app.NODE_ENV !== 'staging' && app.NODE_ENV !== 'production'){
    //@todo need a better way of doing this. Would like to print logs in staging and production
    delete this.stack;
  }
};

require('util').inherits(module.exports, Error);
