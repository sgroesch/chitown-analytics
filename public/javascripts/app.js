var app = app || {};
var active = active || {};

app.Model = Backbone.Model.extend({
  initialize: function() {
    console.log('A model was dynamically generated');
  }
});

// mongodb support
// override the model's idAttribute to '_id'
Backbone.Model.idAttribute = "_id";

app.Collection = Backbone.Collection.extend({
  model: app.Model,
  initialize: function() {
    var self = this;
    console.log('Crimes have been committed!');
    this.on('change', function() {
      console.log('Collection changed.');
      var view = new app.CollectionView(
        {collection: self}
      );
    });
    this.on('sync', function() {
      console.log('Collection synced.');
      var view = new app.CollectionView(
        {collection: self}
      );
    });
    this.fetch();
  },

  // Replace route! ***
  url: '/api'

});

app.CollectionView = Backbone.View.extend({
  initialize: function() {
    console.log('CollectionView start.');
    this.render();
  },
  render: function() {
    console.log('CollectionView render go.');
    var models = this.collection.models;

    // Replace element name! ***
    var collxnview = document.getElementById('value');

    collxnview.innerHTML = "";
    for (var i = 0; i < models.length; i++) {
      new app.ModelView({
        model: models[i]
      });
    };
  }
});

app.ModelView = Backbone.View.extend({
  // Pick a new one.
  // el: $('#something'),
  initialize: function() {
    console.log('A modelView was dynamically generated');
    // console.log(this);
    this.render();
  },
  render: function() {

    // Correct as needed! ***

    var tempMdl = {
      id: this.model.attributes.id,
      caseNumber: this.model.attributes.case_number,
      date: this.model.attributes.date,
      arrest: this.model.attributes.arrest,
      domestic: this.model.attributes.domestic,
      iucr: this.model.attributes.iucr,
      primaryType: this.model.attributes.primary_type,
      description: this.model.attributes.description,
      latitude: this.model.attributes.latitude,
      longitude: this.model.attributes.longitude,
      locationDescription: this.model.attributes.location_description,
      beat: this.model.attributes.beat,
      block: this.model.attributes.block,
      district: this.model.attributes.district,
      ward: this.model.attributes.ward,
      fbiCode: this.model.attributes.fbi_code,
      updatedOn: this.model.attributes.updated_on,
      year: this.model.attributes.year
    };

    console.log(tempMdl);
    
    // Create a new Template (if necessary)! ***
    var newTemplate = "<tr><td><%= Name %></td><td><%= Ingredients %></td><td><%= Toppings %></td><td><button class='delete'>X</button></td></tr>";

    var nct = _.template(newTemplate);

    // Replace element name! ***
    var collxnrow = document.getElementById('value');

    collxnrow.innerHTML += nct(tempMdl);
  }
});

$(document).ready(function () {
  console.log('Crimes!');
  active.collection = new app.Collection();
});
