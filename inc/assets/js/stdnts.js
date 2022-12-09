const cuteToast1 = ({ type, title, message, timer = 5000,  vibrate = [], playSound = null }) => {
  return new Promise(resolve => {
    const body = document.querySelector('body');

    const scripts = document.getElementsByTagName('script');

    let src = '';

    for (let script of scripts) {
      if (script.src.includes('cute-alert.js')) {
        src = script.src.substring(0, script.src.lastIndexOf('/'));
      }
    }

    let templateContainer = document.querySelector('.toast-container');

    if (!templateContainer) {
      body.insertAdjacentHTML(
        'afterend',
        '<div class="toast-container"></div>',
      );
      templateContainer = document.querySelector('.toast-container');
    }

    const toastId = id1();

    const templateContent = `
    <div class="toast-content ${type}-bg" id="${toastId}-toast-content">
      <div>
        <div class="toast-frame">
          <div class="toast-body">
            <img class="toast-body-img" src="./img/${type}.svg" />'
            <div class="toast-body-content">
              <span class="toast-title">${title}</span>
              <span class="toast-message">${message}</span>
            </div>
            <div class="toast-close" id="${toastId}-toast-close">X</div>
          </div>
        </div>
        <div class="toast-timer ${type}-timer"  style="animation: timer${timer}ms linear;>
      </div>
    </div>
    `;

    const toasts = document.querySelectorAll('.toast-content');

    if (toasts.length) {
      toasts[0].insertAdjacentHTML('beforebegin', templateContent);
    } else {
      templateContainer.innerHTML = templateContent;
    }

    const toastContent = document.getElementById(`${toastId}-toast-content`);

    if (vibrate.length > 0) {
      navigator.vibrate(vibrate);
    }

    if (playSound !== null) {
      let sound = new Audio(playSound);
      sound.play();
    }

    setTimeout(() => {
      toastContent.remove();
      resolve();
    }, timer);

    const toastClose = document.getElementById(`${toastId}-toast-close`);

    toastClose.addEventListener('click', () => {
      toastContent.remove();
      resolve();
    });
  });
};

const cuteAlert1 = ({
  type,
  title,
  message,
  img,
  buttonText = 'OK',
  confirmText = 'OK',
  vibrate = [],
  playSound = null,
  cancelText = 'Cancel',
  closeStyle, }) => { return new Promise(resolve => {
    const existingAlert = document.querySelector('.alert-wrapper');

    if (existingAlert) {
      existingAlert.remove();
    }

    const body = document.querySelector('body');

    const scripts = document.getElementsByTagName('script');

    let src = '';

    for (let script of scripts) {
      if (script.src.includes('cute-alert.js')) {
        src = script.src.substring(0, script.src.lastIndexOf('/'));
      }
    }

    let btnTemplate = `
    <button class="alert-button ${type}-bg ${type}-btn">${buttonText}</button>
    `;

    if (type === 'question') {
      btnTemplate = `
      <div class="question-buttons">
        <button class="confirm-button ${type}-bg ${type}-btn">${confirmText}</button>
        <button class="cancel-button error-bg error-btn">${cancelText}</button>
      </div>
      `;
    }

    if (vibrate.length > 0) {
      navigator.vibrate(vibrate);
    }

    if (playSound !== null) {
      let sound = new Audio(playSound);
      sound.play();
    }

    const template = `
    <div class="alert-wrapper">
      <div class="alert-frame">
        ${img !== '' ? '<div class="alert-header ' + type + '-bg">' : '<div>'}
          <span class="alert-close ${
            closeStyle === 'circle'
              ? 'alert-close-circle'
              : 'alert-close-default'
          }">X</span>
          ${img !== '' ? '<img class="alert-img" src="./img/' + type + '.svg" />' : ''}
        </div>
        <div class="alert-body">
          <span class="alert-title">${title}</span>
          <br>
          <span class="alert-message">${message}</span>
          ${btnTemplate}
        </div>
      </div>
    </div>
    `;

    body.insertAdjacentHTML('afterend', template);

    const alertWrapper = document.querySelector('.alert-wrapper');
    const alertFrame = document.querySelector('.alert-frame');
    const alertClose = document.querySelector('.alert-close');

    if (type === 'question') {
      const confirmButton = document.querySelector('.confirm-button');
      const cancelButton = document.querySelector('.cancel-button');

      confirmButton.addEventListener('click', () => {
        alertWrapper.remove();
        resolve('confirm');
      });

      cancelButton.addEventListener('click', () => {
        alertWrapper.remove();
        resolve();
      });
    } else {
      const alertButton = document.querySelector('.alert-button');

      alertButton.addEventListener('click', () => {
        alertWrapper.remove();
        resolve('ok');
      });
    }

    alertClose.addEventListener('click', () => {
      alertWrapper.remove();
      resolve('close');
    });

/*     alertWrapper.addEventListener('click', () => {
      alertWrapper.remove();
      resolve();
    }); */

    alertFrame.addEventListener('click', e => {
      e.stopPropagation();
    });
  });
};

