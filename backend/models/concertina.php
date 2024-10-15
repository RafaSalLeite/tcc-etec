<?php
include('../connection/conn.php');

$sql = "select * from produtos where categoria='concertina' ";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result)> 0){
    $concertinas=[];

    while($row = mysqli_fetch_assoc($result)){
        $concertinas[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($concertinas);
}else{
    echo json_encode([]);
}
    
?>