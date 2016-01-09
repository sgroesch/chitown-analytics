var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var crime = require('../models/crime')

// ---------------
// Home page.
// ---------------

router.get('/', function(req, res, next) {
  res.render('index', { user: req.user });
});

// ---------------
// Post route used to get data from Chicago.
// ---------------

router.post('/api', function(request, response, next) {
  // Requesting from City of Chicago: Crimes.
  requestResource('https://data.cityofchicago.org/resource/ijzp-q8t2.json?$limit=10000&$order=date&primary_type=HOMICIDE');

  crime.find(function(err, crimes) {
    if (err) {
      returnError(err);
    } else {
      response.json(crimes);
    }
  });
});


// ---------------
// Query API by primary type and date.
// To call: /api?primary=homicide&start=mmddyy&end=mmddyy
// ---------------

router.get('/api', function(request, response, next) {

  var primary = parseToCorrectString(request.param('primary').toUpperCase());
  var startPeriodTime = request.param('start');
  var endPeriodTime = request.param('end');

  console.log(primary);

  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var reports = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == primary) {
        var incident_time = new Date(incident.date);
        if (compareDate(startPeriodTime, endPeriodTime, incident_time) === true) {
          reports.push(incident);
        };
      };
    });
    console.log(reports);
    response.json(reports);
  });
});

// ---------------
// Returns everything in the database.
// ---------------

router.get('/data', function(request, response, next) {
  console.log(' root.');
  crime.find(function(error, data) {
    if (error) {console.log(error)};
    console.log(data);
    response.json(data);
  });
});

// ---------------
// Error message.
// ---------------

function returnError (error) {
  console.error('Error: ' + error.message);
};

// ---------------
// This function does the actual call to City of Chicago data.
// ---------------

function requestResource (url) {
  var data = "";
  var req = https.get(url, function(response) {
    console.log('Received response: ' + response.statusCode)
    var body = "";
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      if (response.statusCode === 200) {
        data = JSON.parse(body);

        data.forEach(function(entry){
          crime.create(entry, function(error, data) {
            if (error) {console.log(error)};
            console.log('created: ' + data);
          });
        });
      }
      else {
        returnError({message: "Status code: " + http.STATUS_CODES[response.statusCode]});
      }
    });
    req.on("error", returnError);
  });
};

// ---------------
// This function parses the part of the url that contains start and end dates
// and compares database entries against those parameters.
// ---------------

function compareDate (startPeriod, endPeriod, objTime) {
  // ---------------
  // Date strings are sliced up and injected with dashes and generic time
  // for formatting to create date objects. Without adding 'T12:00:00,''
  // formatted CST dates are assumed to be UTC, which would be converted back to
  // CST dates for the day after.
  // ---------------
  var startString = startPeriod.substr(4,4) + '-' + startPeriod.substr(0,2) + '-' + startPeriod.substr(2,2) + 'T12:00:00';
  var endString = endPeriod.substr(4,4) + '\-' + endPeriod.substr(0,2) + '\-' + endPeriod.substr(2,2) + 'T12:00:00';

  var startTime = new Date(startString);
  var endTime = new Date(endString);

  if (startTime.getTime() <= objTime.getTime() && endTime.getTime() >= objTime.getTime()) {
    return true;
  };
  return false;
};

// ---------------
// This function parses the part of the url that contains primary type parameters.
// Primary types come in with dashes between words, which are replaces with
// spaces for comparison against entries in our database.
// ---------------

function parseToCorrectString (something) {
  var newString = '';
  for (var i = 0; i < something.length; i++) {
    if (something[i] == '-') {
      newString = newString + ' ';
    }
    else {
      newString = newString + something[i];
    };
  };
  return newString;
};

module.exports = router;
