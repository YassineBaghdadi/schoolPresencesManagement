<?php






$conn= mysqli_connect("127.0.0.1", "incuser", "Justan0rmalp@ss", "INC");

$daysname = array('1' => "LUNDI",
                  '2' => "MARDI",
                  '3' => "MERCREDI",
                  '4' => "JEUDI",
                  '5' => "VENDREDI",
                  '6' => "SAMEDI");
$planingTable = '';

$qr = '';
foreach (range(1, 6) as $d) {
  $planingTable .= '
    <tr>
       <td>
         '.$daysname[$d].'
       </td>
    ';

  foreach (range(1, 4) as $s) {
    $planingTable .= '<td>';
    $r = 0;
    $qr .= 'select s.id as sid, g.nme as gname, concat(t.fname, " ", t.lname) as tcher, t.module as mdl from PlanedSeassion s inner join Grps g on s.grp = g.id inner join Users t on s.tcher = t.id where s.dy = '.$d.' and sessn = '.$s;
$qr .= '<br>';
    // while ($a = mysqli_fetch_array(mysqli_query($conn, $qr))) {
    //   $clr = 'success';
    //   // if ($r != 0) {
    //   //   $clr = 'warning';
    //   //   $r = 0;
    //   // }else {
    //   //   $r = 1;
    //   // }
    //
    //   $planingTable .= '
    //       <p><button type="button" class="btn btn-'.$clr.' btn-sm col-sm-12" onclick="getSessionDetails(\''.$a["sid"].'\')"><small>'.$a["gname"].'/'.$a["tcher"].' ('.$a["mdl"].')</small></button></p>
    //   ';
    // }
    $planingTable .= '</td>';



  }
  $planingTable .= '</tr>';
  $qr .= '<br><br><br>';
}

echo $qr;



$table = '

<tr>
                                         <td>
                                           LUNDI
                                         </td>
                                         <td >
                                             <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/Informatique/Encadrant-3</small></button></p>
                                             <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/Pratique/Encadrant-4</small></button></p>
                                          </td>
                                          <td>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                          </td>

                                           <td >
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                          </td>
                                          <td >
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                          </td>
                                      </tr>
                                      <tr>
                                        <td>MARDI</td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                          </td>

                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td>MERCREDI</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                          </td>
                                      </tr>
                                      <tr>
                                        <td>JEUDI</td>
                                        <td></td>
                                        <td>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                          </td>
                                        <td></td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td>VENDREDI</td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                          </td>
                                        <td></td>
                                      </tr>
                                      <tr>
                                        <td>SAMEDI</td>
                                        <td>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                          </td>
                                        <td></td>
                                        <td></td>
                                        <td>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                              <p><button type="button" class="btn btn-success btn-sm col-sm-12"><small>Groupe-A/ThéoriqueEncadrant-1</small></button></p>
                                              <p><button type="button" class="btn btn-warning btn-sm col-sm-12"><small>Groupe-B/PratiqueEncadrant-2</small></button></p>
                                          </td>
                                      </tr>

';

 ?>
