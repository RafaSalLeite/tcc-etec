<?php
// Variáveis da conexão
$hostname = "localhost";
$username = "root";
$password = "";
$dbname = "e_commerce";


$conn = mysqli_connect($hostname,$username,$password,$dbname);
 
if (!$conn) {
    echo "Error: Falha ao conectar-se com o banco de dados MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}
 


?>
