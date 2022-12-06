<?php


  if (isset($_POST['o'])) {
    // session_start();
    $f = fopen("cnf", "r") or die("Unable to open file!");

    $c = explode('#', trim(fread($f,filesize("cnf"))));
    // print_r($c);
    fclose($f);
    $conn= mysqli_connect($c[0], $c[1], $c[2], $c[3]);

    if ($_POST['o'] == 'getStdntsTable') {

      $qr = mysqli_query($conn, 'select s.id, concat(s.fname , " ", s.lname) as stdName, g.nme as grp, f.nme as flr from Students s left join Grps g on s.grp = g.id left join Filiers f on g.filier = f.id;');
      $tbl = '';
      while ($a = mysqli_fetch_array($qr)) {
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
            <td class="text-center">'.$tbl.'</td>
            <td>Absence Maladie pour 2 jours</td>
            <td class="text-center">20</td>
            <td><a class="btn btn-info" href="DetailsStagaire.html">Détails</a></td>
            <td><a class="btn btn-warning" href="ModifierStagaire.html">Modifier</a></td>

        </tr>
        ';

      }

      echo $tbl;


    }


















    mysqli_close($conn);
}?>
