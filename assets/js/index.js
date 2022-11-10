
$.ajax({
  type: "POST",
  url: "./assets/php/checkUser.php",
  data: { op: "check"}
}).done(function( data ) {
  if (data == '0') {
    window.location.href = "login";
  }
});


$(document).ready(function(){




});
