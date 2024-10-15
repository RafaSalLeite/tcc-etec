<?php
include('../connection/conn.php');

$sql = "select * from produtos";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result)> 0){
    $produtos=[];

    while($row = mysqli_fetch_assoc($result)){
        $produtos[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($produtos);
}else{
    echo json_encode([]);
}
    
?>