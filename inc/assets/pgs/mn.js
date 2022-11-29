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

const id1 = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};



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
        data['o'] = 'mdf';


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
                console.log(d);
                $('#teacherLName').val('');
                $('#teacherFName').val('');
                $('#teacherPhone').val('');
                $('#teacherEmail').val('');
                $('#teacherUserName').val('');
                $('#teacherPswrd').val('');
                $('#teacherPswrd2').val('');
                $('#teachermodifyID').html('');
            },
            error: function (request, error) {
                console.log ("ERROR:" + error);
            }
        });
    }


  });

  $('#addFilierBtn').click(function (){

      alert('clicked');
      // cuteToast({
      //   type: "success", // or 'info', 'error', 'warning'
      //   title: " ",
      //   message: "Clicked",
      //   timer: 5000
      // });

      // if (!$('#').val()) {
      //
      // }else if (!$('#').val()) {
      //
      // }else if (!$('#').val()) {
      //
      // }else if (!$('#').val()) {
      //
      // }else if (!$('#').val()) {
      //
      // }else if (!$('#').val()) {
      //
      // }else if (!$('#').val()) {
      //
      // }else if (!$('#').val()) {
      //
      // }else {
      //
      // }


    });
