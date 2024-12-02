<?php 
session_start();
if (!isset($_SESSION['id_user'])) {
    header('Location: index.html');
    exit; 
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TCC angel lock</title>
    <link rel="stylesheet" href="assets/css/home.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
        rel="stylesheet">
    <link rel="shortcut icon" type="imagex/png" href="assets/img/angelock-favicon.ico">
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script> <!--jquery pra facilitar minha vida-->
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!--sweet alert pra facilitar minha vida tbm-->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
</head>

<body>

    <header class="header">
        <div class="grid-logo">
            <a href="home.php"><img src="assets/img/Logo.svg" class="logo"></a>

        </div>
        <!--parte de pesquisar produtos aqui-->
        <div class="grid-search">
            <input type="search" id="pesquisa" class="pesquisa" placeholder="Pesquise produtos aqui" autocomplete="off">
            <button class="btn-source"><img src="assets/img/svgs/search-btn.svg" class="search"></button>
        </div>
        <div class="grid-login">
            <a href="perfil.html" class="btn-login"><i class="fas fa-user"></i></a>
            <a href="meucarrinho.html" class="btn-cadastro"><i class="fas fa-shopping-cart"></i> </a>

            <form action="backend/models/logout.php" method="post" class="logout-form">
            <button type="submit" class="btn-logout"><i class="fas fa-sign-out-alt"></i></button>
            </form>
        </div>

    </header>

    <!--aqui em tese vai aparecer o resultado da pesquisa, socorro-->
    <div id="containerPesquisa"></div>

    <nav class="nav">
        <button class="menu-btn"><img src="assets/img/svgs/menu-btn.svg" class="search"></button>
        <a class="btn-prod" href="cameras.html">Câmera</a>
        <a class="btn-prod" href="alarmes.html">Alarme</a>
        <a class="btn-prod" href="concertina.html">Concertina</a>
        <a class="btn-prod" href="cerca_eletrica.html">Cerca Elétrica</a>
        <a class="btn-prod" href="dvr.html">DVR</a>
    </nav>

    <div class="titulo-prod">
        <h2 class="subtitulo-prod">Conheça nossos produtos!</h2>
    </div>

    <!--aqui é onde vai aparecer o coiso de comprar o produto-->
    <div id="overlay" class="overlay"></div>


    <!--parte que precisa por o banco-->
    <div class="container-prod-move">
        <div id="container-prod" class="container-prod"></div>
    </div>
    

    
    </div>

    <div class="titulo-prod">
        <h2 class="subtitulo-prod">Categorias</h2>
    </div>

    <div class="container-cat">
        <div class="cat">
            <div class="categoria">
                <a href="cameras.html">
                    <p class="desc-img-cam">Câmeras </p><img src="assets/img/camera.png" class="img-cat">
                </a>
            </div>
        </div>
        <div class="cat">
            <div class="categoria">
                <a href="alarmes.html">
                    <p class="desc-img-cam">Alarmes </p><img src="assets/img/alarme.png" class="img-cat">
                </a>
            </div>
        </div>
        <div class="cat">
            <div class="categoria">
                <a href="concertina.html">
                    <p class="desc-img-cam">Concertinas </p><img src="assets/img/concertina.png" class="img-cat">
                </a>
            </div>
        </div>
        <div class="cat">
            <div class="categoria">
                <a href="cerca_eletrica.html">
                    <p class="desc-img-cam">Cerca Elétrica </p><img src="assets/img/cerca.png" class="img-cat">
                </a>
            </div>
        </div>
        <div class="cat">
            <div class="categoria">
                <a href="dvr.html">
                    <p class="desc-img-cam">DVR</p> <img src="assets/img/DVR.png" class="img-cat">
                </a>
            </div>
        </div>

    </div>
    </div>


    <footer>
        <div class="footer-container">
            <div class="footer-section">
                <h3>Informações</h3>
                <ul>
                    <li><a href="informacoes.html">Sobre Nós</a></li>
                    <li><a href="informacoes.html">Contato</a></li>
                    <li><a href="informacoes.html">Política de Privacidade</a></li>
                    <li><a href="informacoes.html">Termos de Serviço</a></li>
                </ul>
            </div>

            <div class="footer-section">
                <h3>Ajuda</h3>
                <ul>
                    <li><a href="informacoes.html">FAQ</a></li>
                    <li><a href="informacoes.html">Entrega e Devolução</a></li>
                    <li><a href="informacoes.html">Rastreamento de Pedido</a></li>
                    <li><a href="informacoes.html">Atendimento ao Cliente</a></li>
                </ul>
            </div>


            <div class="footer-section">
                <h3>Produtos</h3>
                <ul>
                    <li><a href="#">Novidades</a></li>
                    <li><a href="#">Mais Vendidos</a></li>
                    <li><a href="#">Ofertas Especiais</a></li>
                    <li><a href="#">Categorias</a></li>
                </ul>
            </div>
        </div>

        <div class="footer-bottom">
            <p>&copy; 2024 Sua Empresa. Todos os direitos reservados.</p>
        </div>

    </footer>

    <script src="assets/js/produtosTodos.js"></script>
    <script src="assets/js/pesquisaproduto.js"></script>
</body>

</html>