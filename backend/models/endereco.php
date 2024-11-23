<?php
session_start();
include('../connection/conn.php');
include('functions.php');

    $id_user = $_SESSION['id_user'];
    $acao = $_GET['action'];
   
    if(isset($acao)){
        if($acao=="ver"){
            verEndereco($conn, $id_user);

        }elseif($acao=="deletar"){
            $id_endereco = $_GET['id_endereco'];
            deletarEndereco($conn, $id_endereco, $id_user);

    }
    }else{
        if ($_POST['tipoEndereco'] == 'residencial') {
            $tipo_endereco = 'residencial';
        } elseif ($_POST['tipoEndereco'] == 'comercial') {
            $tipo_endereco = 'comercial';
        }

        $cep = $_POST['cep'];
        $cidade = $_POST['cidade'];
        $bairro = $_POST['bairro'];
        $rua = $_POST['rua'];
        $numero = $_POST['numero'];
        
        $sql = "INSERT INTO endereco (id_user, tipo_endereco, cep, cidade, bairro, rua, numero) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
    
        // Executa o que foi pedido
        $stmt->execute(
                [
                    $id_user,
                    $tipo_endereco,
                    $cep,
                    $cidade,
                    $bairro,
                    $rua,
                    $numero
                ]
        );
            
            header('Location:../../perfil.html');
            exit(); 
        
    }
    
   

?>