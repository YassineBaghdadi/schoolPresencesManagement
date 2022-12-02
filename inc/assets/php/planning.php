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
      $flrs = '<option value="">Filiéres *</option>';
      $dt = mysqli_query($conn, 'select id, nme from Filiers');
      while ($a = mysqli_fetch_array($dt)) {
        $flrs .= '<option value="'.$a['id'].'">'.$a['nme'].'</option>';
      }
      $out = array('planningTable' => 'not yet ...', 'f' => $flrs);
      echo json_encode($out);



    }
    if ($_POST['o'] == 'getGrpsFromSelectedFlr') {

      $grps = '<option value="">Groupe *</option>';
      $dt = mysqli_query($conn, 'select id, nme from Grps where filier = '.$_POST['f']);
      while ($a = mysqli_fetch_array($dt)) {
        $grps .= '<option value="'.$a['id'].'">'.$a['nme'].'</option>';
      }
      echo $grps;



    }



















    mysqli_close($conn);
}?>
