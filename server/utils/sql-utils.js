'use strict';

var app = require('../server.js')

module.exports = {
  executeSQL : function(sql, params, callback){
    var promise = new Promise(function(resolve, reject){
      app.dataSources.mysqlTransactional.connector.execute(sql, params, function(err, result){
        if(err){
          console.error(err);
          return reject(err);
        } else {
          return resolve(result);
        }
      })
    });

    if(callback && typeof callback == 'function'){
      promise.then(function(data){callback(null, data)}).catch(function(err){callback(err)});
    } else {
      return promise;
    }
  }
}
