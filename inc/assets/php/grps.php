<?php


  if (isset($_POST['o'])) {
    // session_start();
    $f = fopen("cnf", "r") or die("Unable to open file!");

    $c = explode('#', trim(fread($f,filesize("cnf"))));
    // print_r($c);
    fclose($f);
    $conn= mysqli_connect($c[0], $c[1], $c[2], $c[3]);

    if ($_POST['o'] == 'fillGrpsData') {

      $flrs = '<option value="null">None</option>';
      $dt = mysqli_query($conn, 'select id, nme from Filiers;');
      while ($a = mysqli_fetch_array($dt)) {
        $flrs .= '
          <option value="'.$a['id'].'">'.$a['nme'].'</option>
        ';
      }
      $grps = '';
      $dt = mysqli_query($conn, 'select g.id, f.id as fid, g.nme, f.nme as flr from Grps g left join Filiers f on g.filier = f.id;');
      while ($a = mysqli_fetch_array($dt)) {
        $stdntsCnt = mysqli_fetch_assoc(mysqli_query($conn, 'select count(id) as c from Students where grp = '.$a['id']))['c'];
        if ($stdntsCnt == '0') {
          $stdntsCount = 'Aucun, Ajouter';
        }elseif ($stdntsCnt == '1') {
          $stdntsCount = 'Juste 1, Ajouter plus';
        }else {
          $stdntsCount = 'Gérer les '.$stdntsCnt.' Stagaires';
        }
        $grps .= '
        <tr>
            <td>'.$a['nme'].'</td>
            <td>'.$a['flr'].'</td>
            <td><button type="button" class="btn btn-success btn-fill btn-wd" onclick="stdntsMngmnt(\''.$a["id"].'\')">'.$stdntsCount.'</button></td>
            <td><button type="button" class="btn btn-warning btn-fill btn-wd" onclick="mdfGrp(\''.$a["id"].'\', \''.$a["nme"].'\', \''.$a["fid"].'\')">Modifier</button></td>

            <td><button type="button" class="btn btn-danger btn-fill btn-wd" onclick="rmGrp(\''.$a["id"].'\')">Supprimer</button></td>
        </tr>
        ';
      }
      $stdntsWithoutGrp = '';
      $dt = mysqli_query($conn, 'select id, concat(fname, " ", lname) as nme from Students where grp is null');
      while ($a = mysqli_fetch_array($dt)) {
        $stdntsWithoutGrp .= '
        <tr>
            <td>'.$a["id"].'</td>
            <td>'.$a["nme"].'</td>
            <td><button type="button" class="btn btn-success btn-fill btn-wd" onclick="associateStdntToGrp(\''.$a["id"].'\')">Associer</button></td>
        </tr>
        ';
      }

      $out = array('a' => $flrs, 'b' => $grps, 'c' => $stdntsWithoutGrp);
      echo json_encode($out);

    }

    if ($_POST['o'] == 'addGrp') {

      if (mysqli_query($conn, 'insert into Grps(nme, filier) value ("'.$_POST['gname'].'", '.$_POST['flr'].')')) {
        echo "1";
      }else {
        echo "";
      }
    }

    if ($_POST['o'] == 'mdfGrp') {
      if (mysqli_query($conn, 'update Grps set nme = "'.$_POST['gname'].'", filier = '.$_POST['flr'].' where id = '.$_POST['id'])) {
        echo "1";
      }else {
        echo "";
      }
    }

    if ($_POST['o'] == 'rmGrp') {
      if (mysqli_query($conn, 'delete from Grps where id = '.$_POST['i'])) {
        echo "1";
      }else {
        echo "";
      }
    }

    if ($_POST['o'] == 'getGrpStudentManagementData') {
      $stdntNoGrp = '<option value="">Choose a Student ...</option>';
      $stdntsGrp = '';
      $dt = mysqli_query($conn, 'select id, concat(fname, " ", lname) as sname from Students where grp is null');
      while ($a  = mysqli_fetch_array($dt)) {
        $stdntNoGrp .= '
          <option value="'.$a['id'].'">'.$a['sname'].'</option>
        ';
      }
      $dt = mysqli_query($conn, 'select s.id as sid, g.id as gid, g.nme as gname, concat(s.fname, " ", s.lname) as stdnt, f.nme as fname
      from Students s inner join Grps g on s.grp = g.id left join Filiers f on g.filier = f.id where g.id = '.$_POST['i']);
      while ($a = mysqli_fetch_array($dt)) {
        $stdntsGrp .= '
        <tr>
            <td>'.$a["stdnt"].'</td>
            <td>'.$a["fname"].'</td>
            <td><button type="button" class="btn btn-warning btn-fill btn-wd" onclick="removeStdntFromGrp(\''.$a["sid"].'\', \''.$a["gid"].'\', \''.$a["stdnt"].'\', \''.$a["gname"].'\')">Dissocier</button></td>
        </tr>
        ';
      }

      $out = array('a' => $stdntNoGrp, 'b' => $stdntsGrp);
      echo json_encode($out);

    }

    if ($_POST['o'] == 'removeStdntFromGrp') {
      if (mysqli_query($conn, 'update Students set grp = null where id = '.$_POST['s'])) {
        echo "1";
      }else {
        echo "";
      }
    }

    if ($_POST['o'] == 'assignStdntToGrp') {
      if (mysqli_query($conn, 'update Students set grp = '.$_POST['g'].' where id = '.$_POST['s'])) {
        echo "1";
      }else {
        echo "";
      }
    }









    mysqli_close($conn);
}?>
