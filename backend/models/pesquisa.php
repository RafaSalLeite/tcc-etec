<?php
include('../connection/conn.php');

if (!isset($_GET['q'])) {
    echo json_encode(["error" => "Nenhuma pesquisa recebida"]);
    exit; //aqui é caso o negocio da pesquisa não for passado ai ele sai do php
}

$query = $_GET['q'];
$sql = "SELECT nome FROM produtos WHERE nome LIKE '%$query%' LIMIT 10";  //aqui ele vai selecionando do banco os que tem o mesmo nome
$result = $conn->query($sql);

$results = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $results[] = $row;
    }
}

echo json_encode($results);
?>