var express = require('express');
var router = express.Router();
var http = require('http');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('index.html');
});


module.exports = router;
