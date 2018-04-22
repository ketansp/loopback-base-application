'use strict';

var app = require('../server.js');
var awsConfig = require('../aws.config.' + app.NODE_ENV + '.json');
var AWS = require('aws-sdk');
var Validation = require('../utils/validation-utils.js');

var sqs = new AWS.SQS({
  region: awsConfig.sqs.region,
  accessKeyId : awsConfig.accessKeyId,
  secretAccessKey : awsConfig.secretAccessKey
});


app.queueHandler = {};
app.queueHandler.sendEmail = function(msg, callback){
  var promise = new Promise(function(resolve, reject){
    if(!msg.bccAddresses && !msg.ccAddresses && !msg.toAddresses){
      return reject(new Error('At least one list is required of bccAddresses, ccAddresses and toAddresses'));
    }
    if(msg.bccAddresses && msg.bccAddresses.length == 0 &&
      msg.ccAddresses && msg.ccAddresses.length == 0 &&
      msg.toAddresses && msg.toAddresses.length == 0){
      return reject(new Error('At least one list is required of bccAddresses, ccAddresses and toAddresses'));
    }
    if(!msg.from){
      return reject(new Error('From address is required!'));
    }
    if(!msg.replyToAddresses || msg.replyToAddresses.length == 0){
      return reject(new Error('Reply to address is required!'));
    }
    if(!msg.subject){
      return reject(new Error('Email subject is required!'));
    }
    if(!msg.html && !msg.text){
      return reject(new Error('Email content is required!'));
    }

    sqs.sendMessage({
      MessageBody: JSON.stringify(msg),
      QueueUrl: awsConfig.sqs.queue.email.url
    }, function(err, data) {
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


app.queueHandler.sendSMS = function(msg, callback){
  var promise = new Promise(function(resolve, reject){
    if(!Validation.validateMobileNumber(msg.mobileNumber)){
      return reject(new Error('Invalid mobile number!'));
    } else if(!msg.content){
      return reject(new Error('SMS content seems to be empty!'));
    } else if(!msg.type){
      return reject(new Error('Type not given!'));
    } else if(['OTP', 'TRANSACTIONAL', 'PROMOTIONAL'].indexOf(msg.type) == -1){
      return reject(new Error('Invalid sms type!'));
    }

    sqs.sendMessage({
      MessageBody: JSON.stringify(msg),
      QueueUrl: awsConfig.sqs.queue.sms.url
    }, function(err, data) {
      if(err) {
        console.log('ERR', err);
        reject(err);
      }
      resolve({success : true});
      app.models.SMSLog.create({
        mobileNumber: msg.mobileNumber,
        message: msg.content,
        logDate : new Date()
      }).then(function(data){
        //eat up
      }).catch(function(err){
        console.error(err);
        // eat up
      });
    });
  });

  if(callback && typeof callback == 'function'){
    promise.then(function(data){callback(null, data)}).catch(function(err){callback(err)});
  } else {
    return promise;
  }
};
app.queueHandler.sendPushNotification = function(msg, callback){
  var promise = new Promise(function(resolve, reject){
    if(!msg.appType){
      return reject(new Error('App type is missing!'));
    }
    if(!msg.deviceUniqueId){
      return reject(new Error('Device unique id is missing!'));
    }
    if(!msg.payload){
      return reject(new Error('Payload is missing!'));
    }

    //send notification object in data as well. required by android for custom handling
    // msg.payload.data = msg.payload.data || {};
    // msg.payload.data.title =  msg.payload.notification.title || '';
    // msg.payload.data.body =  msg.payload.notification.body || '';

    sqs.sendMessage({
      MessageBody: JSON.stringify(msg),
      QueueUrl: awsConfig.sqs.queue.pushNotification.url
    }, function(err, data) {
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
