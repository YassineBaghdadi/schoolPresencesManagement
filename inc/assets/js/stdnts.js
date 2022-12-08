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

            $('#stdntsTbl').html(d);
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



// TODO: to be continued .......
