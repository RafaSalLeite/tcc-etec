<?php
session_start(); // Inicia a sessão
print_r($_SESSION['email']);

if (!isset($_SESSION['id_user'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Você precisa estar logado para acessar o carrinho'
    ]);
    exit;
}

include('../connection/conn.php');
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

$id_user = $_SESSION['id_user'];

// Recupera os itens do carrinho
$sql = "SELECT p.nome, p.valor, c.quantidade FROM carrinho c
JOIN produtos p ON c.id_produtos = p.id_produtos WHERE c.id_user = '$id_user'";
$result = mysqli_query($conn, $sql);

$items = [];
$total = 0;

while ($item = mysqli_fetch_assoc($result)) {
    $items[] = $item;
    $total += $item['valor'] * $item['quantidade'];
}

// Insere o pedido no banco de dados
$sql = "INSERT INTO pedidos(id_user, data_pedido, total, status) VALUES ('$id_user', NOW(), '$total', 'concluido')";
mysqli_query($conn, $sql);

// Remove os itens do carrinho
$sql = "DELETE FROM carrinho WHERE id_user = '$id_user'";
mysqli_query($conn, $sql);

// Preparação do email
$mail = new PHPMailer\PHPMailer\PHPMailer();

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'angelockoficial@gmail.com'; // Seu email do Gmail
    $mail->Password = 'angelock12'; // Sua senha do Gmail
    $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = 587;

    $mail->setFrom('angelockoficial@gmail.com', 'Angelock');
    $mail->addAddress($_SESSION['email']); // Adicionar destinatário

    $mail->isHTML(true);
    $mail->Subject = "Seu pedido foi concluído!";
    $message = "Aqui estão os detalhes de seu pedido:<br><br>";
    foreach ($items as $item) {
        $message .= $item['nome'] . " - Quantidade: " . $item['quantidade'] . " - Preço: R$ " . $item['valor'] . "<br>";
    }
    $message .= "<br>Total: R$ " . $total;

    $mail->Body = $message;

    $mail->send();
    echo json_encode([
        'status' => 'success',
        'message' => 'Pedido concluído e email enviado!'
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => "Erro ao enviar o email: {$mail->ErrorInfo}"
    ]);
}
?>
