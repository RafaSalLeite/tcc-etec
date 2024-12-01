<?php
//conexão com o banco
include('../connection/conn.php');
require_once('src/PHPMailer.php');
require_once('src/SMTP.php');
require_once('src/Exception.php');
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

function emailDespedida($email, $nome_cliente)
{
    // Inclui a classe PHPMailer e configurações
    $mail = new PHPMailer(true);

    try {
        // Configuração do servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'angelockoficial@gmail.com'; // Seu email
        $mail->Password = 'q w e b m q b x s l z w q w r j'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Configurações do email
        $mail->setFrom('angelockoficial@gmail.com', 'Angelock');
        $mail->addAddress($email, $nome_cliente);

        // Conteúdo do email
        $mail->isHTML(true);
        $mail->Subject = "Sua conta foi deletada!";
        $mail->Body = "
            <h2>Olá, $nome_cliente!</h2>
            <p>Sentimos muito em você partir, mas a família Angelock agradece a confiança e esperamos vê-lo novamente!</p>
            <p>Até logo, Angelock ❤️</p>
        ";

        // Envia o email
        $mail->send();
        return ["status" => "success", "message" => "Email enviado com sucesso!"];
    } catch (Exception $e) {
        return ["status" => "error", "message" => "Erro ao enviar o email: {$mail->ErrorInfo}"];
    }
}

//aqui pra pega mais detalhes doe um produto específico
function produtoDetalhes($id, $conn)
{
    $sql = "SELECT * FROM produtos WHERE id_produtos = '$id'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {

        $produto = mysqli_fetch_assoc($result);

        header('Content-Type: application/json');
        echo json_encode($produto);
    } else {
        echo json_encode([]);
    }
}

//aqui pra pegar todos os produtos
function produtoTodos($conn)
{
    $sql = "select * from produtos";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $produtos = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $produtos[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($produtos);
    } else {
        echo json_encode([]);
    }
};

function addProduto($conn, $id_produtos, $id_user, $quantidade)
{
    $sql = "SELECT quantidade FROM carrinho WHERE id_user = '$id_user' AND id_produtos = '$id_produtos'";
    $result = mysqli_query($conn, $sql);

    if ($result) {
        $item = mysqli_fetch_assoc($result);

        if ($item) {
            // Atualiza a quantidade do item no carrinho
            $nova_quantidade =  $quantidade;
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
}

function deleteProduto($conn, $id_user, $id_produtos)
{

    $sql = "SELECT * FROM carrinho WHERE id_user = '$id_user' AND id_produtos = '$id_produtos'";
    $result = mysqli_query($conn, $sql); //aqui ele vê se o item realmente existe

    if (mysqli_num_rows($result) > 0) {
        //removendo o item
        $sql = "DELETE FROM carrinho WHERE id_user = '$id_user' AND id_produtos = '$id_produtos'";
        if (mysqli_query($conn, $sql)) {
            echo json_encode([
                'status' => 'success',
                'message' => 'Item removido com sucesso'
            ]);
        } else {
            echo json_encode([
                'status' => 'error',
                'message' => 'Erro ao remover o item do carrinho'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Item não encontrado no carrinho'
        ]);
    }
}

function exibirCarrinho($conn, $id_user)
{
    $sql = "SELECT p.id_produtos, p.nome, p.imagem, p.valor, c.quantidade 
            FROM carrinho c
            JOIN produtos p ON c.id_produtos = p.id_produtos 
            WHERE c.id_user = ?";


    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_user);
    $stmt->execute();


    $result = $stmt->get_result();
    $items = $result->fetch_all(MYSQLI_ASSOC);


    $total = array_sum(array_map(function ($item) {
        return $item['valor'] * $item['quantidade'];
    }, $items));

    echo json_encode([
        'status' => 'success',
        'message' => 'Carrinho carregado com sucesso',
        'total' => $total,
        'items' => $items
    ]);
}



function verEndereco($conn, $id_user)
{
    $sql = "select * from endereco where id_user=" . $id_user . "";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $endereco = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $endereco[] = $row;
        }

        header('Content-Type: application/json');
        echo json_encode($endereco);
    } else {
        echo json_encode([]);
    }
}

