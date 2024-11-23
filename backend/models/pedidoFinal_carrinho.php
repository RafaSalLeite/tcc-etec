<?php
session_start();
include('../connection/conn.php');
include('functions.php');

$id_user = $_SESSION['id_user'];
$acao = $_GET['action'] ?? '';

if (isset($acao)) {
    if ($acao == 'verifica') {
        verificaPedido($conn, $id_user);
        exit;
    }
} else {
}
