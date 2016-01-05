var mongoose = require('mongoose');

var api_schema = new mongoose.Schema({
  id: String,
  caseString: String,
  date: String,
  block: String,
  iucr: String,
  primaryType: String,
  description: String,
  locationDescription: String,
  arrest: Boolean,
  domestic: Boolean,
  beat: String,
  district: String,
  ward: String,
  communityArea: String,
  fbiCode: String,
  xCoordinate: String,
  yCoordinate: String,
  year: String,
  updatedOn: String,
  latitude: String,
  longitude: String,
  location: Object
});

module.exports = (mongoose.model('crime', api_schema, 'crime'));
