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










function fillGrpsData(){
  $.ajax({
        type: "POST",
        url: "assets/php/grps.php",
        data: {
          o:'fillGrpsData'
        },
        success: function (d) {
            // alert(d);
            // console.log(d);
            dd = JSON.parse(d);
            // console.log(dd.b);

            $('#GrpFiliersCombo').html(dd.a);
            $('#grpsTable').html(dd.b);
            $('#stdntsWithoutGrpTable').html(dd.c);
        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });
}

fillGrpsData();

$('#addGrpBtn').click(function (){
    // alert('clicked');
    if (!$('#GrpName').val()) {
        $('#GrpName').focus();
        // $('#teacherLName').addClass(' err');
        // var timeout = setTimeout(function(){
        //   $('#teacherLName').removeClass('err');
        // },3000);
        cuteToast1({
          type: "error",
          title: "Error",
          message: "The Name of the Group is required to complete the operation .",
          timer: 5000
        });

    }else {
      var data = {
        "gname": $('#GrpName').val(),
        "flr": $('#GrpFiliersCombo').val()
      }
      if ($('#grpModifyID').html()) {
        data['o'] = 'mdfGrp';
        data['id'] = $('#grpModifyID').html();

      }else {
        data['o'] = 'addGrp';
      }
      // console.log(data);
      $.ajax({
            type: "POST",
            url: "assets/php/grps.php",
            data: data,
            success: function (d) {
                // alert(d);
                console.log(d);
                // fillteachersTable();
                if (d == '1') {
                  $('#GrpName').val('');
                  $('#GrpFiliersCombo').val('null');
                  $('#addGrpBtn').html('Ajouter');
                  fillGrpsData();
                  cuteToast1({
                    type: "success",
                    title: "",
                    message: "All the data Saved successfully to the Database .",
                    timer: 5000
                  });

                }else {
                  cuteToast1({
                    type: "error",
                    title: "",
                    message: "the operation failed .",
                    timer: 5000
                  });
                }

            },
            error: function (request, error) {
                console.log ("ERROR:" + error);
            }
        });
    }


  });

function mdfGrp(id, gnm, flr){
  var fllr = flr;
  if (!flr) {
    fllr = 'null'
  }
  $('#addGrpBtn').html('Modifier');
  $('#grpModifyID').html(id);
  $('#GrpName').val(gnm);
  $('#GrpFiliersCombo').val(fllr);


}


function rmGrp(id){
  cuteAlert1({
    type:'question',
    title:'Confirmation',
    message:'please confirm to remove this Group from the database.',
    confirmText:'remove',
    cancelText:'cancel'

  }).then((e) =>{
    if (e == 'confirm') {
      $.ajax({
            type: "POST",
            url: "assets/php/grps.php",
            data: {
              o:'rmGrp',i:id
            },
            success: function (d) {
                // alert(d);
                // var dt = JSON.parse(d);
                // console.log(dt);
                if (d == '1') {
                  cuteToast1({
                    type: "success",
                    title: "Removed",
                    message: "The Group has been remeved from the database .",
                    timer: 5000
                  });
                  fillGrpsData();
                }else {
                  console.log(d);
                  cuteToast1({
                    type: "error",
                    title: "Error",
                    message: "removing error please see the logs for more info .",
                    timer: 5000
                  });
                }

            },
            error: function (request, error) {
                console.log ("ERROR:" + error);
            }
        });
    }else {

    }
  });

}

function getGrpStudentManagementData(){
  $.ajax({
        type: "POST",
        url: "assets/php/grps.php",
        data: {
          o:'getGrpStudentManagementData', i:$('#grpId').html()
        },
        success: function (d) {
            // alert(d);
            // console.log(d);
            dd = JSON.parse(d);
            // console.log(dd.b);

            $('#stgntsWithoutGrpCombo').html(dd.a);
            $('#GrpStdntsTable').html(dd.b);
            if ($('#stgntsWithoutGrpCombo').val()) {

              $('#assignStdntToGrpBtn').attr("disabled", false);
            }else {
              $('#assignStdntToGrpBtn').attr("disabled", true);

            }
        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });
}

function stdntsMngmnt(id, nme){
  $('#grpId').html(id);
  $('#grpNamePopUp').html(nme);

  getGrpStudentManagementData();
  document.getElementById("stdntsManagementWindow").style.display = "block";

}

$('#stdntsMngmntCloseBtn').click(function (){
  $('#grpId').html('');
  document.getElementById("stdntsManagementWindow").style.display = "none";
  fillGrpsData();
});

function removeStdntFromGrp(s, g, sname, gname){
  cuteAlert1({
    type:'question',
    title:'Confirmation',
    message:'Please confirm to remove the student '+sname +' from the group '+gname +' .',
    confirmText:'remove',
    cancelText:'cancel'

  }).then((e) =>{
    if (e == 'confirm') {
      $.ajax({
            type: "POST",
            url: "assets/php/grps.php",
            data: {
              o:'removeStdntFromGrp',s:s, g:g
            },
            success: function (d) {
                // alert(d);
                // var dt = JSON.parse(d);
                // console.log(dt);
                if (d == '1') {
                  cuteToast1({
                    type: "success",
                    title: "Removed",
                    message: "the student "+sname+" removed from the Group "+gname,
                    timer: 5000
                  });
                  getGrpStudentManagementData();
                }else {
                  console.log(d);
                  cuteToast1({
                    type: "error",
                    title: "Error",
                    message: "Error please see the logs for more info .",
                    timer: 5000
                  });
                }

            },
            error: function (request, error) {
                console.log ("ERROR:" + error);
            }
        });
    }else {

    }
  });
}

$('#stgntsWithoutGrpCombo').change( function (){

  if ($('#stgntsWithoutGrpCombo').val()) {

    $('#assignStdntToGrpBtn').attr("disabled", false);
  }else {
    $('#assignStdntToGrpBtn').attr("disabled", true);

  }
});

$('#assignStdntToGrpBtn').click(function (){

  if ($('#stgntsWithoutGrpCombo').val()) {
    $.ajax({
          type: "POST",
          url: "assets/php/grps.php",
          data: {
            o:'assignStdntToGrp',s:$('#stgntsWithoutGrpCombo').val(), g:$('#grpId').html()
          },
          success: function (d) {
              // alert(d);
              // var dt = JSON.parse(d);
              console.log(d);
              if (d == '1') {
                cuteToast1({
                  type: "success",
                  title: "Removed",
                  message: "the student "+$("#stgntsWithoutGrpCombo option:selected").text()+" has been assigned to this Group ",
                  timer: 5000
                });
                getGrpStudentManagementData();
              }else {
                console.log(d);
                cuteToast1({
                  type: "error",
                  title: "Error",
                  message: "Error please see the logs for more info .",
                  timer: 5000
                });
              }

          },
          error: function (request, error) {
              console.log ("ERROR:" + error);
          }
      });

  }else {

  }
});
