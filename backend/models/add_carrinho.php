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
$sql = "SELECT * FROM carrinho WHERE id_user = ? AND id_produtos = ?";
$stmt = $conn->prepare($sql);
$stmt->execute([$id_user, $id_produtos]);
$item = $stmt->fetch();

if ($item) {
    // Atualiza a quantidade do item no carrinho
    $sql = "UPDATE carrinho SET quantidade = quantidade + ? WHERE id_user = ? AND id_produtos = ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$quantidade, $id_user, $id_produtos]);
} else {
    // Insere o novo item no carrinho
    $sql = "INSERT INTO carrinho(id_user, id_produtos, quantidade) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->execute([$id_user, $id_produtos, $quantidade]);
}

echo json_encode([
    'status' => 'success',
    'message' => 'Item adicionado ao carrinho com sucesso!'
]);
?>
