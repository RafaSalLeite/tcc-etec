<?php
session_start(); 
include('../connection/conn.php');

$email = $_POST['email'];
$senha = $_POST['senha'];

if (($email == "adm@gmail.com") && ($senha == "1234")) {
    $_SESSION['id_user'] = 1; 
    $_SESSION['email'] = $email;
    header('Location:../../adm_produto.html');
    exit();
} else {
    $result = mysqli_query($conn, "SELECT * FROM login WHERE email = '$email' AND senha = '$senha';");

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result); 
        $_SESSION['id_user'] = $user['id_login']; 
        $_SESSION['email'] = $email; 
        header('Location:../../home.php'); 
    } else {
        $_SESSION['login_error'] = "Login incorreto"; 
        header('Location:../../login.html?error=1');
        exit();
    }
    
}
?>