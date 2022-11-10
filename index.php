<?php

    if (isset($_COOKIE['connectedUserToken']) and $_COOKIE['connectedUserToken'] != '') {
      header('Location: index');
    }
    else {
      header('Location: login');
    }
  


 ?>
