
var cc;

window.onload = function(){

  //Beginning of user form container animations
  $('#login_btn').on('click', function() {
    $('#user_forms_container').show();
    $('#register_form').hide();
    $('#login_form').show();
  });
  // these animation functions enhance the login/ registration process
  $('#register_btn').on('click', function() {
    $('#user_forms_container').show();
    $('#login_form').hide();
    $('#register_form').show();
  });
  //closes the UFC
  $('#close_ufc').on('click', function(){
    $('#user_forms_container').hide();
  });
  //end of the user form container animations

  //beginning of menu animation
  cc = false;

  $('#logocon').on('click', function(){
    var styleChange = {
      margin: "1% 0 10% 0",
      padding: "2% 0",
      fontSize: "5vh"
    };
    var styleRevert = {
      margin: '10% 0 0 0',
      padding: '15% 0',
      fontSize: '10vh'
    };
    if(cc == false){
      $('#logocon').animate(styleChange, 500, function(){
        $('.navList').css({
          display: 'block'
        });
      });
      cc = true;
    }else{
      $('.navList').css({
        display: 'none'
      });
      $('#logocon').animate(styleRevert, 500, function(){});
      cc = false;
    }
  });

  //end of menu animation

  //main nav process

  $('#home_page').on('click', function(){
    $('#landing_page_content').css({
      visibility: 'visibile'
    });
    $('#data_layers_page').css({
      visibility: 'hidden'
    });
  });
  $('#data_page').on('click', function(){

  });

  //end of nav process
  //card nav animation

  var ActiveCard = {
    opacity: '1'
  };
  var opacityZero = {
    opacity: '0'
  }
  // write a function that hides all
  function hideAllAndShowOne(id) {
    $('#info_card').removeClass('inactive').css(opacityZero);
    $('#map_card').removeClass('inactive').css(opacityZero);;
    $('#metric_card').removeClass('inactive').css(opacityZero);;
    $('#info_card').removeClass('active').css(opacityZero);;
    $('#map_card').removeClass('active').css(opacityZero);;
    $('#metric_card').removeClass('active').css(opacityZero);;
    $(id).addClass('active');
  }
  // write a function that shows a specific id show(idName) {
  //
  $('#info_card_btn').on('click', function(){
    hideAllAndShowOne('#info_card');
    $('#info_card').animate(ActiveCard, 500);
  });
  $('#map_card_btn').on('click', function(){
    hideAllAndShowOne('#map_card');
    $('#map_card').addClass('active').animate(ActiveCard, 500, function(){});
  });
  $('#metric_card_btn').on('click', function(){
    hideAllAndShowOne('#metric_card');
    $('#metric_card').animate(ActiveCard, 500, function(){});
  });

  //end of card nav


}
