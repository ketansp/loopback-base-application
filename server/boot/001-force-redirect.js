'use strict';

var app = require('../server.js');

var forceRedirect = function () {
  return function(req, res, next) {
    if(app.NODE_ENV === 'staging' && app.APP_TYPE == 'main'){
      if (req.get('X-Forwarded-Proto') !== 'https' || req.get('host')!=='staging.example.com') {
        return res.redirect('https://staging.example.com' + req.url);
      } else {
        return next();
      }
    } else if(app.NODE_ENV === 'production' && app.APP_TYPE == 'main'){
      if (req.get('X-Forwarded-Proto') !== 'https' || req.get('host')!=='www.example.com') {
        return res.redirect('https://www.example.com' + req.url);
      } else {
        return next();
      }
    } else {
      return next();
    }
  };
};

//doing this juggling so that I can run an instance on worker machine itself
if((app.NODE_ENV === 'production' || app.NODE_ENV === 'staging') && app.APP_TYPE == 'main'){
  app.use(forceRedirect());
}
