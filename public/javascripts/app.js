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
  initialize: function(apiUrl) {
    this.url = apiUrl;
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

// ---------------
// Need to connect this to form input via replacement of hardcoded params with
// form input values!!! This url will then be reusable by maps, also.
// ---------------

  // url: '/api?primary=narcotics&start=09012013&end=01012014'

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
    // var collxnview = document.getElementById('value');
    //
    // collxnview.innerHTML = "";

    // var tempMdl = {
    //   Name: this.model.attributes.Name,
    //   Ingredients: this.model.attributes.Ingredients,
    //   Toppings: this.model.attributes.Toppings
    // };
    // // console.log(tempMdl);
    // var newTemplate = "<tr><td><%= Name %></td><td><%= Ingredients %></td><td><%= Toppings %></td><td><button class='delete'>X</button></td></tr>";
    // var nct = _.template(newTemplate);
    // var collxnrow = document.getElementById('value');
    // collxnrow.innerHTML += nct(tempMdl);

    receive(models);
  }
});

$(document).ready(function () {
  console.log('Crimes!');

  // $("#start_date").datepicker();

  $("#start_date").datepicker({
    dateFormat: "mmddyy"
  });
  $("#end_date").datepicker({
    dateFormat: "mmddyy"
  });

  var selected_pType = '';
  document.getElementById("primary_type").onchange = function(){
    selected_pType = this.value;
  };

  $('#submit').on('click', function () {
    var selected_sDate = $("#start_date").val();
    var selected_eDate = $("#end_date").val();
    var url = '/api?primary=' + selected_pType + '&start=' + selected_sDate + '&end=' + selected_eDate;
    console.log(url);

    active.collection = new app.Collection(url);
  });
});
