<?php
include('../connection/conn.php');

$sql = "select * from produtos where categoria='câmera' ";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result)> 0){
    $cameras=[];

    while($row = mysqli_fetch_assoc($result)){
        $cameras[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($cameras);
}else{
    echo json_encode([]);
}
    
?>