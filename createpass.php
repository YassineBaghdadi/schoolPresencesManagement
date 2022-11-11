<?php
// echo "string";

include("assets/php/config.php" );

$conn = mysqli_connect($DB_server, $DB_user, $DB_pass, $DB_name);
$psswrd = '1234';
$cGFzc3dvcmQ = substr(hash('ripemd128', $psswrd), -14, -9).'P@$$W0RD'.substr(hash('md5', $psswrd), 0, 6).'H@$#3D8Y@$$1N3B@94D@D1'.substr(hash('sha256', $psswrd), 5, 15);
mysqli_query($conn, 'update Users set psswrd = "'.$cGFzc3dvcmQ.'" where id = 1');
//
echo "DONE";
 ?>
