<?php
include('../connection/conn.php');

//verifica se o email já existe 
function conta_existente($conn, $email)
{
    $result = "SELECT id_login FROM LOGIN WHERE email = '$email' ";
    $result = mysqli_query($conn, $result);
    if (($result) and ($result->num_rows != 0)) {
        return true;
    }
};

// Verifica se o método  é POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Define o fuso horário
    date_default_timezone_set('America/Sao_Paulo');
    $data_criacao = date('Y-m-d H:i:s', time()); // Obtém a data e hora atual

    // Obtém os dados do formulário
    $nome = $_POST['nome'];
    $sobrenome = $_POST['sobrenome'];
    $email = $_POST['email'];
    $senha = $_POST['senha'];
    $telefone = $_POST['telefone'];
    
    //realiza a função
    $return = conta_existente($conn,$email);

    //aqui ele só insere dentro do banco de dados se estiver tudo certo
    if (!$return) {
        $sql = "INSERT INTO CADASTRO (nome, sobrenome, email, senha, telefone, data_criacao) VALUES (?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);

        // Executa o que foi pedido
        $stmt->execute(
            [
                $nome,
                $sobrenome,
                $email,
                $senha,
                $telefone,
                $data_criacao
            ]
        );
        
        $sql = "INSERT INTO LOGIN (email, senha) VALUES (?, ?)";
        $stmt = $conn->prepare($sql);

        // Executa o que foi pedido
        $stmt->execute(
            [
                $email,
                $senha
            ]
        );
        // vai pro login depois de cadastrar
        header('Location:../../login.html');
        exit();
        
    } else {
        header('Location:../../cadastro.html?error=1');
        
        exit();
    }
}
?>
