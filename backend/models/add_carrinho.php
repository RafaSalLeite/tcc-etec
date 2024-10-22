<?php
session_start(); // Inicia a sessão corretamente

if (!isset($_SESSION['id_user'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'você precisa estar logado para acessar o carrinho'
    ]);
    exit;
}

include('../connection/conn.php');

$id_produtos = $_POST['id_produtos'];
$id_user = $_SESSION['id_user'];
$quantidade = $_POST['quantidade'];

// Verifica se o item já está no carrinho
$sql = "SELECT quantidade FROM carrinho WHERE id_user = '$id_user' AND id_produtos = '$id_produtos'";
$result = mysqli_query($conn, $sql);

if ($result) {
    $item = mysqli_fetch_assoc($result);
    
    if ($item) {
        // Atualiza a quantidade do item no carrinho
        $nova_quantidade = $item['quantidade'] + $quantidade;
        $sql = "UPDATE carrinho SET quantidade = $nova_quantidade WHERE id_user = '$id_user' AND id_produtos = '$id_produtos'";
        mysqli_query($conn, $sql);
    } else {
        // Insere o novo item no carrinho
        $sql = "INSERT INTO carrinho (id_user, id_produtos, quantidade) VALUES ('$id_user', '$id_produtos', '$quantidade')";
        mysqli_query($conn, $sql);
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Item adicionado ao carrinho com sucesso!'
    ]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Erro ao verificar o carrinho.'
    ]);
}

mysqli_close($conn); // Fecha a conexão com o banco de dados
?>
