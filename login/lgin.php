<?php

  if ($_POST['op'] == 'login') {
    // echo "Found";
    include("../assets/php/config.php" );
    $conn= mysqli_connect($DB_server, $DB_user, $DB_pass, $DB_name);
    $cGFzc3dvcmQ = substr(hash('ripemd128', $_POST['pswrd']), -14, -9).'P@$$W0RD'.substr(hash('md5', $_POST['pswrd']), 0, 6).'H@$#3D8Y@$$1N3B@94D@D1'.substr(hash('sha256', $_POST['pswrd']), 5, 15);
    // echo 'select id, usrType, fname, lname from Users where usrNme like "'.$_POST['usrNm'].'" and psswrd like "'.$cGFzc3dvcmQ.'"';
    $data = mysqli_query($conn, 'select id, usrType, fname, lname from Users where usrNme like "'.$_POST['usrNm'].'" and psswrd like "'.$cGFzc3dvcmQ.'"');
    if (mysqli_num_rows($data) > 0) {
      $dt = mysqli_fetch_assoc($data);
      setcookie('connectedUserToken', $dt['id'], time() + (86400), "/");
      setcookie('connectedUserType', $dt['usrType'], time() + (86400), "/");
      setcookie('connectedUserFname', $dt['fname'], time() + (86400), "/");
      setcookie('connectedUserLname', $dt['lname'], time() + (86400), "/");
      echo "1";
    }else {
      echo "0";
    }
  }


 ?>
