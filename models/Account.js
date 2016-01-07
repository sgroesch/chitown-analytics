var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Search = new Schema({
  primarycrime: String,
  subcrime: String,
  timeStart: String,
  timeEnd: String,
  location: String
});

var Account = new Schema({
  username: String, //required names for passport
  password: String, //required names for passport
  email: String,
  savedSearches: [Search]
});

Account.plugin(passportLocalMongoose);

module.exports.Account = mongoose.model('Account', Account);
module.exports.Search = mongoose.model('Search', Search);
