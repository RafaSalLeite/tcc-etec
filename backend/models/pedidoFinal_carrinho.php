<?php
session_start();

include('../connection/conn.php');
require_once('src/PHPMailer.php');
require_once('src/SMTP.php');
require_once('src/Exception.php');

use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$id_user = $_SESSION['id_user'];
$email = $_SESSION['email'];

// Recupera os itens do carrinho
$sql = "SELECT p.nome, p.valor, p.imagem, c.quantidade FROM carrinho c
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
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'angelockoficial@gmail.com';
    $mail->Password = 'q w e b m q b x s l z w q w r j';
    $mail->Port = 587;

    $mail->setFrom('angelockoficial@gmail.com', 'Angelock'); //seu email
    $mail->addAddress($email); //email do cliente

    $mail->isHTML(true);
    $mail->Subject = "Seu pedido foi concluído!";
    $message = "
    <h2>Detalhes do seu pedido:</h2>
    <table style='width: 100%; border-collapse: collapse;'>
        <thead>
            <tr>
                
                <th style='border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;'>Produto</th>
                <th style='border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;'>Quantidade</th>
                <th style='border: 1px solid #ddd; padding: 8px; background-color: #f2f2f2;'>Preço</th>
            </tr>
        </thead>
        <tbody>";

    foreach ($items as $item) {
        $message .= "
        <tr>
            <td style='border: 1px solid #ddd; padding: 8px;'>" . $item['nome'] . "</td>
            <td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>" . $item['quantidade'] . "</td>
            <td style='border: 1px solid #ddd; padding: 8px; text-align: right;'>R$ " . number_format($item['valor'], 2, ',', '.') . "</td>
        </tr>";
    }

    $message .= "
        </tbody>
    </table>
    <p style='font-weight: bold; text-align: right;'>Total: R$ " . number_format($total, 2, ',', '.') . "</p>";

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
