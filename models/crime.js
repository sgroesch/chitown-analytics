var mongoose = require('mongoose');

var api_schema = new mongoose.Schema({
  arrest: Boolean,
  beat: String,
  block: String,
  case_number: String,
  date: String,
  description: String,
  district: String,
  domestic: Boolean,
  fbi_code: String,
  id: String,
  iucr: String,
  latitude: String,
  longitude: String,
  location_description: String,
  primary_type: String,
  updated_on: String,
  ward: String,
  year: String
});

module.exports = mongoose.model('crime', api_schema, 'crime');
