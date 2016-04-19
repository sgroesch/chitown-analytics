var mongoose = require('mongoose');

var connectionString = "mongodb://heroku_zrbb94rt:91om96o1dd0dulq9kj4r7bf8rs@ds011321.mlab.com:11321/heroku_zrbb94rt";

mongoose.connect(connectionString);

mongoose.connection.on('connected', function () {
  console.log('Connection operational.');
});

mongoose.connection.on('error', function () {
  console.log('Is da broken. ' + error);
});

mongoose.connection.on('disconnected', function () {
  console.log('Connection closed.');
});
