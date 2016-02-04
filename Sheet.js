var GoogleSpreadsheet = require("google-spreadsheet");
var creds = {
  client_email: process.env.GOOGLE_EMAIL,
  private_key: process.env.GOOGLE_KEY
}

var Sheet = module.exports = function(){
  this.my_sheet = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
};

Sheet.prototype.addRow = function(row){
  var self = this;
  self.my_sheet.useServiceAccountAuth(creds, function(err){
    self.my_sheet.addRow( 1, row);
  });
};

Sheet.prototype.getReply = function(callback){
  var self = this;
  self.my_sheet.useServiceAccountAuth(creds, function(err){
    self.my_sheet.getRows( 2, function(err, rows){
      if (err || !rows[0].hasOwnProperty('reply')){
        callback('Thanks for texting.');
      }
      callback(rows[0].reply);
    });
  });
}