const id1 = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};



function getStdntsFilterCombos(){

  $.ajax({
        type: "POST",
        url: "assets/php/stdnts.php",
        data: {
          o:'getStdntsFilterCombos',

        },
        success: function (d) {
            // alert(d);
            var dd = JSON.parse(d);

            $('#Filieres').html(dd.a);
            $('#Groupes').html(dd.b);
        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });

}

getStdntsFilterCombos();





function getStdntsTable(){
  // console.log($('#Filieres').val());
  $.ajax({
        type: "POST",
        url: "assets/php/stdnts.php",
        data: {
          o:'getStdntsTable',
          f: $('#Filieres').val(),
          g: $('#Groupes').val(),
          k: $('#search').val()
        },
        success: function (d) {
            // alert(d);
            // console.log(d);
            var dd = JSON.parse(d);

            $('#stdntsTbl').html(dd.tbl);
            $('#newStdntWindowFilieres').html(dd.flr);
            $('#newStdntWindowGrps').html(dd.grps);
        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });

}

getStdntsTable();


$('#Actionchoix').change(function (){

  var selected = [];
  $('.stdntCheckBox').each(function () {
    if (this.checked) {
      selected.push($(this).val());
    }
  });

  if (selected.length > 0) {
    if ($(this).val() == '1') {
      $('#stdntCount').html(selected.length);
      document.getElementById("stageDeclrWindow").style.display = "block";
    }else if ($(this).val() == '2') {

    }else if ($(this).val() == '3') {

    }else if ($(this).val() == '4') {

    }
  }else {
    cuteToast1({
                    type: "info",
                    title: "Info",
                    message: "Please select one or more student first .",
                    timer: 5000
                  });
  }

  $(this).val('');
});

$('#stageDeclrWindowCloseBtn').click(function (){
  $('#grpId').html('');
  document.getElementById("stageDeclrWindow").style.display = "none";

});

$('#stageDeclrValidationBtn').click(function (){
  var selected = [];
  $('.stdntCheckBox').each(function () {
    if (this.checked) {
      selected.push($(this).val());
    }
  });
  console.log(selected);
});

$('#Filieres').change(function (){
  // alert('changed');
  getStdntsTable();
});

$('#Groupes').change(function (){
  getStdntsTable();
});

$('#search').on('input', function (){
  getStdntsTable();
});



$('#addNewStdntBtn').click(function (){
  document.getElementById("newStdntWindow").style.display = "block";

});

$('#newStdntWindowCloseBtn').click(function (){
  $('#grpId').html('');
  document.getElementById("newStdntWindow").style.display = "none";

});

$('#newStdntWindowFilieres').change(function (){
  $.ajax({
        type: "POST",
        url: "assets/php/stdnts.php",
        data: {
          o:'getGrpsNames',
          f: $('#newStdntWindowFilieres').val(),

        },
        success: function (d) {

            $('#newStdntWindowGrps').html(d);
        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });
});

$('#newStdntWindowNom').on('input', function (){
  $('#newStdntWindowFatherLname').val($('#newStdntWindowNom').val());


});


$('#newStdntWindowCNE').on('input', function (){
  if ($('#newStdntWindowCNE').val()) {
    $.ajax({
          type: "POST",
          url: "assets/php/stdnts.php",
          data: {
            o:'verifyCne',
            c: $('#newStdntWindowCNE').val(),

          },
          success: function (d) {

            if (d == '1') {
              $('#newStdntWindowCNEErr').html('Invalid');
            }else {
              $('#newStdntWindowCNEErr').html('');
            }

          },
          error: function ( error) {
            console.log(JSON.stringify(error));
          }
      });


  }else {

    $('#newStdntWindowCNEErr').html('');
  }
});

$('#saveNewStdntBtn').click(function (){
  var rr = 0;
  if (!$('#newStdntWindowNomCompletUrgence').val() || !$('#newStdntWindowTelUrgence').val() || !$('#newStdntWindowPrenom').val() || !$('#newStdntWindowNom').val() || !$('#newStdntWindowBD').val() || !$('#newStdntWindowPhone').val() || !$('#newStdntWindowCNE').val()|| !$('#newStdntWindowNationalite').val() || !$('#newStdntWindowAdress').val() || !$('#newStdntWindowCity').val()|| !$('#newStdntWindowPaid').val() || !$('#newStdntWindowZip').val()) {


    if (!$('#newStdntWindowNomCompletUrgence').val()) {
      rr = 600;
     $('#newStdntWindowNomCompletUrgenceErr').html('Required');

   }else {
     $('#newStdntWindowNomCompletUrgenceErr').html('');
   }
    if (!$('#newStdntWindowTelUrgence').val()) {
      rr = 600;
     $('#newStdntWindowTelUrgenceErr').html('Required');

   }else {
     $('#newStdntWindowTelUrgenceErr').html('');
   }

   //  if (!$('#newStdntWindowEMailUrgence').val()) {
   //    rr = 600;
   //   $('#newStdntWindowEMailUrgenceErr').html('Required');
   //
   // }else {
   //   $('#newStdntWindowEMailUrgenceErr').html('');
   // }

    if (!$('#newStdntWindowPrenom').val()) {
      rr = 70;
      $('#newStdntWindowPrenomErr').html('Required');

    }else {
      $('#newStdntWindowPrenomErr').html('');
    }

     if (!$('#newStdntWindowNom').val()) {
       rr = 70;
      $('#newStdntWindowNomErr').html('Required');

    }else {
      $('#newStdntWindowNomErr').html('');
    }

     if (!$('#newStdntWindowBD').val()) {
       rr = 70;
      $('#newStdntWindowBDErr').html('Required');

    }else {
      $('#newStdntWindowBDErr').html('');
    }

     if (!$('#newStdntWindowPhone').val()) {
       rr = 70;
      $('#newStdntWindowPhoneErr').html('Required');

    }else {
      $('#newStdntWindowPhoneErr').html('');
    }
     if (!$('#newStdntWindowCNE').val()) {
       rr = 70;
      $('#newStdntWindowCNEErr').html('Required');

    }else {
      $('#newStdntWindowCNEErr').html('');
    }
     if (!$('#newStdntWindowNationalite').val()) {
       rr = 70;
      $('#newStdntWindowNationaliteErr').html('Required');

    }else {
      $('#newStdntWindowNationaliteErr').html('');
    }
     if (!$('#newStdntWindowAdress').val()) {
       rr = 70;
      $('#newStdntWindowAdressErr').html('Required');

    }else {
      $('#newStdntWindowAdressErr').html('');
    }
     if (!$('#newStdntWindowCity').val()) {
       rr = 70;
      $('#newStdntWindowCityErr').html('Required');

    }else {
      $('#newStdntWindowCityErr').html('');
    }
     if (!$('#newStdntWindowZip').val()) {
       rr = 70;
      $('#newStdntWindowZipErr').html('Required');

    }else {
      $('#newStdntWindowZipErr').html('');
    }
     if (!$('#newStdntWindowPaid').val()) {
       rr = 70;
      $('#newStdntWindowPaidErr').html('Required');

    }else {
      $('#newStdntWindowPaidErr').html('');
    }

    if (rr) {
      document.getElementById('newStdntWindowContent').scrollTo({top: rr, behavior: 'smooth'});

    }
  }else {
    var data = {
      'fname':$('#newStdntWindowPrenom').val(),
      'lname':$('#newStdntWindowNom').val(),
      'grp':$('#newStdntWindowGrps').val(),
      'sx':$('#newStdntWindowSex').val(),
      'bd':$('#newStdntWindowBD').val(),
      'phne':$('#newStdntWindowPhone').val(),
      'mail':$('#newStdntWindowEmail').val(),
      'cne':$('#newStdntWindowCNE').val(),
      'msr':$('#newStdntWindowMassar').val(),
      'orgn':$('#newStdntWindowNationalite').val(),
      'adrs':$('#newStdntWindowAdress').val(),
      'cty':$('#newStdntWindowCity').val(),
      'zip':$('#newStdntWindowZip').val(),
      'paidAmnt':$('#newStdntWindowPaid').val(),
      'fthrfname':$('#newStdntWindowFatherFname').val(),
      'fthrlname':$('#newStdntWindowFatherLname').val(),
      'fthrPhne':$('#newStdntWindowFatherPhone').val(),
      'fthrMail':$('#newStdntWindowFatherMail').val(),
      'mtherfname':$('#newStdntWindowMotherFname').val(),
      'mthrlname':$('#newStdntWindowMotherLname').val(),
      'mthrphne':$('#newStdntWindowMotherPhone').val(),
      'mthrmail':$('#newStdntWindowMotherMail').val(),
      'urgnceName':$('#newStdntWindowNomCompletUrgence').val(),
      'urgncePhne':$('#newStdntWindowTelUrgence').val(),
      'urgnceemail':$('#newStdntWindowEMailUrgence').val(),

    };
    if ($('#modifyStdntID').html()) {
      data['o'] = 'mdfStdnt';
    }else {
      data['o'] = 'addStdnt';
    }
    $.ajax({
          type: "POST",
          url: "assets/php/stdnts.php",
          data: data,
          success: function (d) {
            console.log(d);
            if (d == '1') {
              document.getElementById("newStdntWindow").style.display = "none";
              getStdntsTable();
              cuteToast1({
                type: "success",
                title: "Added",
                message: "the student Added to the database",
                timer: 5000
              });
              $('#newStdntWindowPrenom').val("");
              $('#newStdntWindowNom').val("");
              $('#newStdntWindowGrps').val("");
              $('#newStdntWindowSex').val("");
              $('#newStdntWindowBD').val("");
              $('#newStdntWindowPhone').val("");
              $('#newStdntWindowEmail').val("");
              $('#newStdntWindowCNE').val("");
              $('#newStdntWindowMassar').val("");
              $('#newStdntWindowNationalite').val("");
              $('#newStdntWindowAdress').val("");
              $('#newStdntWindowCity').val("");
              $('#newStdntWindowZip').val("");
              $('#newStdntWindowPaid').val("");
              $('#newStdntWindowFatherFname').val("");
              $('#newStdntWindowFatherLname').val("");
              $('#newStdntWindowFatherPhone').val("");
              $('#newStdntWindowFatherMail').val("");
              $('#newStdntWindowMotherFname').val("");
              $('#newStdntWindowMotherLname').val("");
              $('#newStdntWindowMotherPhone').val("");
              $('#newStdntWindowMotherMail').val("");
              $('#newStdntWindowNomCompletUrgence').val("");
              $('#newStdntWindowTelUrgence').val("");
              $('#newStdntWindowEMailUrgence').val("");
            }else {
              cuteToast1({
                type: "error",
                title: "Error",
                message: "Error please see the logs for more info .",
                timer: 5000
              });
            }
          },
          error: function ( error) {
            console.log(JSON.stringify(error));
          }
      });
  }





});


// TODO: to be continued .......
