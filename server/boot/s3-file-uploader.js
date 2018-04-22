'use strict';

var app = require('../server.js');
var awsConfig = require('../aws.config.' + app.NODE_ENV + '.json');
var AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
  signatureVersion: 'v4'
});

var documentBucket = new AWS.S3({params: {Bucket: awsConfig.s3.buckets.documentBucket.name}});

app.s3FileUploader = {};
app.s3FileUploader.uploadDocument = function(fileName, data, callback){
  var promise = new Promise(function(resolve, reject){
    documentBucket.upload({Key : fileName, Body : data }, function (err, data) {
      if(err) {
        console.log('ERR', err);
        reject(err);
      }
      resolve({success : true});
    });
  });

  if(callback && typeof callback == 'function'){
    promise.then(function(data){callback(null, data)}).catch(function(err){callback(err)});
  } else {
    return promise;
  }
};
