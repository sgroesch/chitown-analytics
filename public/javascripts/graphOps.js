var collection = [];
var crime_by_date = [];
var crime_count_by_date = [];
var tempSorted = [];

function receive(models_array) {
  collection = models_array;
  // Clumps database results by date.
  parseByDate(collection);
  // Calculates number of incidents per date.
  convertToGraphEdible(crime_by_date);
  // Sorts incidents per date by date.
  tempSorted = sortEdible(crime_count_by_date);
  // Draws the graph.
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

// This method sorts clumps of crime by date. Did not actually use this.
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

function convertToGraphEdible(models) {
  for (var i = 0; i < models.length; i++) {
    crime_count_by_date.push([models[i][0][0].getTime(), models[i].length]);
  };
  // console.log(crime_count_by_date);
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

// Used Highcharts for graphing.
// function draw () {
//     $('#container').highcharts({
//         chart: {
//             type: 'column'
//         },
//         title: {
//             text: 'Crime in Chicago'
//         },
//         subtitle: {
//             text: 'For shame, Chicago!'
//         },
//         xAxis: {
//             type: 'datetime',
//             dateTimeLabelFormats: {
//                 day: '%e. %b'
//             },
//             labels: {
//                 rotation: -45,
//                 style: {
//                     fontSize: '13px',
//                     fontFamily: 'Verdana, sans-serif'
//                 }
//             }
//         },
//         yAxis: {
//             min: 0,
//             title: {
//                 text: 'Number of Incidents'
//             }
//         },
//         legend: {
//             enabled: false
//         },
//         tooltip: {
//             pointFormat: 'Crime: <b>{point.y:.1f} incidents</b>'
//         },
//         series: [{
//             name: 'Population',
//             data: tempSorted,
//             dataLabels: {
//                 enabled: true,
//                 rotation: -90,
//                 color: '#FFFFFF',
//                 align: 'right',
//                 format: '{point.y:.1f}', // one decimal
//                 y: 10, // 10 pixels down from the top
//                 style: {
//                     fontSize: '13px',
//                     fontFamily: 'Verdana, sans-serif'
//                 }
//             }
//         }]
//     });
// };

function draw () {

    $('#chart_div').highcharts({
        chart: {
            zoomType: 'x'
        },
        title: {
            text: 'Crime Incidences of This Type over the Given Period'
        },
        subtitle: {
            text: document.ontouchstart === undefined ?
                    'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            title: {
                text: 'Incidents'
            }
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            area: {
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, Highcharts.getOptions().colors[0]],
                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                    ]
                },
                marker: {
                    radius: 2
                },
                lineWidth: 1,
                states: {
                    hover: {
                        lineWidth: 1
                    }
                },
                threshold: null
            }
        },

        series: [{
            type: 'area',
            name: 'Crime over Time',
            data: tempSorted
        }]
    });
};
