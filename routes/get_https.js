var http = require('http');
var https = require('https');

// router.get(function(response, request) {
//
//   var req = https.get(url);
//   response.json(req);
//
// });

module.exports.get_resource = function (url) {
  var request = https.get(url, function(response) {
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
        console.log(body);
      }
      else {
        returnError({message: "Status code: " + http.STATUS_CODES[response.statusCode]});
      }
    });
    request.on("error", returnError);
  });

  function returnError (error) {
    console.error('Error: ' + error.message);
  };

}