function deletarEndereco($conn, $id_endereco, $id_user)
{
    $sql = "DELETE FROM endereco WHERE id_user = '$id_user' AND id_endereco = '$id_endereco'";
    if (mysqli_query($conn, $sql)) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Item removido com sucesso'
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Erro ao remover o item do carrinho'
        ]);
    }
}

function deletarUsuario($conn, $id_user)
{
    $query = "SELECT email, nome FROM cadastro WHERE id_user = ?";
            $stmt = $conn->prepare($query);
            $stmt->bind_param("i", $id_user);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                $user = $result->fetch_assoc();
                $email = $user['email'];
                $nome_cliente = $user['nome'];
                emailDespedida($email, $nome_cliente);
            }

    $tabelas = [ 'pedidos','endereco', 'login', 'cadastro'];
    $sucesso = true;


    foreach ($tabelas as $tabela) {
        if ($tabela == 'login') {
            $sql = "DELETE FROM $tabela WHERE id_login = ?";
            $stmt = mysqli_prepare($conn, $sql);
        } else {
            $sql = "DELETE FROM $tabela WHERE id_user = ?";
            $stmt = mysqli_prepare($conn, $sql);
        }

        if ($stmt) {
            mysqli_stmt_bind_param($stmt, "i", $id_user);
            if (!mysqli_stmt_execute($stmt)) {
                $sucesso = false;
                break;
            }
            mysqli_stmt_close($stmt);
        } else {
            $sucesso = false;
            break;
        }
    }

    if ($sucesso) {
        echo json_encode(["status" => "success", "message" => "Usuário deletado com sucesso."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erro ao deletar usuário."]);
    }
}


function atualizarUsuario($conn, $id_user, $dadosUsuario)
{

    atualizarLogin($id_user, $dadosUsuario, $conn);

    $query = "UPDATE cadastro SET nome = ?, sobrenome = ?, email = ?, senha = ?, telefone = ? WHERE id_user = ?";
    $stmt = mysqli_prepare($conn, $query);

    if ($stmt) {
        mysqli_stmt_bind_param(
            $stmt,
            "sssssi",
            $dadosUsuario['nome'],
            $dadosUsuario['sobrenome'],
            $dadosUsuario['email'],
            $dadosUsuario['senha'],
            $dadosUsuario['telefone'],
            $id_user
        );

        if (mysqli_stmt_execute($stmt)) {
            echo json_encode(["status" => "success", "message" => "Usuário atualizado com sucesso."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Erro ao atualizar usuário."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Erro na preparação da consulta."]);
    }
}

function atualizarLogin($id_user, $dadosUsuario, $conn)
{

    $email = $dadosUsuario['email'];
    $senha = $dadosUsuario['senha'];

    $sql = "UPDATE login SET email = ?, senha = ? WHERE id_login = ?";
    if ($stmt = mysqli_prepare($conn, $sql)) {
        mysqli_stmt_bind_param($stmt, "ssi", $email, $senha, $id_user);
        if (mysqli_stmt_execute($stmt)) {
            mysqli_stmt_close($stmt);
            return [
                'status' => 'success',
                'message' => 'Login atualizado com sucesso!'
            ];
        } else {
            mysqli_stmt_close($stmt);
            return [
                'status' => 'error',
                'message' => 'Erro ao atualizar o login. Verifique os dados e tente novamente.'
            ];
        }
    } else {
        return [
            'status' => 'error',
            'message' => 'Erro na preparação da consulta: ' . mysqli_error($conn)
        ];
    }
}

function verificaPedido($conn, $id_user)
{
    $endereco = false;
    $carrinho = false;

    $sql = "SELECT * FROM carrinho WHERE id_user = '$id_user'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $carrinho = true;
    } else {
        $carrinho = false;
    }

    $sql = "SELECT * FROM endereco WHERE id_user = '$id_user'";
    $result = mysqli_query($conn, $sql);

    if (mysqli_num_rows($result) > 0) {
        $endereco = true;
    } else {
        $endereco = false;
    }


    if ($carrinho== true && $endereco==true) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Seu carrinho está vazio!']);
    }
}

function limpaCarrinho($conn, $id_user){
    //deleta o carrinho
    $sql = "DELETE FROM carrinho WHERE id_user = '$id_user'";
    mysqli_query($conn, $sql);}

