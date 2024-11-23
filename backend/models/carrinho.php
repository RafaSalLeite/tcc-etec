<?php
session_start();
include('../connection/conn.php');
include('functions.php');

//variáveis
$id_user = $_SESSION['id_user'];
$acao = $_POST['acao'];

if(isset($acao)){
    if($acao=='add'){
        $id_produtos = $_POST['id_produtos'];
        $quantidade = $_POST['quantidade'];
        addProduto($conn, $id_produtos, $id_user, $quantidade);
    }elseif($acao=='delete'){
        $id_produtos = $_POST['id_produtos'];
        deleteProduto($conn, $id_user, $id_produtos);
    }elseif($acao=='exibir'){
        exibirCarrinho($conn, $id_user);
    }
}
