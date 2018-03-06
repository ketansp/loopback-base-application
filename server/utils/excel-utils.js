'use strict';

var Excel = require('exceljs');
var _ = require('underscore');

module.exports = {
  createExcel : function(workbook, sheetName = 'Sheet 1', headers, records, options = {useStyles: true, useSharedStrings: true}){
    var workbook = workbook || new Excel.Workbook(options);
    var worksheet = workbook.addWorksheet(sheetName);
    worksheet.columns = headers;
    _.each(records, function(record){
      worksheet.addRow(record);
    });
    return workbook;
  }
};
