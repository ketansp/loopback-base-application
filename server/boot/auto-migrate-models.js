'use strict';

var async = require('async');
var _ = require('underscore');

module.exports = function(app, cb) {

  if(app.NODE_ENV !=='development'){
    return cb();
  }

  var ds = app.dataSources.mysqlTransactional;
  var modelsToMigrate = [];

  function migrateModel(model, callback){
    ds.isActual(model, function(err,isActual){
      if(err){
        console.error('An error occured while updating model '+ model);
        console.error(err);
        return callback(err);
      } else {
        if(isActual == true){
          callback();
        } else {
          ds.autoupdate(model, function(err, data){
            if(err){
              console.error('An error occured while updating model '+ model);
              console.error(err);
              return callback(err);
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
    ds.connector.autoupdateForeignKeys(cb);
  });

};


