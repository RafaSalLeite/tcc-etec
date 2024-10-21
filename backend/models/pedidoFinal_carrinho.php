<?php
session_status();

if (!isset($_session['id_user'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'você precisa estar logado para acessar o carrinho'
    ]);
    exit;
}

include('../connection/conn.php');

$id_user = $_SESSION['id_user'];

$sql = "select p.nome, p.preco, p.quantidade from carrinho c
join produtos p on c.id_produtos = p.id_pedidos where c.id_user = ? ";
$stmt = $conn -> prepare($sql);
$stmt-> execute ([$id_user]);
$items = $stmt ->fetchAll();

$total = 0;
foreach ($items as $item) {
    $total += $item['preco'] * $item['quantidade'];
}

$sql = "insert into pedidos(id_user,data_pedido,total,status) values (?, NOW(), ?, 'concluido')";
$stmt = $conn->prepare($sql);
$stmt->execute([$id_user, $total]);

$sql = "delete from carrinho where id_user = ?";
$stmt = $conn -> prepare($sql);
$stmt -> execute([$id_user]);

//preparação do email, sabe? teste teste
$to = $_SESSION['email'];
$subject = "Seu pedido foi concluído, espere o contato de nossa empresa para agendar a visita!";
$message = "Aqui estão os detalhes de seu pedido:\n\n";
foreach ($items as $item) {
    $message .= $item['nome'] . " - Quantidade: " . $item['quantidade'] . " - Preço: R$ " . $item['preco'] . "\n";
}
$message .= "\nTotal: R$ " . $total;

//aqui ele manda o email
mail($to, $subject, $message);

echo json_encode([
    'status' => 'success',
    'message' => 'pedido concluído'
]);

?>