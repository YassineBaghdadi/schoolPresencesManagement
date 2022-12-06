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

      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 1 and sessn = 1'))) {
      //   $pt11 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }
      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 1 and sessn = 2'))) {
      //   $pt12 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 1 and sessn = 3'))) {
      //   $pt13 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 1 and sessn = 4'))) {
      //   $pt14 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }


      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 2 and sessn = 1'))) {
      //   $pt21 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }
      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 2 and sessn = 2'))) {
      //   $pt22 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 2 and sessn = 3'))) {
      //   $pt23 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 2 and sessn = 4'))) {
      //   $pt24 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }
      //
      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 3 and sessn = 1'))) {
      //   $pt31 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }
      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 3 and sessn = 2'))) {
      //   $pt32 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 3 and sessn = 3'))) {
      //   $pt33 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 3 and sessn = 4'))) {
      //   $pt34 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }
      //
      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 4 and sessn = 1'))) {
      //   $pt41 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }
      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 4 and sessn = 2'))) {
      //   $pt42 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 4 and sessn = 3'))) {
      //   $pt43 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 4 and sessn = 4'))) {
      //   $pt44 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }
      //
      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 5 and sessn = 1'))) {
      //   $pt51 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }
      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 5 and sessn = 2'))) {
      //   $pt52 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 5 and sessn = 3'))) {
      //   $pt53 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 5 and sessn = 4'))) {
      //   $pt54 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }
      //
      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 6 and sessn = 1'))) {
      //   $pt61 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }
      // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 6 and sessn = 2'))) {
      //   $pt62 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 6 and sessn = 3'))) {
      //   $pt63 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }while ($a = mysqli_fetch_array(mysqli_query($conn, $qr.'s.dy = 6 and sessn = 4'))) {
      //   $pt64 .= '<p><button type="button" class="btn btn-success btn-sm col-sm-12" onclick=getSessnDetails("\''.$a["sid"].'\'");><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>';
      // }



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



















    mysqli_close($conn);
}?>
