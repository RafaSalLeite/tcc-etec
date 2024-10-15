<?php
include('../connection/conn.php');
include('functions.php');

$email = $_POST['email'];
$senha = $_POST['senha'];

if(($email=="adm@gmail.com") && ($senha=="1234")){
    header('Location:../../adm_produto.html');
}else{
    $result = mysqli_query($conn, "select * from login where email = '$email' and senha = '$senha';");

    if ($result) {
        $num_rows = mysqli_num_rows($result); //aqui ele vai contar o numero de linhas 
        if ($num_rows > 0) { // se tiver alguma linha com o nome de usuario igual ele retorna falso
            header('Location:../../produto.html');
        } else {
            header('Location:../../cadastro.html');
        }
    }
}
    
?>