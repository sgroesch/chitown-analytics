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
  requestResource('https://data.cityofchicago.org/resource/ijzp-q8t2.json?$order=:id');

  crime.find(function(err, crimes) {
    if (err) {
      returnError(err);
    } else {
      res.json(crimes);
    }
  });
});

router.get('/robberies', function(request, response, next) {
  console.log('robbery.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var robberies = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'ROBBERY') { robberies.push(incident); };
    });
    console.log(robberies);
    response.json(robberies);
  });
});

// ---------------
// To call: /narcotics?start=MmddYYYY&end=MmddYYYY
// ---------------

router.get('/narcotics', function(request, response, next) {
  console.log('narcotics.');

  var startPeriodTime = request.param('start');
  var endPeriodTime = request.param('end');

  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var narcotics = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'NARCOTICS') {
        var incident_time = new Date(incident.date);
        if (compareDate(startPeriodTime, endPeriodTime, incident_time) === true) {
          narcotics.push(incident);
        };
      };
    });
    console.log(narcotics);
    response.json(narcotics);
  });
});

router.get('/burglaries', function(request, response, next) {
  console.log('burglary.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var burglaries = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'BURGLARY') { burglaries.push(incident); };
    });
    console.log(burglaries);
    response.json(burglaries);
  });
});

router.get('/batteries', function(request, response, next) {
  console.log('battery.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var batteries = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'BATTERY') { batteries.push(incident); };
    });
    console.log(batteries);
    response.json(batteries);
  });
});

router.get('/officer_interference', function(request, response, next) {
  console.log('officer interference.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var interferences = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'INTERFERENCE WITH PUBLIC OFFICER') { interferences.push(incident); };
    });
    console.log(interferences);
    response.json(interferences);
  });
});

router.get('/thefts', function(request, response, next) {
  console.log('theft.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var thefts = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'THEFT') { thefts.push(incident); };
    });
    console.log(thefts);
    response.json(thefts);
  });
});

router.get('/motor_thefts', function(request, response, next) {
  console.log('motor theft.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var motor_thefts = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'MOTOR VEHICLE THEFT') { motor_thefts.push(incident); };
    });
    console.log(motor_thefts);
    response.json(motor_thefts);
  });
});

router.get('/assaults', function(request, response, next) {
  console.log('assault.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var assaults = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'ASSAULT') { assaults.push(incident); };
    });
    console.log(assaults);
    response.json(assaults);
  });
});

router.get('/child_offenses', function(request, response, next) {
  console.log('offenses involving children.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var child_offenses = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'OFFENSE INVOLVING CHILDREN') { child_offenses.push(incident); };
    });
    console.log(child_offenses);
    response.json(child_offenses);
  });
});

router.get('/sexual_assaults', function(request, response, next) {
  console.log('sexual assault.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var sexual_assaults = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'CRIM SEXUAL ASSAULT') { sexual_assaults.push(incident); };
    });
    console.log(sexual_assaults);
    response.json(sexual_assaults);
  });
});

router.get('/sex_offenses', function(request, response, next) {
  console.log('sex offenses.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var sex_offenses = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'SEX OFFENSE') { sex_offenses.push(incident); };
    });
    console.log(sex_offenses);
    response.json(sex_offenses);
  });
});

router.get('/kidnappings', function(request, response, next) {
  console.log('kidnapping.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var kidnappings = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'KIDNAPPING') { kidnappings.push(incident); };
    });
    console.log(kidnappings);
    response.json(kidnappings);
  });
});

router.get('/homicides', function(request, response, next) {
  console.log('homicide.');
  crime.find(function(error, incidents) {
    if (error) { console.log('items not found.'); };
    var homicides = [];
    incidents.forEach(function(incident) {
      if (incident.primary_type == 'HOMICIDE') { homicides.push(incident); };
    });
    console.log(homicides);
    response.json(homicides);
  });
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

function compareDate (startPeriod, endPeriod, objTime) {
  // console.log(startPeriod + ', ' + endPeriod);
  var startString = startPeriod.substr(4,4) + '-' + startPeriod.substr(0,2) + '-' + startPeriod.substr(2,2) + 'T12:00:00';
  var endString = endPeriod.substr(4,4) + '\-' + endPeriod.substr(0,2) + '\-' + endPeriod.substr(2,2) + 'T12:00:00';
  // console.log(startString + ', ' + endString);
  var startTime = new Date(startString);
  var endTime = new Date(endString);
  // console.log(startTime + ', ' + endTime);

  if (startTime.getTime() <= objTime.getTime() && endTime.getTime() >= objTime.getTime()) {
    return true;
  };
  return false;
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

module.exports = router;
