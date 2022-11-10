<?php

    if (isset($_COOKIE['connectedUserToken']) and $_COOKIE['connectedUserToken'] != '') {
      header('Location: home');
    }
    else {
      header('Location: login');
    }



 ?>
