'use strict';

var fs = require('fs');
var _ = require('underscore');
var path = require('path');

module.exports = {
  getCompiledHtml: function(templatePath, data) {
    var encoding, templateContent;
    templateContent = fs.readFileSync(path.join(__dirname + templatePath), encoding = "utf8");
    var temaplatize =  _.template(templateContent);
    return temaplatize(data);
  }
}
