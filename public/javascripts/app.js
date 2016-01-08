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
  initialize: function(apiUrl, graphTitle) {
    this.title = graphTitle;
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

    var collxnTitleView = document.getElementById('chart_title');
    collxnTitleView.innerHTML = "";

    var title_gief = {
      graph_title: this.collection.title
    };
    // // console.log(tempMdl);
    var newTemplate = "<h5 style='background-color: #FFFFFF;'><%= graph_title %></h5>";
    var nct = _.template(newTemplate);
    // var collxnrow = document.getElementById('value');
    collxnTitleView.innerHTML = nct(title_gief);

    receive(models);
  }
});

function timeLord (something) {
  newStageOne = '';
  for (var i = 0; i < something.length; i++) {
    if (something[i] == '-') {
      newStageOne = newStageOne + '';
    }
    else {
      newStageOne = newStageOne + something[i];
    };
  };
  var newStageTwo = newStageOne.substr(4,2) + newStageOne.substr(6,2) + newStageOne.substr(0,4);
  return newStageTwo;
};

$(document).ready(function () {
  console.log('Crimes!');


  var pType = document.getElementById("primary_type");

  var sDate = document.getElementById('start_date');
  var eDate = document.getElementById('end_date');

  var submit = document.getElementById('submit');

  submit.onclick = function () {

    var selected_sDate = timeLord(sDate.value);
    var selected_eDate = timeLord(eDate.value);
    var selected_pType = pType.value;
    var url = '/api?primary=' + selected_pType + '&start=' + selected_sDate + '&end=' + selected_eDate;
    console.log(url);

    active.collection = new app.Collection(url, selected_pType.toUpperCase());
  };
});
