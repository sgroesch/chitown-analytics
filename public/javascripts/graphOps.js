var collection = [];
var crime_by_date = [];
var crime_count_by_date = [];
var tempSorted = [];

function receive(models_array) {
  collection = models_array;
  parseByDate(collection);
  convertToGraphEdible(crime_by_date);
  tempSorted = sortEdible(crime_count_by_date);
  // drawBasic();
  draw();
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
    // console.log(crime_by_date);
  };
};

function sortClumps (clumped) {
  var bigArray = [];

  while (clumped.length > 0) {
    var biggest = 0;
    var bigIndex = 0;
    for (var i = 0; i < clumped.length; i++) {
      if (clumped[i][0][0].getTime() > biggest) {
        biggest = clumped[i][0][0].getTime();
        bigIndex = i;
      };
    };
    bigArray.unshift(clumped[bigIndex]);
    clumped.splice(bigIndex, 1);
  };
  return bigArray;
};

function sortEdible (yumyums) {
  var bigArray = [];

  while (yumyums.length > 0) {
    var biggest = 0;
    var bigIndex = 0;
    for (var i = 0; i < yumyums.length; i++) {
      if (yumyums[i][0] > biggest) {
        biggest = yumyums[i][0];
        bigIndex = i;
      };
    };
    bigArray.unshift(yumyums[bigIndex]);
    yumyums.splice(bigIndex, 1);
  };
  console.log(bigArray);
  return bigArray;
};

// ---------------
// Proof of concept to convert data to graph readable format.
// ---------------

function convertToGraphEdible(models) {
  for (var i = 0; i < models.length; i++) {
    crime_count_by_date.push([models[i][0][0].getTime(), models[i].length]);
  };
  // console.log(crime_count_by_date);
};

// google.charts.load('current', {packages: ['corechart', 'line']});
// function drawBasic() {
//
//   var data = new google.visualization.DataTable();
//   data.addColumn('date', 'X');
//   data.addColumn('number', 'Incidents');
//
//   for (var i = 0; i < tempSorted.length; i++) {
//     data.addRow([tempSorted[i][0], tempSorted[i][1]]);
//   }
//
//   var options = {
//     hAxis: {
//       title: 'Time'
//     },
//     vAxis: {
//       title: 'Incidents'
//     }
//   };
//
//   var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
//
//   chart.draw(data, options);
// }

function draw () {
    $('#container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Homicides in Chicago'
        },
        subtitle: {
            text: 'Weekly Tragedy'
        },
        xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: {
                day: '%e. %b'
            },
            labels: {
                rotation: -45,
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Homicide Deaths'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: 'Homicide: <b>{point.y:.1f} incidents</b>'
        },
        series: [{
            name: 'Population',
            data: tempSorted,
            dataLabels: {
                enabled: true,
                rotation: -90,
                color: '#FFFFFF',
                align: 'right',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    });
};
