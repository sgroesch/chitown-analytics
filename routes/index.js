var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var crime = require('./../models/crime')
// var get_https = require("./get_https.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('create mischief.');
  var url = 'https://data.cityofchicago.org/resource/ijzp-q8t2.json?$limit=5&$order=:id';

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
        data = JSON.parse(body);
        // var dajson;
        // var tempXML = parser.parseString(data, function (err, result) {
        //   dajson = result;
        //   console.dir(result);
        //   console.log('Done');
        // });

        data.forEach(function(entry){
          crime.create(entry, function(error, data) {
            if (error) {console.log(error)};
            console.log('created: ' + data);
          });
        });

        res.json('index', data);
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
});

module.exports = router;
