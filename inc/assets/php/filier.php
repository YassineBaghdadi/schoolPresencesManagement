<?php

  if (isset($_POST['o'])) {
    session_start();
    $f = fopen("cnf", "r") or die("Unable to open file!");

    $c = explode('#', trim(fread($f,filesize("cnf"))));
    // print_r($c);
    fclose($f);
    $conn= mysqli_connect($c[0], $c[1], $c[2], $c[3]);
    if ($_POST['o'] == 'addFilier') {
      if (mysqli_query($conn, 'insert into Filiers(nme)value("'.$_POST['n'].'")')) {
        echo "1";
      }else {
        echo "";
      }
    }
    if ($_POST['o'] == "checkFilierName") {
      $dt = mysqli_query($conn, 'select id from Filiers where nme like  "'.$_POST['n'].'"');
      if (mysqli_num_rows($dt) > 0) {
        echo "1";
      }else {
        echo "";
      }

    }
    if ($_POST['o'] == "fillFiliersTable") {
      $qry = 'select id, nme from Filiers';
      $dt = mysqli_query($conn, $qry);

      $out = "";
      while ($a = mysqli_fetch_array($dt)) {
        $out .= '
        <tr>
            <td>'.$a["nme"].'</td>
            <td><button type="submit" class="btn btn-warning btn-fill btn-wd" onclick="mdfFilier(\''.$a["id"].'\');">Modifier</button></td>
            <td><button type="submit" class="btn btn-danger btn-fill btn-wd" onclick="rmFilier(\''.$a["id"].'\');">Supprimer</button></td>

        </tr>
        ';
      }
      echo $out;

    }
    if ($_POST['o'] == "getFilerInfo") {
      $dt = mysqli_fetch_assoc(mysqli_query($conn, 'select id, nme from Filiers where id = '.$_POST['i']));
      echo json_encode($dt);

    }
    if ($_POST['o'] == "mdfFilier") {
      if(mysqli_query($conn, 'update Filiers set nme = "'.$_POST['n'].'" where id = '.$_POST['i'])){
        echo "2";

      }else {
        echo "";
      }


    }
    if ($_POST['o'] == "rmFilier") {
      if(mysqli_query($conn, 'delete from Filiers where id = '.$_POST['i'])){
        echo "1";

      }else {
        echo "";
      }


    }






    mysqli_close($conn);
}?>
