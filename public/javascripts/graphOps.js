var collection = [];
var crime_by_date = [];
var crime_count_by_date = [];
var tempSorted = [];

function receive(models_array) {
  collection = models_array;
  parseByDate(collection);
  convertToGraphEdible(crime_by_date);
};

// This method clumps crimes together by date
function parseByDate(models) {
  var tempShared = [];
  var initial_time = new Date(models[models.length - 1].attributes.date);
  for (var i = models.length - 1; i >= 0; i--) {
    var compare_against = new Date(models[i].attributes.date);
    if(initial_time.getFullYear() == compare_against.getFullYear()) {
      if (initial_time.getMonth() == compare_against.getMonth()) {
        if (initial_time.getDate() == compare_against.getDate()) {
          tempShared.push([compare_against, models[i].attributes.primary_type]);
          models.splice(i, 1);
        };
      };
    };
  };
  crime_by_date.push(tempShared);
  // console.log(crime_by_date);
  if (models.length > 0) {
    parseByDate(models);
  }
  else {
    // console.log(crime_by_date);
  };
};

function sortThisMotherfucker (models) {
  var latest = models[i][0][0];
  var latest_index = 0;
  while (models.length >= 0) {
    for (var i = models.length - 1; i >= 0; i--) {
      if (models[i - 1][0][0] != null) {
        if (models[i - 1][0][0].getFullYear() >= latest.getFullYear()) {
          if (models[i - 1][0][0].getMonth() >= latest.getMonth()) {
            if (models[i - 1][0][0].getDate() >= latest.getDate()) {
              latest = models[i - 1][0][0];
              latest_index = i - 1;
            };
          };
        };
      }
      else {
        latest = models[i][0][0];
        latest_index = i;
      };
    };
    tempSorted.push(models[latest_index]);
    models.splice(latest_index, 1);
  };
};

// ---------------
// Proof of concept to convert data to graph readable format.
// ---------------

function convertToGraphEdible (models) {
  for (var i = 0; i < models.length; i++) {
    crime_count_by_date.push([models[i][0][0], models[i].length]);
  };
  crime_count_by_date.unshift(['Date', 'Incidences']);
  console.table(crime_count_by_date);
};

google.load("visualization", "1", {packages:["corechart"]});
google.setOnLoadCallback(drawChart);
function drawChart() {
  var data = google.visualization.arrayToDataTable(crime_count_by_date);

  var options = {
    title: 'Crime over Time',
    hAxis: {title: 'Date', minValue: new Date(2011, 1, 1), maxValue: new Date(2014, 1, 1)},
    vAxis: {title: 'Incidences', minValue: 0, maxValue: 50},
    legend: 'none'
  };

  var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

  chart.draw(data, options);
};
