<?php


  if (isset($_POST['o'])) {
    // session_start();
    $f = fopen("cnf", "r") or die("Unable to open file!");

    $c = explode('#', trim(fread($f,filesize("cnf"))));
    // print_r($c);
    fclose($f);
    $conn= mysqli_connect($c[0], $c[1], $c[2], $c[3]);

    if ($_POST['o'] == 'getStdntsTable') {
      $qr = 'select s.id, concat(s.fname , " ", s.lname) as stdName, g.nme as grp, f.nme as flr from Students s left join Grps g on s.grp = g.id left join Filiers f on g.filier = f.id ';
      if ($_POST['f'] != '') {
        if ($_POST['f'] == 'null') {
          $qr .= 'where g.filier is null ';
        }else {
          $qr .= 'where f.id = '.$_POST['f'].' ';
        }

      }else {
        $qr .= 'where 1 = 1  ';
      }

      if ($_POST['g'] != '') {
        if ($_POST['g'] == 'null') {
          $qr .= 'and s.grp is null ';
        }else {
          $qr .= 'and g.id = '.$_POST['g'].' ';
        }

      }else {
        $qr .= 'and 1 = 1  ';
      }

      if ($_POST['k'] != '') {
        $qr .= 'and (s.fname like "%'.$_POST['k'].'%" or s.lname like "%'.$_POST['k'].'%") ';
      }else {
        $qr .= 'and 1 = 1 ';
      }

      // echo $qr;

      $dt = mysqli_query($conn, $qr);
      $tbl = '';
      while ($a = mysqli_fetch_array($dt)) {
        $abs = mysqli_fetch_assoc(mysqli_query($conn, 'select count(id) as c from SessionDone where stdnt = '.$a["id"].' and presenceStatus = 0'))['c'];
        $lates = mysqli_fetch_assoc(mysqli_query($conn, 'select count(id) as c from SessionDone where stdnt = '.$a["id"].' and presenceStatus = 2'))['c'];
        // TODO: calcul the ponts ......

        $tbl .= '
        <tr>
            <td>
              <input type="checkbox" value="'.$a["id"].'" class="stdntCheckBox">
            </td>
            <td>'.$a["stdName"].'</td>
            <td>'.$a["flr"].'</td>
            <td>'.$a["grp"].'</td>
            <td class="text-center">'.$abs.'</td>
            <td class="text-center">'.$lates.'</td>
            <td>xxxxx</td>
            <td class="text-center">xx</td>
            <td><button class="btn btn-info"  onclick()>Détails</button></td>
            <td><button class="btn btn-warning" onclick()>Modifier</button></td>

        </tr>
        ';

      }

      $flr = '<option value="null">None</option>';

      $dt = mysqli_query($conn, 'select id, nme from Filiers ;');
      while ($a = mysqli_fetch_array($dt)) {
        $flr .= '<option value="'.$a["id"].'">'.$a["nme"].'</option>';
      }
      $grps = '<option value="null">None</option>';

      $dt = mysqli_query($conn, 'select id, nme from Grps where filier is null;');
      while ($a = mysqli_fetch_array($dt)) {
        $grps .= '<option value="'.$a["id"].'">'.$a["nme"].'</option>';
      }


      $out = array('tbl' => $tbl, 'flr' => $flr, 'grps' => $grps);
      echo json_encode($out);



    }

    if ($_POST['o'] == 'getStdntsFilterCombos') {

      $flrs = '<option value="">Tous les Filières</option><option value="null">None</option>';
      $grps = '<option value="">Tous les Groupes</option><option value="null">None</option>';

      $dt = mysqli_query($conn, 'select id, nme from Filiers;');
      while ($a = mysqli_fetch_array($dt)) {
        $flrs .= '
          <option value="'.$a["id"].'">'.$a["nme"].'</option>
        ';
      }
      $dt = mysqli_query($conn, 'select id, nme from Grps;');
      while ($a = mysqli_fetch_array($dt)) {
        $grps .= '
          <option value="'.$a["id"].'">'.$a["nme"].'</option>
        ';
      }
      $out = array('a' => $flrs, 'b' => $grps);
      echo json_encode($out);

    }


    if ($_POST['o'] == 'getGrpsNames') {
      $out = '<option value="null">None</option>';
      $cndtn = ' where filier = '.$_POST['f'];
      if ($_POST['f'] == 'null') {
        $cndtn = ' where filier is null ';
      }
      $dt = mysqli_query($conn, 'select id, nme from Grps '.$cndtn);
      while ($a = mysqli_fetch_array($dt)) {
        $out .= '<option value="'.$a["id"].'">'.$a["nme"].'</option>';
      }

      echo $out;
    }

    if ($_POST['o'] == 'verifyCne') {
      $dt = mysqli_query($conn, 'select id from Students where CNE like "'.$_POST['c'].'"');
      if (mysqli_num_rows($dt) > 0) {
        echo "1";
      }else {
        echo "none";
      }
    }

    if ($_POST['o'] == 'addStdnt') {

      $str = $_POST["fname"]." ".$_POST["lname"] ;
      $usrNme = trim(substr(strstr(strtolower($str), " ", true), 0,1)).".".trim(strstr(strtolower($str), " ", false)).trim(rand(0, 100));
      $psswrd = substr(hash('md5', $str), 0, 10);

      $qr = '
        insert into Students (grp, fname, lname, city, phne, zip, email, usrNme, psswrd, sex, bd, CNE,
                              massar, natinality, adrss, paidAmount, fatherFname, fatherLname, fatherPhone,
                              fatherMail, matherFname, matherLname, matherPhone, matherMail, urgenceName, urgencePhone, urgenceEmail
                              )value(
                '.$_POST["grp"].', "'.$_POST["fname"].'", "'.$_POST["lname"].'", "'.$_POST["cty"].'", "'.$_POST["phne"].'", "'.$_POST["zip"].'", "'.$_POST["mail"].'", "'.$usrNme.'",
                "'.$psswrd.'", "'.$_POST["sx"].'", "'.$_POST["bd"].'", "'.$_POST["cne"].'",
                "'.$_POST["msr"].'", "'.$_POST["orgn"].'", "'.$_POST["adrs"].'", "'.$_POST["paidAmnt"].'", "'.$_POST["fthrfname"].'", "'.$_POST["fthrlname"].'", "'.$_POST["fthrPhne"].'",
                "'.$_POST["fthrMail"].'", "'.$_POST["mtherfname"].'", "'.$_POST["mthrlname"].'", "'.$_POST["mthrphne"].'", "'.$_POST["mthrmail"].'", "'.$_POST["urgnceName"].'",
                "'.$_POST["urgncePhne"].'", "'.$_POST["urgnceemail"].'"
          )

      ';
      if (mysqli_query($conn, $qr)) {
        echo "1";
      }else {
        echo "string";
      }

    }




















    mysqli_close($conn);
}?>
