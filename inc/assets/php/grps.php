<?php

  if (isset($_POST['o'])) {
    session_start();
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
      $dt = mysqli_query($conn, 'select g.id, g.nme, f.nme as flr from Grps g inner join Filiers f on g.filier = f.id;');
      while ($a = mysqli_fetch_array($dt)) {
        $stdntsCount = mysqli_fetch_assoc(mysqli_query($conn, 'select count(id) as c from Students where grp = '.$a['id']))['c'];
        $grps .= '
        <tr>
            <td>'.$a['nme'].'</td>
            <td>'.$a['nme'].'</td>
            <td>'.$stdntsCount.'</td>
            <td><button type="button" class="btn btn-warning btn-fill btn-wd" onclick="mdfGrp(\''.$a["id"].'\')">Modifier</button></td>
            <td><button type="button" class="btn btn-danger btn-fill btn-wd" onclick="rmGrp(\''.$a["id"].'\')">Supprimer</button></td>
        </tr>
        ';
      }

      $out = array('a' => $flrs, 'b' => $grps);
      echo json_encode($out);

    }










    mysqli_close($conn);
}?>
