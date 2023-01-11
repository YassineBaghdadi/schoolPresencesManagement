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


function activateAddBtn(){
  if ($('#planingFiliersCombo').val() && $('#planingGrpsCombo').val() && $('#planingModuleCombo').val() && $('#planingEncadrantsCombo').val() && $('#planingDaysCombo').val() && $('#planingSessionsCombo').val()) {
    $('#addNewPlanningSessionBtn').prop('disabled', false);
  }else {
    $('#addNewPlanningSessionBtn').prop('disabled', true);
  }
}

function getPlanningData(){
  $.ajax({
        type: "POST",
        url: "assets/php/planning.php",
        data: {
          o:'getPlanningData'
        },
        success: function (d) {
          // console.log(d);
          // TODO: get the json for each row and each column
          var dd = JSON.parse(d);
          // console.log(dd);


          $('#planingFiliersCombo').html(dd.f);
          // $('#PlaningTable').html(dd.planningTable);

          $('#pt11').html(dd.planningTable.r1.c1);
          $('#pt12').html(dd.planningTable.r1.c2);
          $('#pt13').html(dd.planningTable.r1.c3);
          $('#pt14').html(dd.planningTable.r1.c4);

          $('#pt21').html(dd.planningTable.r2.c1);
          $('#pt22').html(dd.planningTable.r2.c2);
          $('#pt23').html(dd.planningTable.r2.c3);
          $('#pt24').html(dd.planningTable.r2.c4);

          $('#pt31').html(dd.planningTable.r3.c1);
          $('#pt32').html(dd.planningTable.r3.c2);
          $('#pt33').html(dd.planningTable.r3.c3);
          $('#pt34').html(dd.planningTable.r3.c4);

          $('#pt41').html(dd.planningTable.r4.c1);
          $('#pt42').html(dd.planningTable.r4.c2);
          $('#pt43').html(dd.planningTable.r4.c3);
          $('#pt44').html(dd.planningTable.r4.c4);

          $('#pt51').html(dd.planningTable.r5.c1);
          $('#pt52').html(dd.planningTable.r5.c2);
          $('#pt53').html(dd.planningTable.r5.c3);
          $('#pt54').html(dd.planningTable.r5.c4);

          $('#pt61').html(dd.planningTable.r6.c1);
          $('#pt62').html(dd.planningTable.r6.c2);
          $('#pt63').html(dd.planningTable.r6.c3);
          $('#pt64').html(dd.planningTable.r6.c4);


        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });
}

getPlanningData();

function getSessnDetails(id){

  $.ajax({
        type: "POST",
        url: "assets/php/planning.php",
        data: {
          o:'getSionDetails',i:id
        },
        success: function (d) {
          // console.log(d);
          try {
            var dd = JSON.parse(d);
            $('.overlay').show();
            $('#popUpTcherName').html(dd.tcher);
            $('#popUpGrpName').html(dd.grp);
            $('#popUpFlrName').html(dd.flr);
            $('#popUpMdlName').html(dd.mdl);
            $('#popUpDyName').html(dd.dy);
            $('#popUpTmeName').html(dd.tme);
            $('#stdntsTblBdy').html(dd.tbl);
          } catch (e) {
            console.log(d);
            cuteToast1({
              type: "error",
              title: "Error",
              message: "e",
              timer: 5000
            });
          }


        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });
}


$('#planingFiliersCombo').change(function (){
  activateAddBtn();
  $.ajax({
        type: "POST",
        url: "assets/php/planning.php",
        data: {
          o:'getGrpsFromSelectedFlr',f:$('#planingFiliersCombo').val()
        },
        success: function (d) {
          // console.log(d);
          $('#planingGrpsCombo').html(d);

        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });
});

$('#planingGrpsCombo').change(function (){
  activateAddBtn();

});

$('#planingModuleCombo').change(function (){
  activateAddBtn();
  $.ajax({
        type: "POST",
        url: "assets/php/planning.php",
        data: {
          o:'getTchrFromSelectedMdl',m:$('#planingModuleCombo').val()
        },
        success: function (d) {
          console.log(d);
          $('#planingEncadrantsCombo').html(d);

        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });
});

$('#planingEncadrantsCombo').change(function (){
  activateAddBtn();

});

$('#planingDaysCombo').change(function (){
  activateAddBtn();

});
$('#planingSessionsCombo').change(function (){
  activateAddBtn();

});

$('#addNewPlanningSessionBtn').click(function (){

  $.ajax({
        type: "POST",
        url: "assets/php/planning.php",
        data: {
          o:'addNewPlanningSession',
          f:$('#planingFiliersCombo').val(),
          g:$('#planingGrpsCombo').val(),
          m:$('#planingModuleCombo').val(),
          t:$('#planingEncadrantsCombo').val(),
          d:$('#planingDaysCombo').val(),
          s:$('#planingSessionsCombo').val()
        },
        success: function (d) {
          // console.log(d);
          if (d == '1') {

            $('#planingFiliersCombo').val('');
            $('#planingModuleCombo').val('');
            $('#planingDaysCombo').val('');
            $('#planingSessionsCombo').val('');
            $('#planingEncadrantsCombo').val('');
            $('#planingGrpsCombo').val('');
            activateAddBtn();
            getPlanningData();
            cuteToast1({
              type: "success",
              title: "Saved",
              message: "The session added successfully ",
              timer: 5000
            });

          }else if (d == '2') {
            cuteToast1({
              type: "error",
              title: "Error",
              message: "this group has a session in the same time .",
              timer: 5000
            });

          }else if (d == '3') {
            cuteToast1({
              type: "error",
              title: "Error",
              message: "this Teacher has a session in the same time .",
              timer: 5000
            });

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

});



$('#clsBtn').click(function () {
    $('.overlay').hide();
})
