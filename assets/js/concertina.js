$(document).ready(function () {
    
    
    $.ajax({
        url: 'backend/models/concertina.php',
        type: 'GET',
        dataType: 'json',
        success: function (concertinas) {
            console.log('Câmeras recebidos:', concertinas);

            const container = $('#container-prod');

            const produtosLimitados = concertinas.slice(0, 5);

            produtosLimitados.forEach(concertina => {
                console.log('Adicionando câmera:',concertinas.nome);

                const concertinaDiv = `
                <div class="produto" data-id="${concertina.id_produtos}">
                    <img src="${concertina.imagem}" class="img-cam">
                    <div class="container-desc-cam">
                        <p class="desc-img-cam">${concertina.nome}<br>R$ ${concertina.valor}</p>
                    </div>
                </div>
                `;

                container.append(concertinaDiv); 
            });

            //pega o id dos produtos
            $('.produto').click(function () {
                const idProduto = $(this).data('id');
                produtoDetalhado(idProduto); //função pra pegar os detalhes do produto
            });
        },
        error: function (xhr, status, error) {
            console.error('Erro ao carregar os produtos:', error);
        }
    });

    function produtoDetalhado(idProduto) {
        $.ajax({
            url: `backend/models/mostraproduto.php?id=${idProduto}`, //aqui tem interpolação pra mandar o id do produto pro mostraproduto.php
            type: 'GET',
            dataType: 'json',
            success: function (produto) {
                const detalhesProduto = //essa parte aqui vai exibir os detalhes do produto
                    `
                    
                    <div class="produto-detalhes">
                        <button class="btn-fechar">&times;</button>
                        <img src="${produto.imagem}" class="img-detalhes">
                        <h2>${produto.nome}</h2>
                        <p>${produto.descricao}</p>
                        <p>R$ ${produto.valor}</p>
                        <button class="btn-comprar">Comprar</button>
                    </div>
                    `
                    ;

                $('#overlay').html(detalhesProduto).css('visibility', 'visible'); //aqui ele troca no css o overlay que estava invisível para visível

                $('.btn-fechar').click(function () { // e aqui quando você clica no botão de fecha (o x) ele troca o css pra hidden
                    $('#overlay').css('visibility', 'hidden'); // Esconde a sobreposição
                });
            }
        });
    }
});
