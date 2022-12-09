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






function fillFiliersTable(){
  $.ajax({
        type: "POST",
        url: "assets/php/filier.php",
        data: {
          o:'fillFiliersTable'
        },
        success: function (d) {
            // alert(d);
            // console.log(d);

            $('#filiersTable').html(d);
        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });
}

fillFiliersTable();

function filierNameCheck(){
  // console.log($.trim($('#NomFiliere').val()));
  if ($.trim($('#NomFiliere').val())) {
    $.ajax({
          type: "POST",
          url: "assets/php/filier.php",
          data: {
            o:'checkFilierName', n:$.trim($('#NomFiliere').val())
          },
          success: function (d) {
            if (d == '1') {
              $('#addFilierBtn').prop('disabled', true);
              $('#filierNameValid').html('<span style="color: red;">invalid Name </span>');
            }else {
              $('#addFilierBtn').prop('disabled', false);
              $('#filierNameValid').html('<span style="color: green;">valid Name </span>');
            }
          },
          error: function ( error) {
            console.log(JSON.stringify(error));
          }
      });
  }else {
    $('#addFilierBtn').prop('disabled', true);
    $('#filierNameValid').html('<span style="color: red;">invalid Name </span>');
  }
}

$('#addFilierBtn').click(function (){
  if (!$.trim($('#NomFiliere').val())) {
        cuteToast({
          type: "error", // or 'info', 'error', 'warning'
          title: " ",
          message: "Please write a valid Name .",
          timer: 5000
        });
      }else {
        var data = {"n":$.trim($('#NomFiliere').val())};
        if ($('#filierModifyID').html()) {
          data['o'] = 'mdfFilier';
          data['i'] = $('#filierModifyID').html();

        }else {
          data['o'] = 'addFilier';
        }


        $.ajax({
              type: "POST",
              url: "assets/php/filier.php",
              data: data,
              success: function (d) {
                console.log(d);
                fillFiliersTable();

                if (d == '1') {
                  cuteToast({
                    type: "success", // or 'info', 'error', 'warning'
                    title: " ",
                    message: "added",
                    timer: 5000
                  });
                  $('#NomFiliere').val('');
                  $('#addFilierBtn').html('Ajouter');
                  $('#filierModifyID').html('');

                }else if (d == '2') {
                  cuteToast({
                    type: "success", // or 'info', 'error', 'warning'
                    title: " ",
                    message: "Modified",
                    timer: 5000
                  });
                  $('#NomFiliere').val('');
                  $('#addFilierBtn').html('Ajouter');
                  $('#filierModifyID').html('');

                }else {
                  cuteToast({
                    type: "error", // or 'info', 'error', 'warning'
                    title: " ",
                    message: "the operation failed .",
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

function mdfFilier(id){
  $.ajax({
        type: "POST",
        url: "assets/php/filier.php",
        data: {
          o:'getFilerInfo',i:id
        },
        success: function (d) {
            // alert(d);
            var dt = JSON.parse(d);
            // console.log(dt);
            $('#NomFiliere').val(dt.nme);
            $('#filierModifyID').html(dt.id);
            $('#addFilierBtn').html('Modifier');

        },
        error: function (request, error) {
            console.log ("ERROR:" + error);
        }
    });
}

function rmFilier(id){
  cuteAlert1({
    type:'question',
    title:'Confirmation',
    message:'please confirm to remove this Filier from the database.',
    confirmText:'remove',
    cancelText:'cancel'

  }).then((e) =>{
    if (e == 'confirm') {
      $.ajax({
            type: "POST",
            url: "assets/php/filier.php",
            data: {
              o:'rmFilier',i:id
            },
            success: function (d) {
                // alert(d);
                // var dt = JSON.parse(d);
                // console.log(dt);
                if (d == '1') {
                  cuteToast1({
                    type: "success",
                    title: "Removed",
                    message: "The Filier has been remeved from the database .",
                    timer: 5000
                  });
                  fillFiliersTable();
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
