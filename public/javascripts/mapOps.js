var lats=[];
    var longs=[];
    var map;
    var markers=[];

    $(document).ready(function(){
      var arr = [];
      var arrSec = [];
      console.log('jquery is ready');

      $.ajax({
        url:'https://data.cityofchicago.org/resource/ijzp-q8t2.json',
        type:'get',
        success:function(data){
          // console.dir(data);
          // console.dir(data[0]['primary_type']);
          fillCrimeSelector('#type','primary_type',data);
          console.log($('option:selected').val());
          for(var crime in data){
              // if($('option:selected').val()=='all'){
              //   addMarker(data[crime]);
              // }
             if(data[crime].primary_type==$('option:selected').val()){
              //  console.log(data[crime]);
               addMarker(data[crime]);
              //  console.log(markers);
            };//end of if statment
          }//end of for in loop

/////////////////////////change event listener
          $('#type').change(function(){
            // console.log($('option:selected').val());
            // console.log('yay!');
            $('#description').empty();
            removeMarkers(markers);
            redrawMap();
            console.log($('#type'));
            getIUCR($('#type').val());
          });//option:selected .change event listener
//////////////////////////////////////////////////////
          $('#description').change(function(){
            removeMarkers(markers);
            redrawMap();
            console.log('yoyoyoyoyo');

          });

        },
        error:function(err){
          console.log(err);
        }
      });//end of ajax call
    });//end of document.ready

///////////function definitions//////////////////////

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
  var arr=[];
  var arrDes=[];
  $.ajax({
    url:'https://data.cityofchicago.org/resource/ijzp-q8t2.json',
    type:'get',
    success:function(data){
      // console.dir(data);
      for(var crime in data){
        if(arr.indexOf(data[crime].primary_type) == -1){
          arr.push(data[crime].primary_type);
        }//end of if statment

        //comparing value from first dropdown to looped
         if(data[crime].primary_type==$('#type option:selected').val() && $('#description option:selected').val()=='All Subtypes'){
          //  console.log(data[crime]);
           addMarker(data[crime]);
          //  console.log(markers);
        }//end of if statment

        if(data[crime].primary_type==$('#type option:selected').val() && $('#description option:selected').val()==data[crime].description){
          addMarker(data[crime]);
        }//end of if statment

      }//end of for-loop
    },
    error:function(err){
      console.log(err);
    }
  });//end of $.ajax

}//end of draw map function

function initMap() {
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
    // console.dir(data[crime][field]);
    if(arr.indexOf(data[crime][field]) == -1){
      arr.push(data[crime][field]);
      // console.log('new type!', data[crime][field]);
        $(id).append('<option id="'+data[crime][field]+'"  value="'+data[crime][field]+'">'+data[crime][field]+'</option>');

    }//end of if statment

  }//end of for-in loop

}//end of fillSelector function

// $.post('/api',{name:'Terry'}, function(data){
//   console.log(data);
// });

// getIUCR('ROBBERY');

function getIUCR(crime){
  $.ajax({
    url:'https://data.cityofchicago.org/resource/c7ck-438e.json',
    type:'get',
    success:function(data){
      var arr=[];
      console.log(data);
      for(var x in data){
        if(data[x].primary_description==crime){
          console.log(data[x]);
          arr.push(data[x].secondary_description);
        }
      }
      console.log('arr: ',arr);
      $('#description').append('<option id="All Subtypes" value="All Subtypes">ALL SUBTYPES</option>');
      for(var i in arr){
        $('#description').append('<option class="poop" id="'+arr[i]+'" value="'+arr[i]+'">'+arr[i]+'</option>');
      }

    },
    error:function(err){
      console.log(err);
    }
  });
}//end getIUCR function
