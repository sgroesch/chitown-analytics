var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
// var get_https = require("./get_https.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  var url = 'https://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=X1-ZWz19wnelfztvv_2rqd6&state=il&city=chicago&childtype=neighborhood';

  var data = "";
  var req = https.get(url, function(response) {
    // Do something with the response.
    // response.statusCode is an attribute of the response object.
    console.log('Received response: ' + response.statusCode)
    var body = "";
    response.on('data', function (chunk) {
      // Display each chunk.
      // console.log('chunk: ' + chunk);
      body += chunk;
    });
    response.on('end', function () {
      if (response.statusCode === 200) {
        // var results = JSON.parse(body);
        data = body;
        var dajson;
        var tempXML = parser.parseString(data, function (err, result) {
          dajson = result;
          console.dir(result);
          console.log('Done');
        });
        res.json('index', dajson);
      }
      else {
        returnError({message: "Status code: " + http.STATUS_CODES[response.statusCode]});
      }
    });
    req.on("error", returnError);
  });

  function returnError (error) {
    console.error('Error: ' + error.message);
  };

  // res.json('index', {thing: data});
});

module.exports = router;
