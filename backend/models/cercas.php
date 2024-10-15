<?php
include('../connection/conn.php');

$sql = "select * from produtos where categoria='cerca elétrica' ";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result)> 0){
    $cercas=[];

    while($row = mysqli_fetch_assoc($result)){
        $cercas[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($cercas);
}else{
    echo json_encode([]);
}
    
?>