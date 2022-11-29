<?php

  if (isset($_POST['o'])) {
    if ($_POST['o'] == "add") {
      $qry = "insert into Users(usrType, fname, lname, phne, email, module, usrNme)value(
        2,
        '".$_POST['fname']."',
        '".$_POST['lname']."',
        '".$_POST['phone']."',
        '".$_POST['email']."',
        '".$_POST['module']."',
        '".$_POST['usrName']."'
        )";
      echo $qry;
    }









  }?>
