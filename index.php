<?php

    if (isset($_COOKIE['connectedUserToken']) and $_COOKIE['connectedUserToken'] != '') {
      header('Location: Home');
    }
    else {
      header('Location: login');
    }



 ?>
