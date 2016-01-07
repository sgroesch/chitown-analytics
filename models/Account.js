var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passport = require('passport-local-mongoose');

var Save = new Schema({
  crime: String,
  subcrime: String,
  year: String,
  location: String
});

var Recent = new Schema({
  crime: String,
  subcrime: String,
  year: String,
  location: String
});

var Account = new Schema({
  username: String, //required names for passport
  password: String, //required names for passport
  email: String,
  savedSearches: [Save],
  recentSearches: [Recent]
});

Account.plugin(passport);

module.exports = mongoose.model('Account', Account);
module.exports = mongoose.model('Save', Save);
module.exports = mongoose.model('Recent', Recent);
