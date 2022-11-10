


$(document).ready(function(){
// alert('test1');
  $('#TG9naW5CdXR0b24').click(function(){
    // alert('test');
    $.ajax({
      type: "POST",
      url: "lgin.php",
      data: { op: "login", usrNm: $('#dXNlcm5hbWU').val(), pswrd: $('#cGFzc3dvcmQ').val()}
    }).done(function( data ) {

      // alert(data);
      if (data == '1') {
        window.location.href = "Home";
      }else {
        $('#dXNlcm5hbWU').val('');
        $('#cGFzc3dvcmQ').val('');
        cuteToast({
          type: "error",
          title: "Login Failed",
          message: 'please check the login entries and try again ...',
          timer: 2500
        }).then(() => {

        });
      }
    });
  });

});
