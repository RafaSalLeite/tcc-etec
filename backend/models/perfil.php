<?php
session_start();
include('../connection/conn.php');
include('functions.php');

if (isset($_GET['action'])) {
    $acao = $_GET['action'];
    
    if ($acao == "delete") {
        $id_user = $_GET['id_user'];

        if ($id_user) {
            
            deletarUsuario($conn, $id_user);
            session_destroy();
        } else {
            echo json_encode(["status" => "error", "message" => "ID do usuário não fornecido."]);
        }
    } elseif ($acao == "update") {
        $id_user = $_SESSION['id_user'];
        $dadosUsuario = json_decode(file_get_contents("php://input"), true);

        if ($dadosUsuario) {
            atualizarUsuario($conn, $id_user, $dadosUsuario);
        } else {
            echo json_encode(["status" => "error", "message" => "Dados do usuário não fornecidos."]);
        }
    }
} else {
    $id_user = $_SESSION['id_user'];

    $query = "SELECT * FROM cadastro WHERE id_user = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id_user);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $data = $result->fetch_assoc();
        echo json_encode(["status" => "success", "usuario" => $data]);
    } else {
        echo json_encode(["status" => "error", "message" => "Usuário não encontrado."]);
    }
}
?>
