'use strict';

var async = require('async');
var app = require('../server.js');

var ds = app.dataSources.mysqlTransactional;
var modelsToMigrate = [];

function migrateModel(model, callback){
  ds.isActual(model, function(err,isActual){
    if(err){
      console.error('An error occured while updating model '+ model);
      exitWithError(err);
    } else {
      if(isActual == true){
        callback();
      } else {
        ds.autoupdate(model, function(err, data){
          if(err){
            console.error('An error occured while updating model '+ model);
            exitWithError(err);
          } else {
            console.log('Auto updated model '+model);
            return callback();
          }
        })
      }
    }
  });
}


for(var key in app.models){
  if(app.models[key].dataSource && app.models[key].dataSource.name == app.dataSources.mysqlTransactional.name){
   modelsToMigrate.push(key);
  }
}

async.eachSeries(modelsToMigrate, migrateModel, function(){
  ds.connector.autoupdateForeignKeys(function(){
    console.log('Done');
    process.exit(0);
  });
});

function exitWithError(err){
  console.error(err);
  process.exit(1);
}



