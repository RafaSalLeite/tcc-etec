<?php
include('../connection/conn.php');

$sql = "select * from produtos where categoria='dvr' ";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result)> 0){
    $dvrs=[];

    while($row = mysqli_fetch_assoc($result)){
        $dvrs[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($dvrs);
}else{
    echo json_encode([]);
}
    
?>