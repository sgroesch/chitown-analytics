var collection = [];
var crime_by_date = [];
var crime_count_by_date = [];
var tempSorted = [];

function receive(models_array) {
  collection = models_array;
  parseByDate(collection);
  convertToGraphEdible(crime_by_date);
  // convertToUnix(crime_count_by_date);
  // sort(crime_count_by_date);
  setTimeout(function() {
    drawBasic();
  }, 3000);
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
            // console.log(models[i]);
            tempShared.push([compare_against, models[i].attributes]);
            models.splice(i, 1);
        };
      };
    };
  };
  crime_by_date.push(tempShared);
  if (models.length > 0) {
    parseByDate(models);
  }
  else {
    console.log(crime_by_date);
  };
};

function convertToUnix(models) {
  for (var i = 0; i < models.length; i++) {
    models[i][0] = models[i][0].getTime();
  };
  // console.table(crime_count_by_date);
};

function sort(models) {
  var biggest = models[0][0];
  var biggest_index = 0;
  // while (models.length > 0) {
    for (var i = 0; i < models.length; i++) {
      if (models[i][0] >= biggest) {
        biggest = models[i][0];
        biggest_index = i;
      };
    };
    tempSorted.unshift(models[i]);
    models.splice(i, 1);
  // };
  console.log(models);
};

// ---------------
// Proof of concept to convert data to graph readable format.
// ---------------

function convertToGraphEdible(models) {
  for (var i = 0; i < models.length; i++) {
    crime_count_by_date.push([models[i][0][0], models[i].length]);
  };
  // console.log(crime_count_by_date);
};

google.charts.load('current', {packages: ['corechart', 'line']});

function drawBasic() {

    var data = new google.visualization.DataTable();
    data.addColumn('date', 'X');
    data.addColumn('number', 'Incidents');

    for (var i = 0; i < crime_count_by_date.length; i++) {
      data.addRow([crime_count_by_date[i][0], crime_count_by_date[i][1]]);
    }

    var options = {
      hAxis: {
        title: 'Time'
      },
      vAxis: {
        title: 'Incidents'
      }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));

    chart.draw(data, options);
  }
