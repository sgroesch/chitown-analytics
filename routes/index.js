var express = require('express');
var router = express.Router();
var http = require('http');
var https = require('https');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();
var crime = require('../models/crime')
// var get_https = require("./get_https.js");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/api', function(req, res, next) {
  console.log('litany of sins.');

  crime.find(function(err, crimes) {
    if (err) {
      returnError(err);
    } else {
      res.json(crimes);
    }
  });
});

router.post('/api', function(request, response, next) {
  // Requesting from City of Chicago: Crimes.
  requestResource('https://data.cityofchicago.org/resource/ijzp-q8t2.json?$limit=500&$order=:id');

});

function returnError (error) {
  console.error('Error: ' + error.message);
};

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
      }
      else {
        returnError({message: "Status code: " + http.STATUS_CODES[response.statusCode]});
      }
    });
    req.on("error", returnError);
  });
};


// var findCaseNumber = function(db, callback) {
//    var cursor = db.collection('Put Collection Here').find( );
//    cursor.each(function(err, doc) {
//       assert.equal(err, null);
//       if (doc != null) {
//          console.dir(doc);
//       } else {
//          callback();
//       }
//    });
// };

function makeDateObject(dataToOrganize) {
  var newDateObject = {};
  newDateObject.year = parseInt(dataToOrganize.slice(0,4),10);
  newDateObject.month = parseInt(dataToOrganize.slice(5,7),10);
  newDateObject.day = parseInt(dataToOrganize.slice(8,10),10);
  newDateObject.hour = parseInt(dataToOrganize.slice(11,13),10);
  newDateObject.minute = parseInt(dataToOrganize.slice(14,16),10);
  return newDateObject;
};

function later(currentData, newDataToCheck) {
  if (currentData.year == newDataToCheck.year) {
    if (currentData.month == newDataToCheck.month) {
      if (currentData.day == newDataToCheck.day) {
        if (currentData.hour == newDataToCheck.hour) {
          if (currentData.minute == newDataToCheck.minute) {
            return currentData;
          } else if (currentData.minute > newDataToCheck.minute) {
            return currentData;
          } else {
            return newDataToCheck;
          }
        } else if (currentData.hour > newDataToCheck.hour) {
          return currentData;
        } else {
          return newDataToCheck;
        }
      } else if (currentData.day > newDataToCheck.day) {
        return currentData;
      } else {
        return newDataToCheck;
      }
    } else if (currentData.month > newDataToCheck.month) {
      return currentData;
    } else {
      return newDataToCheck;
    }
  } else if (currentData.year > newDataToCheck.year) {
    return currentData;
  } else {
    return newDataToCheck;
  }
};


module.exports = router;
