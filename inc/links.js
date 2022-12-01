



function getCntnt(id){

  // document.getElementsByClassName('linkBtn').classList.remove("active");
  // document.querySelectorAll(".linkBtn").classList.remove("active");
  let elasticItem = Array.from(document.querySelectorAll(".linkBtn"));
  elasticItem.forEach(function (elem) {
    elem.classList.remove("active");
  });



  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function (){
    if (this.readyState == 4) {

      if (this.status == 200) {
        // console.log(this.responseText);
        $('#cntnt').html(this.responseText);
        $('#ttl').html(id);
        $(`#${id}`).addClass('active');

      }else {
        // ila kan chi error
      }

    }
  }
  xhttp.open('GET', `assets/pgs/${id}.html`, true);
  xhttp.send();


}


$(document).ready(function (){

  getCntnt('Dashboard');


});
