<?php
session_start(); 
include('../connection/conn.php');

$email = $_POST['email'];
$senha = $_POST['senha'];

if (($email == "adm@gmail.com") && ($senha == "1234")) {
    header('Location:../../adm_produto.html');
    exit();
} else {
    $result = mysqli_query($conn, "SELECT * FROM login WHERE email = '$email' AND senha = '$senha';");

    if ($result) {
        $num_rows = mysqli_num_rows($result);
        if ($num_rows > 0) {
            header('Location:../../produto.html');
            exit();
        } else {
            $_SESSION['login_error'] = "Login incorreto";
            header('Location:../../login.html?error=1');
            exit();
        }
    }
}
?>
