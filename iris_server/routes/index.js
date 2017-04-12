var express = require('express');
var router = express.Router();
var clientId = "FREE_TRIAL_ACCOUNT";
var clientSecret = "PUBLIC_SECRET";
var http = require('http');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get("/message",function(req, res){
	var text = req.param("msg")

var jsonPayload = JSON.stringify({
    number: "919861392679",  // Specify the recipient's number (NOT the gateway number) here
    message: text  // FIXME
});

var options = {
    hostname: "localhost",
    port: 8000,
    path: "/v1/telegram/single/message/0",
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "X-WM-CLIENT-ID": 175952,
        "X-WM-CLIENT-SECRET": "f4e5de40bf3eca03290c532b046650c2",
        "Content-Length": Buffer.byteLength(jsonPayload)
    }
};

var request = new http.ClientRequest(options);
request.end(jsonPayload);

request.on('response', function (response) {
    console.log('Heard back from WhatsMate Telegram Gateway:\n');
    console.log('Status code: ' + response.statusCode);
    response.setEncoding('utf8');
    response.on('data', function (chunk) {
        console.log(chunk);
    });
});
})

module.exports = router;
