<?php
include('../connection/conn.php');
include('functions.php');

$acao = $_GET['acao'] ?? null;

switch ($acao):

    case 'produto':
        $id = $_GET['id'] ?? null;
        if ($id) {
            produtoDetalhes($id, $conn);
        } else {
            echo json_encode(["erro" => "ID do produto não fornecido."]);
        }
        break;

    case 'todos':
        produtoTodos($conn);
        break;

    default:
        echo json_encode(["erro" => "Ação inválida ou não especificada."]);
        break;

endswitch;
