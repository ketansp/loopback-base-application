'use strict';

module.exports = function(app) {
  //Lets play ping-pong
  app.get('/ping', function(req, res) {
    res.send('pong');
  });
}
