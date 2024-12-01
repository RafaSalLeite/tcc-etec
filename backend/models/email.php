<?php
session_start();
include('functions.php');
include('../connection/conn.php');
require_once('src/PHPMailer.php');
require_once('src/SMTP.php');
require_once('src/Exception.php');

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$id_user = $_SESSION['id_user'];
$id_endereco = $_POST['id_endereco'];

// Busca o email e o nome do cliente
$emailQuery = $conn->prepare("
    SELECT c.nome, l.email 
    FROM cadastro c 
    JOIN login l ON c.email = l.email 
    WHERE l.id_login = ?
");
$emailQuery->bind_param("i", $id_user);
$emailQuery->execute();
$emailResult = $emailQuery->get_result();
$emailData = $emailResult->fetch_assoc();

$nome_cliente = $emailData['nome'] ?? 'Cliente';
$email = $emailData['email'] ?? null;

// Busca o endereço do cliente
$enderecoQuery = $conn->prepare("
    SELECT CONCAT(e.rua, ', ', e.numero, ' - ', e.bairro, ', ', e.cidade, ' - ', e.bairro, ' - CEP: ', e.cep) AS endereco
    FROM endereco e
    WHERE e.id_endereco = ? AND e.id_user = ?
");
$enderecoQuery->bind_param("ii", $id_endereco, $id_user);
$enderecoQuery->execute();
$enderecoResult = $enderecoQuery->get_result();
$enderecoData = $enderecoResult->fetch_assoc();

$endereco_cliente = $enderecoData['endereco'] ?? 'Endereço não informado';

// Recupera os itens do carrinho
$sqlCarrinho = "
    SELECT p.nome, p.valor, p.imagem, c.quantidade 
    FROM carrinho c
    JOIN produtos p ON c.id_produtos = p.id_produtos 
    WHERE c.id_user = '$id_user'
";
$result = mysqli_query($conn, $sqlCarrinho);

$items = [];
$total = 0;

while ($item = mysqli_fetch_assoc($result)) {
    $items[] = $item;
    $total += $item['valor'] * $item['quantidade'];
}

// Insere o pedido na tabela de pedidos
$sqlPedido = "
    INSERT INTO pedidos(id_user, data_pedido, total, status) 
    VALUES ('$id_user', NOW(), '$total', 'concluido')
";
mysqli_query($conn, $sqlPedido);

// Configuração do email
$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'angelockoficial@gmail.com';
    $mail->Password = 'q w e b m q b x s l z w q w r j'; 
    $mail->Port = 587;

    $mail->setFrom('angelockoficial@gmail.com', 'Angelock');
    $mail->addAddress($email);

    $mail->isHTML(true);
    $mail->Subject = "Seu pedido entrou para analise!";

    // Corpo do email
    $message = "
    <h2>Olá, $nome_cliente!</h2>
    <p>Seu pedido foi recebido e está em análise por nossos melhores ténicos, abaixo mais detalhes!</p>
    
    <h3>Detalhes do Pedido:</h3>
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
                <td style='border: 1px solid #ddd; padding: 8px;'>{$item['nome']}</td>
                <td style='border: 1px solid #ddd; padding: 8px; text-align: center;'>{$item['quantidade']}</td>
                <td style='border: 1px solid #ddd; padding: 8px; text-align: right;'>R$ " . number_format($item['valor'], 2, ',', '.') . "</td>
            </tr>";
    }

    $message .= "
        </tbody>
    </table>
    <p style='font-weight: bold; text-align: right;'>Total: R$ " . number_format($total, 2, ',', '.') . "</p>
    <p><strong>Endereço da visita técnica:</strong> $endereco_cliente</p>
    <h3>Próximos Passos</h3>
    <p>Em breve, um de nossos técnicos especializados irá ao endereço cadastrado para realizar uma análise completa do local e garantir que tudo esteja pronto para a instalação e uso seguro dos produtos.</p>
    <p><strong>Informações Importantes:</strong></p>
    <ul>
        <li>Durante a análise, apresentaremos as opções de pagamento disponíveis para que você possa concluir a compra com total segurança.</li>
        <li>Caso precise ajustar algum dado, como endereço ou contato, entre em contato conosco o quanto antes.</li>
    </ul>
    <p><strong>Obrigado por fazer parte da família Angelock!</strong></p>
    <p>Estamos felizes em poder atender você. Qualquer dúvida, estamos à disposição através do suporte.</p>";

    $mail->Body = $message;
    $mail->send();

    // Limpa o carrinho
    limpaCarrinho($conn, $id_user);

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
