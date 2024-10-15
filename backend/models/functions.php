<?php

//conexão com o banco
include('../connection/conn.php');

//verifica se a conta já existe 
function conta_existente($conn, $email)
{
    $result = "SELECT id_login FROM LOGIN WHERE email = '$email' ";
    $result = mysqli_query($conn, $result);
    if (($result) and ($result->num_rows != 0)) {
        return true;
    }
};

//verifica se a senha e o email correspondem

function conta_certa($conn, $email, $senha)
{
    $result = mysqli_query($conn, "select * from login where email = '$email' and senha = '$senha';");

    if ($result) {
        $num_rows = mysqli_num_rows($result); //aqui ele vai contar o numero de linhas 
        if ($num_rows > 0) { // se tiver alguma linha com o nome de usuario igual ele retorna falso
            return true;
        } else {
            return false;
        }
    }
}
