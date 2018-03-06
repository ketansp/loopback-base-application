'use strict';

module.exports = {
  formatMobileNumber : function (mobileNumber) {
    var str = '' + mobileNumber;
    if(str.length == 13 && str.indexOf('+91')){
      str = str.substring(3, 13);
    } else if(str.length == 12 && str.indexOf('91')){
      str.substring(2, 12);
    } else if(str.length == 11 && str.indexOf('0')){
      str.substring(1, 11);
    } else if(str.length == 10){
      str = str;
    } else {
      return new Error('Invalid mobile number');
    }
    return parseInt(str);
  }
};
