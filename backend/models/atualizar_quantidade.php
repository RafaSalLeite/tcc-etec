<?php
session_start();

if (!isset($_SESSION['id_user'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Você precisa estar logado para acessar o carrinho'
    ]);
    exit;
}

include('../connection/conn.php');

$id_produtos = $_POST['id_produtos'];
$quantidade = $_POST['quantidade'];
$id_user = $_SESSION['id_user'];


$sql = "SELECT * FROM carrinho WHERE id_user = '$id_user' AND id_produtos = '$id_produtos'";
$result = mysqli_query($conn, $sql);

if (mysqli_num_rows($result) > 0) {
    // Atualiza a quantidade do item no carrinho
    $sql = "UPDATE carrinho SET quantidade = '$quantidade' WHERE id_user = '$id_user' AND id_produtos = '$id_produtos'";
    if (mysqli_query($conn, $sql)) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Quantidade atualizada com sucesso'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Erro ao atualizar a quantidade'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Item não encontrado no carrinho'
    ]);
}
?>
