
function repaireTemplates(id){



  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (){
    if (this.readyState == 4) {
      if (this.status == 200) {
        $(`#${id}`).html(this.responseText);
      }else {
        // ila kan chi error
      }

    }
  }
  xhttp.open('GET', `../assets/templates/${id}.html`, true);
  xhttp.send();


}

$(document).ready(function(){
      $.ajax({
        type: "POST",
        url: "../assets/php/checkUser.php",
        data: { op: "check"}
      }).done(function( data ) {
        if (data == '0') {
          window.location.href = "../login";
        }
      });


      repaireTemplates('sideBar');
      repaireTemplates('topPanel');


      
      // document.addEventListener("contextmenu", (e)=>{e.preventDefault();}, false);
      // document.onkeydown = function(e) {
      //       if(event.keyCode == 123) {
      //          return false;
      //       }
      //       if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
      //          return false;
      //       }
      //       if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
      //          return false;
      //       }
      //       if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
      //          return false;
      //       }
      //       if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
      //          return false;
      //       }
      // }







});
