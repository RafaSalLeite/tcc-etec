<?php
session_start(); 
include('../connection/conn.php');

$email = $_POST['email'];
$senha = $_POST['senha'];

if (($email == "adm@gmail.com") && ($senha == "1234")) {
    $_SESSION['id_user'] = 1; // ID do usuário administrador
    $_SESSION['email'] = $email;
    header('Location:../../adm_produto.html');
    exit();
} else {
    $result = mysqli_query($conn, "SELECT * FROM login WHERE email = '$email' AND senha = '$senha';");

    if ($result && mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result); // Busca o resultado da query
        $_SESSION['id_user'] = $user['id_login']; // Armazena o id_user na sessão
        $_SESSION['email'] = $email; // Armazena o email na sessão
        header('Location:../../home.php'); // Redireciona para a página inicial
    } else {
        $_SESSION['login_error'] = "Login incorreto"; // Mensagem de erro
        header('Location:../../login.html?error=1'); // Redireciona para a página de login com erro
        exit();
    }
    
}
?>
