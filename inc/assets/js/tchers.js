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

// /////////////////////////////////// Encadrants ////////////////////////////////////////////

function fillteachersTable(){
  $.ajax({
        type: "POST",
        url: "assets/php/teachers.php",
        data: {
          o:'fillteachersTable'
        },
        success: function (d) {
            // alert(d);
            // console.log(d);

            $('#teachersTable').html(d);
        },
        error: function ( error) {
          console.log(JSON.stringify(error));
        }
    });
}

fillteachersTable();

function mdfTeacher(id){
  $.ajax({
        type: "POST",
        url: "assets/php/teachers.php",
        data: {
          o:'getteacherInfo',i:id
        },
        success: function (d) {
            // alert(d);
            var dt = JSON.parse(d);
            // console.log(dt);
            $('#teacherLName').val(dt.lname);
            $('#teacherFName').val(dt.fname);
            $('#teacherPhone').val(dt.phne);
            $('#teacherEmail').val(dt.email);
            $('#teacherUserName').val(dt.usrNme);
            $('#teachermodifyID').html(dt.id);
            $('#addTeacherBtn').html('Modifier');

        },
        error: function (request, error) {
            console.log ("ERROR:" + error);
        }
    });
}

function rmTeacher(id){
  cuteAlert1({
    type:'question',
    title:'Confirmation',
    message:'please confirm to remove this teacher from the database.',
    confirmText:'remove',
    cancelText:'cancel'

  }).then((e) =>{
    if (e == 'confirm') {
      $.ajax({
            type: "POST",
            url: "assets/php/teachers.php",
            data: {
              o:'rmTeacher',i:id
            },
            success: function (d) {
                // alert(d);
                // var dt = JSON.parse(d);
                // console.log(dt);
                if (d == '1') {
                  cuteToast1({
                    type: "success",
                    title: "Removed",
                    message: "The User has been remeved from the database  .",
                    timer: 5000
                  });
                  fillteachersTable();
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

$('#addTeacherBtn').click(function (){
    if (!$('#teacherLName').val()) {
        $('#teacherLName').focus();
        // $('#teacherLName').addClass(' err');
        // var timeout = setTimeout(function(){
        //   $('#teacherLName').removeClass('err');
        // },3000);
        cuteToast1({
          type: "error",
          title: "Error",
          message: "The Last Name of the Teacher is required to complete the operation .",
          timer: 5000
        });

    }else if (!$('#teacherFName').val()) {
      $('#teacherFName').focus();
      cuteToast1({
        type: "error",
        title: "Error",
        message: "The First Name of the Teacher is required to complete the operation .",
        timer: 5000
      });

    }else if (!$('#teacherPhone').val()) {
      $('#teacherPhone').focus();
      cuteToast1({
        type: "error",
        title: "Error",
        message: "The Phone number of the Teacher is required to complete the operation .",
        timer: 5000
      });

    }else if (!$('#teacherEmail').val()) {
      $('#teacherEmail').focus();
      cuteToast1({
        type: "error",
        title: "Error",
        message: "The E-mail of the Teacher is required to complete the operation .",
        timer: 5000
      });

    }else if (!$('#teacherMatierer').val()) {
      $('#teacherMatierer').focus();
      cuteToast1({
        type: "error",
        title: "Error",
        message: "The Module of the Teacher is required to complete the operation .",
        timer: 5000
      });

    }else if (!$('#teacherUserName').val()) {
      $('#teacherUserName').focus();
      cuteToast1({
        type: "error",
        title: "Error",
        message: "The User Name of the Teacher is required to complete the operation .",
        timer: 5000
      });

    }else {
      var data = {

        "lname": $('#teacherLName').val(),
        "fname": $('#teacherFName').val(),
        "phone": $('#teacherPhone').val(),
        "email": $('#teacherEmail').val(),
        "module": $('#teacherMatierer').val(),
        "usrName": $('#teacherUserName').val()
      }
      if ($('#teachermodifyID').html()) {
        data['o'] = 'mdf';
        data['id'] = $('#teachermodifyID').html();


        if ($('#teacherPswrd').val() || $('#teacherPswrd2').val()) {
          if ($('#teacherPswrd').val() !== $('#teacherPswrd2').val()) {
            $('#teacherPswrd2').focus();
            cuteToast1({
              type: "error",
              title: "Password Confirmation Error",
              message: "please write the same password .",
              timer: 5000
            });
            return;

          }else {
            data['psswrd'] = $('#teacherPswrd2').val();
          }
        }
      }else {
        data['o'] = 'add';
        if (!$('#teacherPswrd').val()) {
          $('#teacherPswrd').focus();
          cuteToast1({
            type: "error",
            title: "Error",
            message: "Please choose a valid password .",
            timer: 5000
          });
          return;
        }else if (!$('#teacherPswrd2').val()) {
          $('#teacherPswrd2').focus();
          cuteToast1({
            type: "error",
            title: "Error",
            message: "Please confirm the password  .",
            timer: 5000
          });
          return;
        }else {
          if ($('#teacherPswrd').val() !== $('#teacherPswrd2').val()) {
            $('#teacherPswrd2').focus();
            cuteToast1({
              type: "error",
              title: "Password Confirmation Error",
              message: "The both passwords are not matched .",
              timer: 5000
            });
            return;
          }else {
            data['psswrd'] = $('#teacherPswrd2').val();
          }
        }
      }



      $.ajax({
            type: "POST",
            url: "assets/php/teachers.php",
            data: data,
            success: function (d) {
                // alert(d);
                // console.log(d);
                fillteachersTable();
                $('#teacherLName').val('');
                $('#teacherFName').val('');
                $('#teacherPhone').val('');
                $('#teacherEmail').val('');
                $('#teacherUserName').val('');
                $('#teacherPswrd').val('');
                $('#teacherPswrd2').val('');
                $('#teachermodifyID').html('');
                $('#addTeacherBtn').html('Ajouter');
                cuteToast1({
                  type: "success",
                  title: "",
                  message: "All the data Saved successfully to the Database .",
                  timer: 5000
                });
            },
            error: function (request, error) {
                console.log ("ERROR:" + error);
            }
        });
    }


  });

function teacherUserNameCheck(){
  // console.log($('#teacherUserName').val());
  if ($('#teacherUserName').val() && $('#teacherUserName').val().length > 5) {
    $.ajax({
          type: "POST",
          url: "assets/php/teachers.php",
          data: {
            o:'checkTacherUserName', u:$('#teacherUserName').val()
          },
          success: function (d) {
            if (d == '1') {
              $('#addTeacherBtn').prop('disabled', true);
              $('#teacherUserNameValid').html('<span style="color: red;">invalid UserName </span>');
            }else {
              $('#addTeacherBtn').prop('disabled', false);
              $('#teacherUserNameValid').html('<span style="color: green;">valid UserName </span>');
            }
          },
          error: function ( error) {
            console.log(JSON.stringify(error));
          }
      });
  }else {
    $('#addTeacherBtn').prop('disabled', true);
    $('#teacherUserNameValid').html('<span style="color: red;">invalid UserName </span>');
  }
}
