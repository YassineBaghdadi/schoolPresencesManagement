<?php


  if (isset($_POST['o'])) {
    // session_start();
    $f = fopen("cnf", "r") or die("Unable to open file!");

    $c = explode('#', trim(fread($f,filesize("cnf"))));
    // print_r($c);
    fclose($f);
    $conn= mysqli_connect($c[0], $c[1], $c[2], $c[3]);

    if ($_POST['o'] == 'getPlanningData') {
      // TODO: get teh detailled sessions

      $pt11 = '';
      $pt12 = '';
      $pt13 = '';
      $pt14 = '';

      $pt21 = '';
      $pt22 = '';
      $pt23 = '';
      $pt24 = '';

      $pt31 = '';
      $pt32 = '';
      $pt33 = '';
      $pt34 = '';

      $pt41 = '';
      $pt42 = '';
      $pt43 = '';
      $pt44 = '';

      $pt51 = '';
      $pt52 = '';
      $pt53 = '';
      $pt54 = '';

      $pt61 = '';
      $pt62 = '';
      $pt63 = '';
      $pt64 = '';

      $pt = array(
        'r1' => array(
            'c1' => '',
            'c2' => '',
            'c3' => '',
            'c4' => ''),
        'r2' => array(
            'c1' => '',
            'c2' => '',
            'c3' => '',
            'c4' => ''),
        'r3' => array(
            'c1' => '',
            'c2' => '',
            'c3' => '',
            'c4' => ''),
        'r4' => array(
            'c1' => '',
            'c2' => '',
            'c3' => '',
            'c4' => ''),
        'r5' => array(
            'c1' => '',
            'c2' => '',
            'c3' => '',
            'c4' => ''),
        'r6' => array(
            'c1' => '',
            'c2' => '',
            'c3' => '',
            'c4' => '')

      );


      $qr = 'select s.dy, s.sessn, s.id as sid, g.nme as gname, concat(t.fname, " ", t.lname) as tcher, t.module as mdl from
      PlanedSeassion s inner join Grps g on s.grp = g.id inner join Users t on s.tcher = t.id ';
      $dt = mysqli_query($conn, $qr);
      $c = 1;
      while ($a = mysqli_fetch_array($dt)) {
        if ($c == 1) {
          $clr = 'success';
          $c = 2;
        }else {
          $clr = 'warning';
          $c = 1 ;
        }
        $pt['r'.$a['dy']]['c'.$a['sessn']] .= '<p><button type="button" class="btn btn-'.$clr.' btn-sm col-sm-12" style="margin-top:3px;margin-bottom:3px;" onclick=getSessnDetails("\''.$a["sid"].'\'");><b>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
        // echo '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';


      }




      $flrs = '<option value="">Filiéres *</option>';
      $dt = mysqli_query($conn, 'select id, nme from Filiers');
      while ($a = mysqli_fetch_array($dt)) {
        $flrs .= '<option value="'.$a['id'].'">'.$a['nme'].'</option>';
      }
      // $pt = array(
      //   'pt11' => $pt11, 'pt12' => $pt11, 'pt13' => $pt11,'pt14' => $pt11,
      //   'pt21' => $pt21, 'pt22' => $pt21, 'pt23' => $pt21,'pt24' => $pt21,
      //   'pt31' => $pt31, 'pt32' => $pt31, 'pt33' => $pt31,'pt34' => $pt31,
      //   'pt41' => $pt41, 'pt42' => $pt41, 'pt43' => $pt41, 'pt44' => $pt41,
      //   'pt51' => $pt51, 'pt52' => $pt51, 'pt53' => $pt51,'pt54' => $pt51,
      //   'pt61' => $pt61, 'pt62' => $pt61, 'pt63' => $pt61,'pt64' => $pt61);
      $out = array('planningTable' => $pt, 'f' => $flrs);
      echo json_encode($out);
      // print_r($pt);



    }
    if ($_POST['o'] == 'getGrpsFromSelectedFlr') {

      $grps = '<option value="">Groupe *</option>';
      $dt = mysqli_query($conn, 'select id, nme from Grps where filier = '.$_POST['f']);
      while ($a = mysqli_fetch_array($dt)) {
        $grps .= '<option value="'.$a['id'].'">'.$a['nme'].'</option>';
      }
      echo $grps;



    }

    if ($_POST['o'] == 'getTchrFromSelectedMdl') {

      $tchers = '<option value="">Encadrants *</option>';
      $dt = mysqli_query($conn, 'select id, concat(fname, " ", lname) as tcher from Users where module like  "'.$_POST['m'].'"');
      while ($a = mysqli_fetch_array($dt)) {
        $tchers .= '<option value="'.$a['id'].'">'.$a['tcher'].'</option>';
      }
      echo $tchers;



    }

    if ($_POST['o'] == 'addNewPlanningSession') {
      $qr = 'select id from PlanedSeassion where ';
      if (mysqli_num_rows(mysqli_query($conn, $qr.' grp = '.$_POST["g"].' and dy = '.$_POST["d"].' and sessn = '.$_POST["s"].' ')) > 0) {
        echo "2";
      }elseif (mysqli_num_rows(mysqli_query($conn, $qr.' tcher = '.$_POST["t"].' and dy = '.$_POST["d"].' and sessn = '.$_POST["s"].' ')) > 0) {
        echo "3";
      }else {
        if (mysqli_query($conn, 'insert into PlanedSeassion(grp, tcher, dy, sessn) value('.$_POST["g"].', '.$_POST["t"].', '.$_POST["d"].', '.$_POST["s"].')')) {
          echo "1";
        }else {
          echo "0";
        }

      }



    }

    if ($_POST['o'] == 'getSionDetails') {
      $ps = mysqli_fetch_assoc(mysqli_query($conn, 'select concat(u.fname, " ", u.lname) as tcher, g.nme as grp, f.nme as flr, m.nme as mdl, p.dy, p.sessn as tme from
      PlanedSeassion p inner join Grps g on p.grp = g.id inner join Filiers f on g.filier = f.id inner join Users u on p.tcher = u.id inner join Modules m on m.teacher = u.id where p.id = '.$_POST['i']));
      $dys = array('1' => "LUNDI", '2' => "Mardi", '3' => "MERCREDI", '4' => "JEUDI", '5' => "VENDREDI", '6' => "SAMEDI");


       echo json_encode(array('tcher' => , ));




    }



















    mysqli_close($conn);
}?>
