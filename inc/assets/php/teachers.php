<?php

  if (isset($_POST['o'])) {
    session_start();
    $f = fopen("cnf", "r") or die("Unable to open file!");

    $c = explode('#', trim(fread($f,filesize("cnf"))));
    fclose($f);
    $conn= mysqli_connect($c[0], $c[1], $c[2], $c[3]);

    if ($_POST['o'] == "add") {
      $t = $_POST['psswrd'];
      $psw = substr(hash('ripemd128', $t), -18, -5).'(YassineBaghdadi.com)'.substr(hash('md5', $t), 0, 6).'(KarimBourir)'.substr(hash('sha256', $t), 11, 20);

      $qry = "insert into Users(usrType, fname, lname, phne, email, module, usrNme, psswrd)value(
        2,
        '".$_POST['fname']."',
        '".$_POST['lname']."',
        '".$_POST['phone']."',
        '".$_POST['email']."',
        '".$_POST['module']."',
        '".$_POST['usrName']."',
        '".$psw."'
        )";

        mysqli_query($conn, $qry);

    }

    if ($_POST['o'] == "mdf") {

      $qry = "
        update  Users set lname = '".$_POST['lname']."', fname = '".$_POST['fname']."', phne = '".$_POST['phone']."', email = '".$_POST['email']."', module = '".$_POST['module']."', usrNme = '".$_POST['usrName']."' where id = ".$_POST['id']."
      ";
      mysqli_query($conn, $qry);
      if (isset($_POST['psswrd'])) {
        $psrd = substr(hash('ripemd128', $_POST['psswrd']), -18, -5).'(YassineBaghdadi.com)'.substr(hash('md5', $_POST['psswrd']), 0, 6).'(KarimBourir)'.substr(hash('sha256', $_POST['psswrd']), 11, 20);
        mysqli_query($conn, "update  Users set psswrd = '".$psrd."' where id = ".$_POST['id']);
      }

      echo "";






    }

    if ($_POST['o'] == "fillteachersTable") {
      $qry = 'select id, concat(fname, " ", lname) as fullName, phne, email, module, usrNme from Users';
      $dt = mysqli_query($conn, $qry);
      $out = "";
      while ($a = mysqli_fetch_array($dt)) {
        $out .= '
        <tr>
            <td>'.$a["fullName"].'</td>
            <td>'.$a["phne"].'</td>
            <td>'.$a["email"].'</td>
            <td>'.$a["module"].'</td>
            <td>'.$a["usrNme"].'</td>
            <td><button type="button" class="btn btn-info btn-fill btn-wd" onclick="mdfTeacher(\''.$a["id"].'\')">Modifier</button></td>
            <td><button type="button" class="btn btn-danger btn-fill btn-wd" onclick="rmTeacher(\''.$a["id"].'\')">Supprimer</button></td>
        </tr>
        ';
      }
      echo $out;

    }
    if ($_POST['o'] == "getteacherInfo") {
      $dt = mysqli_fetch_assoc(mysqli_query($conn, 'select id, fname, lname, phne, email, module, usrNme from Users where id = '.$_POST['i']));
      echo json_encode($dt);

    }








    mysqli_close($conn);

  }?>
