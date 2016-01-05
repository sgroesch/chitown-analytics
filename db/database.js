var mongoose = require('mongoose');

var connectionString = "mongodb://localhost/chitown_crimes";

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
