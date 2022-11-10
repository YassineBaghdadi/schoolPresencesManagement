<?php

  if ($_POST['op'] == 'check') {
    if (isset($_COOKIE['connectedUserToken']) and $_COOKIE['connectedUserToken'] != '') {
      echo "1";
    }
    else {
      echo "0";
    }
  }


 ?>
