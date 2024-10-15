<?php
include('../connection/conn.php');
// dados
$nome = $_POST['produto'];
$valor = $_POST['preco'];
$qtd = $_POST['qtd'];
$img = "";
$categoria = "";

if ($_POST['categoria'] == 'camera') {
    $categoria = 'camera';
} elseif ($_POST['categoria'] == 'alarme') {
    $categoria = 'alarme';
} elseif ($_POST['categoria'] == 'concertina') {
    $categoria = 'concertina';
} elseif ($_POST['categoria'] == 'cerca_eletrica') {
    $categoria = 'cerca elétrica';
} elseif ($_POST['categoria'] == 'dvr') {
    $categoria = 'dvr';
}

if (isset($_FILES['img']) && !empty($_FILES['img'])) {
    $img = 'img/' . $_FILES['img']['name'];
    move_uploaded_file($_FILES['img']['tmp_name'], $img);
    $img = 'backend/models/img/' . $_FILES['img']['name'];
} else {
    $img = "";
    echo 'não foi';
}

// inserindo os dados
$sql = "INSERT INTO produtos (nome, categoria, valor, quantidade, imagem) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

$stmt->execute([
    $nome,
    $categoria,
    $valor,
    $qtd,
    $img
]);

header('Location:../../adm_produto.html');
exit();
