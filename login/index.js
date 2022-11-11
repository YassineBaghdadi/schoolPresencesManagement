


$(document).ready(function(){
  $.ajax({
    type: "POST",
    url: "../assets/php/checkUser.php",
    data: { op: "check"}
  }).done(function( data ) {
    if (data == '1') {
      window.location.href = "../Home";

    }
  });
  document.addEventListener("contextmenu", (e)=>{e.preventDefault();}, false);
  document.onkeydown = function(e) {
  if(event.keyCode == 123) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
     return false;
  }
  if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
     return false;
  }
}
// alert('test1');
  $('#TG9naW5CdXR0b24').click(function(){
    // alert('test');
    $.ajax({
      type: "POST",
      url: "lgin.php",
      data: { op: "login", usrNm: $('#username').val(), pswrd: $('#password').val()}
    }).done(function( data ) {

      // alert(data);
      if (data == '1') {
        window.location.href = "../Home";
      }else {
        console.log(data);
        $('#username').val('');
        $('#password').val('');
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
