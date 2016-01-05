var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passport = require('passport-local-mongoose');

var Account = new Schema({
  username: String, //required names for passport
  password: String, //required names for passport
  email: String,
  savedSearches: Array
});

Account.plugin(passport);

module.exports = mongoose.model('Account', Account);
