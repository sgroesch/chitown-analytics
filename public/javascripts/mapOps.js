var lats=[];
var longs=[];
var map;
var markers=[];

$(document).ready(function(){
  var arr = [];

  $.ajax({
    url:'https://data.cityofchicago.org/resource/ijzp-q8t2.json',
    type:'get',
    success:function(data){
      var date = new Date;
      $('#endDate').val(parseDateString(date))
      console.dir(data);
      fillCrimeSelector('#type','primary_type',data);
      for(var crime in data){
         if(data[crime].primary_type==$('option:selected').val()){
           addMarker(data[crime]);
        };//end of if statment
      }//end of for in loop

/////////////////////////change event listener

      $('#type').change(function(){
        $('#description').empty();
        removeMarkers(markers);
        redrawMap();
        getIUCR($('#type').val());
      });

      $('#description').change(function(){
        removeMarkers(markers);
        redrawMap();
      });

      $('#startDate').change(function(){
        removeMarkers(markers);
        redrawMap();
      });

      $('#endDate').change(function(){
        removeMarkers(markers);
        redrawMap();
      });

    },
    error:function(err){
      console.log(err);
    }
  });
}); //end of document.ready

function addMarker (data){
  var marker = new google.maps.Marker({
  position: {lat:parseFloat(data.latitude),lng:parseFloat(data.longitude)},
  map: map,
  icon:'http://megaicons.net/static/img/icons_sizes/15/534/32/map-marker-ball-left-pink-icon.png',
  title: data.primary_type+' ---- '+data.description+' ---- '+data.date,
  animation:google.maps.Animation.DROP
});// end of marker constructor
    markers.push(marker);
  }

function removeMarkers(arr){
  for(var i in arr){
    arr[i].setMap(null);
  }
}

function redrawMap(){
  //array to hold different types of crimes to populate #type selector
  var arr=[];

  $.ajax({
    url:'https://data.cityofchicago.org/resource/ijzp-q8t2.json',
    type:'get',
    success:function(data){

      //loop through each incident
      for(var crime in data){
        //check to see if we have this type accounted for inorder to populate #type selector with unique options dynamically
        if(arr.indexOf(data[crime].primary_type) == -1){
          arr.push(data[crime].primary_type);
        }//end of if statment

        //if this crime is the same type as the selector and the subtype is all Subtypes
         if(data[crime].primary_type==$('#type option:selected').val() && $('#description option:selected').val()=='All Subtypes') {
           //check to see if crime date is within range of startDate and endDate values, grabbed from selectors
           if(isDateInRange(Date.parse(data[crime].date),Date.parse($('#startDate').val()),Date.parse($('#endDate').val()))){
          // add those makres that satisfy the filters
           addMarker(data[crime]);
         }
        }//end of if statment

        //if primary type is the #type selected and crime description is description selected
          if(data[crime].primary_type==$('#type option:selected').val() && $('#description option:selected').val()==data[crime].description){
            if(isDateInRange(Date.parse(data[crime].date),Date.parse($('#startDate').val()),Date.parse($('#endDate').val()))){
              addMarker(data[crime]);
            }//end of if statment
          }
      }//end of for-loop
    },
    error:function(err){
      console.log(err);
    }
  });//end of $.ajax

}//end of draw map function

//puts the map on the screen
function initMap() {
  //chicago coordinates to center the map
  var myLatLng = {lat: 41.845652363, lng: -87.636561415};

  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: myLatLng
  });
}//end of initMap function

function fillCrimeSelector(id,field,data){
  var arr=[];
  var desc=[];
  for(var crime in data){
    if(arr.indexOf(data[crime][field]) == -1){
      arr.push(data[crime][field]);
        $(id).append('<option id="'+data[crime][field]+'"  value="'+data[crime][field]+'">'+data[crime][field]+'</option>');

    }//end of if statment

  }//end of for-in loop

}//end of fillSelector function

//taks an incident and gets the corresponding descriptions and populates the description selector
function getIUCR(crime){
  $.ajax({
    url:'https://data.cityofchicago.org/resource/c7ck-438e.json',
    type:'get',
    success:function(data){
      var arr=[];
      for(var x in data){
        if(data[x].primary_description==crime){
          // console.log(data[x]);
          arr.push(data[x].secondary_description);
        }
      }
      $('#description').append('<option id="All Subtypes" value="All Subtypes">ALL SUBTYPES</option>');
      for(var i in arr){
        $('#description').append('<option id="'+arr[i]+'" value="'+arr[i]+'">'+arr[i]+'</option>');
      }

    },
    error:function(err){
      console.log(err);
    }
  });
}//end getIUCR function

//format time stamp to format needed for html5 date tag
function parseDateString(date){
  date=date.toString();
  var arr=date.split(' ');

  return arr[3]+'-'+getNumberMonthFromName(arr[1])+'-'+arr[2];
}

//takes month abbr 'Jan','Feb' returns '01','02'
function getNumberMonthFromName(str){
  if(str=='Jan'){
    return '01'
  }
  if(str == 'Feb'){
    return '02'
  }
  if(str == 'Mar'){
    return '03'
  }
  if(str == 'Apr'){
    return '04'
  }
  if(str == 'May'){
    return '05'
  }
  if(str == 'Jun'){
    return '06'
  }
  if(str == 'Jul'){
    return '07'
  }
  if(str == 'Aug'){
    return '08'
  }
  if(str == 'Sep'){
    return '09'
  }
  if(str == 'Oct'){
    return '10'
  }
  if(str == 'Nov'){
    return '11'
  }
  if(str == 'Dec'){
    return '12'
  }
}

//takes in a UTC dates in miliseconds and returns true/false if is within those ranges
function isDateInRange(testDate,startDate,endDate){
  if ( startDate <= testDate && testDate <= endDate ) {
    console.log('date is in range');
    return true;
  } else {
    console.log('date is not in range');
    return false;
  }
}
