<?php
include('../connection/conn.php');

$sql = "select * from produtos where categoria='alarme' ";
$result = mysqli_query($conn, $sql);

if(mysqli_num_rows($result)> 0){
    $alarmes=[];

    while($row = mysqli_fetch_assoc($result)){
        $alarmes[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($alarmes);
}else{
    echo json_encode([]);
}
    
?>