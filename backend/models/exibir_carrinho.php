<?php
session_start(); // Inicia a sessão corretamente

if (!isset($_SESSION['id_user'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Você precisa estar logado para acessar o carrinho'
    ]);
    exit;
}

include('../connection/conn.php');

$id_user = $_SESSION['id_user'];

$sql = "SELECT p.nome, p.valor, c.quantidade FROM carrinho c
        JOIN produtos p ON c.id_produtos = p.id_produtos WHERE c.id_user = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_user); // 'i' representa um inteiro para o id_user
$stmt->execute();
$result = $stmt->get_result();
$items = $result->fetch_all(MYSQLI_ASSOC);

$total = 0;
foreach ($items as $item) {
    $total += $item['valor'] * $item['quantidade'];
}

echo json_encode([
    'status' => 'success',
    'message' => 'Carrinho carregado com sucesso',
    'total' => $total,
    'items' => $items
]);


?>
