'use strict';

var app = require('../server.js');
if(app.NODE_ENV == 'production' || app.NODE_ENV == 'staging'){
  process.on('SIGINT', function() {
    // My process has received a SIGINT signal
    // Meaning PM2 is now trying to stop the process
    // So I can clean some stuff before the final stop

    setTimeout(function() {
      // 5000ms later the process kill it self to allow a restart
      process.exit(0);
    }, 5000);
  });
}
