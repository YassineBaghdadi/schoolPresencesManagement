


$(document).ready(function(){

  $('#lgnBtn').click(function(){
    // alert('test');
    $.ajax({
      type: "POST",
      url: "lgin.php",
      data: { op: "login"}
    }).done(function( data ) {
      if (data != '1') {
        window.location.href = "Home";
      }else {
        $.notify({
            icon: 'ti-',
            message: "BIENVENUE !<b> </b> - Vous avez 0  absence pour aujourd'hui ."

          },{
              type: 'error',
              timer: 4000
          });
      }
    });
  });

});
