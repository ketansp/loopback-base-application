'use strict';

const fromAddress = 'hello@loopbackbaseapp.in';
const replyToAddress = 'hello@loopbackbaseapp.in';

module.exports = {
  getFromAddress : function(){
    return fromAddress;
  },

  getReplyToAddress : function(){
    return replyToAddress;
  }
};
