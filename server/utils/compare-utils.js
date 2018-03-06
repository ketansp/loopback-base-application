'use strict';

var _ = require('underscore');
var util = require('util');

var ignoredKeys = ['lastModifiedDate'];

module.exports = {
  getBeforeAfterDifference : function(beforeChange, afterChange){
    var keys1 = _.keys(beforeChange);
    var keys2 = _.keys(afterChange);
    var allKeys = keys1.concat(keys2);
    allKeys = allKeys.unique();

    var diff = {};
    _.each(allKeys, function(key){
      var afterChangeValue = (afterChange[key] && typeof afterChange[key] == 'object') ? util.inspect(afterChange[key]) : afterChange[key];
      if(!key.startsWith('__') && beforeChange[key] !== afterChangeValue && ignoredKeys.indexOf(key) == -1){
        diff[key] = {
          beforeChange : beforeChange[key],
          afterChange : afterChange[key]
        }
      }
    });
    return diff;
  }
};
