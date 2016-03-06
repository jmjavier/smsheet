var errors = [];
var express = require('express');
var app = new express();
var port = process.env.PORT || 5000;
var bodyParser = require('body-parser');

try {
  var twilio = require('twilio');
} catch(e) {
  errors.push(e);
}

var Sheet = require('./Sheet');
try {
  var mySheet = new Sheet();
} catch(e) {
  errors.push(e);
}


app.use(bodyParser.urlencoded({extended: true}));

app.get('/test', function(req, res){
  res.send(errors.join(', '));
});

app.post('/receive', twilio.webhook({ protocol: 'https' }), function(req, res) {

  var d = new Date().toString();

  mySheet.addRow({
    'Sender': req.body.From,
    'Message': req.body.Body,
    'Timestamp': d
  });

  var reply = mySheet.getReply(function(reply){
    var twiml = new twilio.TwimlResponse();
    twiml.message(reply);
    res.type('text/xml');
    res.send(twiml.toString());
  });

});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;
});
