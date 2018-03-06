'use strict';

module.exports = {
  validateEmail : function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  },

  validateMobileNumber: function(mobileNumber) {
    var re = /^[0]?[789]\d{9}$/;
    return re.test(mobileNumber);
  },

  checkIfEmpty :function(str){
    str = '' + str;
    if(str == null || str == undefined || str == ''){
      return false;
    } else {
      return true;
    }
  },

  checkSMSContentLength :function(str){
    str = '' + str;
    if(str.length > 159){
      return false;
    } else {
      return true;
    }
  },

  checkOTPSMSContentLength :function(str){
    str = '' + str;
    if(str.length > 6){
      return false;
    } else {
      return true;
    }
  },

  validateGeoPoint: function(geoPoint){
    var lat = parseFloat(geoPoint.lat);
    var lng = parseFloat(geoPoint.lng);
    if(lat < -90 || lat > 90) {
      return false;
    } else if(lng < -180 || lng > 180){
      return false;
    }
    return true;
  }
};
