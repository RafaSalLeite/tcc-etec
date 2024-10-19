<?php
include('../connection/conn.php');

$id = $_GET['id']; 

$sql = "SELECT * FROM produtos WHERE id_produtos = '$id'";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result) > 0) {

    $produto = mysqli_fetch_assoc($result); 

    header('Content-Type: application/json');
    echo json_encode($produto); 

} else {
    echo json_encode([]); 
}
?>
