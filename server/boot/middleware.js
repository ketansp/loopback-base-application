'use strict';

var path = require('path');
const maxAge = 2592000;

module.exports = function(app) {
  app.middleware('final', function(req, res, next){
    if(app.NODE_ENV === 'development'){
      res.sendFile(path.join(__dirname + '/../../client/app/index.html'));
    } else {
      res.sendFile(path.join(__dirname + '/../../client/dist/index.html'));
    }
  });

  app.use(app.loopback.static(path.join(__dirname, '/../../client/dist'),{
    setHeaders: function(res, path){
      if(path && path.indexOf('/index.html') == -1){
        res.setHeader('Cache-Control', 'public, max-age='+maxAge);
      }
    }
  }));

}
