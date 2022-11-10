<?php

  if ($_POST['op'] == 'login') {
    // echo "Found";
    include(dirname(__FILE__)." ../config.php" );
    $conn= mysqli_connect($DB_server, $DB_user, $DB_pass, $DB_name);

    $data = mysqli_query($conn, 'select id, usrType, fname, lname from Users where usrName like "'.$_POST['usrNm'].'" and psswrd like "'.password_hash($_POST['pswrd'], PASSWORD_DEFAULT).'"');
    if (mysqli_num_rows($data)) {
      setcookie('connectedUserToken', $data['id'], time() + (86400), "/");
      setcookie('connectedUserType', $data['usrType'], time() + (86400), "/");
      setcookie('connectedUserFname', $data['fname'], time() + (86400), "/");
      setcookie('connectedUserLname', $data['lname'], time() + (86400), "/");
      echo "1";
    }else {
      echo "0";
    }
  }


 ?>
