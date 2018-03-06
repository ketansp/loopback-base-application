'use strict';

var _ = require('underscore');

Array.prototype.contains = function(obj){
  if(this.indexOf(obj) > -1){
    return true
  } else {
    return false;
  }
}

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

Object.deepEquals = function(o1, o2) {
  return _.isEqual(o1, o2);
};

Array.prototype.unique = function() {
  var a = this.concat();
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i] === a[j])
              a.splice(j--, 1);
      }
  }

  return a;
};

//overriding the default catch block to fire up rejection handled event
Promise.super_.prototype.__originalCatch = Promise.super_.prototype.catch;
Promise.super_.prototype.catch = function(callback){
  return this.__originalCatch(function(reason){
    process.emit('rejectionHandled', reason);
    return callback(reason);
  });
};
